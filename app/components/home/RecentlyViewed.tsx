'use client';

import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- 1. COMPONENT DATA SCHEMA INTERFACES ---
interface ViewedProductItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

// --- 2. HIGH-FIDELITY LUXURY PREVIEW DECK (MATCHING ATTACHED DESIGN IMAGES) ---
const staticRecentItems: ViewedProductItem[] = [
  {
    id: "rv-1",
    name: "Daniel Wellington Classic 40mm",
    price: 82500,
    image_url: "/phone-accessories-category-img.png"
  },
  {
    id: "rv-2",
    name: "LG UltraGear 27GP850 Monitor",
    price: 485000,
    image_url: "/slider-2.png"
  },
  {
    id: "rv-3",
    name: "Anker 65W GaN Wall Charger",
    price: 32000,
    image_url: "/chic-accessories-on-white-background.png"
  },
  {
    id: "rv-4",
    name: "Wool-Blend Topcoat — Charcoal",
    price: 168000,
    image_url: "/chic-accessories-on-white-background.png"
  },
  {
    id: "rv-5",
    name: "KitchenAid Artisan Stand Mixer",
    price: 349000,
    image_url: "/kitchen-items-category-img.png"
  },
  {
    id: "rv-6",
    name: "Vans Old Skool Black/White",
    price: 52000,
    image_url: "/profile.jpg"
  }
];

export default function RecentlyViewed() {
  // Real-world implementation fallback anchor (Can be easily extended to read from localStorage client side)
  const recentItemsList = staticRecentItems;

  return (
    <section className="w-full bg-[#FAFAFA] py-16 px-4 font-sans select-none text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER ANCHOR SUBSECTION ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
              Pick up where you left off
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none uppercase">
              Recently viewed.
            </h2>
          </div>

          <Link 
            href="/shop?history=viewed" 
            className="shrink-0 border border-slate-200 hover:border-[#149fcd] hover:text-[#149fcd] transition-all text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 bg-white text-slate-600 shadow-3xs"
          >
            See all <ChevronRight size={14} className="stroke-[3]" />
          </Link>
        </div>

        {/* ================= HORIZONTAL 6-COLUMN PRODUCT GRID CARD SHELF ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {recentItemsList.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-[24px] border border-slate-100/60 p-3.5 flex flex-col justify-between group/card transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Product Card Image Frame Layer */}
              <div className="relative w-full aspect-square bg-[#FAFAFA] rounded-xl overflow-hidden flex items-center justify-center p-3">
                
                {/* Floating Heart Switch button tool */}
                <button 
                  type="button"
                  className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <Heart size={13} className="stroke-[2.5]" />
                </button>

                {/* Core image asset component wrapper */}
                <div className="relative w-full h-full transform transition-transform duration-500 group-hover/card:scale-104">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Description & Pricing Metadata stack block element layout */}
              <div className="pt-3 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1">
                  <Link href={`/shop/${item.id}`} className="block">
                    <h3 className="text-[12px] font-black text-slate-700 tracking-tight leading-snug line-clamp-2 min-h-[32px] uppercase font-montserrat group-hover/card:text-[#149fcd] transition-colors" title={item.name}>
                      {item.name}
                    </h3>
                  </Link>

                  <p className="text-[14px] font-black text-[#149fcd] tracking-tight pt-0.5">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}