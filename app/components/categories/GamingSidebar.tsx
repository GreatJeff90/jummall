'use client';

import { Search, ChevronDown, ChevronLeft, Minus } from "lucide-react";
import Link from "next/link";

export default function GamingSidebar() {
  const colors = [
    { name: "Blue", bg: "bg-blue-600" },
    { name: "Red", bg: "bg-red-600" },
    { name: "Black", bg: "bg-black" },
    { name: "Brown", bg: "bg-[#8B4513]" },
    { name: "White", bg: "bg-white border border-slate-200" },
    { name: "Grey", bg: "bg-gray-400" },
    { name: "Maroon", bg: "bg-red-900" },
    { name: "Orange", bg: "bg-orange-500" },
    { name: "Gold", bg: "bg-yellow-600" },
    { name: "Silver", bg: "bg-slate-300" },
    { name: "Beige", bg: "bg-[#F5F5DC]" },
  ];

  return (
    <aside className="space-y-6 w-full max-w-[280px]">
      
      {/* 1. Search Box Input */}
      <div className="relative border border-slate-200 rounded-sm bg-white overflow-hidden focus-within:border-[#149fcd] transition-colors">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 px-3 pr-10 outline-none text-[13px] text-slate-500 bg-white"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      </div>

      {/* --- Filter Blocks Layout Area --- */}
      <div className="bg-[#F8F9FA] p-5 space-y-8 rounded-sm border border-slate-100/50 shadow-sm">
        
        {/* 2. Nested Categories Tree Module */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            Categories
          </h3>
          <div className="space-y-3 text-[12px] font-medium">
            
            {/* Top link level */}
            <Link href="/shop" className="flex items-center gap-1.5 text-slate-400 hover:text-[#149fcd] transition-colors">
              <ChevronLeft size={14} /> All categories
            </Link>

            <div className="pl-1 space-y-3">
              {/* Level 1: Gaming Parent Branch */}
              <div className="flex items-center justify-between text-[#149fcd] font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#149fcd]" />
                  Gaming
                </span>
                <ChevronDown size={14} className="text-[#149fcd]" />
              </div>

              {/* Level 2: Gaming Console Expandable Row */}
              <div className="pl-4 space-y-3 border-l border-slate-200/60 font-medium">
                <div className="flex items-center justify-between text-slate-500 font-semibold">
                  <span>Gaming Console</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>

                {/* Level 3: Active Subcategory (Playstation) */}
                <div className="pl-4">
                  <Link href="/categories/gaming?subcategory=playstation" className="block text-[#149fcd] font-bold">
                    Playstation
                  </Link>
                </div>

                {/* Level 2 Alternative Branch: Gaming Accessories */}
                <div className="space-y-2 pt-1">
                  <Link href="/categories/gaming?subcategory=gaming-accessories" className="block text-slate-400 hover:text-[#149fcd] transition-colors font-semibold">
                    Gaming Accessories
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Price Slider Range Module */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            Price
          </h3>
          <div className="relative h-1 w-full bg-slate-200 rounded-full mt-6">
            <div className="absolute left-0 right-0 h-full bg-[#149fcd]" />
            <div className="absolute left-0 -top-1 w-3 h-3 bg-white border-2 border-[#149fcd] rounded-full cursor-pointer shadow-sm" />
            <div className="absolute right-0 -top-1 w-3 h-3 bg-white border-2 border-[#149fcd] rounded-full cursor-pointer shadow-sm" />
          </div>
          <p className="mt-4 text-[11px] font-bold text-slate-700">
            ₦0.00 — ₦750,000.00
          </p>
        </section>

        {/* 4. On Sale Checkbox */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            On Sale
          </h3>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd] cursor-pointer shrink-0" />
            <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd] leading-tight">
              Show only discounted products
            </span>
          </label>
        </section>

        {/* 5. Color Palette Matrix */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            Color
          </h3>
          <div className="space-y-2.5">
            {colors.map((color) => (
              <div key={color.name} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${color.bg}`} />
                <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd] transition-colors">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Weight Option */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            Weight
          </h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd] cursor-pointer" />
            <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd]">1KG</span>
          </label>
        </section>

        {/* 7. Size Options */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            Size
          </h3>
          <div className="space-y-2">
            {["M", "L"].map((size) => (
              <label key={size} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd] cursor-pointer" />
                <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd]">{size}</span>
              </label>
            ))}
          </div>
        </section>

      </div>
    </aside>
  );
}