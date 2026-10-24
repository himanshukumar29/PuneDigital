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
      "";

    if (!apiKey) {
      return NextResponse.json({
        ok: false,
        error: "Google Places API Key is required. Please provide it in the Commander panel or configure GOOGLE_PLACES_API_KEY in your environment.",
        totalScanned: 0,
        qualifiedCount: 0,
        leads: [],
      }, { status: 400 });
    }

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
