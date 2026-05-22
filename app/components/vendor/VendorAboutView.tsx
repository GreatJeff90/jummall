'use client';

import React from "react";
import { ArrowLeft, Info, HelpCircle, ShieldAlert } from "lucide-react";

export default function VendorAboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans select-none">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Information</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">About Jummall</h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-sm max-w-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#E5F4FA] text-[#149FCD] flex items-center justify-center font-black text-xl font-montserrat">J</div>
          <div>
            <h2 className="text-base font-black text-slate-800">Jummall E-Marketplace Ecosystem</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Version 1.0.0 (Build 2026.1)</p>
          </div>
        </div>
        <hr className="border-slate-100" />
        <p className="text-xs font-medium text-slate-500 leading-relaxed">Jummall is a high-performance, next-generation escrow e-commerce engine constructed explicitly to solve digital trade trust frictions across the Nigerian merchant marketplace space.</p>
        <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] font-black text-[#149FCD] uppercase tracking-wide">
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Guidelines</a>
        </div>
      </div>
    </div>
  );
}