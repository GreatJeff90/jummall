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
    stars: 4,
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
      {/* Dynamic Shape Gradient from image_1e2658.png */}
      <span 
        className="absolute inline-block rounded-full opacity-100"
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
        <h3 className="text-center text-slate-400   mb-12">Vendor Testimonials</h3>
        
        <div className="flex items-center justify-center gap-4 md:gap-12">
          {/* Navigation Arrows */}
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sky-500 transition-all shrink-0">
            <ChevronLeft size={20} />
          </button>

          <div className="max-w-2xl text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < testimonials[current].stars ? "#ff8a00" : "none"} 
                  className={i < testimonials[current].stars ? "text-[#ff8a00]" : "text-slate-300"}
                />
              ))}
            </div>

            {/* Quote Icon */}
            <span className="text-2xl font-serif text-slate-300 block mb-6">“</span>

            {/* Testimonial Content */}
            <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-snug mb-12 animate-in fade-in duration-700">
              {testimonials[current].quote}
            </p>

            {/* User Info Card */}
            <div className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full shadow-sm border border-slate-50">
              <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center text-white shrink-0">
                <User size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-800">{testimonials[current].name}</p>
                <p className="text-[10px]   text-slate-400 uppercase tracking-tight">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          <button onClick={next} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sky-500 transition-all shrink-0">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}