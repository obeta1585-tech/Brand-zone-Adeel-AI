import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

export const SocialMediaSection: React.FC = () => {
  const INSTAGRAM_LINK = 'https://www.instagram.com/reel/DekGMPVIWhb/?dlrf=ZXBqMTh4eWNlcXdq';
  const TIKTOK_LINK = 'https://vt.tiktok.com/ZSgF59DWo/';

  return (
    <section id="social-media" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono mb-3">
          <span>CONNECT WITH ADEEL</span>
        </div>

        {/* Section Heading labeled "My Social Media" */}
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          My Social Media
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Check out my latest AI product video ads, viral reels, and creative promos on Instagram and TikTok.
        </p>

        {/* Only Two Platforms: Instagram & TikTok - Mobile Friendly Buttons */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {/* 1. Instagram */}
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#2a1224]/80 to-[#141226]/80 hover:from-[#3b1733] hover:to-[#1f193d] border border-pink-500/30 hover:border-pink-400 text-white shadow-xl hover:shadow-pink-900/20 active:scale-[0.98] transition-all min-h-[72px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-mono uppercase tracking-wider text-pink-300 font-semibold block">
                  Watch Reels
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-pink-200 transition-colors">
                  Instagram
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-300 group-hover:bg-pink-500 group-hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* 2. TikTok */}
          <a
            href={TIKTOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0c1f26]/80 to-[#0e1424]/80 hover:from-[#112d38] hover:to-[#15203a] border border-cyan-500/30 hover:border-cyan-400 text-white shadow-xl hover:shadow-cyan-900/20 active:scale-[0.98] transition-all min-h-[72px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform relative overflow-hidden">
                {/* Official TikTok Icon SVG */}
                <svg
                  className="w-6 h-6 fill-current text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48 6.27 6.27 0 0 0 1.86-4.48V8.72a8.18 8.18 0 0 0 4.81 1.57V6.84a4.88 4.88 0 0 1-1-.15z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                  Watch Videos
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  TikTok
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
