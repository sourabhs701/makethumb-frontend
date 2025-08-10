import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";

export default function SlugInput({ loading, value, onChange }) {
    const [status, setStatus] = useState("idle"); // idle | checking | available | taken

    useEffect(() => {
        if (!value || value.length < 2) {
            setStatus("idle");
            return;
        }

        setStatus("checking");

        const debounce = setTimeout(() => {
            axios.get(
                `${import.meta.env.VITE_API_URL}/api/check-slug?slug=${encodeURIComponent(value)}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
                .then((res) => {
                    setStatus(res.data.available ? "available" : "taken");
                })
                .catch(() => {
                    setStatus("idle");
                });
        }, 800);

        return () => clearTimeout(debounce);
    }, [value]);

    const renderStatus = () => {
        switch (status) {
            case "checking":
                return (
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Checking...</span>
                    </div>
                );
            case "available":
                return (
                    <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Available</span>
                    </div>
                );
            case "taken":
                return (
                    <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Already taken</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1">
                <Input
                    disabled={loading}
                    value={value}
                    onChange={(e) => onChange(e.target.value.replace(/[^a-z0-9-]/gi, ""))}
                    type="text"
                    placeholder="your-project"
                    className="pr-28"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                    .makethumb.com
                </span>
            </div>
            {renderStatus()}
        </div>
    );
}
