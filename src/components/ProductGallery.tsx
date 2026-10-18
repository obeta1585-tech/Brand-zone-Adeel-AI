import React, { useState } from 'react';
import {
  Search,
  Filter,
  Phone,
  ExternalLink,
  Eye,
  Sparkles,
  Watch,
  Flame,
  Layers,
  Footprints,
  Shirt,
  Headphones,
  Sparkle,
  ShoppingBag,
  TrendingUp,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';
import { MarketplaceProduct, ProductCategory } from '../types.ts';

interface ProductGalleryProps {
  products: MarketplaceProduct[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  lang: Language;
  onViewProduct: (product: MarketplaceProduct) => void;
  onOrderWhatsApp: (product: MarketplaceProduct) => void;
  onVisitWebsite: (product: MarketplaceProduct) => void;
  onOpenSubmitModal: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  lang,
  onViewProduct,
  onOrderWhatsApp,
  onVisitWebsite,
  onOpenSubmitModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest'>('featured');
  const t = translations[lang];

  // Category tab definitions with icons
  const categories: Array<{ id: ProductCategory; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: t.categories.all, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'watches', label: t.categories.watches, icon: <Watch className="w-3.5 h-3.5" /> },
    { id: 'perfumes', label: t.categories.perfumes, icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'shoes', label: t.categories.shoes, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'slippers', label: t.categories.slippers, icon: <Footprints className="w-3.5 h-3.5" /> },
    { id: 'clothing', label: t.categories.clothing, icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'electronics', label: t.categories.electronics, icon: <Headphones className="w-3.5 h-3.5" /> },
    { id: 'cosmetics', label: t.categories.cosmetics, icon: <Sparkle className="w-3.5 h-3.5" /> },
  ];

  // Filter products by category and search query
  let filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q) || (p.nameUrdu && p.nameUrdu.includes(q));
      const matchBrand = p.brandName.toLowerCase().includes(q) || (p.brandNameUrdu && p.brandNameUrdu.includes(q));
      const matchDesc = p.description.toLowerCase().includes(q) || (p.descriptionUrdu && p.descriptionUrdu.includes(q));
      return matchName || matchBrand || matchDesc;
    }
    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    const priceA = a.promotionalPricePkr || a.originalPricePkr;
    const priceB = b.promotionalPricePkr || b.originalPricePkr;

    if (sortBy === 'price_asc') return priceA - priceB;
    if (sortBy === 'price_desc') return priceB - priceA;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // Default: featured first
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const formatPkr = (num: number) => {
    return new Intl.NumberFormat('en-PK').format(num);
  };

  return (
    <section id="products" className="scroll-mt-24 py-16 sm:py-24 relative bg-[#06070b]">
      {/* Subtle gold divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Verified Marketplace Showcase' : 'تصدیق شدہ مارکیٹ پلیس'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
              {t.gallery.heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              {t.gallery.subheading}
            </p>
          </div>

          {/* Quick List CTA */}
          <button
            onClick={onOpenSubmitModal}
            className="self-start md:self-auto shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 transition-all"
          >
            <Tag className="w-4 h-4 text-amber-400" />
            <span>{t.hero.listYourProduct}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0c0e17] border border-amber-500/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl shadow-black/40">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.gallery.searchPlaceholder}
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400/60 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-amber-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#131623] border border-white/10 text-xs sm:text-sm text-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-amber-400/60 cursor-pointer"
              >
                <option value="featured">{t.gallery.sortFeatured}</option>
                <option value="price_asc">{t.gallery.sortPriceLow}</option>
                <option value="price_desc">{t.gallery.sortPriceHigh}</option>
                <option value="newest">{t.gallery.sortNewest}</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#131623] text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#0c0e17] rounded-2xl border border-white/10 p-8">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.gallery.noProductsFound}</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const hasDiscount = product.promotionalPricePkr && product.promotionalPricePkr < product.originalPricePkr;
              const discountPercent = hasDiscount
                ? Math.round(((product.originalPricePkr - product.promotionalPricePkr!) / product.originalPricePkr) * 100)
                : 0;

              const titleText = lang === 'ur' && product.nameUrdu ? product.nameUrdu : product.name;
              const brandText = lang === 'ur' && product.brandNameUrdu ? product.brandNameUrdu : product.brandName;
              const descText = lang === 'ur' && product.descriptionUrdu ? product.descriptionUrdu : product.description;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl overflow-hidden border border-amber-500/20 bg-[#0d0f17] hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
                >
                  {/* Top Image Box */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'}
                      alt={titleText}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-black/40" />

                    {/* Category & Package Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/30 uppercase font-semibold">
                        {product.category}
                      </span>
                      {product.featured && (
                        <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-slate-950 text-[10px] font-bold shadow-sm">
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Discount Pill */}
                    {hasDiscount && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-extrabold shadow-md">
                        {discountPercent}% {t.gallery.off}
                      </div>
                    )}

                    {/* Quick View Button overlay */}
                    <button
                      onClick={() => onViewProduct(product)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.gallery.viewDetails}</span>
                      </span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand Label */}
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono font-medium mb-1">
                        <span>{brandText}</span>
                        <span className="text-[10px] text-slate-400">
                          {product.clicks?.views || 1} {t.gallery.visits}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => onViewProduct(product)}
                        className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                        title={titleText}
                      >
                        {titleText}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {descText}
                      </p>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-4 pt-3.5 border-t border-white/10">
                      {/* Price Section */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg sm:text-xl font-display font-extrabold text-amber-300">
                          {t.gallery.pkr} {formatPkr(product.promotionalPricePkr || product.originalPricePkr)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-slate-400 line-through">
                            {t.gallery.pkr} {formatPkr(product.originalPricePkr)}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* WhatsApp Order Button */}
                        <button
                          onClick={() => onOrderWhatsApp(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all active:scale-95 shadow-sm cursor-pointer"
                          title="Order or inquire on WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.gallery.orderWhatsApp}</span>
                        </button>

                        {/* Store URL Button */}
                        {product.purchaseUrl && (
                          <button
                            onClick={() => onVisitWebsite(product)}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                            title={t.gallery.visitStore}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
