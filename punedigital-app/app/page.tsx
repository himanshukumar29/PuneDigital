"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, Utensils, Zap, ArrowRight, ShieldCheck, TrendingUp, 
  Wand2, MessageSquare, Search, Calculator, CheckCircle2, Star,
  Compass, ExternalLink, Flame, ShieldAlert, Award
} from "lucide-react";
import { AestheticFX } from "@/components/aesthetic-fx";
import { AnimatedBackground } from "@/components/animated-background";
import { CustomCursor } from "@/components/custom-cursor";
import { 
  FadeIn, 
  StaggerChildren, 
  StaggerItem, 
  TextReveal, 
  MagneticButton, 
  TiltCard, 
  GlowBorder,
  Counter 
} from "@/components/motion";
import { motion } from "framer-motion";

export default function AgencyHomePage() {
  const router = useRouter();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState<number>(400000); // 4 Lakhs INR default

  // Calculate commission savings (Aggregator takes ~26% average)
  const aggregatorLoss = Math.round(monthlyVolume * 0.26);
  const annualSavings = aggregatorLoss * 12;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const slug = searchQuery
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    router.push(`/s/${slug}`);
  };

  const quickSamples = [
    { label: "Artizen - Cafe | Art | Studio", slug: "artizen-cafe-baner", tag: "Baner • Verified Lead" },
    { label: "Chafa Artisan Cafe", slug: "chafa-cafe-baner", tag: "Koregaon Park" },
    { label: "Highland Brew & Rooftop", slug: "highland-lounge-kp", tag: "Nightlife Lounge" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Drifting Aurora Orbs & Mesh Background */}
      <AnimatedBackground enabled={animationsEnabled} theme="resto-bar" />

      {/* Cute Ambient Aesthetic Sparkles & Floating Doodles */}
      <AestheticFX enabled={animationsEnabled} theme="resto-bar" />

      {/* Interactive Magnetic Custom Cursor with Trailing Aura & Sparkles */}
      <CustomCursor enabled={animationsEnabled} theme="resto-bar" />

      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`bg-gradient-to-tr from-amber-500 to-amber-300 p-2 rounded-xl text-slate-950 font-black shadow-lg shadow-amber-500/20 ${animationsEnabled ? "animate-pulse" : ""}`}
            >
              <Utensils className="w-5 h-5" />
            </motion.div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                Pune<span className="text-amber-400">Digital</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-black uppercase tracking-wider text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Agency Edition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
            {/* Cute Aesthetic Animation Toggle */}
            <button
              onClick={() => setAnimationsEnabled((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                animationsEnabled
                  ? "bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/40 shadow-sm shadow-pink-500/10 hover:scale-105"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
              title="Toggle cute aesthetic animations"
            >
              <Wand2 className={`w-3.5 h-3.5 ${animationsEnabled ? "text-pink-400 animate-spin-slow" : "text-slate-500"}`} />
              <span className="hidden sm:inline">Aesthetic FX:</span>
              <b className={animationsEnabled ? "text-amber-300" : "text-slate-400"}>
                {animationsEnabled ? "ON ✨" : "OFF"}
              </b>
            </button>

            <Link
              href="/s/artizen-cafe-baner"
              className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-slate-900"
            >
              <span>Live Sample Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <MagneticButton strength={0.25} as="div">
              <a
                href="https://wa.me/919999999999?text=Hi%20PuneDigital,%20I%20am%20interested%20in%20a%20website%20for%20my%20restaurant"
                target="_blank"
                rel="noreferrer"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/20 font-black text-xs uppercase tracking-wider inline-flex items-center"
              >
                WhatsApp Us
              </a>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center max-w-5xl mx-auto space-y-6 relative">
        <FadeIn delay={0.1} direction="down">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold ${
            animationsEnabled ? "animate-float-gentle" : ""
          }`}>
            <Sparkles className={`w-4 h-4 ${animationsEnabled ? "animate-twinkle" : ""}`} />
            <span>Tailored for Pune&apos;s Independent Food Scene • Koregaon Park & Baner</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Aesthetic Web Apps & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              0% Commission Direct Ordering
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} direction="up">
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We convert Pune restaurants, cafes, and rooftop lounges from paying 28% aggregator fees into proud owners of their own high-converting digital storefronts.
          </p>
        </FadeIn>

        {/* Live Restaurant Demo Generator Search Box */}
        <FadeIn delay={0.4} direction="up" className="pt-4 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center gap-2 transition hover:border-amber-500/40"
          >
            <div className="flex items-center gap-3 px-3 flex-1 w-full text-slate-400">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter any Pune restaurant or cafe name..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <MagneticButton strength={0.2} as="div">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Instant Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </form>

          {/* Quick sample chips with StaggerChildren */}
          <div className="pt-4">
            <span className="text-[11px] text-slate-500 font-bold block mb-2">Try live leads:</span>
            <StaggerChildren staggerDelay={0.08} className="flex items-center justify-center flex-wrap gap-2">
              {quickSamples.map((s) => (
                <StaggerItem key={s.slug}>
                  <Link
                    href={`/s/${s.slug}`}
                    className={`text-[11px] px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition inline-flex items-center gap-1.5 ${
                      animationsEnabled ? "hover:scale-105 active:scale-95" : ""
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[9px] text-amber-500/80 font-bold">({s.tag})</span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </FadeIn>
      </section>

      {/* Interactive Aggregator Commission Calculator */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle glowing orb */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Pune Food Business ROI Calculator</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Stop Losing Up To <span className="text-red-400">26%</span> Every Month To Delivery Giants
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  If your restaurant processes delivery and takeout via Zomato or Swiggy, adjust your estimated monthly order volume below to see your direct savings.
                </p>

                {/* Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400">Monthly Online Orders:</span>
                    <span className="text-amber-400 text-base font-serif">₹{monthlyVolume.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>₹1 Lakh</span>
                    <span>₹10 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>
              </div>

              {/* Savings Result Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full lg:w-80 p-6 rounded-2xl bg-slate-950 border border-amber-500/30 shadow-xl space-y-4 text-center relative"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  You Are Handing Over
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-black text-red-400">
                  ₹{aggregatorLoss.toLocaleString("en-IN")}
                  <span className="text-xs font-sans text-slate-400 block font-normal mt-1">per month in commissions</span>
                </div>
                
                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Annual Profit Reclaimed</span>
                  <p className="font-serif text-2xl font-black text-emerald-400">
                    ₹{annualSavings.toLocaleString("en-IN")}/yr
                  </p>
                </div>

                <MagneticButton strength={0.2} as="div">
                  <Link
                    href="/s/artizen-cafe-baner"
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition block shadow-md"
                  >
                    Launch Direct Ordering App
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Two Tiers Overview */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <FadeIn direction="up">
          <div className="text-center mb-14 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>Lucrative & Transparent Pricing for Pune Restaurateurs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">Two Simple & Lucrative Plans</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              No technical skills, no hidden fees, and no full-time headaches. We get your restaurant online in 48 hours.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tier 1 with 3D Tilt */}
          <TiltCard tiltIntensity={8}>
            <div className={`h-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-5 transition-all duration-300 flex flex-col justify-between ${
              animationsEnabled ? "hover:border-amber-500/50 hover:shadow-2xl" : ""
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Tier 1: Starter Presence</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Initial setup support, free Vercel deployment, and custom domain connection to get your restaurant up, verified, and discoverable online.
                </p>
                
                <ul className="text-xs text-slate-300 space-y-2.5 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Free Vercel Cloud Deploy (₹0 Hosting Cost)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Initial Setup & Launch Support Available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Custom Domain Support (Domain as per charge)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Menu Showcase & Photo Gallery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Google Maps Location & Reviews Embed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Fast 48-Hour Handover & Launch</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <span className="text-3xl font-serif font-black text-amber-400">₹2,999</span>
                <span className="text-xs text-slate-500 block mt-0.5">One-time setup investment</span>
              </div>
            </div>
          </TiltCard>

          {/* Tier 2 with GlowBorder + 3D Tilt */}
          <TiltCard tiltIntensity={8}>
            <GlowBorder glowColor="rgba(245, 158, 11, 0.5)" duration={5} className="h-full">
              <div className={`h-full bg-slate-900/90 rounded-3xl p-8 space-y-5 shadow-2xl flex flex-col justify-between relative ${
                animationsEnabled ? "hover:shadow-glow-gold" : ""
              }`}>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-0.5 rounded-full shadow-md z-20">
                  Most Popular In Pune
                </span>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Tier 2: Managed Care (1 Year)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Full peace of mind for 1 full year: bespoke custom brand design tailored to your vibe, high-speed managed cloud hosting, ongoing maintenance & free menu/price changes.
                  </p>
                  
                  <ul className="text-xs text-slate-200 space-y-2.5 pt-2 border-t border-slate-800">
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Everything in Tier 1 Included</span>
                    </li>
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Bespoke Custom Brand Design & Theme Styling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>1 Year Managed Cloud Website Hosting & SSL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>1 Year Domain Serving & Technical Maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Ongoing Menu & Price Changes Handled by Agency</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Dedicated Priority Agency WhatsApp Support</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif font-black text-amber-400">₹4,999</span>
                    <span className="text-xs text-amber-200/80 font-bold">/ 1 Year</span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">All-inclusive 1 full year: custom design + hosting + changes</span>
                </div>
              </div>
            </GlowBorder>
          </TiltCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 text-center text-xs text-slate-500 space-y-2">
        <FadeIn direction="up">
          <p className="font-bold text-slate-400">© 2026 PuneDigital Automation Agency. Baner & Koregaon Park, Pune.</p>
          <p>Built for independent restaurant, cafe, and lounge owners.</p>
        </FadeIn>
      </footer>
    </div>
  );
}
