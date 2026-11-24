import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Shield, CheckCircle, Clock, Phone, MessageSquare, 
  Users, Dumbbell, Star, CreditCard, MapPin, GitBranch, 
  ExternalLink, Download, RefreshCw, Save, Trash2, Check,
  AlertCircle, Eye, EyeOff, Tag, Camera, Image, Plus, Edit3,
  Percent, Sparkles, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { gymDetails } from '../data/gymData';

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  currentSettings, 
  onUpdateSettings,
  gymOffers,
  onUpdateOffers,
  gymPhotos,
  onUpdatePhotos
}) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('elite_gym_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');

  // Supabase Data states
  const [inquiries, setInquiries] = useState([]);
  const [trialPasses, setTrialPasses] = useState([]);
  const [quizSubmissions, setQuizSubmissions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [offers, setOffers] = useState(gymOffers || []);
  const [photos, setPhotos] = useState(gymPhotos || []);
  const [loadingData, setLoadingData] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Offers State
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [offerForm, setOfferForm] = useState({
    title: '',
    discount_tag: '',
    description: '',
    promo_code: '',
    badge: 'Special Offer',
    valid_until: 'Limited Time'
  });

  // Photos State
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [editingPhotoUrl, setEditingPhotoUrl] = useState('');
  const [photoFilter, setPhotoFilter] = useState('all');
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'equipment',
    image_url: '',
    tag: 'Heavy Lifts',
    specs: 'Commercial grade equipment',
    highlight: 'Daily sanitized and smooth biomechanics.'
  });

  // Photo presets for easy 1-click photo changes
  const PHOTO_PRESETS = [
    {
      name: 'Olympic Free Weights',
      url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Heavy Lifts'
    },
    {
      name: 'Plate-Loaded Leg Press',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Hypertrophy'
    },
    {
      name: 'Cardio Treadmills Row',
      url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Cardio & HIIT'
    },
    {
      name: 'Cable Crossover Station',
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Isolation & Pump'
    },
    {
      name: 'Spacious Clean AC Floor',
      url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
      category: 'facility',
      tag: 'Spacious & Fresh'
    },
    {
      name: 'Olympic Squat & Barbells',
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Strength'
    },
    {
      name: 'Lockers & Changing Room',
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80',
      category: 'facility',
      tag: 'Convenience'
    },
    {
      name: 'Dumbbell Rack & Benches',
      url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
      category: 'equipment',
      tag: 'Free Weights'
    }
  ];

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

  // Sync state if props change
  useEffect(() => {
    if (gymOffers && gymOffers.length > 0) setOffers(gymOffers);
  }, [gymOffers]);

  useEffect(() => {
    if (gymPhotos && gymPhotos.length > 0) setPhotos(gymPhotos);
  }, [gymPhotos]);

  // Fetch all Supabase records when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [inqRes, passRes, quizRes, revRes, offersRes, photosRes] = await Promise.all([
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('trial_passes').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('quiz_submissions').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('member_reviews').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('gym_offers').select('*').order('display_order', { ascending: true }),
        supabase.from('gym_photos').select('*').order('display_order', { ascending: true })
      ]);

      if (inqRes.data) setInquiries(inqRes.data);
      if (passRes.data) setTrialPasses(passRes.data);
      if (quizRes.data) setQuizSubmissions(quizRes.data);
      if (revRes.data) setReviews(revRes.data);
      if (offersRes.data && offersRes.data.length > 0) {
        setOffers(offersRes.data);
        if (onUpdateOffers) onUpdateOffers(offersRes.data);
      }
      if (photosRes.data && photosRes.data.length > 0) {
        setPhotos(photosRes.data);
        if (onUpdatePhotos) onUpdatePhotos(photosRes.data);
      }
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

  // --- OFFERS MANAGEMENT HANDLERS ---
  const handleToggleOfferActive = async (offerId, currentActive) => {
    const updated = !currentActive;
    try {
      await supabase.from('gym_offers').update({ is_active: updated }).eq('id', offerId);
      const nextOffers = offers.map(o => o.id === offerId ? { ...o, is_active: updated } : o);
      setOffers(nextOffers);
      if (onUpdateOffers) onUpdateOffers(nextOffers);
      localStorage.setItem('elite_gym_offers', JSON.stringify(nextOffers));
    } catch (err) {
      console.error('Toggle offer error:', err);
    }
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.discount_tag) {
      alert('Please provide at least a title and discount tag (e.g. "₹200 OFF")');
      return;
    }

    const newOffer = {
      id: `offer-${Date.now()}`,
      title: offerForm.title,
      discount_tag: offerForm.discount_tag,
      description: offerForm.description || 'Exclusive membership discount for Sagar athletes.',
      promo_code: offerForm.promo_code.toUpperCase() || 'ELITE2026',
      badge: offerForm.badge || 'Special Offer',
      valid_until: offerForm.valid_until || 'Limited Time',
      is_active: true,
      display_order: offers.length + 1
    };

    try {
      await supabase.from('gym_offers').insert([newOffer]);
      const nextOffers = [newOffer, ...offers];
      setOffers(nextOffers);
      if (onUpdateOffers) onUpdateOffers(nextOffers);
      localStorage.setItem('elite_gym_offers', JSON.stringify(nextOffers));
      setOfferForm({
        title: '',
        discount_tag: '',
        description: '',
        promo_code: '',
        badge: 'Special Offer',
        valid_until: 'Limited Time'
      });
      setIsAddingOffer(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Create offer error:', err);
      // Fallback state update
      const nextOffers = [newOffer, ...offers];
      setOffers(nextOffers);
      if (onUpdateOffers) onUpdateOffers(nextOffers);
      localStorage.setItem('elite_gym_offers', JSON.stringify(nextOffers));
      setIsAddingOffer(false);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer from the website?')) return;
    try {
      await supabase.from('gym_offers').delete().eq('id', offerId);
      const nextOffers = offers.filter(o => o.id !== offerId);
      setOffers(nextOffers);
      if (onUpdateOffers) onUpdateOffers(nextOffers);
      localStorage.setItem('elite_gym_offers', JSON.stringify(nextOffers));
    } catch (err) {
      console.error('Delete offer error:', err);
      const nextOffers = offers.filter(o => o.id !== offerId);
      setOffers(nextOffers);
      if (onUpdateOffers) onUpdateOffers(nextOffers);
    }
  };

  // --- PHOTOS MANAGEMENT HANDLERS ---
  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.image_url) {
      alert('Please provide a Title and an Image URL');
      return;
    }

    const newPhoto = {
      id: `photo-${Date.now()}`,
      category: photoForm.category,
      title: photoForm.title,
      image_url: photoForm.image_url,
      tag: photoForm.tag || 'Elite Feature',
      specs: photoForm.specs || 'Commercial grade fitness equipment',
      highlight: photoForm.highlight || 'Daily maintained for optimum member experience.',
      display_order: photos.length + 1
    };

    try {
      await supabase.from('gym_photos').insert([newPhoto]);
      const nextPhotos = [...photos, newPhoto];
      setPhotos(nextPhotos);
      if (onUpdatePhotos) onUpdatePhotos(nextPhotos);
      localStorage.setItem('elite_gym_photos', JSON.stringify(nextPhotos));
      setPhotoForm({
        title: '',
        category: 'equipment',
        image_url: '',
        tag: 'Heavy Lifts',
        specs: 'Commercial grade equipment',
        highlight: 'Daily sanitized and smooth biomechanics.'
      });
      setIsAddingPhoto(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Create photo error:', err);
      const nextPhotos = [...photos, newPhoto];
      setPhotos(nextPhotos);
      if (onUpdatePhotos) onUpdatePhotos(nextPhotos);
      localStorage.setItem('elite_gym_photos', JSON.stringify(nextPhotos));
      setIsAddingPhoto(false);
    }
  };

  const handleSavePhotoUrl = async (photoId) => {
    if (!editingPhotoUrl) return;
    try {
      await supabase.from('gym_photos').update({ image_url: editingPhotoUrl }).eq('id', photoId);
      const nextPhotos = photos.map(p => p.id === photoId ? { ...p, image_url: editingPhotoUrl } : p);
      setPhotos(nextPhotos);
      if (onUpdatePhotos) onUpdatePhotos(nextPhotos);
      localStorage.setItem('elite_gym_photos', JSON.stringify(nextPhotos));
      setEditingPhotoId(null);
      setEditingPhotoUrl('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Update photo error:', err);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Delete this photo from the gym gallery?')) return;
    try {
      await supabase.from('gym_photos').delete().eq('id', photoId);
      const nextPhotos = photos.filter(p => p.id !== photoId);
      setPhotos(nextPhotos);
      if (onUpdatePhotos) onUpdatePhotos(nextPhotos);
      localStorage.setItem('elite_gym_photos', JSON.stringify(nextPhotos));
    } catch (err) {
      console.error('Delete photo error:', err);
      const nextPhotos = photos.filter(p => p.id !== photoId);
      setPhotos(nextPhotos);
      if (onUpdatePhotos) onUpdatePhotos(nextPhotos);
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
    const exportBundle = {
      settings: formData,
      offers: offers,
      photos: photos,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `elite-gym-config-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredPhotos = photoFilter === 'all'
    ? photos
    : photos.filter(p => p.category === photoFilter);

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
                Manage website content, special offers, equipment photos, inquiries & GitHub
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
                  Enter administrator passcode to manage offers, photos, timings and incoming inquiries.
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
                    <p className="text-xs font-semibold text-rose-600 mt-1.5">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-purple-sm transition-all cursor-pointer"
                >
                  Unlock Admin Panel
                </button>

                <p className="text-[11px] text-slate-400">
                  Default Passcodes: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-900 font-mono">admin123</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-900 font-mono">elite2026</code>
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

              {/* NEW: Special Offers Tab */}
              <button
                onClick={() => setActiveTab('offers')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'offers'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-purple-700" />
                  <span>Offers & Discounts</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {offers.filter(o => o.is_active !== false).length}
                </span>
              </button>

              {/* NEW: Photos & Media Tab */}
              <button
                onClick={() => setActiveTab('photos')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'photos'
                    ? 'bg-purple-100 text-purple-900 shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-purple-700" />
                  <span>Photos & Gallery</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  {photos.length}
                </span>
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
              
              {/* TAB 1: Gym Settings & Shifts */}
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
                      <span>Changes saved successfully and synchronized with website!</span>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Hotline Number</label>
                        <input
                          type="text"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                        <span className="text-[11px] text-slate-400">Include country code without +, e.g. 919826000000</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Sunday Timings</label>
                        <input
                          type="text"
                          value={formData.sundayTimings}
                          onChange={(e) => setFormData({ ...formData, sundayTimings: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Gym Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Top Announcement Bar</label>
                      <input
                        type="text"
                        value={formData.announcement}
                        onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-purple-sm transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Sync to Supabase</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 2: Special Offers & Discounts */}
              {activeTab === 'offers' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Special Offers & Discount Coupons
                      </h4>
                      <p className="text-xs text-slate-500">
                        Create and manage deals visible to visitors on the website with direct WhatsApp redemption.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingOffer(!isAddingOffer)}
                      className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-purple-sm cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingOffer ? 'Cancel' : 'Add New Offer'}</span>
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800 animate-fadeIn">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Offers synchronized successfully!</span>
                    </div>
                  )}

                  {/* Add Offer Form Modal / Collapsible */}
                  {isAddingOffer && (
                    <form onSubmit={handleCreateOffer} className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 shadow-sm space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-purple-950 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-700" />
                          <span>Create New Website Offer</span>
                        </h5>
                        <span className="text-[11px] text-purple-700 font-semibold">Instant Live Update</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Offer Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Summer Student Booster Pass"
                            value={offerForm.title}
                            onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Discount Tag *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. ₹200 OFF or SAVE 20%"
                            value={offerForm.discount_tag}
                            onChange={(e) => setOfferForm({ ...offerForm, discount_tag: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Promo Code</label>
                          <input
                            type="text"
                            placeholder="e.g. STUDENT200"
                            value={offerForm.promo_code}
                            onChange={(e) => setOfferForm({ ...offerForm, promo_code: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono uppercase focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                          <input
                            type="text"
                            placeholder="e.g. Student Special"
                            value={offerForm.badge}
                            onChange={(e) => setOfferForm({ ...offerForm, badge: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Valid Until / Seats</label>
                          <input
                            type="text"
                            placeholder="e.g. First 25 Members"
                            value={offerForm.valid_until}
                            onChange={(e) => setOfferForm({ ...offerForm, valid_until: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Offer Description</label>
                        <textarea
                          rows={2}
                          placeholder="Describe who qualifies and what is included in the deal..."
                          value={offerForm.description}
                          onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-purple-sm transition-all cursor-pointer"
                        >
                          Publish Offer to Website
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingOffer(false)}
                          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Offers */}
                  <div className="space-y-3">
                    {offers.length === 0 ? (
                      <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
                        No offers currently created. Click "Add New Offer" to create your first promotion.
                      </div>
                    ) : (
                      offers.map((offer) => (
                        <div 
                          key={offer.id}
                          className={`p-4 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            offer.is_active !== false 
                              ? 'border-purple-200 shadow-sm' 
                              : 'border-slate-200 opacity-60 bg-slate-50/50'
                          }`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 font-extrabold text-xs">
                                {offer.discount_tag}
                              </span>
                              <h5 className="font-bold text-slate-900 text-sm font-heading">
                                {offer.title}
                              </h5>
                              {offer.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-700 text-white">
                                  {offer.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 max-w-xl">
                              {offer.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                              {offer.promo_code && (
                                <span className="font-mono bg-purple-50 px-2 py-0.5 rounded border border-purple-200 text-purple-800 font-bold">
                                  CODE: {offer.promo_code}
                                </span>
                              )}
                              {offer.valid_until && (
                                <span>⏳ {offer.valid_until}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            {/* Toggle Active Button */}
                            <button
                              onClick={() => handleToggleOfferActive(offer.id, offer.is_active !== false)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                offer.is_active !== false
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                              title={offer.is_active !== false ? 'Offer is live on website' : 'Offer is paused/hidden'}
                            >
                              {offer.is_active !== false ? (
                                <>
                                  <ToggleRight className="w-4 h-4 text-emerald-600" />
                                  <span>Active</span>
                                </>
                              ) : (
                                <>
                                  <ToggleLeft className="w-4 h-4 text-slate-500" />
                                  <span>Paused</span>
                                </>
                              )}
                            </button>

                            {/* WhatsApp Preview */}
                            <a
                              href={`https://wa.me/${formData.whatsapp || '919826000000'}?text=${encodeURIComponent(`Hi Elite Gym! Inquiring about "${offer.title}" offer (Code: ${offer.promo_code || 'N/A'})`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                              title="Test WhatsApp Inquiry"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete Offer */}
                            <button
                              onClick={() => handleDeleteOffer(offer.id)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                              title="Delete offer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Photos & Gallery */}
              {activeTab === 'photos' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Gym Floor & Equipment Photo Manager
                      </h4>
                      <p className="text-xs text-slate-500">
                        Change existing equipment and facility photos, add new machines, or select from curated gym presets.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingPhoto(!isAddingPhoto)}
                      className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-purple-sm cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingPhoto ? 'Cancel' : 'Add New Photo'}</span>
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800 animate-fadeIn">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Photos synchronized successfully with the website!</span>
                    </div>
                  )}

                  {/* Add Photo Collapsible Form */}
                  {isAddingPhoto && (
                    <form onSubmit={handleCreatePhoto} className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 shadow-sm space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-purple-950 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-purple-700" />
                          <span>Add New Photo to Gallery</span>
                        </h5>
                        <span className="text-[11px] text-purple-700 font-semibold">Live in Equipment Section</span>
                      </div>

                      {/* Photo Presets for Quick Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          ⚡ 1-Click High-Res Presets (Or paste custom URL below):
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PHOTO_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setPhotoForm({
                                  ...photoForm,
                                  title: preset.name,
                                  image_url: preset.url,
                                  category: preset.category,
                                  tag: preset.tag
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-900 text-[11px] font-semibold hover:bg-purple-100 transition-colors cursor-pointer"
                            >
                              + {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Equipment / Photo Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Olympic Free Weights & Heavy Dumbbells"
                            value={photoForm.title}
                            onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={photoForm.category}
                            onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          >
                            <option value="equipment">Strength & Free Weights</option>
                            <option value="cardio">Cardio Theatre</option>
                            <option value="facility">Cleanliness & AC Floor</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Direct Image URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://images.unsplash.com/... or your custom image link"
                          value={photoForm.image_url}
                          onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600"
                        />
                      </div>

                      {photoForm.image_url && (
                        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-purple-100">
                          <img 
                            src={photoForm.image_url} 
                            alt="Preview" 
                            className="w-16 h-12 object-cover rounded-lg border border-slate-200"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="text-xs text-slate-600 font-medium">Image preview loaded</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Tag / Badge</label>
                          <input
                            type="text"
                            placeholder="e.g. Heavy Lifts, Hypertrophy, Cardio"
                            value={photoForm.tag}
                            onChange={(e) => setPhotoForm({ ...photoForm, tag: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Specifications</label>
                          <input
                            type="text"
                            placeholder="e.g. 2.5kg to 40kg • Rubber coated hex"
                            value={photoForm.specs}
                            onChange={(e) => setPhotoForm({ ...photoForm, specs: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-purple-sm transition-all cursor-pointer"
                        >
                          Add Photo to Gallery
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingPhoto(false)}
                          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Photo Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[
                      { id: 'all', label: 'All Photos' },
                      { id: 'equipment', label: 'Strength & Equipment' },
                      { id: 'cardio', label: 'Cardio Theatre' },
                      { id: 'facility', label: 'Cleanliness & AC Floor' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setPhotoFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          photoFilter === tab.id
                            ? 'bg-purple-700 text-white shadow-purple-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-purple-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPhotos.map((photo) => (
                      <div 
                        key={photo.id}
                        className="rounded-2xl bg-white border border-purple-100 hover:border-purple-300 p-3 shadow-sm flex flex-col justify-between group transition-all"
                      >
                        <div>
                          <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                            <img
                              src={photo.image_url}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {photo.tag && (
                              <span className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-700 text-white shadow-sm">
                                {photo.tag}
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-slate-900 text-xs line-clamp-1 font-heading">
                            {photo.title}
                          </h5>
                          <p className="text-[11px] text-purple-700 font-semibold line-clamp-1 mt-0.5">
                            {photo.specs}
                          </p>
                        </div>

                        {/* Inline Change Photo URL */}
                        <div className="pt-2 mt-2 border-t border-slate-100">
                          {editingPhotoId === photo.id ? (
                            <div className="space-y-1.5">
                              <input
                                type="url"
                                placeholder="Paste new image URL..."
                                value={editingPhotoUrl}
                                onChange={(e) => setEditingPhotoUrl(e.target.value)}
                                className="w-full px-2.5 py-1 text-[11px] rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-purple-600 font-mono"
                              />
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSavePhotoUrl(photo.id)}
                                  className="px-2.5 py-1 rounded-md bg-purple-700 text-white text-[10px] font-bold hover:bg-purple-800"
                                >
                                  Save Photo
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPhotoId(null);
                                    setEditingPhotoUrl('');
                                  }}
                                  className="px-2 py-1 rounded-md bg-slate-200 text-slate-700 text-[10px]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPhotoId(photo.id);
                                  setEditingPhotoUrl(photo.image_url);
                                }}
                                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Change Photo</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                                title="Delete Photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 4: Customer Inquiries & Leads */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Customer Inquiries & Admission Leads
                      </h4>
                      <p className="text-xs text-slate-500">
                        Live submissions from the website contact and inquiry form.
                      </p>
                    </div>

                    <button
                      onClick={fetchAdminData}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      No customer inquiries submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {inquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-slate-900 text-sm font-heading">{inq.full_name || inq.name || 'Anonymous Visitor'}</h5>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                {inq.preferred_batch || 'Any Batch'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600">
                              {inq.message || inq.fitness_goal || 'General membership inquiry'}
                            </p>

                            <div className="flex items-center gap-4 text-[11px] text-slate-400">
                              <span>📞 {inq.phone || 'No phone'}</span>
                              <span>✉️ {inq.email || 'No email'}</span>
                              <span>🕒 {new Date(inq.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {inq.phone && (
                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.full_name || '')},%20thank%20you%20for%20contacting%20Elite%20Gym%20Sagar!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${inq.phone}`}
                                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold flex items-center gap-1 border border-purple-200"
                              >
                                <Phone className="w-3.5 h-3.5 text-purple-700" />
                                <span>Call</span>
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: VIP Trial Passes */}
              {activeTab === 'passes' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        VIP 1-Day Free Trial Passes
                      </h4>
                      <p className="text-xs text-slate-500">
                        Check-in visitors arriving with their trial pass voucher codes.
                      </p>
                    </div>

                    <button
                      onClick={fetchAdminData}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {trialPasses.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      No trial passes claimed yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {trialPasses.map((pass) => (
                        <div 
                          key={pass.id}
                          className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                                {pass.pass_code || 'PASS-CODE'}
                              </span>
                              <h5 className="font-bold text-slate-900 text-sm font-heading">{pass.full_name}</h5>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                pass.status === 'used' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {pass.status === 'used' ? 'Checked In' : 'Valid Pass'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600">
                              Preferred Batch: <span className="font-semibold text-purple-900">{pass.preferred_batch || 'Morning / Evening'}</span>
                            </p>

                            <div className="flex items-center gap-4 text-[11px] text-slate-400">
                              <span>📞 {pass.phone}</span>
                              <span>📅 Generated: {new Date(pass.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {pass.status !== 'used' && (
                              <button
                                onClick={() => handleMarkPassUsed(pass.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1 shadow-purple-sm transition-all cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Check-In Member</span>
                              </button>
                            )}

                            <a
                              href={`https://wa.me/${pass.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(pass.full_name)},%20welcome%20to%20Elite%20Gym%20Sagar!%20Your%20VIP%20Trial%20Pass%20${pass.pass_code}%20is%20ready.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                              title="Message on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: Routine Finder Plans */}
              {activeTab === 'quizzes' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Routine Finder Quiz Submissions
                      </h4>
                      <p className="text-xs text-slate-500">
                        Review member fitness goals and tailored workout blueprints.
                      </p>
                    </div>

                    <button
                      onClick={fetchAdminData}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {quizSubmissions.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      No routine finder quizzes completed yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {quizSubmissions.map((quiz) => (
                        <div 
                          key={quiz.id}
                          className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-slate-900 text-sm font-heading">{quiz.name || 'Member'}</h5>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                Goal: {quiz.goal || 'General Fitness'}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {new Date(quiz.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-[10px] text-slate-400 block">Experience</span>
                              <span className="font-semibold text-slate-800">{quiz.experience_level || 'Beginner'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Shift</span>
                              <span className="font-semibold text-slate-800">{quiz.preferred_shift || 'Evening'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Focus</span>
                              <span className="font-semibold text-slate-800">{quiz.focus_area || 'Full Body'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Contact</span>
                              <span className="font-semibold text-slate-800">{quiz.phone || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: Member Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Member Reviews & Moderation
                      </h4>
                      <p className="text-xs text-slate-500">
                        Approve or toggle member testimonials displayed on the website.
                      </p>
                    </div>

                    <button
                      onClick={fetchAdminData}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      No custom reviews submitted yet. Default Google 4.7★ reviews are being showcased.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {reviews.map((rev) => (
                        <div 
                          key={rev.id}
                          className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-slate-900 text-sm font-heading">{rev.author_name}</h5>
                              <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-slate-600">"{rev.comment}"</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleReviewApproval(rev.id, rev.approved)}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                rev.approved 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {rev.approved ? 'Approved & Visible' : 'Hidden'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 8: GitHub Repo & Deployment Sync */}
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
                      <p>git commit -m "update: gym timings, photos and offers"</p>
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
