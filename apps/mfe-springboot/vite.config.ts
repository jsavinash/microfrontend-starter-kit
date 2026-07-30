import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "mfeSpringboot",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App.tsx",
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
        port: 3003,
        strictPort: true,
        cors: true,
    },
    preview: {
        port: 3003,
        strictPort: true,
    },
});