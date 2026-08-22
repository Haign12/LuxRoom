import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd());
const routes = {
  'index.html': ['home-hero', 'collection'],
  'products.html': ['product-grid', 'filter'],
  'detail.html': ['d-gallery', 'add-to-cart'],
  'cart.html': ['cart-items', 'checkout'],
  'checkout.html': ['checkout-form', 'checkout-summary-items'],
  'success.html': ['order'],
  'tracking.html': ['tracking-timeline', 'tracking-items'],
  'wishlist.html': ['wishlist-grid', 'share-room'],
  'auth.html': ['form-login', 'form-register'],
  'profile.html': ['profile-layout'],
  'about.html': ['story-hero', 'material-triptych'],
  'contact.html': ['contact-form', 'contact-grid'],
};
let assertions = 0;
for (const [file, hooks] of Object.entries(routes)) {
  const source = await readFile(path.join(root, file), 'utf8');
  if (!source.includes('css/common.css')) throw new Error(`${file}: missing common stylesheet`);
  if (!source.includes('js/common.js')) throw new Error(`${file}: missing common runtime`);
  if (source.includes('>Journal<')) throw new Error(`${file}: stale Journal label`);
  for (const hook of hooks) {
    if (!source.includes(hook)) throw new Error(`${file}: missing ${hook}`);
    assertions += 1;
  }
  const assetPaths = [...source.matchAll(/(?:src|href)="(img\/[^"?#]+|css\/[^"?#]+|js\/[^"?#]+)"/g)].map((match) => match[1]);
  for (const asset of assetPaths) await access(path.join(root, asset));
  assertions += assetPaths.length + 2;
}
const sharpSheets = ['css/common.css','css/products.css','css/cart.css','css/checkout.css','css/auth.css','css/profile.css','css/success.css','css/tracking.css','css/about.css','css/contact.css'];
for (const sheet of sharpSheets) {
  const source = await readFile(path.join(root, sheet), 'utf8');
  if (/border-radius\s*:\s*(?:[1-9]\d*|\d+\.\d+)(?:px|rem|%)/.test(source)) throw new Error(`${sheet}: contains a rounded UI surface`);
  assertions += 1;
}
console.log(`PASS: ${assertions} structural, dependency and sharp-layout assertions.`);
