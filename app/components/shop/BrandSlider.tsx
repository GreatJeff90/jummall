'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const brands = [
  { name: 'Hisense', logo: '/hisense-logo.png' },
  { name: 'EcoFlow', logo: '/ecoflow-logo.png' },
  { name: 'Sony', logo: '/sony-logo.png' },
  { name: 'Canon', logo: '/canon-logo.png' },
  { name: 'Skyrun', logo: '/skyrun-logo.png' },
  { name: 'Apple', logo: '/apple-logo.png' },
  { name: 'PlayStation', logo: '/playstation-logo.png' },
  { name: 'Oraimo', logo: '/oraimo-logo.png' },
  { name: 'Samsung', logo: '/samsung-logo.png' },
  { name: 'SilverCrest', logo: '/silvercrest-logo.png' },
  { name: 'Boscon', logo: '/boscon-logo.png' },
];

export default function BrandSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  // Dynamically switch card columns to preserve aspect ratios on tight screens
  useEffect(() => {
    const handleSliderResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(5);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3);
      } else {
        setVisibleItems(2);
      }
    };

    handleSliderResize();
    window.addEventListener('resize', handleSliderResize);
    return () => window.removeEventListener('resize', handleSliderResize);
  }, []);

  const maxIndex = brands.length - visibleItems;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative group select-none">
      <div className="border border-slate-100 bg-white rounded-sm overflow-hidden h-32 relative shadow-2xs">
        
        {/* Left Navigation Control Slider Button */}
        <button 
          type="button"
          onClick={prevSlide}
          className="absolute left-0 top-0 bottom-0 z-20 w-10 bg-white/95 border-r border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] transition-colors focus:outline-none shadow-sm md:opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous brands"
        >
          <ChevronLeft size={20} className="stroke-[2.5]" />
        </button>

        {/* Dynamic Transforming Rail Track Viewport Mask */}
        <div className="overflow-hidden w-full h-full flex items-center px-10">
          <div 
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` 
            }}
          >
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="shrink-0 h-32 flex items-center justify-center border-r border-slate-50/60 last:border-r-0 p-6"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="relative w-full h-10 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Authorized Partner Brand Logo`}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Control Slider Button */}
        <button 
          type="button"
          onClick={nextSlide}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-white/95 border-l border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] transition-colors focus:outline-none shadow-sm md:opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next brands"
        >
          <ChevronRight size={20} className="stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}