"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { ArchetypeId } from "@/lib/theme-map";

interface AnimatedBackgroundProps {
  enabled: boolean;
  theme?: ArchetypeId;
}

export function AnimatedBackground({ enabled, theme = "artisanal-cafe" }: AnimatedBackgroundProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Smooth mouse-follow spotlight without React re-renders
  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "1";
      }
    };

    const updateSpotlight = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animFrame = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [enabled]);

  // Theme-specific ambient gradient palette
  const themeConfig = useMemo(() => {
    switch (theme) {
      case "resto-bar":
        return {
          bgBase: "bg-[#060608]",
          spotlightColor: "radial-gradient(circle 350px at center, rgba(245, 158, 11, 0.12), rgba(168, 85, 247, 0.04) 50%, transparent 80%)",
          topBeam: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(245, 158, 11, 0.18), transparent 75%)",
          orb1: "bg-gradient-to-tr from-amber-600/25 via-amber-500/15 to-yellow-500/10",
          orb2: "bg-gradient-to-br from-purple-900/20 via-pink-900/15 to-amber-700/15",
          orb3: "bg-gradient-to-tl from-amber-500/20 via-orange-600/15 to-red-600/10",
          orb4: "bg-gradient-to-r from-yellow-600/15 to-amber-400/10",
          dotColor: "rgba(255, 255, 255, 0.07)",
          vignette: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(6, 6, 8, 0.85) 100%)",
        };
      case "street-qsr":
        return {
          bgBase: "bg-[#fffdfa]",
          spotlightColor: "radial-gradient(circle 350px at center, rgba(239, 68, 68, 0.08), rgba(245, 158, 11, 0.06) 50%, transparent 80%)",
          topBeam: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(239, 68, 68, 0.12), transparent 70%)",
          orb1: "bg-gradient-to-tr from-red-500/15 via-orange-400/15 to-yellow-400/20",
          orb2: "bg-gradient-to-br from-amber-400/20 via-red-400/15 to-yellow-300/15",
          orb3: "bg-gradient-to-tl from-orange-400/15 via-red-500/10 to-yellow-400/15",
          orb4: "bg-gradient-to-r from-red-400/10 to-orange-300/15",
          dotColor: "rgba(0, 0, 0, 0.04)",
          vignette: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 45%, rgba(255, 253, 250, 0.8) 100%)",
        };
      case "artisanal-cafe":
      default:
        return {
          bgBase: "bg-[#faf7f2]",
          spotlightColor: "radial-gradient(circle 380px at center, rgba(217, 119, 6, 0.10), rgba(245, 158, 11, 0.05) 50%, transparent 80%)",
          topBeam: "radial-gradient(ellipse 80% 45% at 50% -12%, rgba(217, 119, 6, 0.14), transparent 75%)",
          orb1: "bg-gradient-to-tr from-amber-300/35 via-orange-200/25 to-yellow-100/20",
          orb2: "bg-gradient-to-br from-[#ebd8c2]/50 via-amber-200/35 to-orange-100/30",
          orb3: "bg-gradient-to-tl from-stone-300/40 via-amber-100/40 to-orange-200/25",
          orb4: "bg-gradient-to-r from-amber-200/30 to-yellow-200/20",
          dotColor: "rgba(139, 69, 19, 0.05)",
          vignette: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 45%, rgba(250, 247, 242, 0.8) 100%)",
        };
    }
  }, [theme]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-20 overflow-hidden ${themeConfig.bgBase} transition-colors duration-1000`}
      aria-hidden="true"
    >
      {/* 1. Divine Top Spotlight Light Beam (Apple / Vercel style) */}
      <div
        className="absolute top-0 inset-x-0 h-[480px] pointer-events-none animate-beam transition-opacity duration-1000"
        style={{ backgroundImage: themeConfig.topBeam }}
      />

      {enabled && (
        <>
          {/* 2. Interactive Smooth Mouse-Follow Spotlight Halo */}
          <div
            ref={spotlightRef}
            className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none will-change-transform opacity-70 transition-opacity duration-700"
            style={{
              background: themeConfig.spotlightColor,
              filter: "blur(40px)",
            }}
          />

          {/* 3. Deep Breathing Aurora Orb 1 (Top Right) */}
          <div
            className={`absolute -top-40 -right-40 w-[750px] h-[750px] rounded-full blur-[130px] animate-aurora pointer-events-none ${themeConfig.orb1}`}
          />

          {/* 4. Deep Breathing Aurora Orb 2 (Center-Left) */}
          <div
            className={`absolute top-1/4 -left-48 w-[680px] h-[680px] rounded-full blur-[120px] animate-aurora-reverse pointer-events-none ${themeConfig.orb2}`}
          />

          {/* 5. Deep Breathing Aurora Orb 3 (Bottom-Right Floating Glow) */}
          <div
            className={`absolute -bottom-48 right-1/6 w-[720px] h-[720px] rounded-full blur-[140px] animate-aurora pointer-events-none ${themeConfig.orb3}`}
          />

          {/* 6. Deep Breathing Aurora Orb 4 (Center Ambient Core) */}
          <div
            className={`absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[110px] animate-float-slow pointer-events-none opacity-60 ${themeConfig.orb4}`}
          />

          {/* 7. Subtle Radial-Faded Matrix Dot Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              backgroundImage: `radial-gradient(${themeConfig.dotColor} 1.2px, transparent 1.2px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* 8. Vignette Mask (Softly dissolves dots and colors towards borders) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: themeConfig.vignette }}
          />

          {/* 9. Ultra-Fine Tactile Film Grain (Eliminates digital gradient banding) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </>
      )}
    </div>
  );
}
