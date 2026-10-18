import React, { useState } from 'react';
import {
  Play,
  Clock,
  X,
  Film,
  Monitor,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PortfolioItem } from '../types.ts';
import { PORTFOLIO_VIDEOS } from '../data/mockPortfolio.ts';

interface PortfolioSectionProps {
  onGetQuote: (initialTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onGetQuote }) => {
  const [items] = useState<PortfolioItem[]>(PORTFOLIO_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  const item = items[0]; // Single real video card

  if (!item) return null;

  return (
    <section id="portfolio" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Featured Product Ad
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg font-medium">
          Here are some of my recent AI product ad samples.
        </p>
      </div>

      {/* Portfolio Showcase - Single Real Video Card */}
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/15 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all flex flex-col group">
          {/* Dark Gold-and-Black Thumbnail Stage */}
          <div
            onClick={() => setSelectedVideo(item)}
            className="relative aspect-video bg-[#070605] overflow-hidden cursor-pointer"
          >
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

            {/* Glowing Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-400/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all shadow-2xl">
                <Play className="w-7 h-7 fill-current ml-0.5 text-amber-300 group-hover:text-slate-950" />
              </div>
            </div>

            {/* Format Badge: 16:9 Widescreen */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-lg">
                <Monitor className="w-3.5 h-3.5 text-purple-300" />
                <span className="font-semibold">{item.platformBadge}</span>
              </span>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md text-xs font-mono text-white flex items-center gap-1.5 border border-white/10 shadow-lg">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.duration}</span>
            </div>
          </div>

          {/* Video Details */}
          <div className="p-6 sm:p-8 flex flex-col space-y-5 bg-[#0b0d14]/90">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-amber-300/90 border border-white/10">
                  {item.platformBadge}
                </span>
              </div>

              {/* Exact Description Line */}
              <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/25">
                <p className="text-xs sm:text-sm font-mono font-semibold text-amber-300">
                  &ldquo;{item.description}&rdquo;
                </p>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.tagline}
              </p>
            </div>

            {/* Action Buttons: Watch on Instagram, Watch on TikTok, and Request Quote */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {item.instagramUrl && (
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Watch on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {item.tiktokUrl && (
                  <a
                    href={item.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Watch on TikTok</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => onGetQuote(item.title)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow shrink-0 text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Request Ad Like This</span>
              </button>
            </div>
          </div>
        </div>

        {/* Short line under the portfolio */}
        <p className="text-center text-sm font-medium text-slate-400 mt-10 tracking-wide">
          More videos coming soon.
        </p>
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full bg-[#0e101a] border border-white/15 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-auto max-w-3xl sm:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#131625]">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {selectedVideo.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/20 text-amber-300 font-semibold whitespace-nowrap">
                    {selectedVideo.duration}
                  </span>
                </div>
                <p className="text-xs font-mono text-amber-300/90 mt-0.5">
                  {selectedVideo.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Stage (16:9 Widescreen) */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden mx-auto aspect-video w-full">
              {selectedVideo.videoUrl ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                /* Dark Gold-and-Black Luxury Stage with Direct Watch Options */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <img
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-[#0e101a]" />

                  <div className="relative z-10 max-w-md px-4 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 shadow-xl">
                      <Film className="w-8 h-8" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-mono text-amber-300 font-semibold mb-2">
                      {selectedVideo.platformBadge}
                    </span>

                    <h4 className="text-white font-display font-bold text-lg sm:text-xl mb-1">
                      {selectedVideo.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {selectedVideo.description}
                    </p>

                    {/* Social Media Watch Buttons inside Modal */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {selectedVideo.instagramUrl && (
                        <a
                          href={selectedVideo.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <span>Watch on Instagram</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {selectedVideo.tiktokUrl && (
                        <a
                          href={selectedVideo.tiktokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <span>Watch on TikTok</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-5 bg-[#131625] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-300 text-center sm:text-left">
                Want a video ad formatted in <strong className="text-white">16:9 Widescreen</strong> for your brand?
              </div>
              <button
                onClick={() => {
                  const title = selectedVideo.title;
                  setSelectedVideo(null);
                  onGetQuote(title);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow shrink-0 text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Get a Free Quote for This Style</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
