"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, Sliders, Star, Phone, MapPin, ExternalLink, MessageCircle, 
  Mail, Copy, Check, Sparkles, Utensils, RefreshCw, Zap, ShieldCheck, 
  TrendingUp, Send, CheckCircle2, AlertCircle, ArrowRight, Camera
} from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { getHeroFallback } from "@/lib/fallback-images";
import { getSmartVenuePhotos } from "@/lib/venue-photo-intelligence";
import { CustomCursor } from "@/components/custom-cursor";
import { AnimatedBackground } from "@/components/animated-background";
import { AestheticFX } from "@/components/aesthetic-fx";
import { 
  FadeIn, 
  MagneticButton 
} from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  slug: string;
  area: string;
  address: string;
  phone: string;
  formattedPhone: string;
  rating: number;
  reviews: number;
  websiteUri: string | null;
  mapsUrl: string;
  heroImage?: string;
  photoUrl?: string;
  photos?: string[];
  hasGooglePhotos?: boolean;
  photosCount: number;
  demoUrl: string;
  dealScenario: "tier1" | "tier2";
  whatsappPitch: string;
  emailSubject: string;
  emailPitch: string;
}

export default function AgencyCommanderPage() {
  const [apiKey, setApiKey] = useState("");
  const [selectedArea, setSelectedArea] = useState("Baner");
  const [customArea, setCustomArea] = useState("");
  const [keyword, setKeyword] = useState("cafe");
  const [minRating, setMinRating] = useState(4.1);
  const [minReviews, setMinReviews] = useState(30);
  const [publicBaseUrl, setPublicBaseUrl] = useState("http://localhost:3000");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalScanned, setTotalScanned] = useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPublicBaseUrl(window.location.origin);
      const savedKey = localStorage.getItem("punedigital_google_key");
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    if (typeof window !== "undefined") {
      if (val.trim()) {
        try {
          localStorage.setItem("punedigital_google_key", val.trim());
        } catch (e) {}
      } else {
        localStorage.removeItem("punedigital_google_key");
      }
    }
  };

  // Outreach Modal State
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [pitchChannel, setPitchChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [editablePitch, setEditablePitch] = useState("");
  const [editableSubject, setEditableSubject] = useState("");
  const [copiedState, setCopiedState] = useState(false);

  const areasList = [
    "Baner",
    "Koregaon Park",
    "Kalyani Nagar",
    "Balewadi High Street",
    "Viman Nagar",
    "FC Road",
    "Kothrud",
    "Aundh",
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const targetArea = customArea.trim() || selectedArea;

    try {
      const res = await fetch("/api/pipeline/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          area: targetArea,
          keyword,
          minRating,
          minReviews,
          publicBaseUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to scan Google Places");
      }

      setTotalScanned(data.totalScanned || 0);
      setLeads(data.leads || []);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during search.");
    } finally {
      setIsLoading(false);
    }
  };

  const openOutreachModal = (lead: Lead, channel: "whatsapp" | "email") => {
    setActiveLead(lead);
    setPitchChannel(channel);
    // Guarantee 100% clean, professional link with NO tracking parameters or exposed API keys
    const cleanDemoUrl = `${publicBaseUrl.replace(/\/$/, '')}/s/${lead.slug}`;
    const rawPitch = channel === "whatsapp" ? lead.whatsappPitch : lead.emailPitch;
    const finalPitch = rawPitch.replace(lead.demoUrl, cleanDemoUrl);
    setEditablePitch(finalPitch);
    setEditableSubject(lead.emailSubject);
    setCopiedState(false);
  };

  const handleCopyPitch = () => {
    const textToCopy = pitchChannel === "email" 
      ? `Subject: ${editableSubject}\n\n${editablePitch}`
      : editablePitch;
    navigator.clipboard.writeText(textToCopy);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleSendViaChannel = () => {
    if (!activeLead) return;

    if (pitchChannel === "whatsapp") {
      const phone = activeLead.formattedPhone || "919999999999";
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(editablePitch)}`;
      window.open(waUrl, "_blank");
    } else {
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(editableSubject)}&body=${encodeURIComponent(editablePitch)}`;
      window.location.href = mailtoUrl;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      {/* Drifting Aurora Orbs & Mesh Background */}
      <AnimatedBackground enabled={true} theme="resto-bar" />

      {/* Ambient Aesthetic Sparkles & Floating Doodles */}
      <AestheticFX enabled={true} theme="resto-bar" />

      <CustomCursor enabled={true} theme="resto-bar" />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-amber-500 p-2 rounded-xl text-slate-950 font-black shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                Pune<span className="text-amber-400">Digital</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
              Local PC Commander Mode
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-slate-900"
            >
              Public Agency Site
            </Link>
            <Link
              href="/s/artizen-cafe-baner"
              className="text-amber-400 hover:text-amber-300 font-bold transition px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20"
            >
              Sample Demo Prototype
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Banner */}
        <FadeIn direction="down">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>On-Demand Automated Pipeline</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
              Lead Scanner & 1-Click Outreach Engine
            </h1>
            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              No cloud cron jobs required. Input your rating threshold & target Pune locality to discover qualified restaurants without websites, generate interactive web prototypes, and dispatch personalized pitches.
            </p>
          </div>
        </FadeIn>

        {/* 1. Control Panel / Input Bar */}
        <FadeIn direction="up" delay={0.1}>
          <form
            onSubmit={handleScan}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* API Key */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Google Places API Key</span>
                  <span className="text-[10px] text-amber-400 font-normal">{apiKey ? "Key Saved & Synced to Demos" : "Optional (Curated pipeline ready)"}</span>
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Enter Google Places API Key (saved across sessions)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>

              {/* Target Area */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Target Locality
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedArea}
                    onChange={(e) => {
                      setSelectedArea(e.target.value);
                      setCustomArea("");
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
                  >
                    {areasList.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    placeholder="Other..."
                    className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              {/* Minimum Rating Bar Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-300">
                  <span>Rating Bar Filter</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 font-sans">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>&gt;= {minRating.toFixed(1)} ⭐</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="3.8"
                  max="4.8"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>3.8⭐</span>
                  <span>4.1⭐ (Sweet Spot)</span>
                  <span>4.8⭐</span>
                </div>
              </div>

              {/* Min Review Count */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Minimum Reviews
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={minReviews}
                  onChange={(e) => setMinReviews(parseInt(e.target.value) || 20)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>

              {/* Live Public URL (Vercel / Production Domain) */}
              <div className="col-span-full pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span>Public Live Domain (Vercel URL for Outreach)</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Auto-Detected
                    </span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Links in WhatsApp & Email will use this domain so owners can open on mobile
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={publicBaseUrl}
                    onChange={(e) => setPublicBaseUrl(e.target.value)}
                    placeholder="https://your-agency.vercel.app"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") setPublicBaseUrl(window.location.origin);
                    }}
                    className="px-3.5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 rounded-xl font-bold transition whitespace-nowrap active:scale-95"
                  >
                    Reset to Current
                  </button>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Only qualifies places with <b>no official website</b> (Zomato/IG only)</span>
              </div>

              <MagneticButton strength={0.2} as="div">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/10 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Scanning Pune Google Places...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Scan {customArea.trim() || selectedArea} & Generate Demos</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>
          </form>
        </FadeIn>

        {/* Error notification */}
        {errorMsg && (
          <FadeIn direction="up">
            <div className="p-4 rounded-2xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </FadeIn>
        )}

        {/* 2. Discovered Leads Pipeline Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-3">
                <span>Discovered High-Performing Spots</span>
                {leads.length > 0 && (
                  <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                    {leads.length} Qualified
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {totalScanned > 0
                  ? `Scanned ${totalScanned} places in ${customArea || selectedArea}. Showing qualified spots with rating >= ${minRating} and no website.`
                  : "Run a scan above or explore previously verified leads below."}
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          {leads.length === 0 ? (
            // Empty State with instant demo cards
            <div className="py-16 text-center rounded-3xl border border-dashed border-slate-800 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">No search executed yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click &quot;Scan Baner & Generate Demos&quot; above to fetch live qualified restaurants from Google Maps.
                </p>
              </div>
              <button
                onClick={handleScan}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold rounded-xl transition active:scale-95"
              >
                Run Fast Baner Test Scan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead, idx) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                  className="h-full"
                >
                  <div
                    className="h-full bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 transition duration-300 flex flex-col justify-between hover:-translate-y-1 group"
                  >
                      <div className="space-y-4">
                        {/* Cafe Photography Preview */}
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                          <SafeImage
                            src={lead.heroImage || lead.photoUrl}
                            fallbackSrc={getSmartVenuePhotos(lead.name)[0]?.url || getHeroFallback("artisanal-cafe")}
                            theme="artisanal-cafe"
                            alt={lead.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Photo Origin Badge */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-300 shadow-md">
                            <Camera className="w-3 h-3 text-amber-400" />
                            <span>{lead.hasGooglePhotos ? "Google Maps Photo" : "Verified Cafe Ambience"}</span>
                          </div>
                          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-[10px] text-slate-300 font-mono shadow-md border border-white/5">
                            {lead.photosCount || 6}+ Photos Ready
                          </div>
                        </div>

                        {/* Top Row: Name & Rating */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif font-black text-lg text-white leading-tight">
                              {lead.name}
                            </h3>
                            <span className="text-[11px] font-bold text-amber-400/90 block mt-0.5">
                              📍 {lead.area}, Pune
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black shrink-0">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{lead.rating}</span>
                            <span className="text-[10px] text-slate-400">({lead.reviews})</span>
                          </div>
                        </div>

                        {/* Address & Phone */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {lead.address}
                        </p>

                        <div className="flex items-center justify-between text-xs pt-1 text-slate-300 font-mono">
                          <span>📞 {lead.phone}</span>
                          <a
                            href={lead.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1 font-sans text-[11px]"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Deal Scenario Selector */}
                        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            Select Pitch Package:
                          </label>
                          <select
                            value={lead.dealScenario}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              setLeads((prev) =>
                                prev.map((item) =>
                                  item.id === lead.id ? { ...item, dealScenario: val } : item
                                )
                              );
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                          >
                            <option value="tier1">Tier 1: Starter Presence (₹2,999 - Setup Support + Free Vercel Deploy)</option>
                            <option value="tier2">Tier 2: Managed Care (₹4,999 / 1 Year - Custom Design + Hosting + Changes)</option>
                          </select>
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="space-y-2 pt-4 border-t border-slate-800">
                        <a
                          href={`${publicBaseUrl.replace(/\/$/, '')}/s/${lead.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                        >
                          <span>Open Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => openOutreachModal(lead, "whatsapp")}
                            className="py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </button>

                          <button
                            onClick={() => openOutreachModal(lead, "email")}
                            className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Mail Draft</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
        </div>
      </main>

      {/* 3. Outreach Modal with Spring Physics */}
      <AnimatePresence>
        {activeLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLead(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    Outreach Pitch Composer
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                    Pitch for {activeLead.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Target: <b>{activeLead.phone}</b> ({activeLead.area}, Pune)
                  </p>
                </div>

                {/* Channel Selector */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => {
                      setPitchChannel("whatsapp");
                      setEditablePitch(activeLead.whatsappPitch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      pitchChannel === "whatsapp"
                        ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setPitchChannel("email");
                      setEditablePitch(activeLead.emailPitch);
                      setEditableSubject(activeLead.emailSubject);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      pitchChannel === "email"
                        ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              {/* Email Subject Field (if email channel selected) */}
              {pitchChannel === "email" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    value={editableSubject}
                    onChange={(e) => setEditableSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              )}

              {/* Pitch Body Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
                  <span>Personalized Pitch Message</span>
                  <span className="text-[10px] text-amber-400 lowercase font-mono">Editable</span>
                </div>
                <textarea
                  rows={10}
                  value={editablePitch}
                  onChange={(e) => setEditablePitch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleCopyPitch}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  {copiedState ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveLead(null)}
                    className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-bold transition active:scale-95"
                  >
                    Close
                  </button>

                  <button
                    onClick={handleSendViaChannel}
                    className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg active:scale-95 ${
                      pitchChannel === "whatsapp"
                        ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                        : "bg-amber-400 hover:bg-amber-300 text-slate-950"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {pitchChannel === "whatsapp" ? "Open in WhatsApp Web" : "Open in Mail App"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
