"use client";

import React from "react";
import { Sparkles, Clock, ShieldCheck, Calendar, ArrowRight, Palette, Wand2, Zap } from "lucide-react";
import { ArchetypeId } from "@/lib/theme-map";

interface OwnerPreviewBarProps {
  restaurantName: string;
  activeTier: 1 | 2;
  onTierChange: (tier: 1 | 2) => void;
  activeTheme: ArchetypeId;
  onThemeChange: (theme: ArchetypeId) => void;
  onOpenPricing: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: () => void;
  expiresAt?: string;
}

export function OwnerPreviewBar({
  restaurantName,
  activeTier,
  onTierChange,
  activeTheme,
  onThemeChange,
  onOpenPricing,
  animationsEnabled,
  onToggleAnimations,
  expiresAt,
}: OwnerPreviewBarProps) {
  const remainingDays = expiresAt
    ? Math.max(1, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 7;

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800 shadow-2xl px-4 py-2 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-2.5">
        {/* Left: Badge & Expiration */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Owner Preview Mode</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Reserved for <b>{restaurantName}</b> ({remainingDays}d left)</span>
          </div>
        </div>

        {/* Center: Theme Archetype, Animations Toggle & Tier Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Archetype Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-0.5 text-xs">
            <span className="px-2 text-slate-400 flex items-center gap-1 text-[11px] font-bold">
              <Palette className="w-3 h-3 text-amber-400" />
              <span>Theme:</span>
            </span>
            <button
              onClick={() => onThemeChange("artisanal-cafe")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                activeTheme === "artisanal-cafe"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Cafe
            </button>
            <button
              onClick={() => onThemeChange("resto-bar")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                activeTheme === "resto-bar"
                  ? "bg-neutral-800 text-amber-400 border border-amber-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Resto-Bar
            </button>
            <button
              onClick={() => onThemeChange("street-qsr")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                activeTheme === "street-qsr"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Street QSR
            </button>
          </div>

          {/* Cute Aesthetic Animations Toggle */}
          <button
            onClick={onToggleAnimations}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              animationsEnabled
                ? "bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/40 shadow-sm shadow-pink-500/10 hover:scale-105"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
            title="Toggle cute aesthetic sparkles, floating doodles & ambient animations"
          >
            <Wand2 className={`w-3 h-3 ${animationsEnabled ? "text-pink-400 animate-spin-slow" : "text-slate-500"}`} />
            <span>Aesthetic FX: <b className={animationsEnabled ? "text-amber-300" : "text-slate-400"}>{animationsEnabled ? "ON ✨" : "OFF"}</b></span>
          </button>

          {/* Tier Switcher (Only Tier 1 & Tier 2) */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-700/80 text-xs">
            <button
              onClick={() => onTierChange(1)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-medium transition ${
                activeTier === 1
                  ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Tier 1: Starter (₹2,999)</span>
            </button>

            <button
              onClick={() => onTierChange(2)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-medium transition ${
                activeTier === 2
                  ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Tier 2: Custom Design & Care (₹4,999/yr)</span>
            </button>
          </div>
        </div>

        {/* Right: CTA */}
        <button
          onClick={onOpenPricing}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
        >
          <span>Claim Site (₹2,999 / ₹4,999)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
