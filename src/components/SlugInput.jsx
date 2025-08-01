import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // assuming you're using shadcn
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
            axios.get(`${import.meta.env.VITE_API_URL}/api/check-slug?slug=${encodeURIComponent(value)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(res => {
                    setStatus(res.data.available ? "available" : "taken");
                })
                .catch(() => {
                    setStatus("idle");
                });
        }, 1000);

        return () => clearTimeout(debounce);
    }, [value]);

    return (
        <div className="space-y-2">
            <Input
                disabled={loading}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                placeholder="your-project.makethumb.com"
            />

            {status === "checking" && <p className="text-sm text-muted-foreground">Checking availability…</p>}
            {status === "available" && <p className="text-sm text-green-600">✅ available!</p>}
            {status === "taken" && <p className="text-sm text-red-600">❌ already taken.</p>}
        </div>
    );
}
