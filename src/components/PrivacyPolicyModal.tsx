import React, { useEffect } from 'react';
import { X, Shield, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e101a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg sm:text-xl">
                Privacy Policy
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Brand Zone Adeel AI • Effective October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close privacy policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          {/* Section 1 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              1. Information We Collect
            </h4>
            <p>
              We believe in minimal, transparent data collection. This website does not require you to create an account, log in, or provide sensitive financial information. The only information we collect is what you voluntarily provide when contacting us:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Product names and project requirements typed into our project brief forms.</li>
              <li>Product photos or reference links you choose to share with us.</li>
              <li>Your phone number or username when you communicate with us through WhatsApp, Instagram, or TikTok.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              2. Why We Collect This Information
            </h4>
            <p>
              Any information you provide is used strictly for legitimate project communication:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>To discuss project feasibility, scope, and quote pricing.</li>
              <li>To craft tailored product video ads and promotional concepts.</li>
              <li>To deliver draft previews and finalized video files.</li>
            </ul>
            <p className="mt-2 text-slate-400">
              We do not sell, rent, or trade your personal or product information with advertisers, third-party marketing brokers, or data aggregators.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              3. How Contact Messages Are Handled
            </h4>
            <p>
              When you submit a project brief or click our WhatsApp buttons, the information is processed as a pre-formatted message sent directly to Adeel Zafar&apos;s WhatsApp business chat (<span className="text-emerald-400 font-mono">+92 322 3552103</span>). Communications on WhatsApp are subject to WhatsApp&apos;s own end-to-end encryption and terms of service.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              4. Cookies and Tracking
            </h4>
            <p>
              This website does not use tracking cookies, marketing tracking pixels (such as Meta Pixel or Google Ads tracking), or third-party fingerprinting scripts. Essential browser local storage is only utilized for client-side display preferences where needed.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              5. How to Request Deletion of Your Information
            </h4>
            <p>
              You maintain full ownership and control over your product media and information. If you wish to delete any product photos, project briefs, or chat history:
            </p>
            <div className="mt-2 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <p>
                Simply send a WhatsApp message to <strong className="text-white">+92 322 3552103</strong> stating your request (e.g., &ldquo;Please delete my submitted product brief and photos&rdquo;). We will review your request and permanently delete your submitted files and records from our active project communications as soon as reasonably possible.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              6. External Social Media Links
            </h4>
            <p>
              Our website provides direct links to our official social profiles on Instagram and TikTok. Once you click these external links and leave our website, your interactions on those platforms are governed by the respective privacy policies of Instagram (Meta) and TikTok (ByteDance).
            </p>
          </div>

          {/* Contact Box */}
          <div className="pt-2">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Data Inquiries & Questions
                </span>
                <span className="text-sm font-bold text-white">
                  Adeel Zafar • Brand Zone Adeel AI
                </span>
              </div>
              <a
                href="https://wa.me/923223552103"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Zero tracking cookies • No third-party data selling
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
