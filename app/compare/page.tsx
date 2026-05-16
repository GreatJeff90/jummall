'use client';

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowLeftRight, Star } from "lucide-react";

interface CompareItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sku: string;
  inStock: boolean;
}

export default function ComparePage() {
  // Populated mock data matching the screenshot
  const [compareItems, setCompareItems] = useState<CompareItem[]>([
    {
      id: 1,
      name: "Baggy denim shorts, Jeans",
      price: 14999,
      image: "/img-20260509-wa0021-600x600.jpg",
      description: "Denim Jeans Short. Crafted from durable, high-quality denim, they offer a comfortable relaxed fit perfect for everyday wear. The classic faded wash provides a timeless, lived-in look that pairs effortlessly with your favorite t-shirts, sneakers, or sandals.",
      sku: "#JM-2443-RDZZ",
      inStock: true
    }
  ]);

  const removeItem = (id: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- Banner Header --- */}
      <div className="bg-[#EDF2F4]/60 border-b border-slate-100 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl font-black text-slate-800 font-montserrat">Compare</h1>
          <div className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-2">
            <Link href="/" className="hover:text-[#149fcd] text-slate-500">Home</Link> • <span>Compare</span>
          </div>
        </div>
        
        {/* Absolute Right-Side Graphic Decorative Shapes */}
        <div className="absolute right-10 bottom-0 top-0 w-1/3 hidden md:flex items-center justify-end opacity-80 pointer-events-none">
          <div className="relative w-64 h-full">
            <div className="absolute bottom-4 right-12 w-10 h-24 bg-slate-100 rounded-t-md border-x border-t border-slate-200 flex flex-col justify-between p-1">
              <div className="w-full h-4 bg-orange-200/40 rounded-sm" />
              <div className="w-full h-8 bg-blue-200/40 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Section Container --- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {compareItems.length > 0 ? (
          
          /* --- STATE A: SPECIFIED ACTIVE JUMMALL ROW-MATRIX GRID --- */
          <div className="w-full border border-slate-100 rounded-sm overflow-x-auto shadow-sm bg-white">
            <table className="w-full border-collapse text-left text-sm table-fixed">
              <tbody>
                
                {/* 1. Product Title & Image Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white w-[180px] text-xs uppercase tracking-wide">
                    Product
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0 min-w-[280px]">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-36 h-40 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden flex items-center justify-center text-slate-300 text-xs">
                          {/* Fallback frame background */}
                          <span>Image Frame</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-700 leading-tight">
                            {item.name}
                          </h3>
                          {item.inStock && (
                            <p className="text-[#149fcd] font-medium text-[11px] lowercase">(In stock)</p>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. Description Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    Description
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0 text-xs text-slate-400 leading-relaxed max-w-xl">
                      <div className="max-w-2xl mx-auto">{item.description}</div>
                    </td>
                  ))}
                </tr>

                {/* 3. Price Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    Price
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center font-black text-slate-900 border-r border-slate-100 last:border-r-0 text-sm">
                      ₦{item.price.toLocaleString()}.00
                    </td>
                  ))}
                </tr>

                {/* 4. SKU Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    SKU
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center text-xs font-bold text-slate-400 border-r border-slate-100 last:border-r-0 tracking-wider">
                      {item.sku}
                    </td>
                  ))}
                </tr>

                {/* 5. Add To Cart Button Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    Add to cart
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <button className="border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white text-xs font-bold py-2.5 px-6 rounded-sm uppercase tracking-wide transition-all bg-white">
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>

                {/* 6. Rating Star Row */}
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    Rating
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <div className="flex justify-center gap-0.5 text-slate-200">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" className="text-slate-200" />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 7. Remove Interactive Bin Row */}
                <tr>
                  <td className="p-5 font-bold text-slate-800 border-r border-slate-100 bg-white text-xs uppercase tracking-wide">
                    Remove
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-6 text-center border-r border-slate-100 last:border-r-0">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          
          /* --- STATE B: EMPTY CONTAINER FALLBACK VIEW --- */
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100/60 mb-6 text-slate-300">
              <ArrowLeftRight size={40} className="stroke-[1.25]" />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">
              Your compare list is empty
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mb-8 leading-relaxed">
              Add products to compare their features and make the best choice.
            </p>
            <Link 
              href="/shop" 
              className="bg-[#0B1526] hover:bg-slate-800 text-white text-xs font-bold py-3.5 px-8 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
            >
              <ShoppingBag size={14} /> Start Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}