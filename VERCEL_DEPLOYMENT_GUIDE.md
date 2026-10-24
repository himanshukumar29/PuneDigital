# 🚀 PuneDigital Vercel Deployment Guide

Deploy your automated restaurant agency platform to **Vercel** with global CDN hosting in under 2 minutes.

---

## Step 1: Create a GitHub Repository

1. Open [github.com/new](https://github.com/new) in your browser.
2. Name the repository: `punedigital-agency` (or any name you prefer).
3. Leave it Public or Private, and do not initialize with README (we already have all files ready).
4. Run these 3 commands in your terminal (`d:\Business\Automations`):

```bash
git add .
git commit -m "feat: PuneDigital agency pipeline, auto-placed restaurant photos & 2-tier lucrative pricing"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/punedigital-agency.git
git push -u origin main
```

---

## Step 2: Import into Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) and click **"Add New..." ➔ "Project"**.
2. Select your newly created `punedigital-agency` GitHub repository and click **Import**.
3. In the **Configure Project** screen:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: Click **Edit** and choose `punedigital-app` (⚠️ **Important**)
4. Expand **Environment Variables** and add:
   - `GOOGLE_PLACES_API_KEY` = `AIzaSyDLnh-VwgBMRoDiz0gvaHD9UvIv8zoXcbA` (or your personal key)
   - `NEXT_PUBLIC_BASE_URL` = `https://<YOUR-PROJECT-NAME>.vercel.app` (leave blank initially or set to your Vercel URL)
   - `AGENCY_SECRET_PASSCODE` = `your_secret_password_here` (Optional)
     - **If left blank**: The Commander Panel (`/agency`) is **100% blocked and returns 404 Not Found** on Vercel to everyone (including clients). You can run it solely on your local PC.
     - **If configured**: You can unlock the Commander Panel privately on Vercel by visiting `https://your-subdomain.vercel.app/agency?secret=your_secret_password_here`. Anyone else directly typing `/agency` gets a real `404 Not Found`.
5. Click **Deploy**.

---

## Step 3: Verification & Live Links

Once Vercel finishes deploying (usually ~45 seconds):
- **Public Agency Landing Page**: `https://<your-subdomain>.vercel.app/`
- **Live Restaurant Prototypes (Clients)**: `https://<your-subdomain>.vercel.app/s/artizen-cafe-baner`
- **Agency Commander Dashboard (Cloaked)**:
  - Accessible on your Local PC: `http://localhost:3000/agency` (No password needed)
  - On Vercel: Returns **404 Not Found** to clients unless unlocked with `?secret=...`
