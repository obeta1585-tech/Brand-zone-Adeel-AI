import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Crown,
  Star,
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';
import { PromotionPackage } from '../types.ts';

interface PromotionPackagesSectionProps {
  packages: PromotionPackage[];
  lang: Language;
  onSelectPackage: (pkg: PromotionPackage) => void;
}

export const PromotionPackagesSection: React.FC<PromotionPackagesSectionProps> = ({
  packages,
  lang,
  onSelectPackage,
}) => {
  const t = translations[lang];

  const formatPkr = (num: number) => new Intl.NumberFormat('en-PK').format(num);

  const getPackageIcon = (id: string) => {
    switch (id) {
      case 'starter':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'featured':
        return <Star className="w-5 h-5 text-yellow-300" />;
      case 'premium':
        return <Crown className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="packages" className="scroll-mt-24 py-16 sm:py-24 relative bg-[#080910] border-t border-b border-amber-500/15">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Transparent Advertising Services' : 'شفاف تشہیری سروسز'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            {t.packagesSection.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.packagesSection.subheading}
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isFeatured = pkg.id === 'featured';
            const nameText = lang === 'ur' && pkg.nameUrdu ? pkg.nameUrdu : pkg.name;
            const taglineText = lang === 'ur' && pkg.taglineUrdu ? pkg.taglineUrdu : pkg.tagline;
            const placementText = lang === 'ur' && pkg.placementUrdu ? pkg.placementUrdu : pkg.placement;
            const deliverablesList = lang === 'ur' && pkg.deliverablesUrdu ? pkg.deliverablesUrdu : pkg.deliverables;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#14121d] via-[#100e19] to-[#0d0c14] border-2 border-amber-400 shadow-2xl shadow-amber-500/15 md:-translate-y-2'
                    : 'bg-[#0d0f17] border border-amber-500/20 hover:border-amber-400/50 hover:shadow-xl shadow-black/40'
                }`}
              >
                {/* Popular Pill */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.packagesSection.popularTag}</span>
                  </div>
                )}

                <div>
                  {/* Top package head */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                      {getPackageIcon(pkg.id)}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300 font-semibold">
                      {pkg.durationDays} {t.packagesSection.days}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white">
                    {nameText}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed min-h-[38px]">
                    {taglineText}
                  </p>

                  {/* Price Tag in PKR */}
                  <div className="mt-6 mb-6 pb-6 border-b border-white/10">
                    <div className="text-xs font-mono text-slate-400 mb-1">
                      {lang === 'en' ? 'Package Price (PKR)' : 'پیکج کی قیمت (پاکستانی روپے)'}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-display font-extrabold text-amber-300">
                        {t.packagesSection.currency} {formatPkr(pkg.pricePkr)}
                      </span>
                      <span className="text-xs text-slate-400">
                        / {pkg.durationDays} {t.packagesSection.days}
                      </span>
                    </div>
                  </div>

                  {/* Placement Meta */}
                  <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                    <strong className="text-amber-400 font-mono">
                      {lang === 'en' ? 'Placement:' : 'جگہ:'}
                    </strong>{' '}
                    {placementText}
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'What Is Included:' : 'پیکج میں کیا شامل ہے:'}
                    </div>
                    {deliverablesList.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Package CTA */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                  }`}
                >
                  <span>{t.packagesSection.selectPackage}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Honest Legal Disclaimer */}
        <div className="mt-12 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 max-w-3xl mx-auto flex items-start gap-3 text-xs text-slate-400">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-semibold">{lang === 'en' ? 'Honest Notice:' : 'اہم نوٹ:'}</strong>{' '}
            {t.packagesSection.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
