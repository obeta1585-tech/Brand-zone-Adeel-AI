import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Menu,
  X,
  ShoppingBag,
  Award,
  PlusCircle,
  Video,
  Lock,
  Globe,
  Layers
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenSubmitProduct: () => void;
  onOpenRegisterCompany: () => void;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onToggleLang,
  onOpenSubmitProduct,
  onOpenRegisterCompany,
  onOpenAdminPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'packages', label: t.nav.packages },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#07080d]/95 backdrop-blur-xl shadow-lg shadow-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Signature */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group transition-all shrink-0"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-700 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
            <div className="w-full h-full bg-[#0c0d14] rounded-[10px] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-[#090a0f]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {t.brandName}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                PROMOTIONS
              </span>
            </div>
            <p className="text-[11px] text-amber-400/80 hidden sm:block font-medium">
              by {t.signature}
            </p>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (EN / اردو) */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-amber-300 border border-white/15 transition-all shadow-sm"
            title="Toggle English / اردو"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* List Your Product CTA */}
          <button
            onClick={onOpenSubmitProduct}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>{t.nav.listProduct}</span>
          </button>

          {/* Direct WhatsApp button */}
          <a
            href="https://wa.me/923223552103"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdminPortal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-amber-300 border border-white/10 transition-all flex items-center gap-1.5"
            title="Admin Portal (Adeel Zafar)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">{t.nav.admin}</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/20 bg-[#0a0c13] px-4 pt-3 pb-6 space-y-2.5">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmitProduct();
              }}
              className="w-full py-3 rounded-xl text-center text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>{t.nav.listProduct}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterCompany();
              }}
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15"
            >
              {t.companyModal.title}
            </button>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/923223552103"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp (+92 322 3552103)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPortal();
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-amber-300 border border-white/10 text-xs font-bold flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
