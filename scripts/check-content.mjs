#!/usr/bin/env node
/**
 * Content guard for the public site (spec 12 "Placeholder guard" and 8.2).
 *
 * - Fails if an unresolved `{{OWNER:` placeholder appears in source that can be
 *   rendered. Owner content that isn't ready yet is `null` in src/content and
 *   hidden behind a flag, so it never needs a placeholder in code.
 * - Warns on stock phrases from the spec's banned list in public-site copy.
 *   Pass --strict to fail on those too.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');

const PLACEHOLDER_DIRS = ['src'];
const COPY_DIRS = ['src/app/(site)', 'src/components/site', 'src/content', 'src/lib'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.mdx', '.json', '.css'];
const SKIP_DIRS = new Set(['node_modules', '.next', 'generated', '__tests__']);

const BANNED = [
  'cutting-edge', 'state-of-the-art', 'world-class', 'premier', 'leading provider',
  'seamless', 'empower', 'empowering', 'leverage', 'unlock', 'elevate', 'supercharge',
  'revolutionise', 'revolutionize', 'transformative', 'game-changing', 'innovative',
  'digital transformation', 'bridge the digital divide', 'synergy', 'next level',
  'superhuman', 'exceed expectations', 'your success is our success', 'on time every time',
  'we are passionate about', 'one-stop shop',
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTENSIONS.some((ext) => name.endsWith(ext))) out.push(full);
  }
  return out;
}

function scan(dirs, test) {
  const hits = [];
  for (const dir of dirs) {
    for (const file of walk(join(root, dir))) {
      const lines = readFileSync(file, 'utf8').split(/\r?\n/);
      lines.forEach((line, i) => {
        const found = test(line);
        if (found) hits.push(`${relative(root, file).split(sep).join('/')}:${i + 1}  ${found}`);
      });
    }
  }
  return hits;
}

const placeholders = scan(PLACEHOLDER_DIRS, (line) => (line.includes('{{OWNER:') ? line.trim() : null));

const bannedRe = new RegExp(`\\b(${BANNED.map((p) => p.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'i');
const phrases = scan(COPY_DIRS, (line) => {
  // Comments may name the rule itself.
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return null;
  const m = line.match(bannedRe);
  return m ? `"${m[1]}"` : null;
});

let failed = false;

if (placeholders.length) {
  failed = true;
  console.error(`\n✖ Unresolved {{OWNER: …}} placeholders (${placeholders.length}):`);
  for (const hit of placeholders) console.error(`  ${hit}`);
}

if (phrases.length) {
  const log = strict ? console.error : console.warn;
  log(`\n${strict ? '✖' : '⚠'} Banned phrases in site copy (${phrases.length}), see spec 8.2:`);
  for (const hit of phrases) log(`  ${hit}`);
  if (strict) failed = true;
}

if (failed) process.exit(1);
console.log('✓ Content guard passed');
