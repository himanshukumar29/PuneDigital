/**
 * 1-Time Local Pipeline Runner (No Cloud / No Cron)
 * 
 * Usage:
 *   node scripts/run-local-scan.js "Baner" 4.1 30
 *   node scripts/run-local-scan.js "Koregaon Park" 4.2 40
 */

const fs = require('fs');
const path = require('path');

const area = process.argv[2] || "Baner";
const minRating = parseFloat(process.argv[3]) || 4.1;
const minReviews = parseInt(process.argv[4]) || 30;
const apiKey = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyDLnh-VwgBMRoDiz0gvaHD9UvIv8zoXcbA";

async function runLocalScan() {
  console.log(`\n======================================================`);
  console.log(`🚀 PuneDigital Local Lead Discovery & Demo Generator`);
  console.log(`📍 Target Area: ${area}, Pune`);
  console.log(`⭐ Minimum Rating: >= ${minRating}`);
  console.log(`💬 Minimum Reviews: >= ${minReviews}`);
  console.log(`💻 Local Mode: No cloud cron required`);
  console.log(`======================================================\n`);

  const query = `cafe in ${area} Pune`;
  const searchUrl = "https://places.googleapis.com/v1/places:searchText";

  try {
    const res = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.websiteUri,places.rating,places.userRatingCount,places.formattedAddress,places.nationalPhoneNumber,places.googleMapsUri,places.photos"
      },
      body: JSON.stringify({
        textQuery: query,
        pageSize: 15
      })
    });

    if (!res.ok) {
      throw new Error(`Google API returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const places = data.places || [];

    console.log(`🔍 Scanned ${places.length} places from Google Maps...`);

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

      if (hasNoRealWebsite && rating >= minRating && reviews >= minReviews) {
        const name = p.displayName?.text || "Restaurant";
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const demoUrl = `http://localhost:3000/s/${slug}`;
        const phone = p.nationalPhoneNumber || "N/A";

        const whatsappPitch = `Hi ${name} team! 👋 Saw your stellar ${rating}⭐ rating with ${reviews}+ reviews in ${area}. We built a custom digital prototype with your authentic photos & reviews: ${demoUrl} . Plans start at ₹2,999 (Starter) and ₹4,999 (Managed with hosting & updates). Reply YES to claim!`;

        qualified.push({
          name,
          rating,
          reviews,
          phone,
          address: p.formattedAddress,
          demoUrl,
          mapsUrl: p.googleMapsUri,
          plans: "Tier 1: ₹2,999 | Tier 2: ₹4,999",
          whatsappPitch
        });
      }
    }

    console.log(`\n🎉 Found ${qualified.length} Qualified Spots Ready for Pitching:\n`);

    qualified.forEach((lead, i) => {
      console.log(`------------------------------------------------------`);
      console.log(`[#${i + 1}] ${lead.name}`);
      console.log(`    ⭐ Rating:   ${lead.rating} (${lead.reviews} reviews)`);
      console.log(`    📞 Phone:    ${lead.phone}`);
      console.log(`    📍 Address:  ${lead.address}`);
      console.log(`    💰 Pricing:  Tier 1: ₹2,999 (Starter) | Tier 2: ₹4,999 (Managed)`);
      console.log(`    🌐 Live Demo: 👉 ${lead.demoUrl}`);
      console.log(`    💬 WhatsApp Pitch:`);
      console.log(`       "${lead.whatsappPitch}"`);
      console.log(`------------------------------------------------------`);
    });

    // Save to scratch file for quick copy/pasting
    const outDir = path.join(__dirname, '..', 'scratch');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'latest-scan.json'), JSON.stringify(qualified, null, 2));

    console.log(`\n💾 Saved results to scratch/latest-scan.json`);
    console.log(`✨ Open http://localhost:3000/agency in your browser to view the interactive Commander Dashboard!`);

  } catch (err) {
    console.error("❌ Error running local scan:", err.message);
  }
}

runLocalScan();
