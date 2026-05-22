'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Loader2, ShoppingBag } from "lucide-react";
import { fetchPublicProducts, ProductItemBackend } from "../../lib/api/auth";

const ProductItem = ({ product }: { product: ProductItemBackend }) => (
  <div className="flex gap-4 group border-b border-slate-100 pb-6 last:border-0 text-left">
    
    {/* Product Image wrapped inside detail link anchor */}
    <Link 
      href={`/shop/${product.id}`} 
      className="relative w-32 h-32 flex-shrink-0 bg-slate-50 border border-slate-100/40 rounded-lg overflow-hidden block z-0"
    >
      <Image 
  src={product.image_url || "/placeholder-product.png"} 
  alt={product.name} 
  fill 
  sizes="(max-width: 768px) 128px, 128px" // Tells Next.js to only request an image optimized for a 128px grid footprint!
  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
/>
    </Link>

    <div className="flex flex-col justify-center space-y-1.5 min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-slate-400 font-bold truncate max-w-[150px] uppercase tracking-wider">
          {product.vendor_name || "Jummall Official"}
        </span>
        {product.is_verified_store !== false && (
          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shrink-0 shadow-2xs">
            <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
          </div>
        )}
      </div>

      {/* Product Title wrapped inside detail link anchor */}
      <Link href={`/shop/${product.id}`} className="block group/title">
        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover/title:text-[#149fcd] transition-colors" title={product.name}>
          {product.name}
        </h3>
      </Link>

      {/* Star Ratings Summary Block */}
      <div className="flex items-center gap-0.5 text-orange-400">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={11} 
            fill={i < Math.round(product.rating_average || 5) ? "currentColor" : "none"} 
            className={i < Math.round(product.rating_average || 5) ? "text-orange-400" : "text-slate-200"} 
          />
        ))}
        <span className="text-[10px] text-slate-400 ml-1 font-medium">({product.reviews_count || 0})</span>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <span className="text-sm font-black text-[#149fcd]">
          {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(product.price).replace("NGN", "₦")}
        </span>
      </div>
    </div>

  </div>
);

export default function ProductLists() {
  const [saleProducts, setSaleProducts] = useState<ProductItemBackend[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<ProductItemBackend[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListsData = async () => {
    try {
      setLoading(true);
      
      // Concurrently stream on-sale and trending catalog queries
      const [saleData, trendingData] = await Promise.all([
        fetchPublicProducts({ tag: "on-sale" }),
        fetchPublicProducts({ tag: "trending" })
      ]);

      setSaleProducts(Array.isArray(saleData) ? saleData.slice(0, 3) : []);
      setTrendingProducts(Array.isArray(trendingData) ? trendingData.slice(0, 3) : []);
    } catch (err) {
      console.error("Error updating side columns feed indexes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Safe wrapper function container resolving the set-state-in-effect log error
  useEffect(() => {
    const initializeSplitLists = async () => {
      await fetchListsData();
    };
    initializeSplitLists();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-2 min-h-[350px]">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs font-semibold text-slate-400">Loading catalog matrix blocks...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-50">
      
      {/* ON SALE LEFT ROW COLUMN */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 font-montserrat tracking-tight uppercase text-left border-b border-slate-100 pb-3">
          On Sale
        </h2>
        <div className="space-y-6">
          {saleProducts.length === 0 ? (
            <div className="py-12 bg-slate-50 border border-dashed border-slate-100 flex flex-col items-center justify-center rounded text-slate-400 gap-1">
              <ShoppingBag size={20} className="stroke-1" />
              <p className="text-xs font-medium">No active discounted items found.</p>
            </div>
          ) : (
            saleProducts.map(p => <ProductItem key={p.id} product={p} />)
          )}
        </div>
      </div>

      {/* TRENDING PRODUCTS RIGHT ROW COLUMN */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 font-montserrat tracking-tight uppercase text-left border-b border-slate-100 pb-3">
          Trending Products
        </h2>
        <div className="space-y-6">
          {trendingProducts.length === 0 ? (
            <div className="py-12 bg-slate-50 border border-dashed border-slate-100 flex flex-col items-center justify-center rounded text-slate-400 gap-1">
              <ShoppingBag size={20} className="stroke-1" />
              <p className="text-xs font-medium">No trending items discovered.</p>
            </div>
          ) : (
            trendingProducts.map(p => <ProductItem key={p.id} product={p} />)
          )}
        </div>
      </div>

    </section>
  );
}