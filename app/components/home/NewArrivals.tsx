'use client';

import { useState } from "react";
import { Star, Heart, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useProducts, useAddToCart } from "@/app/hooks/useEcosystem";

// --- 1. FILTER REELS SPECIFICATIONS ---
const categoriesTabs = [
  { label: "All", slug: "all" },
  { label: "Electronics", slug: "electronics" },
  { label: "Fashion", slug: "fashion" },
  { label: "Home & Living", slug: "home-living" },
  { label: "Beauty", slug: "beauty" },
  { label: "Gaming", slug: "gaming" }
];

// --- 2. HIGH FIDELITY 10-ITEM DATA PREVIEW ARRAY ---
const fallbackArrivals = [
  {
    id: "na-1",
    name: "Samsung 55\" Q70C QLED 4K Smart TV",
    price: 895000,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 340,
    merchant: "VividHome",
    isFreeShipping: true,
    category: "electronics",
    image: "/electronics-category-img.png"
  },
  {
    id: "na-2",
    name: "Hand-stitched Leather Tote — Camel Tan",
    price: 149000,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 87,
    merchant: "Adérónkẹ́ Atelier",
    isFreeShipping: true,
    category: "fashion",
    image: "/chic-accessories-on-white-background.png"
  },
  {
    id: "na-3",
    name: "Vitamin C Brightening Serum 30ml — Glass Skin",
    price: 24500,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 1500,
    merchant: "Glow VI",
    isFreeShipping: false,
    category: "beauty",
    image: "/phone-accessories-category-img.png"
  },
  {
    id: "na-4",
    name: "Acetate Pilot Sunglasses — Tortoiseshell",
    price: 78000,
    oldPrice: null,
    discount: null,
    rating: 4,
    reviews: 124,
    merchant: "Iris Lagos",
    isFreeShipping: false,
    category: "fashion",
    image: "/Smartwatches.png"
  },
  {
    id: "na-5",
    name: "Bose SoundLink Revolve+ II Bluetooth Speaker",
    price: 184900,
    oldPrice: 210000,
    discount: "-12%",
    rating: 5,
    reviews: 560,
    merchant: "Tunde Audio",
    isFreeShipping: true,
    category: "electronics",
    image: "/slider-3.png"
  },
  {
    id: "na-6",
    name: "DJI Mini 4 Pro Fly More Combo with RC 2",
    price: 1250000,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 203,
    merchant: "SkyTech NG",
    isFreeShipping: true,
    category: "electronics",
    image: "/phone-tablets.png"
  },
  {
    id: "na-7",
    name: "MagSafe Silicone Case for iPhone 15 Pro Max",
    price: 18500,
    oldPrice: null,
    discount: null,
    rating: 4,
    reviews: 3200,
    merchant: "CaseHub",
    isFreeShipping: false,
    category: "electronics",
    image: "/iPhone 15 Pro Max.png"
  },
  {
    id: "na-8",
    name: "Tom Ford Black Orchid Eau de Parfum 100ml",
    price: 298000,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 445,
    merchant: "Olfact Lagos",
    isFreeShipping: true,
    category: "beauty",
    image: "/kitchen-items-category-img.png"
  },
  {
    id: "na-9",
    name: "Keychron K8 Pro Wireless Mechanical Keyboard — Red Switches",
    price: 142000,
    oldPrice: 158000,
    discount: "-15%",
    rating: 5,
    reviews: 521,
    merchant: "KeebTown",
    isFreeShipping: false,
    category: "gaming",
    image: "/computers-category-img.png"
  },
  {
    id: "na-10",
    name: "Heavyweight Cotton Tee — Forest Green Oversized",
    price: 24000,
    oldPrice: null,
    discount: null,
    rating: 4,
    reviews: 212,
    merchant: "Lago Streetwear",
    isFreeShipping: false,
    category: "fashion",
    image: "/slider-2.png"
  }
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("all");
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  // TanStack core hook integrations
  const { data: serverProducts, isLoading } = useProducts({ tag: "new" });
  const { mutate: addToCart, isPending: addingToCart, variables } = useAddToCart();
  const activeAddingId = addingToCart ? variables?.productId : null;

  // Seamless data selection framework
  const liveCatalogList = serverProducts && Array.isArray(serverProducts) && serverProducts.length > 0
  ? (serverProducts as Array<{
      id?: string;
      _id?: string;
      name: string;
      price: number;
      compare_at_price?: number;
      promotion?: { discount_percent: number };
      rating_average?: number;
      reviews_count?: number;
      sku?: string;
      category?: string;
      image_url?: string;
    }>).map((p) => ({
        id: p.id || p._id || "",
        name: p.name,
        price: p.price,
        oldPrice: p.compare_at_price || null,
        discount: p.promotion ? `-${p.promotion.discount_percent}%` : null,
        rating: Math.round(p.rating_average || 5),
        reviews: p.reviews_count || 0,
        merchant: p.sku && p.sku.includes('-') ? p.sku.split('-')[1] : "Official Merchant",
        isFreeShipping: p.price >= 100000,
        category: p.category || "electronics",
        image: p.image_url || "/placeholder-product.png"
      }))
  : fallbackArrivals;

  // Client filtering strategy tracking slug nodes
  const filteredProducts = activeTab === "all"
    ? liveCatalogList
    : liveCatalogList.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  const handleCartExecution = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAddedSuccessId(productId);
          setTimeout(() => setAddedSuccessId(null), 2000);
        },
        onError: () => {
          toast.error("Session missing. Log back into your profile to alter cart entries.");
        }
      }
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans select-none text-left">
      
      {/* ================= HEADER SUBSECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
            Just In
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none">
            New arrivals this week.
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2">
            Fresh drops from 250+ verified vendors across Nigeria. Updated every Monday.
          </p>
        </div>

        <Link 
          href="/shop?sort=newest" 
          className="shrink-0 border border-slate-200 hover:border-[#149fcd] hover:text-[#149fcd] transition-all text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 bg-white text-slate-600 shadow-3xs"
        >
          View all new arrivals <span>→</span>
        </Link>
      </div>

      {/* ================= CATEGORY TABS RAILS ================= */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-px mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
        {categoriesTabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => setActiveTab(tab.slug)}
            className={`text-xs font-bold px-5 py-3 border-b-2 transition-all tracking-wide uppercase ${
              activeTab === tab.slug
                ? "border-[#149fcd] text-[#149fcd] font-black"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= PRODUCTS CARD GRID FEED ================= */}
      {isLoading ? (
        <div className="w-full h-80 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin text-[#149fcd] mb-3" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest">Compiling recent drops feed...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100/80 p-4 flex flex-col justify-between group/card transition-all duration-300 hover:shadow-xl relative"
            >
              
              {/* Image Header Block Area */}
              <div className="relative w-full aspect-square bg-[#FAFAFA] rounded-xl overflow-hidden flex items-center justify-center p-4">
                
                {/* Condition Tag Left Badge */}
                {!product.discount && (
                  <div className="absolute top-2.5 left-2.5 z-20 bg-[#10B981] text-white text-[9px] font-black uppercase tracking-wide px-2.5 py-0.5 rounded shadow-3xs">
                    New
                  </div>
                )}

                {/* Percentage Discount Display Right Badge */}
                {product.discount && (
                  <div className="absolute top-2.5 right-2.5 z-20 bg-[#EF4444] text-white text-[9px] font-black uppercase tracking-wide px-2.5 py-0.5 rounded shadow-3xs">
                    {product.discount}
                  </div>
                )}

                {/* Floating Heart Switch */}
                <button 
                  type="button"
                  className="absolute bottom-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <Heart size={14} className="stroke-[2.5]" />
                </button>

                {/* Main Product Canvas Display Asset */}
                <div className="relative w-full h-full transform transition-transform duration-500 group-hover/card:scale-104">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Data Specifications Text Block Layout */}
              <div className="pt-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  
                  {/* Verified Merchant Text Block Line */}
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    Sold by <span className="text-slate-500 font-black hover:underline cursor-pointer">{product.merchant}</span>
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full flex items-center justify-center text-white p-0.5 shadow-3xs"><div className="w-0.5 h-1 border-r border-b border-white rotate-45 mb-0.5" /></div>
                  </span>

                  {/* Product Title Header Description */}
                  <Link href={`/shop/${product.id}`} className="block">
                    <h3 className="text-xs sm:text-[13px] font-black text-slate-800 tracking-tight leading-snug line-clamp-2 min-h-[36px] uppercase font-montserrat group-hover/card:text-[#149fcd] transition-colors" title={product.name}>
                      {product.name}
                    </h3>
                  </Link>

                  {/* Multi-star metrics configuration rows */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={`fill-current ${i < product.rating ? "text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {product.rating}.0 ({product.reviews})
                    </span>
                  </div>

                  {/* Financial Metrics Pricing Stack */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[15px] font-black text-[#149fcd] tracking-tight">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[11px] text-slate-400 line-through font-semibold">
                        ₦{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Segment Action Rows: Logistics Tag & Cart Actions */}
                <div className="pt-3 mt-auto space-y-3">
                  
                  {/* Free Logistic Tag Element */}
                  <div className="h-5 flex items-center">
                    {product.isFreeShipping && (
                      <div className="bg-[#E6F4EA] text-[#10B981] text-[9px] font-black uppercase tracking-wide px-2 rounded-md flex items-center gap-1 w-fit border border-emerald-100/50 select-none">
                        🚚 Free shipping
                      </div>
                    )}
                  </div>

                  {/* Modular Add To Cart Action Button */}
                  <button
                    type="button"
                    disabled={activeAddingId === product.id}
                    onClick={() => handleCartExecution(product.id)}
                    className="w-full h-10 bg-[#149fcd] hover:bg-[#118eb8] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-98"
                  >
                    {addedSuccessId === product.id ? (
                      <>
                        <CheckCircle2 size={13} className="text-white animate-bounce" /> Added
                      </>
                    ) : activeAddingId === product.id ? (
                      <Loader2 size={13} className="animate-spin text-white" />
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* ================= LOAD MORE CTA CONTROL SECTION ================= */}
      <div className="w-full flex items-center justify-center pt-12">
        <button
          type="button"
          className="border border-slate-200 hover:border-[#149fcd] text-slate-700 hover:text-[#149fcd] bg-white text-xs font-black tracking-widest uppercase px-10 py-4 rounded-xl transition-all shadow-3xs active:scale-98"
        >
          Load more new arrivals +
        </button>
      </div>

    </section>
  );
}