'use client';

import React from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CategoryShowcase from "../components/home/CategoryShowcase";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import ShopSidebar from "../components/shop/ShopSidebar";
import BrandSlider from "../components/shop/BrandSlider";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", 
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const stateFilter = searchParams.get('state') || '';

  const handleStateChange = (newState: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newState) params.set('state', newState);
    else params.delete('state');
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="bg-white min-h-screen">
      
      {/* --- BREADCRUMB HEADER --- */}
      <div className="relative h-64 md:h-32 w-full flex items-center overflow-hidden select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Products Hub Directory Hero Backdrop" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 text-left flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] font-montserrat uppercase">Products</h1>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
              Home <span className="text-slate-300 font-medium">/</span> <span className="text-sky-600">Products</span>
            </p>
          </div>

          {/* State Filter Dropdown */}
          <select 
            value={stateFilter} 
            onChange={(e) => handleStateChange(e.target.value)}
            className="bg-white border border-slate-200 px-4 py-2 rounded-sm text-xs font-bold text-slate-700 outline-none focus:border-[#149fcd] shadow-sm"
          >
            <option value="">All States</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s} {s !== "FCT" ? "State" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <BrandSlider />
      <CategoryShowcase />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 shrink-0">
            <ShopSidebar />
          </aside>

          <div className="w-full lg:w-3/4">
            {/* Pass the state filter down to your grid component */}
            <ShopProductGrid state={stateFilter} />
          </div>
        </div>
      </section>
    </main>
  );
}