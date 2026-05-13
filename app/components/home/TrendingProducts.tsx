'use client';

import { Eye, Heart, ShoppingBag, Star, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  // First Row: 20260508 series
  { id: 1, name: "Gown", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0017-600x600.jpg" },
  { id: 2, name: "Long-sleeve shirtdress, Gown", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0021-600x600.jpg" },
  { id: 3, name: "Color block Long Sleeve Pattern Gown", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0022-600x600.jpg" },
  { id: 4, name: "Midi length shirt dress", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0020-600x600.jpg" },
  { id: 5, name: "Maxi Dress Gown", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0018-600x600.jpg" },
  
  // Second Row: Transition to 20260509 series
  { id: 6, name: "Midi dress Gown", price: 1999.00, badge: ["Hot", "New", "Sale"], img: "/img-20260509-wa0019-600x600.jpg" },
  { id: 7, name: "Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0098-600x600.jpg" },
  { id: 8, name: "Bodycon pencil dress Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0096-600x600.jpg" },
  { id: 9, name: "Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0088-600x600.jpg" },
  { id: 10, name: "Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0094-600x600.jpg" },
  
  // Third Row: 20260509 and specific 20260508 items
  { id: 11, name: "Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0097-1-600x600.jpg" },
  { id: 12, name: "Plus size Dress", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0091-600x600.jpg" },
  { id: 13, name: "Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0090-600x600.jpg" },
  { id: 14, name: "Pencil Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0088-600x600.jpg" },
  { id: 15, name: "Maxi dress Gown", price: 1999.00, badge: ["Hot"], img: "/img-20260508-wa0063-600x600.jpg" },
  
  // Fourth Row: Final 20260508 items
  { id: 16, name: "Bodycon Dress", price: 1999.00, badge: ["Hot"], img: "/img-20260508-wa0077-600x600.jpg" },
  { id: 17, name: "Short Skirt and Top", price: 1999.00, badge: ["Hot"], img: "/img-20260508-wa0083-600x600.jpg" },
  { id: 18, name: "Bodycon Maxi Dress Gown", price: 1999.00, badge: ["New"], img: "/img-20260508-wa0081-600x600.jpg" },
  { id: 19, name: "Two Piece Lounger", price: 1999.00, badge: ["Hot"], img: "/img-20260508-wa0076-600x600.jpg" },
  { id: 20, name: "Female Tracksuit", price: 1999.00, badge: ["Hot"], img: "/img-20260508-wa0085-1-600x600.jpg" },
];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Featured', 'On sale', 'Trending', 'Top rated'];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Trending <span className="text-[#22A7D0]">Products</span>
        </h2>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold transition-colors ${
                activeTab === tab ? 'text-[#22A7D0]' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white overflow-hidden relative">
            
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {product.badge.map((b) => (
                <span 
                  key={b} 
                  className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded text-white shadow-sm ${
                    b === 'Hot' ? 'bg-orange-500' : b === 'New' ? 'bg-teal-500' : 'bg-red-500'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-[#F8F9FA] rounded-xl overflow-hidden mb-4">
              <Image 
                src={product.img} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Vertical Hover Actions */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                {[
                  { icon: <ShoppingBag size={16} />, label: "Add to Cart" },
                  { icon: <Eye size={16} />, label: "Quick View" },
                  { icon: <Heart size={16} />, label: "Wishlist" },
                  { icon: <RefreshCw size={16} />, label: "Compare" }
                ].map((action, i) => (
                  <button 
                    key={i} 
                    className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:bg-[#22A7D0] hover:text-white transition-all"
                  >
                    {action.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">JUMMALL OFFICIAL STORE</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
                </div>
              </div>
              <Link href="#" className="text-sm font-bold text-slate-800 hover:text-[#22A7D0] transition-colors leading-tight line-clamp-2 h-10">
                {product.name}
              </Link>
              <div className="flex items-center gap-0.5 text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                <span className="text-[10px] text-slate-400 font-bold ml-1">(50 reviews)</span>
              </div>
              <p className="text-sm font-black text-slate-900 tracking-tight">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}