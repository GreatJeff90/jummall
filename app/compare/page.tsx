'use client';

import {toast} from "sonner";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowLeftRight, Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { useAddToCart } from "@/app/hooks/useEcosystem";
import { Skeleton } from "../components/ui/skeleton/Skeleton";

interface CompareItem {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  sku: string;
  in_stock: boolean;
  rating_average?: number;
}

// Mirror table skeleton matching the specific matrix design rows
const CompareTableSkeleton = () => (
  <div className="w-full border border-slate-100 rounded-sm overflow-x-auto shadow-sm bg-white animate-pulse">
    <table className="w-full border-collapse text-left text-sm table-fixed">
      <tbody>
        {/* Product Images Row */}
        <tr className="border-b border-slate-100">
          <td className="p-5 border-r border-slate-100 bg-[#F8FAFC] w-[180px]"><Skeleton className="h-4 w-16" /></td>
          {[1, 2, 3].map((i) => (
            <td key={i} className="p-6 text-center border-r border-slate-100 last:border-r-0 min-w-[280px]">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="w-36 h-44 rounded-sm" />
                <Skeleton className="h-4 w-4/5 mx-auto" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </div>
            </td>
          ))}
        </tr>
        {/* Description Row */}
        <tr className="border-b border-slate-100">
          <td className="p-5 border-r border-slate-100 bg-[#F8FAFC]"><Skeleton className="h-4 w-20" /></td>
          {[1, 2, 3].map((i) => (
            <td key={i} className="p-6 border-r border-slate-100 last:border-r-0 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </td>
          ))}
        </tr>
        {/* Price Row */}
        <tr className="border-b border-slate-100">
          <td className="p-5 border-r border-slate-100 bg-[#F8FAFC]"><Skeleton className="h-4 w-12" /></td>
          {[1, 2, 3].map((i) => (
            <td key={i} className="p-6 border-r border-slate-100 last:border-r-0"><Skeleton className="h-4 w-20 mx-auto" /></td>
          ))}
        </tr>
        {/* SKU Row */}
        <tr className="border-b border-slate-100">
          <td className="p-5 border-r border-slate-100 bg-[#F8FAFC]"><Skeleton className="h-4 w-10" /></td>
          {[1, 2, 3].map((i) => (
            <td key={i} className="p-6 border-r border-slate-100 last:border-r-0"><Skeleton className="h-3 w-16 mx-auto" /></td>
          ))}
        </tr>
        {/* Cart Button Row */}
        <tr className="border-b border-slate-100">
          <td className="p-5 border-r border-slate-100 bg-[#F8FAFC]"><Skeleton className="h-4 w-20" /></td>
          {[1, 2, 3].map((i) => (
            <td key={i} className="p-6 border-r border-slate-100 last:border-r-0"><Skeleton className="h-9 w-32 mx-auto" /></td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

export default function ComparePage() {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart();

  const { data: compareItems = [], isLoading } = useQuery<CompareItem[]>({
    queryKey: ["compareList"],
    queryFn: async () => {
      const response = await api.get("/compare");
      return response.data || [];
    },
  });

  const removeCompareMutation = useMutation({
    mutationFn: async (itemId: string | number) => {
      const response = await api.delete(`/compare/${itemId}`);
      return response.data;
    },
    onSuccess: (updatedList) => {
      queryClient.setQueryData(["compareList"], updatedList);
    },
    onError: () => {
      toast.error("Failed removing item from comparison registry dashboard logs.");
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Login Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col items-start text-left">
          <h1 className="text-5xl tracking-tight text-[#0F172A]">Compare</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Compare</span>
          </p>
        </div>
      </div>

      {/* --- Main Section Container --- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <CompareTableSkeleton />
        ) : compareItems.length > 0 ? (
          
          /* --- STATE A: SPECIFIED ACTIVE JUMMALL ROW-MATRIX GRID --- */
          <div className="w-full border border-slate-100 rounded-sm overflow-x-auto shadow-sm bg-white">
            <table className="w-full border-collapse text-left text-sm table-fixed">
              <tbody>
                
                {/* 1. Product Title & Image Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] w-[180px] text-xs uppercase tracking-wide select-none">
                    Product
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0 min-w-[280px]">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-36 h-40 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
                          <Image 
                            src={item.image_url || "/placeholder-product.png"} 
                            alt={item.name} 
                            fill 
                            sizes="144px"
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-700 leading-tight">
                            {item.name}
                          </h3>
                          {item.in_stock && (
                            <p className="text-[#149fcd] font-bold text-[11px] lowercase select-none">(In stock)</p>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. Description Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    Description
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-left border-r border-slate-100 last:border-r-0 text-xs text-slate-500 leading-relaxed max-w-xl">
                      <div className="max-w-2xl mx-auto line-clamp-6" title={item.description}>
                        {item.description}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. Price Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    Price
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center font-black text-slate-900 border-r border-slate-100 last:border-r-0 text-sm">
                      {formatCurrency(item.price)}
                    </td>
                  ))}
                </tr>

                {/* 4. SKU Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    SKU
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center text-xs font-bold text-slate-400 border-r border-slate-100 last:border-r-0 tracking-wider select-none">
                      {item.sku}
                    </td>
                  ))}
                </tr>

                {/* 5. Add To Cart Button Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    Add to cart
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <button 
                        type="button"
                        disabled={addingToCart}
                        onClick={() => addToCart({ productId: String(item.id), quantity: 1 })}
                        className="border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white text-xs font-bold py-2.5 px-6 rounded-sm uppercase tracking-wide transition-all bg-white shadow-2xs select-none"
                      >
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>

                {/* 6. Rating Star Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    Rating
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => {
                          const ratingThreshold = Math.round(item.rating_average || 5);
                          return (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < ratingThreshold ? "currentColor" : "none"} 
                              className={i < ratingThreshold ? "text-orange-400" : "text-slate-200"} 
                            />
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 7. Remove Interactive Bin Row */}
                <tr>
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-[#F8FAFC] text-xs uppercase tracking-wide select-none">
                    Remove
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <button 
                        type="button"
                        disabled={removeCompareMutation.isPending}
                        onClick={() => removeCompareMutation.mutate(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 disabled:opacity-40"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          
          /* --- STATE B: EMPTY CONTAINER FALLBACK VIEW --- */
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100/60 mb-6 text-slate-300">
              <ArrowLeftRight size={40} className="stroke-[1.25]" />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 select-none">
              Your compare list is empty
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mb-8 leading-relaxed select-none">
              Add products to compare their features and make the best choice.
            </p>
            <Link 
              href="/shop" 
              className="bg-[#0B1526] hover:bg-slate-800 text-white text-xs font-bold py-3.5 px-8 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wider select-none"
            >
              <ShoppingBag size={14} /> Start Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}