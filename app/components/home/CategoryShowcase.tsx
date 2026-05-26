'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/app/hooks/useEcosystem";
import { Skeleton } from "../ui/skeleton/Skeleton";

// Fallback image map keeping the luxury minimalist asset matching fully synchronized
const categoryStaticAssets: Record<string, string> = {
  "electronics": "electronics-category-img.png",
  "mobile-phones": "mobile-phones-category-img.png",
  "computers": "computers-category-img.png",
  "tablets": "tablets-product-category-img.png",
  "phones-tablets": "phone-tablets.png",
  "gaming": "gaming-category-img.png",
  "kitchen": "kitchen-items-category-img.png",
  "fashion": "chic-accessories-on-white-background.png",
  "phone-accessories": "phone-accessories-category-img.png",
};

interface CarouselSkeletonProps {
  visibleCards: number;
}

const CarouselSkeleton = ({ visibleCards }: CarouselSkeletonProps) => (
  <div className="flex gap-8 md:gap-12 lg:gap-16 w-full overflow-hidden animate-pulse">
    {Array.from({ length: visibleCards }).map((_, i) => (
      <div 
        key={i} 
        className="shrink-0 flex flex-col items-center text-center"
        style={{ 
          width: `calc(${100 / visibleCards}% - ${(16 * (visibleCards - 1)) / visibleCards}px)` 
        }}
      >
        <Skeleton className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white border border-slate-100" />
        <div className="mt-6 flex flex-col items-center space-y-2 w-full">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default function CategoryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const { data: serverCategories = [], isLoading } = useCategories();

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

  return (
    <section className="bg-[#f3f5f7] py-16 px-4 relative group">
      <div className="max-w-7xl mx-auto relative">
        
        {!isLoading && serverCategories.length > visibleCards && (
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

        <div className="overflow-hidden w-full py-2">
          {isLoading && serverCategories.length === 0 ? (
            <CarouselSkeleton visibleCards={visibleCards} />
          ) : (
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8 md:gap-12 lg:gap-16"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` 
              }}
            >
              {serverCategories.map((cat) => {
                // Enforce case-insensitive slug normalized fallback lookups 
                const normalizedSlug = String(cat.slug || "").toLowerCase().trim();
                const matchedFileName = categoryStaticAssets[normalizedSlug];
                
                // Construct clean base path string dynamically avoiding internal directory overrides
                const staticImage = matchedFileName ? `/${matchedFileName}` : "/placeholder-product.png";
                
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
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-sky-200/50 border border-slate-100/60 shrink-0">
                        <Image
                          src={staticImage}
                          alt={cat.name}
                          width={120}
                          height={120}
                          className="object-contain p-1 transition-transform duration-500 group-hover:scale-110 md:w-[140px] md:h-[140px]"
                          unoptimized // Bypasses internal Vercel/Next caching proxy configurations during rapid layout builds
                          priority
                        />
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
          )}
        </div>

      </div>
    </section>
  );
}