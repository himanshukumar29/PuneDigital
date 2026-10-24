"use client";

import React, { useState, useEffect } from "react";
import { isBlockedOrUnstableUrl, getHeroFallback } from "@/lib/fallback-images";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  theme?: string;
}

export function SafeImage({
  src,
  fallbackSrc,
  theme = "artisanal-cafe",
  alt = "Restaurant photo",
  className = "",
  ...props
}: SafeImageProps) {
  const defaultFallback = fallbackSrc || getHeroFallback(theme);

  // Initial check: if src is missing or from known hotlink-blocking hosts, use fallback immediately
  const initialSrc = (!src || isBlockedOrUnstableUrl(typeof src === "string" ? src : ""))
    ? defaultFallback
    : (src as string);

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync if prop changes
  useEffect(() => {
    if (!src || isBlockedOrUnstableUrl(typeof src === "string" ? src : "")) {
      setCurrentSrc(defaultFallback);
      setHasError(false);
    } else {
      setCurrentSrc(src as string);
      setHasError(false);
    }
  }, [src, defaultFallback]);

  const handleError = () => {
    if (!hasError) {
      // First error: switch to verified fallback image
      setHasError(true);
      setCurrentSrc(defaultFallback);
    } else {
      // In the extremely rare case the fallback also failed, use a local embedded SVG gradient
      setCurrentSrc(
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%231c1917'/><text x='50%25' y='50%25' fill='%23f59e0b' font-family='sans-serif' font-size='24' font-weight='bold' text-anchor='middle' dominant-baseline='middle'>PuneDigital Dining</text></svg>"
      );
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-90"}`}
    />
  );
}
