import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /Hi, I'm/ },
  { path: "/about", heading: /I'm / },
  { path: "/now", heading: "What I'm focused on" },
  { path: "/interests", heading: "Things I keep coming back to" },
  { path: "/projects", heading: "Things I've built" },
  { path: "/writing", heading: "Notes & articles" },
  { path: "/writing/hello-world", heading: "Hello, world" },
  { path: "/contact", heading: "Let's talk" },
];

for (const { path, heading } of pages) {
  test(`${path} renders`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

test("avatar loads on the home page", async ({ page }) => {
  await page.goto("/");
  const avatar = page.getByRole("img", { name: /^Portrait of/ });
  await expect(avatar).toBeVisible();
  expect(await avatar.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
});

test("unknown paths return 404", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("wandered off");
});

test("/now streams the GitHub section", async ({ page }) => {
  await page.goto("/now");
  await expect(page.getByText("Live from GitHub")).toBeVisible();
});

test("theme toggle switches and persists", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const wasDark = await html.evaluate((el) => el.classList.contains("dark"));

  await page.getByRole("button", { name: /Switch to (light|dark) theme/ }).click();
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark)/ : /dark/);

  await page.reload();
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark)/ : /dark/);
});

test("navigation works client-side", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Things I've built");
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://kamalakannanayyau.com/about");

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap: https://kamalakannanayyau.com/sitemap.xml");
});
