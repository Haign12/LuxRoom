import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = '/home/ubuntu/LuxRoom';
const files = (await readdir(root)).filter((name) => name.endsWith('.html'));
let changes = 0;
for (const name of files) {
  const filePath = path.join(root, name);
  const source = await readFile(filePath, 'utf8');
  const updated = source.replaceAll('href="contact.html">Journal</a>', 'href="contact.html">Contact</a>');
  if (updated !== source) {
    await writeFile(filePath, updated);
    changes += 1;
  }
}
console.log(`Normalized navigation labels in ${changes} HTML files.`);
