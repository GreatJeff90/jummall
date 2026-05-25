'use client';

import React, { useState } from "react";
import { Eye, Heart, ShoppingBag, Star, RefreshCw, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts, useAddToCart } from "@/app/hooks/useEcosystem";
import { ProductItemBackend } from "../../lib/api/auth";

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('All');
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const tabs = ['All', 'Featured', 'On sale', 'Trending', 'Top rated'];

  // 1. Compute dynamic tag variables safely from live selection states
  const queryTag = activeTab === 'All' ? undefined : activeTab.toLowerCase().replace(" ", "-");

  // 2. Consume the cached server queries reactively
  const { data: rawProducts, isLoading: loading } = useProducts({ tag: queryTag });
  const products = Array.isArray(rawProducts)
    ? (rawProducts as unknown as ProductItemBackend[])
    : [];

  // 3. Mount global basket integration pipeline mutations
  const { mutate: addToCart, isPending: addingToCart, variables } = useAddToCart();
  const addingId = addingToCart ? variables?.productId : null;

  const handleAddToCart = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAddedSuccessId(productId);
          setTimeout(() => setAddedSuccessId(null), 2000);
        },
        onError: () => {
          alert("Authentication required. Please sign into your account profile first.");
        }
      }
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-left font-sans">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight font-montserrat uppercase select-none">
          Trending <span className="text-[#22A7D0]">Products</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-0 select-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors focus:outline-none ${
                activeTab === tab ? 'text-[#22A7D0]' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Loader State */}
      {loading && products.length === 0 ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-2 select-none">
          <Loader2 size={32} className="animate-spin text-[#22A7D0]" />
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Filtering storefront catalog columns...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-[300px] bg-slate-50 rounded-xl border border-dashed border-slate-200/60 flex flex-col items-center justify-center p-8 text-center text-slate-400 select-none animate-in fade-in duration-150">
          <ShoppingBag size={36} className="stroke-1 mb-2" />
          <p className="text-sm font-bold">No active items discovered under this tier.</p>
        </div>
      ) : (
        /* --- RENDER FEED GRID MATRIX --- */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-in fade-in duration-200">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white overflow-hidden relative h-full">
              
              {/* Badges Overlay Collection */}
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 select-none">
                {product.badges?.map((b: string) => (
                  <span 
                    key={b} 
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm text-white shadow-xs tracking-wide ${
                      b.toLowerCase() === 'hot' ? 'bg-orange-500' : b.toLowerCase() === 'new' ? 'bg-teal-500' : 'bg-red-500'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Image Container with Actions */}
              <div className="relative aspect-[4/5] bg-[#F8F9FA] rounded-xl overflow-hidden mb-4 border border-slate-100/50">
                <Link href={`/shop/${product.id}`} className="absolute inset-0 block z-0">
                  <Image 
                    src={product.image_url || "/placeholder-product.png"} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                
                {/* Vertical Hover Actions Bar */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-20">
                  <button 
                    type="button"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addingId === product.id}
                    className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-[#22A7D0] hover:text-white transition-all disabled:bg-slate-50 focus:outline-none"
                  >
                    {addedSuccessId === product.id ? (
                      <CheckCircle2 size={16} className="text-emerald-500 animate-bounce" />
                    ) : addingId === product.id ? (
                      <Loader2 size={15} className="animate-spin text-[#22A7D0]" />
                    ) : (
                      <ShoppingBag size={16} />
                    )}
                  </button>

                  <Link 
                    href={`/shop/${product.id}`}
                    className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-[#22A7D0] hover:text-white transition-all"
                  >
                    <Eye size={16} />
                  </Link>

                  <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-[#22A7D0] hover:text-white transition-all focus:outline-none">
                    <Heart size={16} />
                  </button>

                  <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-[#22A7D0] hover:text-white transition-all focus:outline-none">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              {/* Product Metadata Info Card Section */}
              <div className="space-y-1 mt-auto flex flex-col justify-end">
                <div className="flex items-center gap-1.5 select-none">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">JUMMALL OFFICIAL STORE</span>
                  {product.is_verified_store !== false && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-xs shrink-0">
                      <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
                    </div>
                  )}
                </div>

                <Link href={`/shop/${product.id}`} className="text-sm font-semibold text-slate-800 hover:text-[#22A7D0] transition-colors leading-snug line-clamp-2 h-10 block">
                  {product.name}
                </Link>

                <div className="flex items-center gap-0.5 text-orange-400 pt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={11} 
                      fill={i < Math.round(product.rating_average || 5) ? "currentColor" : "none"} 
                      className={i < Math.round(product.rating_average || 5) ? "text-orange-400" : "text-slate-200"} 
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 font-medium ml-1 select-none">({product.reviews_count || 50})</span>
                </div>

                <p className="text-base font-black text-slate-900 tracking-tight pt-0.5">
                  {formatCurrency(product.price)}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}