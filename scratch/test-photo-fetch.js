const fs = require('fs');

async function testFetchGoogleImages(query) {
  const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });
  const html = await res.text();
  // Match image URLs
  const regex = /\["(https:\/\/[^"]+?)",\s*(\d+),\s*(\d+)\]/g;
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    const imgUrl = m[1];
    if (
      !imgUrl.includes('gstatic.com') && 
      !imgUrl.includes('google.com') &&
      !imgUrl.includes('logo') &&
      imgUrl.startsWith('http')
    ) {
      matches.push(imgUrl);
    }
  }
  console.log('Query:', query);
  console.log('Found image count:', matches.length);
  console.log('First 5 images:', matches.slice(0, 5));
}

testFetchGoogleImages('Artizen Cafe Baner Pune');
