"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnvironmentVariables from "@/components/deployment/EnvironmentVariables";
import SlugInput from "@/components/deployment/SlugInput";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const DeploySection = () => {
    const navigate = useNavigate();
    const [repoURL, setURL] = useState(localStorage.getItem("repoURL") || "");
    const [isPublic, setIsPublic] = useState(localStorage.getItem("isPublic") || 0);
    const [slug, setSlug] = useState(localStorage.getItem("slug") || "");
    const [envVars, setEnvVars] = useState(() => {
        const saved = localStorage.getItem("envVars");
        try {
            return saved ? JSON.parse(saved) : [{ key: "", value: "" }];
        } catch {
            return [{ key: "", value: "" }];
        }
    });
    const [logs, setLogs] = useState([]);

    const [loading, setLoading] = useState(false);

    const [deployPreviewURL, setDeployPreviewURL] = useState();

    const logContainerRef = useRef(null);

    const isValidURL = useMemo(() => {
        if (!repoURL || repoURL.trim() === "") return [false, null];
        const regex = new RegExp(
            /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)(?:\/)?$/
        );
        return [regex.test(repoURL), "Enter valid Github Repository URL"];
    }, [repoURL]);

    const handleClickDeploy = useCallback(async () => {

        setLoading(true);
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        const envObject = {};
        envVars.forEach(({ key, value }) => {
            if (key && value) {
                envObject[key] = value;
            }
        });

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/build-project`, {
            git_url: repoURL,
            is_public: isPublic,
            slug: slug,
            env_vars: envObject,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


        if (data && data.data) {
            localStorage.removeItem("repoURL");
            localStorage.removeItem("isPublic");
            localStorage.removeItem("slug");
            localStorage.removeItem("envVars");

            const { projectSlug } = data.data;


            setDeployPreviewURL(`https://${projectSlug}.makethumb.com`);


            console.log(`Subscribing to logs:${projectSlug}`);
            socket.emit("subscribe", `logs:${projectSlug}`);
        }
    }, [repoURL, isPublic, slug, envVars, navigate]);

    const handleSocketIncommingMessage = useCallback((message) => {
        console.log(`[Incomming Socket Message]:`, typeof message, message);
        const { log } = JSON.parse(message);
        setLogs((prev) => [...prev, log]);
        logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);



    useEffect(() => {
        socket.on("message", handleSocketIncommingMessage);

        return () => {
            socket.off("message", handleSocketIncommingMessage);
        };
    }, [handleSocketIncommingMessage]);

    useEffect(() => {
        localStorage.setItem("envVars", JSON.stringify(envVars));
    }, [envVars]);

    useEffect(() => {
        localStorage.setItem("slug", slug);
    }, [slug]);


    return (
        <div className="flex justify-center items-center h-screen bg-muted px-4">
            <Card className="w-full max-w-xl space-y-4 p-6">
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Github className=" text-3xl" />
                        <Input
                            disabled={loading}
                            value={repoURL}
                            onChange={(e) => setURL(e.target.value)}
                            type="url"
                            placeholder="GitHub URL"
                        />
                    </div>
                    <div className="flex items-center gap-2">

                        <SlugInput
                            loading={loading}
                            value={slug}
                            onChange={setSlug}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="public-toggle"
                                    checked={isPublic}
                                    onCheckedChange={setIsPublic}
                                />
                                <Label htmlFor="public-toggle">Make public</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        If checked, this deployment will be visible to the community.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    <EnvironmentVariables
                        envVars={envVars}
                        setEnvVars={setEnvVars}
                        loading={loading}
                    />

                    <Button
                        onClick={handleClickDeploy}
                        disabled={!isValidURL[0] || loading}
                        className="w-full"
                    >
                        {loading ? 'In Progress' : 'Deploy'}
                    </Button>

                    {deployPreviewURL && (
                        <div className="mt-2 bg-muted/20 py-3 px-4 rounded-lg text-sm">
                            <p className="text-muted-foreground">Preview URL:</p>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={deployPreviewURL}
                                className="text-primary underline"
                            >
                                {deployPreviewURL}
                            </a>
                        </div>
                    )}

                    {logs.length > 0 && (
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
                    )}
                </CardContent>
            </Card>
        </div>
    );

};

export default DeploySection;