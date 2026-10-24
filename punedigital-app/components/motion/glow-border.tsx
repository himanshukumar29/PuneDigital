"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

export function GlowBorder({
  children,
  className = "",
  glowColor = "rgba(245, 158, 11, 0.4)",
  duration = 4,
}: GlowBorderProps) {
  return (
    <div className={`relative p-[1px] overflow-hidden rounded-3xl ${className}`}>
      <motion.div
        className="absolute -inset-[100%] rounded-full opacity-60"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${glowColor} 360deg)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative z-10 w-full h-full rounded-[inherit] bg-slate-900">
        {children}
      </div>
    </div>
  );
}
