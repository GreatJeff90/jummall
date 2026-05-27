'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mainCarouselSlides = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    subtitle: "EXCLUSIVE OFFER · THIS WEEK ONLY",
    description: "Titanium build. A17 Pro. Now with escrow protection on every order — pay only when you confirm delivery.",
    price: "₦2,559,000",
    oldPrice: "₦2,899,000",
    discount: "-10%",
    buttonText: "Shop now",
    secondaryButtonText: "View all phones",
    image: "/iPhone 15 Pro Max.png",
    glowImage: "/div.hero-main__media-glow.png",
    bgColor: "bg-[#0A323D]", // Premium dark luxury teal base matching your frame
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Sound Ecosystems",
    subtitle: "NEXT-GEN AUDIO DECK",
    description: "Immersive active noise cancellation with ultra-low latency response vectors. Secure escrow marketplace logistics.",
    price: "₦185,000",
    oldPrice: "₦230,000",
    discount: "-20%",
    buttonText: "Shop now",
    secondaryButtonText: "View all audio",
    image: "/Smartwatches.png",
    glowImage: "/div.hero-main__media-glow.png",
    bgColor: "bg-[#0b2228]",
    textColor: "text-white",
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === mainCarouselSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? mainCarouselSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 select-none font-sans">
      <div className="flex flex-col lg:flex-row gap-5 h-auto lg:h-[530px] w-full">
        
        {/* ================= LEFT SIDE: 3/4 INTERACTIVE CAROUSEL ================= */}
        <div className="w-full lg:w-[70%] relative rounded-[32px] overflow-hidden group/slider h-[400px] sm:h-[480px] lg:h-full shrink-0">
          {mainCarouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center p-8 sm:p-12 md:p-16 ${
                slide.bgColor
              } ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"}`}
            >
              
              {/* Bottom Right Sky-Blue Accent Swoosh cut-out mirroring your design */}
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#149fcd]/20 blur-2xl pointer-events-none z-0" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#149fcd] opacity-90 pointer-events-none z-0 hidden md:block" />

              <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-6 h-full relative z-20">
                
                {/* Text Content Block */}
                <div className="md:col-span-7 flex flex-col justify-center text-left h-full">
                  <span className="inline-block bg-white text-[#0A323D] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase w-fit mb-6 shadow-xs">
                    {slide.subtitle}
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.02] tracking-tight text-white font-montserrat uppercase mb-4 drop-shadow-sm">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-slate-300/90 font-medium leading-relaxed max-w-md mb-6 md:mb-8">
                    {slide.description}
                  </p>

                  {/* Price Tag Layer Badge Layout */}
                  <div className="flex items-center gap-4 bg-black/20 border border-white/10 px-5 py-3 rounded-2xl w-fit mb-8 shadow-inner">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">From</span>
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">{slide.price}</span>
                    <span className="text-xs text-slate-400/60 line-through font-semibold">{slide.oldPrice}</span>
                    <span className="text-xs text-white/90 bg-white/10 px-2 py-0.5 rounded-md font-black">{slide.discount}</span>
                  </div>
                  
                  {/* Action Link Buttons */}
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/shop"
                      className="bg-[#149fcd] hover:bg-[#118eb8] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-md active:scale-98 flex items-center gap-2"
                    >
                      {slide.buttonText} <span>→</span>
                    </Link>
                    <Link 
                      href="/shop?category=phones"
                      className="border border-white/20 hover:border-white text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white/5"
                    >
                      {slide.secondaryButtonText}
                    </Link>
                  </div>
                </div>

                {/* ================= PREMIUM CIRCULAR CANVAS COMPONENT WITH CLEAN ROUNDED PHONE MASK ================= */}
                <div className="hidden md:flex md:col-span-5 relative h-full w-full items-center justify-center">
                  <div className="relative w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden flex items-center justify-center border border-white/5 bg-black/10 shadow-2xl">
                    
                    {/* Background Layer: Glow Map Graphic */}
                    <div className="absolute inset-0 w-full h-full z-0 mix-blend-screen scale-105">
                      <Image
                        src={slide.glowImage}
                        alt="Media Glow Track"
                        fill
                        className="object-cover"
                        unoptimized
                        priority
                      />
                    </div>

                    {/* Foreground Layer: Clean Phone Canvas explicitly clipped with rounded border settings */}
                    <div className="relative w-[85%] h-[85%] z-10 transform transition-transform duration-700 hover:scale-103 rounded-[32px] overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.55)] rounded-[32px]"
                        unoptimized
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Slider Chevrons */}
          <button 
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-md border border-white/5 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 shadow-xl"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-md border border-white/5 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 shadow-xl"
          >
            <ChevronRight size={16} className="stroke-[3]" />
          </button>

          {/* Progress Indicator Dots */}
          <div className="absolute bottom-6 left-8 z-30 flex gap-2">
            {mainCarouselSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 transition-all rounded-full duration-500 ${
                  current === i ? "w-8 bg-white" : "w-3 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE: LUXURY LIGHT MODE STACKED SIDE DECKS ================= */}
        <div className="w-full lg:w-[27%] flex flex-col sm:flex-row lg:flex-col gap-5 h-auto lg:h-full shrink-0">
          
          {/* TOP CARD: SMARTWATCHES */}
          <div className="flex-1 bg-[#E2F2F7] rounded-[32px] p-6 sm:p-8 flex flex-row items-center relative overflow-hidden group/card border border-sky-100/50 min-h-[175px] lg:h-1/2 shadow-xs">
            <div className="w-[55%] flex flex-col justify-center text-left relative z-20">
              <span className="text-[10px] font-black tracking-wider text-[#0284c7] bg-white/70 px-2.5 py-1 rounded-md uppercase w-fit mb-3">
                Up to 35% Off
              </span>
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-800 font-montserrat uppercase mb-5 max-w-[150px]">
                Smartwatches that keep up.
              </h3>
              <Link 
                href="/shop?category=smartwatches" 
                className="bg-white hover:bg-[#149fcd] text-slate-800 hover:text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-1.5 w-fit group shadow-2xs border border-slate-100"
              >
                Shop now <span>→</span>
              </Link>
            </div>
            
            <div className="w-[45%] h-full relative flex items-center justify-end z-10">
              <div className="relative w-full h-[115px] sm:h-[130px] lg:h-[135px] transition-transform duration-500 group-hover/card:scale-105 group-hover/card:-rotate-2">
                <Image 
                  src="/Smartwatches.png" 
                  alt="Premium Luxury Smartwatch Display" 
                  fill 
                  className="object-contain" 
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* BOTTOM CARD: NOTEBOOKS */}
          <div className="flex-1 bg-[#F2EDE4] rounded-[32px] p-6 sm:p-8 flex flex-row items-center relative overflow-hidden group/card border border-amber-100/40 min-h-[175px] lg:h-1/2 shadow-xs">
            <div className="w-[55%] flex flex-col justify-center text-left relative z-20">
              <span className="text-[10px] font-black tracking-wider text-amber-800 bg-white/70 px-2.5 py-1 rounded-md uppercase w-fit mb-3">
                Up to 10% Off
              </span>
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-800 font-montserrat uppercase mb-5 max-w-[150px]">
                Notebooks built for big work.
              </h3>
              <Link 
                href="/shop?category=computers" 
                className="bg-white hover:bg-amber-800 text-slate-800 hover:text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-1.5 w-fit group shadow-2xs border border-slate-100"
              >
                Shop now <span>→</span>
              </Link>
            </div>

            <div className="w-[45%] h-full relative flex items-center justify-end z-10">
              <div className="relative w-full h-[115px] sm:h-[130px] lg:h-[135px] transition-transform duration-500 group-hover/card:scale-105 group-hover/card:translate-y-0.5">
                <Image 
                  src="/Notebooks.png" 
                  alt="Slim Pro Notebook Workstation Layout Display" 
                  fill 
                  className="object-contain" 
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}