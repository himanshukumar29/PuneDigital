"use client";

import React, { useState } from "react";
import { 
  Star, MapPin, Phone, ShoppingCart, Zap, Clock, ShieldCheck, 
  ArrowRight, Flame, Heart, Sparkles, MessageCircle, Compass 
} from "lucide-react";
import { GooglePhotoGallery } from "@/components/google-photo-gallery";
import { SafeImage } from "@/components/safe-image";
import { getHeroFallback } from "@/lib/fallback-images";
import { 
  FadeIn, 
  StaggerChildren, 
  StaggerItem, 
  MagneticButton, 
  TiltCard, 
  ImageReveal 
} from "@/components/motion";
import { motion } from "framer-motion";

interface StreetQSRProps {
  config: any;
  activeTier: 1 | 2;
  onOpenPricing: () => void;
  animationsEnabled?: boolean;
}

export function StreetQSRTheme({ config, activeTier, onOpenPricing, animationsEnabled = true }: StreetQSRProps) {
  const { restaurant, assets, menu, reviews } = config;
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  const heroImg = assets?.hero_image || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80";

  const categories: string[] = ["All", ...Array.from(new Set<string>((menu || []).map((m: any) => String(m.category || "Crave Items"))))];
  const filteredMenu = selectedCategory === "All" ? (menu || []) : (menu || []).filter((m: any) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fffdfa] text-slate-900 font-sans selection:bg-red-500 selection:text-white">

      {/* Floating Header */}
      <header className="border-b border-red-100 bg-white/95 backdrop-blur-md sticky top-[49px] z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl uppercase tracking-tighter text-slate-950">
              {restaurant.name}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider">
              {restaurant.area || "Pune"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-slate-700">
            <a href="#menu" className="hover:text-red-600 transition">Crave Menu</a>
            <a href="#speed" className="hover:text-red-600 transition">20-Min Promise</a>
            <a href="#reviews" className="hover:text-red-600 transition">Reviews</a>
            <a href="#outlet" className="hover:text-red-600 transition">Counter Info</a>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton strength={0.25} as="div">
              <a
                href={`tel:${restaurant.phone || "+919876543210"}`}
                className="text-xs font-black text-slate-950 bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call Counter: {restaurant.phone}</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-[#fffdfa] pt-14 pb-24 px-4 sm:px-6 lg:px-8 border-b border-red-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={0.1} direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>Pune&apos;s Street Sensation • {restaurant.area || "FC Road, Pune"}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <h1 className="text-5xl sm:text-7xl font-black text-slate-950 uppercase tracking-tight leading-[0.98]">
                {restaurant.name}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <p className="text-xl sm:text-2xl text-slate-700 font-medium max-w-xl">
                &ldquo;{restaurant.tagline}&rdquo;
              </p>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <div className="flex flex-wrap items-center gap-3 text-xs font-black">
                <span className="flex items-center gap-1 bg-yellow-400 text-slate-950 px-3.5 py-2 rounded-xl shadow-sm">
                  <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>4.7 Star Rating (1,200+ Pune Foodies)</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-black flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  <Zap className="w-4 h-4" /> 20-Min Fast Kitchen Pass
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton strength={0.2} as="div">
                  <a
                    href="#menu"
                    className="bg-red-600 hover:bg-red-500 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider transition shadow-xl shadow-red-600/30 flex items-center gap-2 active:scale-95"
                  >
                    <Flame className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>Order Your Craving</span>
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.2} as="div">
                  <a
                    href={`tel:${restaurant.phone || "+919876543210"}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    <span>Call Counter</span>
                  </a>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.3} direction="left">
              <TiltCard tiltIntensity={8}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 aspect-[4/3]">
                  <SafeImage
                    src={heroImg}
                    fallbackSrc={getHeroFallback("street-qsr")}
                    theme="street-qsr"
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 bg-yellow-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase shadow-md flex items-center gap-1 z-10 ${
                    animationsEnabled ? "animate-float-slow" : ""
                  }`}>
                    <Flame className={`w-3.5 h-3.5 fill-red-600 text-red-600 ${animationsEnabled ? "animate-bounce" : ""}`} />
                    <span>Pune #1 Craving</span>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Speed & Freshness Promise */}
      <section id="speed" className="bg-slate-950 text-white py-8 px-4">
        <FadeIn direction="up">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <span className="font-black text-sm">Lightning 20-Min Counter Dispatch</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span className="font-black text-sm">100% Prime Daily Fresh Ingredients</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Flame className="w-6 h-6 text-red-500 flex-shrink-0" />
              <span className="font-black text-sm">Pune&apos;s Signature Secret Sauces</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* The Crave Menu with Categories */}
      <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-red-600 font-black">
              Pune&apos;s Favorite Street Munchies
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase">
              The Crave Menu
            </h2>
            <p className="text-xs text-slate-500">
              Smash burgers, loaded fries, hot wraps & thick craft shakes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item: any, idx: number) => (
            <StaggerItem key={idx}>
              <div
                className="h-full bg-white rounded-3xl p-7 border-2 border-slate-100 hover:border-red-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 group-hover:text-red-600 transition">
                        {item.name}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 mt-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800">
                        {item.is_veg ? "🌱 Green Veg" : "🍗 Signature Meat"}
                      </span>
                    </div>
                    <span className="text-3xl font-black text-red-600 font-mono">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">Free Dip Included</span>

                  <a
                    href={`tel:${restaurant.phone || "+919876543210"}`}
                    className="text-xs font-black text-red-600 hover:underline flex items-center gap-1"
                  >
                    <span>Order by Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Verified Google Reviews */}
      <section id="reviews" className="py-20 bg-red-50/50 border-t border-red-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-4xl font-black text-slate-950 uppercase">Pune Foodie Reviews</h2>
              <p className="text-xs text-slate-600">Real customer ratings from Google Maps</p>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(reviews || []).map((rev: any, idx: number) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white p-7 rounded-3xl border border-red-100 shadow-sm space-y-3 hover:border-red-300 hover:-translate-y-1 transition duration-300">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed font-semibold">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <span className="text-[11px] font-black text-slate-900 block">— {rev.author}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Google Maps Real Photos Gallery */}
      <GooglePhotoGallery
        photos={assets?.photos}
        restaurantName={restaurant.name}
        mapsUrl={restaurant.maps_url}
        animationsEnabled={animationsEnabled}
        theme="street-qsr"
      />

      {/* Street Footer */}
      <footer id="outlet" className="bg-slate-950 text-slate-400 py-20 px-4 text-xs border-t border-slate-900">
        <FadeIn direction="up">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-3">
              <h4 className="text-2xl font-black text-white uppercase italic">{restaurant.name}</h4>
              <p className="text-slate-400 leading-relaxed">{restaurant.address}</p>
              <p className="text-yellow-400 font-black text-sm">{restaurant.phone}</p>
            </div>

            <div>
              <h5 className="font-black text-white uppercase tracking-wider text-[11px] mb-3">Counter Timings</h5>
              <div className="space-y-1 text-slate-300 font-bold">
                <p>Monday – Sunday: 11:00 AM – Midnight</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 text-[10px] border border-red-800">
                  Hot Counter Open Now
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-black text-white uppercase tracking-wider text-[11px] mb-3">Instant Ordering</h5>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/91${restaurant.phone?.replace(/[^0-9]/g, '') || '9999999999'}?text=Hi%20${encodeURIComponent(restaurant.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Fast Pass</span>
                </a>
                <a
                  href={restaurant.maps_url || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-yellow-400 hover:underline font-bold"
                >
                  <Compass className="w-4 h-4" />
                  <span>Google Maps Location</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-black text-yellow-400 tracking-wider">
                Official Digital Prototype
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Curated for <b>{restaurant.name}</b> by <b>PuneDigital</b>.
              </p>
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black uppercase text-[10px] tracking-wider rounded-xl transition shadow-md active:scale-95"
              >
                Claim Official Web App
              </button>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}
