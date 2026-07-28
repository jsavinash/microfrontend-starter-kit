import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Button } from "@repo/ui-components";
import { formatCurrency, formatNumber } from "@repo/utils";

// ---------- Metric Card ----------
interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    isPositive,
}) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        <p
            className={`mt-2 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"
                }`}
        >
            {isPositive ? "↑" : "↓"} {change} from last month
        </p>
    </div>
);

// ---------- Chart Placeholder ----------
const ChartPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex h-64 items-center justify-center rounded-md bg-gray-50">
            <div className="text-center">
                <span className="text-4xl">📈</span>
                <p className="mt-2 text-sm text-gray-500">
                    Chart visualization would render here
                </p>
                <p className="text-xs text-gray-400">
                    (Integrate with Recharts, Chart.js, or similar library)
                </p>
            </div>
        </div>
    </div>
);

// ---------- Recent Activity ----------
const recentActivity = [
    { id: 1, action: "New user registered", time: "2 minutes ago" },
    { id: 2, action: "Order #1234 completed", time: "15 minutes ago" },
    { id: 3, action: "Payment of $499 received", time: "1 hour ago" },
    { id: 4, action: "Server deployment successful", time: "2 hours ago" },
    { id: 5, action: "New feature flag created", time: "3 hours ago" },
];

// ---------- Dashboard Home ----------
const DashboardHome: React.FC = () => {
    const metrics = {
        revenue: 128430,
        users: 2847,
        orders: 843,
        conversion: 3.24,
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    📊 Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                    Overview of your key metrics and analytics.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Revenue"
                    value={formatCurrency(metrics.revenue)}
                    change="+12.5%"
                    isPositive={true}
                />
                <MetricCard
                    title="Active Users"
                    value={formatNumber(metrics.users)}
                    change="+8.2%"
                    isPositive={true}
                />
                <MetricCard
                    title="Total Orders"
                    value={formatNumber(metrics.orders)}
                    change="-3.1%"
                    isPositive={false}
                />
                <MetricCard
                    title="Conversion Rate"
                    value={`${metrics.conversion}%`}
                    change="+1.4%"
                    isPositive={true}
                />
            </div>

            {/* Charts */}
            <div className="mb-8 grid gap-6 md:grid-cols-2">
                <ChartPlaceholder title="Revenue Over Time" />
                <ChartPlaceholder title="User Growth" />
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Recent Activity
                    </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {recentActivity.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between px-6 py-3"
                        >
                            <span className="text-sm text-gray-700">
                                {item.action}
                            </span>
                            <span className="text-xs text-gray-500">
                                {item.time}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// ---------- Analytics Page ----------
const AnalyticsPage: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    📈 Analytics
                </h1>
                <p className="mt-2 text-gray-600">
                    Deep dive into your data with detailed analytics.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <ChartPlaceholder title="Page Views" />
                <ChartPlaceholder title="Session Duration" />
                <ChartPlaceholder title="Traffic Sources" />
                <ChartPlaceholder title="User Demographics" />
            </div>
        </div>
    );
};

// ---------- Settings Page ----------
const SettingsPage: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    ⚙️ Settings
                </h1>
                <p className="mt-2 text-gray-600">
                    Configure your dashboard preferences.
                </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Notifications
                        </label>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Weekly report summary
                                </span>
                            </label>
                        </div>
                        <div className="mt-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Anomaly alerts
                                </span>
                            </label>
                        </div>
                    </div>
                    <Button variant="primary">Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

// ---------- Dashboard App ----------
const DashboardApp: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div>
            <div className="mb-6 flex gap-2">
                <a
                    href="."
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${currentPath === "/dashboard" || currentPath.endsWith("/dashboard/")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    Overview
                </a>
                <a
                    href="analytics"
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${currentPath.includes("/analytics")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    Analytics
                </a>
                <a
                    href="settings"
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${currentPath.includes("/settings")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    Settings
                </a>
            </div>
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="." replace />} />
            </Routes>
        </div>
    );
};

export default DashboardApp;