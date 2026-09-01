import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = 'http://127.0.0.1:8765';
const out = 'qa/evidence/raw';
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(name, route, viewport, action) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
  await page.goto(`${base}/${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  await page.addStyleTag({ content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;scroll-behavior:auto!important}` });
  if (action) await action(page);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyHeight: document.body.scrollHeight,
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    active: document.querySelector('.main-nav a.active')?.textContent?.trim() || '',
  }));
  await fs.writeFile(`${out}/${name}.json`, JSON.stringify({ ...metrics, errors }, null, 2));
  await context.close();
}

const desktop = { width: 1440, height: 1000 };
const mobile = { width: 390, height: 844 };
const routes = [
  ['home','index.html'],
  ['collection','products.html'],
  ['detail','detail.html?product=1'],
  ['about','about.html'],
  ['contact','contact.html'],
  ['cart','cart.html'],
  ['checkout','checkout.html'],
];

for (const [name, route] of routes) {
  await capture(`${name}-desktop`, route, desktop);
  await capture(`${name}-mobile`, route, mobile);
}

await capture('home-mobile-menu', 'index.html', mobile, async page => {
  await page.locator('.mobile-menu-toggle').click();
});
await capture('collection-mobile-filter', 'products.html', mobile, async page => {
  await page.locator('.filter-toggle').click();
});
await capture('home-scrolled-desktop', 'index.html', desktop, async page => {
  await page.evaluate(() => window.scrollTo(0, 650));
});
await capture('detail-mobile-lower', 'detail.html?product=1', mobile, async page => {
  await page.locator('.d-spec').scrollIntoViewIfNeeded();
});

await browser.close();
