"use client";

import React, { useState } from "react";
import { 
  Star, MapPin, Phone, Clock, Calendar, Music, Sparkles, Wine, 
  Flame, ShoppingBag, ShieldCheck, Compass, MessageCircle, ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { GooglePhotoGallery } from "@/components/google-photo-gallery";
import { 
  FadeIn, 
  StaggerChildren, 
  StaggerItem, 
  MagneticButton, 
  TiltCard, 
  GlowBorder 
} from "@/components/motion";
import { motion } from "framer-motion";

interface RestoBarProps {
  config: any;
  activeTier: 1 | 2;
  onOpenPricing: () => void;
  animationsEnabled?: boolean;
}

export function RestoBarTheme({ config, activeTier, onOpenPricing, animationsEnabled = true }: RestoBarProps) {
  const { restaurant, assets, menu, reviews } = config;
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  const heroImg = assets?.hero_image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80";

  const categories: string[] = ["All", ...Array.from(new Set<string>((menu || []).map((m: any) => String(m.category || "Bar Bites"))))];
  const filteredMenu = selectedCategory === "All" ? (menu || []) : (menu || []).filter((m: any) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f7] font-sans selection:bg-amber-500 selection:text-black">

      {/* Floating Header */}
      <header className="border-b border-neutral-900 bg-[#070709]/90 backdrop-blur-md sticky top-[49px] z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-black uppercase tracking-wider text-white">
              {restaurant.name}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
              Lounge & Rooftop
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#lineup" className="hover:text-amber-400 transition">Sound & Lineup</a>
            <a href="#mixology" className="hover:text-amber-400 transition">Mixology & Bites</a>
            <a href="#reviews" className="hover:text-amber-400 transition">Guest Book</a>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton strength={0.25} as="div">
              <a
                href={`tel:${restaurant.phone || "+919876543210"}`}
                className="text-xs font-bold text-amber-400 bg-neutral-900 border border-neutral-800 px-3.5 py-2 rounded-xl transition hover:border-amber-500/50 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Concierge: {restaurant.phone}</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 border-b border-neutral-900">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImg}
            alt={restaurant.name}
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 pt-12 pb-20">
          <FadeIn delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>High-Energy Resto-Bar • {restaurant.area || "Koregaon Park, Pune"}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
              {restaurant.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="font-serif italic text-xl sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              &ldquo;{restaurant.tagline}&rdquo;
            </p>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold tracking-widest uppercase text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5 text-amber-400 bg-neutral-950/80 px-3.5 py-1.5 rounded-xl border border-neutral-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.9 on Google Maps</span>
              </span>
              <span>•</span>
              <span>Skydeck Terrace</span>
              <span>•</span>
              <span>Live International DJs</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <MagneticButton strength={0.2} as="div">
                <a
                  href="#mixology"
                  className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center gap-2"
                >
                  <Wine className="w-4 h-4" />
                  <span>View Mixology & Tapas</span>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2} as="div">
                <a
                  href={`tel:${restaurant.phone || "+919876543210"}`}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Concierge: {restaurant.phone}</span>
                </a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Nightlife Lineup (Stitch-grade component) */}
      <section id="lineup" className="py-20 bg-[#0d0d10] border-b border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  <Music className="w-4 h-4" />
                  <span>Sound, Light & Atmosphere</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
                  Weekly Curated Sessions
                </h2>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Experience Pune&apos;s most sought-after rooftop sunset sessions, deep house selectors, and craft cocktail mixology.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <TiltCard tiltIntensity={6}>
                <div className={`h-full bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-7 space-y-3 group transition-all duration-300 ${
                  animationsEnabled ? "hover:border-amber-400 hover:shadow-glow-gold" : "hover:border-amber-500/50"
                }`}>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md inline-block">
                    Every Friday • 8 PM Onwards
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                    Sunset Electronic Sundowner
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Melodic deep techno & afro house curated with panoramic Pune city lights and craft mezcal cocktails.
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard tiltIntensity={6}>
                <GlowBorder glowColor="rgba(245, 158, 11, 0.45)" duration={4} className="h-full">
                  <div className={`h-full bg-neutral-950/90 rounded-3xl p-7 space-y-3 relative overflow-hidden group shadow-lg ${
                    animationsEnabled ? "shadow-amber-500/20" : ""
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-black tracking-widest bg-amber-400 px-2.5 py-1 rounded-md inline-block">
                      Every Saturday • 9 PM
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                      Cocktail Couture & Resident DJ
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Headliner electronic acts, high-energy dancefloor, flaming tequila shots, and premium bottle service.
                    </p>
                  </div>
                </GlowBorder>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard tiltIntensity={6}>
                <div className={`h-full bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-7 space-y-3 group transition-all duration-300 ${
                  animationsEnabled ? "hover:border-amber-400 hover:shadow-glow-gold" : "hover:border-amber-500/50"
                }`}>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md inline-block">
                    Sunday Brunch • 12 PM - 5 PM
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                    Acoustic Soul & Endless Sangria
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Bottomless red and white sangrias, live percussionists, and fire-roasted Mediterranean tapas.
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Signature Mixology & Bites */}
      <section id="mixology" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Liquid Alchemy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-white">
              Signature Cocktails & Tapas
            </h2>
            <p className="text-xs text-neutral-400">
              Precision infused spirits paired with fire-roasted gourmet creations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                      : "bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
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
                className="h-full bg-neutral-900/60 rounded-3xl p-7 border border-neutral-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                        {item.name}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-amber-400 border border-neutral-700">
                        {item.is_veg ? "Herbivore" : "Carnivore"}
                      </span>
                    </div>
                    <span className="font-mono text-2xl font-black text-amber-400">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Fresh Bar Batch</span>
                  </span>

                  <a
                    href={`tel:${restaurant.phone || "+919876543210"}`}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Order by Phone</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Verified Reviews */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Guest Impressions
            </span>
            <h2 className="font-serif text-4xl font-black text-white">
              Praise from Pune&apos;s Nightlife Crowd
            </h2>
            <p className="text-xs text-neutral-500">Verified Google Maps Ratings</p>
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(reviews || []).map((rev: any, idx: number) => (
            <StaggerItem key={idx}>
              <div
                className="h-full bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-neutral-700 hover:-translate-y-1 transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
                    Verified Visit
                  </span>
                </div>

                <p className="italic text-neutral-300 text-sm leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>

                <div className="text-xs text-neutral-400 pt-1 font-bold">
                  — {rev.author}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Real Photos Stream Uploaded to Google Maps */}
      <GooglePhotoGallery
        photos={assets?.photos}
        restaurantName={restaurant.name}
        mapsUrl={restaurant.maps_url}
        animationsEnabled={animationsEnabled}
      />

      {/* Nightclub Footer */}
      <footer className="bg-black text-neutral-400 py-20 px-4 text-xs border-t border-neutral-900">
        <FadeIn direction="up">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-3">
              <h4 className="font-serif text-2xl font-black uppercase tracking-wider text-white">
                {restaurant.name}
              </h4>
              <p className="text-neutral-500 leading-relaxed">{restaurant.address}</p>
              <p className="text-amber-400 font-bold text-sm">{restaurant.phone}</p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Lounge Hours</h5>
              <div className="space-y-1.5 text-neutral-400">
                <p>Wednesday – Thursday: 6:00 PM – 1:00 AM</p>
                <p>Friday – Sunday: 5:00 PM – 1:30 AM</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                  Doors Open Today
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">VIP Concierge</h5>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/91${restaurant.phone?.replace(/[^0-9]/g, '') || '9999999999'}?text=Hi%20${encodeURIComponent(restaurant.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp VIP Desk</span>
                </a>
                <a
                  href={restaurant.maps_url || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-amber-400 hover:underline"
                >
                  <Compass className="w-4 h-4" />
                  <span>Valet & Directions</span>
                </a>
              </div>
            </div>

            <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Exclusive Prototype
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Curated for <b>{restaurant.name}</b> by <b>PuneDigital</b>.
              </p>
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-[10px] tracking-wider rounded-xl transition shadow-lg shadow-amber-500/10 active:scale-95"
              >
                Claim Official Website
              </button>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}
