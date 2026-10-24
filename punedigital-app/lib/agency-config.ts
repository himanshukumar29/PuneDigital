// PuneDigital Agency Contact Configuration
// Configurable via Vercel Environment Variables or defaults

export interface AgencyContactConfig {
  name: string;
  phone: string;
  cleanPhone: string;
  whatsapp: string;
  email: string;
  city: string;
}

export const AGENCY_CONFIG: AgencyContactConfig = {
  name: process.env.NEXT_PUBLIC_AGENCY_NAME || "PuneDigital",
  phone: process.env.NEXT_PUBLIC_AGENCY_PHONE || "+91 98230 45678",
  cleanPhone: (process.env.NEXT_PUBLIC_AGENCY_PHONE || "919823045678").replace(/[^0-9]/g, ""),
  whatsapp: (process.env.NEXT_PUBLIC_AGENCY_WHATSAPP || process.env.NEXT_PUBLIC_AGENCY_PHONE || "919823045678").replace(/[^0-9]/g, ""),
  email: process.env.NEXT_PUBLIC_AGENCY_EMAIL || "contact@punedigital.in",
  city: "Baner & Koregaon Park, Pune",
};

export function getClaimWhatsAppUrl(restaurantName: string, tier: 1 | 2, price: number) {
  const text = `Hi PuneDigital Team! 👋\n\nI am the owner of *${restaurantName}* in Pune.\nI reviewed our live digital prototype and would like to claim:\n👉 *Tier ${tier} (${tier === 1 ? 'Starter Presence - ₹' + price.toLocaleString('en-IN') : 'Managed Care - ₹' + price.toLocaleString('en-IN') + '/yr'})*.\n\nPlease share the handover process and link our details!`;
  return `https://wa.me/${AGENCY_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function getClaimEmailUrl(restaurantName: string, tier: 1 | 2, price: number, restaurantPhone?: string) {
  const subject = `[Claim Website] Tier ${tier} Plan for ${restaurantName} (Pune)`;
  const body = `Hi PuneDigital Team,\n\nI am the owner/manager of ${restaurantName}.\n\nWe would like to claim our official website prototype:\n- Selected Plan: Tier ${tier} (${tier === 1 ? 'Starter Presence - ₹' + price.toLocaleString('en-IN') + ' One-time' : 'Managed Care - ₹' + price.toLocaleString('en-IN') + ' / 1 Year'})\n- Restaurant Contact: ${restaurantPhone || 'Please call our registered phone'}\n\nPlease reply with the onboarding steps and invoice so we can launch our official domain.\n\nBest regards,\n${restaurantName} Team`;
  return `mailto:${AGENCY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
