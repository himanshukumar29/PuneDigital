"use client";

import React, { useState } from "react";
import { 
  X, Check, Zap, MessageSquare, Sparkles, 
  Mail, Copy, CheckCircle2, ShieldCheck, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENCY_CONFIG, getClaimWhatsAppUrl, getClaimEmailUrl } from "@/lib/agency-config";

interface PricingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  pricing?: {
    tier1_price?: number;
    tier2_price?: number;
    special_offer?: string;
  };
  phone?: string;
}

export function PricingDrawer({
  isOpen,
  onClose,
  restaurantName,
  pricing = {},
  phone: restaurantPhone,
}: PricingDrawerProps) {
  const t1 = pricing.tier1_price || 2999;
  const t2 = pricing.tier2_price || 4999;
  const [copied, setCopied] = useState(false);

  const copyContactDetails = () => {
    const details = `PuneDigital Agency Contact:\nWhatsApp: +${AGENCY_CONFIG.whatsapp}\nEmail: ${AGENCY_CONFIG.email}\nClaiming: ${restaurantName}`;
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition active:scale-95 z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Exclusive Prototype Claim Plan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                Claim {restaurantName}&apos;s Official Website
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Transparent pricing tailored for independent Pune dining brands. Zero commissions, full ownership.
              </p>
              <div className="inline-block text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mt-1">
                🎁 Pune Launch Special: Free .in Domain Included
              </div>
            </div>

            {/* 2-Tier Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tier 1: Starter Presence */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                    <span>Tier 1: Starter Presence</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">₹{t1.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-slate-400 ml-1.5 font-bold">One-time setup</span>
                    <span className="text-xs text-slate-400 block mt-1">₹0 Hosting Forever (Free Vercel Cloud)</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Ideal for restaurants with a tight budget: you get a modern, blazing-fast official website deployed on free Vercel cloud hosting with zero ongoing maintenance fees.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Free Vercel Cloud Deploy (₹0 Hosting Cost)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Initial Setup & Launch Support Available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Custom Domain Support (Domain as per charge)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Menu & Restaurant Photo Gallery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Google Maps Location & Reviews Embed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Fast 48-Hour Handover & Launch</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href={getClaimWhatsAppUrl(restaurantName, 1, t1)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Claim Tier 1 via WhatsApp (₹{t1.toLocaleString("en-IN")})</span>
                  </a>
                  <a
                    href={getClaimEmailUrl(restaurantName, 1, t1, restaurantPhone)}
                    className="w-full text-center py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 font-semibold text-[11px] transition flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Claim via Email Draft</span>
                  </a>
                </div>
              </div>

              {/* Tier 2: Managed Care (Featured) */}
              <div className="bg-gradient-to-b from-amber-500/10 to-slate-800/90 border-2 border-amber-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-amber-500/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md">
                  Most Popular in Pune
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Tier 2: Managed Care</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">₹{t2.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-amber-200/90 ml-1.5 font-bold">/ 1 Year Full Care</span>
                    <span className="text-xs text-slate-300 block mt-1">Custom Design + 1 Year Hosting + Free Changes</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Full peace of mind for 1 full year: bespoke custom design tailored to your vibe, high-speed managed cloud hosting, ongoing maintenance, and free menu/price changes.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-700/60">
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Everything in Tier 1 Included</span>
                    </li>
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Bespoke Custom Brand Design & Theme Styling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>1 Year Managed Cloud Website Hosting & SSL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>1 Year Domain Serving & Technical Maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Ongoing Menu & Price Changes Handled by Agency</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Dedicated Priority Agency WhatsApp Support</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href={getClaimWhatsAppUrl(restaurantName, 2, t2)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Claim Tier 2 via WhatsApp (₹{t2.toLocaleString("en-IN")}/yr)</span>
                  </a>
                  <a
                    href={getClaimEmailUrl(restaurantName, 2, t2, restaurantPhone)}
                    className="w-full text-center py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-amber-500/30 text-amber-300 hover:text-amber-200 font-semibold text-[11px] transition flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-amber-400" />
                    <span>Claim via Email Draft</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Owner Contact & Concierge Hub */}
            <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-950/40 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    Direct Contact with Agency Owner
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Need Custom Additions or Immediate Onboarding in Pune?
                  </h4>
                  <p className="text-xs text-slate-400">
                    Reach our lead team directly via WhatsApp or Official Email.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <a
                    href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi! I am the owner of ${restaurantName} and want to discuss claiming our official website.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${AGENCY_CONFIG.email}?subject=${encodeURIComponent(`Website Claim Inquiry: ${restaurantName}`)}&body=${encodeURIComponent(`Hi PuneDigital Team,\n\nI want to discuss launching the website for ${restaurantName}.\n\nRestaurant: ${restaurantName}\nBest contact channel: WhatsApp / Email`)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700 active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Us</span>
                  </a>

                  <button
                    onClick={copyContactDetails}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 transition active:scale-95"
                    title="Copy Agency Contact Information"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Info</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Contact Information Display Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Official WhatsApp: <b>+{AGENCY_CONFIG.whatsapp}</b></span>
                </span>
                <span className="font-mono text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email: <b>{AGENCY_CONFIG.email}</b></span>
                </span>
                <span className="text-slate-400">
                  📍 {AGENCY_CONFIG.city}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
