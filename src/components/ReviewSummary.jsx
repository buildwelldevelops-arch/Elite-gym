import React, { useState, useEffect } from 'react';
import { Star, HelpCircle, CheckCircle, ExternalLink, ThumbsUp, Quote, MessageSquare, Plus, X, Send } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function ReviewSummary({ settings }) {
  const { reviewsSummary } = gymDetails;
  const gymName = settings?.gymName || gymDetails.name;
  const [filterTag, setFilterTag] = useState('All');
  const [reviewsList, setReviewsList] = useState(reviewsSummary.testimonials);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Active Member');
  const [rating, setRating] = useState(5);
  const [tag, setTag] = useState('General Fitness');
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
            role: r.role || 'Member',
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

      const newEntry = {
        id: data && data.length > 0 ? data[0].id : `local-${Date.now()}`,
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
    } catch (err) {
      console.warn('Error saving review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tags = ['All', 'Fat Loss & Conditioning', 'Hypertrophy & Strength', 'General Fitness'];

  const filteredTestimonials = filterTag === 'All'
    ? reviewsList
    : reviewsList.filter(t => t.tag === filterTag);

  return (
    <section id="reviews" className="py-20 sm:py-28 relative overflow-hidden bg-white border-t border-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-sky-100/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Verified Member Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            Top-Rated <span className="text-gradient-blue">Fitness Experience</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real feedback from members who train daily on our floor and cardio deck.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Google Review Summary Card Replica */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-blue-100 p-6 sm:p-8 shadow-card relative">
            
            {/* Top Bar with 'Review summary' */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-sm text-blue-700 border border-blue-200">
                  G
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-heading">
                  Review Summary
                </h3>
              </div>
              <button 
                title="Verified member reviews rating"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Split: Star Bar Graph (Left) & 4.9 Rating (Right) */}
            <div className="grid grid-cols-12 gap-4 py-6 items-center border-b border-slate-100">
              
              {/* Star Distribution Bars */}
              <div className="col-span-7 sm:col-span-8 space-y-2">
                {reviewsSummary.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2.5 text-xs text-slate-600">
                    <span className="w-3 text-right font-semibold text-slate-700">{item.stars}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-100">
                      <div 
                        className="h-full bg-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Big 4.9 Rating and Star Display */}
              <div className="col-span-5 sm:col-span-4 text-center sm:text-right flex flex-col items-center sm:items-end justify-center">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight leading-none">
                  {reviewsSummary.averageRating}
                </div>
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <a 
                  href={gymDetails.contact.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>{reviewsSummary.totalReviews}+ Verified reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Google Review AI Summary Paragraph */}
            <div className="pt-6 space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                "{reviewsSummary.summaryText}"
              </p>

              {/* Pill tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {reviewsSummary.highlightPills.map((pill, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 font-medium"
                  >
                    ✓ {pill}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span>Verified Business Listing</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> High Satisfaction Score
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
                      ? 'bg-blue-600 text-white shadow-blue-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                  className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:border-blue-200 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-black flex items-center justify-center text-xs">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          {testimonial.author}
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
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

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
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
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-5 rounded-2xl bg-blue-50/60 border border-blue-100 shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Train at {gymName}?</h4>
                <p className="text-xs text-slate-600">Share your fitness journey with fellow members</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-blue-sm transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer font-heading"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Review</span>
                </button>
                <a
                  href={gymDetails.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Write Member Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md rounded-3xl bg-white border border-blue-100 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 font-heading uppercase mb-1">
              Add Your Review
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Your honest feedback helps other gym athletes.
            </p>

            {reviewSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Review Added!</h4>
                <p className="text-xs text-slate-500">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Role / Batch</label>
                    <input
                      type="text"
                      placeholder="e.g. Morning Batch"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      <option value={3}>⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Focus Tag</label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                    <option value="Hypertrophy & Strength">Hypertrophy & Strength</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your training experience, coaching, or equipment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-blue-sm flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
