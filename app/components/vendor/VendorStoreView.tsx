'use client';

import React, { useState } from "react";
import { 
  Store, // Changed from Shop
  MapPin,
  Star,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Award,
  Image as ImageIcon,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Sun,
  MessageSquare,
  User,
  Lock,
  LifeBuoy,
  Info,
  LogOut,
  RefreshCw,
  SquareCheck, // Changed from CheckSquare
  Check
} from "lucide-react";

export default function VendorStoreView() {
  const [vacationMode, setVacationMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* --- 8.1 PAGE HEADER COMPONENT ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="text-left">
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">
            Seller
          </span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">
            Your Store
          </h1>
        </div>

        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={16} className={`${loading ? "animate-spin text-[#149FCD]" : ""}`} />
        </button>
      </div>

      {/* --- 8.2 STORE HERO BRANDING ACCENT CARD --- */}
      <div className="w-full rounded-sm bg-gradient-to-br from-[#1B4D5E] to-[#143D4A] overflow-hidden relative text-white shadow-md border border-[#143D4A] p-6">
        
        {/* SoftSplash Ambient Glow Spheres Overlay */}
        <div className="absolute -top-28 -right-28 w-64 h-64 rounded-full bg-[#149FCD]/40 blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[#FFD43A]/15 blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[#149FCD] to-[#1284AC] flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-lg shadow-sky-950/50 uppercase border-2 border-white/10">
              G
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h2 className="text-xl font-black tracking-tight">Glorious God&apos;s Store</h2>
                <span className="bg-[#FFD43A] text-[#143D4A] p-0.5 rounded-full shadow-sm flex items-center justify-center shrink-0" title="Verified Merchant">
                  <Check size={10} className="stroke-[3]" />
                </span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/70 font-medium">
                <MapPin size={13} className="text-[#FFD43A]" />
                <span>Port Harcourt, Nigeria</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#FFD43A] text-[#143D4A] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                <Star size={12} className="fill-[#143D4A] stroke-none" />
                <span>4.8</span>
                <span className="text-[#143D4A]/60 font-bold">· 32 reviews</span>
              </div>
            </div>
          </div>

          <button className="bg-white hover:bg-slate-50 text-[#143D4A] px-5 h-11 text-xs font-black uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all shadow-md shrink-0 z-10">
            <ExternalLink size={14} className="stroke-[2.5]" /> Public Storefront
          </button>
        </div>
      </div>

      {/* --- 8.3 PROFILE COMPLETION TRACKER CARD --- */}
      <div className="bg-white border border-[#EAEBED] p-5 rounded-sm shadow-sm space-y-3 text-left">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD] shrink-0">
            <Sparkles size={18} className="stroke-[2]" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex justify-between items-baseline gap-4">
              <h4 className="text-[13.5px] font-black text-slate-800 tracking-tight">Polish your store</h4>
              <span className="text-xs font-black text-[#149FCD] font-montserrat">85%</span>
            </div>
            <p className="text-[11.5px] font-medium text-slate-400 leading-normal">
              Add a logo, banner & tagline so buyers trust your store description metrics.
            </p>
          </div>
        </div>
        
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#149FCD] transition-all duration-300" style={{ width: "85%" }} />
        </div>
      </div>

      {/* --- 8.4 STORE CORE METRIC COUNTERS GRID TRAY --- */}
      <div className="bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-slate-100/80 gap-y-4 md:gap-y-0">
        {[
          { icon: ShoppingBag, value: "4", label: "Products" },
          { icon: SquareCheck, value: "4", label: "Active" }, // Fixed icon reference here
          { icon: TrendingUp, value: "486", label: "Sold" },
          { icon: Award, value: "4.8", label: "Rating" }
        ].map((metric, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-1">
            <span className="text-lg font-black text-slate-800 font-montserrat tracking-tight block leading-none">{metric.value}</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* ================= 8.5 ACTION MENU SECTIONS ================= */}
      
      <div className="space-y-2.5 text-left">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Storefront</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]">
                <Store size={16} /> {/* Changed from Shop to Store */}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Edit store info</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Name, bio, location</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]"><ImageIcon size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Banner & branding</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Logo, cover photo, colors</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-left">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Finance</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]"><CreditCard size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Bank account</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">For payout transfers</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-[#1B4D5E]"><BarChart3 size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Reports & insights</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Sales, visits, conversion</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-left">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Business</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center text-[#31B757]"><ShieldCheck size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Identity Verification</h4><p className="text-[11px] font-medium text-[#31B757] mt-0.5 font-bold">Tier 1 verified · blue tick active</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>

          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]"><Sun size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Vacation mode</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">{vacationMode ? "Store paused — buyers see you as away" : "Pause sales temporarily"}</p></div></div>
            
            <button 
              type="button"
              onClick={() => setVacationMode(!vacationMode)}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center shrink-0 ${vacationMode ? "bg-[#149FCD]" : "bg-slate-200"}`}
              style={{ minWidth: "40px", height: "22px" }}
            >
              <div 
                className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200"
                style={{ transform: vacationMode ? "translateX(18px)" : "translateX(2px)" }}
              />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]"><MessageSquare size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Auto-replies</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Quick replies for buyers</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-left">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Account & Help</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-500"><User size={16} /></div>
            <h4 className="text-[13px] font-bold text-slate-800">Personal Info</h4></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-[#1B4D5E]"><Lock size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Security</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Password & 2FA</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]"><LifeBuoy size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">Seller Support</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">24/7 — usually replies in minutes</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
          <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5"><div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-500"><Info size={16} /></div>
            <div><h4 className="text-[13px] font-bold text-slate-800">About Jummall</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Version 1.0.0</p></div></div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
        </div>
      </div>

      {/* --- 8.6 DESTRUCTIVE LOGOUT TILE CARD LINE --- */}
      <div className="bg-white border border-red-200/60 rounded-sm shadow-sm overflow-hidden text-left">
        <div className="p-4 flex items-center gap-3.5 cursor-pointer hover:bg-red-50/40 transition-colors text-[#EF4444] font-bold text-[13px]">
          <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center text-[#EF4444]">
            <LogOut size={16} />
          </div>
          <span>Sign Out</span>
        </div>
      </div>

    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}