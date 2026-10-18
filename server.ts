import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adeel2026';
let currentAdminToken = 'adeel-session-' + Date.now();

app.use(express.json());

// Persistent Data Storage Path
const DATA_DIR = path.resolve(__dirname, 'server-data');
const DATA_FILE = path.resolve(DATA_DIR, 'marketplace-store.json');

// Interface Definitions
export interface MarketplaceProduct {
  id: string;
  name: string;
  nameUrdu: string;
  brandName: string;
  brandNameUrdu: string;
  description: string;
  descriptionUrdu: string;
  images: string[];
  category: 'watches' | 'perfumes' | 'shoes' | 'slippers' | 'clothing' | 'electronics' | 'cosmetics';
  originalPricePkr: number;
  promotionalPricePkr?: number;
  purchaseUrl: string;
  packageId: 'starter' | 'featured' | 'premium';
  durationDays: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  paymentStatus: 'unpaid' | 'paid' | 'in_progress' | 'completed';
  companyId?: string;
  companyName?: string;
  companyWhatsApp?: string;
  clicks: {
    whatsappInquiries: number;
    websiteVisits: number;
    views: number;
  };
  createdAt: string;
  featured: boolean;
  videoAdUrl?: string;
}

export interface Company {
  id: string;
  brandName: string;
  contactPerson: string;
  businessEmail: string;
  phoneWhatsApp: string;
  websiteSocialLink: string;
  category: string;
  registeredAt: string;
  status: 'active' | 'pending' | 'verified';
}

export interface PromotionPackage {
  id: 'starter' | 'featured' | 'premium';
  name: string;
  nameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  pricePkr: number;
  durationDays: number;
  deliverables: string[];
  deliverablesUrdu: string[];
  placement: string;
  placementUrdu: string;
  badge: string;
  badgeUrdu: string;
  isPopular?: boolean;
}

interface MarketplaceStore {
  products: MarketplaceProduct[];
  companies: Company[];
  packages: PromotionPackage[];
}

// Initial Seed Data with high quality luxury photography in all 7 requested categories
const INITIAL_PACKAGES: PromotionPackage[] = [
  {
    id: 'starter',
    name: 'Starter Promotion',
    nameUrdu: 'اسٹارٹر پروموشن',
    tagline: 'Ideal for emerging brands launching their first product on social media.',
    taglineUrdu: 'نئے برانڈز کے لیے موزوں جو سوشل میڈیا پر اپنی پہلی پروڈکٹ متعارف کروا رہے ہیں۔',
    pricePkr: 15000,
    durationDays: 7,
    deliverables: [
      'Marketplace listing for 7 full days',
      'Direct WhatsApp inquiry routing (+92 322 3552103)',
      '1 Instagram Reel & TikTok social shoutout',
      'Standard product badge & search placement',
      'Real-time click and inquiry statistics'
    ],
    deliverablesUrdu: [
      'مارکیٹ پلیس پر 7 دن کی مکمل لسٹنگ',
      'براہ راست واٹس ایپ انکوائری روٹنگ',
      'انسٹاگرام اور ٹک ٹاک پر 1 پروموشنل ویڈیو شوٹ',
      'معیاری پروڈکٹ بیج اور سرچ لسٹنگ',
      'کلکس اور انکوائریز کے تفصیلی اعداد و شمار'
    ],
    placement: 'Category Gallery & Marketplace Grid',
    placementUrdu: 'کیٹلاگ گیلری اور مارکیٹ پلیس گرڈ',
    badge: 'Starter Ad',
    badgeUrdu: 'اسٹارٹر اشتہار',
    isPopular: false
  },
  {
    id: 'featured',
    name: 'Featured Product',
    nameUrdu: 'فیچرڈ پروڈکٹ',
    tagline: 'High-visibility placement with dedicated 30-second cinematic AI video ad.',
    taglineUrdu: 'نمایاں جگہ اور 30 سیکنڈ کا سینیمیٹک اے آئی پروڈکٹ ویڈیو اشتہار۔',
    pricePkr: 35000,
    durationDays: 14,
    deliverables: [
      'Dedicated 30s cinematic AI video ad (9:16 & 16:9)',
      'Top homepage banner & hero carousel feature',
      '14 days prominent marketplace placement',
      'Featured Golden Badge on all listings',
      'Priority WhatsApp client connection',
      'Social media push on Instagram & TikTok'
    ],
    deliverablesUrdu: [
      '30 سیکنڈ کا سینیمیٹک AI ویڈیو اشتہار (ورٹیکل اور وائیڈ اسکرین)',
      'ہوم پیج ہیرو بینر میں نمایاں فیچر',
      '14 دن تک نمایاں گولڈن مارکیٹ پلیس لسٹنگ',
      'تمام لسٹنگز پر فیچرڈ گولڈ بیج',
      'ترجیحی واٹس ایپ کسٹمر کنکشن',
      'انسٹاگرام اور ٹک ٹاک پر خصوصی مہم'
    ],
    placement: 'Homepage Spotlight + Top Gallery Placement',
    placementUrdu: 'ہوم پیج اسپاٹ لائٹ + ٹاپ گیلری',
    badge: 'Featured Spotlight',
    badgeUrdu: 'نمایاں فیچر',
    isPopular: true
  },
  {
    id: 'premium',
    name: 'Premium Brand Campaign',
    nameUrdu: 'پریمیم برانڈ مہم',
    tagline: 'Comprehensive brand exposure across web, Instagram Reels, and TikTok ads.',
    taglineUrdu: 'ویب، انسٹاگرام ریلز اور ٹک ٹاک پر برانڈ کی مکمل اور پر اثر تشہیر۔',
    pricePkr: 75000,
    durationDays: 30,
    deliverables: [
      '2 Custom AI Commercial Ads (Story + Feed formats)',
      '30 days continuous VIP marketplace placement',
      'Dedicated Brand Profile & Direct Store link',
      'Priority review & instant listing modifications',
      'Multi-platform video optimization & sound design',
      'Full monthly performance report & WhatsApp lead logs'
    ],
    deliverablesUrdu: [
      '2 کسٹم AI ویڈیو اشتہارات (اسٹوری اور فیڈ فارمیٹ)',
      '30 دن تک لگاتار وی آئی پی مارکیٹ پلیس لسٹنگ',
      'مخصوص برانڈ پروفائل اور ڈائریکٹ اسٹور لنک',
      'فوری منظوری اور لا محدود ترامیم',
      'سوشل میڈیا آپٹیمائزیشن اور کسٹم ساؤنڈ ڈیزائن',
      'ماہانہ تفصیلی رپورٹ اور واٹس ایپ لیڈ لاگ'
    ],
    placement: 'VIP Sticky Banner + Exclusive Category Header',
    placementUrdu: 'وی آئی پی اسٹکی بینر + خصوصی کیٹیگری ہیڈر',
    badge: 'VIP Elite',
    badgeUrdu: 'وی آئی پی ایلیٹ',
    isPopular: false
  }
];

const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    brandName: 'Aura Horology',
    contactPerson: 'Zain Ul Abideen',
    businessEmail: 'info@aurahorology.pk',
    phoneWhatsApp: '+92 300 4567890',
    websiteSocialLink: 'https://instagram.com/aurahorology',
    category: 'watches',
    registeredAt: '2026-10-10T10:00:00Z',
    status: 'verified'
  },
  {
    id: 'comp-2',
    brandName: 'Sultan Fragrances',
    contactPerson: 'Hamza Tariq',
    businessEmail: 'orders@sultanfragrances.com',
    phoneWhatsApp: '+92 321 8899221',
    websiteSocialLink: 'https://sultanfragrances.com',
    category: 'perfumes',
    registeredAt: '2026-10-11T12:30:00Z',
    status: 'verified'
  },
  {
    id: 'comp-3',
    brandName: 'Veloce Footwear',
    contactPerson: 'Bilal Farooq',
    businessEmail: 'contact@velocefootwear.pk',
    phoneWhatsApp: '+92 333 1122334',
    websiteSocialLink: 'https://velocefootwear.pk',
    category: 'shoes',
    registeredAt: '2026-10-12T14:15:00Z',
    status: 'verified'
  },
  {
    id: 'comp-4',
    brandName: 'Zafar Artisan Footwear',
    contactPerson: 'Adeel Zafar',
    businessEmail: 'brandzoneadeel@gmail.com',
    phoneWhatsApp: '+92 322 3552103',
    websiteSocialLink: 'https://instagram.com/adeelzafar',
    category: 'slippers',
    registeredAt: '2026-10-08T09:00:00Z',
    status: 'verified'
  },
  {
    id: 'comp-5',
    brandName: 'Nawabi Heritage Couture',
    contactPerson: 'Shahzaib Malik',
    businessEmail: 'couture@nawabiheritage.com',
    phoneWhatsApp: '+92 312 9988776',
    websiteSocialLink: 'https://nawabiheritage.com',
    category: 'clothing',
    registeredAt: '2026-10-13T11:45:00Z',
    status: 'verified'
  },
  {
    id: 'comp-6',
    brandName: 'Apex Sonic Audio',
    contactPerson: 'Ali Raza',
    businessEmail: 'support@apexsonic.pk',
    phoneWhatsApp: '+92 345 5544332',
    websiteSocialLink: 'https://apexsonic.pk',
    category: 'electronics',
    registeredAt: '2026-10-14T16:20:00Z',
    status: 'verified'
  },
  {
    id: 'comp-7',
    brandName: 'Lumière Glow Labs',
    contactPerson: 'Dr. Fatima Noor',
    businessEmail: 'hello@lumiereglow.pk',
    phoneWhatsApp: '+92 301 7766554',
    websiteSocialLink: 'https://lumiereglow.pk',
    category: 'cosmetics',
    registeredAt: '2026-10-15T08:50:00Z',
    status: 'verified'
  }
];

const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  // 1. Watches
  {
    id: 'prod-watch-1',
    name: 'Royal Chronograph Gold Edition',
    nameUrdu: 'رائل کرونوگراف گولڈ ایڈیشن واچ',
    brandName: 'Aura Horology',
    brandNameUrdu: 'اورا ہورولوجی',
    description: 'Precision Swiss-inspired chronograph with sunray black dial, sapphire glass, and 18K gold-plated stainless steel mesh strap. Waterproof up to 50 meters.',
    descriptionUrdu: 'سوئس ڈیزائن کرونوگراف جس میں سن رے بلیک ڈائل، سیفائر کرسٹل گلاس اور 18 قیراط گولڈ چڑھائی گئی اسٹینلیس اسٹیل چین شامل ہے۔',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'watches',
    originalPricePkr: 24500,
    promotionalPricePkr: 19999,
    purchaseUrl: 'https://aurahorology.pk/products/royal-chronograph',
    packageId: 'featured',
    durationDays: 14,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-1',
    companyName: 'Aura Horology',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 34, websiteVisits: 112, views: 890 },
    createdAt: '2026-10-12T10:00:00Z',
    featured: true,
    videoAdUrl: 'https://www.instagram.com/reel/DeljqNEMIfu/'
  },
  // 2. Perfumes
  {
    id: 'prod-perfume-1',
    name: 'Oud Royale Intense Parfum (100ml)',
    nameUrdu: 'عود رائل انٹینس پرفیوم (100 ملی لیٹر)',
    brandName: 'Sultan Fragrances',
    brandNameUrdu: 'سلطان فریگرنسز',
    description: 'Opulent blend of aged Cambodian agarwood, Damascus rose, amber, and Madagascar vanilla. Exceptional 24-hour sillage crafted for royalty.',
    descriptionUrdu: 'کلاسیکی کمبوڈین عود، دمشقی گلاب، عنبر اور ونیلا کا شاہکار امتزاج۔ 24 گھنٹے تک برقرار رہنے والی دیرپا خوشبو۔',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'perfumes',
    originalPricePkr: 14000,
    promotionalPricePkr: 11500,
    purchaseUrl: 'https://sultanfragrances.com/products/oud-royale',
    packageId: 'featured',
    durationDays: 14,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-2',
    companyName: 'Sultan Fragrances',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 28, websiteVisits: 94, views: 760 },
    createdAt: '2026-10-13T12:00:00Z',
    featured: true
  },
  // 3. Shoes
  {
    id: 'prod-shoe-1',
    name: 'Italian Hand-Burnished Oxford Brogues',
    nameUrdu: 'اٹالین ہینڈ برنشڈ آکسفورڈ بروگ جوتے',
    brandName: 'Veloce Footwear',
    brandNameUrdu: 'ویلوس فٹ ویئر',
    description: 'Full-grain calfskin leather handcrafted with classic wingtip perforation, Goodyear welted leather soles, and memory foam comfort insole.',
    descriptionUrdu: 'خالص چمڑے سے تیار کردہ کلاسک آکسفورڈ فارمل شوز۔ آرام دہ لیدر سول اور پائیدار ہینڈ کرافٹڈ فٹنگ۔',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'shoes',
    originalPricePkr: 18500,
    promotionalPricePkr: 15900,
    purchaseUrl: 'https://velocefootwear.pk/products/oxford-brogues',
    packageId: 'starter',
    durationDays: 7,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-3',
    companyName: 'Veloce Footwear',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 19, websiteVisits: 67, views: 540 },
    createdAt: '2026-10-14T08:30:00Z',
    featured: false
  },
  // 4. Slippers
  {
    id: 'prod-slipper-1',
    name: 'Handcrafted Royal Velvet Peshawari Slippers',
    nameUrdu: 'شاہی مخملی پشاوری سلیپرز و چپل',
    brandName: 'Zafar Artisan Footwear',
    brandNameUrdu: 'ظفر آرٹیسن فٹ ویئر',
    description: 'Deep obsidian micro-velvet exterior embellished with pure gold zari tilla embroidery and cushioned tyre-sole foundation for unmatched elegance and comfort.',
    descriptionUrdu: 'خالص مخمل اور سنہری تلا زری کڑھائی سے سجی روایتی پشاوری چپل۔ آرام دہ سول اور دیدہ زیب ڈیزائن۔',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'slippers',
    originalPricePkr: 8500,
    promotionalPricePkr: 6999,
    purchaseUrl: 'https://wa.me/923223552103?text=Hi%20Adeel,%20I%20want%20to%20order%20the%20Royal%20Velvet%20Slippers',
    packageId: 'premium',
    durationDays: 30,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-4',
    companyName: 'Zafar Artisan Footwear',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 42, websiteVisits: 145, views: 980 },
    createdAt: '2026-10-10T09:00:00Z',
    featured: true
  },
  // 5. Clothing
  {
    id: 'prod-clothing-1',
    name: 'Emperor Jet Black Festive Kurta & Waistcoat',
    nameUrdu: 'شہنشاہ جیٹ بلیک کُرتا اور واسکٹ سیٹ',
    brandName: 'Nawabi Heritage Couture',
    brandNameUrdu: 'نوابی ہیریٹیج کوٹور',
    description: 'Raw raw-silk blend kurta paired with a tailored jacquard waistcoat adorned with muted gold metallic buttons. Tailored fit for luxury festivities.',
    descriptionUrdu: 'خالص را سلک کُرتا اور کسٹم جیکوارڈ واسکٹ سیٹ جس پر اینٹیک گولڈ بٹن لگے ہیں۔ شادی بیاہ اور تہواروں کے لیے پرفیکٹ انتخاب۔',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'clothing',
    originalPricePkr: 28000,
    promotionalPricePkr: 22500,
    purchaseUrl: 'https://nawabiheritage.com/products/kurta-waistcoat-set',
    packageId: 'featured',
    durationDays: 14,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-5',
    companyName: 'Nawabi Heritage Couture',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 25, websiteVisits: 89, views: 710 },
    createdAt: '2026-10-14T11:00:00Z',
    featured: true
  },
  // 6. Electronics
  {
    id: 'prod-electronics-1',
    name: 'Aura Pro Hybrid ANC Wireless Headphones',
    nameUrdu: 'اورا پرو وائرلیس ایکٹو نوائز کینسلنگ ہیڈ فونز',
    brandName: 'Apex Sonic Audio',
    brandNameUrdu: 'ایپیکس سونک آڈیو',
    description: 'Studio-grade 40mm titanium drivers, 42dB active noise cancellation, transparency mode, and 60-hour ultra battery life with ultra-fast Type-C charging.',
    descriptionUrdu: 'اسٹوڈیو گریڈ ساؤنڈ کوالٹی، ہائبرڈ نوائز کینسلیشن، 60 گھنٹے بیٹری ٹائمنگ اور پریمیم ایئر کشن ڈیزائن۔',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'electronics',
    originalPricePkr: 32000,
    promotionalPricePkr: 26900,
    purchaseUrl: 'https://apexsonic.pk/products/aura-pro-anc',
    packageId: 'premium',
    durationDays: 30,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-6',
    companyName: 'Apex Sonic Audio',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 38, websiteVisits: 130, views: 920 },
    createdAt: '2026-10-15T09:30:00Z',
    featured: true
  },
  // 7. Cosmetics
  {
    id: 'prod-cosmetics-1',
    name: '24K Gold Radiant Peptide Elixir Serum',
    nameUrdu: '24 قیراط گولڈ ریڈینٹ پیپٹائڈ سیرم',
    brandName: 'Lumière Glow Labs',
    brandNameUrdu: 'لیومیئر گلو لیبز',
    description: 'Infused with genuine 24-karat gold flakes, multi-molecular hyaluronic acid, and botanical peptides for luminous glow and anti-aging cell renewal.',
    descriptionUrdu: 'اصلی 24 قیراط سونے کے باریک ذرات، ہائیلورونک ایسڈ اور قدرتی نباتاتی پیپٹائڈز سے تیار کردہ جلد کو چمکدار اور تروتازہ بنانے والا سیرم۔',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-00958f334b07?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'cosmetics',
    originalPricePkr: 9500,
    promotionalPricePkr: 7800,
    purchaseUrl: 'https://lumiereglow.pk/products/24k-gold-serum',
    packageId: 'featured',
    durationDays: 14,
    status: 'approved',
    paymentStatus: 'paid',
    companyId: 'comp-7',
    companyName: 'Lumière Glow Labs',
    companyWhatsApp: '+92 322 3552103',
    clicks: { whatsappInquiries: 31, websiteVisits: 105, views: 820 },
    createdAt: '2026-10-15T15:00:00Z',
    featured: true,
    videoAdUrl: 'https://www.instagram.com/reel/DeljqNEMIfu/'
  }
];

// Helper Functions for Data Store
function loadStore(): MarketplaceStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.products && parsed.companies && parsed.packages) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('[Store] Failed to load store, seeding initial defaults:', err);
  }

  const initial: MarketplaceStore = {
    products: INITIAL_PRODUCTS,
    companies: INITIAL_COMPANIES,
    packages: INITIAL_PACKAGES
  };
  saveStore(initial);
  return initial;
}

function saveStore(store: MarketplaceStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Store] Failed to persist data to file:', err);
  }
}

// In-Memory active instance synced with file
let store = loadStore();

// Admin Authentication Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token !== currentAdminToken) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired admin credentials' });
  }

  next();
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// 1. Health & Studio Info
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    company: 'Adeel AI Ads',
    creator: 'Adeel Zafar',
    marketplace: 'Live',
    productsCount: store.products.filter(p => p.status === 'approved').length,
    whatsapp: '+92 322 3552103'
  });
});

// 2. Public Marketplace Products (Approved only)
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, sort } = req.query;
  let items = store.products.filter(p => p.status === 'approved');

  if (category && category !== 'all') {
    items = items.filter(p => p.category === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.nameUrdu && p.nameUrdu.includes(q))
    );
  }

  // Sorting
  if (sort === 'price_asc') {
    items.sort((a, b) => (a.promotionalPricePkr || a.originalPricePkr) - (b.promotionalPricePkr || b.originalPricePkr));
  } else if (sort === 'price_desc') {
    items.sort((a, b) => (b.promotionalPricePkr || b.originalPricePkr) - (a.promotionalPricePkr || a.originalPricePkr));
  } else if (sort === 'newest') {
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    // Featured first by default
    items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  res.json({
    products: items,
    total: items.length
  });
});

// 3. Public Promotion Packages
app.get('/api/packages', (req: Request, res: Response) => {
  res.json({ packages: store.packages });
});

// 4. Company Registration
app.post('/api/companies/register', (req: Request, res: Response) => {
  const { brandName, contactPerson, businessEmail, phoneWhatsApp, websiteSocialLink, category } = req.body;

  if (!brandName || !contactPerson || !businessEmail || !phoneWhatsApp) {
    return res.status(400).json({ error: 'Please provide all required fields (brandName, contactPerson, businessEmail, phoneWhatsApp)' });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(businessEmail)) {
    return res.status(400).json({ error: 'Please provide a valid business email address' });
  }

  const newCompany: Company = {
    id: 'comp-' + Date.now(),
    brandName: brandName.trim(),
    contactPerson: contactPerson.trim(),
    businessEmail: businessEmail.trim(),
    phoneWhatsApp: phoneWhatsApp.trim(),
    websiteSocialLink: (websiteSocialLink || '').trim(),
    category: category || 'general',
    registeredAt: new Date().toISOString(),
    status: 'active'
  };

  store.companies.push(newCompany);
  saveStore(store);

  res.status(201).json({
    success: true,
    message: 'Company registered successfully. You can now submit products for promotion.',
    company: newCompany
  });
});

// 5. Product Submission (Company or Brand Submission)
app.post('/api/products/submit', (req: Request, res: Response) => {
  const {
    name,
    nameUrdu,
    brandName,
    brandNameUrdu,
    description,
    descriptionUrdu,
    images,
    category,
    originalPricePkr,
    promotionalPricePkr,
    purchaseUrl,
    packageId,
    durationDays,
    companyWhatsApp,
    companyEmail
  } = req.body;

  if (!name || !brandName || !description || !category || !originalPricePkr || !purchaseUrl || !packageId) {
    return res.status(400).json({ error: 'Missing required product information. Please fill out all required fields.' });
  }

  const parsedOriginalPrice = Number(originalPricePkr);
  const parsedPromoPrice = promotionalPricePkr ? Number(promotionalPricePkr) : undefined;

  if (isNaN(parsedOriginalPrice) || parsedOriginalPrice <= 0) {
    return res.status(400).json({ error: 'Original price in PKR must be a valid positive number.' });
  }

  // Check valid package
  const pkg = store.packages.find(p => p.id === packageId);
  const validDuration = durationDays ? Number(durationDays) : (pkg ? pkg.durationDays : 14);

  // Validate or fallback image
  let imageList: string[] = Array.isArray(images) && images.length > 0 ? images.filter(Boolean) : [];
  if (imageList.length === 0) {
    imageList = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'];
  }

  const newProduct: MarketplaceProduct = {
    id: 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    name: name.trim(),
    nameUrdu: (nameUrdu || name).trim(),
    brandName: brandName.trim(),
    brandNameUrdu: (brandNameUrdu || brandName).trim(),
    description: description.trim(),
    descriptionUrdu: (descriptionUrdu || description).trim(),
    images: imageList,
    category: category,
    originalPricePkr: parsedOriginalPrice,
    promotionalPricePkr: parsedPromoPrice,
    purchaseUrl: purchaseUrl.trim(),
    packageId: packageId,
    durationDays: validDuration,
    status: 'pending', // Pending review by admin Adeel Zafar
    paymentStatus: 'unpaid',
    companyName: brandName.trim(),
    companyWhatsApp: companyWhatsApp || '+92 322 3552103',
    clicks: {
      whatsappInquiries: 0,
      websiteVisits: 0,
      views: 0
    },
    createdAt: new Date().toISOString(),
    featured: packageId === 'featured' || packageId === 'premium'
  };

  store.products.unshift(newProduct);
  saveStore(store);

  res.status(201).json({
    success: true,
    message: 'Product submission received! It is now pending review by Adeel Zafar. Once approved, it will be published to the marketplace.',
    product: newProduct
  });
});

// 6. Track Product Click / WhatsApp inquiry / View
app.post('/api/analytics/track-click', (req: Request, res: Response) => {
  const { productId, type } = req.body;
  const product = store.products.find(p => p.id === productId);

  if (product) {
    if (type === 'whatsapp') {
      product.clicks.whatsappInquiries = (product.clicks.whatsappInquiries || 0) + 1;
    } else if (type === 'website') {
      product.clicks.websiteVisits = (product.clicks.websiteVisits || 0) + 1;
    } else if (type === 'view') {
      product.clicks.views = (product.clicks.views || 0) + 1;
    }
    saveStore(store);
  }

  res.json({ success: true });
});

// ==========================================
// SECURE ADMIN API (ENFORCED ON SERVER)
// ==========================================

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password. Access denied.' });
  }

  // Generate a fresh session token
  currentAdminToken = 'adeel-auth-' + crypto.randomBytes(16).toString('hex');
  res.json({
    success: true,
    token: currentAdminToken,
    owner: 'Adeel Zafar',
    role: 'Administrator'
  });
});

// Admin Overview Metrics
app.get('/api/admin/overview', requireAdminAuth, (req: Request, res: Response) => {
  const pendingCount = store.products.filter(p => p.status === 'pending').length;
  const approvedCount = store.products.filter(p => p.status === 'approved').length;
  const rejectedCount = store.products.filter(p => p.status === 'rejected').length;
  const totalCompanies = store.companies.length;

  let totalInquiries = 0;
  let totalWebsiteClicks = 0;
  let totalViews = 0;

  store.products.forEach(p => {
    totalInquiries += p.clicks?.whatsappInquiries || 0;
    totalWebsiteClicks += p.clicks?.websiteVisits || 0;
    totalViews += p.clicks?.views || 0;
  });

  // Calculate estimated promotion revenue in PKR based on package prices
  const totalRevenuePkr = store.products
    .filter(p => p.paymentStatus === 'paid' || p.paymentStatus === 'completed')
    .reduce((sum, p) => {
      const pkg = store.packages.find(pk => pk.id === p.packageId);
      return sum + (pkg ? pkg.pricePkr : 0);
    }, 0);

  res.json({
    metrics: {
      pendingProducts: pendingCount,
      approvedProducts: approvedCount,
      rejectedProducts: rejectedCount,
      totalCompanies: totalCompanies,
      totalInquiries: totalInquiries,
      totalWebsiteClicks: totalWebsiteClicks,
      totalViews: totalViews,
      totalRevenuePkr: totalRevenuePkr
    }
  });
});

// Admin: Get all products (pending, approved, rejected)
app.get('/api/admin/products', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ products: store.products });
});

// Admin: Approve a product
app.post('/api/admin/products/:id/approve', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const product = store.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.status = 'approved';
  product.rejectionReason = undefined;
  saveStore(store);

  res.json({ success: true, message: `Product "${product.name}" approved and published to marketplace!`, product });
});

// Admin: Reject a product
app.post('/api/admin/products/:id/reject', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  const product = store.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.status = 'rejected';
  product.rejectionReason = reason || 'Product submission does not meet current quality guidelines.';
  saveStore(store);

  res.json({ success: true, message: `Product "${product.name}" marked as rejected.`, product });
});

// Admin: Update a product listing
app.put('/api/admin/products/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = store.products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const current = store.products[index];
  const updated: MarketplaceProduct = {
    ...current,
    ...req.body,
    id: current.id, // prevent changing ID
    createdAt: current.createdAt
  };

  store.products[index] = updated;
  saveStore(store);

  res.json({ success: true, message: 'Product updated successfully', product: updated });
});

// Admin: Delete a product
app.delete('/api/admin/products/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = store.products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const removed = store.products.splice(index, 1)[0];
  saveStore(store);

  res.json({ success: true, message: `Listing "${removed.name}" deleted permanently.` });
});

// Admin: Get companies
app.get('/api/admin/companies', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ companies: store.companies });
});

// Admin: Get & update packages
app.get('/api/admin/packages', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ packages: store.packages });
});

app.put('/api/admin/packages/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = store.packages.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Package not found' });
  }

  const updated: PromotionPackage = {
    ...store.packages[index],
    ...req.body,
    id: store.packages[index].id
  };

  store.packages[index] = updated;
  saveStore(store);

  res.json({ success: true, message: 'Package updated successfully', package: updated });
});

// Admin: Record payment & promotion status
app.post('/api/admin/payments/record', requireAdminAuth, (req: Request, res: Response) => {
  const { productId, paymentStatus } = req.body;
  const product = store.products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!['unpaid', 'paid', 'in_progress', 'completed'].includes(paymentStatus)) {
    return res.status(400).json({ error: 'Invalid payment status' });
  }

  product.paymentStatus = paymentStatus;
  saveStore(store);

  res.json({ success: true, message: `Payment status updated to ${paymentStatus}`, product });
});

// ==========================================
// VITE OR STATIC SERVING
// ==========================================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Adeel AI Ads] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
