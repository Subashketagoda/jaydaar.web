const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('JAYDAAR TECHNICAL SEO & PERFORMANCE AUDIT');
console.log('========================================\n');

// 1. Robots.txt
const robotsTxt = fs.readFileSync('robots.txt', 'utf8');
console.log('--- 1. ROBOTS.TXT ---');
console.log(robotsTxt.trim());
const hasRobotsSitemap = robotsTxt.includes('Sitemap: https://jaydaar.online/sitemap.xml');
console.log('-> Points to https://jaydaar.online/sitemap.xml:', hasRobotsSitemap ? 'PASS' : 'FAIL');

// 2. Sitemap.xml
const sitemapXml = fs.readFileSync('sitemap.xml', 'utf8');
console.log('\n--- 2. SITEMAP.XML ---');
console.log(sitemapXml.trim());
const hasSitemapLoc = sitemapXml.includes('<loc>https://jaydaar.online/</loc>');
console.log('-> Contains canonical https://jaydaar.online/:', hasSitemapLoc ? 'PASS' : 'FAIL');

// 3. CNAME
const cname = fs.existsSync('CNAME') ? fs.readFileSync('CNAME', 'utf8').trim() : 'MISSING';
console.log('\n--- 3. CNAME DOMAIN ---');
console.log('-> CNAME domain:', cname, cname === 'jaydaar.online' ? 'PASS' : 'FAIL');

// 4. index.html head & SEO tags
const html = fs.readFileSync('index.html', 'utf8');
console.log('\n--- 4. HEAD METADATA AUDIT ---');

const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1].trim() : 'MISSING!');

const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
console.log('Meta Description:', descMatch ? descMatch[1].trim() : 'MISSING!');
if (descMatch) console.log('Description length:', descMatch[1].trim().length, 'characters');

const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1].trim() : 'MISSING!');

const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
console.log('Meta Robots:', robotsMatch ? robotsMatch[1].trim() : 'MISSING!');

// Open Graph
console.log('\n--- 5. OPEN GRAPH METADATA ---');
const ogRegex = /<meta\s+property=["'](og:[a-zA-Z0-9_:]+)["']\s+content=["']([\s\S]*?)["']/gi;
let m;
const ogTags = {};
while ((m = ogRegex.exec(html)) !== null) {
  ogTags[m[1]] = m[2];
}
console.log(JSON.stringify(ogTags, null, 2));

// Twitter Cards
console.log('\n--- 6. TWITTER / SOCIAL METADATA ---');
const twRegex = /<meta\s+name=["'](twitter:[a-zA-Z0-9_:]+)["']\s+content=["']([\s\S]*?)["']/gi;
const twitterTags = {};
while ((m = twRegex.exec(html)) !== null) {
  twitterTags[m[1]] = m[2];
}
console.log(JSON.stringify(twitterTags, null, 2));

// JSON-LD
console.log('\n--- 7. JSON-LD STRUCTURED DATA AUDIT ---');
const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
if (jsonLdMatch) {
  try {
    const parsed = JSON.parse(jsonLdMatch[1]);
    console.log('JSON-LD syntax: VALID JSON!');
    console.log('@context:', parsed['@context']);
    if (parsed['@graph']) {
      console.log('Total Graph Entities:', parsed['@graph'].length);
      parsed['@graph'].forEach((item, idx) => {
        console.log(` Entity ${idx + 1}: [${Array.isArray(item['@type']) ? item['@type'].join(', ') : item['@type']}] ${item.name || item.url || ''}`);
        if (item.telephone) console.log(`   Telephone: ${item.telephone}`);
        if (item.email) console.log(`   Email: ${item.email}`);
        if (item.address) console.log(`   Address: ${JSON.stringify(item.address)}`);
      });
    }
  } catch (e) {
    console.error('JSON-LD Syntax Error:', e.message);
  }
} else {
  console.log('JSON-LD MISSING!');
}

// 8. Heading Hierarchy
console.log('\n--- 8. HEADING HIERARCHY AUDIT ---');
const headingRegex = /<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi;
const headings = [];
while ((m = headingRegex.exec(html)) !== null) {
  headings.push({ tag: m[1].toLowerCase(), text: m[3].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ') });
}
console.log('Total Headings Found:', headings.length);
const h1s = headings.filter(h => h.tag === 'h1');
console.log('H1 count (must be exactly 1):', h1s.length, h1s.length === 1 ? 'PASS' : 'FAIL');
headings.forEach(h => console.log(` [${h.tag.toUpperCase()}] ${h.text}`));

// 9. Semantic HTML Elements
console.log('\n--- 9. SEMANTIC HTML ELEMENTS ---');
console.log('<header> present:', /<header\b/i.test(html));
console.log('<nav> present:', /<nav\b/i.test(html));
console.log('<main> present:', /<main\b/i.test(html));
console.log('<section> count:', (html.match(/<section\b/gi) || []).length);
console.log('<article> present:', /<article\b/i.test(html) || 'Dynamic in JS');
console.log('<aside> present:', /<aside\b/i.test(html));
console.log('<footer> present:', /<footer\b/i.test(html));

// 10. Duplicate DOM IDs
console.log('\n--- 10. DOM ID UNIQUENESS AUDIT ---');
const idRegex = /\bid=["']([a-zA-Z0-9_\-]+)["']/gi;
const idCounts = {};
while ((m = idRegex.exec(html)) !== null) {
  idCounts[m[1]] = (idCounts[m[1]] || 0) + 1;
}
const duplicateIds = Object.entries(idCounts).filter(([id, cnt]) => cnt > 1);
if (duplicateIds.length === 0) {
  console.log('PASS: All element IDs in DOM are 100% unique!');
} else {
  console.log('FAIL: DUPLICATE IDS FOUND:', duplicateIds);
}

// 11. Internal Anchor Links
console.log('\n--- 11. INTERNAL ANCHOR TARGET AUDIT ---');
const hrefAnchorRegex = /href=["']#([a-zA-Z0-9_\-]+)["']/gi;
const internalAnchors = new Set();
while ((m = hrefAnchorRegex.exec(html)) !== null) {
  internalAnchors.add(m[1]);
}
let brokenAnchors = 0;
for (const anchor of internalAnchors) {
  const exists = idCounts[anchor] && idCounts[anchor] > 0;
  if (!exists) brokenAnchors++;
  console.log(` #${anchor}: ${exists ? 'VALID' : 'BROKEN TARGET!'}`);
}
console.log('Broken internal anchors:', brokenAnchors === 0 ? 'NONE (PASS)' : `${brokenAnchors} BROKEN!`);

// 12. Images Audit
console.log('\n--- 12. IMAGE ASSETS & ALT AUDIT ---');
const imgRegex = /<img\s+([^>]+)>/gi;
let imgCount = 0;
let missingAlt = 0;
let missingFiles = 0;
while ((m = imgRegex.exec(html)) !== null) {
  imgCount++;
  const attrs = m[1];
  const src = (attrs.match(/src=["']([^"']*)["']/) || [])[1] || '';
  const alt = (attrs.match(/alt=["']([^"']*)["']/) || [])[1];
  const width = (attrs.match(/width=["']([^"']*)["']/) || [])[1];
  const height = (attrs.match(/height=["']([^"']*)["']/) || [])[1];
  const loading = (attrs.match(/loading=["']([^"']*)["']/) || [])[1];

  let exists = true;
  if (src && !src.startsWith('http') && src !== '') {
    exists = fs.existsSync(src.split('?')[0]);
    if (!exists) missingFiles++;
  }
  if (src && alt === undefined) missingAlt++;

  console.log(` IMG ${imgCount}: src="${src}" alt="${alt || ''}" w=${width || '-'} h=${height || '-'} load=${loading || '-'} [exists: ${exists}]`);
}
console.log('Total static images:', imgCount);
console.log('Missing alt attributes:', missingAlt === 0 ? 'NONE (PASS)' : `${missingAlt} FAIL`);
console.log('Missing image files:', missingFiles === 0 ? 'NONE (PASS)' : `${missingFiles} FAIL`);

// 13. External Links Security & Crawlability
console.log('\n--- 13. EXTERNAL LINKS AUDIT ---');
const aRegex = /<a\s+([^>]+)>/gi;
let extLinkCount = 0;
let extMissingRel = 0;
while ((m = aRegex.exec(html)) !== null) {
  const attrs = m[1];
  const href = (attrs.match(/href=["']([^"']*)["']/) || [])[1] || '';
  const target = (attrs.match(/target=["']([^"']*)["']/) || [])[1];
  const rel = (attrs.match(/rel=["']([^"']*)["']/) || [])[1];

  if (target === '_blank') {
    extLinkCount++;
    if (!rel || !rel.includes('noopener')) {
      console.log(` WARNING: Target blank without noopener: href="${href}"`);
      extMissingRel++;
    }
  }
}
console.log(`Total target="_blank" links: ${extLinkCount}`);
console.log(`Missing rel="noopener": ${extMissingRel === 0 ? 'NONE (PASS)' : `${extMissingRel} FAIL`}`);

console.log('\n========================================');
console.log('AUDIT COMPLETE');
console.log('========================================');
