import { Button } from "@/components/ui/button";

const GitHubConnectButton = () => {
    const handleConnect = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUri = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/github`);
        const scope = "repo user";
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    };

    return (
        <Button onClick={handleConnect} variant="github">
            Connect GitHub
        </Button>
    );
};

export default GitHubConnectButton;