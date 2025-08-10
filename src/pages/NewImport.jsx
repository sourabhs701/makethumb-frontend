import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { onMessage, offMessage, subscribeToChannel, unsubscribeFromChannel } from "@/lib/socket";
import { Github, Info } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import GitHubConnectButton from '@/components/deployment/GitHubConnectButton';
import BranchPicker from '@/components/deployment/BranchPicker';
import RootDirectoryModal from '@/components/deployment/RootDirectoryModal';
import SlugInput from '@/components/deployment/SlugInput';
import EnvironmentVariables from '@/components/deployment/EnvironmentVariables';
import axios from 'axios';

const NewImport = () => {
    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();

    // derive initial repo/branch from query
    const sourceUrl = searchParams.get('s') || '';
    const framework = searchParams.get('framework') || '';

    const [selectedRepo, setSelectedRepo] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState('main');
    const [rootDir, setRootDir] = useState('./');
    const [rootDirectoryModalOpen, setRootDirectoryModalOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deployPreviewURL, setDeployPreviewURL] = useState();
    const logContainerRef = useRef(null);
    const [subscribedChannel, setSubscribedChannel] = useState(null);

    // restored states
    const [slug, setSlug] = useState("");
    const [envVars, setEnvVars] = useState(JSON.parse(localStorage.getItem("envVars") || "[]"));

    // --- Utility and validation
    const isReadyToDeploy = useMemo(() => {
        return isAuthenticated && selectedRepo && selectedBranch && rootDir && slug && !loading;
    }, [isAuthenticated, selectedRepo, selectedBranch, rootDir, slug, loading]);

    // --- Handlers
    const handleClickDeploy = useCallback(async () => {
        if (!isAuthenticated) return alert("Please connect your GitHub account first.");
        if (!selectedRepo) return alert("Please select a repository.");
        if (!selectedBranch) return alert("Please select a branch.");
        if (!rootDir) return alert("Please set a root directory.");

        setLoading(true);

        const envObject = {};
        envVars.forEach(({ key, value }) => {
            if (key && value) envObject[key] = value;
        });

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/build-project`, {
                git_url: selectedRepo.clone_url,
                branch: selectedBranch,
                is_public: 0,
                slug,
                root_dir: rootDir,
                env_vars: envObject,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (data && data.data) {
                const { projectSlug } = data.data;
                setDeployPreviewURL(`https://${projectSlug}.makethumb.com`);
                const channel = `logs:${projectSlug}`;
                subscribeToChannel(channel);
                setSubscribedChannel(channel);
            }

            localStorage.removeItem("slug");
            localStorage.removeItem("envVars");
        } catch (err) {
            alert("Deployment failed: " + (err?.response?.data?.message || err.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, selectedRepo, selectedBranch, slug, rootDir, envVars]);

    const handleSocketIncommingMessage = useCallback((message) => {
        const { log } = JSON.parse(message);
        setLogs((prev) => [...prev, log]);
        logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // --- Effects
    useEffect(() => {
        onMessage(handleSocketIncommingMessage);
        return () => offMessage(handleSocketIncommingMessage);
    }, [handleSocketIncommingMessage]);

    useEffect(() => {
        // best-effort: set name from repo path
        try {
            if (sourceUrl) {
                const parts = decodeURIComponent(sourceUrl).split('/');
                const repoName = parts[parts.length - 1] || '';
                setSlug(repoName.replace(/\.git$/i, ''));
            }
        } catch (err) {
            console.error(err);
        }
    }, [sourceUrl]);

    useEffect(() => {
        // hydrate minimal repo object
        if (!isAuthenticated || !sourceUrl) return;
        try {
            const url = decodeURIComponent(sourceUrl);
            const match = url.match(/github\.com\/(.+?)\/(.+?)(?:$|\?|#|\/)/i);
            if (match) {
                const owner = match[1];
                const name = match[2].replace(/\.git$/i, '');
                setSelectedRepo({
                    name,
                    owner: { login: owner },
                    html_url: url,
                    clone_url: `https://github.com/${owner}/${name}.git`,
                    default_branch: 'main',
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, [isAuthenticated, sourceUrl]);

    useEffect(() => {
        return () => {
            if (subscribedChannel) unsubscribeFromChannel(subscribedChannel);
        };
    }, [subscribedChannel]);

    useEffect(() => {
        localStorage.setItem("envVars", JSON.stringify(envVars));
        localStorage.setItem("slug", slug);
    }, [envVars, slug]);

    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex flex-col gap-2 justify-center items-center">
                <Card className="w-full max-w-xl shadow-xl rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4 px-6 dark:text-white">New Project</h2>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-3 justify-between w-full">
                            <div className="font-medium truncate flex gap-2">
                                <Github className="w-5 h-5 shrink-0 text-muted-foreground" />
                                {selectedRepo
                                    ? `${selectedRepo.owner.login}/${selectedRepo.name}`
                                    : sourceUrl
                                        ? decodeURIComponent(sourceUrl)
                                        : "—"}

                            </div>

                            {/* Right side: Branch picker */}
                            {selectedRepo && (
                                <div className="w-40 shrink-0">
                                    <BranchPicker
                                        repo={selectedRepo}
                                        selected={selectedBranch}
                                        onSelect={setSelectedBranch}
                                    />
                                </div>
                            )}
                        </div>
                        <SlugInput loading={loading} value={slug} onChange={setSlug} />


                        <div>
                            <Label>Framework Preset</Label>
                            <Input readOnly value={framework ? framework[0].toUpperCase() + framework.slice(1) : 'other'} className="mt-2" />
                        </div>

                        <div>
                            <Label>Root Directory</Label>
                            <div className="flex items-center gap-2 mt-2">
                                <Input value={rootDir} readOnly />
                                <Button variant="secondary" disabled={!selectedRepo} onClick={() => setRootDirectoryModalOpen(true)}>Edit</Button>
                            </div>
                            {selectedRepo && (
                                <RootDirectoryModal
                                    isOpen={rootDirectoryModalOpen}
                                    onClose={() => setRootDirectoryModalOpen(false)}
                                    onConfirm={(path) => { setRootDir(path); setRootDirectoryModalOpen(false); }}
                                    repoURL={selectedRepo?.html_url}
                                    branch={selectedBranch}
                                />
                            )}
                        </div>
                        <details className="rounded-md border p-3">
                            <summary className="cursor-pointer">Build and Output Settings</summary>
                            <div className="mt-3 text-sm text-muted-foreground">Uses sensible defaults for the selected framework.</div>
                        </details>

                        <details className="rounded-md border p-3">
                            <summary className="cursor-pointer">Environment Variables</summary>
                            <div className="mt-3">
                                <EnvironmentVariables envVars={envVars} setEnvVars={setEnvVars} loading={loading} />
                            </div>
                        </details>

                        <Button className="w-full" onClick={handleClickDeploy} disabled={!isReadyToDeploy}>
                            {loading ? 'Deploying…' : 'Deploy'}
                        </Button>

                    </CardContent>
                </Card>

                <Card className="w-full max-w-xl shadow-xl rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4 p-6">Deployment Logs</h2>
                    <CardContent>

                        {deployPreviewURL && (
                            <div className="mt-2 text-sm">
                                <p className="text-muted-foreground">Preview URL:</p>
                                <a href={deployPreviewURL} className="text-primary underline" target="_blank" rel="noreferrer">{deployPreviewURL}</a>
                            </div>
                        )}

                        {logs.length > 0 && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-green-500 border border-green-500 rounded-lg p-4 h-[300px] overflow-y-auto">
                                        <pre className="flex flex-col gap-1">
                                            {logs.map((log, i) => (
                                                <code
                                                    ref={logs.length - 1 === i ? logContainerRef : undefined}
                                                    key={i}
                                                >{`> ${log}`}</code>
                                            ))}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>

                </Card>
            </div>
        </div>
    );
};

export default NewImport;
