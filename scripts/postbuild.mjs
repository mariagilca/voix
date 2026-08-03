/**
 * Post-build checks and generated artefacts.
 *
 *   node scripts/postbuild.mjs [--check-only]
 *
 * Runs against ./build after `npm run build`. Two jobs:
 *
 *  1. Verify the things that silently rot: canonical origin, trailing slashes,
 *     sitemap entries that point at pages that do not exist, pages with zero or
 *     several <h1>, JSON-LD that does not parse, and stale domain references.
 *  2. Generate /llms.txt from what was actually built, so the file cannot drift
 *     away from the site the way a hand-maintained index would.
 */

import {readFileSync, writeFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const BUILD = 'build';
const ORIGIN = 'https://www.voix.md';
const STALE = ['voix.com', 'voix.studio', 'https://voix.md', 'http://voix.md'];

const problems = [];
const fail = (msg) => problems.push(msg);

/**
 * Attribute values arrive HTML-escaped, so `it's` is six characters of `&#x27;`
 * in the source. Measuring the raw attribute would flag descriptions that are
 * comfortably within budget once decoded.
 */
const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&#x2F;/g, '/')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

/* ------------------------------------------------------------- html walk -- */

function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (entry.endsWith('.html')) acc.push(full);
  }
  return acc;
}

if (!existsSync(BUILD)) {
  console.error('build/ not found - run `npm run build` first.');
  process.exit(1);
}

const pages = htmlFiles(BUILD);
const routeOf = (file) =>
  '/' + relative(BUILD, file).replace(/index\.html$/, '').replace(/\\/g, '/');

/* --------------------------------------------------------------- sitemap -- */

const sitemapPath = join(BUILD, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml was not generated');
}

const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!locs.length) fail('sitemap.xml contains no <loc> entries');

for (const loc of locs) {
  if (!loc.startsWith(`${ORIGIN}/`)) {
    fail(`sitemap: not on the canonical www origin -> ${loc}`);
  }
  if (!loc.endsWith('/')) {
    // GitHub Pages 301s /x to /x/, so a sitemap entry without the slash is a
    // redirect and Search Console reports it as "Page with redirect".
    fail(`sitemap: missing trailing slash (would 301) -> ${loc}`);
  }
  const route = loc.slice(ORIGIN.length);
  const onDisk = join(BUILD, route, 'index.html');
  if (!existsSync(onDisk)) {
    fail(`sitemap: points at a page that was not built -> ${loc}`);
  }
}

/* ----------------------------------------------------------- page checks -- */

const seenDescriptions = new Map();
const index = [];

for (const file of pages) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  const label = route || '/';

  if (route.startsWith('/404')) continue;

  // headings
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s === 0) fail(`${label}: no <h1>`);
  if (h1s > 1) fail(`${label}: ${h1s} <h1> elements, expected exactly 1`);

  // canonical
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  if (!canonical) {
    fail(`${label}: no canonical link`);
  } else if (!canonical[1].startsWith(`${ORIGIN}/`)) {
    fail(`${label}: canonical is not on the www origin -> ${canonical[1]}`);
  }

  // Description quality is only enforced on pages we ask Google to index.
  // Docusaurus hands its own fallback text to generated author/archive routes,
  // and those are deliberately kept out of the sitemap.
  const indexed = locs.includes(`${ORIGIN}${route}`);

  const desc = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/,
  );
  if (!desc || !desc[1].trim()) {
    fail(`${label}: no meta description`);
  } else if (indexed) {
    const text = decode(desc[1]);
    if (text.length > 160) {
      fail(`${label}: meta description is ${text.length} chars (max 160)`);
    }
    const prior = seenDescriptions.get(text);
    if (prior) fail(`${label}: meta description duplicates ${prior}`);
    else seenDescriptions.set(text, label);
  }

  // title
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/);
  if (!title || !title[1].trim()) fail(`${label}: no <title>`);
  if (title && title[1].includes('| voix | voix')) {
    fail(`${label}: doubled site suffix in <title> -> ${title[1]}`);
  }

  // JSON-LD must parse
  for (const [, body] of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      const parsed = JSON.parse(body);
      const nodes = parsed['@graph'] || [parsed];
      for (const node of nodes) {
        if (!node['@type']) fail(`${label}: JSON-LD node without @type`);
      }
    } catch (err) {
      fail(`${label}: JSON-LD does not parse - ${err.message}`);
    }
  }

  // stale domains, ignoring the anchors that legitimately mention the old host
  for (const needle of STALE) {
    if (html.includes(needle)) {
      fail(`${label}: stale reference to ${needle}`);
    }
  }

  if (indexed) {
    index.push({
      route,
      title: (title?.[1] || '').replace(/\s*\|\s*voix\s*$/, '').trim(),
      description: (desc?.[1] || '').trim(),
    });
  }
}

/* -------------------------------------------------------------- llms.txt -- */

const GROUPS = [
  {
    heading: 'Start here',
    match: (r) => r === '/' || r === '/services/' || r === '/process/' || r === '/pricing/',
  },
  {
    heading: 'Answers',
    match: (r) => r === '/faq/' || r === '/case-studies/' || r === '/about/',
  },
  {heading: 'Migration handbook', match: (r) => r.startsWith('/docs/')},
  {heading: 'Field notes', match: (r) => r.startsWith('/blog/')},
  {
    heading: 'Optional',
    match: (r) => ['/terms/', '/imprint/', '/confidentiality/'].includes(r),
  },
];

function buildLlmsTxt() {
  const lines = [
    '# voix',
    '',
    '> voix is a documentation studio that migrates product documentation off',
    '> locked proprietary platforms onto open-source stacks the client owns:',
    '> Markdown in Git, Docusaurus, and a CI/CD publishing pipeline. Engagements',
    '> are one-time deliveries ending in handover, not ongoing retainers.',
    '',
    'Founded and run by Maria Gilca from Moldova, working with remote teams.',
    'Contact: mariag@voix.md',
    '',
    'This file is generated from the built site, so it never drifts from what is',
    'actually published. Everything listed is public and free to quote and cite.',
    '',
  ];

  const used = new Set();
  for (const group of GROUPS) {
    const rows = index
      .filter((p) => !used.has(p.route) && group.match(p.route))
      .sort((a, b) => a.route.localeCompare(b.route));
    if (!rows.length) continue;
    rows.forEach((r) => used.add(r.route));
    lines.push(`## ${group.heading}`, '');
    for (const r of rows) {
      const name = r.route === '/' ? 'voix' : r.title || r.route;
      const desc = r.description ? `: ${r.description}` : '';
      lines.push(`- [${name}](${ORIGIN}${r.route})${desc}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

/* ----------------------------------------------------------------- report -- */

const checkOnly = process.argv.includes('--check-only');

if (!checkOnly) {
  const llms = buildLlmsTxt();
  writeFileSync(join(BUILD, 'llms.txt'), llms);
  writeFileSync('static/llms.txt', llms);
  console.log(`llms.txt written (${index.length} pages indexed)`);
}

console.log(`\nchecked ${pages.length} pages, ${locs.length} sitemap entries`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('all checks passed');
