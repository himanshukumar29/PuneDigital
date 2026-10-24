# 🍽️ PuneDigital — Restaurant Website Automation Business

## Master Build Plan

> **Mission:** Automatically discover high-potential restaurants in Pune without websites,
> generate stunning personalized demo sites using their own photos and menus,
> and pitch owners with tiered pricing — all with under 2 minutes of manual effort per lead.

---

## Table of Contents

0. [💸 Cost Audit & Zero-Investment Bootstrap Mode](#0--cost-audit--zero-investment-bootstrap-mode)
1. [System Architecture Overview](#1-system-architecture-overview)
2. [Tech Stack](#2-tech-stack)
3. [Stage 1: Lead Discovery & Qualification](#3-stage-1-lead-discovery--qualification)
4. [Stage 2: Asset & Metadata Extraction](#4-stage-2-asset--metadata-extraction)
5. [Stage 3: Theme Synthesis & Frontend Build](#5-stage-3-theme-synthesis--frontend-build)
6. [Stage 4: Multi-Tenant Demo Hosting](#6-stage-4-multi-tenant-demo-hosting)
7. [Stage 5: Manual Review & Deal Config (HITL Gate)](#7-stage-5-manual-review--deal-config)
8. [Stage 6: Automated Outreach](#8-stage-6-automated-outreach)
9. [Pricing Architecture](#9-pricing-architecture)
10. [Revenue Projections](#10-revenue-projections)
11. [Project Structure](#11-project-structure)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Conversion Guardrails](#13-conversion-guardrails)
14. [Risks & Mitigations](#14-risks--mitigations)

---

## 0. 💸 Cost Audit & Zero-Investment Bootstrap Mode

> **Goal:** Build and run the entire pipeline with **₹0 out of pocket** until you close your first 2–3 deals.
> Then reinvest ₹5,000–₹10,000 from those deals to unlock the "Scale Mode" upgrades.

### Full Component Cost Audit

| Component | Plan Says | Actual Cost | ₹0 Bootstrap Alternative | Sacrifice |
|-----------|-----------|-------------|--------------------------|-----------|
| **n8n** | Self-hosted Docker | **₹0** — runs on your PC | ✅ Already free. Run `docker compose up` on your Windows PC | Must keep PC on while workflows run (or use a free cloud option — see below) |
| **Google Places API** | API calls | **₹0 for first \$200/month** (Google gives \$200 free credit/month for Maps Platform) | ✅ The free credit covers ~5,000 Place Detail calls/month — more than enough for pilot. You DO need to add a billing account (credit card), but you won't be charged if you stay under \$200. **Alternative if you don't want to add card:** manual Google Maps browsing + Apify free tier (1,000 results/month free) | Apify free tier is limited to ~50 leads/run |
| **Apify** (Instagram scraper, Maps scraper) | Scraping | **₹0** — free tier gives \$5/month credits (~1,000 results) | ✅ Free tier sufficient for pilot. **Alternative:** manually check Instagram bios for contact info | Less automation on contact enrichment |
| **Supabase** (database + storage) | PostgreSQL + file storage | **₹0** — free tier: 500MB DB, 1GB storage, 50K auth users | ✅ Already free. 500MB handles 10,000+ restaurant configs easily | None — free tier is very generous |
| **Google Gemini API** (Vision + Copywriting) | AI calls | **₹0** — Gemini 2.0 Flash free tier: 15 RPM, 1M tokens/day | ✅ Already free. Use `gemini-2.0-flash` for photo curation AND copywriting. No need for OpenAI. | Slightly lower quality than GPT-4o for copywriting, but perfectly fine |
| **Vercel** (hosting) | Wildcard subdomain | ⚠️ **Wildcard domains require Vercel Pro (\$20/month = ~₹1,700/mo)** | 🔄 **Use path-based routing instead:** `punedigital.vercel.app/s/chafa-cafe` instead of `chafa-cafe.punedigital.in`. Vercel Hobby (free) supports this perfectly. | URLs are slightly less impressive but still functional for demos |
| **Custom domain** (`punedigital.in`) | Cloudflare | ⚠️ **~₹200–₹800/year** depending on registrar | 🔄 **Skip for now.** Use free Vercel URL: `your-app.vercel.app/s/restaurant-name`. Buy domain after first deal. | Less professional URL, but the demo site content matters more |
| **Puppeteer** (screenshots) | Cloud service / Urlbox | **₹0** — run Puppeteer locally on your PC, or use n8n's built-in HTML-to-image node | ✅ Already free. `npm install puppeteer` runs on your machine | Screenshots take 5–10 seconds locally instead of 1–2 seconds on cloud |
| **Resend** (email) | Email API | **₹0** — free tier: 100 emails/day, 3,000/month | ✅ Already free. 100/day is way more than you need for pilot. **Alternative:** just use Gmail SMTP node in n8n (also free, 500 emails/day limit) | None |
| **Evolution API** (WhatsApp) | Self-hosted WA Business | **₹0** — open source, runs on Docker on your PC | ✅ Already free. Uses your own WhatsApp number. | Requires a dedicated WhatsApp number (use a secondary SIM) |
| **Google Sheets** (CRM) | Command center | **₹0** | ✅ Already free | None |
| **Telegram Bot** (notifications) | Alerts to you | **₹0** — Telegram Bot API is free | ✅ Already free | None |
| **Next.js + Tailwind** | Frontend framework | **₹0** — open source | ✅ Already free | None |
| **Stitch MCP** (via Antigravity) | Theme design | **₹0** — runs locally in your Antigravity workspace | ✅ Already free. Use it to generate the 5 archetypes once. | None |
| **Unsplash / Pexels** (fallback photos) | Royalty-free images | **₹0** — free APIs, 50 req/hour | ✅ Already free | None |
| **GitHub** | Code hosting + Actions | **₹0** — free tier: 2,000 CI minutes/month | ✅ Already free | None |
| **Docker Desktop** | Container runtime | **₹0** for personal use | ✅ Already free on Windows | None |
| **OpenAI API** | AI copywriting | ⚠️ **Paid — no free tier** | 🔄 **Replace entirely with Gemini 2.0 Flash (free).** Works great for restaurant copy. | Minimal quality difference for this use case |
| **SerpAPI** | Google search enrichment | ⚠️ **Paid — \$50/month** | 🔄 **Skip.** Use Google Places API (free credit) + manual Google search for edge cases | Slightly less automated contact enrichment |
| **Twilio** (WhatsApp) | WA messaging | ⚠️ **Paid — \$0.005/message** | 🔄 **Already replaced with Evolution API (₹0)** in our plan | None |
| **Razorpay** (Tier 3 payments) | Payment gateway | **₹0 to set up** — they charge 2% per transaction, only when you have paying Tier 3 clients | ✅ Don't set up until you actually sell Tier 3 | None |
| **VPS for n8n** (if needed 24/7) | Cloud server | ⚠️ **₹300–₹800/month** (DigitalOcean / Hetzner) | 🔄 **Run n8n on your PC** for now. Scheduled triggers work fine as long as your PC is on during those times. **Alternative:** Use [n8n.cloud free trial](https://n8n.io) (14 days) or Oracle Cloud Always Free tier (forever free ARM VM) | Need PC running for workflows; Oracle Free has setup complexity |

### ₹0 Bootstrap Architecture Changes

```
ORIGINAL PLAN                          BOOTSTRAP MODE (₹0)
─────────────────                      ────────────────────
*.punedigital.in (wildcard)     →      yourapp.vercel.app/s/[slug] (path routing)
Vercel Pro ($20/mo)             →      Vercel Hobby (free)
Custom domain (₹200-800/yr)    →      Free Vercel subdomain
OpenAI GPT-4o (paid)            →      Gemini 2.0 Flash (free, 1M tokens/day)
SerpAPI ($50/mo)                →      Manual search + Google Places free credit
VPS for n8n (₹500/mo)          →      Docker on your PC (or Oracle Free tier)
Twilio WhatsApp (per-msg)       →      Evolution API (free, self-hosted)
Urlbox screenshots (paid)       →      Local Puppeteer (free)
```

### ✅ Your Confirmed Infrastructure

You already have Google Cloud (free tier) and will use Oracle Cloud Always Free + local Docker.
Here's exactly how the three environments fit together:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE (₹0)                         │
│                                                                     │
│  ┌───────────────────────────────┐  ┌────────────────────────────┐ │
│  │  ORACLE CLOUD ARM (Free)      │  │  VERCEL HOBBY (Free)       │ │
│  │  4 OCPUs, 24GB RAM, 200GB     │  │                            │ │
│  │                               │  │  Next.js Multi-Tenant App  │ │
│  │  • n8n (automation engine)    │  │  (demo websites)           │ │
│  │  • Evolution API (WhatsApp)   │  │                            │ │
│  │  • Puppeteer (screenshots)    │  │  CDN + Edge + Free SSL     │ │
│  │  • 24/7 uptime, no PC needed  │  │  Auto-deploy from GitHub   │ │
│  └───────────────────────────────┘  └────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────┐  ┌────────────────────────────┐ │
│  │  GOOGLE CLOUD (Free Tier)     │  │  YOUR PC (Local Docker)    │ │
│  │                               │  │                            │ │
│  │  • Places API ($200/mo free)  │  │  • Development & testing   │ │
│  │  • Gemini API (free Flash)    │  │  • n8n workflow building    │ │
│  │                               │  │  • Template design (Stitch)│ │
│  └───────────────────────────────┘  └────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────┐                                  │
│  │  FREE SAAS TIERS              │                                  │
│  │  • Supabase (DB + Storage)    │                                  │
│  │  • GitHub (code + CI/CD)      │                                  │
│  │  • Gmail SMTP (outreach)      │                                  │
│  │  • Telegram Bot (alerts)      │                                  │
│  └───────────────────────────────┘                                  │
└─────────────────────────────────────────────────────────────────────┘
```

#### Oracle Cloud Always Free ARM — What You Get

| Resource | Amount | What We Use It For |
|----------|--------|-------------------|
| ARM CPUs | 4 OCPUs (Ampere A1) | n8n + Evolution API + Puppeteer |
| RAM | 24 GB | More than enough for all 3 services |
| Block Storage | 200 GB | Docker images, n8n data, screenshots |
| Outbound Data | 10 TB/month | API calls, sending screenshots, etc. |
| Uptime | 24/7/365 | Workflows run even when your PC is off |

#### Docker Compose on Oracle Cloud (What Runs There)

```yaml
# docker-compose.yml (Oracle Cloud ARM instance)
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_HOST=your-oracle-ip
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.yourdomain.com/  # or use Cloudflare Tunnel (free)
    restart: always

  evolution-api:
    image: atendai/evolution-api:latest
    ports:
      - "8080:8080"
    volumes:
      - evolution_data:/evolution/instances
    restart: always

  # Puppeteer runs as part of n8n Code nodes, or as a sidecar:
  browserless:
    image: browserless/chrome:latest
    ports:
      - "3000:3000"
    environment:
      - MAX_CONCURRENT_SESSIONS=2
      - CONNECTION_TIMEOUT=60000
    restart: always

volumes:
  n8n_data:
  evolution_data:
```

#### Local Docker (Your PC) — Development Only

```yaml
# docker-compose.dev.yml (local development)
services:
  n8n-dev:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - ./n8n-data:/home/node/.n8n
      - ./n8n-workflows:/home/node/workflows  # easy import/export

  punedigital-app:
    build: ./punedigital-app
    ports:
      - "3000:3000"
    volumes:
      - ./punedigital-app:/app
      - /app/node_modules
    command: npm run dev  # hot reload
```

### When to Upgrade (After First Deals)

| Milestone | Upgrade | Cost | Why |
|-----------|---------|------|-----|
| **First deal closed (₹7,999+)** | Buy `punedigital.in` domain | ~₹500 | Professional URLs for client sites |
| **3 deals closed (~₹25,000)** | Vercel Pro | ₹1,700/mo | Wildcard subdomains: `client.punedigital.in` |
| **5+ recurring clients** | Upgrade Supabase (if needed) | ₹2,000/mo | More storage, better performance |
| **10+ clients** | Consider dedicated VPS (if Oracle limits hit) | ₹800/mo | More control, better networking |

### Total Cost to Start: **₹0**
### Total Cost to Run First 3 Months: **₹0**
### First Investment (after ~₹25,000 revenue): **~₹2,200/month**

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AUTOMATED PIPELINE                                   │
│                                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ STAGE 1  │    │   STAGE 2    │    │   STAGE 3    │    │   STAGE 4    │  │
│  │ Discovery│───▶│ Asset Scrape │───▶│ Theme Build  │───▶│ Demo Deploy  │  │
│  │ (n8n)    │    │ (n8n + AI)   │    │ (Stitch MCP  │    │ (Multi-      │  │
│  │          │    │              │    │ + Antigravity)│    │  Tenant App) │  │
│  └──────────┘    └──────────────┘    └──────────────┘    └──────┬───────┘  │
│                                                                  │          │
│  ═══════════════════════ HUMAN-IN-THE-LOOP GATE ════════════════╪══════    │
│                                                                  ▼          │
│                                                           ┌──────────────┐  │
│  ┌──────────────┐                                         │   STAGE 5    │  │
│  │   STAGE 6    │◀───────────────────────────────────────│ Your Review  │  │
│  │  Outreach    │         (You click "Approve")           │ & Deal Config│  │
│  │ (n8n Auto)   │                                         │ (Dashboard)  │  │
│  └──────────────┘                                         └──────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Design Principles:**
- **One codebase, many sites:** Single multi-tenant Next.js app with wildcard subdomain routing
- **Config-driven everything:** Each restaurant = one JSON config in the database
- **HITL gate before outreach:** No demo or price goes out without your visual sign-off
- **< 2 min manual effort per lead:** Review demo (30s) + config pricing (30s) + approve (1 click)

---

## 2. Tech Stack

| Layer | Bootstrap Mode (₹0) | Scale Mode (after first deals) |
|-------|---------------------|-------------------------------|
| **Orchestration** | n8n on Docker (Oracle Cloud ARM — free, 24/7) | Same — Oracle handles it fine at scale |
| **Lead Discovery** | Google Places API (\$200 free credit/mo) ✅ you have this | Same — free credit is sufficient even at scale |
| **Contact Enrichment** | Apify free tier + manual IG checks | Apify paid (\$49/mo) for full automation |
| **AI (Vision + Copy)** | **Gemini 2.0 Flash** (free: 15 RPM, 1M tokens/day) | Same — free tier is massive; upgrade to Gemini Pro only if needed |
| **Theme Design** | Stitch MCP via Antigravity (free, local) | Same |
| **Frontend** | Next.js 14 + Tailwind CSS (free, open source) | Same |
| **Database + Storage** | Supabase free tier (500MB DB, 1GB storage) | Supabase Pro (₹2,000/mo) if 50+ clients |
| **Demo Hosting** | Vercel Hobby (free) — **path routing:** `app.vercel.app/s/[slug]` | Vercel Pro (₹1,700/mo) — **wildcard subdomains:** `[slug].punedigital.in` |
| **Domain** | Skip — use free Vercel URL | `punedigital.in` via Cloudflare (~₹500/year) |
| **Screenshots** | Browserless/Puppeteer on Oracle Cloud ARM (free) | Same, or Urlbox (\$19/mo) for speed |
| **Email Outreach** | Gmail SMTP via n8n (free, 500/day) | Resend free tier (100/day, 3K/month) |
| **WhatsApp** | Evolution API on Oracle Cloud Docker (free, 24/7) | Same — no reason to pay for Twilio |
| **CRM** | Google Sheets + n8n webhooks (free) | Same, or Airtable free tier |
| **Notifications** | Telegram Bot API (free) | Same |
| **Payments (Tier 3)** | Don't build yet — sell Tier 1/2 first | Razorpay (₹0 setup, 2% per txn) |

---

## 3. Stage 1: Lead Discovery & Qualification

### Target Micro-Markets (High-Density Pune Food Hubs)

| Priority | Area | Typical Restaurant Type |
|----------|------|------------------------|
| 🔴 High | Koregaon Park | Upscale lounges, European bistros, specialty cafes |
| 🔴 High | Kalyani Nagar | Modern cafes, rooftop restaurants, fusion dining |
| 🔴 High | Balewadi High Street | Trendy cafes, new-age QSR, dessert bars |
| 🟠 Medium | Baner | Family restaurants, cloud kitchens, brunch spots |
| 🟠 Medium | Viman Nagar | Multi-cuisine, IT-crowd cafes, bakeries |
| 🟡 Starter | FC Road | College-area cafes, budget eateries, juice bars |
| 🟡 Starter | Kothrud | Traditional Maharashtrian, home-style restaurants |
| 🟡 Starter | Wakad | New residential hub, emerging food scene |

### n8n Workflow: `01-discovery-pipeline`

```
Schedule Trigger (Mon & Thu at 2:00 AM)
  │
  ├─▶ Set Node: Define search queries array
  │     [
  │       "specialty cafe in Baner Pune",
  │       "rooftop restaurant in Kalyani Nagar Pune",
  │       "bistro in Koregaon Park Pune",
  │       "bakery cafe in Balewadi Pune",
  │       ... (20–30 queries covering all micro-markets)
  │     ]
  │
  ├─▶ Loop: For each query
  │     │
  │     ├─▶ HTTP Request: Google Places Text Search API
  │     │     endpoint: https://places.googleapis.com/v1/places:searchText
  │     │     headers: X-Goog-Api-Key, X-Goog-FieldMask
  │     │     fieldMask: places.id,places.displayName,places.websiteUri,
  │     │                places.rating,places.userRatingCount,
  │     │                places.formattedAddress,places.nationalPhoneNumber,
  │     │                places.googleMapsUri,places.photos,
  │     │                places.primaryType,places.priceLevel,
  │     │                places.regularOpeningHours
  │     │
  │     ├─▶ IF Node: Qualification Filter
  │     │     PASS if ALL of:
  │     │       • websiteUri is EMPTY
  │     │         OR matches: instagram.com, facebook.com,
  │     │           zomato.com, swiggy.com, magicpin.in, linktr.ee
  │     │       • rating >= 4.1
  │     │       • userRatingCount >= 40
  │     │
  │     ├─▶ De-duplicate: Check against existing leads in Supabase by place_id
  │     │
  │     └─▶ Supabase Insert: New lead row
  │           {
  │             place_id, name, address, phone, rating,
  │             review_count, price_level, primary_type,
  │             opening_hours, google_maps_url, photo_refs[],
  │             area: "<extracted from address>",
  │             status: "new",
  │             discovered_at: NOW()
  │           }
  │
  └─▶ Telegram Node: "🔍 Discovery complete. X new leads found across Y areas."
```

### Contact Enrichment (Sub-workflow)

```
Trigger: New lead inserted (status = "new")
  │
  ├─▶ HTTP Request: Apify Instagram Profile Scraper
  │     Search: "{restaurant_name} Pune"
  │     Extract: bio_email, whatsapp_number, ig_handle, follower_count
  │
  ├─▶ IF ig_handle found:
  │     └─▶ HTTP Request: Fetch latest 12 IG posts (public API / Apify)
  │         └─▶ Store post image URLs in lead.ig_photos[]
  │
  ├─▶ Google Search (SerpAPI / Apify): "{restaurant_name} Pune owner contact"
  │     └─▶ Extract any additional email or phone from JustDial, IndiaMART, etc.
  │
  └─▶ Update lead: contact_email, whatsapp_number, ig_handle, ig_photos[]
      Set status: "enriched"
```

---

## 4. Stage 2: Asset & Metadata Extraction

### n8n Workflow: `02-asset-collection`

```
Trigger: Lead status changes to "enriched"
  │
  ├─▶ PHOTOS: Fetch & Curate
  │     │
  │     ├─▶ HTTP Request: Google Places Photo API
  │     │     Fetch top 8 photos (maxWidthPx=1200)
  │     │     + any IG photos from enrichment
  │     │
  │     ├─▶ Gemini Vision Node: AI Photo Curation
  │     │     Prompt:
  │     │     """
  │     │     Analyze these restaurant photos. For each photo:
  │     │     1. Classify as: hero_interior, hero_exterior, signature_dish,
  │     │        food_closeup, ambience, team, or discard
  │     │     2. Score 1-10 on lighting quality and composition
  │     │     3. If score < 6, mark as "needs_replacement"
  │     │
  │     │     Return JSON array:
  │     │     [{ "url": "...", "category": "...", "score": 8,
  │     │        "needs_replacement": false, "description": "..." }]
  │     │     """
  │     │
  │     ├─▶ IF any category has needs_replacement = true:
  │     │     └─▶ Unsplash/Pexels API: Fetch royalty-free fallback
  │     │         matching cuisine type (e.g., "artisan coffee shop interior")
  │     │
  │     └─▶ Upload curated photos to Supabase Storage
  │         Store URLs in lead.curated_photos{}
  │
  ├─▶ MENU: Extract Menu Items
  │     │
  │     ├─▶ HTTP Request: Google Places (menu data if available)
  │     ├─▶ HTTP Request: Zomato public page scrape (top 6 items + INR prices)
  │     ├─▶ Merge & de-duplicate menu items
  │     └─▶ Store: lead.menu_items[]
  │           [{ "name": "...", "price": 249, "category": "Mains",
  │              "is_veg": true, "description": "..." }]
  │
  ├─▶ REVIEWS: Extract Best Reviews
  │     │
  │     ├─▶ HTTP Request: Google Places (reviews field)
  │     ├─▶ LLM Node: Select 3 best 5-star reviews that mention specific dishes
  │     └─▶ Store: lead.top_reviews[]
  │
  ├─▶ AI COPYWRITING: Generate Content
  │     │
  │     ├─▶ Gemini 2.0 Flash Node:
  │     │     Prompt:
  │     │     """
  │     │     Restaurant: {name} in {area}, Pune
  │     │     Cuisine: {primary_type}, Price level: {price_level}
  │     │     Rating: {rating}/5 ({review_count} reviews)
  │     │     Top dishes: {menu_items[0..3]}
  │     │
  │     │     Generate:
  │     │     1. A compelling 2-line tagline
  │     │     2. A 3-paragraph "Our Story" section (warm, authentic tone)
  │     │     3. An SEO meta description (155 chars)
  │     │     4. 3 short USP bullets
  │     │     5. A suggested vibe classification: one of
  │     │        [artisanal-cafe, resto-bar, fine-dine, street-qsr, minimalist-bistro]
  │     │     """
  │     │
  │     └─▶ Store: lead.generated_content{}
  │
  └─▶ Update lead status: "assets_ready"
      Telegram: "📸 Assets ready for {name} ({area}). Vibe: {vibe}"
```

---

## 5. Stage 3: Theme Synthesis & Frontend Build

### Strategy: Hybrid Archetype + Bespoke

**Scalable Core:** Pre-build **5 ultra-polished Stitch MCP archetypes** once, then auto-match.
**Bespoke Override:** For high-ticket leads, trigger Stitch MCP on-demand for custom layouts.

### The 5 Stitch Archetypes (Build Once)

| ID | Archetype | Visual Identity | Best For |
|----|-----------|----------------|----------|
| `artisanal-cafe` | Artisanal Cafe & Bakery | Warm cream palette, serif editorial typography, masonry photo grid, hand-drawn accents | Specialty cafes, bakeries, brunch spots |
| `resto-bar` | Modern Resto-Bar & Lounge | Dark mode, neon/gold accents, parallax hero, event schedule section, table reservation CTA | Bars, lounges, nightlife dining |
| `fine-dine` | Fine-Dine & Heritage Cuisine | Rich maroon/emerald tones, storytelling layout with timeline, banquet inquiry form, chef profile | High-end restaurants, Maharashtrian heritage |
| `street-qsr` | Quick-Service & Street Joint | Bold high-contrast pop colors, sticky WhatsApp fast-order CTA, animated food icons, speed-focused | Fast food, burger joints, street food, QSR |
| `minimalist-bistro` | Minimalist Continental Bistro | Clean grid, high whitespace, gallery-first, chef's specials carousel, neutral tones | Pan-Asian, continental, fusion, modern Indian |

### How to Build Archetypes (One-Time Stitch MCP Work)

For each archetype, use Antigravity + Stitch MCP to:

1. **Create a Stitch Design System** matching the archetype's visual identity
2. **Generate screens:** Hero, Menu, Gallery, Reviews, Contact, About
3. **Export as React/Next.js + Tailwind components**
4. **Parameterize:** Replace hardcoded content with config variables:
   - `{{restaurant.name}}`, `{{restaurant.tagline}}`
   - `{{restaurant.hero_image}}`, `{{restaurant.photos[]}}`
   - `{{restaurant.menu_items[]}}`, `{{restaurant.reviews[]}}`
   - `{{restaurant.hours}}`, `{{restaurant.phone}}`
   - `{{restaurant.colors.primary}}`, `{{restaurant.colors.accent}}`

### Auto Theme Matching (n8n Node)

```
Trigger: Lead status = "assets_ready"
  │
  ├─▶ LLM Node: Theme Matcher
  │     Input: cuisine type, price_level, interior photo descriptions, area
  │     Output: {
  │       "archetype_id": "artisanal-cafe",
  │       "primary_color": "#8B4513",    // extracted from logo/photos
  │       "accent_color": "#D4A574",
  │       "confidence": 0.92
  │     }
  │
  ├─▶ Code Node: Build site_config.json
  │     {
  │       "slug": "chafa-cafe",
  │       "restaurant": {
  │         "name": "Chafa Cafe",
  │         "tagline": "Where every cup tells a story",
  │         "about": "...(generated)...",
  │         "phone": "+91...",
  │         "address": "Lane 5, Koregaon Park, Pune",
  │         "hours": {...},
  │         "google_maps_url": "...",
  │         "ig_handle": "@chafacafe"
  │       },
  │       "theme": {
  │         "archetype_id": "artisanal-cafe",
  │         "primary_color": "#8B4513",
  │         "accent_color": "#D4A574"
  │       },
  │       "assets": {
  │         "hero_image": "https://supabase.../hero.jpg",
  │         "photos": ["..."],
  │         "logo": null
  │       },
  │       "menu": [...],
  │       "reviews": [...],
  │       "pricing": {
  │         "tier1_price": 7999,
  │         "tier2_price": 14999,
  │         "tier3_price": 29999,
  │         "monthly_support": 1499,
  │         "special_offer": null
  │       },
  │       "demo": {
  │         "expires_at": "2026-10-25T23:59:59+05:30",  // 7 days from now
  │         "status": "pending_review"
  │       }
  │     }
  │
  ├─▶ Supabase: Upsert site_config (keyed on slug)
  │
  └─▶ Update lead status: "demo_live"
      Telegram: "🎨 Demo live: https://your-app.vercel.app/s/chafa-cafe — Review now!"
```

---

## 6. Stage 4: Multi-Tenant Demo Hosting

### Architecture: One App, Many Sites

**Bootstrap Mode (₹0)** uses path-based routing on free Vercel Hobby:
`your-app.vercel.app/s/chafa-cafe`

**Scale Mode (after first deals)** upgrades to wildcard subdomains:
`chafa-cafe.punedigital.in`

The Next.js app supports **both modes simultaneously** — middleware detects whether
a custom domain is configured and falls back to path routing.

```
BOOTSTRAP (₹0)                              SCALE MODE (₹2,200/mo)
─────────────                                ───────────────────────
your-app.vercel.app/s/[slug]                 *.punedigital.in → Vercel
      │                                            │
      ▼                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Multi-Tenant App                      │
│                                                                  │
│  middleware.ts:                                                   │
│    IF custom domain → extract slug from subdomain                │
│    ELSE → extract slug from /s/[slug] path                       │
│    Fetch site_config from Supabase                               │
│    Route to archetype layout                                     │
│                                                                  │
│  /themes/artisanal-cafe/                                         │
│  /themes/resto-bar/                                              │
│  /themes/fine-dine/                                              │
│  /themes/street-qsr/                                             │
│  /themes/minimalist-bistro/                                      │
│                                                                  │
│  /components/owner-preview-bar.tsx                               │
│  /components/pricing-drawer.tsx                                  │
│  /components/tier-toggle.tsx                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
            ┌──────────────▼──────────────────────┐
            │         Supabase (Free Tier)         │
            │  • site_configs table (JSON)         │
            │  • leads table (CRM data)            │
            │  • Storage bucket (photos, 1GB free) │
            └─────────────────────────────────────┘
```

### The Owner Preview Bar (Critical Sales Feature)

A floating bar at the top of every demo site lets the owner **experience** each tier:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  👁️ Owner Preview Mode  │  ◉ Tier 1: Showcase  │  ○ Tier 2: Smart     │
│                          │                       │  ○ Tier 3: Orders    │
│                          │                       │                      │
│  ⏳ Demo reserved for Chafa Cafe — 6 days left   │  💰 See Pricing →   │
└──────────────────────────────────────────────────────────────────────────┘
```

| Toggle | What Owner Sees | Purpose |
|--------|----------------|---------|
| **Tier 1: Brand Showcase** | Static menu, photo gallery, Google Maps, reviews, click-to-call | Shows the baseline — "this is yours for ₹7,999" |
| **Tier 2: Smart Growth** | +Interactive WhatsApp table booking, QR menu, seasonal event banners, dynamic specials | "Imagine your regulars booking tables from their phone" |
| **Tier 3: Direct Orders** | +Full cart, item modifiers, Razorpay/UPI checkout, live banner: *"Save 25-30% on aggregator commissions"* | The money shot — ROI framing closes deals |

**Pricing Drawer:** Clicking "See Pricing" opens a modal with the exact (configurable) prices and any special offer you set for that lead.

### Key Implementation Details

```typescript
// middleware.ts — supports BOTH bootstrap (path) and scale (subdomain) modes
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isCustomDomain = hostname.includes('punedigital.in');

  let slug: string | null = null;

  if (isCustomDomain) {
    // SCALE MODE: Extract from subdomain
    slug = hostname.split('.')[0];
    if (slug === 'www' || slug === 'punedigital') {
      return NextResponse.next(); // Marketing site
    }
  } else {
    // BOOTSTRAP MODE: Extract from path /s/[slug]
    const match = request.nextUrl.pathname.match(/^\/s\/([^/]+)/);
    if (match) slug = match[1];
  }

  if (!slug) return NextResponse.next();

  // Rewrite to multi-tenant route
  return NextResponse.rewrite(
    new URL(`/site/${slug}${request.nextUrl.pathname.replace(`/s/${slug}`, '')}`, request.url)
  );
}
```

```typescript
// app/site/[slug]/page.tsx (simplified)
export default async function SitePage({ params }) {
  const config = await supabase
    .from('site_configs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // Check expiry
  if (new Date(config.demo.expires_at) < new Date()) {
    return <DemoExpiredPage />;
  }

  // Render the matching archetype
  const ThemeComponent = THEME_MAP[config.theme.archetype_id];
  return <ThemeComponent config={config} />;
}
```

---

## 7. Stage 5: Manual Review & Deal Config

### Your Daily Workflow (~15 min for 10 leads)

This happens in your **Google Sheets Command Center** (linked to Supabase via n8n):

| Column | Type | What You Do |
|--------|------|------------|
| `Restaurant` | Auto | Pre-filled |
| `Area` | Auto | Pre-filled |
| `Demo_URL` | Auto | Click to inspect → 30 seconds |
| `Theme_ID` | Editable | Change if default theme doesn't fit (dropdown) |
| `Hero_Image` | Editable | Swap URL if awkward photo was selected |
| `Tier_1_Price` | Editable | Default ₹7,999 — adjust per lead |
| `Tier_2_Price` | Editable | Default ₹14,999 |
| `Tier_3_Price` | Editable | Default ₹29,999 |
| `Monthly_Support` | Editable | Default ₹1,499/mo |
| `Special_Offer` | Editable | E.g., "Free .in domain + QR table standees if claimed by Friday" |
| `Status` | Editable | Change `pending_review` → **`approved`** to trigger outreach |

**When you edit Theme_ID or Hero_Image:** n8n webhook fires → Supabase config updates → live site reflects change instantly (no redeploy needed, ISR/SSR).

**When you change Status to `approved`:** n8n outreach workflow triggers automatically.

---

## 8. Stage 6: Automated Outreach

### n8n Workflow: `03-outreach-pipeline`

```
Trigger: Supabase webhook — lead.status changed to "approved"
  │
  ├─▶ Screenshot Node:
  │     Puppeteer / Urlbox: Capture desktop + mobile mockup
  │     of https://{slug}.punedigital.in
  │     Save to Supabase Storage
  │
  ├─▶ CHANNEL 1: WhatsApp (Priority — most Pune owners use WhatsApp)
  │     Evolution API / WhatsApp Business API:
  │     Message:
  │     """
  │     Hi {owner_name/Team} 👋
  │
  │     Loved {restaurant_name}'s reviews in {area} — noticed you
  │     don't have a standalone website yet, so I built a working
  │     prototype using your actual menu & photos:
  │
  │     👉 {demo_url}
  │
  │     You can toggle between the basic showcase and
  │     direct-ordering modes using the bar at the top.
  │
  │     Happy to transfer this to your own custom domain.
  │     Let me know if you'd like to chat!
  │
  │     — {your_name}
  │     """
  │     + Attach: mobile_screenshot.png
  │
  ├─▶ CHANNEL 2: Email (if contact_email exists)
  │     Resend / Gmail API:
  │     Subject: "Built a free website preview for {restaurant_name} 🍽️"
  │     Body: HTML email with desktop screenshot embedded +
  │           3-tier comparison table + demo link button
  │
  ├─▶ CHANNEL 3: Instagram DM (if ig_handle exists, manual fallback)
  │     Telegram notification to you:
  │     "📱 DM @{ig_handle} with demo link: {demo_url}"
  │
  ├─▶ Update lead: status = "contacted", contacted_at = NOW()
  │
  └─▶ FOLLOW-UP SEQUENCE:
        │
        ├─▶ Wait 3 days → IF no reply:
        │     WhatsApp: "Did you get a chance to see the preview? 😊"
        │
        ├─▶ Wait 4 more days → IF no reply:
        │     WhatsApp: "Quick note — a website can boost your Google
        │     ranking and help regulars find you directly. The demo
        │     I built is live for {days_left} more days."
        │
        ├─▶ Wait 7 more days → IF no reply:
        │     WhatsApp: "Last heads up — the demo at {demo_url} expires
        │     tomorrow. Let me know if you'd like to keep it!"
        │
        └─▶ Day 21 with no reply:
              Set status = "archived"
              Set re_contact_date = NOW() + 90 days
```

---

## 9. Pricing Architecture

### Default Pricing (Configurable Per Lead)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         PUNE DIGITAL — PRICING TIERS                             │
├────────────┬─────────────────────┬─────────────────────┬────────────────────────┤
│            │ 🟢 TIER 1           │ 🔵 TIER 2           │ 🟣 TIER 3              │
│            │ Aesthetic Storefront│ Smart Growth Suite   │ Direct Ordering Engine  │
├────────────┼─────────────────────┼─────────────────────┼────────────────────────┤
│ Setup Fee  │ ₹7,999 – ₹11,999   │ ₹14,999 – ₹19,999  │ ₹29,999 – ₹45,000     │
│            │ (one-time)          │ (one-time)          │ (one-time)             │
├────────────┼─────────────────────┼─────────────────────┼────────────────────────┤
│ Monthly    │ ₹499/mo (optional)  │ ₹1,499 – ₹2,499/mo │ ₹3,499 – ₹4,999/mo    │
│ Recurring  │ hosting+domain only │ support + updates   │ priority support       │
├────────────┼─────────────────────┼─────────────────────┼────────────────────────┤
│ Website    │ ✅ Stitch-designed   │ ✅ Dynamic           │ ✅ Full-featured        │
│ Domain     │ ✅ Custom .in/.com   │ ✅ Custom            │ ✅ Custom               │
│ SSL + CDN  │ ✅                   │ ✅                   │ ✅                      │
│ Mobile     │ ✅ Responsive        │ ✅ Responsive        │ ✅ PWA + responsive     │
│ Photos     │ ✅ Gallery           │ ✅ Gallery           │ ✅ Gallery              │
│ Menu       │ ✅ Static display    │ ✅ QR scan dynamic   │ ✅ Real-time editable   │
│ Reviews    │ ✅ Google reviews    │ ✅ Auto-updating     │ ✅ Auto-updating        │
│ Contact    │ ✅ Click-to-call/WA  │ ✅ WhatsApp chat     │ ✅ WhatsApp notif.      │
│ Maps       │ ✅ Google Maps embed │ ✅ + Directions      │ ✅ + Delivery radius    │
│ Updates    │ ❌                   │ ✅ 4/month           │ ✅ Unlimited            │
│ SEO        │ ✅ Basic meta tags   │ ✅ Monthly GMB mgmt  │ ✅ Advanced + GMB       │
│ Booking    │ ❌                   │ ✅ WA table booking  │ ✅ Built-in system      │
│ Events     │ ❌                   │ ✅ Banner/popup      │ ✅ Event pages          │
│ Ordering   │ ❌                   │ ❌                   │ ✅ Full cart + checkout  │
│ Payments   │ ❌                   │ ❌                   │ ✅ Razorpay + UPI       │
│ Admin      │ ❌                   │ ❌                   │ ✅ Menu/stock dashboard │
│ Analytics  │ ❌                   │ ✅ Basic (monthly)   │ ✅ Full dashboard       │
│ Support    │ Email               │ WhatsApp + Email    │ Priority (< 4hr SLA)   │
│ QR Standee │ ❌                   │ ✅ Included          │ ✅ Included             │
└────────────┴─────────────────────┴─────────────────────┴────────────────────────┘
```

### Pricing Adjustment Guidelines

| Area / Type | Adjustment |
|-------------|-----------|
| KP / Kalyani Nagar (upscale) | +40–50% above defaults |
| FC Road / Kothrud (budget) | -20% starter discount |
| Cloud kitchens (high-volume) | Push Tier 3 hard — ROI argument strongest |
| New openings (< 3 months) | Offer "Launch Package" — Tier 2 at Tier 1 price for 3 months |

### The "Aggregator Tax" Close (Tier 3 Killer Argument)

> A restaurant doing ₹3,00,000/month in online orders loses ₹75,000–₹90,000/month to Zomato/Swiggy commissions.
> Shifting just 15% of repeat regulars to direct WhatsApp/Web ordering → saves ~₹11,250–₹13,500/month.
> **Your entire Tier 3 setup fee (₹29,999) pays for itself in under 3 weeks.**

---

## 10. Revenue Projections

### Monthly Projections (After System Is Running)

| Metric | Month 1–2 (Pilot) | Month 3–4 (Scaling) | Month 6+ (Cruising) |
|--------|-------------------|--------------------|--------------------|
| Leads discovered | 50 | 200 | 500 |
| Demos built | 20 | 80 | 200 |
| Outreach sent | 15 | 60 | 150 |
| Responses (8–12%) | 1–2 | 5–7 | 12–18 |
| Conversions (25–30%) | 1 | 2–3 | 4–6 |
| Avg deal value | ₹10,000 | ₹15,000 | ₹18,000 |
| **New revenue** | **₹10,000** | **₹30,000–₹45,000** | **₹72,000–₹108,000** |
| **Recurring revenue** (cumulative) | ₹0 | ₹3,000–₹5,000/mo | ₹25,000–₹50,000/mo |
| **Your costs** | **₹0** (all free tier) | **₹500–₹2,200/mo** (domain + VPS) | **₹4,500/mo** (full stack) |
| **Net profit** | **₹10,000** | **₹28,000–₹43,000** | **₹67,000–₹103,000** |

### Year 1 Projection (Moderate)
- **Total new clients:** ~30–40
- **Total setup revenue:** ₹4,50,000–₹6,00,000
- **Monthly recurring by Dec:** ₹40,000–₹60,000/month
- **Annualized recurring:** ₹4,80,000–₹7,20,000
- **Total Year 1 gross:** ₹9,00,000–₹13,00,000
- **Total costs (Year 1):** ₹25,000–₹40,000 (₹0 for first 2–3 months, then gradual upgrades)
- **Net profit:** ₹8,60,000–₹12,60,000
- **💰 Initial investment required: ₹0**

---

## 11. Project Structure

```
d:\Business\Automations\
│
├── plan.md                          ← THIS FILE (master build guide)
├── .env.example                     ← API keys template
│
├── n8n-workflows/                   ← Exported n8n workflow JSONs
│   ├── 01-discovery-pipeline.json
│   ├── 01b-contact-enrichment.json
│   ├── 02-asset-collection.json
│   ├── 02b-theme-matcher.json
│   ├── 03-outreach-pipeline.json
│   └── 04-follow-up-sequence.json
│
├── punedigital-app/                 ← Multi-tenant Next.js application
│   ├── package.json
│   ├── next.config.js
│   ├── middleware.ts                ← Subdomain routing
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 ← Marketing landing page (punedigital.in)
│   │   └── site/
│   │       └── [slug]/
│   │           ├── page.tsx         ← Dynamic restaurant page
│   │           └── layout.tsx
│   ├── themes/                      ← 5 Stitch-designed archetypes
│   │   ├── artisanal-cafe/
│   │   ├── resto-bar/
│   │   ├── fine-dine/
│   │   ├── street-qsr/
│   │   └── minimalist-bistro/
│   ├── components/
│   │   ├── owner-preview-bar.tsx    ← Tier toggle + expiry timer
│   │   ├── pricing-drawer.tsx       ← "See Pricing" modal
│   │   ├── shared/                  ← Common components across themes
│   │   │   ├── menu-section.tsx
│   │   │   ├── photo-gallery.tsx
│   │   │   ├── reviews-carousel.tsx
│   │   │   ├── contact-section.tsx
│   │   │   ├── google-map.tsx
│   │   │   ├── whatsapp-widget.tsx
│   │   │   ├── cart/                ← Tier 3 only
│   │   │   └── booking/            ← Tier 2+3
│   │   └── demo-expired.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── config-schema.ts         ← TypeScript types for site_config
│   │   └── theme-map.ts             ← archetype_id → component mapping
│   └── public/
│       └── fallback-images/         ← Royalty-free fallbacks by cuisine
│
├── scripts/                         ← Utility scripts
│   ├── seed-test-config.ts          ← Create test site_config for dev
│   ├── screenshot.js                ← Puppeteer screenshot script
│   └── migrate-config.ts            ← Schema migration helpers
│
├── outreach/                        ← Message templates
│   ├── whatsapp/
│   │   ├── initial-pitch.md
│   │   ├── followup-1.md
│   │   ├── followup-2.md
│   │   └── final-reminder.md
│   ├── email/
│   │   ├── initial-pitch.html
│   │   └── tier-comparison.html
│   └── ig-dm/
│       └── initial-pitch.md
│
├── supabase/                        ← Database schema & migrations
│   ├── migrations/
│   │   ├── 001_create_leads.sql
│   │   ├── 002_create_site_configs.sql
│   │   └── 003_create_outreach_log.sql
│   └── seed.sql
│
└── docs/
    ├── setup-guide.md               ← How to set up the whole system
    ├── n8n-setup.md                 ← n8n installation + workflow import
    ├── stitch-archetypes.md         ← How to generate/update archetypes
    └── pricing-playbook.md          ← Sales scripts & objection handling
```

---

## 12. Implementation Roadmap

### 🏗️ Week 1–2: Foundation & Validation

- [ ] **Day 1–2:** Set up infrastructure
  - [ ] Self-host n8n via Docker (local or DigitalOcean droplet)
  - [ ] Create Supabase project (database + storage)
  - [ ] Get Google Places API key, set billing alert at $50
  - [ ] Register `punedigital.in` domain on Cloudflare
  - [ ] Set up wildcard DNS `*.punedigital.in`

- [ ] **Day 3–5:** Build & test Discovery workflow
  - [ ] Build `01-discovery-pipeline` in n8n
  - [ ] Run pilot scan on Koregaon Park + Baner (2 areas only)
  - [ ] Validate: How many restaurants lack websites? (expect 30–50%)
  - [ ] Manually check 10 leads for data quality

- [ ] **Day 6–7:** Build Contact Enrichment sub-workflow
  - [ ] Set up Apify account (free tier)
  - [ ] Test Instagram scraper on 10 leads
  - [ ] Validate: Can we get WhatsApp/email for 60%+ of leads?

### 🎨 Week 2–4: Templates & Auto-Build

- [ ] **Day 8–12:** Build 2 Stitch archetypes in Antigravity
  - [ ] `artisanal-cafe` (covers most Pune cafes)
  - [ ] `minimalist-bistro` (versatile fallback)
  - [ ] Parameterize with config variables
  - [ ] Test with mock data

- [ ] **Day 13–15:** Build multi-tenant Next.js app
  - [ ] Scaffold `punedigital-app/`
  - [ ] Implement subdomain middleware
  - [ ] Implement config-driven rendering
  - [ ] Build Owner Preview Bar + Tier Toggle
  - [ ] Build Pricing Drawer
  - [ ] Deploy to Vercel with wildcard domain

- [ ] **Day 16–18:** Build Asset Collection + Theme Matcher workflows
  - [ ] `02-asset-collection` in n8n (photos, menu, reviews, AI copy)
  - [ ] `02b-theme-matcher` in n8n (LLM → archetype selection + colors)
  - [ ] Test end-to-end: Discovery → Assets → Config → Live demo for 5 restaurants

- [ ] **Day 19–20:** Build remaining 3 archetypes
  - [ ] `resto-bar`, `fine-dine`, `street-qsr`

### 📬 Week 4–5: Outreach & Pilot

- [ ] **Day 21–23:** Build outreach system
  - [ ] Set up Evolution API (WhatsApp) or Twilio
  - [ ] Set up Resend for email
  - [ ] Draft message templates (English + Marathi)
  - [ ] Build `03-outreach-pipeline` in n8n
  - [ ] Build follow-up sequence

- [ ] **Day 24–25:** Set up Command Center
  - [ ] Google Sheets with the review columns
  - [ ] n8n webhook: Sheet edit → Supabase update
  - [ ] Telegram bot for notifications

- [ ] **Day 26–28:** Manual Pilot (10 restaurants)
  - [ ] Run full pipeline for 10 hand-picked restaurants
  - [ ] Personally review each demo
  - [ ] Send outreach manually (validate messaging before automating)
  - [ ] Track: response rate, feedback, objections

### 🚀 Week 5–8: Iterate & Scale

- [ ] **Week 5–6:** Iterate on feedback
  - [ ] Fix template issues flagged by pilot
  - [ ] Refine messaging based on responses
  - [ ] A/B test: Marathi vs English outreach
  - [ ] Optimize photo curation prompts

- [ ] **Week 6–8:** Full automation launch
  - [ ] Run automated pipeline for 50 restaurants
  - [ ] Start building Tier 2 features (QR menu, booking widget)
  - [ ] First paying client → case study → referral engine
  - [ ] Add 7-day demo expiry enforcement

### 📈 Month 3+: Growth

- [ ] Build Tier 3 ordering features
- [ ] Expand to Mumbai suburbs, Nashik
- [ ] Create client self-serve dashboard (menu editing)
- [ ] Build referral program
- [ ] Hire part-time for custom design requests

---

## 13. Conversion Guardrails

### Photo Quality Trap Solution
Google Maps user-uploaded photos often have poor lighting, awkward crops, or are irrelevant (bills, washrooms). The Gemini Vision scoring node explicitly:
1. Scores each photo 1–10 on lighting & composition
2. Classifies into role (hero, dish, ambience, discard)
3. Auto-replaces score < 6 photos with royalty-free alternatives matching cuisine type
4. **Result:** Every demo looks professional, even for restaurants with terrible Google photos

### 7-Day Demo Expiration Timer
- Each demo config includes `expires_at` timestamp (7 days from creation)
- Owner Preview Bar shows: *"Demo reserved for [Restaurant Name] — 6 days left"*
- After expiry: site shows a clean "Demo Expired" page with your contact info
- **Why:** Creates genuine urgency without being pushy; keeps Supabase clean

### "Aggregator Tax" ROI Framing (Tier 3)
Always frame Tier 3 setup cost against aggregator commissions:
- ₹3L/month in orders → ₹75K–₹90K/month lost to Zomato/Swiggy
- Shifting 15% of regulars to direct = ₹11K–₹13.5K saved/month
- **Tier 3 pays for itself in < 3 weeks**

### Message Tone
- Never say "I noticed you don't have a website" — sounds critical
- Instead: "Loved your reviews in [area], built a working prototype using your menu & photos"
- Lead with **what you already built for them**, not what they're lacking

---

## 14. Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Google Places API costs spike | 🟠 Medium | Use field masks strictly, cache results, batch by area, set billing alerts |
| Low response rate (< 5%) | 🔴 High | A/B test messaging, add Marathi templates, try in-person visits for high-value KP leads, lead with mobile screenshot (not just link) |
| Photo quality too low for demos | 🟠 Medium | Gemini Vision scoring + royalty-free fallbacks — every demo looks polished |
| WhatsApp account flagged for spam | 🔴 High | Use WhatsApp Business API (not personal), send < 50 messages/day initially, personalize every message, don't use link shorteners |
| Restaurant already pitched by competitor | 🟠 Medium | Speed + free demo = differentiator. No competitor is auto-generating personalized sites at this speed |
| Template doesn't match restaurant vibe | 🟡 Low | 5 archetypes cover 90% of cases; manual theme override in Command Center for edge cases |
| Legal — scraping concerns | 🟠 Medium | Only use public APIs (Google Places, public Instagram); replace with client's own photos on conversion; add attribution |
| Client churn on recurring plans | 🟠 Medium | Deliver visible monthly value: analytics reports, Google ranking screenshots, competitor comparisons |
| Vercel free tier limits | 🟡 Low | Free tier handles ~100 sites easily; upgrade to Pro ($20/mo) at scale, still very profitable |
| Demo expiry kills warm leads | 🟡 Low | Auto-extend by 7 days if lead replied but hasn't decided; only hard-expire cold leads |

---

## BUILD ORDER — Start Here

> **The minimum viable pipeline to get your first paying client:**
>
> 1. ✅ **One stunning archetype** (`artisanal-cafe`) — your sales weapon
> 2. ✅ **Multi-tenant app + Owner Preview Bar** — the demo experience
> 3. ✅ **Discovery workflow** — validate Pune demand
> 4. ✅ **Manual pilot with 5 restaurants** — validate messaging & conversion
> 5. ✅ **Then automate everything** — only after concept is proven
>
> **Don't build Tier 3 ordering features until you have 3+ paying Tier 1/2 clients.**
