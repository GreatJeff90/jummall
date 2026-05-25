'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "The best phone collection 2026",
    subtitle: "Starting at ₦2,559,000",
    offer: "Exclusive offer -10% off this week",
    buttonText: "Shop Now",
    image: "/slider-1.png",
    bgColor: "bg-[#E9F3F6]",
    textColor: "text-slate-900",
    accentColor: "text-red-500",
  },
  {
    id: 2,
    title: "The best notebook collection 2026",
    subtitle: "Starting at ₦855,000.00",
    offer: "Exclusive offer -10% off this week",
    buttonText: "Shop Now",
    image: "/slider-2.png",
    bgColor: "bg-[#0E5051]",
    textColor: "text-white",
    accentColor: "text-yellow-400",
  },
  {
    id: 3,
    title: "The best smartwatch collection 2026",
    subtitle: "Starting at ₦275,000.00",
    offer: "Exclusive offer -35% off this week",
    buttonText: "Shop Now",
    image: "/slider-3.png",
    bgColor: "bg-[#0E5051]",
    textColor: "text-white",
    accentColor: "text-yellow-400",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden h-[450px] md:h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
            slide.bgColor
          } ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Decorative Background Patterns (leaf/circles) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-10 right-20 w-64 h-64 border-[40px] border-white rounded-full blur-2xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-16 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Content Side */}
            <div className={`z-20 ${slide.textColor} animate-in slide-in-from-left-10 duration-700`}>
              <p className="text-sm md:text-lg mb-4 opacity-90 font-medium uppercase tracking-wider">
                {slide.subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 font-montserrat tracking-tight">
                {slide.title}
              </h1>
              <p className={`text-lg md:text-xl font-bold mb-10 ${slide.accentColor}`}>
                {slide.offer}
              </p>
              
              {/* Linked Shop Redirect Route Layout Button */}
              <Link 
                href="/shop"
                className="inline-block bg-white text-slate-900 px-10 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-xl"
              >
                {slide.buttonText}
              </Link>
            </div>

            {/* Image Side */}
            <div className="relative h-[300px] md:h-[500px] animate-in zoom-in-95 duration-1000">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-sm transition-all duration-300 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="stroke-[2.5]" />
      </button>
      <button 
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/10 hover:bg-[#149fcd] p-3 rounded-full text-white backdrop-blur-sm transition-all duration-300 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="stroke-[2.5]" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all rounded-full duration-300 focus:outline-none ${
              current === i ? "w-8 bg-white shadow-sm" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}