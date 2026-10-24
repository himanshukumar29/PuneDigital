"use client";

import React, { useMemo } from "react";
import { ArchetypeId } from "@/lib/theme-map";

interface AnimatedBackgroundProps {
  enabled: boolean;
  theme?: ArchetypeId;
}

export function AnimatedBackground({ enabled, theme = "artisanal-cafe" }: AnimatedBackgroundProps) {
  // Theme-specific ambient gradient palette
  const themeColors = useMemo(() => {
    switch (theme) {
      case "resto-bar":
        return {
          bgBase: "bg-[#070709]",
          orb1: "bg-gradient-to-tr from-amber-600/15 to-yellow-500/10",
          orb2: "bg-gradient-to-br from-purple-900/15 to-amber-700/10",
          orb3: "bg-gradient-to-tl from-amber-500/10 to-orange-600/10",
          meshOverlay: "radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)",
        };
      case "street-qsr":
        return {
          bgBase: "bg-[#fffdfa]",
          orb1: "bg-gradient-to-tr from-red-500/10 to-yellow-400/15",
          orb2: "bg-gradient-to-br from-amber-400/15 to-red-400/10",
          orb3: "bg-gradient-to-tl from-orange-400/10 to-yellow-300/15",
          meshOverlay: "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.06) 0%, transparent 50%)",
        };
      case "artisanal-cafe":
      default:
        return {
          bgBase: "bg-[#faf7f2]",
          orb1: "bg-gradient-to-tr from-amber-300/25 to-orange-200/20",
          orb2: "bg-gradient-to-br from-[#ebd8c2]/40 to-amber-200/25",
          orb3: "bg-gradient-to-tl from-stone-300/30 to-amber-100/30",
          meshOverlay: "radial-gradient(ellipse at top, rgba(139, 69, 19, 0.06) 0%, transparent 70%)",
        };
    }
  }, [theme]);

  return (
    <div className={`fixed inset-0 pointer-events-none -z-20 overflow-hidden ${themeColors.bgBase}`} aria-hidden="true">
      {/* Ambient Mesh Pattern */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-1000"
        style={{ backgroundImage: themeColors.meshOverlay }}
      />

      {enabled && (
        <>
          {/* Animated Drifting Aurora Orb 1 (Top Right) */}
          <div
            className={`absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full blur-[110px] animate-float-slow transition-all duration-1000 ${themeColors.orb1}`}
            style={{ animationDuration: "14s" }}
          />

          {/* Animated Drifting Aurora Orb 2 (Center Left) */}
          <div
            className={`absolute top-1/3 -left-40 w-[550px] h-[550px] rounded-full blur-[100px] animate-float-reverse transition-all duration-1000 ${themeColors.orb2}`}
            style={{ animationDuration: "18s" }}
          />

          {/* Animated Drifting Aurora Orb 3 (Bottom Right) */}
          <div
            className={`absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-float-gentle transition-all duration-1000 ${themeColors.orb3}`}
            style={{ animationDuration: "16s" }}
          />

          {/* Subtle Aesthetic Animated Grid / Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay animate-pulse-glow"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </>
      )}
    </div>
  );
}
