'use client';

import { ArrowRight, Star, ShoppingCart, Eye, Heart, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const arrivalLinks = [
  "Laptop", "Television & Video", "Cameras & Photos", "Home Audio", 
  "Generators & Portable Power", "Tablets", "Smart TVs", "Kitchen Items", 
  "LED TVs", "iPads", "Android Tablets", "Cookware", "Kitchen Utensils", 
  "Food Storage", "Cleaning & Kitchen Care", "Electronic Accessories", 
  "Photography Accessories", "USB Cables", "Power Banks", "Extension Boxes"
];

const promoSlides = [
  { id: 1, title: "Selected Novelty Products", price: "₦9,999.00" },
  { id: 2, title: "Top Rated Products", price: "₦5,599.00" }
];

const newProducts = [
  {
    id: 1,
    name: "4G WiFi 6 Hotspot & 10000mAh Power Bank – The Ultimate Travel Companion",
    price: 60000,
    img: "/whatsapp-image-2026-04-17-at-10859-pm-600x600.jpeg", // From image_2a685d.png
    badges: ["Hot", "New"],
  },
  {
    id: 2,
    name: "Telesin C03 Magnetic Selfie Ring Light",
    price: 35000,
    img: "/cleo-el-telesin-c03-phone-magnetic-beauty-fill-light-pica-600x600.webp", // From image_2a685d.png
    badges: ["New"],
  },
  {
    id: 3,
    name: "TELESIN Fun Shot Magnetic Grip",
    price: 70000,
    img: "/camera-white-1-600x600.jpg", // From image_2a685d.png
    badges: ["New"],
  }
];

export default function NewArrivals() {
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-3xl   text-slate-900">
          <span className="text-sky-500 border-b-4 border-sky-500 pb-4">New</span> Arrivals
        </h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Column */}
        <div className="w-full md:w-1/4 flex flex-col gap-6">
          {/* List Card - Red Border as per image_2a6c79.png */}
          <div className="border-2 border-rose-500 rounded-lg p-6 flex flex-col bg-white min-h-[650px] relative overflow-hidden">
            <div className="relative z-10 flex-grow">
              <h2 className="text-xl   text-slate-800 mb-2">New Arrivals</h2>
              <div className="w-20 h-0.5 bg-sky-500 mb-6" />
              <ul className="space-y-2">
                {arrivalLinks.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[11px] font-medium text-slate-600 hover:text-rose-500 flex items-center gap-2">
                      <span className="w-1 h-1 bg-slate-300 rounded-full" /> {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative z-20 mt-8 pb-10">
              <Link href="#" className="text-sm   text-slate-800 flex items-center gap-2 hover:text-rose-500 group">
                Start Shopping <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="absolute -right-4 -bottom-2 w-48 h-48 pointer-events-none z-0">
               <Image src="/gadget-girl-1.png" alt="Promo" fill className="object-contain object-right-bottom" />
            </div>
          </div>

          {/* Bottom Sidebar Slider */}
          <div className="h-44 rounded-xl overflow-hidden relative group">
            <Image src="/gadget-banner-2-1.jpg" alt="Promo" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-transparent flex flex-col justify-center px-8 text-white z-10">
              <span className="text-[10px]   mb-1">Only {promoSlides[currentPromo].price}</span>
              <h2 className="text-xl   italic max-w-[150px] leading-tight">
                {promoSlides[currentPromo].title}
              </h2>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              {promoSlides.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentPromo === i ? "bg-white h-4" : "bg-white/40"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <div key={product.id} className="group bg-white p-5 relative border border-slate-50 rounded-lg hover:shadow-xl transition-all duration-300">
                {/* Hover UI */}
                <div className="absolute left-4 top-1/4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 z-20">
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"><ShoppingCart size={16}/></button>
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"><Eye size={16}/></button>
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"><Heart size={16}/></button>
                  <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"><RefreshCw size={16}/></button>
                </div>

                <div className="absolute top-4 right-4 flex gap-1 z-10">
                  {product.badges.map(b => (
                    <span key={b} className={`text-[9px]   px-2 py-0.5 rounded text-white ${b === 'Hot' ? 'bg-orange-600' : 'bg-teal-600'}`}>
                      {b}
                    </span>
                  ))}
                </div>

                <div className="aspect-square relative mb-4">
                  <Image src={product.img} alt={product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]   text-slate-400">Jummall official</span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 border-r border-b border-white rotate-45 mb-0.5" />
                    </div>
                  </div>
                  <h3 className="text-sm   text-slate-800 line-clamp-2 h-10 group-hover:text-sky-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-0.5 text-slate-200">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                    <span className="text-[10px]   text-slate-300 ml-1">(0 reviews)</span>
                  </div>
                  <div className="text-lg   text-slate-900 pt-1">
                    ₦{product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}