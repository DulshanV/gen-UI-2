/*
Fetch basic news/announcements from NZ Customs homepage and save to assets/config/nz-customs-latest.json
Usage: node scripts/fetch-nz-customs.js
*/
const fs = require('fs');
const path = require('path');
const url = 'https://www.customs.govt.nz/';

async function fetchHtml(u) {
  const res = await fetch(u, { headers: { 'User-Agent': 'gen-ui-nz-scraper/1.0' } });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

function extractAnchors(html) {
  const anchorRe = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/(?:a)>/gi;
  const items = [];
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const href = m[1];
    const inner = m[2].replace(/<[^>]+>/g, '').trim();
    if (!inner) continue;
    if (/(news|alert|notice|announcement|media release|press)/i.test(inner) || /(news|press|media)/i.test(href)) {
      items.push({ title: inner, href: absolute(href) });
    } else if (inner.length > 40) {
      items.push({ title: inner, href: absolute(href) });
    }
  }
  // dedupe
  const map = new Map();
  for (const it of items) if (!map.has(it.href)) map.set(it.href, it);
  return Array.from(map.values()).slice(0, 25);
}

function absolute(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith('//')) return 'https:' + href;
  return new URL(href, url).href;
}

async function run() {
  try {
    const html = await fetchHtml(url);
    const items = extractAnchors(html);
    const out = { fetched_at: new Date().toISOString(), source: url, items };
    const outPath = path.join(__dirname, '..', 'assets', 'config', 'nz-customs-latest.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
    console.log('Saved', items.length, 'items to', outPath);
  } catch (err) {
    console.error('Error', err);
    process.exit(1);
  }
}

run();
