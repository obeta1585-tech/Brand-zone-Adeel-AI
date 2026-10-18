import React from 'react';
import {
  Lightbulb,
  Video,
  Sparkles,
  Type,
  Scissors,
  Music,
  CheckCircle,
  Phone,
} from 'lucide-react';

interface ServicesSectionProps {
  onGetQuote: (initialTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onGetQuote }) => {
  const services = [
    {
      id: 'ad-concepts',
      title: 'AI Ad Concepts',
      desc: 'Creative ideas and storyboards built around your product',
      details:
        'We engineer multi-angle commercial concepts, unskippable 3-second hook variations, and complete scene breakdowns tailored specifically around your product.',
      icon: Lightbulb,
      badge: 'Ideation & Hooks',
      deliverables: ['Custom Storyboard Plan', '3x Viral Hook Variations', 'Scene-by-scene script'],
    },
    {
      id: 'promo-videos',
      title: 'Short Promo Videos',
      desc: 'Eye-catching 10 to 30 second ads for social media',
      details:
        'Crafted specifically for the vertical feed algorithms of Instagram Reels and TikTok. High tempo, vibrant color grading, and irresistible rhythm that stops the scroll.',
      icon: Video,
      badge: '10 to 30 Seconds',
      deliverables: ['9:16 Vertical Video', '1:1 Square Feed Cut', 'Optimized for TikTok & Reels'],
    },
    {
      id: 'showcase-visuals',
      title: 'Product Showcase Visuals',
      desc: 'Clean, cinematic visuals that highlight your product',
      details:
        'Turn standard product photos into million-dollar commercial studio visuals. Featuring volumetric lighting, macro water droplets, floating particles, and ultra-fine cinematic detail.',
      icon: Sparkles,
      badge: 'Cinematic 4K Renders',
      deliverables: ['Clean background isolation', 'Cinematic studio lighting', 'Crisp high-definition texture'],
    },
    {
      id: 'text-overlays',
      title: 'Text Overlays and CTAs',
      desc: 'Clear messages and call-to-action buttons on screen',
      details:
        'Bold, modern kinetic typography and call-to-action elements that communicate value clearly even with audio muted. High contrast, synchronized with motion, designed to trigger instant clicks.',
      icon: Type,
      badge: 'Conversion Copy',
      deliverables: ['Animated kinetic text', 'High-CTR button overlays', 'Silent-mode optimized'],
    },
    {
      id: 'editing-transitions',
      title: 'Editing and Transitions',
      desc: 'Smooth cuts, effects and polished transitions',
      details:
        'Seamless whip-pans, speed ramps, zoom snaps, match cuts, and motion blur effects that elevate your product commercial into a hypnotic, professional visual experience.',
      icon: Scissors,
      badge: 'Dynamic Motion',
      deliverables: ['Speed ramping & motion blur', 'Seamless match cuts', 'Color grade mastering'],
    },
    {
      id: 'sfx-music',
      title: 'Sound Effects and Music',
      desc: 'Audio that gives your ad energy',
      details:
        'Layered custom sound design: crisp whooshes, deep bass drops, cinematic risers, and trending royalty-free beats that inject unstoppable momentum into your product ad.',
      icon: Music,
      badge: 'Immersive Audio',
      deliverables: ['Commercial licensed music', 'Foley & whoosh sound FX', 'Sub-bass impact drops'],
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>SERVICES PAGE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Everything You Need to Make Your Brand Stand Out
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg">
          I craft scroll-stopping AI product ads and promo videos for brands, made for Instagram and TikTok.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-amber-400/40 hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:border-amber-400/40 transition-all">
                    <Icon className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                  {srv.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-amber-400/90">
                  {srv.desc}
                </p>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {srv.details}
                </p>

                {/* Deliverables checklist */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onGetQuote(srv.title)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-200 font-semibold border border-white/5 hover:border-amber-400/30 transition-all text-center"
                >
                  Request {srv.title}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-16 glass-panel-glow p-8 sm:p-10 rounded-3xl text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
            Ready to make your product shine?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Now open to small starter projects. Message me on WhatsApp and let&apos;s create your first ad.
          </p>
        </div>
        <a
          href="https://wa.me/923223552103"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2"
        >
          <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
