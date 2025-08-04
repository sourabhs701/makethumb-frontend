import { useState, useEffect } from "react";
import { ArrowRight, Menu, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("repoUrl");
        localStorage.removeItem("avatar");
        localStorage.removeItem("username");
        localStorage.removeItem("isPublic");
        localStorage.removeItem("slug");
        setIsAuthenticated(false);
        setIsUserMenuOpen(false);
        toast.success("Logged out successfully");
        navigate("/");
    };


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <header className="sticky z-20 top-0 backdrop-blur-sm ">
            {/* Promotional Banner */}
            <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
                <p className="text-white/60 hidden md:block">
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
                            <span className="ml-2 text-xl font-bold text-black hidden sm:block">
                                MakeThumb
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate("/projects")}
                                        className="text-black/60 hover:text-black transition-colors"
                                    >
                                        Projects
                                    </button>

                                    {/* User Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleUserMenu}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <img src={localStorage.getItem("avatar")} alt="Avatar" className="h-8 w-8 rounded-full" />
                                        </button>

                                        {/* User Dropdown */}
                                        {isUserMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                                <button
                                                    onClick={() => {
                                                        setIsUserMenuOpen(false);
                                                        navigate("/settings");
                                                    }}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-black/60 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
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
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="text-black/60 hover:text-black transition-colors"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 py-4 border-t border-gray-200">
                            <nav className="flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate("/");
                                                setIsMenuOpen(false);
                                            }}
                                            className="text-left text-black/60 hover:text-black transition-colors"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate("/projects");
                                                setIsMenuOpen(false);
                                            }}
                                            className="text-left text-black/60 hover:text-black transition-colors"
                                        >
                                            Projects
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate("/settings");
                                                setIsMenuOpen(false);
                                            }}
                                            className="text-left text-black/60 hover:text-black transition-colors"
                                        >
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="text-left text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate("/login");
                                                setIsMenuOpen(false);
                                            }}
                                            className="text-left text-black/60 hover:text-black transition-colors"
                                        >
                                            Login
                                        </button>
                                    </>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
