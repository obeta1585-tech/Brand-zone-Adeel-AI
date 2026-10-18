import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Trash2,
  DollarSign,
  TrendingUp,
  Building2,
  Package,
  Layers,
  AlertCircle,
  Eye,
  Phone,
  ExternalLink,
  Edit,
  Save,
  Loader2,
  BarChart3,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Language, translations } from '../i18n/translations.ts';
import { MarketplaceProduct, Company, PromotionPackage, AdminMetrics } from '../types.ts';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onMarketplaceUpdated: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  onMarketplaceUpdated,
}) => {
  const [password, setPassword] = useState('');
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('adeel_admin_token') || null;
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'approved' | 'companies' | 'packages'>('overview');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Admin Data
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [packages, setPackages] = useState<PromotionPackage[]>([]);

  // Editing package state
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPackagePrice, setEditPackagePrice] = useState<number>(0);
  const [editPackageDuration, setEditPackageDuration] = useState<number>(0);

  const t = translations[lang];

  useEffect(() => {
    if (adminToken && isOpen) {
      fetchAdminData();
    }
  }, [adminToken, isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid password.');
      }

      setAdminToken(data.token);
      sessionStorage.setItem('adeel_admin_token', data.token);
      setPassword('');
      fetchAdminData(data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    sessionStorage.removeItem('adeel_admin_token');
    setMetrics(null);
    setProducts([]);
    setCompanies([]);
    setPackages([]);
  };

  const fetchAdminData = async (tokenOverride?: string) => {
    const token = tokenOverride || adminToken;
    if (!token) return;

    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [resMetrics, resProducts, resCompanies, resPackages] = await Promise.all([
        fetch('/api/admin/overview', { headers }),
        fetch('/api/admin/products', { headers }),
        fetch('/api/admin/companies', { headers }),
        fetch('/api/admin/packages', { headers }),
      ]);

      if (resMetrics.status === 401 || resMetrics.status === 403) {
        handleLogout();
        setErrorMsg('Session expired. Please log in again.');
        return;
      }

      const dataMetrics = await resMetrics.json();
      const dataProducts = await resProducts.json();
      const dataCompanies = await resCompanies.json();
      const dataPackages = await resPackages.json();

      setMetrics(dataMetrics.metrics);
      setProducts(dataProducts.products || []);
      setCompanies(dataCompanies.companies || []);
      setPackages(dataPackages.packages || []);
    } catch (err: any) {
      setErrorMsg('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  // 1. Approve Product
  const handleApproveProduct = async (id: string) => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccessMsg(data.message || 'Product approved.');
      fetchAdminData();
      onMarketplaceUpdated();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Reject Product
  const handleRejectProduct = async (id: string) => {
    if (!adminToken) return;
    const reason = window.prompt('Enter rejection reason (optional):', 'Does not meet product presentation guidelines');
    if (reason === null) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccessMsg(data.message || 'Product rejected.');
      fetchAdminData();
      onMarketplaceUpdated();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Product Listing
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!adminToken) return;
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccessMsg(data.message || 'Product deleted.');
      fetchAdminData();
      onMarketplaceUpdated();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Update Payment Status
  const handleUpdatePayment = async (id: string, paymentStatus: string) => {
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/payments/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ productId: id, paymentStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccessMsg(data.message || 'Payment status updated.');
      fetchAdminData();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // 5. Save Package Changes
  const handleSavePackage = async (id: string) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          pricePkr: editPackagePrice,
          durationDays: editPackageDuration
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEditingPackageId(null);
      setSuccessMsg('Package updated successfully.');
      fetchAdminData();
      onMarketplaceUpdated();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  if (!isOpen) return null;

  const formatPkr = (num: number) => new Intl.NumberFormat('en-PK').format(num);

  const pendingList = products.filter((p) => p.status === 'pending');
  const approvedList = products.filter((p) => p.status === 'approved');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0b0d14] border border-amber-500/40 shadow-2xl shadow-black overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/20 bg-[#08090f]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-lg text-white">
                  {t.admin.portalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  SERVER SECURED
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-medium">
                {t.admin.portalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminToken && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                {t.admin.logout}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If Not Logged In -> Show Password Gate */}
        {!adminToken ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-xl text-white mb-2">
              Website Owner Authorization
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {t.admin.loginPrompt} All administrative endpoints are guarded by server-side token authorization.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (default: adeel2026)"
                className="w-full bg-[#131623] border border-white/15 focus:border-amber-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none text-center"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Unlock className="w-4 h-4 text-slate-950" />}
                <span>{t.admin.loginButton}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div>
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#090b12] overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.overview}</span>
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'pending'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.pending}</span>
                {pendingList.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold">
                    {pendingList.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'approved'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.approved}</span>
              </button>
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'companies'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.companies}</span>
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'packages'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.packages}</span>
              </button>
            </div>

            {/* Notification messages */}
            {successMsg && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
                <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-white text-xs">✕</button>
              </div>
            )}

            {errorMsg && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-white text-xs">✕</button>
              </div>
            )}

            {/* Tab Contents */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* TAB 1: OVERVIEW METRICS */}
              {activeTab === 'overview' && metrics && (
                <div className="space-y-6">
                  {/* Metric Counters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    <div className="p-4 rounded-2xl bg-[#121524] border border-amber-500/20">
                      <div className="text-xs text-amber-400 font-mono font-medium">{t.admin.stats.pending}</div>
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                        {metrics.pendingProducts}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Requires Adeel Review</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121524] border border-amber-500/20">
                      <div className="text-xs text-emerald-400 font-mono font-medium">{t.admin.stats.live}</div>
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                        {metrics.approvedProducts}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Public on Marketplace</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121524] border border-amber-500/20">
                      <div className="text-xs text-cyan-400 font-mono font-medium">{t.admin.stats.companies}</div>
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                        {metrics.totalCompanies}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Verified Brands</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121524] border border-amber-500/20">
                      <div className="text-xs text-purple-400 font-mono font-medium">{t.admin.stats.inquiries}</div>
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                        {metrics.totalInquiries}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Direct WhatsApp Leads</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121524] border border-amber-500/20 col-span-2 sm:col-span-1">
                      <div className="text-xs text-yellow-400 font-mono font-medium">{t.admin.stats.revenueEstimate}</div>
                      <div className="text-xl sm:text-2xl font-display font-extrabold text-amber-300 mt-1">
                        PKR {formatPkr(metrics.totalRevenuePkr)}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Confirmed Campaigns</div>
                    </div>
                  </div>

                  {/* Summary Guidance */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-white text-base">
                        Administrator Workflow • Adeel Zafar
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 max-w-xl">
                        When brands submit products, they appear under &quot;Pending Submissions&quot;. You can approve listings with 1 click, set payment status, manage pricing packages in PKR, and monitor buyer WhatsApp inquiries.
                      </p>
                    </div>
                    <button
                      onClick={() => fetchAdminData()}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh Data</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PENDING PRODUCT SUBMISSIONS */}
              {activeTab === 'pending' && (
                <div className="space-y-4">
                  {pendingList.length === 0 ? (
                    <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/10 p-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-white">All caught up! No pending submissions.</p>
                      <p className="text-xs text-slate-400 mt-1">New submissions from brands will appear here for your review.</p>
                    </div>
                  ) : (
                    pendingList.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#121524] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop'}
                            alt={product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                                {product.category}
                              </span>
                              <span className="text-xs font-mono text-slate-400">{product.brandName}</span>
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">{product.name}</h4>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-md mt-0.5">{product.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="font-bold text-amber-300">
                                PKR {formatPkr(product.promotionalPricePkr || product.originalPricePkr)}
                              </span>
                              <span className="text-slate-400">|</span>
                              <span className="text-slate-300 uppercase font-mono text-[10px]">
                                Package: {product.packageId} ({product.durationDays} days)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Approve or Reject Action Buttons */}
                        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                          <button
                            onClick={() => handleApproveProduct(product.id)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t.admin.actions.approve}</span>
                          </button>

                          <button
                            onClick={() => handleRejectProduct(product.id)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 font-semibold text-xs transition-all cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{t.admin.actions.reject}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: APPROVED LIVE LISTINGS */}
              {activeTab === 'approved' && (
                <div className="space-y-4">
                  {approvedList.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#121524] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              LIVE
                            </span>
                            <span className="text-xs font-mono text-slate-400">{product.brandName}</span>
                          </div>
                          <h4 className="font-bold text-white text-sm sm:text-base">{product.name}</h4>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
                            <span className="font-bold text-amber-300">
                              PKR {formatPkr(product.promotionalPricePkr || product.originalPricePkr)}
                            </span>
                            <span className="text-slate-400">|</span>
                            <span className="text-emerald-400 font-mono text-[11px]">
                              {product.clicks?.whatsappInquiries || 0} WhatsApp Inquiries
                            </span>
                            <span className="text-slate-400">|</span>
                            <span className="text-cyan-400 font-mono text-[11px]">
                              {product.clicks?.websiteVisits || 0} Site Visits
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Status Dropdown & Delete */}
                      <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400">Payment:</span>
                          <select
                            value={product.paymentStatus}
                            onChange={(e) => handleUpdatePayment(product.id, e.target.value)}
                            className="bg-[#0c0e17] border border-white/15 rounded-lg py-1 px-2 text-xs text-white focus:outline-none cursor-pointer"
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: REGISTERED COMPANIES */}
              {activeTab === 'companies' && (
                <div className="space-y-4">
                  {companies.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#121524] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white text-base">{comp.brandName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                            {comp.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">Contact: {comp.contactPerson} • {comp.businessEmail}</p>
                        <p className="text-xs text-emerald-400 font-mono mt-1">WhatsApp / Phone: {comp.phoneWhatsApp}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {comp.websiteSocialLink && (
                          <a
                            href={comp.websiteSocialLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Store Link</span>
                          </a>
                        )}
                        <a
                          href={`https://wa.me/${comp.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/40"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: PACKAGES MANAGEMENT */}
              {activeTab === 'packages' && (
                <div className="space-y-4">
                  {packages.map((pkg) => {
                    const isEditing = editingPackageId === pkg.id;

                    return (
                      <div
                        key={pkg.id}
                        className="p-5 rounded-2xl bg-[#121524] border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white text-base">{pkg.name} ({pkg.nameUrdu})</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 font-bold">
                              {pkg.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 max-w-md">{pkg.tagline}</p>
                        </div>

                        {/* Price & Duration Fields */}
                        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
                          {isEditing ? (
                            <div className="flex items-center gap-2 text-xs">
                              <input
                                type="number"
                                value={editPackagePrice}
                                onChange={(e) => setEditPackagePrice(Number(e.target.value))}
                                className="w-24 bg-[#0c0e17] border border-amber-400 rounded-lg py-1 px-2 text-white font-mono"
                                placeholder="Price PKR"
                              />
                              <input
                                type="number"
                                value={editPackageDuration}
                                onChange={(e) => setEditPackageDuration(Number(e.target.value))}
                                className="w-16 bg-[#0c0e17] border border-amber-400 rounded-lg py-1 px-2 text-white font-mono"
                                placeholder="Days"
                              />
                              <button
                                onClick={() => handleSavePackage(pkg.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-base font-extrabold text-amber-300 font-display">
                                  PKR {formatPkr(pkg.pricePkr)}
                                </div>
                                <div className="text-[11px] text-slate-400">{pkg.durationDays} days</div>
                              </div>
                              <button
                                onClick={() => {
                                  setEditingPackageId(pkg.id);
                                  setEditPackagePrice(pkg.pricePkr);
                                  setEditPackageDuration(pkg.durationDays);
                                }}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                                title="Edit Price / Duration"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
