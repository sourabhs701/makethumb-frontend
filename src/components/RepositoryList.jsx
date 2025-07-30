import React from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from './ui/dropdown-menu';
import { Github, Lock, ChevronDown, Search, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

const RepositoryList = ({ 
    account, 
    setAccount, 
    search, 
    setSearch, 
    filteredRepos, 
    onImportRepo, 
    onThirdParty 
}) => {
    return (
        <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl border">
            <h2 className="text-xl font-semibold mb-4">Import Git Repository</h2>

            {/* Top Bar */}
            <div className="flex items-center gap-1 mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-1 w-1/2 justify-between"
                        >
                            <div className="flex items-center gap-1">
                                <Github className="w-4 h-4" />
                                <span className="truncate">{account}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 opacity-60" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onClick={() => setAccount("sourabhs701")}>
                            sourabhs701
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Plus className="w-4 h-4 mr-2" />
                            Add GitHub Account
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative w-1/2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Repo List */}
            <ScrollArea className="h-72 border rounded-md">
                {filteredRepos.map((repo, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-none hover:bg-muted/50 transition"
                    >
                        <div className="flex items-center gap-1 text-sm">
                            {repo.private ? (
                                <>
                                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">M</div>
                                    <Lock className="w-3 h-3 text-muted-foreground" />
                                </>
                            ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-dashed text-muted-foreground" />
                            )}
                            <span className="font-medium">{repo.name}</span>
                            <span className="text-muted-foreground text-xs">· {repo.time}</span>
                        </div>
                        <Button size="sm" className="px-4 py-1 text-sm" onClick={() => onImportRepo(repo)}>
                            Import
                        </Button>
                    </div>
                ))}
            </ScrollArea>

            {/* Footer Link */}
            <div className="pt-4 text-sm text-muted-foreground text-right">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onThirdParty();
                    }}
                    className="hover:underline"
                >
                    Import Third-Party Git Repository →
                </a>
            </div>
        </Card>
    );
};

export default RepositoryList; 