import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

/**
 * Dropdown to select a branch from a repository.
 * Calls onSelect(branchName) with selected branch name.
 */
const BranchPicker = ({ repo, selected, onSelect }) => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!repo) return;
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/github/repos/${repo.owner.login}/${repo.name}/branches`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(res => setBranches(res.data))
            .finally(() => setLoading(false));
    }, [repo]);

    return (
        <Select
            value={selected || ""}
            onValueChange={onSelect}
            disabled={loading || !repo}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={loading ? "Loading branches..." : "Select branch"} />
            </SelectTrigger>
            <SelectContent>
                {branches.map(branch => (
                    <SelectItem key={branch.name} value={branch.name}>
                        {branch.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default BranchPicker;