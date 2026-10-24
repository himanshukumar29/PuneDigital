"use client";

import React, { useMemo } from "react";
import { ArchetypeId } from "@/lib/theme-map";

interface AestheticFXProps {
  enabled: boolean;
  theme?: ArchetypeId;
}

export function AestheticFX({ enabled, theme = "artisanal-cafe" }: AestheticFXProps) {
  if (!enabled) return null;

  // Theme-specific aesthetic icons and colors
  const themeConfig = useMemo(() => {
    switch (theme) {
      case "resto-bar":
        return {
          icons: ["✨", "✦", "🍸", "✧", "⋆", "🥂", "✦", "✨", "⭐", "✧"],
          glowColor: "rgba(245, 158, 11, 0.15)",
          starColor: "text-amber-300",
        };
      case "street-qsr":
        return {
          icons: ["✨", "🔥", "⚡", "✦", "💛", "✨", "⋆", "✦", "⚡", "✧"],
          glowColor: "rgba(239, 68, 68, 0.12)",
          starColor: "text-yellow-400",
        };
      case "artisanal-cafe":
      default:
        return {
          icons: ["✨", "☕", "✦", "✧", "🤎", "⋆", "✧", "✨", "✦", "🌿"],
          glowColor: "rgba(217, 119, 6, 0.12)",
          starColor: "text-amber-500",
        };
    }
  }, [theme]);

  // Pre-calculated deterministic floating particles
  const particles = useMemo(() => {
    return [
      { id: 1, left: "8%", top: "15%", icon: themeConfig.icons[0], delay: "0s", dur: "6s", anim: "animate-float-slow" },
      { id: 2, left: "92%", top: "22%", icon: themeConfig.icons[1], delay: "1.2s", dur: "7s", anim: "animate-float-reverse" },
      { id: 3, left: "18%", top: "45%", icon: themeConfig.icons[2], delay: "0.5s", dur: "5.5s", anim: "animate-float-gentle" },
      { id: 4, left: "85%", top: "60%", icon: themeConfig.icons[3], delay: "2s", dur: "6.5s", anim: "animate-float-slow" },
      { id: 5, left: "12%", top: "78%", icon: themeConfig.icons[4], delay: "1.8s", dur: "8s", anim: "animate-float-reverse" },
      { id: 6, left: "78%", top: "85%", icon: themeConfig.icons[5], delay: "0.7s", dur: "5s", anim: "animate-float-gentle" },
      { id: 7, left: "48%", top: "28%", icon: themeConfig.icons[6], delay: "2.5s", dur: "7.5s", anim: "animate-twinkle" },
      { id: 8, left: "35%", top: "72%", icon: themeConfig.icons[7], delay: "1.5s", dur: "6s", anim: "animate-float-slow" },
      { id: 9, left: "62%", top: "12%", icon: themeConfig.icons[8], delay: "0.3s", dur: "5.2s", anim: "animate-twinkle" },
      { id: 10, left: "95%", top: "40%", icon: themeConfig.icons[9], delay: "2.1s", dur: "6.8s", anim: "animate-float-reverse" },
    ];
  }, [themeConfig]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {/* Soft Ambient Aurora Glow in the background */}
      <div
        className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-60 animate-pulse-glow"
        style={{ background: themeConfig.glowColor }}
      />
      <div
        className="absolute bottom-1/3 left-10 w-[350px] h-[350px] rounded-full blur-3xl opacity-50 animate-pulse-glow"
        style={{ background: themeConfig.glowColor, animationDelay: "2s" }}
      />

      {/* Scattered Cute Floating Doodles & Sparkles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute text-sm select-none opacity-50 hover:opacity-100 transition-opacity ${p.anim} ${themeConfig.starColor}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.dur,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
}
