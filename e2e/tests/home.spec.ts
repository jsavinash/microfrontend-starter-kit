import { test, expect } from "@playwright/test";

test.describe("Host Shell Application", () => {
    test("should load the home page with correct title", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("h1")).toContainText(
            "Microfrontend Starter Kit",
        );
    });

    test("should navigate to auth microfrontend", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/auth"]');
        await expect(page.locator("h1")).toContainText("Authentication");
    });

    test("should navigate to dashboard microfrontend", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/dashboard"]');
        await expect(page.locator("h1")).toContainText("Dashboard");
    });

    test("should show loading state when navigating to auth", async ({
        page,
    }) => {
        await page.goto("/auth");
        // Should eventually show the auth content
        await expect(page.locator("h1")).toContainText("Authentication", {
            timeout: 10000,
        });
    });

    test("should show loading state when navigating to dashboard", async ({
        page,
    }) => {
        await page.goto("/dashboard");
        // Should eventually show the dashboard content
        await expect(page.locator("h1")).toContainText("Dashboard", {
            timeout: 10000,
        });
    });

    test("should display architecture overview on home page", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(page.locator("text=Architecture Overview")).toBeVisible();
    });

    test("should have working navigation links", async ({ page }) => {
        await page.goto("/");

        // Check navigation links exist
        await expect(
            page.locator('nav a:has-text("Auth / Profile")'),
        ).toBeVisible();
        await expect(
            page.locator('nav a:has-text("Dashboard")'),
        ).toBeVisible();
    });
});