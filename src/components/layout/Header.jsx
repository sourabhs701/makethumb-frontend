import { useState } from "react";
import { ArrowRight, Menu, LogOut, Settings, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";

export const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { resolvedTheme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        toast.success("Logged out successfully");
        navigate("/");
    };




    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <header className="sticky z-20 top-0 backdrop-blur-sm ">
            {/* Promotional Banner */}
            <div className="flex justify-center items-center py-3 bg-primary text-primary-foreground text-sm gap-3">
                <p className="block opacity-80">
                    Deploy React apps in seconds. Zero config. Instant updates.
                </p>
                <div className="inline-flex gap-1 items-center" >
                    <p>Launch your project</p>
                    <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
                </div>
            </div>


            {/* Main Navigation */}
            <div className="py-5 ">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <img src="/logo.png" alt="Logo" height={40} width={40} />
                            <span className="ml-2 text-xl font-bold text-foreground dark:text-white  block">
                                MakeThumb
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="flex items-center gap-6">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-accent transition-colors"
                                aria-label="Toggle theme"
                                title="Toggle theme"
                            >
                                {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate("/projects")}
                                        className="text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        Projects
                                    </button>

                                    {/* User Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleUserMenu}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <img src={localStorage.getItem("avatar")} alt="Avatar" className="h-8 w-8 rounded-full" />
                                        </button>

                                        {/* User Dropdown */}
                                        {isUserMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-card text-card-foreground rounded-lg shadow-lg border border-border py-2">
                                                <button
                                                    onClick={() => {
                                                        setIsUserMenuOpen(false);
                                                        navigate("/settings");
                                                    }}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-foreground/70 hover:bg-accent transition-colors"
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* <button
                                        onClick={() => navigate("/login")}
                                        className="text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        Login
                                    </button> */}
                                </>
                            )}
                        </nav>


                    </div>
                </div>
            </div>
        </header>
    );
};
