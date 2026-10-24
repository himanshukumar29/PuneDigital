"use client";

import React, { useState } from "react";
import { 
  Star, MapPin, Phone, Clock, Calendar, Music, Sparkles, Wine, 
  Flame, ShoppingBag, ShieldCheck, Compass, MessageCircle, ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { GooglePhotoGallery } from "@/components/google-photo-gallery";

interface RestoBarProps {
  config: any;
  activeTier: 1 | 2;
  onOpenPricing: () => void;
  animationsEnabled?: boolean;
}

export function RestoBarTheme({ config, activeTier, onOpenPricing, animationsEnabled = true }: RestoBarProps) {
  const { restaurant, assets, menu, reviews } = config;
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vipState, setVipState] = useState({
    loungeArea: "Rooftop Skydeck Terrace",
    partySize: "Group (4 - 6 Guests)",
    day: "Friday Night - Sundowner",
    time: "8:00 PM",
    submitted: false
  });

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
            {activeTier >= 2 && <a href="#vip" className="hover:text-amber-400 transition">VIP Bottle Service</a>}
            <a href="#reviews" className="hover:text-amber-400 transition">Guest Book</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${restaurant.phone || "+919876543210"}`}
              className="text-xs font-bold text-amber-400 bg-neutral-900 border border-neutral-800 px-3.5 py-2 rounded-xl transition hover:border-amber-500/50 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Concierge: {restaurant.phone}</span>
            </a>

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Energy Resto-Bar • {restaurant.area || "Koregaon Park, Pune"}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            {restaurant.name}
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            &ldquo;{restaurant.tagline}&rdquo;
          </p>

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

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <a
              href="#mixology"
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <Wine className="w-4 h-4" />
              <span>View Mixology & Tapas</span>
            </a>

            {activeTier >= 2 ? (
              <a
                href="#vip"
                className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve VIP Table</span>
              </a>
            ) : (
              <a
                href={`tel:${restaurant.phone || "+919876543210"}`}
                className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Concierge</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Nightlife Lineup (Stitch-grade component) */}
      <section id="lineup" className="py-20 bg-[#0d0d10] border-b border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-7 space-y-3 group transition-all duration-300 ${
              animationsEnabled ? "hover:-translate-y-2 hover:border-amber-400 hover:shadow-glow-gold" : "hover:border-amber-500/50"
            }`}>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md">
                Every Friday • 8 PM Onwards
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                Sunset Electronic Sundowner
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Melodic deep techno & afro house curated with panoramic Pune city lights and craft mezcal cocktails.
              </p>
            </div>

            <div className={`bg-neutral-950/80 border-2 border-amber-500/40 rounded-3xl p-7 space-y-3 relative overflow-hidden group shadow-lg transition-all duration-300 ${
              animationsEnabled ? "hover:-translate-y-2 hover:border-amber-400 hover:shadow-glow-gold shadow-amber-500/20" : "shadow-amber-500/5"
            }`}>
              <span className="text-[10px] uppercase font-bold text-black tracking-widest bg-amber-400 px-2.5 py-1 rounded-md">
                Every Saturday • 9 PM
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                Cocktail Couture & Resident DJ
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Headliner electronic acts, high-energy dancefloor, flaming tequila shots, and premium bottle service.
              </p>
            </div>

            <div className={`bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-7 space-y-3 group transition-all duration-300 ${
              animationsEnabled ? "hover:-translate-y-2 hover:border-amber-400 hover:shadow-glow-gold" : "hover:border-amber-500/50"
            }`}>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md">
                Sunday Brunch • 12 PM - 5 PM
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                Acoustic Soul & Endless Sangria
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bottomless red and white sangrias, live percussionists, and fire-roasted Mediterranean tapas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Mixology & Bites */}
      <section id="mixology" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-neutral-900/60 rounded-3xl p-7 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
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
                  <span>Reserve for Table</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier 2: VIP Bottle Service & Table Booking */}
      {activeTier >= 2 && (
        <section id="vip" className="py-24 bg-[#0a0a0d] border-y border-neutral-900 px-4">
          <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Flame className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                Priority Nightlife Reservation
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-black text-white">
                VIP Lounge & Bottle Service
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Skip the line at {restaurant.name}. Priority confirmation sent straight to your WhatsApp.
              </p>
            </div>

            {vipState.submitted ? (
              <div className="bg-amber-500/10 border border-amber-500/40 text-amber-200 p-6 rounded-2xl text-xs space-y-2 text-left">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>VIP Lounge Reservation Simulated!</span>
                </div>
                <p className="text-xs leading-relaxed text-neutral-300">
                  In production, this routes directly to the VIP Floor Manager for {restaurant.name} on WhatsApp with area ({vipState.loungeArea}), party size ({vipState.partySize}), and date ({vipState.day}).
                </p>
                <button
                  onClick={() => setVipState(prev => ({ ...prev, submitted: false }))}
                  className="mt-2 text-xs font-bold text-amber-400 underline"
                >
                  Test Another Reservation
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVipState(prev => ({ ...prev, submitted: true }));
                }}
                className="space-y-4 pt-2 text-left text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1.5">Lounge Area</label>
                    <select
                      value={vipState.loungeArea}
                      onChange={(e) => setVipState(prev => ({ ...prev, loungeArea: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white font-medium"
                    >
                      <option>Rooftop Skydeck Terrace (Best View)</option>
                      <option>Main DJ Dancefloor Booth</option>
                      <option>Private VIP Speakeasy Den</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-300 block mb-1.5">Party Size</label>
                    <select
                      value={vipState.partySize}
                      onChange={(e) => setVipState(prev => ({ ...prev, partySize: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white font-medium"
                    >
                      <option>Couples (2 Guests)</option>
                      <option>Group (4 - 6 Guests)</option>
                      <option>VIP Stags / Large (8+ Guests)</option>
                      <option>Full Corporate Booking (20+)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1.5">Night</label>
                    <select
                      value={vipState.day}
                      onChange={(e) => setVipState(prev => ({ ...prev, day: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white font-medium"
                    >
                      <option>Friday Night - Sundowner</option>
                      <option>Saturday Night - Headliner DJ</option>
                      <option>Sunday Brunch & Sangria</option>
                      <option>Weekday Cocktail Evening</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-300 block mb-1.5">Time</label>
                    <select
                      value={vipState.time}
                      onChange={(e) => setVipState(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white font-medium"
                    >
                      <option>7:00 PM (Sunset Hours)</option>
                      <option>8:30 PM (Peak Party)</option>
                      <option>10:00 PM (Late Night Vibe)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20"
                >
                  Confirm VIP Reservation Request
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Verified Reviews */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Guest Impressions
          </span>
          <h2 className="font-serif text-4xl font-black text-white">
            Praise from Pune&apos;s Nightlife Crowd
          </h2>
          <p className="text-xs text-neutral-500">Verified Google Maps Ratings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(reviews || []).map((rev: any, idx: number) => (
            <div
              key={idx}
              className="bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800 space-y-4"
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
          ))}
        </div>
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
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-[10px] tracking-wider rounded-xl transition shadow-lg shadow-amber-500/10"
            >
              Claim Official Website
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
