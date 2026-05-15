'use client';

import { 
  Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown, 
  ChevronRight, Laptop, Smartphone, Gamepad2, Utensils, 
  Shirt, HeartPulse, Lamp, Luggage, Baby, Car, Home, Sparkles,
  ArrowLeftRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState("All Categories");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjusted to 100 for a smoother transition as seen in image_1f6c72.jpg
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "New Arrivals", icon: <Sparkles size={18} /> },
    { name: "Electronics", icon: <Laptop size={18} />, hasSub: true },
    { name: "Computers", icon: <Laptop size={18} />, hasSub: true },
    { name: "Phones & Tablets", icon: <Smartphone size={18} />, hasSub: true },
    { name: "Gaming", icon: <Gamepad2 size={18} />, hasSub: true },
    { name: "Kitchen Items", icon: <Utensils size={18} />, hasSub: true },
    { name: "Fashion", icon: <Shirt size={18} />, hasSub: true },
    { name: "Health & Beauty", icon: <HeartPulse size={18} />, hasSub: true },
    { name: "Lighting & Home fixture", icon: <Lamp size={18} />, hasSub: true },
    { name: "Luggage & Travel gear", icon: <Luggage size={18} /> },
    { name: "Baby & Kids", icon: <Baby size={18} />, hasSub: true },
    { name: "Automobile", icon: <Car size={18} />, hasSub: true },
    { name: "Home decor", icon: <Home size={18} /> },
  ];

  return (
    // The relative wrapper prevents content jump, the inner fixed div handles the sticky effect
    <div className="relative h-[160px] md:h-[160px]"> 
      <header className={`w-full bg-white font-sans fixed top-0 left-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-md py-0' : ''}`}>
    
        
        {/* 1. Main Header Bar (Hidden when sticky) */}
        {!isSticky && (
          <div className="py-6 border-b border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8">
              <Link href="/" className="shrink-0">
                <div className="relative w-[180px] h-[50px]">
                  <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" priority />
                </div>
              </Link>

              <div className="flex-1 max-w-2xl relative">
                <div className="flex w-full items-center border-2 border-[#149fcd]">
                  <input type="text" placeholder="Search for Products..." className="flex-1 px-5 py-3 outline-none text-sm text-slate-500" />
                  <div className="h-6 w-[1px] bg-gray-300" />
                  <button onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)} className="px-6 py-3 flex items-center gap-3 text-xs font-medium text-slate-700">
                    {selectedSearchCat} <ChevronDown size={16} />
                  </button>
                  <button className="bg-[#149fcd] p-4 text-white"><Search size={22} /></button>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <Link href="/login" className="flex items-center gap-3 border-r pr-8 border-gray-100">
                  <div className="bg-white border border-gray-200 p-3 rounded-full"><User size={24} /></div>
                  <div className="text-left text-slate-900">
                    <p className="text-xs text-gray-500 leading-none mb-1">Hello, Guest</p>
                    <p className="text-sm  ">Login / Register</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. Nav Row (Sticky view from image_1fe834.png) */}
        <div className={`transition-colors duration-300 ${isSticky ? 'bg-white py-1 shadow-sm' : 'bg-white border-t border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            
            <div className="flex items-center gap-10">
              {isSticky && (
                <Link href="/" className="shrink-0 mr-4">
                  <div className="relative w-[140px] h-[40px]">
                    <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" />
                  </div>
                </Link>
              )}

              {!isSticky && (
                <div className="relative">
                  <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="bg-[#149fcd] text-white px-8 py-4 flex items-center gap-16   text-sm">
                    <div className="flex items-center gap-3"><Menu size={20} />All Categories</div>
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}

              <nav className={`flex gap-10 text-sm   text-slate-900 ${isSticky ? 'py-4' : 'py-4'}`}>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Shop', path: '/shop' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Sell on Jummall', path: '/sell' },
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.path} 
                    className="hover:text-[#149fcd] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
              {!isSticky && (
                <div className="flex items-center gap-3 mr-4">
                  <Phone size={22} className="text-[#149fcd]" />
                  <div className="text-left leading-tight">
                    <p className="text-[10px] text-slate-900   uppercase">Hotline:</p>
                    <p className="text-sm   text-slate-900 tracking-tight">+2349055999998</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer"><ArrowLeftRight size={24} className="text-slate-800" /><span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white  ">0</span></div>
                <div className="relative cursor-pointer"><Heart size={24} className="text-slate-800" /><span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white  ">0</span></div>
                <div className="relative cursor-pointer"><ShoppingBag size={24} className="text-slate-800" /><span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white  ">0</span></div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}