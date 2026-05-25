'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    count: 5,
    image: "/electronics-category-img.png", 
    href: "/categories/electronics",
  },
  {
    name: "Mobile Phones",
    count: 0,
    image: "/mobile-phones-category-img.png", 
    href: "/categories/mobile-phones",
  },
  {
    name: "Computers",
    count: 3,
    image: "/computers-category-img.png",
    href: "/categories/computers",
  },
  {
    name: "Tablets",
    count: 0,
    image: "/tablets-product-category-img.png",
    href: "/categories/tablets",
  },
  {
    name: "Phones & Tablets",
    count: 16,
    image: "/phone-tablets.png",
    href: "/categories/phones-tablets",
  },
  {
    name: "Gaming",
    count: 0,
    image: "/gaming-category-img.png",
    href: "/categories/gaming",
  },
  {
    name: "Kitchen Items",
    count: 0,
    image: "/kitchen-items-category-img.png", 
    href: "/categories/kitchen",
  },
  {
    name: "Fashion Items",
    count: 69,
    image: "/chic-accessories-on-white-background.png",
    href: "/categories/fashion",
  },
  {
    name: "Phone Accessories",
    count: 16,
    image: "/phone-accessories-category-img.png",
    href: "/categories/phone-accessories",
  },
];

export default function CategoryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

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

  const maxIndex = categories.length - visibleCards;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="bg-[#f3f5f7] py-16 px-4 relative group">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Slider Arrow Controls */}
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

        {/* Viewport Mask */}
        <div className="overflow-hidden w-full py-2">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-8 md:gap-12 lg:gap-16"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` 
            }}
          >
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="shrink-0 flex justify-center"
                style={{ 
                  width: `calc(${100 / visibleCards}% - ${(16 * (visibleCards - 1)) / visibleCards}px)` 
                }}
              >
                <Link 
                  href={cat.href}
                  className="flex flex-col items-center group text-center"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#E1F1FF] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-sky-200/50">
                    <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="text-lg md:text-xl text-slate-800 group-hover:text-sky-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 font-medium">
                      {cat.count} {cat.count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}