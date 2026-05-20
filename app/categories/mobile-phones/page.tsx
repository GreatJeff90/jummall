'use client';

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, List, ChevronDown } from "lucide-react";

// Modularized Category Component Imports
import ComputersSidebar from "../../components/categories/ComputersSidebar";
import EmptyGrid from "@/app/components/categories/EmptyGrid";

export default function MobilePhonesCategoryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-64 md:h-32 md:mb-12 w-full flex items-center overflow-hidden">
        {/* Background Image using fill and object-cover */}
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Computers Category Header Background" 
          fill 
          className="object-cover"
          priority
        />
        {/* Darker overlay for text readability if needed */}
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
          <h1 className="text-5xl font-black tracking-tight text-[#0F172A] font-montserrat">
           Mobile Phones
          </h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2 font-medium">
            Home <span className="text-slate-300">.</span> Products <span className="text-slate-300">.</span> <span className="text-sky-600">Mobile Phones</span>
          </p>
        </div>
      </div>

      {/* --- Main 2-Column Split Content Frame --- */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ================= SIDEBAR FILTERS (LEFT) ================= */}
          <div className="w-full lg:w-[280px] shrink-0">
            <ComputersSidebar />
          </div>

          {/* ================= ARCHIVE PRODUCT LIST (RIGHT) ================= */}
          <div className="flex-1 space-y-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight font-montserrat">
              Mobile Phones
            </h2>

            {/* --- Toolbar Metrics & Display Options Line Row --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-4 sm:gap-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-all ${
                    viewMode === 'grid' ? 'border-slate-800 text-slate-800 bg-white shadow-sm' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-all ${
                    viewMode === 'list' ? 'border-slate-800 text-slate-800 bg-white shadow-sm' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <List size={16} />
                </button>
                <span className="ml-2 text-xs font-medium text-slate-400">
                  0 Products found
                </span>
              </div>

              {/* Filtering Controls options dropdown buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="relative shrink-0">
                  <select className="appearance-none bg-white border border-slate-200 rounded-sm pl-4 pr-10 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer">
                    <option>Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative shrink-0">
                  <select className="appearance-none bg-white border border-slate-200 rounded-sm pl-4 pr-10 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer">
                    <option>24</option>
                    <option>48</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* --- Dynamic Product Grid Content Render --- */}
            <EmptyGrid  />

          </div>

        </div>
      </div>
    </main>
  );
}