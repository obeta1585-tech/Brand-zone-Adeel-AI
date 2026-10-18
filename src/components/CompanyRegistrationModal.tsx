import React, { useState } from 'react';
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';

interface CompanyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccess: (companyData: any) => void;
}

export const CompanyRegistrationModal: React.FC<CompanyRegistrationModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccess,
}) => {
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phoneWhatsApp, setPhoneWhatsApp] = useState('');
  const [websiteSocialLink, setWebsiteSocialLink] = useState('');
  const [category, setCategory] = useState('watches');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!brandName.trim()) {
      setErrorMsg(lang === 'en' ? 'Company or Brand Name is required.' : 'کمپنی یا برانڈ کا نام ضروری ہے۔');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMsg(lang === 'en' ? "Contact Person's Name is required." : 'رابطہ کار کا نام ضروری ہے۔');
      return;
    }
    if (!businessEmail.trim() || !businessEmail.includes('@')) {
      setErrorMsg(lang === 'en' ? 'A valid business email address is required.' : 'درست کاروباری ای میل ایڈریس ضروری ہے۔');
      return;
    }
    if (!phoneWhatsApp.trim()) {
      setErrorMsg(lang === 'en' ? 'Phone or WhatsApp number is required.' : 'فون یا واٹس ایپ نمبر ضروری ہے۔');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          contactPerson,
          businessEmail,
          phoneWhatsApp,
          websiteSocialLink,
          category,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register company.');
      }

      setSuccessMsg(data.message || t.companyModal.successMessage);
      setTimeout(() => {
        onSuccess(data.company);
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto rounded-3xl bg-[#0c0e17] border border-amber-500/30 shadow-2xl shadow-black/80 overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#090b12]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {t.companyModal.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.companyModal.subtitle}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Company / Brand Name */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              {t.companyModal.brandName} <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Royal Watches Co."
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Contact Person's Name */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              {t.companyModal.contactPerson} <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Adeel Zafar"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Business Email & Phone / WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.companyModal.businessEmail} <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="contact@brand.pk"
                  className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                {t.companyModal.phoneWhatsApp} <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={phoneWhatsApp}
                  onChange={(e) => setPhoneWhatsApp(e.target.value)}
                  placeholder="+92 322 3552103"
                  className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Company Website or Social Media Link */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              {t.companyModal.websiteSocialLink}
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={websiteSocialLink}
                onChange={(e) => setWebsiteSocialLink(e.target.value)}
                placeholder="https://instagram.com/yourbrand or website"
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 5. Product Category */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              {t.companyModal.category}
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#131623] border border-white/10 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="watches">Watches (گھڑیاں)</option>
                <option value="perfumes">Perfumes (پرفیومز)</option>
                <option value="shoes">Shoes (جوتے)</option>
                <option value="slippers">Slippers (چپل و سلیپرز)</option>
                <option value="clothing">Clothing (لباس و کپڑے)</option>
                <option value="electronics">Electronics (الیکٹرانکس)</option>
                <option value="cosmetics">Cosmetics (کاسمیٹکس)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>{t.companyModal.submit}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
