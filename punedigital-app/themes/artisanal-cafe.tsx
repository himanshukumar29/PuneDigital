"use client";

import React, { useState } from "react";
import { 
  Star, MapPin, Phone, Clock, Calendar, CheckCircle2, ChevronRight, 
  UtensilsCrossed, ShoppingBag, Sparkles, Heart, Coffee, ShieldCheck, 
  ArrowUpRight, Share2, Compass, MessageCircle
} from "lucide-react";
import { GooglePhotoGallery } from "@/components/google-photo-gallery";

interface ArtisanalCafeProps {
  config: any;
  activeTier: 1 | 2;
  onOpenPricing: () => void;
  animationsEnabled?: boolean;
}

export function ArtisanalCafeTheme({ config, activeTier, onOpenPricing, animationsEnabled = true }: ArtisanalCafeProps) {
  const { restaurant, assets, menu, reviews } = config;
  
  // State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookingState, setBookingState] = useState({
    partySize: "2 Guests (Intimate Table)",
    date: "Today Evening",
    time: "7:30 PM",
    seating: "Sunlit Courtyard",
    notes: "",
    submitted: false,
  });

  const heroImg = assets?.hero_image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80";

  // Categories extraction
  const categories: string[] = ["All", ...Array.from(new Set<string>((menu || []).map((m: any) => String(m.category || "Specialties"))))];

  const filteredMenu = selectedCategory === "All"
    ? (menu || [])
    : (menu || []).filter((m: any) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#241c18] font-sans selection:bg-amber-200 selection:text-amber-950">

      {/* Floating Sub-Nav for Luxury Brand Presence */}
      <header className="border-b border-[#ebdccb] bg-[#faf7f2]/90 backdrop-blur-md sticky top-[49px] z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1c140f]">
              {restaurant.name}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#eee0ce] text-[#744210] text-[10px] font-semibold uppercase tracking-wider">
              {restaurant.area || "Pune"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5c4a3f] uppercase tracking-wider">
            <a href="#story" className="hover:text-[#945219] transition">The Craft</a>
            <a href="#menu" className="hover:text-[#945219] transition">Menu</a>
            {activeTier >= 2 && <a href="#reservation" className="hover:text-[#945219] transition">Reserve Table</a>}
            <a href="#reviews" className="hover:text-[#945219] transition">Reviews</a>
            <a href="#visit" className="hover:text-[#945219] transition">Visiting Hours</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${restaurant.phone || "+919876543210"}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#744210] bg-[#f2e6d6] hover:bg-[#ebd8c2] px-3.5 py-2 rounded-xl transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Host</span>
            </a>

          </div>
        </div>
      </header>

      {/* Majestic Hero Section (Editorial Luxury Style) */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/40 to-orange-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f0e3d2] border border-[#d9c4ad] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#733f13]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="tracking-wide">Artisanal Hospitality in {restaurant.area || "Pune"}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1a120c] leading-[1.08]">
              {restaurant.name}
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-[#634e40] max-w-xl leading-relaxed">
              &ldquo;{restaurant.tagline}&rdquo;
            </p>

            {/* Social Proof & Metrics */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#524135]">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-[#ebd8c2] shadow-sm font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>4.8 on Google Maps</span>
                <span className="text-[#8c7362] font-normal">({reviews?.length || 1000}+ verified reviews)</span>
              </div>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="font-medium">Organic Sourdoughs</span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="font-medium">Single-Origin Roasts</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#menu"
                className="bg-[#1c140f] hover:bg-[#2e2118] text-[#fffcf7] px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-stone-900/15 flex items-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Artisan Menu</span>
              </a>

              {activeTier >= 2 ? (
                <a
                  href="#reservation"
                  className="bg-[#f0e2d1] hover:bg-[#ebd6c0] text-[#542d0c] border border-[#d6be9f] px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </a>
              ) : (
                <a
                  href={`tel:${restaurant.phone || "+919876543210"}`}
                  className="bg-white hover:bg-stone-50 text-[#1c140f] border border-[#e0cbaf] px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Call {restaurant.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Layered Asymmetric Photography (Stitch Style) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImg}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                />
              </div>

              {/* Floating Overlay Badge (Award / Feature) */}
              <div className={`absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-[#ebd8c2] p-4 rounded-2xl shadow-xl max-w-[220px] ${animationsEnabled ? "animate-float-slow" : ""}`}>
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                  <Heart className={`w-4 h-4 fill-amber-500 text-amber-500 ${animationsEnabled ? "animate-pulse" : ""}`} />
                  <span>Crafted with Soul</span>
                </div>
                <p className="text-[11px] text-[#6b584a] mt-1 leading-snug">
                  Slow-brewed single origins & hearth-baked sourdoughs daily in Pune.
                </p>
              </div>

              {/* Floating Open Pill */}
              <div className={`absolute top-4 right-4 bg-[#1c140f]/80 backdrop-blur-md text-[#f7ede2] px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 shadow-lg ${animationsEnabled ? "animate-float-gentle" : ""}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Today until 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story & Craft (Editorial Magazine Spread) */}
      <section id="story" className="py-24 bg-[#f3eae0] border-y border-[#e2d3c2] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#824410] font-bold">
            Philosophy & Origin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a120c] font-normal">
            Where Every Dish Tells a Pune Story
          </h2>
          <div className="w-12 h-0.5 bg-[#824410] mx-auto my-4" />
          <p className="font-serif text-lg sm:text-xl text-[#524135] leading-relaxed whitespace-pre-line">
            {restaurant.about}
          </p>

          {/* Curated USP Chips */}
          {restaurant.usp && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
              {restaurant.usp.map((bullet: string, i: number) => (
                <div 
                  key={i} 
                  className="bg-white/80 border border-[#dfcfbd] rounded-2xl p-5 text-center space-y-2 shadow-sm hover:border-[#824410] transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f8efe4] text-[#824410] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1c140f]">{bullet}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Signature Handcrafted Menu with Category Filter */}
      <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#824410] font-bold">
            Curated Seasonal Offerings
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1a120c]">
            The Artisan Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#735e50]">
            Fresh batches prepared with artisanal care and locally sourced ingredients.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-[#1c140f] text-white shadow-md"
                    : "bg-white text-[#5c4a3f] hover:bg-[#f0e3d2] border border-[#ebd8c2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-7 border border-[#e8d8c6] shadow-sm flex flex-col justify-between group transition-all duration-300 ${
                animationsEnabled ? "hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-300" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.is_veg ? "bg-emerald-600" : "bg-amber-700"}`} />
                      <h3 className="font-serif text-xl font-bold text-[#1c140f] group-hover:text-[#824410] transition">
                        {item.name}
                      </h3>
                    </div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f7efe4] text-[#7a481c]">
                      {item.is_veg ? "Pure Vegetarian" : "Non-Veg Signature"}
                    </span>
                  </div>

                  <span className="font-serif text-2xl font-bold text-[#7a481c]">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-[#6e5849] mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons (Tier-Responsive) */}
              <div className="pt-5 mt-5 border-t border-[#f2e6d8] flex items-center justify-between">
                <span className="text-[11px] text-[#8c7564] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chef Recommendation</span>
                </span>

                <a
                  href={`tel:${restaurant.phone || "+919876543210"}`}
                  className="text-xs font-bold text-[#7a481c] hover:underline flex items-center gap-1"
                >
                  <span>Order by Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier 2: Interactive Table Reservation Suite */}
      {activeTier >= 2 && (
        <section id="reservation" className="py-24 bg-[#ebdccb] border-y border-[#ddcbb7] px-4 font-sans">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#d6c2ab] shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#f8efe4] text-[#7a481c] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#7a481c] font-black">
                VIP Concierge
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1a120c]">
                Reserve Your Table at {restaurant.name}
              </h3>
              <p className="text-xs text-[#705b4c] max-w-md mx-auto">
                Direct booking confirmed instantly to your WhatsApp. No wait times.
              </p>
            </div>

            {bookingState.submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-6 rounded-2xl text-xs space-y-2 text-left">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Table Reservation Simulated!</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-800">
                  In production, this triggers an automated WhatsApp message to the floor manager at <b>{restaurant.phone}</b> with your party size ({bookingState.partySize}), preferred seating ({bookingState.seating}), and sends the customer an instant calendar invite.
                </p>
                <button
                  onClick={() => setBookingState(prev => ({ ...prev, submitted: false }))}
                  className="mt-3 text-xs font-bold text-emerald-700 underline"
                >
                  Test Another Booking
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingState(prev => ({ ...prev, submitted: true }));
                }}
                className="space-y-4 pt-2 text-left text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#453428] block mb-1.5">Party Size</label>
                    <select
                      value={bookingState.partySize}
                      onChange={(e) => setBookingState(prev => ({ ...prev, partySize: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-[#d6c2ab] bg-stone-50 font-medium"
                    >
                      <option>2 Guests (Intimate Table)</option>
                      <option>4 Guests (Family / Friends)</option>
                      <option>6 - 8 Guests (Large Group)</option>
                      <option>Private Workshop / Event (10+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#453428] block mb-1.5">Seating Ambience</label>
                    <select
                      value={bookingState.seating}
                      onChange={(e) => setBookingState(prev => ({ ...prev, seating: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-[#d6c2ab] bg-stone-50 font-medium"
                    >
                      <option>Sunlit Courtyard (Popular)</option>
                      <option>Al Fresco Garden Veranda</option>
                      <option>Indoor AC Lounge</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#453428] block mb-1.5">Date</label>
                    <select
                      value={bookingState.date}
                      onChange={(e) => setBookingState(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-[#d6c2ab] bg-stone-50 font-medium"
                    >
                      <option>Today Evening</option>
                      <option>Tomorrow</option>
                      <option>This Coming Friday</option>
                      <option>This Coming Saturday</option>
                      <option>This Coming Sunday Brunch</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#453428] block mb-1.5">Preferred Time</label>
                    <select
                      value={bookingState.time}
                      onChange={(e) => setBookingState(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-[#d6c2ab] bg-stone-50 font-medium"
                    >
                      <option>12:30 PM (Lunch)</option>
                      <option>1:30 PM (Lunch)</option>
                      <option>5:30 PM (Sunset Coffee)</option>
                      <option>7:30 PM (Dinner)</option>
                      <option>8:30 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1c140f] hover:bg-[#31231a] text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-xl"
                >
                  Confirm Table Booking Preview
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Verified Google Maps Reviews */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#824410] font-bold">
            Guest Feedback
          </span>
          <h2 className="font-serif text-4xl text-[#1a120c]">
            Verified Pune Foodie Impressions
          </h2>
          <p className="text-xs text-[#705b4c]">Direct ratings from Google Maps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(reviews || []).map((rev: any, idx: number) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#ebd8c2] shadow-sm space-y-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Google Review
                </span>
              </div>

              <p className="font-serif italic text-[#3b2b21] leading-relaxed text-sm">
                &ldquo;{rev.text}&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#7a6454]">
                <span className="font-bold text-[#1c140f]">— {rev.author}</span>
                <span>Regular in {restaurant.area || "Pune"}</span>
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

      {/* Visiting Hours & Concierge Footer */}
      <footer id="visit" className="bg-[#140e0b] text-[#b8a698] py-20 px-4 text-xs border-t border-[#291d17]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <h4 className="font-serif text-2xl text-white font-bold">{restaurant.name}</h4>
            <p className="text-[#8f7e71] leading-relaxed">{restaurant.address}</p>
            <p className="text-amber-400 font-bold text-sm">{restaurant.phone}</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Timings</h5>
            <div className="space-y-1.5 text-[#9e8d80]">
              <p>Monday – Thursday: 10:00 AM – 11:00 PM</p>
              <p>Friday – Sunday: 09:30 AM – 11:30 PM</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                Kitchen Open Now
              </span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Instant Concierge</h5>
            <div className="space-y-2">
              <a
                href={`https://wa.me/91${restaurant.phone?.replace(/[^0-9]/g, '') || '9999999999'}?text=Hi%20${encodeURIComponent(restaurant.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp the Host</span>
              </a>
              <a
                href={restaurant.maps_url || "https://maps.google.com"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-400 hover:underline"
              >
                <Compass className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          <div className="bg-[#1f1712] p-5 rounded-2xl border border-[#36271e] space-y-3">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Official Digital Prototype
            </span>
            <p className="text-[11px] text-[#9c8b7f] leading-relaxed">
              Curated exclusively for <b>{restaurant.name}</b> by <b>PuneDigital</b>.
            </p>
            <button
              onClick={onOpenPricing}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition"
            >
              Claim Official Website
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
