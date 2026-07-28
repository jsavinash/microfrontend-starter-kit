import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// Dynamically resolve remote MFE URLs
// In development, use local dev servers
// In CI/CD (GitHub Pages), use VITE_MFE_*_URL env vars
const getRemoteUrl = (url: string) => {
    if (process.env.VITE_MFE_AUTH_URL && url.includes("mfeAuth")) {
        return process.env.VITE_MFE_AUTH_URL;
    }
    if (process.env.VITE_MFE_DASHBOARD_URL && url.includes("mfeDashboard")) {
        return process.env.VITE_MFE_DASHBOARD_URL;
    }
    return url;
};

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host-shell",
            remotes: {
                mfeAuth: getRemoteUrl(
                    "http://localhost:3001/assets/remoteEntry.js",
                ),
                mfeDashboard: getRemoteUrl(
                    "http://localhost:3002/assets/remoteEntry.js",
                ),
            },
            shared: ["react", "react-dom", "react-router-dom"],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: process.env.VITE_BASE_PATH || "/",
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 3000,
        strictPort: true,
        cors: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
});
