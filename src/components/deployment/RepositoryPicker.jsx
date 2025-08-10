import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useAuth } from "@/providers/AuthProvider";
import { Lock } from "lucide-react"; 

/**
 * Dropdown to select a repository from user's GitHub account.
 * Calls onSelect(repo) with selected repo object.
 */
const RepositoryPicker = ({ selected, onSelect }) => {
    const { isAuthenticated } = useAuth();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/github/user/repos`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(res => setRepos(res.data))
            .finally(() => setLoading(false));
    }, [isAuthenticated]);

    return (
        <Select
            value={selected?.full_name || ""}
            onValueChange={val => {
                const repo = repos.find(r => r.full_name === val);
                if (repo) onSelect(repo);
            }}
            disabled={loading || !isAuthenticated}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={loading ? "Loading repos..." : "Select repository"} />
            </SelectTrigger>
            <SelectContent>
                {repos.map(repo => (
                    <SelectItem key={repo.id} value={repo.full_name}>
                        <div className="flex items-center gap-2">
                            {repo.visibility === "private" && <Lock className="w-4 h-4 text-gray-500" />}
                            <span>{repo.full_name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default RepositoryPicker;
