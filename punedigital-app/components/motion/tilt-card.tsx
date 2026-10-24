"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareEffect?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltIntensity = 12,
  glareEffect = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
      {glareEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 300px at ${glareX} ${glareY}, rgba(255,255,255,0.08), transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
