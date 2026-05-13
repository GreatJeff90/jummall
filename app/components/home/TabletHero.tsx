'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Samsung Galaxy Tab S6, Wifi Tablet",
    subtitle: "TABLET COLLECTION 2025",
    image: "/slider-1-1.png",
  },
  {
    id: 2,
    title: "Samsung Galaxy Tab S6, Wifi Tablet",
    subtitle: "TABLET COLLECTION 2025",
    image: "/slider-2-1.png",
  },
  {
    id: 3,
    title: "Samsung Galaxy Tab S6, Wifi Tablet",
    subtitle: "TABLET COLLECTION 2025",
    image: "/slider-3-1.png",
  }
];

export default function TabletHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-[#149fcd] rounded-[2rem] overflow-hidden min-h-[400px] md:min-h-[520px] relative flex items-center shadow-xl shadow-sky-100/50">
        
        <div className="container mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative z-10">
          {/* Text Content */}
          <div className="text-white space-y-4 md:space-y-6">
            <p className="  tracking-[0.25em] text-[10px] md:text-xs uppercase opacity-90">
              {slides[current].subtitle}
            </p>
            <h1 className="text-3xl md:text-6xl lg:text-7xl   leading-[1.1] transition-all duration-700">
              {slides[current].title}
            </h1>
            <div className="pt-4 md:pt-6">
              <button className="bg-[#010F1C] text-white px-10 py-3.5 rounded-lg   text-xs uppercase tracking-widest hover:bg-white hover:text-[#149fcd] transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Tablet Image Area */}
          <div className="relative h-[280px] md:h-[450px] w-full flex justify-center items-center">
            <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
              <Image
                src={slides[current].image}
                alt="Samsung Tablet"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Vertical Dot Navigation */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === i ? "bg-white h-6" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}