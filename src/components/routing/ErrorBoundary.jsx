import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Unhandled UI error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="max-w-md text-center">
                        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
                        <p className="text-muted-foreground mb-4">Please refresh the page or try again later.</p>
                        <pre className="text-xs text-left bg-muted p-3 rounded overflow-auto max-h-48">{String(this.state.error)}</pre>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}


