import React from 'react';

import { Github, Lock, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const RepositoryList = ({
    account,
    search,
    setSearch,
    filteredRepos,
    onImportRepo,
}) => {
    return (
        <>

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 ">
                {/* Account Dropdown */}

                <div
                    className="flex items-center gap-2 flex-1 min-w-[150px] justify-between  "
                >
                    <div className="flex items-center gap-2 truncate">
                        <Github className="w-4 h-4" />
                        <span className="truncate">{account}</span>
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1 min-w-[150px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 dark:bg-muted-foreground/20"
                    />
                </div>
            </div>


            {/* Repo List */}
            <ScrollArea className="h-72 border rounded-md dark:border-muted-foreground/20">
                {filteredRepos.map((repo, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3 border-b  dark:border-b-muted-foreground/20 last:border-none hover:bg-muted/50 transition"
                    >
                        <div className="flex items-center gap-1 text-sm">
                            {repo.framework ? (
                                <span className="text-muted-foreground text-xs">· {repo.framework}</span>
                            ) : (
                                <div />
                            )}

                            <span className="font-medium">{repo.name}</span>
                            {repo.private === "private" ? (
                                <>
                                    <Lock className="w-3 h-3 " />
                                </>
                            ) : (
                                <div />
                            )}
                            <span className="text-muted-foreground text-xs">· {repo.time}</span>
                        </div>
                        <Button size="sm" className="px-4 py-1 text-sm" onClick={() => onImportRepo(repo)}>
                            Import
                        </Button>
                    </div>
                ))}
            </ScrollArea >
        </>





    );
};

export default RepositoryList; 