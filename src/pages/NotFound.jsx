import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* 404 Icon */}
                <div className="space-y-6">

                    <h1 className="text-6xl md:text-8xl font-bold text-foreground">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Page Not Found
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go Home
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Need help? Try these pages:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link
                            to="/login"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Create Account
                        </Link>
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