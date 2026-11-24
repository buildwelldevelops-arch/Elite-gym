import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Shield, CheckCircle, Clock, Phone, MessageSquare, 
  Users, Dumbbell, Star, CreditCard, MapPin, GitBranch, 
  ExternalLink, Download, RefreshCw, Save, Trash2, Check,
  AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { gymDetails } from '../data/gymData';

export default function AdminPanel({ isOpen, onClose, currentSettings, onUpdateSettings }) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('elite_gym_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');

  // Data states from Supabase
  const [inquiries, setInquiries] = useState([]);
  const [trialPasses, setTrialPasses] = useState([]);
  const [quizSubmissions, setQuizSubmissions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable settings state
  const [formData, setFormData] = useState({
    gymName: currentSettings?.gymName || gymDetails.name,
    morningBatch: currentSettings?.morningBatch || '6:00 AM – 10:00 AM',
    eveningBatch: currentSettings?.eveningBatch || '5:00 PM – 10:00 PM',
    sundayTimings: currentSettings?.sundayTimings || '7:00 AM – 10:00 AM',
    phone: currentSettings?.phone || gymDetails.contact.phone,
    whatsapp: currentSettings?.whatsapp || gymDetails.contact.whatsapp,
    address: currentSettings?.address || gymDetails.address.full,
    announcement: currentSettings?.announcement || 'Welcome to Elite Gym Sagar! Dual batches open daily.',
    monthlyPrice: currentSettings?.monthlyPrice || '1,199',
    quarterlyPrice: currentSettings?.quarterlyPrice || '2,999',
    annualPrice: currentSettings?.annualPrice || '8,999'
  });

  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default PIN: admin123 or elite2026
    if (pinInput === 'admin123' || pinInput === 'elite2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('elite_gym_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid PIN. Use admin123 or elite2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('elite_gym_admin_auth');
    setPinInput('');
  };

  // Fetch all Supabase records when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [inqRes, passRes, quizRes, revRes] = await Promise.all([
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('trial_passes').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('quiz_submissions').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('member_reviews').select('*').order('created_at', { ascending: false }).limit(50)
      ]);

      if (inqRes.data) setInquiries(inqRes.data);
      if (passRes.data) setTrialPasses(passRes.data);
      if (quizRes.data) setQuizSubmissions(quizRes.data);
      if (revRes.data) setReviews(revRes.data);
    } catch (err) {
      console.warn('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('gym_settings').upsert({
        id: 'default',
        gym_name: formData.gymName,
        morning_batch: formData.morningBatch,
        evening_batch: formData.eveningBatch,
        sunday_timings: formData.sundayTimings,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: formData.address,
        announcement: formData.announcement,
        monthly_price: formData.monthlyPrice,
        quarterly_price: formData.quarterlyPrice,
        annual_price: formData.annualPrice,
        updated_at: new Date().toISOString()
      });

      if (onUpdateSettings) {
        onUpdateSettings(formData);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save settings error:', err);
    }
  };

  const handleMarkPassUsed = async (passId) => {
    try {
      await supabase.from('trial_passes').update({ status: 'used' }).eq('id', passId);
      setTrialPasses(prev => prev.map(p => p.id === passId ? { ...p, status: 'used' } : p));
    } catch (err) {
      console.error('Error updating pass:', err);
    }
  };

  const handleToggleReviewApproval = async (reviewId, currentApproved) => {
    try {
      await supabase.from('member_reviews').update({ approved: !currentApproved }).eq('id', reviewId);
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, approved: !currentApproved } : r));
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `elite-gym-config-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl h-[92vh] rounded-3xl bg-white border border-purple-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-purple-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-purple-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black font-heading tracking-tight">
                  Elite Gym Admin Portal
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-800 text-purple-200 border border-purple-600">
                  Sagar, MP
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Manage website content, customer inquiries, trial passes & GitHub repository
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-900 hover:bg-purple-800 text-purple-200 transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-purple-900 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-purple-50/40">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-purple-200 shadow-soft text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-slate-900 font-heading">
                  Staff Authentication
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the administrator passcode to access gym controls and incoming leads.
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Admin PIN (Default: admin123)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-900 font-mono text-base tracking-widest focus:outline-none focus:border-purple-600"
                  />
                  {pinError && (
                    <p className="text-xs text-rose-600 mt-1.5 font-medium">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-purple-sm transition-all cursor-pointer"
                >
                  Unlock Admin Portal
                </button>

                <p className="text-[11px] text-slate-400">
                  Default passcode: <span className="font-mono font-bold text-purple-700">admin123</span> or <span className="font-mono font-bold text-purple-700">elite2026</span>
                </p>
              </form>
            </div>
          </div>
        ) : (
          /* Main Tabbed Admin Workspace */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            
            {/* Left Tab Navigation */}
            <div className="w-full md:w-60 bg-white border-r border-purple-100 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <Clock className="w-4 h-4 text-purple-700" />
                <span>Gym Settings & Shifts</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-purple-700" />
                  <span>Inquiries & Leads</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('passes')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'passes'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Dumbbell className="w-4 h-4 text-purple-700" />
                  <span>VIP Trial Passes</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  {trialPasses.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('quizzes')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'quizzes'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-purple-700" />
                  <span>Routine Finder Plans</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  {quizSubmissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Member Reviews</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  {reviews.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'github'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <GitBranch className="w-4 h-4 text-purple-700" />
                <span>GitHub & Code Sync</span>
              </button>

              <div className="pt-4 mt-auto border-t border-slate-100 hidden md:block">
                <button
                  onClick={fetchAdminData}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:bg-purple-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Cloud Data</span>
                </button>
              </div>

            </div>

            {/* Right Tab Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              
              {/* TAB 1: Gym Settings & Shifts (For future changes) */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Gym Operational Details & Content Editor
                      </h4>
                      <p className="text-xs text-slate-500">
                        Update batch timings, phone numbers, addresses, and membership pricing live.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportJSON}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-purple-200 text-purple-800 hover:bg-purple-50 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON Config</span>
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800 animate-fadeIn">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Changes saved successfully to Supabase and synchronized with website!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Gym Name</label>
                        <input
                          type="text"
                          value={formData.gymName}
                          onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Morning Batch Timing</label>
                        <input
                          type="text"
                          value={formData.morningBatch}
                          onChange={(e) => setFormData({ ...formData, morningBatch: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                        <span className="text-[11px] text-slate-400">e.g. 6:00 AM – 10:00 AM</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Evening Batch Timing</label>
                        <input
                          type="text"
                          value={formData.eveningBatch}
                          onChange={(e) => setFormData({ ...formData, eveningBatch: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                        <span className="text-[11px] text-slate-400">e.g. 5:00 PM – 10:00 PM</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Price (₹)</label>
                        <input
                          type="text"
                          value={formData.monthlyPrice}
                          onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">3-Month Price (₹)</label>
                        <input
                          type="text"
                          value={formData.quarterlyPrice}
                          onChange={(e) => setFormData({ ...formData, quarterlyPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Annual Price (₹)</label>
                        <input
                          type="text"
                          value={formData.annualPrice}
                          onChange={(e) => setFormData({ ...formData, annualPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sagar Full Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Business Number (without +)</label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                      />
                      <span className="text-[11px] text-slate-400">e.g. 919826000000 (used for instant member chats)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Top Announcement Banner</label>
                      <input
                        type="text"
                        value={formData.announcement}
                        onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-purple-sm transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Synchronize All Settings</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 2: Inquiries & Leads */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Customer Inquiries & Visit Requests
                      </h4>
                      <p className="text-xs text-slate-500">
                        Live inquiries submitted through the website's visit booking form.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                      Total: {inquiries.length}
                    </span>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                      No customer inquiries found in database yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200">
                                {inq.batch || 'Evening Batch'}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                              <span>📞 {inq.phone}</span>
                              <span>🎯 Goal: {inq.goal || 'Fitness'}</span>
                              <span>⏱️ {new Date(inq.created_at).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)},%20this%20is%20Elite%20Gym%20Sagar%20regarding%20your%20visit%20request.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-600" />
                              <span>Call</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VIP Trial Passes */}
              {activeTab === 'passes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        1-Day Free VIP Trial Passes
                      </h4>
                      <p className="text-xs text-slate-500">
                        Verify member passes generated online when they arrive at the gym counter.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                      Total: {trialPasses.length}
                    </span>
                  </div>

                  {trialPasses.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                      No trial passes issued yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {trialPasses.map((pass) => (
                        <div key={pass.id} className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                                {pass.pass_code}
                              </span>
                              <h5 className="font-bold text-slate-900 text-sm mt-1.5">{pass.name}</h5>
                              <p className="text-xs text-slate-500">📞 {pass.phone}</p>
                              <p className="text-xs text-purple-900 font-semibold mt-0.5">{pass.batch}</p>
                            </div>

                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              pass.status === 'used'
                                ? 'bg-slate-100 text-slate-600 border-slate-300'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}>
                              {pass.status || 'Active'}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-400">
                              Issued: {new Date(pass.created_at).toLocaleDateString()}
                            </span>
                            {pass.status !== 'used' && (
                              <button
                                onClick={() => handleMarkPassUsed(pass.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                                <span>Check-In</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Quiz Submissions */}
              {activeTab === 'quizzes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Routine Finder Submissions
                      </h4>
                      <p className="text-xs text-slate-500">
                        Custom workout blueprints calibrated by visitors on the website.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                      Total: {quizSubmissions.length}
                    </span>
                  </div>

                  {quizSubmissions.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                      No routine quiz submissions recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {quizSubmissions.map((quiz) => (
                        <div key={quiz.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="font-bold text-slate-900 text-sm block">
                              {quiz.plan_name || 'Personalized Routine'}
                            </span>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-600 mt-1">
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-medium border border-purple-100">
                                Goal: {quiz.goal}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                                Level: {quiz.level}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200">
                                Shift: {quiz.batch}
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400 shrink-0">
                            {new Date(quiz.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: Member Reviews Moderation */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Member Reviews Moderation
                      </h4>
                      <p className="text-xs text-slate-500">
                        Approve or hide reviews before they display on the public website.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                      Total: {reviews.length}
                    </span>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                      No member reviews submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                              <span className="text-xs text-amber-500 font-bold">★ {rev.rating}</span>
                              <span className="text-[11px] text-slate-400 font-medium">({rev.role})</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed max-w-xl">
                              "{rev.comment}"
                            </p>
                            <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 inline-block">
                              {rev.tag}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleReviewApproval(rev.id, rev.approved)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                rev.approved
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{rev.approved ? 'Live (Visible)' : 'Hidden (Pending)'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: GitHub Repo & Deployment Sync */}
              {activeTab === 'github' && (
                <div className="space-y-5 max-w-3xl">
                  <div className="pb-3 border-b border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      GitHub Repository & Code Sync
                    </h4>
                    <p className="text-xs text-slate-500">
                      Manage and track changes for your official GitHub repository.
                    </p>
                  </div>

                  {/* GitHub Repo Card */}
                  <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                          <GitBranch className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">
                            buildwelldevelops-arch / Elite-gym
                          </h5>
                          <p className="text-xs text-slate-500">
                            Default branch: <span className="font-mono font-bold text-purple-700">main</span>
                          </p>
                        </div>
                      </div>

                      <a
                        href="https://github.com/buildwelldevelops-arch/Elite-gym"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-purple-sm"
                      >
                        <span>Open on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950 font-mono break-all">
                      https://github.com/buildwelldevelops-arch/Elite-gym.git
                    </div>
                  </div>

                  {/* Git Deployment Guide */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs text-slate-700">
                    <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-purple-700" />
                      <span>How to Push Future Code Changes</span>
                    </h5>
                    <p className="text-slate-600">
                      To push any future local code modifications to your repository, run these commands in your project terminal:
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-1 overflow-x-auto">
                      <p><span className="text-slate-500"># 1. Stage modified files</span></p>
                      <p>git add .</p>
                      <p><span className="text-slate-500"># 2. Commit with descriptive message</span></p>
                      <p>git commit -m "update: gym timings and content"</p>
                      <p><span className="text-slate-500"># 3. Push directly to GitHub</span></p>
                      <p>git push origin main</p>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
