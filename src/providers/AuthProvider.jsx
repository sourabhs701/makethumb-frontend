import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    isInitializing: true,
    user: null,
    token: null,
    login: (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("avatar", user.avatar);
        localStorage.setItem("username", user.username);
        localStorage.setItem("github_username", user.github_username);
    },
    logout: () => { },  
});

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    // Initialize from localStorage once
    useEffect(() => {
        const existingToken = localStorage.getItem("token");
        const avatar = localStorage.getItem("avatar");
        const username = localStorage.getItem("username");
        if (existingToken) {
            setToken(existingToken);
            setUser(
                username || avatar
                    ? { username: username || null, avatar: avatar || null }
                    : null
            );
        }
        setIsInitializing(false);
    }, []);

    // Sync across tabs
    useEffect(() => {
        const handler = (event) => {
            if (event.key === "token") {
                setToken(event.newValue);
            }
            if (event.key === "username" || event.key === "avatar") {
                setUser({
                    username: localStorage.getItem("username"),
                    avatar: localStorage.getItem("avatar"),
                });
            }
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem("token", newToken);
        if (newUser?.avatar) localStorage.setItem("avatar", newUser.avatar);
        if (newUser?.username) localStorage.setItem("username", newUser.username);
        setToken(newToken);
        setUser(newUser || null);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("repoUrl");
        localStorage.removeItem("avatar");
        localStorage.removeItem("username");
        localStorage.removeItem("isPublic");
        localStorage.removeItem("slug");
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated: Boolean(token),
            isInitializing,
            user,
            token,
            login,
            logout,
        }),
        [token, isInitializing, user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}


