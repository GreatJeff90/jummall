'use client';

import React from 'react';
import { Check, ShieldCheck, ShoppingBag, Truck, CheckCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';

// --- ESCROW PROCESS STEPS CONFIGURATION ---
const escrowSteps = [
  { id: '01', label: 'You pay', icon: ShoppingBag, active: false },
  { id: '02', label: 'Held in escrow', icon: ShieldCheck, active: true },
  { id: '03', label: 'Seller ships', icon: Truck, active: false },
  { id: '04', label: 'You confirm', icon: CheckCircle, active: false },
  { id: '05', label: 'Seller paid', icon: CreditCard, active: false }
];

export default function EscrowPromise() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans select-none text-left">
      {/* Master Container Panel with Responsive Paddings */}
      <div className="w-full bg-gradient-to-br from-[#EBF6FA] via-[#F5FAFC] to-[#FFFDF5] rounded-[32px] p-6 sm:p-12 md:p-16 border border-slate-100 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12 relative overflow-hidden shadow-2xs">
        
        {/* Soft ambient blur halo in top right corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* ================= LEFT SIDEWALK: STEPPER PANEL CONTAINER ================= */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative z-10 overflow-hidden">
          {/* Added horizontal native swiper handling on mobile with no-scrollbar utilities */}
          <div className="w-full max-w-[520px] bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-white/80 flex items-center justify-between relative overflow-x-auto no-scrollbar gap-2 sm:gap-0">
            {escrowSteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <React.Fragment key={step.id}>
                  {/* Step Item Capsule */}
                  <div className="flex flex-col items-center flex-1 group min-w-[75px] sm:min-w-0 shrink-0">
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                        step.active 
                          ? 'bg-[#149fcd] text-white shadow-lg shadow-[#149fcd]/20 scale-105 sm:scale-110 z-10' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                      }`}
                    >
                      {/* Active green breathing radar shadow pulse ring */}
                      {step.active && (
                        <span className="absolute inset-0 rounded-full bg-[#149fcd]/30 animate-ping pointer-events-none scale-105" />
                      )}
                      <Icon size={18} className={step.active ? 'stroke-[2.5]' : 'stroke-[2]'} />
                    </div>

                    {/* Meta Number Code & Text Copy */}
                    <span className={`text-[9px] sm:text-[10px] font-black tracking-wider mt-2.5 select-none ${step.active ? 'text-[#149fcd]' : 'text-slate-300'}`}>
                      {step.id}
                    </span>
                    <h4 className={`text-[10px] sm:text-[11px] font-black tracking-tight uppercase mt-0.5 text-center whitespace-nowrap ${step.active ? 'text-slate-800' : 'text-slate-500'}`}>
                      {step.label}
                    </h4>
                  </div>

                  {/* Intersecting horizontal tracking vector bridges */}
                  {index < escrowSteps.length - 1 && (
                    <div className="w-8 sm:w-full h-[2px] bg-slate-100 mx-0.5 sm:mx-1 max-w-[16px] sm:max-w-[32px] shrink-0 sm:shrink" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT SIDEWALK: DESCRIPTION META CONTENT ================= */}
        <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6 relative z-10">
          <div className="space-y-3">
            <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase select-none">
              Our Promise
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-[40px] font-black font-montserrat text-slate-900 tracking-tight leading-[1.1] lg:leading-[1.05] uppercase">
              Your money,<br className="hidden sm:block" /> guarded by escrow.
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed tracking-wide max-w-xl">
            Every order on Jummall is held safely. Funds release to the seller only when you confirm delivery — so you can shop without worry, even from vendors you&apos;ve never bought from before.
          </p>

          {/* Core Feature Bullet Checkmarks */}
          <ul className="space-y-3 pt-1">
            {[
              '6-digit release code on every order',
              'Auto-refund if seller cancels',
              'Dispute resolution within 24h'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <div className="w-4 h-4 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0">
                  <Check size={11} className="text-[#10B981] stroke-[3.5]" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* Action Row Links Footer with Responsive Stretching Layout Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-3">
            <Link 
              href="/escrow-protection"
              className="w-full sm:w-fit bg-[#149fcd] hover:bg-[#118eb8] text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 text-center"
            >
              How escrow works
            </Link>

            {/* Securing escrow paystack engine layout token badge */}
            <div className="w-full sm:w-fit justify-center bg-white/60 border border-slate-200/40 rounded-xl px-4 py-2.5 flex items-center gap-1.5 opacity-75 grayscale hover:grayscale-0 transition-all select-none">
              <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block mr-1">Secured by</span>
              <span className="text-xs font-black text-[#00c5ff] font-montserrat tracking-tighter">paystack</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}