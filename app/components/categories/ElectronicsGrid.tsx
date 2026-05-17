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
  badges: ("Hot" | "New" | "Sale")[];
}

// Data array modeled precisely from image_1ca8d7.png
const electronicsGadgets: Product[] = [
  {
    id: 1,
    name: "4G WiFi 6 Hotspot & 10000mAh Power Bank -...",
    price: 60000,
    img: "/whatsapp-image-2026-04-17-at-10859-pm-600x600.jpeg", // Replace with your static path mapping
    badges: ["Hot", "New"],
  },
  {
    id: 2,
    name: "Telesin C03 Magnetic Selfie Ring Light",
    price: 35000,
    img: "/cleo-el-telesin-c03-phone-magnetic-beauty-fill-light-pica-600x600.webp",
    badges: ["New"],
  },
  {
    id: 3,
    name: "TELESIN Fun Shot Magnetic Grip",
    price: 70000,
    img: "/camera-white-1-600x600.jpg",
    badges: ["New"],
  },
  {
    id: 4,
    name: "SooPii 240W Retractable USB-C to USB-C Fast...",
    price: 15000,
    oldPrice: 16999,
    img: "/img-8556-150x150.jpeg",
    badges: ["Hot", "New"],
  },
  {
    id: 5,
    name: "Wireless Magnetic Phone Camera Remote with Screen",
    price: 100000,
    oldPrice: 110000,
    img: "/img-8221-600x600.jpeg",
    badges: ["Hot", "New"],
  }
];

interface ElectronicsGridProps {
  viewMode: 'grid' | 'list';
}

export default function ElectronicsGrid({ viewMode }: ElectronicsGridProps) {
  return (
    <div className="w-full">
      {viewMode === 'grid' ? (
        /* --- GRID MODE LAYOUT (3 Columns matching Jummall system) --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {electronicsGadgets.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white">
              
              {/* Product Card Container Area */}
              <div className="relative aspect-square w-full bg-white border border-slate-100 rounded-sm overflow-hidden mb-4 shadow-sm flex items-center justify-center p-4">
                
                {/* Product Image Link Anchor */}
                <Link href={`/shop/${product.id}`} className="relative w-full h-full block">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                
                {/* Top-Right Badges Line Layout */}
                <div className="absolute top-3 right-3 flex gap-1 z-20">
                  {product.badges.map((badge) => (
                    <span 
                      key={badge} 
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm text-white shadow-sm tracking-wide
                        ${badge === 'Hot' ? 'bg-[#b91c1c]' : ''} 
                        ${badge === 'New' ? 'bg-[#065f46]' : ''}
                      `}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Hover Utilities Layer Bar */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2.5">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors">
                    <ShoppingBag size={16} />
                  </button>
                  <Link href={`/shop/${product.id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors">
                    <Eye size={16} />
                  </Link>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-md transition-colors">
                    <ArrowLeftRight size={16} />
                  </button>
                </div>
              </div>

              {/* Text Description Stack Area */}
              <div className="space-y-1.5 px-0.5">
                
                {/* Vendor verification row */}
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <span>Jummall official</span>
                  <CheckCircle2 size={12} className="text-white fill-[#149fcd] shrink-0" />
                </div>
                
                {/* Product Title anchor link to shop parameter */}
                <Link href={`/shop/${product.id}`} className="block group/title">
                  <h3 className="text-[13px] font-bold text-slate-700 leading-snug line-clamp-2 group-hover/title:text-[#149fcd] transition-colors min-h-[38px]">
                    {product.name}
                  </h3>
                </Link>

                {/* Review Empty Stars Row Layout */}
                <div className="flex items-center gap-0.5 text-slate-200">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                  <span className="text-[11px] text-slate-400 ml-1 font-medium">(0 reviews)</span>
                </div>

                {/* Price Matrix block configuration */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[14px] font-black text-slate-800">
                    ₦{product.price.toLocaleString()}.00
                  </span>
                  {product.oldPrice && (
                    <span className="text-[12px] font-medium text-slate-300 line-through">
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
          {electronicsGadgets.map((product) => (
            <div key={product.id} className="group flex flex-col sm:flex-row border border-slate-100 rounded-sm bg-white p-4 gap-6 items-center shadow-sm">
              <div className="relative w-40 h-40 shrink-0 bg-slate-50 flex items-center justify-center border border-slate-100 rounded-sm p-2">
                <Link href={`/shop/${product.id}`} className="relative w-full h-full block">
                  <Image src={product.img} alt={product.name} fill className="object-contain p-2" />
                </Link>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <span>Jummall official</span>
                  <CheckCircle2 size={12} className="text-white fill-[#149fcd]" />
                </div>
                <Link href={`/shop/${product.id}`} className="block">
                  <h3 className="text-base font-bold text-slate-700 hover:text-[#149fcd] transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-0.5 text-slate-200">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                  <span className="text-[11px] text-slate-400 ml-1">(0 reviews)</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-base font-black text-slate-800">₦{product.price.toLocaleString()}.00</span>
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