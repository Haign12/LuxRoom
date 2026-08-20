import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = '/home/ubuntu/LuxRoom';
const htmlPath = resolve(root, 'index.html');
const cssPath = resolve(root, 'css/index.css');
const html = readFileSync(htmlPath, 'utf8');
const css = readFileSync(cssPath, 'utf8');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const value = match[1];
  if (value.startsWith('./')) {
    const localPath = value.split(/[?#]/, 1)[0];
    assert(existsSync(resolve(root, localPath)), `Missing local link or asset: ${value}`);
  }
}

for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
  const value = match[1];
  if (value.startsWith('../img/')) {
    assert(existsSync(resolve(dirname(cssPath), value)), `Missing CSS image asset: ${value}`);
  }
}

[
  'Made for the',
  'LuxRoomLiving',
  'search-overlay',
  'home-hero',
  'newsletter-form',
].forEach((token) => assert(html.includes(token), `Missing required home component: ${token}`));

[
  'Newsreader',
  'DM Sans',
  '--home-clay',
  '@media (max-width: 700px)',
  'prefers-reduced-motion',
].forEach((token) => assert(css.includes(token), `Missing required responsive/design token: ${token}`));

if (failures.length) {
  console.error('Home QA failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log('Home QA passed: local links, image assets, key design components and responsive rules verified.');
