import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve('/home/ubuntu/LuxRoom');
const html = await readFile(resolve(root, 'detail.html'), 'utf8');
const css = await readFile(resolve(root, 'css/detail.css'), 'utf8');
const js = await readFile(resolve(root, 'js/detail.js'), 'utf8');

const requiredMarkup = [
  'id="detail-title"',
  'id="detail-price"',
  'id="qty-minus"',
  'id="qty-plus"',
  'id="add-to-cart"',
  'data-gallery-image="0"',
  'class="finish-option active"',
  'class="acc-item acc-open"',
  'data-cart-count',
];

const requiredLogic = [
  'window.LuxRoom.addToCart',
  'setupQuantityControls',
  'setupAccordions',
  'setupFinishes',
  'setupGallery',
];

const localAssets = [...html.matchAll(/(?:src|href)="([^"#?]+)"/g)]
  .map((match) => match[1])
  .filter((url) => !url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('#'));

for (const token of requiredMarkup) {
  if (!html.includes(token)) throw new Error(`Missing required markup: ${token}`);
}
for (const token of requiredLogic) {
  if (!js.includes(token)) throw new Error(`Missing required interaction: ${token}`);
}
for (const asset of localAssets) {
  const path = resolve(dirname(resolve(root, 'detail.html')), asset);
  await access(path);
}
const radiusValues = [...css.matchAll(/border-radius:\\s*([^;]+);/g)].map((match) => match[1].trim());
const nonSquareLayoutRadius = radiusValues.filter((value) => value !== '0' && value !== '50%');
if (nonSquareLayoutRadius.length > 0) {
  throw new Error(`Non-zero layout border radius found: ${nonSquareLayoutRadius.join(', ')}`);
}

console.log(`PASS: ${requiredMarkup.length} required markup hooks found.`);
console.log(`PASS: ${requiredLogic.length} interaction hooks found.`);
console.log(`PASS: ${localAssets.length} local dependencies resolve.`);
console.log('PASS: Product detail layout surfaces use square corners.');
