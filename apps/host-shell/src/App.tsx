import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Button } from "@repo/ui-components";

// Lazy load remote microfrontends with type-safe wrappers
const MfeAuth = lazy(() => import("mfeAuth/App"));
const MfeDashboard = lazy(() => import("mfeDashboard/App"));

// ---------- Error Boundary ----------
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Microfrontend failed to load:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 p-8">
                        <h2 className="mb-2 text-xl font-semibold text-red-700">
                            Something went wrong
                        </h2>
                        <p className="mb-4 text-red-600">
                            {this.state.error?.message ||
                                "Failed to load module"}
                        </p>
                        <Button
                            variant="outline"
                            onClick={() =>
                                this.setState({ hasError: false, error: null })
                            }
                        >
                            Try Again
                        </Button>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}

// ---------- Loading Fallback ----------
const LoadingFallback: React.FC<{ name: string }> = ({ name }) => (
    <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="text-gray-500">Loading {name}...</p>
        </div>
    </div>
);

// ---------- Navigation ----------
const Navigation: React.FC = () => (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-8">
                <Link
                    to="/"
                    className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
                >
                    🏠 Microfrontend Starter
                </Link>
                <div className="flex gap-4">
                    <Link
                        to="/auth"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        Auth / Profile
                    </Link>
                    <Link
                        to="/dashboard"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    </nav>
);

// ---------- Home Page ----------
const Home: React.FC = () => (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
            Microfrontend Starter Kit
        </h1>
        <p className="mb-8 text-lg text-gray-600">
            A production-ready monorepo with Turborepo, Vite Module Federation,
            React 19, and TypeScript.
        </p>
        <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    🔐 Auth Microfrontend
                </h2>
                <p className="mb-4 text-gray-600">
                    Authentication, user profile, and account management.
                </p>
                <Link to="/auth">
                    <Button variant="primary">Go to Auth</Button>
                </Link>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    📊 Dashboard Microfrontend
                </h2>
                <p className="mb-4 text-gray-600">
                    Analytics, charts, and data visualization.
                </p>
                <Link to="/dashboard">
                    <Button variant="primary">Go to Dashboard</Button>
                </Link>
            </div>
        </div>
        <div className="rounded-lg bg-gray-100 p-6 text-left">
            <h3 className="mb-2 font-semibold text-gray-700">
                Architecture Overview
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>
                    <strong>Host Shell</strong> (port 3000) — Container app with
                    routing and shared layout
                </li>
                <li>
                    <strong>MFE Auth</strong> (port 3001) — Authentication
                    microfrontend
                </li>
                <li>
                    <strong>MFE Dashboard</strong> (port 3002) — Dashboard
                    microfrontend
                </li>
                <li>
                    <strong>Shared Packages</strong> — UI components, utilities,
                    configs
                </li>
            </ul>
        </div>
    </div>
);

// ---------- App ----------
const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="mx-auto max-w-7xl px-4 py-8">
                <Suspense fallback={<LoadingFallback name="application" />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/auth/*"
                            element={
                                <ErrorBoundary>
                                    <Suspense
                                        fallback={
                                            <LoadingFallback name="Auth Microfrontend" />
                                        }
                                    >
                                        <MfeAuth />
                                    </Suspense>
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/dashboard/*"
                            element={
                                <ErrorBoundary>
                                    <Suspense
                                        fallback={
                                            <LoadingFallback name="Dashboard Microfrontend" />
                                        }
                                    >
                                        <MfeDashboard />
                                    </Suspense>
                                </ErrorBoundary>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
};

export default App;
