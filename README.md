# NetAesthetics — Deployment Guide

## What's in this folder

```
netaesthetics-deploy/
├── index.html           — The complete homepage (53KB)
├── videos/              — 3 Remotion-generated background animations (WebM)
│   ├── hero-loop.webm          (99KB)
│   ├── strategy-visual.webm    (48KB)
│   └── security-visual.webm    (216KB)
├── images/              — Placeholder folder (add real images later)
├── favicon.svg          — Browser tab icon
├── robots.txt           — SEO crawler permissions
├── sitemap.xml          — Single page sitemap
├── _headers             — Cloudflare Pages headers configuration
├── _redirects           — URL redirect rules
└── README.md            — This file
```

**Total size:** ~416KB (well under the 600KB target)

---

## How to deploy to Cloudflare Pages

### Option A: Drag and drop (easiest)

1. Go to https://dash.cloudflare.com
2. Click **Pages** → **Create a project** → **Direct Upload**
3. **Drag this entire folder** into the upload area
4. Click **Deploy**
5. Once deployed, go to **Custom Domains** and add **netaesthetics.com**

### Option B: Git deploy (better for future updates)

1. Create a new GitHub repo called "netaesthetics-site"
2. Push all these files to the `main` branch:
   ```bash
   cd netaesthetics-deploy
   git init
   git add .
   git commit -m "Initial deploy: NetAesthetics V12 with Remotion videos"
   git remote add origin git@github.com:YOUR_USERNAME/netaesthetics-site.git
   git push -u origin main
   ```
3. In Cloudflare Pages, create a new project → **Connect to Git**
4. Select the repo, set build output to `"/"` (root)
5. Deploy
6. Add custom domain: **netaesthetics.com**

---

## DNS Setup (do this after Cloudflare Pages is live)

1. In Cloudflare DNS, add a **CNAME** record:
   - **Name:** `@` (or `netaesthetics.com`)
   - **Target:** `your-project.pages.dev`
   - **Proxy:** ON (orange cloud)

2. Add another **CNAME** for www:
   - **Name:** `www`
   - **Target:** `your-project.pages.dev`
   - **Proxy:** ON

3. SSL: Set to **Full (Strict)** in Cloudflare **SSL/TLS** settings

---

## After deployment, verify:

- [ ] Site loads at **netaesthetics.com**
- [ ] SSL certificate is active (green lock)
- [ ] Videos play on mobile (hero background, strategy scene, security scene)
- [ ] All buttons link to HubSpot booking page
- [ ] robots.txt accessible at **netaesthetics.com/robots.txt**
- [ ] sitemap.xml accessible at **netaesthetics.com/sitemap.xml**
- [ ] Multi-step form advances correctly (step 1 → 2 → 3)
- [ ] "Talk to Rasheid directly" link works
- [ ] No layout breaks on mobile (test at 375px width)

---

## Video Integration Details

**3 Remotion videos integrated:**

1. **Hero background** (`hero-loop.webm` — 99KB)
   - Position: absolute, full-screen behind all hero content
   - CSS gradients and particles remain on top for layered effect
   - Opacity: 15% to blend subtly with dark background

2. **Strategy scene** (`strategy-visual.webm` — 48KB)
   - Replaces SVG constellation graphic in "We find your best AI opportunities" section
   - Fills the `.scene-visual` card
   - Opacity: 50%

3. **Security scene** (`security-visual.webm` — 216KB)
   - Replaces SVG concentric circles in "Your data stays safe. Period." section
   - Fills the `.scene-visual` card
   - Opacity: 50%

**All videos:**
- `autoplay muted loop playsinline` (mobile-safe attributes)
- WebM format for maximum compression and quality
- Blend seamlessly with dark backgrounds

---

## Link Verification (all confirmed working)

✅ All "Get Free AI Audit" buttons → `https://meetings.hubspot.com/netaesthetics-solutions/ai-strategy-consultation`
✅ "Talk to Rasheid directly" → `https://meetings.hubspot.com/rscarlett`
✅ Email links → `mailto:solutions@netaesthetics.com`
✅ Phone links → `tel:+12026008034`
✅ Nav CTA = "Get Free AI Audit" (NOT "Book Assessment")

---

## Performance Targets

- **Total page weight:** <600KB ✅ (416KB achieved)
- **Load time:** <2 seconds
- **Lighthouse scores:** 90+ across all categories
- **Mobile responsiveness:** Works at 375px (iPhone SE)

---

## Support Files Explained

### `_headers`
Cloudflare Pages headers file. Sets security headers (X-Frame-Options, CSP, etc.) and cache policies.

### `_redirects`
Handles legacy URL redirects. All `/home`, `/contact`, and landing page URLs redirect to root.

### `robots.txt`
Allows all crawlers and points to sitemap.

### `sitemap.xml`
Single-page sitemap for SEO. Update with additional pages as site grows.

### `favicon.svg`
SVG favicon with NetAesthetics gradient colors (pink → purple → blue). Scalable and sharp on all devices.

---

## Troubleshooting

**Videos not playing on mobile?**
- Check that `playsinline` attribute is present on all `<video>` tags (it is)
- Verify WebM codec support (all modern browsers support it)

**Form not advancing?**
- Check browser console for JavaScript errors
- Verify `msGo()` function is defined at bottom of HTML

**Layout broken on mobile?**
- Test at 375px width (iPhone SE)
- Check for horizontal scroll (should be none)

**SSL certificate not active?**
- Wait 24 hours for DNS propagation
- Verify CNAME records point to correct `.pages.dev` URL
- Check Cloudflare SSL mode is "Full (Strict)"

---

## Notes for Future Updates

- **Add new pages:** Create new HTML files in root, update `sitemap.xml`, add to nav
- **Replace video files:** Drop new `.webm` files in `/videos`, keep same filenames
- **Update copy:** Edit `index.html` directly (single-file architecture)
- **Add images:** Place in `/images` folder, reference as `images/filename.jpg`

---

## Contact

If you have questions about this deployment:
- **Rasheid Scarlett:** rasheid@netaesthetics.com
- **Technical issues:** solutions@netaesthetics.com

---

**Deployment prepared:** March 10, 2026
**Version:** V12 Final (with Remotion videos)
**Status:** Production-ready ✅
