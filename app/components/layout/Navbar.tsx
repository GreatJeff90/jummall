import { Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full bg-white font-sans sticky top-0 z-50 shadow-sm">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-[10px] md:text-xs font-medium uppercase tracking-widest">
        {"Need assistance? Our customer support is available 24/7 to help you."}
      </div>

      {/* 2. Main Header Bar */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo - Full Image */}
          <Link href="/" className="group shrink-0">
            <div className="relative w-[120px] h-[40px] md:w-[150px] md:h-[50px] transition-transform group-hover:scale-105">
              <Image 
                src="/jummall-logo.png" 
                alt="Jummall Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on small mobile, visible on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-2xl group">
            <div className="flex w-full items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-50 transition-all">
              <input 
                type="text" 
                placeholder="Search for Products..." 
                className="flex-1 bg-transparent px-5 py-2.5 outline-none text-sm text-slate-700"
              />
              <div className="h-5 w-[1px] bg-gray-200" />
              <button className="px-4 flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">
                {"All Categories"} <ChevronDown size={14} />
              </button>
              <button className="bg-sky-600 p-2.5 m-1 rounded-lg text-white hover:bg-sky-700 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/login" className="hidden lg:flex items-center gap-3 group cursor-pointer">
              <div className="bg-slate-50 p-2.5 rounded-full group-hover:bg-sky-100 group-hover:text-sky-600 transition-all">
                <User size={20} className="text-slate-600 group-hover:text-sky-600" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">{"Hello, Guest"}</p>
                <p className="text-xs font-black text-slate-800">{"Login / Register"}</p>
              </div>
            </Link>
            
            <div className="flex gap-3 md:gap-4 border-l pl-4 md:pl-6 border-gray-100">
              <div className="relative cursor-pointer hover:text-sky-600 transition-colors">
                <Heart size={22} className="text-slate-600 hover:text-sky-600" />
                <span className="absolute -top-2 -right-2 bg-sky-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-white font-bold shadow-sm">0</span>
              </div>
              <div className="relative cursor-pointer hover:text-sky-600 transition-colors">
                <ShoppingBag size={22} className="text-slate-600 hover:text-sky-600" />
                <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-white font-bold shadow-sm">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Bar */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Category Button */}
            <button className="bg-sky-600 text-white px-6 py-3.5 flex items-center gap-3 font-black text-[11px] uppercase tracking-widest rounded-t-sm">
              <Menu size={18} />
              {"All Categories"}
              <ChevronDown size={14} />
            </button>

            {/* Links */}
            <nav className="flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">
              {['Home', 'Shop', 'Blog', 'Contact', 'Sell on Jummall'].map((item) => (
                <Link key={item} href={item === 'Home' ? '/' : '#'} className="hover:text-sky-600 transition-colors relative py-4">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hotline */}
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-sky-600" />
            <div className="text-right leading-none">
              <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">{"Hotline:"}</p>
              <p className="text-sm font-black text-slate-800 tracking-tighter">{"+234 905 599 9998"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}