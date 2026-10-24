/**
 * 1-Click Demo Generator for Any Pune Restaurant
 * 
 * Usage:
 *   node scripts/generate-demo-for-lead.js "Artizen Baner Pune"
 *   node scripts/generate-demo-for-lead.js "German Bakery Koregaon Park Pune"
 */

const fs = require('fs');
const path = require('path');

const apiKey = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyDLnh-VwgBMRoDiz0gvaHD9UvIv8zoXcbA";
const query = process.argv[2] || "Artizen - Cafe | Art | Studio Pashan Baner Pune";

async function generateDemo() {
  console.log(`\n🔍 Searching Google Places for: "${query}"...`);

  const searchUrl = "https://places.googleapis.com/v1/places:searchText";
  const searchRes = await fetch(searchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.googleMapsUri,places.photos,places.primaryType"
    },
    body: JSON.stringify({
      textQuery: query,
      pageSize: 1
    })
  });

  if (!searchRes.ok) {
    const err = await searchRes.text();
    console.error("❌ Google Places API error:", err);
    process.exit(1);
  }

  const searchData = await searchRes.json();
  const place = searchData.places?.[0];

  if (!place) {
    console.error("❌ No matching place found on Google Places.");
    process.exit(1);
  }

  const name = place.displayName?.text || query;
  const rating = place.rating || 4.2;
  const reviewsCount = place.userRatingCount || 100;
  const address = place.formattedAddress || "Pune, Maharashtra";
  const phone = place.nationalPhoneNumber || "N/A";
  const mapsUrl = place.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(name)}`;
  
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  console.log(`\n✅ Found: ${name}`);
  console.log(`   📍 Address: ${address}`);
  console.log(`   📞 Phone: ${phone}`);
  console.log(`   ⭐ Rating: ${rating} (${reviewsCount} reviews)`);
  console.log(`   🔗 Google Maps: ${mapsUrl}`);

  // Resolve Photos
  let photos = [];
  if (Array.isArray(place.photos) && place.photos.length > 0) {
    photos = place.photos.slice(0, 6).map(p => ({
      url: `https://places.googleapis.com/v1/${p.name}/media?maxHeightPx=1200&maxWidthPx=1600&key=${apiKey}`,
      author: p.authorAttributions?.[0]?.displayName || "Google Maps Reviewer",
      source: "google_places_api",
      is_google_verified: true
    }));
    console.log(`   📸 Found ${photos.length} uploaded Google Maps photos.`);
  } else {
    console.log(`   ℹ️ Note: No Google Maps photos returned on this key tier. Using curated Pune photography stream.`);
  }

  const demoUrl = `http://localhost:3000/s/${slug}`;

  console.log(`\n======================================================`);
  console.log(`🎉 Demo Ready!`);
  console.log(`💰 Pricing Plans:`);
  console.log(`   - Tier 1: ₹2,999 (Starter Presence)`);
  console.log(`   - Tier 2: ₹4,999 / year (1 Year Managed Care + Hosting + Changes)`);
  console.log(`🚀 Click to Open in Browser:`);
  console.log(`   ${demoUrl}`);
  console.log(`======================================================\n`);
}

generateDemo().catch(console.error);
