import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const WHATSAPP_NUMBER = '+92 322 3552103';
  const WHATSAPP_URL = 'https://wa.me/923223552103';

  const [productName, setProductName] = useState('');
  const [platform, setPlatform] = useState('Instagram Reels & TikTok (9:16)');
  const [duration, setDuration] = useState('15 seconds');
  const [briefDetails, setBriefDetails] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  const copyNumber = () => {
    navigator.clipboard.writeText('+92 322 3552103');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const getCustomWhatsAppUrl = () => {
    const cleanProduct = productName.trim().slice(0, 100);
    const cleanDetails = briefDetails.trim().slice(0, 1000);

    if (!cleanProduct && !cleanDetails) {
      return WHATSAPP_URL;
    }
    const message = `Hi Adeel! I saw your portfolio at Brand Zone Adeel AI and I'd like to get a product video ad made.

Product: ${cleanProduct || 'Featured Product'}
Platform: ${platform}
Duration: ${duration}
Brief / Details: ${cleanDetails || 'Please let me know details and next steps.'}

Ready to discuss starter project!`;
    return `https://wa.me/923223552103?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomWhatsAppUrl();
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <Phone className="w-3.5 h-3.5" />
          <span>CONTACT ADEEL ZAFAR</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Ready to make your product shine?
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
          Send me your product photos and a short brief, and I&apos;ll get back to you soon.
        </p>
        <p className="mt-2 text-sm sm:text-base font-semibold text-amber-300">
          Now I&apos;m open to small starter projects, so message me and let&apos;s create your first ad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct WhatsApp Connection Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-[#0d121c] shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block font-semibold">
                  Official Studio WhatsApp
                </span>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight mt-0.5">
                  {WHATSAPP_NUMBER}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Message me directly on WhatsApp to share your product photos, links, or ask any questions about starter projects and pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              <button
                type="button"
                onClick={copyNumber}
                className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                title="Copy phone number"
              >
                {copiedNumber ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Number</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct 1-on-1 response from Adeel Zafar</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast replies within hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Available for single-video test pilots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Brief Sender (Opens WhatsApp with pre-filled message) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Send Product Photos & Short Brief
              </h3>
              <span className="text-xs font-mono text-emerald-400">Via WhatsApp</span>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Fill in your product details below. When you click send, WhatsApp will open with your customized brief ready to send in one tap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Product Name or Brand <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Minimalist Watch, Glow Serum, Wireless Headphones..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Target Social Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="Instagram Reels & TikTok (9:16)">Instagram Reels & TikTok (9:16)</option>
                    <option value="Instagram Reels Ad (9:16)">Instagram Reels Ad (9:16)</option>
                    <option value="TikTok Video Ad (9:16)">TikTok Video Ad (9:16)</option>
                    <option value="Instagram + TikTok Dual Campaign">Instagram + TikTok Dual Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Ad Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="10 seconds">10 seconds (Punchy TikTok Hook)</option>
                    <option value="15 seconds">15 seconds (Standard Viral Ad)</option>
                    <option value="20 seconds">20 seconds (Detailed Showcase)</option>
                    <option value="30 seconds">30 seconds (Story & Proof)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Product Details or Photo Links <span className="text-amber-400">*</span>
                </label>
                <textarea
                  value={briefDetails}
                  onChange={(e) => setBriefDetails(e.target.value)}
                  rows={4}
                  placeholder="Paste your Google Drive, Dropbox, or product page link here, plus any key features you want highlighted..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 hover:brightness-110 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Send Brief to Adeel on WhatsApp (+92 322 3552103)</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
