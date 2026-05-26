'use client';

import {toast} from "sonner";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { 
  ShoppingBag, LayoutGrid, Loader2
} from "lucide-react";
import { fetchPublicProducts, addProductToCartAPI } from "../../lib/api/auth";
import { Skeleton } from "../../components/ui/skeleton/Skeleton";

interface ShopProductGridProps {
  state?: string;
}

// Mirror skeleton grid matching exactly the grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 layout structure
const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div key={i} className="flex flex-col w-full">
        {/* Matches aspect-square bg-slate-100 rounded-3xl precisely */}
        <Skeleton className="aspect-square w-full rounded-3xl bg-slate-100 mb-4" />
        <div className="space-y-2">
          {/* Product name lines mirror matching typographic weights */}
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default function ShopProductGrid({ state = "" }: ShopProductGridProps) {
  const [sortBy, setSortBy] = useState("Default");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['publicProducts', state, sortBy],
    queryFn: async () => {
      const data = await fetchPublicProducts({ state });
      const sortedData = Array.isArray(data) ? [...data] : [];
      
      if (sortBy === "Price: Low to High") {
        sortedData.sort((a, b) => a.price - b.price);
      }
      return sortedData;
    },
  });

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingId(productId);
      await addProductToCartAPI(productId, 1);
      setAddedSuccessId(productId);
      setTimeout(() => setAddedSuccessId(null), 2000);
    } catch {
      toast.error("Authentication token expired.");
    } finally {
      setAddingId(null);
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value).replace("NGN", "₦");

  return (
    <div className="flex-1 text-left font-sans">
      {/* Toolbar */}
      <div className="flex justify-between mb-10 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 border flex items-center justify-center"><LayoutGrid size={20} /></button>
          <span className="text-[13px] text-slate-400">
            {isLoading ? "Loading..." : `Showing ${products.length} products`}
          </span>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-4 py-2 text-sm">
          <option value="Default">Default sorting</option>
          <option value="Price: Low to High">Price: Low to High</option>
        </select>
      </div>

      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-4">
                <Link href={`/shop/${product.id}`} className="absolute inset-0 z-10">
                  <Image src={product.image_url || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                </Link>
                {/* Interactions */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button onClick={() => handleAddToCart(product.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {addingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <ShoppingBag size={18} />}
                  </button>
                </div>
              </div>
              
              <h3 className="text-sm font-black text-slate-800">{product.name}</h3>
              <p className="font-bold">{formatCurrency(product.price)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}