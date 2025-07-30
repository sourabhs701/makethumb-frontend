import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const avatar = params.get("avatar");
        const username = params.get("username");
        const error = params.get("error");

        if (error) {
            console.error("OAuth error:", error);
            toast.error("Authentication failed. Please try again.")
            navigate("/login");
        } else if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("avatar", avatar);
            localStorage.setItem("username", username);
            toast.success("Login successful!")
            navigate("/");
        } else {
            navigate("/login");
        }

        setIsProcessing(false)
    }, [location.search, navigate]);

    if (isProcessing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Processing authentication...</p>
                </div>
            </div>
        )
    }

    return (<></>)
}

export default AuthPage