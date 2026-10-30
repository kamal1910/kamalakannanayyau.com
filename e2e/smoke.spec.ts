import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /Hi, I'm/ },
  { path: "/about", heading: /I'm / },
  { path: "/now", heading: "What I'm focused on" },
  { path: "/interests", heading: "Things I keep coming back to" },
  { path: "/projects", heading: "Things I'm building" },
  { path: "/writing", heading: "Notes & articles" },
  {
    path: "/writing/securing-agent-to-agent-delegation-in-dotnet",
    heading: "Securing Agent-to-Agent Delegation in .NET",
  },
  { path: "/writing/isr-isnt-dead", heading: "ISR Isn't Dead" },
  { path: "/writing/ai-certifications-2026", heading: "AI Certifications in 2026" },
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

test("writing lists posts newest first and links to DEV", async ({ page }) => {
  await page.goto("/writing");
  const titles = await page
    .getByRole("list", { name: "Articles" })
    .getByRole("heading", { level: 2 })
    .allTextContents();
  expect(titles).toEqual([
    "AI Certifications in 2026: Which Ones Are Worth It",
    "ISR Isn't Dead, It Just Moved Into The Components",
    "Securing Agent-to-Agent Delegation in .NET: A Practical Design",
  ]);

  const linkedIn = page.getByRole("region", { name: "From LinkedIn" });
  await expect(linkedIn.getByRole("heading", { level: 3 })).toHaveCount(4);
  await expect(linkedIn.getByRole("link").first()).toHaveAttribute(
    "href",
    /^https:\/\/www\.linkedin\.com\//,
  );

  await page.goto("/writing/isr-isnt-dead");
  await expect(page.getByRole("link", { name: /Read on DEV/ }).first()).toHaveAttribute(
    "href",
    /^https:\/\/dev\.to\/kamal1910\//,
  );
});

test("collapsed code sections expand", async ({ page }) => {
  await page.goto("/writing/securing-agent-to-agent-delegation-in-dotnet");
  const summary = page.getByText("Show the Crypto helper class");
  await summary.click();
  await expect(page.getByText("public static class Crypto")).toBeVisible();
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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Things I'm building");
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://kamalakannanayyau.com/about");

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap: https://kamalakannanayyau.com/sitemap.xml");
});
