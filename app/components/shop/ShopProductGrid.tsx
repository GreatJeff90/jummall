'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  CheckCircle2, 
  ShoppingBag, 
  Eye, 
  Heart, 
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  ChevronDown,
  Loader2,
  CheckCircle
} from "lucide-react";
import { fetchPublicProducts, addProductToCartAPI, ProductItemBackend } from "../../lib/api/auth";

export default function ShopProductGrid() {
  const [products, setProducts] = useState<ProductItemBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Default");
  const [limit, setLimit] = useState(24);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const loadShopProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicProducts();
      
      // Changed from 'let' to 'const' to completely satisfy the eslint validation rule!
      const sortedData = Array.isArray(data) ? [...data] : [];

      if (sortBy === "Price: Low to High") {
        sortedData.sort((a, b) => a.price - b.price);
      }

      setProducts(sortedData.slice(0, limit));
    } catch (err) {
      console.error("Error updating public shop grid columns:", err);
    } finally {
      setLoading(false);
    }
  };

  // Encapsulated functional initialization block satisfying strict render hook tracing rules
  useEffect(() => {
    const initializeShopGridLifecycle = async () => {
      await loadShopProducts();
    };
    initializeShopGridLifecycle();
  }, [sortBy, limit]);

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingId(productId);
      await addProductToCartAPI(productId, 1);
      
      setAddedSuccessId(productId);
      setTimeout(() => setAddedSuccessId(null), 2000);
    } catch (err) {
      alert("Authentication token expired. Please sign back in to access cart functions.");
    } finally {
      setAddingId(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  return (
    <div className="flex-1 text-left font-sans">
      
      {/* --- Toolbar Section --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-4 border-b border-slate-100 gap-4 sm:gap-0 select-none">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <button type="button" className="w-10 h-10 flex items-center justify-center border border-slate-900 text-slate-900 rounded-xs bg-slate-50/20">
              <LayoutGrid size={20} />
            </button>
            <button type="button" className="w-10 h-10 flex items-center justify-center border border-slate-100 text-slate-400 hover:text-slate-900 transition-colors rounded-xs">
              <List size={20} />
            </button>
          </div>
          <span className="ml-4 text-[13px] font-medium text-slate-400">
            Showing 1 - {products.length} of {products.length} products
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="relative">
            <select 
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-sm px-5 py-2.5 text-[13px] font-bold text-slate-700 outline-none cursor-pointer pr-12 focus:border-[#149fcd]"
            >
              <option value="Default">Default sorting</option>
              <option value="Price: Low to High">Price: Low to High</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
              className="appearance-none bg-white border border-slate-200 rounded-sm px-5 py-2.5 text-[13px] font-bold text-slate-700 outline-none cursor-pointer pr-10 focus:border-[#149fcd]"
            >
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- Main Interactive View Area --- */}
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-2 bg-white border border-slate-100 rounded-sm shadow-2xs">
          <Loader2 size={32} className="animate-spin text-[#149fcd]" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing product data trees...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-[400px] bg-slate-50 border border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-8 text-slate-400 gap-1 shadow-inner">
          <ShoppingBag size={32} className="stroke-1" />
          <p className="text-sm font-bold">No retail entries matched this specific collection block.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 animate-in fade-in duration-200">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              
              {/* Image Wrapper Card */}
              <div className="relative aspect-square bg-[#F3F4F6] rounded-[2.5rem] overflow-hidden mb-4 shadow-2xs border border-slate-100/40">
                
                {/* Product Core Destination Link Routing */}
                <Link href={`/shop/${product.id}`} className="absolute inset-0 z-10 block">
                  <Image 
                    src={product.image_url || "/placeholder-product.png"} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 240px" // Explicit thumbnail bounding size parameters resolving fill constraints
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                
                {/* Badges Collection Matrix Layout */}
                <div className="absolute top-5 right-5 flex flex-wrap gap-1 justify-end z-20 max-w-[80%]">
                  {product.badges?.map((badge) => (
                    <span 
                      key={badge} 
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm text-white shadow-xs tracking-wider
                        ${badge.toLowerCase() === 'hot' ? 'bg-[#A83216]' : ''} 
                        ${badge.toLowerCase() === 'new' ? 'bg-[#065F46]' : ''}
                        ${badge.toLowerCase() === 'sale' ? 'bg-[#845309]' : ''}
                      `}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Hover Flyout Interaction Rails Overlay */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <button 
                    type="button"
                    disabled={addingId === product.id}
                    onClick={() => handleAddToCart(product.id)}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors disabled:bg-slate-50"
                  >
                    {addedSuccessId === product.id ? (
                      <CheckCircle size={18} className="text-emerald-500 animate-bounce" />
                    ) : addingId === product.id ? (
                      <Loader2 size={16} className="animate-spin text-[#149fcd]" />
                    ) : (
                      <ShoppingBag size={18} />
                    )}
                  </button>
                  
                  <Link 
                    href={`/shop/${product.id}`}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                  
                  <button type="button" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                    <Heart size={18} />
                  </button>
                  <button type="button" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                    <ArrowLeftRight size={18} />
                  </button>
                </div>
              </div>

              {/* Text Description Profile Meta */}
              <div className="space-y-2 px-1 mt-auto">
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">{product.vendor_name || "Jummall Merchant"}</p>
                
                <Link href={`/shop/${product.id}`} className="block group/title">
                  <div className="flex items-start gap-2 text-[#149fcd]">
                    {product.is_verified_store !== false && (
                      <CheckCircle2 size={15} className="fill-[#149fcd] text-white shrink-0 mt-0.5 shadow-2xs" />
                    )}
                    <h3 className="text-[14px] font-black text-[#2D3748] leading-tight line-clamp-2 group-hover/title:text-[#149fcd] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </Link>

                {/* Reviews Mapping block matrix config */}
                <div className="flex items-center gap-0.5 text-orange-400 pt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={13} 
                      fill={i < Math.round(product.rating_average || 5) ? "currentColor" : "none"} 
                      className={i < Math.round(product.rating_average || 5) ? "text-orange-400" : "text-slate-200"} 
                    />
                  ))}
                  <span className="text-[11px] text-gray-400 ml-2 font-semibold">({product.reviews_count || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[16px] font-black text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* --- Pagination Selection Bar Overlay --- */}
      <div className="mt-24 flex justify-center items-center gap-0 pt-10 border-t border-slate-100 select-none">
        <div className="flex border border-slate-200 rounded-sm overflow-hidden bg-white shadow-2xs">
          <button type="button" className="px-5 py-3 border-r border-slate-100 hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="px-5 py-3 border-r border-slate-100 bg-[#149fcd] text-white font-black text-[13px]">1</button>
          {[2, 3, 4].map((num) => (
            <button key={num} type="button" className="px-5 py-3 border-r border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-[13px]">
              {num}
            </button>
          ))}
          <button type="button" className="px-5 py-3 hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}