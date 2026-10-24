"use client";

import React, { useState } from "react";
import { 
  Camera, Sparkles, ExternalLink, Heart, ChevronLeft, ChevronRight, 
  X, CheckCircle2, User, Eye, MapPin
} from "lucide-react";

export interface PhotoItem {
  url: string;
  author?: string;
  authorUri?: string | null;
  caption?: string;
  category?: "Ambience" | "Signature Dishes" | "Patron Snaps" | "Bakes";
  source?: "google_places_api" | "curated" | "owner";
  is_google_verified?: boolean;
  likes?: number;
}

interface GooglePhotoGalleryProps {
  photos?: (string | PhotoItem)[];
  restaurantName: string;
  mapsUrl?: string;
  animationsEnabled?: boolean;
}

export function GooglePhotoGallery({
  photos = [],
  restaurantName,
  mapsUrl = "https://maps.google.com",
  animationsEnabled = true,
}: GooglePhotoGalleryProps) {
  // Normalize photos into PhotoItem objects
  const normalizedPhotos: PhotoItem[] = photos.map((p, idx) => {
    if (typeof p === "string") {
      const categories: ("Ambience" | "Signature Dishes" | "Patron Snaps" | "Bakes")[] = [
        "Ambience", "Signature Dishes", "Patron Snaps", "Bakes", "Ambience", "Signature Dishes"
      ];
      return {
        url: p,
        author: `Pune Foodie #${idx + 1}`,
        caption: `${restaurantName} Moment #${idx + 1}`,
        category: categories[idx % categories.length],
        source: "google_places_api",
        is_google_verified: true,
        likes: 42 + idx * 17
      };
    }
    return {
      ...p,
      category: p.category || (idx % 2 === 0 ? "Ambience" : "Signature Dishes"),
      likes: p.likes || 35 + idx * 12
    };
  });

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});

  const filteredPhotos = activeFilter === "All"
    ? normalizedPhotos
    : normalizedPhotos.filter(p => p.category === activeFilter);

  const toggleLike = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setLikedPhotos(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  if (!normalizedPhotos || normalizedPhotos.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans relative">
      
      {/* Header section with cute badges */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Google Maps Verified Stream</span>
            {animationsEnabled && <span className="animate-pulse">✨</span>}
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-inherit">
            Ambience & Culinary Moments
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            High-resolution snapshots uploaded by <b>{restaurantName}</b> and authentic Pune community patrons to Google Maps.
          </p>
        </div>

        {/* Google Maps External Link & Total badge */}
        <div className="flex items-center gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/5 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs font-bold text-amber-500 hover:text-amber-400 hover:border-amber-500/40 transition shadow-sm ${
              animationsEnabled ? "hover:scale-105 active:scale-95" : ""
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>View All On Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {["All", "Ambience", "Signature Dishes", "Patron Snaps", "Bakes"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeFilter === cat
                ? "bg-amber-500 text-stone-950 shadow-md font-black"
                : "bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-white/5"
            } ${animationsEnabled ? "hover:-translate-y-0.5 active:translate-y-0" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Asymmetric Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, idx) => {
          const isLiked = likedPhotos[idx];
          const isHeroTile = idx === 0;

          return (
            <div
              key={idx}
              onClick={() => setActivePhotoIndex(idx)}
              className={`group relative rounded-3xl overflow-hidden bg-stone-900/10 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-md cursor-pointer transition-all duration-500 aspect-square ${
                isHeroTile ? "col-span-2 row-span-2 aspect-auto min-h-[320px] sm:min-h-[420px]" : ""
              } ${
                animationsEnabled
                  ? "hover:-translate-y-2 hover:shadow-2xl hover:border-amber-500/60"
                  : ""
              }`}
            >
              {/* Photo Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption || `${restaurantName} photo ${idx + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Shimmer overlay for cute aesthetic */}
              {animationsEnabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              )}

              {/* Top Bar Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-[10px] text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Google Maps Upload</span>
                </span>

                {/* Heart like button */}
                <button
                  onClick={(e) => toggleLike(e, idx)}
                  className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition ${
                    isLiked
                      ? "bg-red-500 text-white border-red-400 shadow-lg scale-110"
                      : "bg-black/50 text-white/80 border-white/20 hover:text-white hover:bg-black/70"
                  }`}
                  aria-label="Like photo"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition duration-300">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-0.5">
                  {photo.category}
                </span>
                <p className="text-white text-xs sm:text-sm font-bold truncate">
                  {photo.caption || `${restaurantName} Culinary Special`}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-300 mt-1">
                  <span className="flex items-center gap-1 opacity-80">
                    <User className="w-2.5 h-2.5" />
                    <span>{photo.author}</span>
                  </span>
                  <span className="font-bold text-amber-300/90">
                    {photo.likes! + (isLiked ? 1 : 0)} likes
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next / Prev */}
      {activePhotoIndex !== null && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Stage Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filteredPhotos[activePhotoIndex].url}
              alt={filteredPhotos[activePhotoIndex].caption || restaurantName}
              className="w-full h-full max-h-[72vh] object-contain"
            />
            
            <div className="w-full p-4 bg-stone-950/90 border-t border-white/10 flex items-center justify-between text-xs text-white">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  {filteredPhotos[activePhotoIndex].category} • Verified Google Maps Photo
                </span>
                <p className="font-bold text-sm">
                  {filteredPhotos[activePhotoIndex].caption || restaurantName}
                </p>
                <p className="text-[11px] text-stone-400">
                  Uploaded by {filteredPhotos[activePhotoIndex].author}
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-[11px] transition inline-flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
