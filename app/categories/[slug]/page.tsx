'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image"; // Added native Next image component optimization
import { fetchCategoriesAPI, fetchProductsByCategoryAPI, CategoryItem, ProductAsset } from "@/app/lib/api/auth";
import UnifiedCategorySidebar from "@/app/components/categories/UnifiedCategorySidebar";

export default function DynamicCategoryCatalogPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const synchronizeCatalogData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const [categoriesResponse, productsData] = await Promise.all([
          fetchCategoriesAPI(),
          fetchProductsByCategoryAPI(slug)
        ]);

        setCategories(categoriesResponse.items || []);
        setProducts(productsData || []);
      } catch (err) {
        console.error("Catalog ecosystem synchronization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    synchronizeCatalogData();
  }, [slug]);

  const activeCategoryName = categories.find(c => c.slug === slug)?.name || slug;

  if (loading && categories.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#149FCD]" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Assembling Jummall Catalog streams...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* --- DYNAMIC HEADER ACCORDION --- */}
        <div className="mb-8 border-b border-slate-100 pb-5 select-none">
          <p className="text-xs font-black text-[#149FCD] uppercase tracking-widest">E-commerce Marketplace</p>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mt-1 capitalize">
            {activeCategoryName.replace(/-/g, ' ')}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          <UnifiedCategorySidebar categories={categories} currentSlug={slug} />

          {/* --- ACTIVE PRODUCT FEED MATRIX --- */}
          <section className="flex-1 w-full">
            {loading ? (
              <div className="w-full p-24 flex flex-col items-center justify-center space-y-2">
                <Loader2 size={24} className="animate-spin text-[#149FCD]" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Updating Product Listings...</span>
              </div>
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
                        {/* Swapped standard img tag for optimized Next.js Image component */}
                        <Image 
                          src={coverImage} 
                          alt={product.name} 
                          fill
                          sizes="(max-w-7xl) 33vw, 50vw, 100vw"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
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