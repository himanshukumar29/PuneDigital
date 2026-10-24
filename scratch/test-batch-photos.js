async function testRealPhotos(name, area) {
  const q = `${name} ${area} Pune food restaurant`;
  const tokenRes = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(q)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const text = await tokenRes.text();
  const vqdMatch = text.match(/vqd=([^&"']+)/) || text.match(/vqd="([^"]+)"/);
  if (!vqdMatch) return console.log('No vqd for:', name);
  
  const vqd = vqdMatch[1];
  const imgRes = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(q)}&o=json&vqd=${vqd}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const data = await imgRes.json();
  const results = (data.results || [])
    .map(r => r.image)
    .filter(url => url && url.startsWith('http') && !url.includes('.svg') && !url.includes('logo'));
  console.log(`\n=== ${name} (${area}) ===`);
  console.log(`Found ${results.length} photos! Top 3:`);
  console.log(results.slice(0, 3));
}

async function main() {
  await testRealPhotos('Midori Coffee and Eatery', 'Baner');
  await testRealPhotos('Brew Merchant. Cafe & Bar', 'Baner');
  await testRealPhotos('Artizen - Cafe | Art | Studio', 'Pashan Baner');
}
main();
