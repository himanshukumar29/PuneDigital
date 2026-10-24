"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

export function ImageReveal({ children, className = "", direction = "left", delay = 0 }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
    up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
    down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden, scale: 1.1 }}
      animate={isInView ? { clipPath: clipPaths[direction].visible, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
