import React, { useState, useEffect } from 'react';
import { Star, HelpCircle, CheckCircle, ExternalLink, ThumbsUp, Quote, MessageSquare, Plus, X, Send } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function ReviewSummary() {
  const { reviewsSummary } = gymDetails;
  const [filterTag, setFilterTag] = useState('All');
  const [reviewsList, setReviewsList] = useState(reviewsSummary.testimonials);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Morning Batch Member');
  const [rating, setRating] = useState(5);
  const [tag, setTag] = useState('Muscle Building');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('member_reviews')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted = data.map((r, i) => ({
            id: r.id || `db-${i}`,
            author: r.author,
            role: r.role || 'Elite Member',
            rating: Number(r.rating) || 5,
            time: 'Recently',
            comment: r.comment,
            tag: r.tag || 'General Fitness'
          }));
          setReviewsList(formatted);
        }
      } catch (err) {
        console.warn('Could not fetch reviews from Supabase:', err);
      }
    }
    fetchReviews();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('member_reviews').insert([
        {
          author,
          role,
          rating,
          tag,
          comment,
          approved: true
        }
      ]).select();

      if (!error && data && data.length > 0) {
        const newEntry = {
          id: data[0].id,
          author,
          role,
          rating,
          time: 'Just now',
          comment,
          tag
        };
        setReviewsList(prev => [newEntry, ...prev]);
        setReviewSubmitted(true);
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewSubmitted(false);
          setAuthor('');
          setComment('');
        }, 1500);
      }
    } catch (err) {
      console.warn('Error saving review to Supabase:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tags = ['All', 'Muscle Building', 'Fat Loss & Tone', 'Strength Training', 'General Fitness'];

  const filteredTestimonials = filterTag === 'All'
    ? reviewsList
    : reviewsList.filter(t => t.tag === filterTag);

  return (
    <section id="reviews" className="py-16 sm:py-24 relative overflow-hidden bg-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Verified Member Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Sagar's Top-Rated <span className="text-purple-700">Fitness Community</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real feedback from members who train daily at our Tili Road branch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Exact Google Review Summary Card Replica (Image 1) */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-purple-200/80 p-6 sm:p-8 shadow-soft relative">
            
            {/* Top Bar with 'Review summary' and (?) icon */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-purple-800">
                  G
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-heading">
                  Review summary
                </h3>
              </div>
              <button 
                title="Google reviews summary automatically generated from verified customer experiences"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Split: Star Bar Graph (Left) & 4.7 Rating (Right) */}
            <div className="grid grid-cols-12 gap-4 py-6 items-center border-b border-slate-100">
              
              {/* Star Distribution Bars */}
              <div className="col-span-7 sm:col-span-8 space-y-2">
                {reviewsSummary.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2.5 text-xs text-slate-600">
                    <span className="w-3 text-right font-semibold text-slate-700">{item.stars}</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Big 4.7 Rating and Star Display */}
              <div className="col-span-5 sm:col-span-4 text-center sm:text-right flex flex-col items-center sm:items-end justify-center">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight leading-none">
                  {reviewsSummary.averageRating}
                </div>
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 my-1.5">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <div className="relative w-4 h-4 text-slate-200">
                    <Star className="w-4 h-4 text-slate-200" />
                    <div className="absolute inset-0 overflow-hidden w-[70%]">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </div>

                <a 
                  href={gymDetails.contact.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-purple-700 hover:underline hover:text-purple-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>{reviewsSummary.totalReviews} reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Exact Verbatim Google AI Review Summary Paragraph */}
            <div className="pt-6 space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                "{reviewsSummary.googleReviewText}"
              </p>

              {/* Pill tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {reviewsSummary.highlightPills.map((pill, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-semibold"
                  >
                    ✓ {pill}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Verified Google Business Listing</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> High Trust Score
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Member Testimonial Cards & Filters */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {tags.map((tagItem) => (
                <button
                  key={tagItem}
                  type="button"
                  onClick={() => setFilterTag(tagItem)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    filterTag === tagItem
                      ? 'bg-purple-700 text-white shadow-purple-sm'
                      : 'bg-white text-slate-700 hover:bg-purple-50 border border-purple-100'
                  }`}
                >
                  {tagItem}
                </button>
              ))}
            </div>

            {/* Testimonials List */}
            <div className="space-y-3.5">
              {filteredTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:border-purple-300 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          {testimonial.author}
                          <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <p className="text-[11px] text-slate-500">{testimonial.role} • {testimonial.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {testimonial.tag}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-slate-400" /> Verified Member
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a Review Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-purple-200 shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Are you an Elite Gym member?</h4>
                <p className="text-xs text-slate-500">Share your fitness journey with the Sagar community</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-purple-sm transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Review</span>
                </button>
                <a
                  href={gymDetails.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
                  <span>Google</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Write Member Review Modal (Saved directly to Supabase) */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md rounded-3xl bg-white border border-purple-200 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Write a Member Review
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Your feedback is saved directly to Elite Gym's verified database.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Review Published!</h4>
                <p className="text-xs text-slate-600">Thank you for sharing your experience at Elite Gym Sagar.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-3.5 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deepak Sahu"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Batch / Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                    >
                      <option value="Morning Batch Member">Morning Batch Member</option>
                      <option value="Evening Batch Member">Evening Batch Member</option>
                      <option value="Student Member">Student Member</option>
                      <option value="Annual Member">Annual Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Workout Goal</label>
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-purple-600"
                    >
                      <option value="Muscle Building">Muscle Building</option>
                      <option value="Fat Loss & Tone">Fat Loss & Tone</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${starVal <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      </button>
                    ))}
                    <span className="text-xs text-amber-600 font-bold ml-2">{rating}.0 / 5.0</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Share about equipment, coaching, cleanliness, or atmosphere..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-purple-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Saving to Database...' : 'Post Review'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
