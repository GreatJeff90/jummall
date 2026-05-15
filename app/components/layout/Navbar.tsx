'use client';

import { 
  Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown, 
  ArrowLeftRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedSearchCat] = useState("All Categories");
  const [isSticky, setIsSticky] = useState(false);

  // Check if current route is within the customer dashboard
  const isDashboard = pathname.startsWith('/customer');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[160px] md:h-[160px]"> 
      <header className={`w-full bg-white font-sans fixed top-0 left-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-md py-0' : ''}`}>
        
        {/* 1. Main Header Bar */}
        {!isSticky && (
          <div className="py-6 border-b border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8">
              <Link href="/" className="shrink-0">
                <div className="relative w-[180px] h-[50px]">
                  <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" priority />
                </div>
              </Link>

              <div className="flex-1 max-w-2xl relative">
                <div className="flex w-full items-center border-2 border-[#149fcd] rounded-sm overflow-hidden">
                  <input type="text" placeholder="Search for Products..." className="flex-1 px-5 py-3 outline-none text-sm text-slate-500" />
                  <div className="h-6 w-[1px] bg-gray-300" />
                  <button onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)} className="px-6 py-3 flex items-center gap-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                    {selectedSearchCat} <ChevronDown size={16} />
                  </button>
                  <button className="bg-[#149fcd] p-4 text-white hover:bg-[#118eb8] transition-colors"><Search size={22} /></button>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="flex items-center gap-6">
                
                {isDashboard ? (
                  /* --- LOGGED IN CUSTOMER STATE --- */
                  <div className="flex items-center gap-3 border-r pr-6 border-gray-100 group relative cursor-pointer">
                    <div className="relative w-10 h-10 rounded-full bg-[#3b4d9b] flex items-center justify-center border-2 border-slate-50 overflow-hidden shrink-0">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-medium leading-none mb-1">
                        neelorneels@gmail.com
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold text-slate-800">Hello, Neel Ade</span>
                        <ChevronDown size={12} className="text-slate-400 group-hover:text-[#149fcd] transition-colors" />
                      </div>
                    </div>

                    {/* Simple Dropdown Overlay */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-sm py-2 z-50">
                      <Link href="/customer/overview" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Dashboard</Link>
                      <Link href="/customer/settings" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Account Settings</Link>
                      <hr className="my-1 border-slate-50" />
                      <button className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">Logout</button>
                    </div>
                  </div>
                ) : (
                  /* --- GUEST STATE --- */
                  <Link href="/login" className="flex items-center gap-3 border-r pr-6 border-gray-100">
                    <div className="bg-white border border-gray-200 p-2.5 rounded-full text-slate-600"><User size={22} /></div>
                    <div className="text-left text-slate-900">
                      <p className="text-[10px] text-gray-500 leading-none mb-1">Hello, Guest</p>
                      <p className="text-sm ">Login / Register</p>
                    </div>
                  </Link>
                )}

                <div className="flex items-center gap-5">
                  <div className="relative cursor-pointer group">
                    <ArrowLeftRight size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white ">1</span>
                  </div>
                  <div className="relative cursor-pointer group">
                    <Heart size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">0</span>
                  </div>
                  <div className="relative cursor-pointer group">
                    <ShoppingBag size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Nav Row */}
        <div className={`transition-colors duration-300 ${isSticky ? 'bg-white py-1 shadow-sm' : 'bg-white border-t border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            
            <div className="flex items-center gap-10">
              {isSticky && (
                <>
                  <Link href="/" className="shrink-0 mr-4">
                    <div className="relative w-[140px] h-[40px]">
                      <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" />
                    </div>
                  </Link>
                </>
              )}

              {!isSticky && (
                <div className="relative">
                  <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="bg-[#149fcd] text-white px-8 py-4 flex items-center gap-16 text-sm">
                    <div className="flex items-center gap-3"><Menu size={20} />All Categories</div>
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}

              <nav className="flex gap-10 text-sm  text-slate-800 py-4">
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
                    className="hover:text-[#149fcd] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
              {!isSticky && (
                <div className="flex items-center gap-3">
                  <Phone size={22} className="text-[#149fcd]" />
                  <div className="text-left leading-tight">
                    <p className="text-[10px] text-slate-500 uppercase">Hotline:</p>
                    <p className="text-sm font-black text-slate-900 tracking-tight">+2349055999998</p>
                  </div>
                </div>
              )}

              {isSticky && (
                 <div className="flex items-center gap-5">
                    <div className="relative cursor-pointer">
                      <ArrowLeftRight size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">1</span>
                    </div>
                    <div className="relative cursor-pointer">
                      <Heart size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">0</span>
                    </div>
                    <div className="relative cursor-pointer">
                      <ShoppingBag size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">2</span>
                    </div>
                 </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}