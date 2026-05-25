'use client';

import {toast} from "sonner";
import { ArrowRight, Star, ShoppingCart, Eye, Heart, RefreshCw, ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProducts, useAddToCart } from "@/app/hooks/useEcosystem";
import { ProductItemBackend } from "../../lib/api/auth";

const arrivalLinks = [
  { label: "Laptop", slug: "laptop" },
  { label: "Television & Video", slug: "television-video" },
  { label: "Cameras & Photos", slug: "cameras-photos" },
  { label: "Home Audio", slug: "home-audio" },
  { label: "Generators & Portable Power", slug: "generators-portable-power" },
  { label: "Tablets", slug: "tablets" },
  { label: "Smart TVs", slug: "smart-tvs" },
  { label: "Kitchen Items", slug: "kitchen" },
  { label: "LED TVs", slug: "led-tvs" },
  { label: "iPads", slug: "ipads" },
  { label: "Android Tablets", slug: "android-tablets" },
  { label: "Cookware", slug: "cookware" },
  { label: "Kitchen Utensils", slug: "kitchen-utensils" },
  { label: "Food Storage", slug: "food-storage" },
  { label: "Cleaning & Kitchen Care", slug: "cleaning-kitchen-care" },
  { label: "Electronic Accessories", slug: "electronic-accessories" },
  { label: "Photography Accessories", slug: "photography-accessories" },
  { label: "USB Cables", slug: "usb-cables" },
  { label: "Power Banks", slug: "power-banks" },
  { label: "Extension Boxes", slug: "extension-boxes" }
];

const promoSlides = [
  { id: 1, title: "Selected Novelty Products", price: "₦9,999.00" },
  { id: 2, title: "Top Rated Products", price: "₦5,599.00" }
];

export default function NewArrivals() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  // 1. Consume the global TanStack Query hook layer cleanly for new arrivals catalog items
  const { data: rawProducts, isLoading: loading } = useProducts({ tag: "new" });
  const products = Array.isArray(rawProducts) 
    ? (rawProducts as unknown as ProductItemBackend[]).slice(0, 3) 
    : [];

  // 2. Leverage the pre-configured global cart mutation channel
  const { mutate: addToCart, isPending: addingToCart, variables } = useAddToCart();
  const addingId = addingToCart ? variables?.productId : null;

  // Promo Banner Auto Sliders Effect Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleInclusionAction = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAddedSuccessId(productId);
          setTimeout(() => setAddedSuccessId(null), 2000);
        },
        onError: () => {
          toast.error("Authentication token absent. Log back into your profile to use cart features.");
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
    <section className="max-w-7xl mx-auto px-4 py-12 text-left font-sans">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-3xl text-slate-900 font-montserrat font-black uppercase tracking-tight">
          <span className="text-sky-500 border-b-4 border-sky-500 pb-4">New</span> Arrivals
        </h2>
        <div className="flex gap-2">
          <button type="button" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Column */}
        <div className="w-full md:w-1/4 flex flex-col gap-6">
          {/* List Card - Red Border */}
          <div className="border-2 border-rose-500 rounded-lg p-6 flex flex-col bg-white min-h-[650px] relative overflow-hidden shadow-xs">
            <div className="relative z-10 flex-grow">
              <h2 className="text-xl font-black text-slate-800 mb-2 font-montserrat uppercase tracking-tight">New Arrivals</h2>
              <div className="w-20 h-0.5 bg-sky-500 mb-6" />
              <ul className="space-y-2">
                {arrivalLinks.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/categories/${item.slug}`} className="text-[11px] font-bold text-slate-500 hover:text-rose-500 flex items-center gap-2 transition-colors uppercase tracking-wide">
                      <span className="w-1 h-1 bg-slate-300 rounded-full" /> {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative z-20 mt-8 pb-10">
              <Link href="/shop" className="text-sm font-black text-slate-800 flex items-center gap-2 hover:text-rose-500 group transition-colors uppercase tracking-wider">
                Start Shopping <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="absolute -right-4 -bottom-2 w-48 h-48 pointer-events-none z-0 select-none opacity-45">
               <Image src="/gadget-girl-1.png" alt="Promo Layout Mascot Decoration" fill className="object-contain object-right-bottom" />
            </div>
          </div>

          {/* Bottom Sidebar Slider Banner */}
          <div className="h-44 rounded-xl overflow-hidden relative group shadow-sm select-none">
            <Image src="/gadget-banner-2-1.jpg" alt="Promo Marketing Banner asset background" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-transparent flex flex-col justify-center px-8 text-white z-10 text-left">
              <span className="text-[10px] tracking-wide mb-1 uppercase font-bold opacity-80">Only {promoSlides[currentPromo].price}</span>
              <h2 className="text-xl italic max-w-[150px] font-black leading-tight drop-shadow-md">
                {promoSlides[currentPromo].title}
              </h2>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              {promoSlides.map((_, i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => setCurrentPromo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPromo === i ? "bg-white h-4" : "bg-white/40"}`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Column: Loader or Feed Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="h-full min-h-[500px] border border-slate-100 rounded-lg flex flex-col items-center justify-center bg-white gap-2 shadow-xs">
              <Loader2 size={32} className="animate-spin text-sky-500" />
              <p className="text-xs font-semibold text-slate-400">Syncing dynamic arrival layers...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="h-full min-h-[500px] border border-slate-100 border-dashed rounded-lg flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-2 p-6">
              <ShoppingCart size={32} className="stroke-1" />
              <p className="text-sm font-bold">No recently added arrival items detected in catalog.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {products.map((product: ProductItemBackend) => (
                <div key={product.id} className="group bg-white p-5 relative border border-slate-100 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  
                  {/* Hover Action Sidebar Overlay Panel */}
                  <div className="absolute left-4 top-1/4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 z-20">
                    <button 
                      type="button"
                      disabled={addingId === product.id}
                      onClick={() => handleInclusionAction(product.id)}
                      className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all disabled:bg-slate-50"
                    >
                      {addedSuccessId === product.id ? (
                        <CheckCircle2 size={16} className="text-emerald-500 animate-bounce" />
                      ) : addingId === product.id ? (
                        <Loader2 size={14} className="animate-spin text-sky-500" />
                      ) : (
                        <ShoppingCart size={16}/>
                      )}
                    </button>
                    
                    <Link 
                      href={`/shop/${product.id}`}
                      className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"
                    >
                      <Eye size={16}/>
                    </Link>

                    <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                      <Heart size={16}/>
                    </button>
                    <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                      <RefreshCw size={16}/>
                    </button>
                  </div>

                  {/* Badge tags row mapping block */}
                  <div className="absolute top-4 right-4 flex gap-1 z-10">
                    {product.badges?.map((b: string) => (
                      <span key={b} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded text-white tracking-wide shadow-xs ${b.toLowerCase() === 'hot' ? 'bg-orange-600' : 'bg-teal-600'}`}>
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Product Frame Canvas Asset Image */}
                  <div className="aspect-square relative mb-4 bg-slate-50 rounded-md overflow-hidden border border-slate-50">
                    <Link href={`/shop/${product.id}`} className="absolute inset-0 block z-0">
                      <Image 
                        src={product.image_url || "/placeholder-product.png"} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                      />
                    </Link>
                  </div>

                  {/* Content Descriptions Metadata Area Info Stack */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jummall official</span>
                        {product.is_verified_store !== false && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-2xs">
                            <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
                          </div>
                        )}
                      </div>
                      
                      <Link href={`/shop/${product.id}`} className="block">
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 h-10 group-hover:text-sky-500 transition-colors leading-snug">
                          {product.name}
                        </h3>
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
                        <span className="text-[10px] text-slate-400 font-medium ml-1">({product.reviews_count || 48})</span>
                      </div>
                    </div>

                    <div className="text-lg font-black text-slate-900 pt-1 tracking-tight">
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}