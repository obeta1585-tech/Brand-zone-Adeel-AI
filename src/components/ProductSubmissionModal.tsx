import React, { useState } from 'react';
import {
  X,
  Package,
  Tag,
  DollarSign,
  Link,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  ShieldAlert
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';
import { ProductCategory, PromotionPackage } from '../types.ts';

interface ProductSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  packages: PromotionPackage[];
  onSubmissionSuccess: () => void;
}

export const ProductSubmissionModal: React.FC<ProductSubmissionModalProps> = ({
  isOpen,
  onClose,
  lang,
  packages,
  onSubmissionSuccess,
}) => {
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('watches');
  const [imageUrl, setImageUrl] = useState('');
  const [originalPricePkr, setOriginalPricePkr] = useState('');
  const [promotionalPricePkr, setPromotionalPricePkr] = useState('');
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [packageId, setPackageId] = useState<'starter' | 'featured' | 'premium'>('featured');
  const [durationDays, setDurationDays] = useState('14');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const t = translations[lang];

  // Curated presets for instant preview
  const categoryImagePresets: Record<string, string> = {
    watches: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    perfumes: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
    shoes: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
    slippers: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    clothing: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    cosmetics: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
  };

  const handleApplyPreset = (cat: string) => {
    setImageUrl(categoryImagePresets[cat] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!productName.trim() || !brandName.trim() || !description.trim() || !originalPricePkr || !purchaseUrl.trim()) {
      setErrorMsg(lang === 'en' ? 'Please complete all required fields.' : 'براہ کرم تمام ضروری خانے پر کریں۔');
      return;
    }

    const priceNum = parseFloat(originalPricePkr);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg(lang === 'en' ? 'Original price must be a valid positive PKR amount.' : 'قیمت درست اور مثبت ہونی چاہیے۔');
      return;
    }

    const promoNum = promotionalPricePkr ? parseFloat(promotionalPricePkr) : undefined;
    if (promoNum !== undefined && (isNaN(promoNum) || promoNum <= 0)) {
      setErrorMsg(lang === 'en' ? 'Promotional price must be a valid positive number.' : 'رعایتی قیمت درست ہونی چاہیے۔');
      return;
    }

    const selectedImage = imageUrl.trim() || categoryImagePresets[category] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop';

    setLoading(true);
    try {
      const response = await fetch('/api/products/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          brandName: brandName,
          description: description,
          category: category,
          images: [selectedImage],
          originalPricePkr: priceNum,
          promotionalPricePkr: promoNum,
          purchaseUrl: purchaseUrl,
          packageId: packageId,
          durationDays: parseInt(durationDays, 10),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit product.');
      }

      setSuccessNotice(true);
      setTimeout(() => {
        onSubmissionSuccess();
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-[#0c0e17] border border-amber-500/30 shadow-2xl shadow-black/80 overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#090b12]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {t.productModal.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.productModal.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice on pending review */}
        <div className="px-6 py-2.5 bg-amber-950/40 border-b border-amber-500/20 text-xs text-amber-200/90 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t.productModal.pendingNote}</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-sm text-white">{t.productModal.successNotice}</p>
                <p className="mt-1 text-slate-300">
                  {lang === 'en'
                    ? 'Owner Adeel Zafar will verify your listing and configure your promotional package.'
                    : 'مالک عدیل ظفر آپ کی لسٹنگ کی تصدیق کریں گے اور پروموشن پیکج فعال کریں گے۔'}
                </p>
              </div>
            </div>
          )}

          {/* 1. Product Name & Brand Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.productName} <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Royal Chronograph Gold"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.brandName} <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Aura Horology"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Category & Package */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.category} <span className="text-amber-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as ProductCategory;
                  setCategory(cat);
                  if (!imageUrl) handleApplyPreset(cat);
                }}
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="watches">Watches (گھڑیاں)</option>
                <option value="perfumes">Perfumes (پرفیومز)</option>
                <option value="shoes">Shoes (جوتے)</option>
                <option value="slippers">Slippers (سلیپرز و چپل)</option>
                <option value="clothing">Clothing (لباس و کپڑے)</option>
                <option value="electronics">Electronics (الیکٹرانکس)</option>
                <option value="cosmetics">Cosmetics (کاسمیٹکس)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.package} <span className="text-amber-400">*</span>
              </label>
              <select
                value={packageId}
                onChange={(e) => {
                  const pId = e.target.value as any;
                  setPackageId(pId);
                  const pkg = packages.find((p) => p.id === pId);
                  if (pkg) setDurationDays(String(pkg.durationDays));
                }}
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="starter">Starter Promotion (PKR 15,000 / 7 days)</option>
                <option value="featured">Featured Product (PKR 35,000 / 14 days)</option>
                <option value="premium">Premium Brand Campaign (PKR 75,000 / 30 days)</option>
              </select>
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              {t.productModal.description} <span className="text-amber-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe materials, key features, craftmanship, specifications, and special offers..."
              className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
            />
          </div>

          {/* 4. Pricing in PKR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.originalPrice} <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={originalPricePkr}
                onChange={(e) => setOriginalPricePkr(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.promoPrice}
              </label>
              <input
                type="number"
                min="1"
                value={promotionalPricePkr}
                onChange={(e) => setPromotionalPricePkr(e.target.value)}
                placeholder="e.g. 12500"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 5. Purchase URL & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.purchaseUrl} <span className="text-amber-400">*</span>
              </label>
              <input
                type="url"
                required
                value={purchaseUrl}
                onChange={(e) => setPurchaseUrl(e.target.value)}
                placeholder="https://yourbrand.pk/product/sample"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.productModal.duration}
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="7">7 Days Promotion</option>
                <option value="14">14 Days Promotion (Recommended)</option>
                <option value="30">30 Days Promotion</option>
              </select>
            </div>
          </div>

          {/* 6. Product Image URL with Preset Selector */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Product Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or paste image link"
              className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none mb-2"
            />

            {/* Instant Presets */}
            <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
              <span className="font-semibold text-amber-400">Quick Image Presets:</span>
              <button
                type="button"
                onClick={() => handleApplyPreset('watches')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Watch
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('perfumes')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Perfume
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('shoes')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Shoes
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('slippers')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Slippers
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('clothing')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Clothing
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('electronics')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Electronics
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('cosmetics')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              >
                Cosmetics
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={loading || successNotice}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Submitting to Adeel AI Ads...</span>
                </>
              ) : (
                <span>{t.productModal.submitButton}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
