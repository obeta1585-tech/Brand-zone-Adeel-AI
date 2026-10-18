import React, { useState } from 'react';
import {
  X,
  Phone,
  ExternalLink,
  ShieldCheck,
  Tag,
  Sparkles,
  ShoppingBag,
  Eye,
  Video,
  CheckCircle2
} from 'lucide-react';
import { MarketplaceProduct } from '../types.ts';
import { Language, translations } from '../i18n/translations.ts';

interface ProductDetailModalProps {
  product: MarketplaceProduct | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOrderWhatsApp: (product: MarketplaceProduct) => void;
  onVisitWebsite: (product: MarketplaceProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  lang,
  onOrderWhatsApp,
  onVisitWebsite,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const t = translations[lang];
  const titleText = lang === 'ur' && product.nameUrdu ? product.nameUrdu : product.name;
  const brandText = lang === 'ur' && product.brandNameUrdu ? product.brandNameUrdu : product.brandName;
  const descText = lang === 'ur' && product.descriptionUrdu ? product.descriptionUrdu : product.description;

  const hasDiscount = product.promotionalPricePkr && product.promotionalPricePkr < product.originalPricePkr;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPricePkr - product.promotionalPricePkr!) / product.originalPricePkr) * 100)
    : 0;

  const formatPkr = (num: number) => new Intl.NumberFormat('en-PK').format(num);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#0c0e17] border border-amber-500/30 shadow-2xl shadow-black/80 overflow-hidden text-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090b12]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/30">
              {product.category}
            </span>
            <span className="text-xs text-slate-400">
              {product.brandName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Images */}
          <div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
              <img
                src={images[selectedImageIndex] || images[0]}
                alt={titleText}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {hasDiscount && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold shadow-lg">
                  {discountPercent}% {t.gallery.off}
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-amber-400 scale-95 shadow-md shadow-amber-500/20' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* AI Video Ad Banner if present */}
            {product.videoAdUrl && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-200">
                    {lang === 'en' ? 'AI Commercial Ad Available' : 'اے آئی کمرشل ویڈیو اشتہار دستیاب ہے'}
                  </span>
                </div>
                <a
                  href={product.videoAdUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
                >
                  {t.gallery.watchAd}
                </a>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono font-bold text-amber-400">
                  {brandText}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Listing</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                {titleText}
              </h2>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#121522] border border-amber-500/20 mb-6">
                <div className="text-xs text-slate-400 mb-1">
                  {lang === 'en' ? 'Promotional Marketplace Price' : 'مارکیٹ پلیس رعایتی قیمت'}
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-300">
                    {t.gallery.pkr} {formatPkr(product.promotionalPricePkr || product.originalPricePkr)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-slate-400 line-through">
                      {t.gallery.pkr} {formatPkr(product.originalPricePkr)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Product Overview' : 'پروڈکٹ کی تفصیل'}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {descText}
                </p>
              </div>

              {/* Specifications / Highlights */}
              <div className="space-y-2 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Direct contact with Adeel Zafar & brand distribution'
                      : 'عدیل ظفر اور برانڈ کے ساتھ براہ راست رابطہ'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Secure ordering through official WhatsApp +92 322 3552103'
                      : 'آفیشل واٹس ایپ کے ذریعے محفوظ آرڈرنگ'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Full verification & campaign performance tracking'
                      : 'مکمل تصدیق اور تشہیری پرفارمنس ٹریکنگ'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onOrderWhatsApp(product);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>{t.gallery.orderWhatsApp}</span>
              </button>

              {product.purchaseUrl && (
                <button
                  onClick={() => {
                    onVisitWebsite(product);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.gallery.visitStore}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
