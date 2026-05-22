'use client';

import React from "react";
import { ArrowLeft, BarChart3, TrendingUp, Users, ShoppingBag } from "lucide-react";

export default function VendorReportsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Finance</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Reports & insights</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 select-none">
        <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-2">
          <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center"><TrendingUp size={16} /></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Gross Sales Volume</span>
          <span className="text-2xl font-black font-montserrat text-slate-800 block">₦0.00</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-2">
          <div className="w-8 h-8 rounded-md bg-sky-50 text-[#149FCD] flex items-center justify-center"><Users size={16} /></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Store Visitors</span>
          <span className="text-2xl font-black font-montserrat text-slate-800 block">0</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-2">
          <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center"><ShoppingBag size={16} /></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
          <span className="text-2xl font-black font-montserrat text-slate-800 block">0.0%</span>
        </div>
      </div>
    </div>
  );
}