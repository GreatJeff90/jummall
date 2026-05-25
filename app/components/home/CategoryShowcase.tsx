'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/app/hooks/useEcosystem";

// Fallback image map keeping the luxury minimalist asset matching fully synchronized
const categoryStaticAssets: Record<string, string> = {
  "electronics": "/electronics-category-img.png",
  "mobile-phones": "/mobile-phones-category-img.png",
  "computers": "/computers-category-img.png",
  "tablets": "/tablets-product-category-img.png",
  "phones-tablets": "/phone-tablets.png",
  "gaming": "/gaming-category-img.png",
  "kitchen": "/kitchen-items-category-img.png",
  "fashion": "/chic-accessories-on-white-background.png",
  "phone-accessories": "/phone-accessories-category-img.png",
};

export default function CategoryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Stream true categories and product quantities directly from the server cache rails
  const { data: serverCategories = [], isLoading } = useCategories();

  // Screen constraint observer handling breakpoints smoothly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(3);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, serverCategories.length - visibleCards);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (isLoading && serverCategories.length === 0) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center gap-2 bg-[#f3f5f7] select-none">
        <Loader2 size={24} className="animate-spin text-[#149FCD]" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hydrating marketplace categories...</span>
      </div>
    );
  }

  return (
    <section className="bg-[#f3f5f7] py-16 px-4 relative group">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Slider Arrow Controls */}
        {serverCategories.length > visibleCards && (
          <>
            <button 
              type="button"
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 p-2.5 rounded-full text-slate-500 hover:bg-[#149fcd] hover:text-white hover:border-[#149fcd] transition-all shadow-md opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="stroke-[2.5]" />
            </button>
            <button 
              type="button"
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 p-2.5 rounded-full text-slate-500 hover:bg-[#149fcd] hover:text-white hover:border-[#149fcd] transition-all shadow-md opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Viewport Mask */}
        <div className="overflow-hidden w-full py-2">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-8 md:gap-12 lg:gap-16"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` 
            }}
          >
            {serverCategories.map((cat) => {
              // Gracefully default to fallback placeholder assets if a new slug is discovered
              const staticImage = categoryStaticAssets[cat.slug] || "/placeholder-product.png";
              
              return (
                <div 
                  key={cat.slug}
                  className="shrink-0 flex justify-center"
                  style={{ 
                    width: `calc(${100 / visibleCards}% - ${(16 * (visibleCards - 1)) / visibleCards}px)` 
                  }}
                >
                  <Link 
                    href={`/categories/${cat.slug}`}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-sky-200/50 border border-slate-100/60">
                      <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
                        <Image
                          src={staticImage}
                          alt={cat.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </div>

                    <div className="mt-6 text-center select-none">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors tracking-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                        {cat.product_count} {cat.product_count === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}