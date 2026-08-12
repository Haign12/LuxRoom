import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const wishlistLink = `<a class="icon-button" href="wishlist.html" aria-label="Wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg><span class="cart-badge" data-wishlist-count style="display:none">0</span></a>`;

const pages = execSync("grep -l 'aria-label=\"Cart\"' *.html", { cwd: "/home/ubuntu/LuxRoom" })
  .toString()
  .trim()
  .split("\n");

let updated = 0;
for (const page of pages) {
  const html = readFileSync(`/home/ubuntu/LuxRoom/${page}`, "utf8");
  const marker = 'aria-label="Cart"';
  const cartAnchorStart = html.indexOf('<a class="icon-button" href="cart.html"');
  if (cartAnchorStart < 0) continue;
  const cartAnchorEnd = html.indexOf("</a>", html.indexOf("</svg>", cartAnchorStart)) + 4;
  const cartAnchor = html.slice(cartAnchorStart, cartAnchorEnd);
  if (html.includes(wishlistLink) || html.includes('aria-label="Wishlist"')) continue;
  const inserted = html.slice(0, cartAnchorEnd) + wishlistLink + html.slice(cartAnchorEnd);
  writeFileSync(`/home/ubuntu/LuxRoom/${page}`, inserted);
  updated += 1;
  console.log(`updated ${page}`);
}
console.log(`${updated} pages updated`);
