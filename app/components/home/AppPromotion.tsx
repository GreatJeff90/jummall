'use client';

import React from 'react';
import Link from 'next/link';

export default function AppPromotion() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans select-none text-left">
      {/* Master Container Panel */}
      <div className="w-full bg-[#FAFAFA] rounded-[32px] border border-slate-100/80 p-8 sm:p-10 md:p-12 lg:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden shadow-3xs">
        
        {/* ================= LEFT COLUMN: HERO TEXT MATRIX ================= */}
        <div className="space-y-4 max-w-xl">
          {/* Top Info Capsule Badge */}
          <div>
            <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-3xs">
              Faster on the app
            </span>
          </div>

          {/* Primary Header Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-black font-montserrat text-slate-900 tracking-tight leading-tight uppercase">
            Shop, track, and chat — in your pocket.
          </h2>

          {/* Core Feature Copy Description */}
          <p className="text-xs sm:text-sm font-semibold text-slate-400 max-w-md leading-relaxed">
            Free on iOS and Android. Push alerts when your order is on the way.
          </p>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE BADGES TRACK ================= */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-5 select-none">
          
          {/* App Store CTA Badge Wrapper */}
          <Link
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A1118] hover:bg-[#111A24] text-white rounded-2xl px-5 py-3 flex items-center gap-3 transition-all duration-300 active:scale-98 border border-white/5 shadow-md"
          >
            {/* Apple Logo Icon Inline Asset SVG */}
            <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.08.3.12.42.12.94 0 2.05-.57 2.4-1.45z" />
            </svg>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Download on the</span>
              <span className="text-sm font-black font-montserrat tracking-tight text-white mt-1 leading-none">App Store</span>
            </div>
          </Link>

          {/* Google Play Store CTA Badge Wrapper */}
          <Link
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A1118] hover:bg-[#111A24] text-white rounded-2xl px-5 py-3 flex items-center gap-3 transition-all duration-300 active:scale-98 border border-white/5 shadow-md"
          >
            {/* Google Play Store Logo Icon Inline Asset SVG */}
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.783 12 3.609 22.186A2.222 2.222 0 013 20.57V3.43c0-.64.227-1.204.609-1.616zm11.135 9.225l2.977-2.977L4.996 2.15l10.876 10.02c.045-.045.09-.09.135-.131zm3.832 1.428l2.915-1.688a1.594 1.594 0 000-2.758l-2.915-1.688-3.23 3.23 3.23 3.234zm-3.832.502L4.996 21.85l12.726-5.912c-.045-.045-.09-.09-.135-.13z" />
            </svg>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Get it on</span>
              <span className="text-sm font-black font-montserrat tracking-tight text-white mt-1 leading-none">Google Play</span>
            </div>
          </Link>

          {/* QR Scan-to-install Container Layout Element Block */}
          <div className="hidden sm:flex flex-col items-center gap-1.5 ml-1">
            <div className="w-[52px] h-[52px] rounded-xl border border-slate-300 bg-white p-1 flex items-center justify-center shadow-3xs relative">
              {/* Simulated scan grid lines placeholders */}
              <div className="w-full h-full border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-[8px] text-slate-300 font-bold bg-slate-50/50 uppercase select-none">
                QR
              </div>
            </div>
            <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase select-none">
              Scan to install
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}