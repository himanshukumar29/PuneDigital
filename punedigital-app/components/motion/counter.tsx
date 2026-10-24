"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function Counter({ target, prefix = "", suffix = "", duration = 2, className = "", decimals = 0 }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v: number) => {
      setDisplay(v.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{isInView ? display : "0"}{suffix}
    </span>
  );
}
