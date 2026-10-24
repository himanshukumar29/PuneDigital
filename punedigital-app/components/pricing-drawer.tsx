"use client";

import React from "react";
import { X, Check, Shield, Zap, PhoneCall, MessageSquare, Sparkles } from "lucide-react";

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
}: PricingDrawerProps) {
  if (!isOpen) return null;

  const t1 = pricing.tier1_price || 2999;
  const t2 = pricing.tier2_price || 4999;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            Official Prototype Claim Offer • {restaurantName}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Simple & Lucrative Website Plans
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            No technical skills or headache needed. We handle your restaurant&apos;s digital presence in 48 hours.
          </p>

          <div className="mt-3 inline-block bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-4 py-1.5 rounded-full font-medium">
            🎁 Pune Launch Special: Free .in Domain + QR Standees included
          </div>
        </div>

        {/* 2-Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Tier 1: Starter Presence */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-500 transition">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                <Shield className="w-5 h-5 text-amber-400" />
                <span>Tier 1: Starter Presence</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white">₹{t1.toLocaleString("en-IN")}</span>
                <span className="text-xs text-slate-400 block mt-1">One-time setup investment</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Initial setup support, free Vercel deployment, and custom domain connection to get your restaurant up, running, and discoverable online.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
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
                  <span>Click-to-Call & Direct WhatsApp Link</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/919999999999?text=Hi,%20I%20want%20to%20claim%20Tier%201%20(Rs%202,999)%20for%20${encodeURIComponent(restaurantName)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full text-center py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Claim Tier 1 (₹2,999)
            </a>
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
                  <span>Scan-at-Table Dynamic QR Menu Standees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dedicated Priority Agency WhatsApp Support</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/919999999999?text=Hi,%20I%20want%20to%20claim%20Tier%202%20(Rs%204,999/yr)%20for%20${encodeURIComponent(restaurantName)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              Claim Tier 2 (₹4,999 / Year)
            </a>
          </div>
        </div>

        {/* Footer contact */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <span>Need custom changes or direct onboarding in Pune?</span>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp PuneDigital</span>
            </a>
            <a
              href="tel:+919999999999"
              className="flex items-center gap-1.5 text-amber-400 hover:underline font-bold"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
