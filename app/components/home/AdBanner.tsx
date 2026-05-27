'use client';

import Link from 'next/link';

export default function AdBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans select-none">
      {/* Container holding your custom dynamic graphic asset */}
      <div 
        className="w-full min-h-[380px] md:min-h-[460px] rounded-[32px] bg-cover bg-center relative flex items-center justify-start p-6 sm:p-12 md:p-16 overflow-hidden border border-slate-100 shadow-sm"
        style={{ 
          backgroundImage: `url('/div.editorial__media.png')` 
        }}
      >
        
        {/* ================= PREMIUM INTERACTIVE FLOATING CONTENT CARD ================= */}
        <div className="w-full max-w-[560px] bg-white rounded-[32px] p-8 sm:p-10 md:p-12 shadow-2xl border border-white/90 text-left animate-in fade-in slide-in-from-bottom-3 duration-500 relative z-10">
          
          {/* Subtitle brand tag insignia */}
          <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-5 select-none">
            The Jummall Edit
          </span>
          
          {/* Main Strategic Header Title */}
          <h2 className="text-2xl sm:text-3xl md:text-[35px] font-black font-montserrat text-slate-900 tracking-tight leading-[1.1] mb-5 uppercase">
            From Lagos to Abuja — delivered to your door.
          </h2>
          
          {/* Paragraph copy descriptors */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed tracking-wide mb-8 max-w-md">
            Free shipping on orders over ₦100,000. Choose Standard, Express, or Pickup. Track every step from checkout to confirmation.
          </p>

          {/* Action Row containing interactive CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Link 
              href="/delivery-guide"
              className="bg-[#149fcd] hover:bg-[#118eb8] text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 text-center"
            >
              Read our delivery guide
            </Link>
            
            <span className="text-[11px] font-black text-slate-400/80 italic tracking-wide text-center sm:text-left select-none">
              2-day delivery in 14+ cities
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}