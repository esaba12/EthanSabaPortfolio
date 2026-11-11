#!/usr/bin/env node
// Copy check for the site. Fails on any em dash in source, content or the README,
// and warns on stock phrases that make copy sound generic.
// Run with `npm run lint:copy`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SCAN_DIRS = ['src'];
const SCAN_FILES = ['README.md'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.css', '.md']);

const EM_DASH = '—';
const BANNED = ['passionate', 'leverage', 'cutting-edge', 'seamless', 'innovative', 'journey'];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (EXTENSIONS.has(extname(name))) out.push(path);
  }
  return out;
}

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(join(ROOT, d))),
  ...SCAN_FILES.map((f) => join(ROOT, f)),
];

let errors = 0;
let warnings = 0;

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const where = `${relative(ROOT, file)}:${i + 1}`;
    if (line.includes(EM_DASH)) {
      errors += 1;
      console.error(`error  ${where}  em dash: rewrite with a period, comma, colon or "to"`);
    }
    for (const word of BANNED) {
      if (new RegExp(`\\b${word}\\b`, 'i').test(line)) {
        warnings += 1;
        console.warn(`warn   ${where}  stock phrase "${word}"`);
      }
    }
  });
}

console.log(`copy check: ${files.length} files, ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
