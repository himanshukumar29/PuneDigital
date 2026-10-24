"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArchetypeId } from "@/lib/theme-map";

interface CustomCursorProps {
  enabled?: boolean;
  theme?: ArchetypeId;
}

export function CustomCursor({ enabled = true, theme = "artisanal-cafe" }: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailingPosRef = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Theme-specific glow and accent colors
  const themeStyles = {
    "artisanal-cafe": {
      dot: "bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.6)]",
      ringBorder: "border-amber-500/80",
      ringGlow: "0 0 16px rgba(217, 119, 6, 0.3)",
      halo: "bg-amber-500/15",
    },
    "resto-bar": {
      dot: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]",
      ringBorder: "border-yellow-400/90",
      ringGlow: "0 0 18px rgba(250, 204, 21, 0.35)",
      halo: "bg-yellow-400/15",
    },
    "street-qsr": {
      dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]",
      ringBorder: "border-red-500/90",
      ringGlow: "0 0 18px rgba(239, 68, 68, 0.35)",
      halo: "bg-red-500/15",
    },
  }[theme] || {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    ringBorder: "border-amber-400/80",
    ringGlow: "0 0 16px rgba(245, 158, 11, 0.3)",
    halo: "bg-amber-400/15",
  };

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        // Snap trailing to mouse on first entry so it doesn't fly across screen
        trailingPosRef.current = { x: e.clientX, y: e.clientY };
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // 1. Direct hardware-accelerated transform for precision center dot (0ms latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // Fast clickable element detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isClickable = Boolean(
        target.closest("button, a, input, textarea, select, [role='button'], .cursor-pointer")
      );
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Ultra-snappy 120 FPS rAF loop with zero React re-renders
    const updateLoop = () => {
      if (isVisibleRef.current && ringRef.current) {
        // Snappy lerp (0.35 factor ensures immediate responsive feel without sluggish drag)
        const factor = 0.35;
        const dx = posRef.current.x - trailingPosRef.current.x;
        const dy = posRef.current.y - trailingPosRef.current.y;

        // If distance is tiny, snap to target to avoid micro-jitter
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          trailingPosRef.current.x = posRef.current.x;
          trailingPosRef.current.y = posRef.current.y;
        } else {
          trailingPosRef.current.x += dx * factor;
          trailingPosRef.current.y += dy * factor;
        }

        // Direct pure GPU transform (NO reflow, NO CSS transition fighting rAF)
        ringRef.current.style.transform = `translate3d(${trailingPosRef.current.x}px, ${trailingPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!mounted || !enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Fluid Magnetic Outer Ring (Pure GPU translate3d with NO CSS transition on transform) */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border will-change-transform opacity-0 flex items-center justify-center ${themeStyles.ringBorder} ${
          isHovering
            ? "w-12 h-12 border-2"
            : isClicking
            ? "w-6 h-6 border-2"
            : "w-8 h-8 border-[1.5px]"
        }`}
        style={{
          boxShadow: themeStyles.ringGlow,
          // CRITICAL: We only transition size & opacity, NEVER transform!
          transition: "width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out, border-color 0.2s ease-out",
        }}
      >
        {/* Soft inner glow halo when hovering clickable elements */}
        {isHovering && (
          <div className={`w-6 h-6 rounded-full ${themeStyles.halo} animate-ping`} style={{ animationDuration: "1.8s" }} />
        )}
      </div>

      {/* 2. Immediate Precision Center Dot (Instant 0ms tracking) */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full will-change-transform opacity-0 ${themeStyles.dot} ${
          isClicking ? "w-2.5 h-2.5" : isHovering ? "w-1.5 h-1.5 opacity-70" : "w-2 h-2"
        }`}
        style={{
          transition: "width 0.12s ease-out, height 0.12s ease-out, opacity 0.12s ease-out",
        }}
      />
    </div>
  );
}
