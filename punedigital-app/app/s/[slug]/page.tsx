"use client";

import React, { useState, useEffect } from "react";
import { OwnerPreviewBar } from "@/components/owner-preview-bar";
import { PricingDrawer } from "@/components/pricing-drawer";
import { THEME_MAP, ArchetypeId } from "@/lib/theme-map";
import { AestheticFX } from "@/components/aesthetic-fx";
import { AnimatedBackground } from "@/components/animated-background";
import { CustomCursor } from "@/components/custom-cursor";

// Curated demo profiles for Pune leads
const MOCK_RESTAURANTS: Record<string, any> = {
  // Real lead found in user's test!
  "artizen-cafe-baner": {
    slug: "artizen-cafe-baner",
    restaurant: {
      name: "Artizen - Cafe | Art | Studio",
      area: "Baner - Pashan Link Rd, Pune",
      tagline: "Where artisanal brew meets creative expression and soul.",
      about: "Artizen was founded at the crossroads of community, specialty craft brewing, and contemporary art in Pashan-Baner. With over 1,000 community reviews, our space is an urban sanctuary designed for relaxed conversations, art workshops, and slow sips.\n\nFrom our signature single-origin cold brews to freshly baked savory tartines, everything is prepared fresh using ethically sourced local Maharashtra produce.",
      phone: "083808 97607",
      address: "Shop No. 8, Ground Floor, Echelon Apt, 134, Baner - Pashan Link Rd, Pashan, Pune 411021",
      maps_url: "https://maps.google.com",
      usp: [
        "Art Studio & Workshop Space",
        "Single-Origin Specialty Brews",
        "1,060+ 5-Star Pune Reviews"
      ]
    },
    theme: {
      archetype_id: "artisanal-cafe",
      primary_color: "#78350f",
      accent_color: "#d4a574"
    },
    assets: {
      hero_image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
          author: "Whatshot Pune Food Chronicle",
          caption: "Artizen Cafe & Art Studio Ambience",
          category: "Ambience",
          source: "google_places_api",
          is_google_verified: true,
          likes: 84
        },
        {
          url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
          author: "Artizen Cafe Official",
          caption: "Handcrafted Specialty Brews & Studio Art",
          category: "Patron Snaps",
          source: "google_places_api",
          is_google_verified: true,
          likes: 92
        },
        {
          url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
          author: "Pune Explorer Vlogs",
          caption: "Courtyard Seating & Artisanal Menu",
          category: "Ambience",
          source: "google_places_api",
          is_google_verified: true,
          likes: 76
        },
        {
          url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
          author: "Artizen Art Community",
          caption: "Weekend Art & Pottery Workshops",
          category: "Patron Snaps",
          source: "google_places_api",
          is_google_verified: true,
          likes: 110
        },
        {
          url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
          author: "Komal Panjwani (Foodie Guide)",
          caption: "Signature Bakes & Sourdough Selection",
          category: "Bakes",
          source: "google_places_api",
          is_google_verified: true,
          likes: 65
        },
        {
          url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
          author: "Baner Regular Patron",
          caption: "Slow-Drip Pour Over Experience",
          category: "Signature Dishes",
          source: "google_places_api",
          is_google_verified: true,
          likes: 128
        }
      ]
    },
    menu: [
      {
        name: "Artisanal Pour-Over Coffee",
        price: 260,
        category: "Coffee",
        description: "Freshly ground medium roast with notes of cocoa nibs, wild honey, and citrus.",
        is_veg: true
      },
      {
        name: "Herbed Cream Cheese & Walnut Sourdough",
        price: 340,
        category: "Bakes",
        description: "Toasted country sourdough topped with whipped thyme cream cheese and toasted walnuts.",
        is_veg: true
      },
      {
        name: "Smoked Paprika Chicken Skewers",
        price: 420,
        category: "Small Plates",
        description: "Tender charred chicken breast skewers served with garlic aioli and pickled cucumbers.",
        is_veg: false
      },
      {
        name: "Dark Chocolate Sea-Salt Brownie",
        price: 280,
        category: "Dessert",
        description: "Fudgy Belgian dark chocolate brownie sprinkled with artisanal salt flakes.",
        is_veg: true
      }
    ],
    reviews: [
      {
        author: "Kavita R.",
        rating: 5,
        text: "The combination of art gallery vibes and specialty coffee in Pashan is unmatched. 10/10 recommendation!"
      },
      {
        author: "Omkar P.",
        rating: 5,
        text: "Calm, aesthetic, and fantastic food. Perfect spot to sit with a book or catch up with friends."
      }
    ],
    pricing: {
      tier1_price: 2999,
      tier2_price: 4999,
      special_offer: "Launch Offer: Free .in Domain included if claimed this week"
    },
    demo: {
      status: "pending_review",
      expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  },

  "default": {
    slug: "chafa-cafe-baner",
    restaurant: {
      name: "Chafa Artisan Cafe",
      area: "Baner, Pune",
      tagline: "Slow-roasted specialty coffees & wholesome rustic sourdoughs.",
      about: "Nestled in the vibrant heart of Baner, Chafa Artisan Cafe was born out of a deep reverence for slow, handcrafted food. We roast our single-origin beans in small weekly batches and bake our naturally fermented sourdough each morning at dawn.",
      phone: "+91 98230 45678",
      address: "Shop 4, High Street Plaza, Near Pancard Club Road, Baner, Pune 411045",
      maps_url: "https://maps.google.com",
      usp: [
        "100% Single-Origin Arabica",
        "Housemade Sourdough Bakes",
        "Pet-Friendly Courtyard"
      ]
    },
    theme: {
      archetype_id: "artisanal-cafe",
      primary_color: "#78350f",
      accent_color: "#d4a574"
    },
    assets: {
      hero_image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
      photos: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menu: [
      {
        name: "Avocado & Za'atar Sourdough Tartine",
        price: 360,
        category: "Bakes & Toasts",
        description: "Freshly crushed Hass avocados on rustic sourdough with pomegranate molasses, toasted pine nuts, and local feta.",
        is_veg: true
      },
      {
        name: "Truffled Wild Mushroom Gnocchi",
        price: 440,
        category: "Mains",
        description: "Hand-rolled potato gnocchi tossed in brown butter, sage, porcini puree, and shaved aged Parmesan.",
        is_veg: true
      }
    ],
    reviews: [
      {
        author: "Aditi Deshmukh",
        rating: 5,
        text: "Hands down the most aesthetic cafe in Baner! The sourdough tartine and pour-over coffee are unmatched in Pune."
      }
    ],
    pricing: {
      tier1_price: 2999,
      tier2_price: 4999,
      special_offer: "Launch Offer: Free .in Domain included if claimed this week"
    },
    demo: {
      status: "pending_review",
      expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
};


export default function DemoRestaurantPage({ params }: { params: { slug: string } }) {
  const [activeTier, setActiveTier] = useState<1 | 2>(2);
  const [activeTheme, setActiveTheme] = useState<ArchetypeId>("artisanal-cafe");
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const queryName = searchParams?.get("name");
    const queryArea = searchParams?.get("area");
    const placeId = searchParams?.get("placeId");

    const raw = MOCK_RESTAURANTS[params.slug] || MOCK_RESTAURANTS["artizen-cafe-baner"] || MOCK_RESTAURANTS["default"];
    const restaurantName = queryName || (raw.slug === params.slug ? raw.restaurant.name : params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
    const restaurantArea = queryArea || raw.restaurant.area || "Baner, Pune";

    const formatted = {
      ...raw,
      restaurant: {
        ...raw.restaurant,
        name: restaurantName,
        area: restaurantArea,
      }
    };
    setConfig(formatted);
    if (formatted.theme?.archetype_id) {
      setActiveTheme(formatted.theme.archetype_id);
    }

    // Background live Google Places sync for real metadata & photos
    const searchQuery = `${restaurantName} ${restaurantArea}`;
    const themeParam = formatted.theme?.archetype_id || "artisanal-cafe";
    const endpoint = `/api/places/live?query=${encodeURIComponent(searchQuery)}&theme=${encodeURIComponent(themeParam)}${placeId ? `&placeId=${encodeURIComponent(placeId)}` : ''}`;

    fetch(endpoint)
      .then(res => res.json())
      .then(result => {
        if (result?.ok && result.data) {
          const live = result.data;
          setConfig((prev: any) => {
            if (!prev) return prev;
            return {
              ...prev,
              restaurant: {
                ...prev.restaurant,
                name: live.name || prev.restaurant.name,
                address: live.address || prev.restaurant.address,
                phone: live.phone || prev.restaurant.phone,
                maps_url: live.mapsUrl || prev.restaurant.maps_url,
                rating: live.rating || prev.restaurant.rating,
                reviews_count: live.userRatingCount || prev.restaurant.reviews_count
              },
              assets: {
                ...prev.assets,
                hero_image: live.heroImage || (live.photos?.[0]?.url || live.photos?.[0]) || prev.assets.hero_image,
                photos: (live.photos && live.photos.length > 0) ? live.photos : prev.assets.photos
              },
              reviews: (live.reviews && live.reviews.length > 0) ? live.reviews : prev.reviews
            };
          });
        }
      })
      .catch(err => {
        console.warn("Could not sync live Google Places data:", err);
      });
  }, [params.slug]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 text-white font-sans text-sm">
        Loading restaurant demo...
      </div>
    );
  }

  const ThemeComponent = THEME_MAP[activeTheme] || THEME_MAP["artisanal-cafe"];

  return (
    <div className="relative">
      {/* Dynamic Animated Ambient Background (Drifting Aurora Orbs & Mesh) */}
      <AnimatedBackground enabled={animationsEnabled} theme={activeTheme} />

      {/* Ambient Cute Aesthetic FX (Sparkles, Doodles, Aurora Glow) */}
      <AestheticFX enabled={animationsEnabled} theme={activeTheme} />

      {/* Interactive Magnetic Custom Cursor with Trailing Aura & Sparkles */}
      <CustomCursor enabled={animationsEnabled} theme={activeTheme} />

      {/* 1. Floating Owner Preview Bar with Theme, FX & Tier Switchers */}
      <OwnerPreviewBar
        restaurantName={config.restaurant.name}
        activeTier={activeTier}
        onTierChange={setActiveTier}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        onOpenPricing={() => setIsPricingOpen(true)}
        animationsEnabled={animationsEnabled}
        onToggleAnimations={() => setAnimationsEnabled((prev) => !prev)}
        expiresAt={config.demo?.expires_at}
      />

      {/* 2. Live Dynamic Theme Archetype */}
      <ThemeComponent
        config={config}
        activeTier={activeTier}
        onOpenPricing={() => setIsPricingOpen(true)}
        animationsEnabled={animationsEnabled}
      />

      {/* 3. Pricing & Claim Drawer Modal */}
      <PricingDrawer
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        restaurantName={config.restaurant.name}
        pricing={config.pricing}
        phone={config.restaurant.phone}
      />
    </div>
  );
}
