import { useEffect, useState } from "react";
import { Github, ChevronRight, ChevronLeft, Folder, File, Circle, Zap } from "lucide-react";
function parseGitHubURL(repoURL) {
    if (typeof repoURL !== "string" || repoURL.trim() === "") {
        return null;
    }

    let owner;
    let repo;

    if (repoURL.startsWith("git@")) {
        // Handle SSH URL
        // Example: git@github.com:owner/repo.git
        const match = repoURL.match(/:(.+?)\/(.+?)(\.git)?$/);
        if (match) {
            owner = match[1];
            repo = match[2];
        }
    } else {
        // Handle HTTPS URL
        try {
            const url = new URL(repoURL);
            const parts = url.pathname.replace(/^\/|\/$/g, "").split("/");
            owner = parts[0];
            repo = parts[1]?.replace(/\.git$/, "");
        } catch {
            return null;
        }
    }

    if (!owner || !repo) {
        return null;
    }

    return { owner, repo };
}


export default function RootDirectoryModal({
    isOpen,
    onClose,
    onConfirm,
    repoURL,
}) {

    const [selectedPath, setSelectedPath] = useState(undefined);
    const [currentPath, setCurrentPath] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const parsedRepo = parseGitHubURL(repoURL);
    const owner = parsedRepo?.owner;
    const repo = parsedRepo?.repo;


    useEffect(() => {
        if (!isOpen) return;
        if (!owner || !repo) {
            setEntries([]);
            setError("Enter a valid GitHub repository URL.");
            return;
        }
        const fetchContents = async () => {
            setLoading(true);
            setError("");

            // Pre-encode path for query param
            const encodedPath = encodeURIComponent(currentPath);

            // Call your backend instead of GitHub API directly
            const url = `${import.meta.env.VITE_API_URL}/github/repos/${owner}/${repo}/contents?path=${encodedPath}`;

            try {
                const res = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) {
                    if (res.status === 404) {
                        setEntries([]);
                        return;
                    }
                    throw new Error(`API: ${res.status}`);
                }

                const data = await res.json();

                // Return early if not a directory listing
                if (!Array.isArray(data)) {
                    setEntries([]);
                    return;
                }

                // Filter and sort directories only
                const directories = data
                    .filter((item) => item.type === "dir")
                    .sort((a, b) => a.name.localeCompare(b.name));

                setEntries(directories);
            } catch (e) {
                setError(e?.message || "Failed to load contents");
            } finally {
                setLoading(false);
            }
        };
        fetchContents();
    }, [isOpen, owner, repo, currentPath]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    const goInto = (folder) => setCurrentPath((p) => (p ? `${p}/${folder}` : folder));
    const goUp = () => setCurrentPath((p) => p.split("/").slice(0, -1).join("/"));
    const isRoot = currentPath === "";

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={handleBackgroundClick}
        >
            <div
                className="w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-neutral-900 text-neutral-100 shadow-2xl"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Root Directory</h2>
                        <p className="text-sm text-neutral-400">
                            Select the directory where your source code is located.
                        </p>
                    </div>

                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                            <Github size={18} className="text-neutral-300" />
                            {owner && repo ? (
                                <span className="text-sm text-neutral-200">{owner}/{repo}</span>
                            ) : (
                                <span className="text-sm text-neutral-400">No repository selected</span>
                            )}
                        </div>
                        <Zap size={18} className="text-yellow-400" />
                    </div>

                    {!isRoot && (
                        <button
                            type="button"
                            onClick={goUp}
                            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200"
                        >
                            <ChevronLeft size={14} />
                            Up to {currentPath.split("/").slice(0, -1).join("/") || "root"}
                        </button>
                    )}

                    {owner && repo && (
                        <div className="rounded-lg border border-white/10 divide-y divide-white/10 overflow-hidden">
                            <div
                                className="flex items-center gap-2 py-2 px-3 hover:bg-white/5 cursor-pointer"
                                onClick={() => setSelectedPath("")}
                            >
                                <span className="w-4" />
                                <Folder size={16} className="text-neutral-400" />
                                <span className="flex-1 text-sm text-neutral-200">/ (root)</span>
                                {selectedPath === "" ? (
                                    <Circle size={16} className="text-primary fill-primary" />
                                ) : (
                                    <Circle size={16} className="text-neutral-500" />
                                )}
                            </div>

                            {loading && (
                                <div className="py-6 text-center text-sm text-neutral-400">Loading…</div>
                            )}
                            {error && !loading && (
                                <div className="py-6 text-center text-sm text-red-400">{error}</div>
                            )}
                            {!loading && !error && entries.length === 0 && (
                                <div className="py-6 text-center text-sm text-neutral-400">No contents</div>
                            )}

                            {!loading && !error &&
                                entries.map((item) => {
                                    const absolutePath = currentPath ? `${currentPath}/${item.name}` : item.name;
                                    const isSelected = selectedPath === absolutePath;
                                    if (item.type === "dir") {
                                        return (
                                            <div
                                                key={item.sha}
                                                className="flex items-center gap-2 py-2 px-3 hover:bg-white/5 cursor-pointer"
                                                onClick={() => setSelectedPath(absolutePath)}
                                            >
                                                <button
                                                    type="button"
                                                    className="text-neutral-400 hover:text-neutral-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        goInto(item.name);
                                                    }}
                                                    aria-label={`Open ${item.name}`}
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                                <Folder size={16} className="text-neutral-400" />
                                                <span className="flex-1 text-sm text-neutral-200">{item.name}</span>
                                                {isSelected ? (
                                                    <Circle size={16} className="text-primary fill-primary" />
                                                ) : (
                                                    <Circle size={16} className="text-neutral-500" />
                                                )}
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={item.sha} className="flex items-center gap-2 py-2 px-3 text-neutral-400">
                                            <span className="w-4" />
                                            <File size={16} />
                                            <span className="flex-1 text-sm">{item.name}</span>
                                        </div>
                                    );
                                })}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md bg-white/5 text-neutral-200 hover:bg-white/10"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={!owner || !repo || selectedPath === undefined || selectedPath === null}
                            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95"
                            onClick={() => {
                                const result = selectedPath === "" ? "./" : selectedPath;
                                onConfirm?.(result);
                                onClose?.();
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


