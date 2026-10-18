import React, { useState, useEffect } from 'react';
import { X, Sparkles, Phone } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductTitle?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProductTitle = '',
}) => {
  const [productName, setProductName] = useState(initialProductTitle);
  const [platform, setPlatform] = useState('Instagram Reels & TikTok (9:16)');
  const [duration, setDuration] = useState('15 seconds');
  const [packageType, setPackageType] = useState('Starter Video Ad (1 Concept)');
  const [details, setDetails] = useState('');

  // Sync when initialProductTitle changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialProductTitle) {
        setProductName(initialProductTitle);
        setDetails(`I am interested in an ad similar to "${initialProductTitle}" from your portfolio.`);
      } else {
        setProductName('');
        setDetails('');
      }
    }
  }, [isOpen, initialProductTitle]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanProduct = productName.trim().slice(0, 100);
    const cleanDetails = details.trim().slice(0, 1000);

    const briefText = `Hi Adeel! I would like to get a quote for an AI product video ad:

- Product/Style: ${cleanProduct || 'Featured Product'}
- Platform: ${platform}
- Duration: ${duration}
- Package Interest: ${packageType}
- Project Details: ${cleanDetails || 'Interested in a starter video ad.'}

Looking forward to your reply!`;

    const whatsappUrl = `https://wa.me/923223552103?text=${encodeURIComponent(briefText)}`;
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0e101a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">
                Get a Free Quote
              </h3>
              <p className="text-xs text-slate-400">
                Direct to Adeel Zafar on WhatsApp (+92 322 3552103)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {initialProductTitle && (
          <div className="mb-4 p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Selected Style: <strong>{initialProductTitle}</strong></span>
          </div>
        )}

        <form onSubmit={handleSendToWhatsApp} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Product or Brand Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Minimalist Watch, Glow Serum, Athletic Shoes..."
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Format
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="Instagram Reels & TikTok (9:16)">Reels / TikTok (9:16)</option>
                <option value="Instagram Reels (9:16)">Instagram Reels (9:16)</option>
                <option value="TikTok Video (9:16)">TikTok Video (9:16)</option>
                <option value="Instagram + TikTok Dual Pack">Instagram + TikTok Dual Pack</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="10 seconds">10 seconds</option>
                <option value="15 seconds">15 seconds</option>
                <option value="20 seconds">20 seconds</option>
                <option value="30 seconds">30 seconds</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Project Tier
            </label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
            >
              <option value="Starter Video Ad (1 Concept)">Starter Video Ad (1 Concept - Open for Starter Projects)</option>
              <option value="3x Viral Hooks Multi-Cut Ad Pack">3x Viral Hooks Multi-Cut Ad Pack</option>
              <option value="Full Campaign Video Pack">Full Multi-Format Campaign Pack</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Short Brief or Photo Link
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              placeholder="Tell me about your product, what makes it stand out, or paste photos link..."
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Send Quote Request on WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
