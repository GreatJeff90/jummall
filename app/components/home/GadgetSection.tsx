'use client';

import {toast} from "sonner";
import React, { useState, useEffect } from "react";
import { ArrowRight, Star, ShoppingCart, Eye, Heart, RefreshCw, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts, useAddToCart } from "@/app/hooks/useEcosystem";
import { ProductItemBackend } from "../../lib/api/auth";

const computerLinks = [
  { label: "Desktop", slug: "desktop" },
  { label: "Laptop", slug: "laptop" },
  { label: "Computer Accessories", slug: "computer-accessories" },
  { label: "Keyboards", slug: "keyboards" },
  { label: "Mice", slug: "mice" },
  { label: "Mouse Pads", slug: "mouse-pads" },
  { label: "Monitors", slug: "monitors" },
  { label: "Projectors", slug: "projectors" },
  { label: "Speakers", slug: "speakers" },
  { label: "Webcams", slug: "webcams" },
  { label: "HDMI Cables", slug: "hdmi-cables" },
  { label: "Ethernet (LAN) Cables", slug: "ethernet-lan-cables" },
  { label: "Adapters & Converters", slug: "adapters-converters" },
  { label: "USB Flash Drives", slug: "usb-flash-rives" },
  { label: "Card Readers", slug: "card-readers" },
  { label: "Memory Cards", slug: "memory-cards" },
  { label: "Laptop Chargers", slug: "laptop-chargers" },
  { label: "UPS", slug: "ups" },
  { label: "Surge Protectors", slug: "surge-protectors" },
  { label: "Extension Cords", slug: "extension-cords" },
  { label: "Networking Devices", slug: "networking-devices" },
  { label: "Laptop Stands", slug: "laptop-stands" },
  { label: "Laptop Bags & Sleeves", slug: "laptop-bags-sleeves" }
];

const sidebarSlides = [
  {
    id: 1,
    title: "Top Rated Products",
    price: "₦5,599.00",
    img: "/gadget-banner-1-1.jpg", 
  },
  {
    id: 2,
    title: "Selected Novelty Products",
    price: "₦9,999.00",
    img: "/gadget-banner-2-2.jpg",
  }
];

export default function GadgetSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  // Assert incoming typed structures safely into the ProductItemBackend model architecture
  const { data: rawGadgets, isLoading: loading } = useProducts({ category: "computers" });
  const gadgets = Array.isArray(rawGadgets) 
    ? (rawGadgets as unknown as ProductItemBackend[]).slice(0, 3) 
    : [];

  const { mutate: addToCart, isPending: addingToCart, variables } = useAddToCart();
  const addingId = addingToCart ? variables?.productId : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sidebarSlides.length);
    }, 4000);
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
          toast.error("Please log into your profile to append items to your basket.");
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
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-6 text-left font-sans">
      
      {/* Sidebar Area Column */}
      <div className="w-full md:w-1/4 flex flex-col gap-6">
        <div className="border-2 border-orange-500 rounded-lg p-6 flex flex-col bg-white min-h-[650px] relative overflow-hidden shadow-xs">
          
          <div className="relative z-10 flex-grow">
            <h2 className="text-xl font-black text-slate-800 mb-2 font-montserrat uppercase tracking-tight">Computers</h2>
            <div className="w-20 h-0.5 bg-sky-500 mb-6" />
            <ul className="space-y-2">
              {computerLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={`/categories/${item.slug}`} className="text-[11px] font-bold text-slate-500 hover:text-orange-500 flex items-center gap-2 transition-colors uppercase tracking-wide">
                    <span className="w-1 h-1 bg-slate-300 rounded-full" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-20 mt-8 pb-10">
            <Link href="/categories/computers" className="text-sm font-black text-slate-800 flex items-center gap-2 hover:text-orange-500 group transition-colors uppercase tracking-wider">
              More Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="absolute -right-4 -bottom-2 w-48 h-48 pointer-events-none z-0 select-none opacity-40">
             <Image 
                src="/gadget-girl-1.png" 
                alt="Promo Model Decoration Graphic" 
                fill 
                sizes="192px"
                className="object-contain object-right-bottom" 
             />
          </div>
        </div>

        <div className="sidebar-slider h-44 rounded-xl overflow-hidden relative group shadow-sm select-none">
          <Image 
            src={sidebarSlides[currentSlide].img} 
            alt={sidebarSlides[currentSlide].title} 
            fill 
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-opacity duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent flex flex-col justify-center px-8 text-white z-10 text-left">
            <span className="text-[10px] tracking-wide mb-1 uppercase font-bold opacity-85">Only {sidebarSlides[currentSlide].price}</span>
            <h2 className="text-xl font-black italic leading-tight max-w-[160px] drop-shadow-md">
              {sidebarSlides[currentSlide].title}
            </h2>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
            {sidebarSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? "bg-white scale-110 shadow-xs" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Dynamic Product Grid Section Area */}
      <div className="flex-1">
        {loading ? (
          <div className="h-full min-h-[600px] border border-slate-100 rounded-lg flex flex-col items-center justify-center bg-white gap-2 shadow-xs">
            <Loader2 size={32} className="animate-spin text-orange-500" />
            <p className="text-xs font-semibold text-slate-400">Streaming inventory modules...</p>
          </div>
        ) : gadgets.length === 0 ? (
          <div className="h-full min-h-[600px] border border-slate-100 border-dashed rounded-lg flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-2 p-6">
            <ShoppingCart size={32} className="stroke-1" />
            <p className="text-sm font-bold">No items matching this display category currently active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {gadgets.map((item: ProductItemBackend) => (
              <div key={item.id} className="group bg-white p-5 relative border border-slate-100 rounded-lg hover:shadow-xl hover:border-white transition-all duration-300 flex flex-col">
                 
                 <div className="absolute left-4 top-1/4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-20">
                    <button 
                      type="button"
                      disabled={addingId === item.id}
                      onClick={() => handleInclusionAction(item.id)}
                      className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all disabled:bg-slate-50"
                    >
                      {addedSuccessId === item.id ? (
                        <CheckCircle2 size={16} className="text-emerald-500 animate-bounce" />
                      ) : addingId === item.id ? (
                        <Loader2 size={14} className="animate-spin text-orange-500" />
                      ) : (
                        <ShoppingCart size={16}/>
                      )}
                    </button>
                    
                    <Link 
                      href={`/shop/${item.id}`}
                      className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all"
                    >
                      <Eye size={16}/>
                    </Link>

                    <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all">
                      <Heart size={16}/>
                    </button>
                    <button type="button" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all">
                      <RefreshCw size={16}/>
                    </button>
                 </div>

                 <div className="absolute top-4 right-4 flex gap-1 z-10">
                  {item.badges?.map((b: string) => (
                    <span key={b} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm text-white shadow-xs tracking-wide ${b.toLowerCase() === 'hot' ? 'bg-orange-500' : 'bg-teal-500'}`}>
                      {b}
                    </span>
                  ))}
                 </div>

                 <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-slate-50 border border-slate-50/50">
                  <Link href={`/shop/${item.id}`} className="absolute inset-0 block z-0">
                    <Image 
                      src={item.image_url || "/placeholder-product.png"} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 240px"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                    />
                  </Link>
                 </div>

                 <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Jummall official</span>
                      {item.is_verified_store !== false && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-2xs shrink-0">
                          <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
                        </div>
                      )}
                    </div>

                    <Link href={`/shop/${item.id}`} className="text-sm font-semibold text-slate-800 hover:text-orange-500 transition-colors duration-300 leading-snug line-clamp-2 h-10 block">
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-0.5 text-orange-400 pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={11} 
                          fill={i < Math.round(item.rating_average || 5) ? "currentColor" : "none"} 
                          className={i < Math.round(item.rating_average || 5) ? "text-orange-400" : "text-slate-200"} 
                        />
                      ))}
                      <span className="text-[10px] text-slate-400 font-medium ml-1">({item.reviews_count || 32})</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg text-slate-900 tracking-tight font-black">{formatCurrency(item.price)}</span>
                  </div>
                 </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}