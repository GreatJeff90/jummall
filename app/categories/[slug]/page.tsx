'use client';

import React from "react";
import { useParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCategories, useProducts } from "@/app/hooks/useEcosystem";
import UnifiedCategorySidebar from "@/app/components/categories/UnifiedCategorySidebar";
import { Skeleton } from "../../components/ui/skeleton/Skeleton";

// Mirror skeleton grid matching grid-cols-1 sm:grid-cols-2 md:grid-cols-3
const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-xs p-0 flex flex-col h-full">
        {/* Aspect ratio box mirroring pt-[100%] */}
        <div className="relative pt-[100%] w-full">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        </div>
        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Layout wrapper matching sidebar + header alignment specs
const CatalogPageSkeleton = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 text-left">
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 border-b border-slate-100 pb-5 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Sidebar wireframe shell width matches Desktop layout definitions */}
        <div className="w-full lg:w-64 bg-white border border-slate-100 p-5 space-y-4 rounded-sm shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
        <section className="flex-1 w-full">
          <ProductGridSkeleton />
        </section>
      </div>
    </div>
  </div>
);

export default function DynamicCategoryCatalogPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: products = [], isLoading: loadingProducts } = useProducts({ category: slug });

  const activeCategoryName = categories.find(c => c.slug === slug)?.name || slug;

  // Render unified infrastructure wireframe skeleton during root taxonomy channel loads
  if (loadingCategories) {
    return <CatalogPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        <div className="mb-8 border-b border-slate-100 pb-5 select-none">
          <p className="text-xs font-black text-[#149FCD] uppercase tracking-widest">E-commerce Marketplace</p>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mt-1 capitalize">
            {activeCategoryName.replace(/-/g, ' ')}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          <UnifiedCategorySidebar categories={categories} currentSlug={slug} />

          <section className="flex-1 w-full">
            {loadingProducts ? (
              <ProductGridSkeleton />
            ) : products.length === 0 ? (
              <div className="w-full bg-white border border-slate-100 rounded-sm p-20 flex flex-col items-center justify-center text-center space-y-4 shadow-xs select-none">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 flex items-center justify-center rounded-full">
                  <ShoppingBag size={28} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">NOTHING HERE</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 max-w-xs">
                    No active product listings match this category filter configuration right now.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => {
                  const coverImage = product.images?.find(img => img.is_main)?.url || product.images?.[0]?.url || "/placeholder.jpg";
                  return (
                    <div key={product.id} className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col h-full cursor-pointer">
                      <div className="relative pt-[100%] bg-slate-50 border-b overflow-hidden">
                        <Image src={coverImage} alt={product.name} fill sizes="(max-w-7xl) 33vw, 50vw, 100vw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide truncate">{activeCategoryName}</h4>
                          <h2 className="text-sm font-bold text-slate-800 mt-1 line-clamp-2 min-h-[40px] tracking-tight">{product.name}</h2>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-slate-400 tracking-wide">Value</span>
                          <span className="text-sm font-black text-[#143D4A]">
                            ₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}