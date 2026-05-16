'use client';

import { 
  Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown, 
  ArrowLeftRight, X, Minus, Plus, ChevronRight,
  Sparkles, Tv, Laptop, Smartphone, Gamepad2, UtensilsCrossed,
  Shirt, HeartPulse, Lamp, Luggage, Baby, Car, Home
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Category list mapping with corresponding icons based on screenshot
const categoriesList = [
  { name: "New Arrivals", icon: Sparkles, hasArrow: false },
  { name: "Electronics", icon: Tv, hasArrow: true },
  { name: "Computers", icon: Laptop, hasArrow: true },
  { name: "Phones & Tablets", icon: Smartphone, hasArrow: true },
  { name: "Gaming", icon: Gamepad2, hasArrow: true },
  { name: "Kitchen Items", icon: UtensilsCrossed, hasArrow: true },
  { name: "Fashion", icon: Shirt, hasArrow: true },
  { name: "Health & Beauty", icon: HeartPulse, hasArrow: true },
  { name: "Lighting & Home fixture", icon: Lamp, hasArrow: true },
  { name: "Luggage & Travel gear", icon: Luggage, hasArrow: false },
  { name: "Baby & Kids", icon: Baby, hasArrow: true },
  { name: "Automobile", icon: Car, hasArrow: true },
  { name: "Home decor", icon: Home, hasArrow: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedSearchCat] = useState("All Categories");
  const [isSticky, setIsSticky] = useState(false);
  
  // Cart Sidebar Open/Close Toggle State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hardcoded mock data inside the drawer view
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "17promax and 16promax Charger",
      price: 25000,
      image: "/img-20260509-wa0017-600x600.jpg", 
      quantity: 1,
      color: "White"
    },
    {
      id: 2,
      name: "Holley Vivi Handbag",
      price: 38500,
      image: "/img-20260509-wa0019-600x600.jpg",
      quantity: 1,
      color: null
    }
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Check if current route is within the customer dashboard
  const isDashboard = pathname.startsWith('/customer');

  // Handle sticky header scroll effect safely
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

  // Lock scrolling when the shopping cart side menu is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

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
                  {/* Compare Icon linked to Compare page */}
                  <Link href="/compare" className="relative cursor-pointer group block">
                    <ArrowLeftRight size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white ">1</span>
                  </Link>
                  
                  <Link href="/wishlist" className="relative cursor-pointer group block">
                    <Heart size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">0</span>
                  </Link>
                  
                  <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer group">
                    <ShoppingBag size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">{totalItemCount}</span>
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

              {/* ALL CATEGORIES TRIGGER AND DROPDOWN PANEL BLOCK */}
              {!isSticky && (
                <div className="relative z-[40]">
                  <button 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
                    className="bg-[#149fcd] text-white px-8 py-4 flex items-center gap-16 text-sm font-bold min-w-[270px] justify-between transition-colors rounded-t-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Menu size={18} />
                      All Categories
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Container Element */}
                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-x border-b border-slate-100 shadow-xl py-1 flex flex-col rounded-b-sm animate-in fade-in slide-in-from-top-2 duration-150">
                      {categoriesList.map((cat, index) => (
                        <Link
                          key={index}
                          href={`/shop?category=${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                          onClick={() => setIsCategoryOpen(false)} // Safely closes the menu on link execution
                          className="flex items-center justify-between px-6 py-3.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-[#149fcd] transition-colors border-b border-slate-100/50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <cat.icon size={16} className="text-slate-400 shrink-0" />
                            <span>{cat.name}</span>
                          </div>
                          {cat.hasArrow && (
                            <ChevronRight size={14} className="text-slate-400" />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <nav className="flex gap-10 text-sm text-slate-800 py-4">
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
                    {/* Sticky Mode Compare Icon linked to Compare page */}
                    <Link href="/compare" className="relative cursor-pointer block">
                      <ArrowLeftRight size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">1</span>
                    </Link>
                    
                    <Link href="/wishlist" className="relative cursor-pointer block">
                      <Heart size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">0</span>
                    </Link>
                    
                    <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
                      <ShoppingBag size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">{totalItemCount}</span>
                    </div>
                 </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* --- SLIDE OUT SHOPPING CART DRAWER COMPONENT --- */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-[15px] font-black text-slate-800 tracking-tight">Shopping cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-slate-100/60">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item.id} className={`flex gap-4 ${index > 0 ? 'pt-6' : ''}`}>
                <div className="relative w-16 h-20 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">Img</div>
                </div>

                <div className="flex-1 space-y-1.5 relative">
                  <button onClick={() => removeItem(item.id)} className="absolute top-0 right-0 text-slate-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>

                  <h3 className="text-[13px] font-bold text-slate-800 pr-5 leading-tight">{item.name}</h3>
                  
                  <div className="flex items-center border border-slate-200 rounded-sm w-fit bg-white h-7">
                    <button onClick={() => updateQuantity(item.id, false)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Minus size={10}/></button>
                    <span className="px-2 text-xs font-bold text-slate-700">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, true)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Plus size={10}/></button>
                  </div>

                  <p className="text-[13px] font-bold text-[#149fcd] pt-1">
                    ₦{item.price.toLocaleString()}.00
                  </p>
                  {item.color && (
                    <p className="text-[10px] text-slate-300 italic font-medium">Color: {item.color}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400 space-y-2">
               <ShoppingBag size={40} className="stroke-1 text-slate-300"/>
               <p className="text-sm font-medium">Your cart is currently empty.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-800 font-bold">Subtotal:</span>
            <span className="text-sm font-black text-slate-900">₦{subtotal.toLocaleString()}.00</span>
          </div>

          <div className="space-y-2 pt-2">
            <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center transition-colors">
              Checkout
            </Link>
            <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}