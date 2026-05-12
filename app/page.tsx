'use client';

import { 
  Eye, 
  Heart,
} from "lucide-react";
import HeroSlider from "./components/home/HeroSlider";
import CategoryShowcase from "./components/home/CategoryShowcase";
import FeatureSection from "./components/home/FeatureSection";

export default function Home() {
  const trendingProducts = [
    { id: 1, name: "Navy Blue Shorts", price: 15.00, oldPrice: 25.00, badge: "SALE", img: "🩳" },
    { id: 2, name: "Black Polo Shirt", price: 22.00, oldPrice: 30.00, badge: "NEW", img: "👕" },
    { id: 3, name: "Red Classic Tee", price: 18.00, oldPrice: 22.00, badge: "SALE", img: "👕" },
    { id: 4, name: "White Graphic Jersey", price: 45.00, oldPrice: 60.00, badge: "HOT", img: "🎽" },
    { id: 5, name: "Brown Cargo Pants", price: 35.00, oldPrice: 50.00, badge: "SALE", img: "👖" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      <main className="flex-grow">
        {/* --- SECTION 1: HERO SLIDER --- */}
        <HeroSlider />

        {/* --- SECTION 2: CIRCULAR CATEGORIES --- */}
        <CategoryShowcase />

        {/* --- SECTION 3: FEATURE TRUST BAR --- */}
        <FeatureSection />

        {/* --- SECTION 4: TRENDING PRODUCTS --- */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
                Trending Products
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Handpicked tech and fashion favorites for you
              </p>
            </div>
            <button className="text-[#22A7D0] font-black text-xs uppercase tracking-widest hover:underline">
              View All Products
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {trendingProducts.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all relative">
                {/* Sale Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-lg shadow-red-200">
                  {p.badge}
                </span>

                {/* Product Image Area */}
                <div className="aspect-square bg-[#F8F9FA] flex items-center justify-center text-6xl relative overflow-hidden">
                  {p.img}
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-[#22A7D0]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-[#22A7D0] hover:text-white transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-[#22A7D0] hover:text-white transition-colors">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-2 truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#22A7D0] font-black">${p.price.toFixed(2)}</span>
                    <span className="text-gray-300 text-xs line-through font-bold">
                      ${p.oldPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full py-3 bg-[#010F1C] text-white text-[10px] font-black rounded-xl hover:bg-[#22A7D0] transition-colors uppercase tracking-widest">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: SECONDARY PROMO BANNER --- */}
        <section className="max-w-7xl mx-auto px-4 py-12 mb-20">
          <div className="bg-[#0092BA] rounded-[2.5rem] p-8 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-sky-100">
            <div className="z-10 text-center md:text-left text-white max-w-xl">
              <h3 className="text-white/70 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                Editor&apos;s Choice
              </h3>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-10">
                Samsung Galaxy <br /> Tab S6, Wifi Tablet
              </h2>
              <button className="bg-[#010F1C] text-white px-12 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#0092BA] transition-all shadow-xl">
                Explore Tablet
              </button>
            </div>
            
            <div className="w-full md:w-[500px] h-72 md:h-96 bg-white/10 rounded-[2rem] border-4 border-white/20 flex items-center justify-center text-white text-2xl font-black italic relative z-10 backdrop-blur-sm">
              TAB S6 VISUAL
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl" />
          </div>
        </section>
      </main>
    </div>
  );
}