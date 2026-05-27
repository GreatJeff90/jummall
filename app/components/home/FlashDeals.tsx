'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Star, Flame, ChevronRight, Loader2, ShoppingCart, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// --- 1. SCHEMAS AND INTERFACES FOR ACTIVE PROMOTIONS ---
interface ProductImage {
  object_name: string;
  url: string;
  is_main: boolean;
}

interface ProductPromotion {
  discount_percent: number;
  starts_at: string;
  ends_at: string;
  label: string;
}

interface PromotionProductItem {
  _id: string;
  seller_id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  compare_at_price: number;
  sku: string;
  stock: number;
  low_stock_threshold: number;
  tags: string[];
  images: ProductImage[];
  promotion: ProductPromotion;
  sold: number;
  rating: number;
  review_count: number;
  is_ad?: boolean;
}

interface APIPromotionsResponse {
  items: PromotionProductItem[];
  page: number;
  page_size: number;
  total: number;
  has_more: boolean;
}

// --- 2. PREMIUM 5-ITEM FALLBACK DATA ARRAY ---
const staticFallbackDeals: PromotionProductItem[] = [
  {
    _id: "fb-1",
    seller_id: "s-1",
    name: "Apple AirPods Pro 2 with MagSafe Charging Case",
    description: "Premium dynamic track acoustics audio systems.",
    category: "electronics",
    condition: "new",
    price: 275000,
    compare_at_price: 425000,
    sku: "SKU-Tunde Audio",
    stock: 200,
    low_stock_threshold: 10,
    tags: ["flash"],
    images: [{ object_name: "airpods", url: "/slider-3.png", is_main: true }],
    promotion: { discount_percent: 35, starts_at: "2026-05-27T00:00:00.000Z", ends_at: "2026-05-28T23:59:59.000Z", label: "Hot" },
    sold: 142,
    rating: 4.8,
    review_count: 1200
  },
  {
    _id: "fb-2",
    seller_id: "s-2",
    name: "PlayStation 5 Slim Disc Edition Console Bundle",
    description: "Next generation compute gaming architecture console rails.",
    category: "gaming",
    condition: "new",
    price: 649000,
    compare_at_price: 830000,
    sku: "SKU-GameStop NG",
    stock: 100,
    low_stock_threshold: 5,
    tags: ["flash"],
    images: [{ object_name: "ps5", url: "/slider-2.png", is_main: true }],
    promotion: { discount_percent: 22, starts_at: "2026-05-27T00:00:00.000Z", ends_at: "2026-05-28T23:59:59.000Z", label: "Hot" },
    sold: 88,
    rating: 4.9,
    review_count: 3400
  },
  {
    _id: "fb-3",
    seller_id: "s-3",
    name: "Nike Air Force 1 '07 — Triple White Leather",
    description: "Premium leather sneaker culture footwear line classic.",
    category: "fashion",
    condition: "new",
    price: 98500,
    compare_at_price: 120000,
    sku: "SKU-Soles Lagos",
    stock: 200,
    low_stock_threshold: 15,
    tags: ["flash"],
    images: [{ object_name: "af1", url: "/chic-accessories-on-white-background.png", is_main: true }],
    promotion: { discount_percent: 18, starts_at: "2026-05-27T00:00:00.000Z", ends_at: "2026-05-28T23:59:59.000Z", label: "Hot" },
    sold: 108,
    rating: 4.6,
    review_count: 892
  },
  {
    _id: "fb-4",
    seller_id: "s-4",
    name: "Sony Alpha A7 IV Mirrorless Camera with 28-70mm Lens",
    description: "High-end content creation professional photography rig.",
    category: "electronics",
    condition: "new",
    price: 1489000,
    compare_at_price: 2480000,
    sku: "SKU-Frame VI",
    stock: 25,
    low_stock_threshold: 2,
    tags: ["flash"],
    images: [{ object_name: "sony-camera", url: "/electronics-category-img.png", is_main: true }],
    promotion: { discount_percent: 40, starts_at: "2026-05-27T00:00:00.000Z", ends_at: "2026-05-28T23:59:59.000Z", label: "Hot" },
    sold: 22,
    rating: 5.0,
    review_count: 214
  },
  {
    _id: "fb-5",
    seller_id: "s-5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry leading noise-cancelling luxury audio soundstage.",
    category: "electronics",
    condition: "new",
    price: 389000,
    compare_at_price: 520000,
    sku: "SKU-Tunde Audio",
    stock: 200,
    low_stock_threshold: 20,
    tags: ["flash"],
    images: [{ object_name: "sony-headphones", url: "/Smartwatches.png", is_main: true }],
    promotion: { discount_percent: 25, starts_at: "2026-05-27T00:00:00.000Z", ends_at: "2026-05-28T23:59:59.000Z", label: "Hot" },
    sold: 128,
    rating: 4.9,
    review_count: 2100
  }
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });

  // --- 3. FETCH LIVE PROMOTIONS DIRECT FROM BACKEND ---
  const { data: promotionsData, isLoading } = useQuery<APIPromotionsResponse>({
    queryKey: ['activePromotions'],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/promotions/active`, {
        params: { page: 1, page_size: 10 }
      });
      return response.data;
    },
    staleTime: 30000,
    retry: 1
  });

  const activeDeals = promotionsData?.items && promotionsData.items.length > 0 
    ? promotionsData.items 
    : staticFallbackDeals;

  // --- 4. RUNTIME DYNAMIC COUNTDOWN ENGINE TIMER ---
  useEffect(() => {
    const targetEndString = activeDeals[0]?.promotion?.ends_at || "2026-05-28T23:59:59.000Z";
    const targetTime = new Date(targetEndString).getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      setTimeLeft({
        hours: hrs < 10 ? `0${hrs}` : `${hrs}`,
        minutes: mins < 10 ? `0${mins}` : `${mins}`,
        seconds: secs < 10 ? `0${secs}` : `${secs}`
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeDeals]);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full bg-[#1A3D46] rounded-[32px] p-12 flex flex-col items-center justify-center min-h-[350px]">
          <Loader2 className="animate-spin text-[#FFB921] mb-4" size={36} />
          <p className="text-sm font-bold text-white uppercase tracking-widest">Loading Live Promotional Grid...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans select-none">
      <div className="w-full bg-[#1A3D46] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        
        {/* Decorative lighting accents */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* ================= HEADER TIMERS ROW ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 border-b border-white/10 relative z-20 text-left">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Flame size={12} className="text-orange-400 fill-orange-400" /> Flash Deals
            </span>
            
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-white uppercase tracking-tight">
                Ends in
              </h2>
              <div className="flex items-center gap-2 text-white font-montserrat font-black text-xl sm:text-2xl">
                <span className="bg-[#FFB921] text-slate-900 px-3 py-1.5 rounded-xl shadow-md">{timeLeft.hours}</span>
                <span className="text-[#FFB921] animate-pulse">:</span>
                <span className="bg-[#FFB921] text-slate-900 px-3 py-1.5 rounded-xl shadow-md">{timeLeft.minutes}</span>
                <span className="text-[#FFB921] animate-pulse">:</span>
                <span className="bg-[#FFB921] text-slate-900 px-3 py-1.5 rounded-xl shadow-md">{timeLeft.seconds}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-300/80">
              New deals every Friday at midnight. Once they&apos;re gone, they&apos;re gone.
            </p>
          </div>

          <Link 
            href="/shop?filter=flash-promotions" 
            className="w-fit bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-widest uppercase border border-white/10 px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all backdrop-blur-xs shadow-sm"
          >
            See all deals <ChevronRight size={14} className="stroke-[3]" />
          </Link>
        </div>

        {/* ================= DYNAMIC 5-COLUMN PRODUCT CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-10 relative z-20">
          {activeDeals.map((item) => {
            const hasImg = item.images && item.images.length > 0;
            const productImgPath = hasImg ? item.images.find(img => img.is_main)?.url || item.images[0].url : "/placeholder-product.png";
            
            const totalCap = item.stock || 100;
            const percentSold = Math.min(100, Math.floor((item.sold / totalCap) * 100));
            const isAlmostGone = percentSold >= 75;

            // Extract merchant naming logic directly from SKU tracking roots
            const merchantName = item.sku && item.sku.includes('-') ? item.sku.split('-')[1] : "Official Merchant";

            return (
              <div 
                key={item._id}
                className="bg-white rounded-[24px] p-4 flex flex-col justify-between group/card transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-slate-100"
              >
                <div className="relative w-full aspect-square bg-[#F8F9FA] rounded-2xl overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1 bg-[#FFB921] px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-slate-900 tracking-wide">
                    <Flame size={10} className="fill-slate-900 stroke-none" /> {item.promotion?.label || "Hot"}
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-30 bg-[#EF4444] px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-white tracking-wide">
                    -{item.promotion?.discount_percent || 10}%
                  </div>

                  <button 
                    type="button"
                    className="absolute bottom-2.5 right-2.5 z-30 w-8 h-8 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center transition-all shadow-md active:scale-95"
                  >
                    <Heart size={15} className="stroke-[2.5]" />
                  </button>

                  <div className="relative w-full h-full transform transition-transform duration-500 group-hover/card:scale-105">
                    <Image src={productImgPath} alt={item.name} fill className="object-contain" unoptimized />
                  </div>
                </div>

                <div className="pt-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      Sold by <span className="text-slate-600 font-black hover:underline cursor-pointer">{merchantName}</span>
                      <CheckCircle size={10} className="text-sky-500 fill-sky-500 text-white stroke-[2.5]" />
                    </span>

                    <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-tight tracking-tight min-h-[36px] line-clamp-2 uppercase font-montserrat" title={item.name}>
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className={`fill-current ${i < Math.floor(item.rating || 5) ? 'text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.rating || 5.0} ({item.review_count || 0})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-black text-[#149fcd] tracking-tight">
                        ₦{(item.price || 0).toLocaleString()}
                      </span>
                      {item.compare_at_price > item.price && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ₦{item.compare_at_price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Progress Loader Progress Indicators */}
                    <div className="space-y-1 pt-2">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${isAlmostGone ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-cyan-500 to-sky-500'}`}
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                      <p className={`text-[10px] font-black uppercase tracking-wide ${isAlmostGone ? 'text-red-500' : 'text-slate-400'}`}>
                        {item.sold} / {totalCap} Sold {isAlmostGone && '— Almost gone!'}
                      </p>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="w-full h-11 mt-5 bg-[#149fcd] hover:bg-[#118eb8] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <ShoppingCart size={13} className="stroke-[2.5]" /> Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}