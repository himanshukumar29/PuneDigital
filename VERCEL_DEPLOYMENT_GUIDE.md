# 🚀 PuneDigital Vercel Deployment & Configuration Guide

Deploy and manage your automated restaurant agency platform on **Vercel** with global CDN hosting.

---

## ⚙️ Adding Environment Variables to an ALREADY Deployed Project

If your project is already deployed on Vercel and you need to access `/agency` or enable live Google Places photos:

### Step 1: Open Environment Variables in Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on your deployed project (e.g., `punedigital` or `punedigital-agency`).
3. Click on the **Settings** tab at the top.
4. In the left-hand navigation, click **Environment Variables**.

### Step 2: Add Required Keys
Add the following variables (check **Production**, **Preview**, and **Development** for each):

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `AGENCY_SECRET_PASSCODE` | `pune2026` *(or your chosen password)* | **Unlocks `/agency` on Vercel**. Without this, `/agency` returns `404 Not Found`. |
| `GOOGLE_PLACES_API_KEY` | `your_google_cloud_places_key` | Enables real Pune cafe photos, ratings, reviews, and address sync. |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` | Generates correct live URLs in outreach pitch drafts. |
| `NEXT_PUBLIC_AGENCY_WHATSAPP` | `919823045678` *(your WhatsApp)* | Pre-filled WhatsApp claim message recipient (no phone calls needed). |
| `NEXT_PUBLIC_AGENCY_EMAIL` | `contact@punedigital.in` *(your email)* | Pre-filled email claim draft recipient. |

Click **Save** after entering each variable.

---

### Step 3: Trigger a REDEPLOY (⚠️ Crucial!)
> [!IMPORTANT]
> In Vercel, adding environment variables does **NOT** update already deployed builds automatically. You MUST trigger a redeploy for the new variables to take effect!

1. In your project dashboard, click on the **Deployments** tab.
2. Click the three horizontal dots (`...`) on the right side of your latest deployment.
3. Click **Redeploy**.
4. Confirm by clicking **Redeploy** in the modal popup.
5. Wait ~35 seconds for Vercel to finish building.

---

## 🔑 How to Access the Agency Commander on Vercel

Once redeployed with `AGENCY_SECRET_PASSCODE=pune2026`:
1. In your browser, navigate to your secret unlock URL:
   ```
   https://your-project.vercel.app/agency?secret=pune2026
   ```
2. The Edge Middleware validates your passcode, sets an encrypted session cookie (`agency_session`), cleans the URL in the address bar back to `/agency`, and grants full access to the Commander Panel.
3. Anyone else directly visiting `https://your-project.vercel.app/agency` without the passcode gets a real **404 Not Found**.

---

## 🖼️ Why Were Cafe Images Missing on Vercel?

1. **Old Revoked Key**: When GitHub detected the secret in the earlier commit, Google Cloud automatically revoked/deactivated the exposed key. Any image requests to `https://places.googleapis.com/...` with a revoked key return HTTP `403 Forbidden`.
2. **Missing Vercel Key**: `GOOGLE_PLACES_API_KEY` was not configured in Vercel's Environment Variables, so serverless functions could not fetch Google Places photo references.
3. **Automatic Fallback Upgrade**: We updated the application so that even if `GOOGLE_PLACES_API_KEY` is not provided, the system automatically serves high-definition, verified cafe photography from Unsplash with 100% uptime and zero hotlink restrictions.

---

## 🔗 How to Share Demo Links with Restaurant Owners

Every restaurant has its own direct, dedicated URL format:
```
https://your-project.vercel.app/s/<restaurant-slug>
```

Examples:
- **Artizen Cafe (Baner)**: `https://your-project.vercel.app/s/artizen-cafe-baner`
- **Chafa Artisan Cafe**: `https://your-project.vercel.app/s/chafa-artisan-cafe`
- **Any Scanned Lead**: `https://your-project.vercel.app/s/starbucks-baner`

### Three Ways to Share:
1. **Directly from the Demo Page**:
   - Open any demo page (e.g. `/s/artizen-cafe-baner`).
   - In the top Owner Preview Bar, click **"Share Link"**.
   - It automatically copies the link to your clipboard (or opens the native share sheet on mobile) to send via WhatsApp, Instagram DM, or Email.
2. **1-Click WhatsApp Pitch from Commander Panel (`/agency`)**:
   - Open `/agency?secret=YOUR_PASSCODE`.
   - Under any scanned cafe lead, click **"WhatsApp"**.
   - It opens WhatsApp with a pre-written, highly persuasive pitch and the live prototype link already included!
3. **1-Click Email Draft from Commander Panel (`/agency`)**:
   - Click **"Mail Draft"**.
   - Copies a full, professional agency proposal ready to paste into Gmail or your email client.

---

## 📞 How Restaurant Owners Contact You to Claim Their Site

When an owner opens their demo and clicks **"Claim Site (₹2,999 / ₹4,999)"**:
- **Claim via WhatsApp**: Opens WhatsApp with pre-filled text:
  *"Hi PuneDigital Team! I am the owner of [Cafe Name]... I would like to claim Tier 1 / Tier 2..."*
- **Claim via Email**: Opens their mail app with pre-written subject line and onboarding request.
- **Direct Phone Dial**: Connects instantly via one-tap mobile calling.
- **Copy Info**: 1-click copies the agency owner's mobile and email details to the clipboard.
