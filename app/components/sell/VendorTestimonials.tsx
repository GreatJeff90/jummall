'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ibrahim",
    role: "Phone Accessories Seller",
    stars: 5,
    quote: "The vendor support team is fantastic. Anytime I have questions, they respond quickly and help me improve my store."
  },
  {
    id: 2,
    name: "Emeka",
    role: "Fashion Entrepreneur",
    stars: 5,
    quote: "Selling on JUMMALL has helped me reach more customers than I ever imagined. The platform is easy to use, and payments are always secure."
  },
  {
    id: 3,
    name: "Tunde",
    role: "Electronics Retailer",
    stars: 5,
    quote: "JUMMALL's logistics network makes delivery stress-free. My customers get their orders quickly, and I can focus on growing my business."
  }
];

export default function VendorTestimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-[#f3f5f6] pt-[130px] pb-[135px] relative overflow-hidden">
      {/* Dynamic Shape Gradient Layer */}
      <span 
        className="absolute inline-block rounded-full opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsla(0, 0%, 100%, 0) 70%, rgba(9, 137, 255, .1))',
          height: '432px',
          width: '432px',
          left: '50%',
          top: '-65px',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-12 text-center select-none">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#149fcd]">
            Vendor Testimonials
          </h2>
          <div className="w-12 h-0.5 bg-[#149fcd] mx-auto mt-3" />
        </div>
        
        <div className="flex items-center justify-center gap-4 md:gap-12">
          {/* Navigation Controls */}
          <button 
            type="button"
            onClick={prev} 
            className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] hover:border-[#149fcd] transition-all shrink-0 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          <div className="max-w-2xl text-center">
            {/* Star Metrics Indicator */}
            <div className="flex justify-center gap-1 mb-6 select-none">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < testimonials[current].stars ? "#ff8a00" : "none"} 
                  className={i < testimonials[current].stars ? "text-[#ff8a00]" : "text-slate-200"}
                />
              ))}
            </div>

            {/* Quote Body Wrap Layout */}
            <blockquote className="text-xl md:text-2xl font-medium text-slate-700 leading-relaxed mb-12 animate-in fade-in duration-500 max-w-xl mx-auto">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>

            {/* Profile User Metadata Badge Card */}
            <div className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full shadow-xs border border-slate-100 select-none">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner shrink-0">
                <User size={18} className="stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800 leading-tight">
                  {testimonials[current].name}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={next} 
            className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] hover:border-[#149fcd] transition-all shrink-0 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}