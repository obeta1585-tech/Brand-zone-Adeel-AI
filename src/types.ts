export type ProductCategory =
  | 'all'
  | 'watches'
  | 'perfumes'
  | 'shoes'
  | 'slippers'
  | 'clothing'
  | 'electronics'
  | 'cosmetics';

export interface MarketplaceProduct {
  id: string;
  name: string;
  nameUrdu?: string;
  brandName: string;
  brandNameUrdu?: string;
  description: string;
  descriptionUrdu?: string;
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

export interface PortfolioItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  videoUrl?: string;
  youtubeId?: string;
  thumbnailUrl: string;
  tagline: string;
  platformBadge: string;
  aspectRatio?: '9:16' | '16:9';
  externalUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  isSample?: boolean;
}

export interface AdminMetrics {
  pendingProducts: number;
  approvedProducts: number;
  rejectedProducts: number;
  totalCompanies: number;
  totalInquiries: number;
  totalWebsiteClicks: number;
  totalViews: number;
  totalRevenuePkr: number;
}
