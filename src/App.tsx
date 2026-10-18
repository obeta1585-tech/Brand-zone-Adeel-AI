import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductGallery } from './components/ProductGallery.tsx';
import { PromotionPackagesSection } from './components/PromotionPackagesSection.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CompanyRegistrationModal } from './components/CompanyRegistrationModal.tsx';
import { ProductSubmissionModal } from './components/ProductSubmissionModal.tsx';
import { AdminDashboardModal } from './components/AdminDashboardModal.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SocialMediaSection } from './components/SocialMediaSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { QuoteModal } from './components/QuoteModal.tsx';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal.tsx';
import { Phone, ShoppingBag, Video, Lock, Sparkles, Globe } from 'lucide-react';
import { Language, translations } from './i18n/translations.ts';
import { MarketplaceProduct, ProductCategory, PromotionPackage } from './types.ts';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');

  // Marketplace state
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [packages, setPackages] = useState<PromotionPackage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [activeProduct, setActiveProduct] = useState<MarketplaceProduct | null>(null);

  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [quoteInitialTitle, setQuoteInitialTitle] = useState<string>('');

  const t = translations[lang];

  // Fetch products and packages on mount
  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    try {
      const [resProd, resPack] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/packages'),
      ]);
      const dataProd = await resProd.json();
      const dataPack = await resPack.json();

      if (dataProd.products) setProducts(dataProd.products);
      if (dataPack.packages) setPackages(dataPack.packages);
    } catch (err) {
      console.error('Failed to load marketplace products/packages:', err);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // WhatsApp Order Handler with click tracking
  const handleOrderWhatsApp = async (product: MarketplaceProduct) => {
    try {
      fetch('/api/analytics/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, type: 'whatsapp' }),
      });
    } catch (e) {
      // ignore
    }

    const priceText = product.promotionalPricePkr || product.originalPricePkr;
    const msg = encodeURIComponent(
      `Hello Adeel Zafar,\n\nI am interested in ordering / inquiring about:\nProduct: ${product.name}\nBrand: ${product.brandName}\nPrice: PKR ${priceText.toLocaleString()}\nMarketplace: Adeel AI Ads`
    );
    window.open(`https://wa.me/923223552103?text=${msg}`, '_blank');
  };

  // Store Visit Handler with click tracking
  const handleVisitWebsite = async (product: MarketplaceProduct) => {
    try {
      fetch('/api/analytics/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, type: 'website' }),
      });
    } catch (e) {
      // ignore
    }
    if (product.purchaseUrl) {
      window.open(product.purchaseUrl, '_blank');
    }
  };

  const handleViewProduct = (product: MarketplaceProduct) => {
    setActiveProduct(product);
    setIsDetailModalOpen(true);
    try {
      fetch('/api/analytics/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, type: 'view' }),
      });
    } catch (e) {
      // ignore
    }
  };

  const handleOpenQuote = (title?: string) => {
    setQuoteInitialTitle(title || '');
    setIsQuoteModalOpen(true);
  };

  return (
    <div
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      lang={lang}
      className="min-h-screen bg-[#07080d] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans transition-all duration-200"
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenSubmitProduct={() => setIsSubmitModalOpen(true)}
        onOpenRegisterCompany={() => setIsRegisterModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminModalOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Banner with 3 Buttons and large product cards for watches, perfumes, shoes, slippers, clothing, electronics, cosmetics */}
        <Hero
          lang={lang}
          onExploreProducts={() => scrollToSection('products')}
          onListYourProduct={() => setIsSubmitModalOpen(true)}
          onPromoteYourBrand={() => scrollToSection('packages')}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 2. Product Marketplace Gallery */}
        <ProductGallery
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          lang={lang}
          onViewProduct={handleViewProduct}
          onOrderWhatsApp={handleOrderWhatsApp}
          onVisitWebsite={handleVisitWebsite}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        />

        {/* 3. Promotion Packages (Starter, Featured, Premium in PKR) */}
        <PromotionPackagesSection
          packages={packages}
          lang={lang}
          onSelectPackage={(pkg) => {
            setIsSubmitModalOpen(true);
          }}
        />

        {/* 4. Adeel Zafar Video Ads Portfolio (Kept intact with real video card & social links) */}
        <PortfolioSection onGetQuote={(title) => handleOpenQuote(title)} />

        {/* 5. About Adeel Zafar */}
        <AboutSection onGetQuote={() => handleOpenQuote()} />

        {/* 6. Social Media (Instagram & TikTok) */}
        <SocialMediaSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Floating Action Button: Direct WhatsApp Chat */}
      <div className={`fixed bottom-6 ${lang === 'ur' ? 'left-6' : 'right-6'} z-40`}>
        <a
          href="https://wa.me/923223552103"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-950/80 transition-all active:scale-95 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center">
            <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
          </div>
          <span>{lang === 'ur' ? 'واٹس ایپ پر رابطہ کریں' : 'Chat on WhatsApp'}</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        </a>
      </div>

      {/* MODALS */}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        lang={lang}
        onOrderWhatsApp={handleOrderWhatsApp}
        onVisitWebsite={handleVisitWebsite}
      />

      {/* Company Registration Modal */}
      <CompanyRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        lang={lang}
        onSuccess={() => {
          setIsSubmitModalOpen(true);
        }}
      />

      {/* Product Submission Modal */}
      <ProductSubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        lang={lang}
        packages={packages}
        onSubmissionSuccess={() => {
          fetchMarketplaceData();
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
        onMarketplaceUpdated={() => {
          fetchMarketplaceData();
        }}
      />

      {/* Project Free Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProductTitle={quoteInitialTitle}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Footer with ample bottom padding to clear floating WhatsApp button */}
      <footer className="border-t border-amber-500/20 bg-[#06070a] pt-12 pb-32 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0d0f18] rounded-[10px] flex items-center justify-center text-amber-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm">
                {t.brandName}
              </span>
              <p className="text-[11px] text-amber-400/80">
                Product Promotion Marketplace by <strong className="text-white">{t.signature}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.packages}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>{t.nav.admin}</span>
            </button>
            <a
              href="https://www.instagram.com/reel/DekGMPVIWhb/?dlrf=ZXBqMTh4eWNlcXdq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://vt.tiktok.com/ZSgF59DWo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              TikTok
            </a>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-slate-400 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
            >
              {t.footer.privacyPolicy}
            </button>
          </div>

          <div className="text-center md:text-right rtl:md:text-left">
            <p className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {t.brandName} • Created by{' '}
              <strong className="text-white">{t.signature}</strong>
            </p>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              WhatsApp: +92 322 3552103 • Verified Marketplace & Promotions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
