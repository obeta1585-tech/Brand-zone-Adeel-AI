import React from 'react';
import { Sparkles, MessageSquare, CheckCircle2, Phone } from 'lucide-react';

interface AboutSectionProps {
  onGetQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGetQuote }) => {
  return (
    <section id="about" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Creator Badge */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-600 p-[2px] shadow-2xl shadow-purple-900/40">
                <div className="w-full h-full bg-[#0d0f18] rounded-[22px] flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 font-display font-black text-2xl">
                    AZ
                  </div>
                  <div className="mt-2 text-xs font-bold text-white tracking-wide">
                    Adeel Zafar
                  </div>
                  <div className="text-[10px] font-mono text-amber-400">
                    Creator & Video Ad Specialist
                  </div>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#090a0f]"></span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
                Brand Zone Adeel AI
              </span>
            </div>
          </div>

          {/* User's Exact Words */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT THE CREATOR</span>
            </div>

            {/* Exact text from user brief */}
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white leading-snug">
              Hi, I&apos;m Adeel Zafar, the creator behind Brand Zone Adeel AI.
            </h3>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              I turn product photos into cinematic video ads using AI tools, helping brands get attention on social media.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every video ad is carefully conceptualized with unskippable hooks, seamless transitions, clean typography overlays, and punchy audio cues so your product stands out in competitive social media feeds.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/923223552103"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Message Adeel on WhatsApp (+92 322 3552103)</span>
              </a>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Starter Projects Open
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Fast Turnaround
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
