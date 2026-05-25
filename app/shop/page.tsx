'use client';

import Image from "next/image";
import CategoryShowcase from "../components/home/CategoryShowcase";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import ShopSidebar from "../components/shop/ShopSidebar";
import BrandSlider from "../components/shop/BrandSlider";

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-64 md:h-32 w-full flex items-center overflow-hidden select-none">
        {/* Background Image using fill and object-cover */}
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Products Hub Directory Hero Backdrop" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Ambient overlay for premium contrast readability */}
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] font-montserrat uppercase">
            Products
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300 font-medium">/</span> <span className="text-sky-600">Products</span>
          </p>
        </div>
      </div>

      {/* --- Brand Carousel Segment Rail --- */}
      <BrandSlider />

      {/* --- Category Circle Vectors Row Showcase --- */}
      <CategoryShowcase />

      {/* --- Main Structural Market Dashboard Grid --- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Refactored from <main> into semantic <aside> sidebar element */}
          <aside className="w-full lg:w-1/4 shrink-0">
            <ShopSidebar />
          </aside>

          {/* Refactored from <main> into standard layout <div> content layer block */}
          <div className="w-full lg:w-3/4">
            <ShopProductGrid />
          </div>

        </div>
      </section>
    </main>
  );
}