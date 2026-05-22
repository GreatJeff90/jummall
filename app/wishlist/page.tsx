'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, ShoppingBag, Minus, Plus, X, Mail, Copy, Loader2, RefreshCw 
} from "lucide-react";
import { fetchFavouritesAPI, removeFavouriteAPI, addProductToCartAPI, FavouriteProductAPI } from "../lib/api/auth";

interface WishlistItemState {
  product: FavouriteProductAPI;
  quantity: number;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItemState[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const syncFavouritesData = async () => {
    try {
      setLoading(true);
      const data = await fetchFavouritesAPI();
      const initializedStates = (Array.isArray(data) ? data : []).map(p => ({
        product: p,
        quantity: 1
      }));
      setItems(initializedStates);
    } catch (err) {
      console.error("Failed synchronizing favourites logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleInitialHydration = async () => {
      await syncFavouritesData();
    };
    
    handleInitialHydration();
  }, []);

  const updateQuantity = (productId: string, increment: boolean) => {
    setItems(prev => prev.map(item => {
      if (item.product._id === productId) {
        const newQty = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      setActionId(productId);
      // Optimistically clean view array logs instantly
      setItems(prev => prev.filter(item => item.product._id !== productId));
      await removeFavouriteAPI(productId);
    } catch (err) {
      console.error("Failed removing target favorite profile:", err);
    } finally {
      setActionId(null);
    }
  };

  const handleAddToCartAction = async (item: WishlistItemState) => {
    try {
      setActionId(item.product._id);
      await addProductToCartAPI(item.product._id, item.quantity);
      alert("Staged product rule items successfully added to your shopping cart!");
    } catch (err) {
      alert("Authentication token expired or absent. Please sign in first.");
    } finally {
      setActionId(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(value).replace("NGN", "₦");
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-44 md:h-32 md:mb-12 w-full flex items-center overflow-hidden border-b border-slate-100 select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Wishlist Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col items-start text-left">
          <h1 className="text-3xl font-black text-[#0F172A] font-montserrat uppercase tracking-tight">Wishlist</h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Link href="/" className="hover:text-[#149fcd]">Home</Link> <span className="text-slate-300">/</span> <span className="text-[#149fcd]">Wishlist</span>
          </p>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 min-h-[350px]">
            <Loader2 size={32} className="animate-spin text-[#149FCD]" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing your favorited items...</p>
          </div>
        ) : items.length > 0 ? (
          
          /* --- STATE A: ACTIVE WISHLIST CONTAINER LIST --- */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="w-full border border-slate-100 rounded-sm overflow-hidden bg-white shadow-xs">
              
              {/* Desktop Table Headers */}
              <div className="hidden md:grid grid-cols-12 bg-slate-50/70 border-b border-slate-100 px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-left select-none">
                <div className="col-span-6">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Wishlist Items Rows Grid */}
              <div className="divide-y divide-slate-100">
                {items.map((wrapper) => {
                  const p = wrapper.product;
                  const mainImg = p.images?.find(i => i.is_main)?.url || p.images?.[0]?.url || "/placeholder-product.png";
                  
                  return (
                    <div key={p._id} className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-6 gap-4 md:gap-0 bg-white">
                      
                      {/* Item Details Block */}
                      <div className="col-span-1 md:col-span-6 flex items-center gap-4 text-left">
                        <div className="relative w-16 h-20 bg-slate-50 border border-slate-200/60 rounded-sm overflow-hidden shrink-0 shadow-2xs">
                          <Image src={mainImg} alt={p.name} fill sizes="64px" className="object-contain p-1" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <h3 className="text-sm font-black text-slate-800 leading-snug truncate max-w-md" title={p.name}>
                            {p.name}
                          </h3>
                          <div className="flex items-center gap-2 select-none">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              Vendor: <span className="text-slate-600">{p.vendor_name || "Jummall Official"}</span>
                            </span>
                            {p.is_active && (
                              <span className="text-emerald-500 font-bold text-[11px] lowercase">(In stock)</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
                            SKU: {p.sku || p._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* Price Block */}
                      <div className="col-span-1 md:col-span-2 text-left">
                        <span className="text-sm font-black text-slate-950">
                          {formatCurrency(p.price)}
                        </span>
                      </div>

                      {/* Quantity Control Buttons */}
                      <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center select-none">
                        <div className="flex items-center border border-slate-200 rounded-sm bg-white h-9">
                          <button 
                            type="button"
                            disabled={actionId === p._id}
                            onClick={() => updateQuantity(p._id, false)}
                            className="px-3 text-slate-400 hover:text-slate-800 h-full flex items-center transition-colors disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-black text-slate-700 min-w-[20px] text-center">{wrapper.quantity}</span>
                          <button 
                            type="button"
                            disabled={actionId === p._id}
                            onClick={() => updateQuantity(p._id, true)}
                            className="px-3 text-slate-400 hover:text-slate-800 h-full flex items-center transition-colors disabled:opacity-30"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Operational Trigger Actions */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-4 select-none">
                        <button 
                          type="button"
                          disabled={actionId === p._id}
                          onClick={() => handleAddToCartAction(wrapper)}
                          className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-black h-9 px-4 rounded-sm flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider disabled:opacity-50"
                        >
                          {actionId === p._id ? <Loader2 size={12} className="animate-spin" /> : <ShoppingBag size={13} />} Buy
                        </button>
                        <button 
                          type="button"
                          disabled={actionId === p._id}
                          onClick={() => handleRemoveItem(p._id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-red-500 text-xs font-bold transition-colors disabled:opacity-30"
                        >
                          <X size={14} /> <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Row Block */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 select-none">
              <Link 
                href="/cart"
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black py-3.5 px-6 rounded-sm uppercase tracking-widest bg-white transition-all shadow-sm flex items-center gap-2"
              >
                <ShoppingBag size={14} /> Go To Cart
              </Link>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <span>Share wishlist:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { icon: Heart, color: "text-red-400 border-red-50 hover:bg-red-50" },
                    { icon: Mail, color: "text-emerald-500 border-emerald-50 hover:bg-emerald-50" },
                    { icon: Copy, color: "text-slate-500 border-slate-100 hover:bg-slate-50" }
                  ].map((item, idx) => (
                    <button 
                      key={idx} 
                      type="button"
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
          <div className="flex flex-col items-center justify-center text-center py-16 select-none animate-in fade-in duration-200">
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200/60 mb-6 text-slate-300 shadow-2xs">
              <Heart size={36} className="stroke-[1.5]" />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mb-8 leading-relaxed font-medium">
              Stash your favorite things here to keep tracking price drops or coordinate orders smoothly later.
            </p>
            <Link 
              href="/shop" 
              className="bg-[#0B1526] hover:bg-slate-800 text-white text-xs font-black py-3.5 px-8 rounded-sm flex items-center gap-2 transition-all shadow-md uppercase tracking-widest"
            >
              <ShoppingBag size={14} /> Start Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}