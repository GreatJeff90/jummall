'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { 
  Heart, ShoppingBag, Minus, Plus, X,Mail, Copy 
} from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  sku: string;
  vendor: string;
  price: number;
  image: string;
  inStock: boolean;
  quantity: number;
}

export default function WishlistPage() {
  // Mock data matching the active list screenshot
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Premium Wide-Leg Faded Blue Denim Jeans",
      sku: "JM-2443-XZRF",
      vendor: "Glorious God's Boutique and Stores",
      price: 14999,
      image: "/img-20260509-wa0017-600x600.jpg",
      inStock: true,
      quantity: 1
    }
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setWishlistItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
              {/* Background Image using fill and object-cover */}
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              {/* Darker overlay for text readability if needed */}
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl   tracking-tight text-[#0F172A]">Wishlist</h1>
                <p className="text-sm text-slate-500 mt-2   uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Wishlist</span>
                </p>
              </div>
            </div>

      {/* --- Main Content Section --- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {wishlistItems.length > 0 ? (
          
          /* --- STATE A: ACTIVE WISHLIST CONTAINER LIST --- */
          <div className="space-y-8">
            <div className="w-full border border-slate-100 rounded-sm overflow-hidden bg-white shadow-sm">
              
              {/* Desktop Table Headers */}
              <div className="grid grid-cols-12 bg-slate-50/70 border-b border-slate-100 px-6 py-4 text-xs font-bold text-slate-700 tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center md:text-left">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center md:text-right">Action</div>
              </div>

              {/* Wishlist Items Rows Grid */}
              <div className="divide-y divide-slate-100">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-6 gap-6 md:gap-0 bg-white">
                    
                    {/* Item Details Block */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="relative w-20 h-24 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0">
                        {/* Fallback frame while layout assets compile locally */}
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-[10px] text-slate-400">Image</div>
                        {/* <Image src={item.image} alt={item.name} fill className="object-cover" /> */}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">
                          {item.name}{" "}
                          {item.inStock && (
                            <span className="text-[#149fcd] font-medium text-[13px] lowercase">
                              (In stock)
                            </span>
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Vendor: <span className="text-slate-600 font-bold">{item.vendor}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          SKU: {item.sku}
                        </p>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="col-span-1 md:col-span-2 text-left">
                      <span className="text-sm font-black text-slate-900">
                        Entering ₦{item.price.toLocaleString()}.00
                      </span>
                    </div>

                    {/* Quantity Control Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center border border-slate-200 rounded-sm bg-white h-9">
                        <button 
                          onClick={() => updateQuantity(item.id, false)}
                          className="px-3 text-slate-400 hover:text-slate-800 h-full flex items-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, true)}
                          className="px-3 text-slate-400 hover:text-slate-800 h-full flex items-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Operational Trigger Actions */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                      <button className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-2.5 px-5 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase">
                        <ShoppingBag size={14} /> Add To Cart
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 text-xs font-bold transition-colors"
                      >
                        <X size={14} /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row Block */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <Link 
                href="/cart"
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3 px-6 rounded-sm uppercase tracking-wide bg-white transition-all shadow-sm"
              >
                Go To Cart
              </Link>
              
              {/* Share block matching screenshot color styling parameters */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <span>Share:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { icon: Heart, color: "text-red-400 border-red-50 hover:bg-red-50" },
                    { icon: Mail, color: "text-emerald-500 border-emerald-50 hover:bg-emerald-50" },
                    { icon: Copy, color: "text-slate-500 border-slate-100 hover:bg-slate-50" }
                  ].map((item, idx) => (
                    <button 
                      key={idx} 
                      className={`w-8 h-8 border rounded-sm flex items-center justify-center bg-white transition-colors shadow-sm ${item.color}`}
                    >
                      <item.icon size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          /* --- STATE B: EMPTY WISHLIST FRAME VIEW --- */
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100/60 mb-6 text-slate-300">
              <Heart size={44} className="stroke-1" />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mb-8 leading-relaxed">
              Save your favorite items here so you can easily find them later.
            </p>
            <Link 
              href="/shop" 
              className="bg-[#0B1526] hover:bg-slate-800 text-white text-xs font-bold py-3.5 px-8 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
            >
              <ShoppingBag size={14} /> Start Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}