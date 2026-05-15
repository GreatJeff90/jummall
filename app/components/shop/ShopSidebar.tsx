'use client';

import { 
  Search, Plus, Sparkles, Laptop, Smartphone, Gamepad2, 
  Utensils, Shirt, HeartPulse, Lamp, Luggage, Baby, Car, Home 
} from "lucide-react";

export default function ShopSidebar() {
  const categories = [
    { name: "New Arrivals", icon: <Sparkles size={14} /> },
    { name: "Electronics", icon: <Laptop size={14} />, hasSub: true },
    { name: "Computers", icon: <Laptop size={14} />, hasSub: true },
    { name: "Phones & Tablets", icon: <Smartphone size={14} />, hasSub: true },
    { name: "Gaming", icon: <Gamepad2 size={14} />, hasSub: true },
    { name: "Kitchen Items", icon: <Utensils size={14} />, hasSub: true },
    { name: "Fashion", icon: <Shirt size={14} />, hasSub: true },
    { name: "Health & Beauty", icon: <HeartPulse size={14} />, hasSub: true },
    { name: "Lighting & Home fixture", icon: <Lamp size={14} />, hasSub: true },
    { name: "Luggage & Travel gear", icon: <Luggage size={14} /> },
    { name: "Baby & Kids", icon: <Baby size={14} />, hasSub: true },
    { name: "Automobile", icon: <Car size={14} />, hasSub: true },
    { name: "Home decor", icon: <Home size={14} /> },
  ];

  const colors = [
    { name: "Blue", bg: "bg-blue-600" },
    { name: "Red", bg: "bg-red-600" },
    { name: "Black", bg: "bg-black" },
    { name: "Brown", bg: "bg-[#8B4513]" },
    { name: "White", bg: "bg-white border-slate-200" },
    { name: "Grey", bg: "bg-gray-400" },
    { name: "Maroon", bg: "bg-red-900" },
    { name: "Orange", bg: "bg-orange-500" },
    { name: "Gold", bg: "bg-yellow-600" },
    { name: "Silver", bg: "bg-slate-300" },
    { name: "Beige", bg: "bg-[#F5F5DC]" },
  ];

  return (
    <aside className="space-y-6 w-full max-w-[280px]">
      {/* 1. Search Bar */}
      <div className="relative border border-slate-200 rounded-sm">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 px-3 pr-10 outline-none text-[13px] text-slate-500"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      </div>

      <div className="bg-[#F8F9FA] p-5 space-y-10">
        {/* 2. Categories */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">Categories</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.name} className="flex justify-between items-center cursor-pointer group">
                <div className="flex items-center gap-3 text-slate-500 group-hover:text-[#149fcd] transition-colors">
                  <span className="opacity-70">{cat.icon}</span>
                  <span className="text-[12px]">{cat.name}</span>
                </div>
                {cat.hasSub && <Plus size={12} className="text-slate-300 group-hover:text-[#149fcd]" />}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Brands */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">Brands</h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd]" />
            <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd]">Samsung</span>
          </label>
        </section>

        {/* 4. Tags */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">Tags</h3>
          <div className="space-y-2">
            {["Hot 🔥", "Hot", "Female underwears", "Clothing"].map(tag => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd]" />
                <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd]">{tag}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 5. Price Filter */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">Price</h3>
          <div className="relative h-1.5 w-full bg-[#149fcd] rounded-full mt-6">
            <div className="absolute -left-1 -top-1 w-3.5 h-3.5 bg-white border-2 border-[#149fcd] rounded-full cursor-pointer" />
            <div className="absolute -right-1 -top-1 w-3.5 h-3.5 bg-white border-2 border-[#149fcd] rounded-full cursor-pointer" />
          </div>
          <p className="mt-4 text-[11px] font-bold text-slate-900">
            ₦0.00 — ₦750,000.00
          </p>
        </section>

        {/* 6. On Sale */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">On Sale</h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd]" />
            <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd] leading-tight">Show only discounted products</span>
          </label>
        </section>

        {/* 7. Color */}
        <section>
          <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2">Color</h3>
          <div className="space-y-2.5">
            {colors.map((color) => (
              <div key={color.name} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-3.5 h-3.5 rounded-full ${color.bg}`} />
                <span className="text-[12px] text-slate-500 group-hover:text-[#149fcd]">{color.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Weight & Size */}
        <section className="space-y-10">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 pt-4">Weight</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd]" />
              <span className="text-[12px] text-slate-500">1KG</span>
            </label>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-200 pb-2 pt-4">Size</h3>
            <div className="space-y-2">
              {["M", "L"].map(size => (
                <label key={size} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm accent-[#149fcd]" />
                  <span className="text-[12px] text-slate-500">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}