'use client';

import React, { useState } from "react";
import { Star, Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/app/hooks/useEcosystem";

// --- 1. DYNAMIC TIMELINE TABS CONFIGURATION ---
const timelineTabs = [
  { label: "This Week", slug: "week" },
  { label: "This Month", slug: "month" },
  { label: "All Time", slug: "all" }
];

// --- 2. HIGH-FIDELITY LUXURY PREVIEW DECK (MATCHING ATTACHED DESIGN IMAGES) ---
const fallbackBestSellers = [
  {
    id: "bs-1",
    name: "Apple AirPods Pro 2 with MagSafe Charging Case",
    price: 275000,
    oldPrice: 425000,
    rating: 4.8,
    reviews: "1.2k",
    merchant: "Tunde Audio",
    isFreeShipping: true,
    image: "/slider-3.png"
  },
  {
    id: "bs-2",
    name: "Nike Air Force 1 '07 Triple White Leather",
    price: 98500,
    oldPrice: null,
    rating: 4.6,
    reviews: "892",
    merchant: "Soles Lagos",
    isFreeShipping: false,
    image: "/chic-accessories-on-white-background.png"
  },
  {
    id: "bs-3",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 389000,
    oldPrice: 520000,
    rating: 4.9,
    reviews: "2.1k",
    merchant: "Tunde Audio",
    isFreeShipping: true,
    image: "/Smartwatches.png"
  },
  {
    id: "bs-4",
    name: "Vitamin C Brightening Serum 30ml — Glass Skin",
    price: 24500,
    oldPrice: null,
    rating: 4.8,
    reviews: "1.5k",
    merchant: "Glow VI",
    isFreeShipping: false,
    image: "/phone-accessories-category-img.png"
  },
  {
    id: "bs-5",
    name: "Hand-stitched Leather Tote — Camel Tan",
    price: 149000,
    oldPrice: null,
    rating: 4.9,
    reviews: "87",
    merchant: "Adérónkẹ́",
    isFreeShipping: true,
    image: "/chic-accessories-on-white-background.png"
  },
  {
    id: "bs-6",
    name: "Samsung 55\" Q70C QLED 4K Smart TV",
    price: 895000,
    oldPrice: null,
    rating: 4.7,
    reviews: "340",
    merchant: "VividHome",
    isFreeShipping: true,
    image: "/electronics-category-img.png"
  },
  {
    id: "bs-7",
    name: "Galaxy Watch 6 Classic 47mm Bluetooth",
    price: 275000,
    oldPrice: 425000,
    rating: 4.8,
    reviews: "520",
    merchant: "TimeKept",
    isFreeShipping: false,
    image: "/computers-category-img.png"
  },
  {
    id: "bs-8",
    name: "Tom Ford Black Orchid EDP 100ml",
    price: 298000,
    oldPrice: null,
    rating: 4.9,
    reviews: "445",
    merchant: "Olfact Lagos",
    isFreeShipping: true,
    image: "/kitchen-items-category-img.png"
  }
];

export default function BestSellers() {
  const [activeTimeline, setActiveTimeline] = useState("week");

  // Consume live custom store queries reactively
  const { data: serverProducts, isLoading } = useProducts({ tag: "best-seller" });

  // Safe mapping sequence over payload arrays safely avoiding linting explicit anomalies
  const activeFeedList = serverProducts && Array.isArray(serverProducts) && serverProducts.length > 0
    ? (serverProducts as Array<{
        id?: string;
        _id?: string;
        name: string;
        price: number;
        compare_at_price?: number;
        rating_average?: number;
        reviews_count?: number;
        sku?: string;
        image_url?: string;
      }>).map((p) => ({
        id: p.id || p._id || "",
        name: p.name,
        price: p.price,
        oldPrice: p.compare_at_price || null,
        rating: p.rating_average || 5.0,
        reviews: p.reviews_count ? p.reviews_count >= 1000 ? `${(p.reviews_count / 1000).toFixed(1)}k` : String(p.reviews_count) : "0",
        merchant: p.sku && p.sku.includes("-") ? p.sku.split("-")[1] : "Verified Vendor",
        isFreeShipping: p.price >= 120000,
        image: p.image_url || "/placeholder-product.png"
      }))
    : fallbackBestSellers;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans select-none text-left">
      
      {/* ================= HEADER AND TIMELINE FILTER CONTAINER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-slate-100/60">
        <div>
          <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
            What Nigeria Is Buying
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none uppercase">
            Best sellers.
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2">
            The most-ordered items across the marketplace, refreshed in real time.
          </p>
        </div>

        {/* Premium capsule pill-switcher row matching reference specifications */}
        <div className="bg-[#F1F3F5] p-1.5 rounded-full flex items-center shadow-3xs w-fit">
          {timelineTabs.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveTimeline(tab.slug)}
              className={`text-[11px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeTimeline === tab.slug
                  ? "bg-white text-[#149fcd] shadow-2xs font-black"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MATRIX PRODUCT RENDERING GRID ================= */}
      {isLoading ? (
        <div className="w-full h-80 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin text-[#149fcd] mb-3" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest">Sorting hot trade pipelines...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeFeedList.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-[24px] border border-slate-100/70 p-4 flex flex-col justify-between group/card transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Product Layout Graphics Area Row */}
              <div className="relative w-full aspect-square bg-[#FAFAFA] rounded-2xl overflow-hidden flex items-center justify-center p-4">
                
                {/* Wishlist floating heart component */}
                <button 
                  type="button"
                  className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <Heart size={14} className="stroke-[2.5]" />
                </button>

                {/* Core item photo asset wrapper component */}
                <div className="relative w-full h-full transform transition-transform duration-500 group-hover/card:scale-104">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Descriptions & Identity Meta Stack Block */}
              <div className="pt-4 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  
                  {/* Verified Store Node Line */}
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    Sold by <span className="text-slate-500 font-black hover:underline cursor-pointer">{product.merchant}</span>
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full flex items-center justify-center text-white p-0.5 shadow-3xs"><div className="w-0.5 h-1 border-r border-b border-white rotate-45 mb-0.5" /></div>
                  </span>

                  {/* Main Product Linkable Header */}
                  <Link href={`/shop/${product.id}`} className="block">
                    <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-snug line-clamp-2 min-h-[36px] uppercase font-montserrat group-hover/card:text-[#149fcd] transition-colors" title={product.name}>
                      {product.name}
                    </h3>
                  </Link>

                  {/* Interactive Rating Metric Nodes */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={`fill-current ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Pricing Fields Grid Wrapper */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-[#149fcd] tracking-tight">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        ₦{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Shipping Badge Row */}
                <div className="h-5 flex items-center mt-3">
                  {product.isFreeShipping && (
                    <div className="bg-[#E6F4EA] text-[#10B981] text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md flex items-center gap-1 w-fit border border-emerald-100/50 select-none">
                      🚚 Free shipping
                    </div>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}