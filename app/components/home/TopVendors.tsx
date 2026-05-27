'use client';

import { Star, MapPin, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// --- 1. SCHEMAS AND INTERFACES FOR VENDORS DATA ---
interface VendorPreviewProduct {
  id: string;
  image_url: string;
}

interface VendorItem {
  id: string;
  name: string;
  avatar_url: string;
  banner_url: string;
  location: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  recent_products: VendorPreviewProduct[];
}

// --- 2. HIGH-FIDELITY LUXURY FALLBACK STATIC DATA DECK ---
const fallbackVendors: VendorItem[] = [
  {
    id: "v-1",
    name: "Tunde Audio",
    avatar_url: "/profile.jpg", // Updated profile asset location
    banner_url: "/chic-accessories-on-white-background.png",
    location: "Lagos, Surulere",
    rating: 4.9,
    review_count: 2400,
    is_verified: true,
    recent_products: [
      { id: "p-1a", image_url: "/slider-3.png" },
      { id: "p-1b", image_url: "/Smartwatches.png" },
      { id: "p-1c", image_url: "/iPhone 15 Pro Max.png" }
    ]
  },
  {
    id: "v-2",
    name: "Adérónkẹ́ Atelier",
    avatar_url: "/profile.jpg", // Updated profile asset location
    banner_url: "/chic-accessories-on-white-background.png",
    location: "Abuja, Maitama",
    rating: 4.8,
    review_count: 1100,
    is_verified: true,
    recent_products: [
      { id: "p-2a", image_url: "/chic-accessories-on-white-background.png" },
      { id: "p-2b", image_url: "/slider-2.png" },
      { id: "p-2c", image_url: "/phone-accessories-category-img.png" }
    ]
  },
  {
    id: "v-3",
    name: "Glow VI",
    avatar_url: "/profile.jpg", // Updated profile asset location
    banner_url: "/chic-accessories-on-white-background.png",
    location: "Lagos, Victoria Island",
    rating: 4.9,
    review_count: 3100,
    is_verified: true,
    recent_products: [
      { id: "p-3a", image_url: "/phone-accessories-category-img.png" },
      { id: "p-3b", image_url: "/kitchen-items-category-img.png" },
      { id: "p-3c", image_url: "/Smartwatches.png" }
    ]
  },
  {
    id: "v-4",
    name: "VividHome",
    avatar_url: "/profile.jpg", // Updated profile asset location
    banner_url: "/chic-accessories-on-white-background.png",
    location: "Port Harcourt",
    rating: 4.7,
    review_count: 856,
    is_verified: true,
    recent_products: [
      { id: "p-4a", image_url: "/electronics-category-img.png" },
      { id: "p-4b", image_url: "/computers-category-img.png" },
      { id: "p-4c", image_url: "/placeholder-product.png" }
    ]
  }
];

export default function TopVendors() {
  
  // --- 3. BACKEND ROUTE INTEGRATION LAYER ---
  const { data: serverVendors, isLoading } = useQuery<VendorItem[]>({
  queryKey: ["topVendors"],
  queryFn: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/vendors/top`, {
      params: { limit: 4 }
    });
    
    // Explicitly types the incoming array elements instead of using 'any'
    return (response.data as Array<Record<string, unknown>>).map((v) => ({
      ...(v as unknown as VendorItem),
      avatar_url: "/profile.jpg"
    }));
  },
  staleTime: 60000,
  retry: 1
});

  const vendorsList = serverVendors && serverVendors.length > 0 ? serverVendors : fallbackVendors;

  if (isLoading) {
    return (
      <section className="w-full bg-[#FAFAFA] py-24 text-center text-slate-400 font-sans">
        <Loader2 className="animate-spin text-[#149fcd] mx-auto mb-3" size={32} />
        <p className="text-xs font-bold uppercase tracking-widest">Aggregating Merchant Node Ratings...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FAFAFA] py-20 px-4 font-sans select-none text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER ANCHOR SUBSECTION ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
              Loved By Shoppers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none">
              Top vendors this month.
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2">
              Hand-picked, verified sellers shipping nationwide. Every order escrow-protected.
            </p>
          </div>

          <Link 
            href="/vendors" 
            className="shrink-0 border border-slate-200 hover:border-[#149fcd] hover:text-[#149fcd] transition-all text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 bg-white text-slate-600 shadow-3xs"
          >
            Browse all 250+ vendors <ChevronRight size={14} className="stroke-[3]" />
          </Link>
        </div>

        {/* ================= VENDORS BENTO SHELF CONTAINER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendorsList.map((vendor) => {
            const reviewLabel = vendor.review_count >= 1000 
              ? `${(vendor.review_count / 1000).toFixed(1)}k` 
              : vendor.review_count;

            return (
              <div 
                key={vendor.id} 
                className="bg-white rounded-[28px] border border-slate-100/60 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Upper Cover Banner Component Wrapper */}
                  <div className="h-28 w-full relative bg-slate-100">
                    <Image 
                      src={vendor.banner_url} 
                      alt="Merchant Showroom Showcase cover" 
                      fill 
                      className="object-cover brightness-95"
                      unoptimized 
                    />
                    <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                  </div>

                  {/* Profile Identity Overlay Cluster */}
                  <div className="px-6 relative -mt-9 flex flex-col items-start">
                    <div className="w-[72px] h-[72px] rounded-full border-4 border-white bg-slate-200 relative overflow-hidden shadow-sm shrink-0 select-none">
                      <Image 
                        src="/profile.jpg" // Directly lock user layout target to look for profile image parameters
                        alt={vendor.name} 
                        fill 
                        className="object-cover"
                        unoptimized 
                      />
                    </div>

                    {/* Title and Verifications Badges layout row */}
                    <div className="flex items-center gap-1 mt-3 w-full">
                      <h3 className="text-base font-black tracking-tight text-slate-800 font-montserrat truncate max-w-[85%]">
                        {vendor.name}
                      </h3>
                      {vendor.is_verified && (
                        <CheckCircle2 size={14} className="text-sky-500 fill-sky-500 text-white stroke-[2.5] shrink-0" />
                      )}
                    </div>

                    {/* Verified Geographic Markers */}
                    <div className="flex items-center gap-1 text-slate-400 mt-1 select-none">
                      <MapPin size={12} className="text-red-400 fill-red-400/10" />
                      <span className="text-[11px] font-bold tracking-wide">{vendor.location}</span>
                    </div>

                    {/* Analytics Review Stats Rows */}
                    <div className="flex items-center gap-1 mt-2 select-none">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-700 ml-1">
                        {vendor.rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        · {reviewLabel} reviews
                      </span>
                    </div>
                  </div>

                  {/* ================= INTERIOR PRODUCTS ITEM MINI PREVIEW THUMBNAILS ================= */}
                  <div className="px-6 pt-5 grid grid-cols-3 gap-2">
                    {vendor.recent_products?.slice(0, 3).map((prod, idx) => (
                      <div 
                        key={prod.id || idx} 
                        className="aspect-square bg-[#F8F9FA] border border-slate-50 rounded-xl relative overflow-hidden p-1.5 transform transition-transform duration-300 hover:scale-103"
                      >
                        <Image 
                          src={prod.image_url} 
                          alt="Vendor historical trade catalog track snapshot" 
                          fill 
                          className="object-contain p-1"
                          unoptimized 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Route Call Button Anchor Link Footer */}
                <div className="p-6 mt-4">
                  <Link 
                    href={`/vendors/${vendor.id}`} 
                    className="w-full h-11 border border-slate-100 hover:border-[#149fcd] text-slate-700 hover:text-[#149fcd] bg-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-3xs"
                  >
                    Visit store <span>→</span>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}