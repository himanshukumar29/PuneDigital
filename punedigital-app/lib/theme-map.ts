import { ArtisanalCafeTheme } from "@/themes/artisanal-cafe";
import { RestoBarTheme } from "@/themes/resto-bar";
import { StreetQSRTheme } from "@/themes/street-qsr";

export type ArchetypeId = "artisanal-cafe" | "resto-bar" | "street-qsr";

export const THEME_MAP: Record<ArchetypeId, React.ComponentType<any>> = {
  "artisanal-cafe": ArtisanalCafeTheme,
  "resto-bar": RestoBarTheme,
  "street-qsr": StreetQSRTheme,
};

export const ARCHETYPES = [
  { id: "artisanal-cafe", name: "Artisanal Cafe & Bakery", vibe: "Warm cream, serif, acoustic comfort" },
  { id: "resto-bar", name: "Resto-Bar & Rooftop Lounge", vibe: "Dark mode, gold mixology, nightlife" },
  { id: "street-qsr", name: "Street & Burger Joint", vibe: "High-contrast pop, fast ordering, bold" },
];
