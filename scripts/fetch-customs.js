/*
Simple fetcher for customs.lk homepage announcements.
Usage: node scripts/fetch-customs.js
Saves results to assets/config/customs-latest.json
*/

const fs = require('fs');
const path = require('path');
const url = 'https://www.customs.gov.lk/';

async function fetchHtml(u) {
  const res = await fetch(u, { headers: { 'User-Agent': 'gen-ui-scraper/1.0 (+https://example.com)' } });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

function extractItems(html) {
  // Very small heuristic extractor: find sections containing 'announcement' or 'news' and grab links
  const lower = html.toLowerCase();
  const candidates = [];

  // Look for <a ...> with surrounding text that likely indicates announcements
  const anchorRe = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/(?:a)>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const href = m[1];
    const inner = m[2].replace(/<[^>]+>/g, '').trim();
    if (!inner) continue;
    // filter out navigation or trivial links by heuristics
    const isNav = /home|logout|login|search|contact|tel:|mailto:/i.test(href) || inner.length < 3 || /facebook|twitter|instagram|youtube/i.test(href);
    if (isNav) continue;
    // further prefer anchors with words like notice, announcement, news, circular, tariff
    if (/(notice|announcement|news|circular|tariff|press)/i.test(inner) || /announcement|news|notice|circular/i.test(href)) {
      candidates.push({ title: inner, href: absoluteUrl(href) });
    } else {
      // also include some longer link texts
      if (inner.length > 30) candidates.push({ title: inner, href: absoluteUrl(href) });
    }
  }

  // Deduplicate by href
  const map = new Map();
  for (const it of candidates) {
    if (!map.has(it.href)) map.set(it.href, it);
  }
  return Array.from(map.values()).slice(0, 25);
}

function absoluteUrl(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith('//')) return 'https:' + href;
  return new URL(href, url).href;
}

async function run() {
  try {
    const html = await fetchHtml(url);
    const items = extractItems(html);
    const out = {
      fetched_at: new Date().toISOString(),
      source: url,
      items,
    };
    const outPath = path.join(__dirname, '..', 'assets', 'config', 'customs-latest.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Saved ${items.length} items to ${outPath}`);
  } catch (err) {
    console.error('Failed to fetch or save:', err);
    process.exit(1);
  }
}

run();
