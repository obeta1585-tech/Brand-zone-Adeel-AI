import { PortfolioItem } from '../types.ts';

/**
 * Dark gold-and-black luxury placeholder thumbnail with central play emblem.
 * Contains no real brand logos or trademarked graphics.
 */
export const DARK_GOLD_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#3d2f14" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#18140c" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#070605" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf4d1"/>
      <stop offset="35%" stop-color="#d4af37"/>
      <stop offset="70%" stop-color="#8c6c22"/>
      <stop offset="100%" stop-color="#e5c158"/>
    </linearGradient>
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fdf4d1"/>
      <stop offset="50%" stop-color="#e5c158"/>
      <stop offset="100%" stop-color="#c99738"/>
    </linearGradient>
  </defs>

  <!-- Deep Obsidian Background -->
  <rect width="1280" height="720" fill="#070605"/>
  <rect width="1280" height="720" fill="url(#goldGlow)"/>

  <!-- Luxury Geometry / Aesthetic Rings -->
  <circle cx="640" cy="340" r="260" fill="none" stroke="url(#goldRing)" stroke-width="1" stroke-dasharray="6,6" opacity="0.3"/>
  <circle cx="640" cy="340" r="210" fill="none" stroke="url(#goldRing)" stroke-width="1.5" opacity="0.45"/>
  <circle cx="640" cy="340" r="150" fill="none" stroke="url(#goldRing)" stroke-width="1" opacity="0.3"/>

  <!-- Center Play Medallion -->
  <circle cx="640" cy="340" r="68" fill="#13100a" stroke="url(#goldRing)" stroke-width="2.5"/>
  <circle cx="640" cy="340" r="54" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.5"/>
  <polygon points="630,314 664,340 630,366" fill="url(#goldText)"/>

  <!-- Typographic Callout -->
  <text x="640" y="468" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="url(#goldText)" letter-spacing="4">LUXURY WATCH &amp; SERUM AD</text>
  <text x="640" y="508" text-anchor="middle" font-family="monospace" font-size="15" font-weight="600" fill="#a89569" letter-spacing="3">16:9 WIDESCREEN COMMERCIAL • 30 SECONDS</text>
</svg>
`)}`;

export const PORTFOLIO_VIDEOS: PortfolioItem[] = [
  {
    id: 'luxury-watch-and-serum-ad',
    title: 'Luxury Watch and Serum Ad',
    duration: '30 seconds',
    category: 'all',
    description: 'Cinematic luxury watch and serum ad, 30 seconds',
    tagline: 'High-end commercial showcase featuring precision timepieces and cosmetic elixir aesthetic storytelling with dynamic luxury lighting.',
    platformBadge: '16:9 Widescreen',
    aspectRatio: '16:9',
    thumbnailUrl: DARK_GOLD_THUMBNAIL,
    instagramUrl: 'https://www.instagram.com/reel/DeljqNEMIfu/',
    tiktokUrl: 'https://vt.tiktok.com/ZSg21k2wH/',
    isSample: false,
  },
];
