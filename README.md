# Velora Salon & Spa — GitHub Pages rebuild

Multi-file static site. Plain HTML/CSS/JS, no build step, no npm — deploy as-is.

## Deploy (GitHub Pages, project site)
1. Create repo `velora-salon-spa` under the `alexcharvin` account.
2. Push this folder's contents to the repo root (or `main` branch).
3. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.
4. Live at `https://alexcharvin.github.io/velora-salon-spa/`.

All internal paths are relative (`assets/...`, `index.html`) because project sites live under a subpath.

## Pages
- `index.html` — hero video, stats, services preview, hair/spa features, keratin before/after, stylists, bridal teaser, testimonials, FAQ, CTA
- `services.html` — 16 services, live category filter
- `bridal.html` — Silver ₹25,000 / Gold ₹45,000 / Royal ₹75,000 + quote form (VEL-QTE-XXXX)
- `stylists.html` — 4 stylists + studio info
- `gallery.html` — balayage before/after + 6-look lookbook with lightbox
- `membership.html` — Glow ₹2,999 / Radiance ₹7,999 / Royal ₹24,000 + comparison + summary
- `booking.html` — appointment form, Monday closure + 10-digit phone validation, VEL-APT-XXXX reference
- `contact.html` — address, hours, contact form

## Assets
- `assets/video/` — our 3 videos (hero-salon, hair-styling, spa-ambience), 720p, autoplay muted loop, no play/pause icons
- `assets/img/` — 20 photos extracted from the v1 export (our own images only)
- `assets/css/style.css`, `assets/js/main.js` — shared by all pages

## Rules kept
Native scrolling only (no Lenis/pins/scrub). No play/pause overlay icons. No cursor-follow photo preview. Fictional demo brand disclosed in the footer. Nothing copied from veloraluxuryspa.com or velloraspa.com — own content, services, prices, stylists, images and videos only.
