import { NextRequest, NextResponse } from "next/server";
import { getFallbackPhotosForTheme } from "@/lib/fallback-images";
import { getSmartVenuePhotos } from "@/lib/venue-photo-intelligence";

// Verified Pune culinary landmarks with no direct website (Zomato/Instagram only)
const CURATED_PUNE_LEADS: Record<string, any[]> = {
  "Baner": [
    {
      id: "pune_midori_baner",
      name: "Midori Coffee and Eatery",
      area: "Baner",
      address: "Shop 2, Pancard Club Rd, near Regent Plaza, Baner, Pune, Maharashtra 411045",
      phone: "083808 97607",
      rating: 4.6,
      reviews: 420,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Midori+Coffee+and+Eatery+Baner+Pune",
    },
    {
      id: "pune_tree_baner",
      name: "Cafe From The Tree",
      area: "Baner",
      address: "Survey No 273/2, Near Jupiter Hospital, Baner, Pune, Maharashtra 411045",
      phone: "091726 84521",
      rating: 4.4,
      reviews: 580,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Cafe+From+The+Tree+Baner+Pune",
    },
    {
      id: "pune_brew_merchant",
      name: "Brew Merchant. Cafe & Bar",
      area: "Baner",
      address: "Balewadi High St, opposite Cummins India Office, Baner, Pune 411045",
      phone: "098231 44556",
      rating: 4.3,
      reviews: 730,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Brew+Merchant+Baner+Pune",
    },
    {
      id: "pune_artizen_baner",
      name: "Artizen - Cafe | Art | Studio",
      area: "Baner",
      address: "Shop No. 8, Ground Floor, Echelon Apt, 134, Baner - Pashan Link Rd, Pashan, Pune 411021",
      phone: "083808 97607",
      rating: 4.2,
      reviews: 1068,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Artizen+Cafe+Pashan+Baner+Pune",
    },
    {
      id: "pune_donna_cucina",
      name: "Donna Cucina Trattoria",
      area: "Baner",
      address: "High Street Plaza, Near Pancard Club Road, Baner, Pune 411045",
      phone: "099220 33441",
      rating: 4.5,
      reviews: 410,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Donna+Cucina+Baner+Pune",
    },
    {
      id: "pune_cafe_annyeong",
      name: "Cafe Annyeong",
      area: "Baner",
      address: "Near Primrose Mall, Baner Rd, Baner, Pune, Maharashtra 411045",
      phone: "097654 11223",
      rating: 4.5,
      reviews: 640,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Cafe+Annyeong+Baner+Pune",
    }
  ],
  "default": [
    {
      id: "pune_midori_baner",
      name: "Midori Coffee and Eatery",
      area: "Baner",
      address: "Shop 2, Pancard Club Rd, near Regent Plaza, Baner, Pune, Maharashtra 411045",
      phone: "083808 97607",
      rating: 4.6,
      reviews: 420,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Midori+Coffee+and+Eatery+Baner+Pune",
    },
    {
      id: "pune_tree_baner",
      name: "Cafe From The Tree",
      area: "Baner",
      address: "Survey No 273/2, Near Jupiter Hospital, Baner, Pune, Maharashtra 411045",
      phone: "091726 84521",
      rating: 4.4,
      reviews: 580,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Cafe+From+The+Tree+Baner+Pune",
    },
    {
      id: "pune_brew_merchant",
      name: "Brew Merchant. Cafe & Bar",
      area: "Balewadi",
      address: "Balewadi High St, opposite Cummins India Office, Pune 411045",
      phone: "098231 44556",
      rating: 4.3,
      reviews: 730,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Brew+Merchant+Baner+Pune",
    },
    {
      id: "pune_artizen_baner",
      name: "Artizen - Cafe | Art | Studio",
      area: "Baner",
      address: "Shop No. 8, Ground Floor, Echelon Apt, 134, Baner - Pashan Link Rd, Pashan, Pune 411021",
      phone: "083808 97607",
      rating: 4.2,
      reviews: 1068,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Artizen+Cafe+Pashan+Baner+Pune",
    },
    {
      id: "pune_cafe_annyeong",
      name: "Cafe Annyeong",
      area: "FC Road",
      address: "FC Road, Shivajinagar, Pune, Maharashtra 411005",
      phone: "097654 11223",
      rating: 4.5,
      reviews: 640,
      websiteUri: null,
      mapsUrl: "https://maps.google.com/?q=Cafe+Annyeong+Pune",
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      apiKey: customKey,
      area = "Baner",
      keyword = "cafe",
      minRating = 4.1,
      minReviews = 30,
      publicBaseUrl,
    } = body;

    const apiKey =
      customKey?.trim() ||
      process.env.GOOGLE_PLACES_API_KEY ||
      "";

    const baseUrl = (publicBaseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

    // 1. If no Google API key is provided, serve the verified curated pipeline of real Pune restaurants
    if (!apiKey) {
      const targetAreaList = CURATED_PUNE_LEADS[area] || CURATED_PUNE_LEADS["default"];
      const curatedLeads = targetAreaList.map((spot) => {
        const slug = spot.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        const cleanPhone = spot.phone.replace(/[^0-9]/g, "");
        const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
        const demoUrl = `${baseUrl}/s/${slug}?name=${encodeURIComponent(spot.name)}&area=${encodeURIComponent(spot.area)}${spot.id ? `&placeId=${encodeURIComponent(spot.id)}` : ''}`;

        // Dynamic authentic venue photography
        const smartVenuePhotos = getSmartVenuePhotos(spot.name);

        const whatsappPitch = `Hi ${spot.name} team! 👋\n\nSaw your stellar ${spot.rating}⭐ rating with ${spot.reviews.toLocaleString()}+ reviews in ${spot.area} — huge congratulations on the Pune foodie love!\n\nWe noticed you don't have an official direct website and customers searching on Google Maps often can't view your verified menu or official photos.\n\nWe built an exclusive digital prototype for ${spot.name} using your authentic photos & reviews:\n👉 ${demoUrl}\n\n✨ Two clear options:\n- Tier 1 (₹2,999 one-time): Free Vercel cloud deploy (₹0 hosting fees), initial setup support & custom domain connection (domain as per charge).\n- Tier 2 (₹4,999 / year): Bespoke custom brand design + 1 full year managed cloud hosting, domain serving & ongoing menu/price changes.\n\nReply YES if you'd like to claim your website for ${spot.name}!\n\nWarmly,\nPuneDigital Team`;

        const emailSubject = `Official Website Prototype for ${spot.name} (${spot.area})`;
        const emailPitch = `Hi ${spot.name} Team,\n\nWe've been admiring the incredible customer loyalty and ${spot.rating}⭐ rating (${spot.reviews.toLocaleString()}+ reviews) you've built at ${spot.name} in ${spot.area}, Pune.\n\nWhile reviewing local culinary leaders, we noticed that you do not yet have an independent official website for customers discovering you on Google Maps and Instagram.\n\nTo help your brand stand out, our team created a high-converting website prototype specifically for ${spot.name}:\n\n🔗 View Live Prototype: ${demoUrl}\n\nOur two transparent plans:\n- Tier 1: Starter Presence (₹2,999 One-time)\n  * Full initial setup & launch support\n  * Free Vercel cloud deployment (₹0 hosting fees forever)\n  * Custom domain connection (domain as per registrar charge)\n  * Responsive design with authentic photos & Google Maps reviews\n\n- Tier 2: Managed Care (₹4,999 / 1 Year Full Care)\n  * Bespoke custom brand design & visual styling\n  * 1 full year high-speed managed cloud hosting & SSL\n  * 1 full year domain serving & technical maintenance\n  * Free ongoing menu & price updates handled by our team\n  * Dedicated priority agency WhatsApp support\n\nWould you be open to a quick 5-minute call or WhatsApp chat this week to hand over your admin access?\n\nBest regards,\nPuneDigital Team\nBaner & Koregaon Park, Pune`;

        return {
          id: spot.id,
          name: spot.name,
          slug,
          area: spot.area,
          address: spot.address,
          phone: spot.phone,
          formattedPhone,
          rating: spot.rating,
          reviews: spot.reviews,
          websiteUri: null,
          mapsUrl: spot.mapsUrl,
          heroImage: smartVenuePhotos[0]?.url,
          photoUrl: smartVenuePhotos[0]?.url,
          photos: smartVenuePhotos.map(p => p.url),
          hasGooglePhotos: false,
          photosCount: smartVenuePhotos.length,
          demoUrl,
          dealScenario: "tier2",
          whatsappPitch,
          emailSubject,
          emailPitch,
        };
      });

      return NextResponse.json({
        ok: true,
        isCuratedDemo: true,
        message: "Loaded verified Pune culinary pipeline. Enter your Google Places API key above to run live searches across any neighborhood.",
        totalScanned: curatedLeads.length,
        qualifiedCount: curatedLeads.length,
        leads: curatedLeads,
      });
    }

    // 2. Live Google Places API (New) Text Search
    const query = `${keyword} in ${area} Pune`;
    const searchUrl = "https://places.googleapis.com/v1/places:searchText";

    const res = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.websiteUri,places.rating,places.userRatingCount,places.formattedAddress,places.nationalPhoneNumber,places.googleMapsUri,places.photos,places.primaryType",
      },
      body: JSON.stringify({
        textQuery: query,
        pageSize: 15,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { ok: false, message: `Google Places API error (${res.status}): ${errText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const rawPlaces = data.places || [];

    const qualifiedLeads: any[] = [];

    for (const p of rawPlaces) {
      const website = (p.websiteUri || "").toLowerCase();
      const hasNoRealWebsite =
        !website ||
        website.includes("instagram.com") ||
        website.includes("facebook.com") ||
        website.includes("zomato.com") ||
        website.includes("swiggy.com") ||
        website.includes("magicpin.in") ||
        website.includes("linktr.ee");

      const rating = p.rating || 0;
      const reviews = p.userRatingCount || 0;

      if (hasNoRealWebsite && rating >= Number(minRating) && reviews >= Number(minReviews)) {
        const name = p.displayName?.text || "Restaurant";
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        const phone = p.nationalPhoneNumber || "N/A";
        const cleanPhone = phone.replace(/[^0-9]/g, "");
        const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

        const demoUrl = `${baseUrl}/s/${slug}?name=${encodeURIComponent(name)}&area=${encodeURIComponent(area)}${p.id ? `&placeId=${encodeURIComponent(p.id)}` : ''}${apiKey ? `&key=${encodeURIComponent(apiKey)}` : ''}`;

        // Intelligent Venue Photo Matching
        const smartVenuePhotos = getSmartVenuePhotos(name);
        const hasGooglePhotos = Array.isArray(p.photos) && p.photos.length > 0;

        let heroImage = smartVenuePhotos[0]?.url;
        let photosArray: string[] = [];

        if (hasGooglePhotos && apiKey) {
          heroImage = `https://places.googleapis.com/v1/${p.photos[0].name}/media?maxHeightPx=800&maxWidthPx=1200&key=${apiKey}`;
          photosArray = p.photos.slice(0, 6).map((ph: any) =>
            `https://places.googleapis.com/v1/${ph.name}/media?maxHeightPx=800&maxWidthPx=1200&key=${apiKey}`
          );
        } else {
          photosArray = smartVenuePhotos.map((f: any) => f.url);
        }

        // Default Outreach Pitches
        const whatsappPitch = `Hi ${name} team! 👋\n\nSaw your stellar ${rating}⭐ rating with ${reviews.toLocaleString()}+ reviews in ${area} — huge congratulations on the Pune foodie love!\n\nWe noticed you don't have an official direct website and customers searching on Google Maps often can't view your verified menu or official photos.\n\nWe built an exclusive digital prototype for ${name} using your authentic photos & reviews:\n👉 ${demoUrl}\n\n✨ Two clear options:\n- Tier 1 (₹2,999 one-time): Free Vercel cloud deploy (₹0 hosting fees), initial setup support & custom domain connection (domain as per charge).\n- Tier 2 (₹4,999 / year): Bespoke custom brand design + 1 full year managed cloud hosting, domain serving & ongoing menu/price changes.\n\nReply YES if you'd like to claim your website for ${name}!\n\nWarmly,\nPuneDigital Team`;

        const emailSubject = `Official Website Prototype for ${name} (${area})`;
        const emailPitch = `Hi ${name} Team,\n\nWe've been admiring the incredible customer loyalty and ${rating}⭐ rating (${reviews.toLocaleString()}+ reviews) you've built at ${name} in ${area}, Pune.\n\nWhile reviewing local culinary leaders, we noticed that you do not yet have an independent official website for customers discovering you on Google Maps and Instagram.\n\nTo help your brand stand out, our team created a high-converting website prototype specifically for ${name}:\n\n🔗 View Live Prototype: ${demoUrl}\n\nOur two transparent plans:\n- Tier 1: Starter Presence (₹2,999 One-time)\n  * Full initial setup & launch support\n  * Free Vercel cloud deployment (₹0 hosting fees forever)\n  * Custom domain connection (domain as per registrar charge)\n  * Responsive design with authentic photos & Google Maps reviews\n\n- Tier 2: Managed Care (₹4,999 / 1 Year Full Care)\n  * Bespoke custom brand design & visual styling\n  * 1 full year high-speed managed cloud hosting & SSL\n  * 1 full year domain serving & technical maintenance\n  * Free ongoing menu & price updates handled by our team\n  * Dedicated priority agency WhatsApp support\n\nWould you be open to a quick 5-minute call or WhatsApp chat this week to hand over your admin access?\n\nBest regards,\nPuneDigital Team\nBaner & Koregaon Park, Pune`;

        qualifiedLeads.push({
          id: p.id,
          name,
          slug,
          area,
          address: p.formattedAddress || "Pune, Maharashtra",
          phone,
          formattedPhone,
          rating,
          reviews,
          websiteUri: p.websiteUri || null,
          mapsUrl: p.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(name)}`,
          heroImage,
          photoUrl: heroImage,
          photos: photosArray,
          hasGooglePhotos,
          photosCount: hasGooglePhotos ? p.photos.length : photosArray.length,
          demoUrl,
          dealScenario: "tier2",
          whatsappPitch,
          emailSubject,
          emailPitch,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      totalScanned: rawPlaces.length,
      qualifiedCount: qualifiedLeads.length,
      leads: qualifiedLeads,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to scan places" },
      { status: 500 }
    );
  }
}
