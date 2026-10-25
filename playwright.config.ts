import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

// Runs against the production build so pre-rendered pages and streamed SSR
// are tested exactly as they ship. Run `npm run build` first.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start",
    url: `http://localhost:${PORT}`,
    env: { PORT: String(PORT) },
    reuseExistingServer: !process.env.CI,
  },
});
