import { NextRequest, NextResponse } from "next/server";

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
      "AIzaSyDLnh-VwgBMRoDiz0gvaHD9UvIv8zoXcbA";

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

        const baseUrl = (publicBaseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
        const demoUrl = `${baseUrl}/s/${slug}`;

        // Default Pitch Drafts
        const whatsappPitch = `Hi ${name} team! 👋\n\nSaw your stellar ${rating}⭐ rating with ${reviews.toLocaleString()}+ reviews in ${area} — huge congratulations on the Pune foodie love!\n\nWe noticed you don't have an official direct website and customers searching on Google Maps often can't view your verified menu or official photos.\n\nWe built an exclusive digital prototype for ${name} using your authentic photos & reviews:\n👉 ${demoUrl}\n\n✨ What's inside:\n- Custom high-speed website with your verified photos & reviews\n- Dynamic QR code standees for tables & counters\n- 1-click calling & direct WhatsApp connection\n\nPlans are simple and lucrative:\n- Tier 1: Starter Presence at ₹2,999 (Basic website & initial domain setup support)\n- Tier 2: Managed Care at ₹4,999 / year (Website + 1 Full Year Cloud Hosting + Free Menu/Price Changes + Domain Serving)\n\nReply YES if you'd like to claim your website for ${name}!\n\nWarmly,\nPuneDigital Team`;

        const emailSubject = `Official Website Prototype for ${name} (${area})`;
        const emailPitch = `Hi ${name} Team,\n\nWe've been admiring the incredible customer loyalty and ${rating}⭐ rating (${reviews.toLocaleString()}+ reviews) you've built at ${name} in ${area}, Pune.\n\nWhile reviewing local culinary leaders, we noticed that you do not yet have an independent official website for customers discovering you on Google Maps and Instagram.\n\nTo help your brand stand out, our team created a high-converting website prototype specifically for ${name}:\n\n🔗 View Live Prototype: ${demoUrl}\n\nWhat this includes for your restaurant:\n1. Mobile-optimized responsive design showcasing your authentic food photos and verified Google reviews\n2. Scan-at-Table Dynamic QR Menu Standees\n3. Click-to-Call & Direct WhatsApp inquiry integration\n4. Zero hassle: We handle the domain setup, 1 full year of fast cloud hosting, and ongoing menu/pricing changes\n\nPlans are simple and lucrative:\n- Tier 1: Starter Presence at ₹2,999 (Basic website & initial domain setup support)\n- Tier 2: Managed Care at ₹4,999 / year (Website + 1 Full Year Cloud Hosting + Free Menu/Pricing Changes + Domain Serving)\n\nWould you be open to a quick 5-minute call or WhatsApp chat this week to hand over your admin access?\n\nBest regards,\nPuneDigital Team\nBaner & Koregaon Park, Pune`;

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
          photosCount: (p.photos || []).length,
          demoUrl,
          dealScenario: "tier2", // default recommendation
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
      { ok: false, message: error.message || "Failed to scan Google Places" },
      { status: 500 }
    );
  }
}
