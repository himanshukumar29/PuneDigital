async function fetchRestaurantPhotos(query) {
  try {
    const tokenRes = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const text = await tokenRes.text();
    const vqdMatch = text.match(/vqd=([^&"']+)/) || text.match(/vqd="([^"]+)"/);
    if (!vqdMatch) return [];
    
    const vqd = vqdMatch[1];
    const imgRes = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&o=json&vqd=${vqd}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const data = await imgRes.json();
    return (data.results || [])
      .map(r => r.image)
      .filter(url => url && url.startsWith('http') && !url.includes('.svg') && !url.includes('logo'));
  } catch (e) {
    console.error('Error fetching photos for:', query, e.message);
    return [];
  }
}

async function run() {
  for (const q of [
    'The Rustle Nest Baner Pune restaurant',
    'Brew Merchant Cafe Baner Pune food',
    'Cafe Peter Baner Pune'
  ]) {
    console.log(`\n=== Testing: ${q} ===`);
    const photos = await fetchRestaurantPhotos(q);
    console.log(`Found ${photos.length} photos:`);
    photos.slice(0, 4).forEach((p, idx) => console.log(`  [${idx + 1}] ${p}`));
  }
}

run();
