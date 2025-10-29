/*
Simple fetcher for customs.lk homepage announcements.
Usage: node scripts/fetch-customs.js
Saves results to assets/config/customs-latest.json
*/

const fs = require("fs");
const path = require("path");
const url = "https://www.customs.gov.lk/";

async function fetchHtml(u) {
  const res = await fetch(u, {
    headers: { "User-Agent": "gen-ui-scraper/1.0 (+https://example.com)" },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

async function extractItems(html) {
  // Very small heuristic extractor: find sections containing 'announcement' or 'news' and grab links
  const lower = html.toLowerCase();
  const candidates = [];

  // Look for <a ...> with surrounding text that likely indicates announcements
  const anchorRe = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/(?:a)>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const href = m[1];
    const inner = m[2].replace(/<[^>]+>/g, "").trim();
    if (!inner) continue;
    // filter out navigation or trivial links by heuristics
    const isNav =
      /home|logout|login|search|contact|tel:|mailto:/i.test(href) ||
      inner.length < 3 ||
      /facebook|twitter|instagram|youtube/i.test(href);
    if (isNav) continue;
    // further prefer anchors with words like notice, announcement, news, circular, tariff
    if (
      /(notice|announcement|news|circular|tariff|press)/i.test(inner) ||
      /announcement|news|notice|circular/i.test(href)
    ) {
      candidates.push({ title: inner, href: absoluteUrl(href) });
    } else {
      // also include some longer link texts
      if (inner.length > 30)
        candidates.push({ title: inner, href: absoluteUrl(href) });
    }
  }

  // Deduplicate by href
  const map = new Map();
  for (const it of candidates) {
    if (!map.has(it.href)) map.set(it.href, it);
  }
  const uniqueItems = Array.from(map.values()).slice(0, 25);

  // Fetch images for each item
  const itemsWithImages = [];
  for (const item of uniqueItems) {
    try {
      console.log(`Fetching image for: ${item.title}`);
      const imageUrl = await fetchItemImage(item.href);
      itemsWithImages.push({
        ...item,
        image: imageUrl
      });
      // Add a small delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.log(`Failed to fetch image for ${item.title}:`, err.message);
      itemsWithImages.push({
        ...item,
        image: null
      });
    }
  }

  return itemsWithImages;
}

function absoluteUrl(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("//")) return "https:" + href;
  return new URL(href, url).href;
}

async function fetchItemImage(itemUrl) {
  try {
    const html = await fetchHtml(itemUrl);
    
    // Look for featured image, og:image, or main article image
    // Try og:image first (most common for thumbnails)
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (ogImageMatch && ogImageMatch[1] && !ogImageMatch[1].includes('preloader') && !ogImageMatch[1].includes('spinner')) {
      return absoluteUrl(ogImageMatch[1]);
    }
    
    // Try twitter:image
    const twitterImageMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (twitterImageMatch && twitterImageMatch[1] && !twitterImageMatch[1].includes('preloader') && !twitterImageMatch[1].includes('spinner')) {
      return absoluteUrl(twitterImageMatch[1]);
    }
    
    // Look for featured image in common WordPress classes
    const featuredImageMatch = html.match(/<img[^>]+class=["'][^"']*featured[^"']*["'][^>]+src=["']([^"']+)["']/i);
    if (featuredImageMatch && featuredImageMatch[1] && !featuredImageMatch[1].includes('preloader') && !featuredImageMatch[1].includes('spinner')) {
      return absoluteUrl(featuredImageMatch[1]);
    }
    
    // Look for the first large image in the content area (skip small icons)
    const contentImageMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    if (contentImageMatch) {
      for (const imgTag of contentImageMatch) {
        const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
        if (srcMatch && srcMatch[1]) {
          const imgSrc = srcMatch[1];
          // Skip very small images, icons, preloaders, spinners, etc.
          if (!/(icon|logo|button|arrow|social|preloader|spinner|loading|gif)/i.test(imgSrc) && 
              !/(width=["']?\d{1,2}["']?|height=["']?\d{1,2}["']?)/i.test(imgTag) &&
              /\.(jpg|jpeg|png|webp)/i.test(imgSrc)) {
            return absoluteUrl(imgSrc);
          }
        }
      }
    }
    
    return null; // No suitable image found
  } catch (err) {
    console.log(`Error fetching image from ${itemUrl}:`, err.message);
    return null;
  }
}

async function run() {
  try {
    const html = await fetchHtml(url);
    const items = await extractItems(html);
    const out = {
      fetched_at: new Date().toISOString(),
      source: url,
      items,
    };
    const outPath = path.join(
      __dirname,
      "..",
      "public",
      "config",
      "customs-latest.json",
    );
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
    console.log(`Saved ${items.length} items to ${outPath}`);
  } catch (err) {
    console.error("Failed to fetch or save:", err);
    process.exit(1);
  }
}

run();
