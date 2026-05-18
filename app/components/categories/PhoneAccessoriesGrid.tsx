'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  Star, ShoppingBag, Eye, Heart, ArrowLeftRight, CheckCircle2
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  img: string;
  vendor: string;
  badges: ("Hot" | "New" | "Sale")[];
  outOfStock?: boolean;
}

// Data array modeled precisely from your layout screen capture
const phoneAccessoriesItems: Product[] = [
  {
    id: 1,
    name: "iPhone 14 Pro Max Adapter",
    price: 20000,
    img: "/img-20260509-wa0017-600x600.jpg", 
    vendor: "Danbaba & mobile business",
    badges: [],
  },
  {
    id: 2,
    name: "Samsung Charger-Travel Adaptor",
    price: 20000,
    img: "/img-20260509-wa0021-600x600.jpg",
    vendor: "Danbaba & mobile business",
    badges: ["Hot"],
  },
  {
    id: 3,
    name: "17promax and 16promax Charger",
    price: 25000,
    img: "/img-20260509-wa0022-600x600.jpg",
    vendor: "Danbaba & mobile business",
    badges: [],
  },
  {
    id: 4,
    name: "Fiber case 17pro,17promax",
    price: 25000,
    oldPrice: 35000,
    img: "/img-20260509-wa0020-600x600.jpg",
    vendor: "Danbaba & mobile business",
    badges: ["Sale"],
  },
  {
    id: 5,
    name: "METAL CASE 17promax",
    price: 25000,
    oldPrice: 35000,
    img: "/img-20260509-wa0018-600x600.jpg",
    vendor: "Danbaba & mobile business",
    badges: ["Hot"],
  },
  {
    id: 6,
    name: "PICTO wrist watch",
    price: 25000,
    img: "/img-20260509-wa0019-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 7,
    name: "Bluetooth wireless headphone",
    price: 70000,
    img: "/headset1-150x150.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 8,
    name: "Emmex Special Design Gradient Watch - Minimalist...",
    price: 18000,
    oldPrice: 24000,
    img: "/img-20260508-wa0098-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New", "Sale"],
  },
  {
    id: 9,
    name: "Telesin Master Clip Kit for iPhone 17 Pro Max",
    price: 120000,
    img: "/whatsapp-image-2026-04-17-at-10859-pm-600x600.jpeg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 10,
    name: "Iced-out Cartier",
    price: 177000,
    img: "/img-20260508-wa0096-600x600.jpg",
    vendor: "Kelex",
    badges: ["New"],
  },
  {
    id: 11,
    name: "Audew 61W GaN Fast Charger - Ultra-Compact...",
    price: 20000,
    oldPrice: 25000,
    img: "/img-20260508-wa0088-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 12,
    name: "HTC NB40 TWS Wireless Earbuds, AI translator...",
    price: 15000,
    oldPrice: 20000,
    img: "/img-20260508-wa0094-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 13,
    name: "RK-Y40B Magnetic Wireless Selfie Monitor Screen",
    price: 100000,
    oldPrice: 115000,
    img: "/img-20260508-wa0097-1-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 14,
    name: "Wireless Vlog Screen Monitor which uses a...",
    price: 90000,
    img: "/img-20260508-wa0091-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 15,
    name: "Wireless Magnetic Phone Camera Remote with Screen",
    price: 100000,
    oldPrice: 110000,
    img: "/img-20260508-wa0090-600x600.jpg",
    vendor: "Jummall official",
    badges: ["Hot", "New"],
  },
  {
    id: 16,
    name: "Acer OHR555 Ear Clip Wireless Earbuds",
    price: 35000,
    img: "/acer12-150x150.webp",
    vendor: "Jummall official",
    badges: [],
    outOfStock: true
  }
];

interface PhoneAccessoriesGridProps {
  viewMode: 'grid' | 'list';
}

export default function PhoneAccessoriesGrid({ viewMode }: PhoneAccessoriesGridProps) {
  return (
    <div className="w-full">
      {viewMode === 'grid' ? (
        /* --- GRID MODE LAYOUT (3 Columns matching layout canvas architecture) --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {phoneAccessoriesItems.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white relative">
              
              {/* Product Card Container Frame Layout */}
              <div className="relative aspect-square w-full bg-[#fcfcfc] border border-slate-100 rounded-sm overflow-hidden mb-4 shadow-sm flex items-center justify-center p-4">
                
                {/* Product Image Link Routing Anchor */}
                <Link href={`/shop/${product.id}`} className="relative w-full h-full block z-0">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Out Of Stock Dark Blur Screen Layer Badge */}
                {product.outOfStock && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <span className="bg-slate-900/90 text-white font-black uppercase text-[10px] px-3 py-1 rounded-sm tracking-widest shadow-md">
                      Out Of Stock
                    </span>
                  </div>
                )}
                
                {/* Top-Right Conditional Badges Layer Row */}
                {product.badges.length > 0 && !product.outOfStock && (
                  <div className="absolute top-3 right-3 flex flex-col gap-1 z-20">
                    {product.badges.map((badge) => (
                      <span 
                        key={badge} 
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm text-white shadow-sm tracking-wider text-center
                          ${badge === 'Hot' ? 'bg-orange-500' : ''} 
                          ${badge === 'New' ? 'bg-teal-600' : ''}
                          ${badge === 'Sale' ? 'bg-red-600' : ''}
                        `}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Vertical Hover Utilities Action Layer Overlays */}
                {!product.outOfStock && (
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2.5">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors duration-300">
                      <ShoppingBag size={16} />
                    </button>
                    <Link href={`/shop/${product.id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors duration-300">
                      <Eye size={16} />
                    </Link>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors duration-300">
                      <Heart size={16} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors duration-300">
                      <ArrowLeftRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Text Description Block Details area stack */}
              <div className="space-y-1.5 px-0.5">
                
                {/* Vendor name verification identifier tag row */}
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <span className="truncate max-w-[150px]">{product.vendor}</span>
                  <CheckCircle2 size={11} className="text-white fill-[#149fcd] shrink-0" />
                </div>
                
                {/* Product dynamic detail routing label anchor header */}
                <Link href={`/shop/${product.id}`} className="block group/title">
                  <h3 className="text-[13px] font-bold text-slate-700 leading-snug line-clamp-2 group-hover/title:text-[#149fcd] transition-colors min-h-[38px]">
                    {product.name}
                  </h3>
                </Link>

                {/* Star rating alignment layouts */}
                <div className="flex items-center gap-0.5 text-slate-200">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  <span className="text-[10px] text-slate-400 ml-1 font-medium">(0 reviews)</span>
                </div>

                {/* Price Matrix Currency blocks configuration panel layout */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[14px] font-black text-slate-800 tracking-tight">
                    ₦{product.price.toLocaleString()}.00
                  </span>
                  {product.oldPrice && (
                    <span className="text-[12px] font-medium text-slate-300 line-through decoration-slate-300">
                      ₦{product.oldPrice.toLocaleString()}.00
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* --- LIST MODE ALTERNATIVE ROW VIEW STRUCTURE --- */
        <div className="space-y-6">
          {phoneAccessoriesItems.map((product) => (
            <div key={product.id} className="group flex flex-col sm:flex-row border border-slate-100 rounded-sm bg-white p-4 gap-6 items-center shadow-sm relative">
              
              <div className="relative w-40 h-40 shrink-0 bg-[#fcfcfc] flex items-center justify-center border border-slate-100 rounded-sm p-2 overflow-hidden">
                <Link href={`/shop/${product.id}`} className="relative w-full h-full block">
                  <Image src={product.img} alt={product.name} fill className="object-contain p-2" />
                </Link>
                {product.outOfStock && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <span className="bg-slate-900/90 text-white font-bold text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider">Out Of Stock</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <span>{product.vendor}</span>
                  <CheckCircle2 size={11} className="text-white fill-[#149fcd]" />
                </div>
                <Link href={`/shop/${product.id}`} className="block">
                  <h3 className="text-base font-bold text-slate-700 hover:text-[#149fcd] transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-0.5 text-slate-200">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  <span className="text-[11px] text-slate-400 ml-1">(0 reviews)</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-base font-black text-slate-800 tracking-tight">₦{product.price.toLocaleString()}.00</span>
                  {product.oldPrice && <span className="text-sm text-slate-300 line-through">₦{product.oldPrice.toLocaleString()}.00</span>}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}