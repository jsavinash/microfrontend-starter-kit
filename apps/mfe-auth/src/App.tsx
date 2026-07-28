import React, { useState } from "react";
import {
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { Button } from "@repo/ui-components";
import { formatDate } from "@repo/utils";

// ---------- Login Page ----------
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        // Navigate to relative profile page
        navigate("profile");
    };

    return (
        <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                    Sign In
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="register"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

// ---------- Register Page ----------
const RegisterPage: React.FC = () => {
    return (
        <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                    Create Account
                </h2>
                <p className="mb-6 text-center text-gray-600">
                    Registration form would go here.
                </p>
                <div className="text-center">
                    <Link to="..">
                        <Button variant="outline">Back to Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ---------- Profile Page ----------
const ProfilePage: React.FC = () => {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        role: "Administrator",
        joined: "2024-01-15",
    };

    return (
        <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {user.name}
                        </h2>
                        <p className="text-gray-600">{user.role}</p>
                    </div>
                </div>
                <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium text-gray-900">
                            {user.email}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Member since</span>
                        <span className="font-medium text-gray-900">
                            {formatDate(user.joined)}
                        </span>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Link to="..">
                        <Button variant="outline">Back to Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ---------- Auth App ----------
const AuthApp: React.FC = () => {
    const location = useLocation();
    // Determine if we're on a sub-route to highlight the active tab
    const currentPath = location.pathname;
    const isLogin =
        !currentPath.endsWith("/register") && !currentPath.endsWith("/profile");

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    🔐 Authentication
                </h1>
                <p className="mt-2 text-gray-600">
                    Sign in, register, or view your profile.
                </p>
            </div>
            <div className="mb-6 flex gap-2">
                <Link
                    to="."
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        isLogin
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Login
                </Link>
                <Link
                    to="register"
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        currentPath.endsWith("/register")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Register
                </Link>
                <Link
                    to="profile"
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        currentPath.endsWith("/profile")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Profile
                </Link>
            </div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="." replace />} />
            </Routes>
        </div>
    );
};

export default AuthApp;
