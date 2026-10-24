/**
 * Quick Test Script for Google Places API (New)
 * Usage: node scripts/test-google-places.js YOUR_API_KEY
 */

const apiKey = process.argv[2] || process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey || apiKey.includes("your_")) {
  console.error("❌ Please provide a Google Places API key:");
  console.error("   node scripts/test-google-places.js YOUR_API_KEY");
  process.exit(1);
}

async function testPuneSearch() {
  console.log("🔍 Scanning Baner & Koregaon Park in Pune for cafes without websites...\n");

  const url = "https://places.googleapis.com/v1/places:searchText";
  const body = {
    textQuery: "artisan cafe in Baner Pune",
    pageSize: 15
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.websiteUri,places.rating,places.userRatingCount,places.formattedAddress,places.nationalPhoneNumber,places.photos"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Google API returned ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const places = data.places || [];

    console.log(`✅ Found ${places.length} places. Filtering for qualified leads (No website + Rating >= 4.1)...\n`);

    const qualified = [];

    for (const p of places) {
      const website = (p.websiteUri || "").toLowerCase();
      const hasNoRealWebsite = !website || 
        website.includes("instagram.com") || 
        website.includes("facebook.com") || 
        website.includes("zomato.com") || 
        website.includes("swiggy.com") || 
        website.includes("magicpin.in");

      const rating = p.rating || 0;
      const reviews = p.userRatingCount || 0;

      if (hasNoRealWebsite && rating >= 4.1 && reviews >= 30) {
        qualified.push({
          name: p.displayName?.text,
          rating: rating,
          reviews: reviews,
          phone: p.nationalPhoneNumber || "N/A",
          address: p.formattedAddress,
          photosCount: (p.photos || []).length
        });
      }
    }

    console.table(qualified);
    console.log(`\n🎉 Success! ${qualified.length} qualified leads ready for automated demo generation.`);

  } catch (err) {
    console.error("❌ Error running test:", err.message);
  }
}

testPuneSearch();
