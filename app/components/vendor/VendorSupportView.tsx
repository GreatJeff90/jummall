'use client';

import React from "react";
import { ArrowLeft, LifeBuoy, MessageCircle, Mail, FileText } from "lucide-react";

export default function VendorSupportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Help desk</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Seller Support</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 select-none">
        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-3 hover:border-[#149FCD] transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-md bg-[#E5F4FA] text-[#149FCD] flex items-center justify-center group-hover:bg-[#149FCD] group-hover:text-white transition-all"><MessageCircle size={20} /></div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Live Chat Help</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">Connect straight to our support operators in Port Harcourt for rapid troubleshooting help.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-3 hover:border-[#149FCD] transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all"><Mail size={20} /></div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Email Support</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">File technical tickets directly via <span className="font-mono text-[#149FCD]">vendor@jummall.com</span> with tracking indexes logs.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-3 hover:border-[#149FCD] transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all"><FileText size={20} /></div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Documentation</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">Browse merchant academies paths, catalog upload guidelines, and payout margin rules parameters.</p>
        </div>
      </div>
    </div>
  );
}