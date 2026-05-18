'use client';

import { ArrowRight, Star, ShoppingCart, Eye, Heart, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const computerLinks = [
  "Desktop", "Laptop", "Computer Accessories", "Keyboards", "Mice", 
  "Mouse Pads", "Monitors", "Projectors", "Speakers", "Webcams", 
  "HDMI Cables", "Ethernet (LAN) Cables", "Adapters & Converters", 
  "USB Flash Drives", "Card Readers", "Memory Cards", "Laptop Chargers", 
  "UPS", "Surge Protectors", "Extension Cords", "Networking Devices",
  "Laptop Stands", "Laptop Bags & Sleeves"
];

const sidebarSlides = [
  {
    id: 1,
    title: "Top Rated Products",
    price: "₦5,599.00",
    img: "/gadget-banner-1-1.jpg", 
  },
  {
    id: 2,
    title: "Selected Novelty Products",
    price: "₦9,999.00",
    img: "/gadget-banner-2-1.jpg",
  }
];

const gadgets = [
  {
    id: 1,
    name: "Xiaomi Redmi Portable Bluetooth Speaker (ASM11A).",
    price: 25000,
    img: "/redmi-600x600.webp",
    badges: ["Hot", "New"],
  },
  {
    id: 2,
    name: "Philips TAS1120 Portable Wireless Bluetooth Speaker – Waterproof...",
    price: 20000,
    oldPrice: 29999,
    img: "/img-8576-600x600.jpeg",
    badges: ["Hot", "New"],
  },
  {
    id: 3,
    name: "Caankei CS20 2-in-1 Magnetic Bluetooth Speaker – Wireless...",
    price: 35000,
    oldPrice: 39999,
    img: "/img-8266-600x600.jpeg",
    badges: ["Hot", "New"],
  }
];

export default function GadgetSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sidebarSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-6">
      
      {/* Sidebar Area */}
      <div className="w-full md:w-1/4 flex flex-col gap-6">
        
        <div className="border-2 border-orange-500 rounded-lg p-6 flex flex-col bg-white min-h-[650px] relative overflow-hidden">
          
          {/* Top Section: Title and List */}
          <div className="relative z-10 flex-grow">
            <h2 className="text-xl text-slate-800 mb-2 font-montserrat">Computers</h2>
            <div className="w-20 h-0.5 bg-sky-500 mb-6" />
            <ul className="space-y-2">
              {computerLinks.map((link) => (
                <li key={link}>
                  <Link href="/shop" className="text-[11px] font-medium text-slate-600 hover:text-orange-500 flex items-center gap-2 transition-colors">
                    <span className="w-1 h-1 bg-slate-300 rounded-full" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Bottom Section */}
          <div className="relative z-20 mt-8 pb-10">
            <Link href="/shop" className="text-sm text-slate-800 flex items-center gap-2 hover:text-orange-500 group transition-colors">
              More Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Decorative Image */}
          <div className="absolute -right-4 -bottom-2 w-48 h-48 pointer-events-none z-0">
             <Image 
                src="/gadget-girl-1.png" 
                alt="Promo Model" 
                fill 
                className="object-contain object-right-bottom" 
             />
          </div>
        </div>

        {/* Sidebar Mini Slider */}
        <div className="h-44 rounded-xl overflow-hidden relative group shadow-md">
          <Image 
            src={sidebarSlides[currentSlide].img} 
            alt={sidebarSlides[currentSlide].title} 
            fill 
            className="object-cover transition-opacity duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-transparent flex flex-col justify-center px-8 text-white z-10">
            <span className="text-[10px] tracking-wide mb-1">Only {sidebarSlides[currentSlide].price}</span>
            <h2 className="text-xl italic leading-tight max-w-[160px] drop-shadow-md">
              {sidebarSlides[currentSlide].title}
            </h2>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
            {sidebarSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? "bg-white scale-110 shadow-sm" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gadgets.map((item) => (
            <div key={item.id} className="group bg-white p-5 relative border border-slate-50 rounded-lg hover:shadow-xl hover:border-white transition-all duration-300">
               
               {/* Action layer */}
               <div className="absolute left-4 top-1/4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-20">
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                    <ShoppingCart size={16}/>
                  </button>
                  
                  {/* Quick View points directly to the product details route */}
                  <Link 
                    href={`/shop/${item.id}`}
                    className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"
                  >
                    <Eye size={16}/>
                  </Link>

                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                    <Heart size={16}/>
                  </button>
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                    <RefreshCw size={16}/>
                  </button>
               </div>

               {/* Badges layer */}
               <div className="absolute top-4 right-4 flex gap-1 z-10">
                {item.badges.map(b => (
                  <span key={b} className={`text-[9px] uppercase px-2 py-0.5 rounded text-white shadow-sm ${b === 'Hot' ? 'bg-orange-500' : 'bg-teal-500'}`}>
                    {b}
                  </span>
                ))}
               </div>

               {/* Image Container wrapped inside Link frame */}
               <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-slate-50">
                <Link href={`/shop/${item.id}`} className="absolute inset-0 block z-0">
                  <Image 
                    src={item.img} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                  />
                </Link>
               </div>

               {/* Product Details Description Frame */}
               <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400">Jummall official</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
                  </div>
                </div>

                {/* Updated anchor location endpoint path link routing */}
                <Link href={`/shop/${item.id}`} className="text-sm text-slate-800 hover:text-sky-500 transition-colors duration-300 leading-snug line-clamp-2 h-10 block font-medium">
                  {item.name}
                </Link>

                <div className="flex items-center gap-0.5 text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                  <span className="text-[10px] text-slate-300 ml-1">(0 reviews)</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg text-slate-900 tracking-tight font-bold">₦{item.price.toLocaleString()}</span>
                  {item.oldPrice && <span className="text-xs text-slate-400 line-through">₦{item.oldPrice.toLocaleString()}</span>}
                </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}