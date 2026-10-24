"use client";

import React, { useMemo } from "react";
import { ArchetypeId } from "@/lib/theme-map";

interface AestheticFXProps {
  enabled: boolean;
  theme?: ArchetypeId;
}

export function AestheticFX({ enabled, theme = "artisanal-cafe" }: AestheticFXProps) {
  if (!enabled) return null;

  // Theme-specific aesthetic vector stars and glowing colors
  const themeConfig = useMemo(() => {
    switch (theme) {
      case "resto-bar":
        return {
          icons: ["✦", "✨", "✧", "⋆", "✦", "🍸", "✧", "✨", "⋆", "✦", "🥂", "✧"],
          glowColor: "rgba(245, 158, 11, 0.16)",
          starColor: "text-amber-400",
          bokehColor: "bg-amber-400/10",
        };
      case "street-qsr":
        return {
          icons: ["✦", "🔥", "✨", "⚡", "✧", "⋆", "✦", "✨", "⚡", "✧", "⋆", "✦"],
          glowColor: "rgba(239, 68, 68, 0.14)",
          starColor: "text-amber-400",
          bokehColor: "bg-red-500/10",
        };
      case "artisanal-cafe":
      default:
        return {
          icons: ["✦", "☕", "✧", "⋆", "✨", "✦", "✧", "🌿", "⋆", "✦", "✨", "✧"],
          glowColor: "rgba(217, 119, 6, 0.14)",
          starColor: "text-amber-600",
          bokehColor: "bg-amber-500/10",
        };
    }
  }, [theme]);

  // Pre-calculated deterministic floating particles with varying sizes and depths
  const particles = useMemo(() => {
    return [
      { id: 1, left: "6%", top: "14%", icon: themeConfig.icons[0], size: "text-base", delay: "0s", dur: "7s", anim: "animate-float-slow" },
      { id: 2, left: "93%", top: "20%", icon: themeConfig.icons[1], size: "text-xs", delay: "1.2s", dur: "8s", anim: "animate-float-reverse" },
      { id: 3, left: "14%", top: "42%", icon: themeConfig.icons[2], size: "text-sm", delay: "0.5s", dur: "6s", anim: "animate-float-gentle" },
      { id: 4, left: "88%", top: "58%", icon: themeConfig.icons[3], size: "text-lg", delay: "2.2s", dur: "7.5s", anim: "animate-twinkle" },
      { id: 5, left: "9%", top: "76%", icon: themeConfig.icons[4], size: "text-xs", delay: "1.8s", dur: "9s", anim: "animate-float-reverse" },
      { id: 6, left: "82%", top: "82%", icon: themeConfig.icons[5], size: "text-sm", delay: "0.7s", dur: "6.5s", anim: "animate-float-gentle" },
      { id: 7, left: "52%", top: "26%", icon: themeConfig.icons[6], size: "text-xs", delay: "2.8s", dur: "8.5s", anim: "animate-twinkle" },
      { id: 8, left: "32%", top: "68%", icon: themeConfig.icons[7], size: "text-sm", delay: "1.5s", dur: "7s", anim: "animate-float-slow" },
      { id: 9, left: "68%", top: "15%", icon: themeConfig.icons[8], size: "text-base", delay: "0.3s", dur: "6.2s", anim: "animate-twinkle" },
      { id: 10, left: "96%", top: "38%", icon: themeConfig.icons[9], size: "text-xs", delay: "2.4s", dur: "8s", anim: "animate-float-reverse" },
      { id: 11, left: "22%", top: "88%", icon: themeConfig.icons[10], size: "text-sm", delay: "1.1s", dur: "7.2s", anim: "animate-float-gentle" },
      { id: 12, left: "74%", top: "48%", icon: themeConfig.icons[11], size: "text-xs", delay: "3.1s", dur: "6.8s", anim: "animate-twinkle" },
    ];
  }, [themeConfig]);

  // Subtle floating ambient bokeh disks
  const bokehDisks = useMemo(() => {
    return [
      { id: "b1", left: "20%", top: "18%", w: 180, h: 180, dur: "10s", delay: "0s", anim: "animate-float-slow" },
      { id: "b2", left: "80%", top: "30%", w: 220, h: 220, dur: "12s", delay: "2s", anim: "animate-float-reverse" },
      { id: "b3", left: "65%", top: "75%", w: 200, h: 200, dur: "11s", delay: "1s", anim: "animate-float-gentle" },
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Soft Floating Ambient Bokeh Disks */}
      {bokehDisks.map((b) => (
        <div
          key={b.id}
          className={`absolute rounded-full blur-3xl opacity-40 transition-opacity ${b.anim} ${themeConfig.bokehColor}`}
          style={{
            left: b.left,
            top: b.top,
            width: `${b.w}px`,
            height: `${b.h}px`,
            animationDuration: b.dur,
            animationDelay: b.delay,
          }}
        />
      ))}

      {/* 2. Soft Ambient Radial Glow Orbs */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-70 animate-pulse-glow"
        style={{ background: themeConfig.glowColor }}
      />
      <div
        className="absolute bottom-1/3 left-8 w-[420px] h-[420px] rounded-full blur-[110px] opacity-60 animate-pulse-glow"
        style={{ background: themeConfig.glowColor, animationDelay: "2.5s" }}
      />

      {/* 3. Floating Sparkling Celestial Symbols */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute select-none opacity-40 hover:opacity-100 transition-opacity ${p.size} ${p.anim} ${themeConfig.starColor}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.dur,
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
}
