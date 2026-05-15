'use client';

import Image from "next/image";
import { 
  Star, 
  CheckCircle2, 
  ShoppingBag, 
  Eye, 
  Heart, 
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  ChevronDown
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  vendor: string;
  price: number;
  oldPrice?: number;
  image: string;
  badges: ("Hot" | "New" | "Sale")[];
}

const shopProducts: Product[] = [
  // Row 1
  { id: 1, name: "Premium Wide-Leg Faded Blue Denim Jeans", vendor: "Glorious God's Boutique and Stores", price: 14999, image: "/img-20260509-wa0017-600x600.jpg", badges: ["Hot"] },
  { id: 2, name: "Baggy denim shorts, Jeans", vendor: "Glorious God's Boutique and Stores", price: 14999, image: "/img-20260509-wa0021-600x600.jpg", badges: ["Hot"] },
  { id: 3, name: "Sleek Wide-Leg High-Waisted Pants Jeans", vendor: "Glorious God's Boutique and Stores", price: 14999, oldPrice: 18000, image: "/img-20260509-wa0022-600x600.jpg", badges: ["Hot"] },
  { id: 4, name: "Gown", vendor: "Glorious God's Boutique and Stores", price: 5999, image: "/img-20260509-wa0020-600x600.jpg", badges: ["Hot", "New", "Sale"] },
  
  // Row 2
  { id: 5, name: "Bodycon Maxi Dress Gown", vendor: "Glorious God's Boutique and Stores", price: 9999, image: "/img-20260509-wa0018-600x600.jpg", badges: ["New"] },
  { id: 6, name: "Berry-Pink Two-Piece Lounge Set", vendor: "Glorious God's Boutique and Stores", price: 9999, image: "/img-20260509-wa0019-600x600.jpg", badges: ["Hot"] },
  { id: 7, name: "Female Tracksuit", vendor: "Glorious God's Boutique and Stores", price: 9999, image: "/img-20260508-wa0098-600x600.jpg", badges: ["Hot"] },
  { id: 8, name: "Mini Dress Gown", vendor: "Glorious God's Boutique and Stores", price: 9999, image: "/img-20260508-wa0096-600x600.jpg", badges: ["Hot"] },
  
  // ... (Repeat or add the other image paths to reach 24 products)
  { id: 9, name: "Elegant Evening Gown", vendor: "Glorious God's Boutique and Stores", price: 14999, image: "/img-20260508-wa0088-600x600.jpg", badges: ["New"] },
  { id: 10, name: "Summer Floral Gown", vendor: "Glorious God's Boutique and Stores", price: 11000, image: "/img-20260508-wa0094-600x600.jpg", badges: ["Sale"] },
  { id: 11, name: "White Wedding Gown", vendor: "Glorious God's Boutique and Stores", price: 45000, image: "/img-20260508-wa0097-1-600x600.jpg", badges: ["New"] },
  { id: 12, name: "Comfort Plus Dress", vendor: "Glorious God's Boutique and Stores", price: 12500, image: "/img-20260508-wa0091-600x600.jpg", badges: ["Hot"] },
];

export default function ShopProductGrid() {
  return (
    <div className="flex-1">
      {/* --- Toolbar Section --- */}
      <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center border border-slate-900 text-slate-900">
            <LayoutGrid size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
            <List size={20} />
          </button>
          <span className="ml-4 text-[13px] font-medium text-slate-400">
            Showing 1 - 24 of 228 products
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-100 px-6 py-2.5 text-[13px] font-medium text-slate-700 outline-none cursor-pointer pr-12">
              <option>Default</option>
              <option>Price: Low to High</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-100 px-6 py-2.5 text-[13px] font-medium text-slate-700 outline-none cursor-pointer pr-10">
              <option>24</option>
              <option>48</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- Main Product Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {shopProducts.map((product) => (
          <div key={product.id} className="group flex flex-col cursor-pointer">
            
            <div className="relative aspect-square bg-[#F3F4F6] rounded-[2.5rem] overflow-hidden mb-4 shadow-sm">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute top-4 right-5 flex flex-wrap gap-1 justify-end z-20">
                {product.badges.map((badge) => (
                  <span 
                    key={badge} 
                    className={`text-[11px] font-bold uppercase px-3 py-1 rounded-md text-white shadow-sm
                      ${badge === 'Hot' ? 'bg-[#A83216]' : ''} 
                      ${badge === 'New' ? 'bg-[#065F46]' : ''}
                      ${badge === 'Sale' ? 'bg-[#845309]' : ''}
                    `}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Sidebar */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                  <ShoppingBag size={20} />
                </button>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                  <Eye size={20} />
                </button>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                  <Heart size={20} />
                </button>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-[#149fcd] hover:text-white shadow-lg transition-colors">
                  <ArrowLeftRight size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2 px-1">
              <p className="text-[13px] text-gray-400 font-medium">{product.vendor}</p>
              
              <div className="flex items-center gap-2 text-[#149fcd]">
                <CheckCircle2 size={16} className="fill-[#149fcd] text-white shrink-0" />
                <h3 className="text-[15px] font-bold text-[#2D3748] leading-tight line-clamp-2">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center gap-0.5 text-gray-200">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                <span className="text-[13px] text-gray-400 ml-2 font-medium">(0 reviews)</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[18px] font-black text-slate-900">
                  ₦{product.price.toLocaleString()}.00
                </span>
                {product.oldPrice && (
                  <span className="text-[14px] font-medium text-gray-300 line-through">
                    ₦{product.oldPrice.toLocaleString()}.00
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Pagination Block --- */}
      <div className="mt-24 flex justify-center items-center gap-0 pt-10 border-t border-slate-50">
        <div className="flex border border-slate-100 rounded-sm overflow-hidden bg-white">
          <button className="px-5 py-3 border-r border-slate-100 hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronLeft size={18} />
          </button>
          <button className="px-5 py-3 border-r border-slate-100 bg-[#149fcd] text-white font-bold text-[14px]">1</button>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button key={num} className="px-5 py-3 border-r border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors font-medium text-[14px]">
              {num}
            </button>
          ))}
          <button className="px-5 py-3 hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}