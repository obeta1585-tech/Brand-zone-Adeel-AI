import React from 'react';
import { Upload, Clapperboard, Edit3, CheckCircle2, Phone } from 'lucide-react';

interface HowItWorksProps {
  onGetQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGetQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Send Brief & Photos',
      description: 'Send your product photos, brand details and a clear brief',
      details:
        'Share high-resolution product photos, features, reference links, and target audience notes via WhatsApp.',
      icon: Upload,
    },
    {
      step: '02',
      title: 'Concept & Draft Video',
      description: 'I share the concept and a draft video',
      details:
        'I craft an eye-catching visual concept, unskippable hook, and deliver a polished initial draft video complete with sound and text overlays.',
      icon: Clapperboard,
    },
    {
      step: '03',
      title: 'Feedback & Tweaks',
      description: 'You request changes',
      details:
        'Review the draft and let me know any adjustments needed to timing, text messages, transitions, or music to match your brand style.',
      icon: Edit3,
    },
    {
      step: '04',
      title: 'Final Delivery',
      description: 'I deliver the final video, ready to post',
      details:
        'You receive high-resolution, scroll-stopping video ads formatted and ready to post on Instagram Reels and TikTok.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>HOW IT WORKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Simple 4-Step Production Process
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg">
          Fast, transparent, and built to get your product in front of customers quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-all relative flex flex-col justify-between group"
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-amber-400/80 group-hover:text-amber-300 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-2 leading-snug">
                  {item.description}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://wa.me/923223552103"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>Send Your Product Brief on WhatsApp (+92 322 3552103)</span>
        </a>
      </div>
    </section>
  );
};
