'use client';

import { 
  Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown, 
  ArrowLeftRight, X, Minus, Plus, ChevronRight,
  Sparkles, Tv, Laptop, Smartphone, Gamepad2, UtensilsCrossed,
  Shirt, HeartPulse, Lamp, Luggage, Baby, Car, Home, LogOut
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { fetchMyCart, updateCartItemQuantity, removeCartItem, CartItemBackend } from "../../lib/api/auth";

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

function NavbarComponent() {
  const pathname = usePathname();
  const { user, loading: authLoading, logout } = useAuth(); // Live custom authentication context layer values
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedSearchCat] = useState("All Categories");
  const [isSticky, setIsSticky] = useState(false);
  
  // Sidebar Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- API STATE INTEGRATION LAYERS ---
  const [cartItems, setCartItems] = useState<CartItemBackend[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const loadLiveCart = async () => {
    try {
      const data = await fetchMyCart();
      setCartItems(data.items || []);
      setSubtotal(data.subtotal || 0);
    } catch (err) {
      console.error("Error synchronizing drawer component with checkout backend api:", err);
    }
  };

 // Re-sync items list loop whenever drawer sidebar overlay toggles open
  useEffect(() => {
    const handleCartSyncLifecycle = async () => {
      if (user) {
        await loadLiveCart();
      } else {
        setCartItems([]);
        setSubtotal(0);
      }
    };
    handleCartSyncLifecycle();
  }, [isCartOpen, user, pathname]);

  const updateQuantity = async (productId: string, currentQty: number, increment: boolean) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;
    try {
      setCartLoading(true);
      const data = await updateCartItemQuantity(productId, newQty);
      setCartItems(data.items || []);
      setSubtotal(data.subtotal || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      setCartLoading(true);
      const data = await removeCartItem(productId);
      setCartItems(data.items || []);
      setSubtotal(data.subtotal || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

  // Lock scrolling when side menus are active
  useEffect(() => {
    if (isCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, isMobileMenuOpen]);

  return (
    <div className="relative h-[80px] md:h-[160px] text-left"> 
      <header className={`w-full bg-white font-sans fixed top-0 left-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-md py-0' : ''}`}>
        
        {/* 1. Main Header Bar */}
        {!isSticky && (
          <div className="py-4 md:py-6 border-b border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
              
              {/* BRAND LOGO */}
              <Link href="/" className="shrink-0">
                <div className="relative w-[130px] h-[35px] md:w-[180px] md:h-[50px]">
                  <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" priority />
                </div>
              </Link>

              {/* DESKTOP SEARCH (Hidden on Mobile) */}
              <div className="hidden md:block flex-1 max-w-2xl relative">
                <div className="flex w-full items-center border-2 border-[#149fcd] rounded-sm overflow-hidden">
                  <input type="text" placeholder="Search for Products..." className="flex-1 px-5 py-3 outline-none text-sm text-slate-500" />
                  <div className="h-6 w-[1px] bg-gray-300" />
                  <button onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)} className="px-6 py-3 flex items-center gap-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                    {selectedSearchCat} <ChevronDown size={16} />
                  </button>
                  <button className="bg-[#149fcd] p-4 text-white hover:bg-[#118eb8] transition-colors"><Search size={22} /></button>
                </div>
              </div>

              {/* DESKTOP ACTION AREA (Hidden on Mobile) */}
              <div className="hidden md:flex items-center gap-6">
                {authLoading ? (
                  <div className="text-right pr-6 animate-pulse">
                    <span className="text-xs text-slate-300 font-medium">Syncing profile...</span>
                  </div>
                ) : user ? (
                  <div className="flex items-center gap-3 border-r pr-6 border-gray-100 group relative cursor-pointer">
                    <div className="relative w-10 h-10 rounded-full bg-[#3b4d9b] flex items-center justify-center border-2 border-slate-50 overflow-hidden shrink-0">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-medium leading-none mb-1 max-w-[130px] truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold text-slate-800">Hello, {user.name}</span>
                        <ChevronDown size={12} className="text-slate-400 group-hover:text-[#149fcd] transition-colors" />
                      </div>
                    </div>

                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-sm py-2 z-50">
                      <Link href={user.role === "seller" ? "/seller/dashboard" : "/customer/overview"} className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Dashboard</Link>
                      <Link href={user.role === "seller" ? "/seller/settings" : "/customer/settings"} className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Account Settings</Link>
                      <hr className="my-1 border-slate-50" />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">Logout</button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center gap-3 border-r pr-6 border-gray-100">
                    <div className="bg-white border border-gray-200 p-2.5 rounded-full text-slate-600"><User size={22} /></div>
                    <div className="text-left text-slate-900">
                      <p className="text-[10px] text-gray-500 leading-none mb-1">Hello, Guest</p>
                      <p className="text-sm font-semibold text-slate-700 hover:text-[#149fcd]">Login / Register</p>
                    </div>
                  </Link>
                )}

                <div className="flex items-center gap-5">
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

              {/* --- 📱 MOBILE VIEW NAVIGATION BAR --- */}
              <div className="flex md:hidden items-center gap-5">
                <Link href="/compare" className="relative block text-slate-800 py-1 px-0.5">
                  <ArrowLeftRight size={22} className="rotate-90" />
                  <span className="absolute -top-1.5 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">1</span>
                </Link>

                <div onClick={() => setIsCartOpen(true)} className="relative block text-slate-800 py-1 cursor-pointer">
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{totalItemCount}</span>
                </div>

                <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-900 p-1 hover:text-[#149fcd] transition-colors">
                  <Menu size={26} className="stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. Nav Row (Desktop Only Menu Rails) */}
        <div className={`hidden md:block transition-colors duration-300 ${isSticky ? 'bg-white py-1 shadow-sm' : 'bg-white border-t border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-10">
              {isSticky && (
                <Link href="/" className="shrink-0 mr-4">
                  <div className="relative w-[140px] h-[40px]">
                    <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" />
                  </div>
                </Link>
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

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-x border-b border-slate-100 shadow-xl py-1 flex flex-col rounded-b-sm animate-in fade-in slide-in-from-top-2 duration-150">
                      {categoriesList.map((cat, index) => (
                        <Link
                          key={index}
                          href={`/shop?category=${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                          onClick={() => setIsCategoryOpen(false)}
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
                  <Link key={item.name} href={item.path} className="hover:text-[#149fcd] transition-colors font-medium">{item.name}</Link>
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
                    {user && (
                      <div className="relative w-8 h-8 rounded-full bg-[#3b4d9b] flex items-center justify-center shrink-0 border border-slate-100 text-xs font-bold text-white mr-1 overflow-hidden">
                        {user.avatar_url ? <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" /> : <span>{user.name.charAt(0).toUpperCase()}</span>}
                      </div>
                    )}
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

      {/* --- 📱 MOBILE DRAWOUT MENU DRAWER --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[110] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-[111] md:hidden shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-28 h-8">
                <Image src="/jummall-logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#149fcd] flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden border border-white/20">
                  {user.avatar_url ? <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-bold truncate">Hello, {user.name}</p>
                  <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="pt-2 text-left">
                <p className="text-xs text-white/60">Welcome Visitor,</p>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-[#149fcd] hover:underline">Sign In / Register</Link>
              </div>
            )}
          </div>

          <div className="p-4 border-b border-slate-100 space-y-1 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">Quick Navigation</p>
            {[
              { name: 'Home Storefront', path: '/' },
              { name: 'Browse Shop', path: '/shop' },
              { name: 'Articles Blog', path: '/blog' },
              { name: 'Customer Assistance', path: '/contact' },
              { name: 'Merchant Portal', path: '/sell' },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#149fcd]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {user && (
            <div className="p-4 space-y-1 text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">User Terminal</p>
              <Link href={user.role === "seller" ? "/seller/dashboard" : "/customer/overview"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-sm text-sm font-medium text-slate-600 hover:bg-slate-50">Personal Dashboard</Link>
              <Link href={user.role === "seller" ? "/seller/settings" : "/customer/settings"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-sm text-sm font-medium text-slate-600 hover:bg-slate-50">Account Settings</Link>
            </div>
          )}
        </div>

        {user && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); logout(); }}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-3 rounded-sm uppercase tracking-wide shadow-sm"
            >
              <LogOut size={14} /> Clear Account Session
            </button>
          </div>
        )}
      </div>

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
        } ${cartLoading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-[15px] font-black text-slate-800 tracking-tight uppercase">Shopping cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* --- DYNAMIC ITEMS CONTAINER LIST BLOCK --- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-slate-100/60">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item.product_id} className={`flex gap-4 ${index > 0 ? 'pt-6' : ''}`}>
                <div className="relative w-16 h-20 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">Img</div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 relative text-left">
                  <button onClick={() => removeItem(item.product_id)} className="absolute top-0 right-0 text-slate-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>

                  <h3 className="text-[13px] font-bold text-slate-800 pr-5 leading-tight truncate max-w-[200px]" title={item.product_name}>
                    {item.product_name}
                  </h3>
                  
                  <div className="flex items-center border border-slate-200 rounded-sm w-fit bg-white h-7 shadow-2xs">
                    <button onClick={() => updateQuantity(item.product_id, item.quantity, false)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Minus size={10}/></button>
                    <span className="px-2 text-xs font-bold text-slate-700 min-w-[16px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product_id, item.quantity, true)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Plus size={10}/></button>
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
            /* --- RENDER CLEAN EMPTY DESIGN WHEN RUNNING ON EMPTY LOGS --- */
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400 space-y-3">
               <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100">
                 <ShoppingBag size={28} className="stroke-1 text-slate-300"/>
               </div>
               <div className="space-y-0.5">
                 <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
                 <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-normal">Add products from the marketplace to initialize checkout tabs.</p>
               </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white space-y-4 animate-in fade-in duration-150">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-800 font-bold">Subtotal:</span>
              <span className="text-sm font-black text-slate-900">₦{subtotal.toLocaleString()}.00</span>
            </div>

            <div className="space-y-2 pt-2">
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full bg-[#010F1C] hover:bg-slate-900 text-white font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center transition-colors shadow-sm">
                Proceed to Checkout
              </Link>
              <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors">
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap inside next/dynamic with SSR disabled to completely prevent stale server caches from rendering guest fallbacks
const Navbar = dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
});

export default Navbar;