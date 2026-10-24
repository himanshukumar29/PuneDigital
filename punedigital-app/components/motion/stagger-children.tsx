"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerChildren({ children, staggerDelay = 0.1, className = "", once = true }: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item to use inside StaggerChildren
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
