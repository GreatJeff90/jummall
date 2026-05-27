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
    <section className="max-w-7xl mx-auto px-4 py-4 sm:py-6 select-none font-sans">
      <div className="flex flex-col lg:flex-row gap-5 h-auto lg:h-[530px] w-full">
        
        {/* ================= LEFT SIDE: INTERACTIVE RESPONSIVE CAROUSEL ================= */}
        <div className="w-full lg:w-[70%] relative rounded-[32px] overflow-hidden group/slider min-h-[520px] sm:min-h-[580px] md:h-[480px] lg:h-full shrink-0">
          {mainCarouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center p-6 sm:p-12 md:p-16 ${
                slide.bgColor
              } ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"}`}
            >
              
              {/* Decorative radial lighting gradient halos */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#149fcd]/20 blur-2xl pointer-events-none z-0" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#149fcd] opacity-90 pointer-events-none z-0 hidden md:block" />

              {/* Grid content uses flex-col-reverse on mobile so text always hits first fold layer roots */}
              <div className="w-full flex flex-col-reverse md:grid md:grid-cols-12 items-center gap-6 h-full relative z-20 pt-6 md:pt-0">
                
                {/* Text Content Block */}
                <div className="md:col-span-7 flex flex-col justify-center text-left h-full">
                  <span className="inline-block bg-white text-[#0A323D] px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase w-fit mb-4 md:mb-6 shadow-xs select-none">
                    {slide.subtitle}
                  </span>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-black leading-[1.05] md:leading-[1.02] tracking-tight text-white font-montserrat uppercase mb-3 md:mb-4 drop-shadow-xs">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-slate-300/90 font-semibold leading-relaxed max-w-md mb-5 md:mb-8">
                    {slide.description}
                  </p>

                  {/* Price Tag Layer Badge Layout */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 bg-black/20 border border-white/10 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl w-fit mb-6 md:mb-8 shadow-inner">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">From</span>
                    <span className="text-lg sm:text-2xl font-black text-white tracking-tight">{slide.price}</span>
                    <span className="text-xs text-slate-400/60 line-through font-semibold">{slide.oldPrice}</span>
                    <span className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded-md font-black">{slide.discount}</span>
                  </div>
                  
                  {/* Action Link Buttons */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link 
                      href="/shop"
                      className="flex-1 sm:flex-none text-center justify-center bg-[#149fcd] hover:bg-[#118eb8] text-white px-6 sm:px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-md active:scale-98 flex items-center gap-2"
                    >
                      {slide.buttonText} <span>→</span>
                    </Link>
                    <Link 
                      href="/shop?category=phones"
                      className="flex-1 sm:flex-none text-center justify-center border border-white/20 hover:border-white text-white px-4 sm:px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white/5 whitespace-nowrap"
                    >
                      {slide.secondaryButtonText}
                    </Link>
                  </div>
                </div>

                {/* Graphics Workspace Panel (Scales responsively between viewport switches safely) */}
                <div className="md:col-span-5 flex relative h-full w-full items-center justify-center max-h-[180px] sm:max-h-[240px] md:max-h-none">
                  <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full flex items-center justify-center border border-white/5 bg-black/10 shadow-2xl">
                    
                    {/* Background Glow Layer Graphic */}
                    <div className="absolute inset-0 w-full h-full z-0 mix-blend-screen scale-105 pointer-events-none">
                      <Image
                        src={slide.glowImage}
                        alt="Media Glow Track"
                        fill
                        className="object-cover"
                        unoptimized
                        priority
                      />
                    </div>

                    {/* Clean Foreground Product Graphic */}
                    <div className="relative w-[85%] h-[85%] z-10 transform transition-transform duration-700 hover:scale-102 rounded-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.45)]"
                        unoptimized
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Slider Chevrons Navigation Buttons (Hidden entirely on standalone mobile devices) */}
          <button 
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-md border border-white/5 transition-all duration-300 opacity-0 lg:group-hover/slider:opacity-100 shadow-xl hidden md:block"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-md border border-white/5 transition-all duration-300 opacity-0 lg:group-hover/slider:opacity-100 shadow-xl hidden md:block"
          >
            <ChevronRight size={16} className="stroke-[3]" />
          </button>

          {/* Progress Indicator Dots Track */}
          <div className="absolute bottom-6 left-6 md:left-8 z-30 flex gap-2">
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
          
          {/* SMARTWATCHES PROMO CARD */}
          <div className="flex-1 bg-[#E2F2F7] rounded-[32px] p-6 sm:p-8 flex flex-row items-center justify-between relative overflow-hidden group/card border border-sky-100/50 min-h-[155px] sm:min-h-[175px] lg:h-1/2 shadow-3xs">
            <div className="w-[58%] flex flex-col justify-center text-left relative z-20">
              <span className="text-[9px] font-black tracking-wider text-[#0284c7] bg-white/70 px-2.5 py-1 rounded-md uppercase w-fit mb-2.5">
                Up to 35% Off
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-black leading-tight tracking-tight text-slate-800 font-montserrat uppercase mb-4 max-w-[150px]">
                Smartwatches that keep up.
              </h3>
              <Link 
                href="/shop?category=smartwatches" 
                className="bg-white hover:bg-[#149fcd] text-slate-800 hover:text-white px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-1.5 w-fit shadow-3xs border border-slate-100 whitespace-nowrap"
              >
                Shop now <span>→</span>
              </Link>
            </div>
            
            <div className="w-[42%] h-full relative flex items-center justify-end z-10 max-h-[110px] sm:max-h-none">
              <div className="relative w-full h-[100px] sm:h-[130px] lg:h-[135px] transition-transform duration-500 group-hover/card:scale-104 group-hover/card:-rotate-2">
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

          {/* NOTEBOOKS PROMO CARD */}
          <div className="flex-1 bg-[#F2EDE4] rounded-[32px] p-6 sm:p-8 flex flex-row items-center justify-between relative overflow-hidden group/card border border-amber-100/40 min-h-[155px] sm:min-h-[175px] lg:h-1/2 shadow-3xs">
            <div className="w-[58%] flex flex-col justify-center text-left relative z-20">
              <span className="text-[9px] font-black tracking-wider text-amber-800 bg-white/70 px-2.5 py-1 rounded-md uppercase w-fit mb-2.5">
                Up to 10% Off
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-black leading-tight tracking-tight text-slate-800 font-montserrat uppercase mb-4 max-w-[150px]">
                Notebooks built for big work.
              </h3>
              <Link 
                href="/shop?category=computers" 
                className="bg-white hover:bg-amber-800 text-slate-800 hover:text-white px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-1.5 w-fit shadow-3xs border border-slate-100 whitespace-nowrap"
              >
                Shop now <span>→</span>
              </Link>
            </div>

            <div className="w-[42%] h-full relative flex items-center justify-end z-10 max-h-[110px] sm:max-h-none">
              <div className="relative w-full h-[100px] sm:h-[130px] lg:h-[135px] transition-transform duration-500 group-hover/card:scale-104 group-hover/card:translate-y-0.5">
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