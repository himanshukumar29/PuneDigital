const fs = require('fs');

async function inspectHtml() {
  const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent('Artizen Cafe Baner Pune')}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });
  const html = await res.text();
  console.log('HTML length:', html.length);
  // Find all http(s) jpg or png or webp
  const imgMatches = html.match(/https?:\/\/[^"'\s\\]+\.(?:jpg|jpeg|png|webp)/gi) || [];
  console.log('Direct image extensions count:', imgMatches.length);
  console.log('Samples:', [...new Set(imgMatches)].slice(0, 10));

  // Find googleusercontent or encrypted-tbn
  const tbn = html.match(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=[^"'\s\\]+/g) || [];
  console.log('Thumbnail count:', tbn.length);
  console.log('First 5 thumbnails:', tbn.slice(0, 5));
}

inspectHtml();
