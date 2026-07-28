import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: [
        {
            command: "cd .. && pnpm --filter @repo/host-shell dev",
            port: 3000,
            reuseExistingServer: !process.env.CI,
            timeout: 30000,
        },
        {
            command: "cd .. && pnpm --filter @repo/mfe-auth dev",
            port: 3001,
            reuseExistingServer: !process.env.CI,
            timeout: 30000,
        },
        {
            command: "cd .. && pnpm --filter @repo/mfe-dashboard dev",
            port: 3002,
            reuseExistingServer: !process.env.CI,
            timeout: 30000,
        },
    ],
});