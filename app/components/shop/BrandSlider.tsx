'use client';

import { useState } from 'react';
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
  const itemsToShow = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 > brands.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? brands.length - itemsToShow : prev - 1
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative group">
      <div className="border border-slate-100 flex items-center bg-white overflow-hidden h-32 relative">
        
        {/* Left Navigation Button */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 z-20 w-10 h-12 bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Brand Items Container */}
        <div className="flex w-full items-center">
          {brands.slice(currentIndex, currentIndex + itemsToShow).map((brand) => (
            <div 
              key={brand.name} 
              className="flex-1 min-w-[20%] h-32 flex items-center justify-center border-r border-slate-50 last:border-r-0 p-6"
            >
              <div className="relative w-full h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={nextSlide}
          className="absolute right-0 z-20 w-10 h-12 bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#149fcd] transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}