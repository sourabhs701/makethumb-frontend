import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Decorative background */}
            <img
                src="/logo_dotted.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none hidden md:block absolute -top-24 -right-24 w-[480px] opacity-10 rotate-12"
            />
            <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative max-w-2xl mx-auto text-center space-y-8">
                {/* Brand */}
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.png" alt="Makethumb" className="h-10 md:h-12 w-auto" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Makethumb</span>
                </div>

                {/* 404 */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground">404</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Page not found</h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        The page you requested doesn’t exist or may have been moved. Check the URL, or head back home.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go Home
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent/50 transition-colors duration-200"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">Quick links</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/login" className="text-primary hover:text-primary/80 transition-colors duration-200">Login</Link>
                        <Link to="/new" className="text-primary hover:text-primary/80 transition-colors duration-200">Add New</Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-8 text-sm text-muted-foreground">
                    <p>© 2025 Makethumb. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;