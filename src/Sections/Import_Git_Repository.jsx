import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import axios from "axios";
import GitHubConnectButton from "@/components/deployment/GitHubConnectButton";
import RepositoryList from "@/components/RepositoryList";
import { useAuth } from "@/providers/AuthProvider";

const Import_Git_Repository = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [selectedRepo, _setSelectedRepo] = useState(null);
    const [search, setSearch] = useState("");
    const [repos, setRepos] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        setLoadingRepos(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/github/user/repos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const mapped = (res.data || []).map((repo) => ({
                    ...repo,
                    time: (() => {
                        const d = new Date(repo.updated_at || repo.pushed_at || repo.created_at);
                        return d.toLocaleString("en-US", { month: "short", day: "numeric" });
                    })(),
                }));
                console.log(mapped);
                setRepos(mapped);
            })
            .finally(() => setLoadingRepos(false));
    }, [isAuthenticated]);

    const filteredRepos = useMemo(() => {
        if (!search) return repos;
        const q = search.toLowerCase();
        return repos.filter((r) =>
            (r.full_name || r.name || "").toLowerCase().includes(q)
        );
    }, [repos, search]);

    return (
        <div className="flex justify-center items-center min-h-screen px-4 text-foreground">
            <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl border bg-card ">
                <h2 className="text-xl font-semibold dark:text-white ">Import Git Repository</h2>

                {/* GitHub connect */}
                {!isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <Github className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                        <GitHubConnectButton />
                    </div>
                )}

                {/* Repository list */}
                {isAuthenticated && !selectedRepo && (
                    <RepositoryList
                        account={localStorage.getItem("username")}
                        search={search}
                        setSearch={setSearch}
                        filteredRepos={
                            loadingRepos
                                ? []
                                : filteredRepos.map((r) => ({
                                    name: r.name || r.full_name,
                                    private: r.visibility,
                                    time: r.time,
                                    _raw: r,
                                }))
                        }
                        onImportRepo={(repo) => {
                            const raw = repo._raw || repo;
                            const repoUrl =
                                raw.html_url ||
                                `https://github.com/${raw.owner?.login}/${raw.name}`;
                            const framework = "vite"; // TODO: Detect framework
                            navigate(
                                `/new/import?framework=${encodeURIComponent(framework)}&s=${encodeURIComponent(repoUrl)}`
                            );
                        }}
                    />
                )}

                {/* Footer */}
                <div className="pt-6 text-sm text-muted-foreground text-right">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            // onThirdParty();
                        }}
                        className="hover:underline"
                    >
                        Import Third-Party Git Repository →
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default Import_Git_Repository;
