import React from 'react';
import {
  Sparkles,
  ShoppingBag,
  PlusCircle,
  TrendingUp,
  Watch,
  Flame,
  Layers,
  Footprints,
  Shirt,
  Headphones,
  Sparkle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';
import { ProductCategory } from '../types.ts';

interface HeroProps {
  lang: Language;
  onExploreProducts: () => void;
  onListYourProduct: () => void;
  onPromoteYourBrand: () => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreProducts,
  onListYourProduct,
  onPromoteYourBrand,
  onSelectCategory,
}) => {
  const t = translations[lang];

  // 7 requested categories with luxury images and badges
  const categoryHighlights: Array<{
    id: ProductCategory;
    name: string;
    image: string;
    icon: React.ReactNode;
    subtitle: string;
    tag: string;
  }> = [
    {
      id: 'watches',
      name: t.categories.watches,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
      icon: <Watch className="w-4 h-4 text-amber-400" />,
      subtitle: 'Luxury Timepieces',
      tag: 'Featured Ad'
    },
    {
      id: 'perfumes',
      name: t.categories.perfumes,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      subtitle: 'Royal Ouds & Parfums',
      tag: 'High Sillage'
    },
    {
      id: 'shoes',
      name: t.categories.shoes,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop',
      icon: <Layers className="w-4 h-4 text-amber-400" />,
      subtitle: 'Hand-Burnished Brogues',
      tag: 'Full Grain Leather'
    },
    {
      id: 'slippers',
      name: t.categories.slippers,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
      icon: <Footprints className="w-4 h-4 text-amber-400" />,
      subtitle: 'Velvet Peshawari Slippers',
      tag: 'Handcrafted Zari'
    },
    {
      id: 'clothing',
      name: t.categories.clothing,
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop',
      icon: <Shirt className="w-4 h-4 text-amber-400" />,
      subtitle: 'Festive Raw Silk Sets',
      tag: 'Nawabi Heritage'
    },
    {
      id: 'electronics',
      name: t.categories.electronics,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
      icon: <Headphones className="w-4 h-4 text-amber-400" />,
      subtitle: 'ANC Audio & Gadgets',
      tag: 'Studio Grade'
    },
    {
      id: 'cosmetics',
      name: t.categories.cosmetics,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      icon: <Sparkle className="w-4 h-4 text-amber-400" />,
      subtitle: '24K Gold Peptides',
      tag: 'Glow Elixir'
    },
  ];

  return (
    <section id="home" className="scroll-mt-24 relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background glowing gold & obsidian gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-amber-600/15 via-yellow-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-500/15 border border-amber-500/30 backdrop-blur-md mb-8 shadow-inner shadow-amber-500/10">
          <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-amber-200">
            {t.hero.badge}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
          <span className="block text-slate-100">
            {t.hero.heading}
          </span>
          <span className="block mt-2 brand-gradient-gold">
            {lang === 'en' ? 'Creative Advertising & Verified Marketplace' : 'تخلیقی اشتہارات اور تصدیق شدہ مارکیٹ پلیس'}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* The Three Exact Requested Hero Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Button 1: Explore Products */}
          <button
            onClick={onExploreProducts}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-white text-slate-950 hover:bg-slate-100 hover:shadow-2xl hover:shadow-white/20 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-slate-950" />
            <span>{t.hero.exploreProducts}</span>
          </button>

          {/* Button 2: List Your Product */}
          <button
            onClick={onListYourProduct}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/25 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-slate-950" />
            <span>{t.hero.listYourProduct}</span>
          </button>

          {/* Button 3: Promote Your Brand */}
          <button
            onClick={onPromoteYourBrand}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border border-amber-500/50 hover:border-amber-400 active:scale-95 transition-all shadow-lg shadow-black/40 cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span>{t.hero.promoteYourBrand}</span>
          </button>
        </div>

        {/* Value Prop Metrics */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left border-l-2 border-l-amber-400">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {t.hero.quickStats.highRetention}
            </div>
            <div className="text-xs text-amber-300/80 mt-1 font-medium">
              {t.hero.quickStats.highRetentionSub}
            </div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left border-l-2 border-l-yellow-500">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {t.hero.quickStats.cinematic}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.hero.quickStats.cinematicSub}
            </div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left border-l-2 border-l-emerald-400">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {t.hero.quickStats.activeCategories}
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              {t.hero.quickStats.activeCategoriesSub}
            </div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left border-l-2 border-l-amber-600">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {t.hero.quickStats.directLeads}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.hero.quickStats.directLeadsSub}
            </div>
          </div>
        </div>

        {/* Large Product Cards Section for watches, perfumes, shoes, slippers, clothing, electronics, cosmetics */}
        <div className="mt-20 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Active Market Categories' : 'مقبول مارکیٹ کیٹیگریز'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {lang === 'en' ? 'Featured Product Categories' : 'نمایاں پروڈکٹ کیٹیگریز'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              {lang === 'en'
                ? 'Tap any category card below to filter the marketplace or list your brand in that sector.'
                : 'مارکیٹ پلیس کو فلٹر کرنے یا اپنی پروڈکٹ درج کرنے کے لیے کسی بھی کیٹیگری پر کلک کریں۔'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categoryHighlights.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onExploreProducts();
                }}
                className="group relative rounded-2xl overflow-hidden border border-amber-500/20 bg-[#0d0f17] hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-black/30" />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/30 font-semibold">
                    {cat.tag}
                  </span>
                </div>

                {/* Card Meta */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        {cat.icon}
                      </div>
                      <span className="text-xs font-mono text-amber-400 font-medium">
                        {cat.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-200 transition-colors">
                    <span>{lang === 'en' ? 'View Live Listings' : 'لسٹنگز دیکھیں'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
