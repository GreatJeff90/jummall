'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "The best phone collection 2025",
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
    title: "The best notebook collection 2025",
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
    title: "The best smartwatch collection 2025",
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

          <div className="max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Content Side */}
            <div className={`z-20 ${slide.textColor} animate-in slide-in-from-left-10 duration-700`}>
              <p className="text-sm md:text-lg   mb-4 opacity-90">
                {slide.subtitle}
              </p>
              <h1 className="text-4xl md:text-7xl   leading-[1.1] mb-6">
                {slide.title}
              </h1>
              <p className={`text-lg md:text-xl   mb-10 ${slide.accentColor}`}>
                {slide.offer}
              </p>
              <Link 
                href="/shop"
                className="inline-block bg-white text-slate-900 px-10 py-4 rounded-lg   hover:scale-105 transition-transform shadow-xl"
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
                priority
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-sm transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all rounded-full ${
              current === i ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}