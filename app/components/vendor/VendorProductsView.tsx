'use client';

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Pause, 
  Play, 
  Copy, 
  Share2, 
  Trash2, 
  SlidersHorizontal,
  TrendingUp,
  Package,
  X,
  Layers
} from "lucide-react";
import AddProductWizard from "./modals/AddProductWizard";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  img: string;
  isActive: boolean;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "4G WiFi 6 Hotspot & 10000mAh Power Bank – The Ultimate Travel Companion",
    category: "Phone Accessories",
    price: 60000,
    stock: 24,
    sold: 142,
    img: "/whatsapp-image-2026-04-17-at-10859-pm-600x600.jpeg",
    isActive: true,
  },
  {
    id: 2,
    name: "Telesin C03 Magnetic Selfie Ring Light with Beauty Fill Glow",
    category: "Phone Accessories",
    price: 35000,
    stock: 3,
    sold: 89,
    img: "/cleo-el-telesin-c03-phone-magnetic-beauty-fill-light-pica-600x600.webp",
    isActive: true,
  },
  {
    id: 3,
    name: "TELESIN Fun Shot Magnetic Grip Stabilizer Canvas Handset Frame",
    category: "Phone Accessories",
    price: 70000,
    stock: 0,
    sold: 210,
    img: "/camera-white-1-600x600.jpg",
    isActive: true,
  },
  {
    id: 4,
    name: "Xiaomi Redmi Bluetooth Speaker ASM11A High-Fidelity Audio Line",
    category: "Electronics",
    price: 25000,
    stock: 18,
    sold: 45,
    img: "/img-8221-600x600.jpeg",
    isActive: false,
  }
];

export default function VendorProductsView() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Metrics configurations
  const activeCount = products.filter(p => p.isActive && p.stock > 0).length;
  const restockCount = products.filter(p => p.stock <= 5).length;
  const totalCatalogRevenue = products.reduce((acc, p) => acc + (p.price * p.sold), 0);

  const healthyCount = products.filter(p => p.isActive && p.stock > 5).length;
  const lowOrOutCount = products.filter(p => p.stock <= 5).length;
  const pausedCount = products.filter(p => !p.isActive).length;

  const handleToggleActive = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return product.isActive && product.stock > 0;
    if (activeFilter === "Low stock") return product.stock > 0 && product.stock <= 5;
    if (activeFilter === "Out of stock") return product.stock === 0;
    if (activeFilter === "Paused") return !product.isActive;
    return true;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 relative">
      
      {/* --- 5.1 HEADER COMPONENT BLOCK ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold font-sans tracking-wide">
            <span className="text-[#31B757]">{activeCount} Active</span>
            <span className="text-slate-300">·</span>
            <span className="text-[#EF4444]">{restockCount} Need Restock</span>
          </div>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-1">
            Products
          </h1>
        </div>

        {/* Dynamic Add Product Trigger Button */}
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="bg-[#149FCD] hover:bg-[#1284AC] text-white px-5 py-3 rounded-md text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus size={14} className="stroke-[3]" /> Add Product
        </button>
      </div>

      {/* --- 5.2 INVENTORY HEALTH STATS ACCENT CARD --- */}
      <div className="bg-white border border-[#EAEBED] p-5 rounded-sm shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Catalog Revenue</span>
            <h3 className="text-xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">
              ₦{totalCatalogRevenue.toLocaleString()}
            </h3>
          </div>
          <div className="bg-green-50 text-[#31B757] px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-green-100/50">
            <TrendingUp size={12} />
            <span>{products.length} Products</span>
          </div>
        </div>

        {/* Dynamic Proportion Multi-Segment Health Bar Graph Line */}
        <div className="w-full h-2 bg-slate-100 rounded-full flex overflow-hidden gap-[2px]">
          <div className="bg-[#31B757] transition-all" style={{ width: `${(healthyCount / products.length) * 100}%` }} />
          <div className="bg-[#D9714E] transition-all" style={{ width: `${(lowOrOutCount / products.length) * 100}%` }} />
          <div className="bg-slate-300 transition-all" style={{ width: `${(pausedCount / products.length) * 100}%` }} />
        </div>

        {/* Legend Indicator Footers */}
        <div className="flex items-center gap-4 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider pt-0.5">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#31B757]" /> Healthy · {healthyCount}</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D9714E]" /> Low Stock · {lowOrOutCount}</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" /> Paused · {pausedCount}</div>
        </div>
      </div>

      {/* --- 5.3 SEARCH INPUT --- */}
      <div className="relative border border-slate-200 rounded-sm bg-white overflow-hidden focus-within:border-[#149FCD] transition-colors shadow-sm">
        <input 
          type="text" 
          placeholder="Search your products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 pr-12 outline-none text-[13px] text-slate-600 bg-white font-medium"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      </div>

      {/* --- 5.4 HORIZONTAL CHIP FILTER STRIP SYSTEM --- */}
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 overflow-x-auto no-scrollbar gap-4">
        <div className="flex items-center gap-2 shrink-0">
          {["All", "Active", "Low stock", "Out of stock", "Paused"].map((label) => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-tight shrink-0 transition-all ${
                activeFilter === label 
                  ? "bg-[#143D4A] text-white shadow-sm" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-50 shrink-0 shadow-sm">
          <SlidersHorizontal size={12} className="text-[#149FCD]" />
          <span>Sort: Best Selling</span>
        </button>
      </div>

      {/* --- 5.5 PRODUCT CARD ROW CONTAINER GRID ARCHITECTURE --- */}
      {filteredProducts.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[350px]">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 mb-4">
            <Package size={26} className="stroke-[1.5]" />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase">No products yet</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
            No listings found matching the specified layout filter options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm flex flex-col justify-between relative group hover:border-[#149FCD]/40 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Image Frame Canvas */}
                <div className="relative w-20 h-20 bg-[#F6F7F9] border border-slate-100 rounded-sm overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                  <img src={product.img} alt={product.name} className="object-contain w-full h-full transform transition-transform duration-300 group-hover:scale-105" />
                  {!product.isActive && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px]" />
                  )}
                </div>

                {/* Info Text Block Stack */}
                <div className="space-y-1 min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-wider uppercase text-[#149FCD] bg-[#E5F4FA] px-2 py-0.5 rounded-sm">
                      {product.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Layers size={11} /> {product.sold} sold
                    </span>
                  </div>

                  <h3 className="text-[13.5px] font-bold text-slate-800 leading-snug line-clamp-2 pr-4 group-hover:text-[#149FCD] transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Corner Quick-Action Context Launcher */}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-sm hover:bg-slate-50 transition-colors absolute top-3 right-3"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Lower Metric Ticker Border Shell */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
                  <span className="text-base font-black text-slate-900 font-montserrat">
                    ₦{product.price.toLocaleString()}.00
                  </span>
                </div>

                {/* Stock Level Color-Coded Pill */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-right mb-0.5">Inventory</span>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wide flex items-center gap-1.5 shadow-sm ${
                    !product.isActive ? "bg-slate-100 text-slate-400" :
                    product.stock === 0 ? "bg-red-50 text-[#EF4444]" :
                    product.stock <= 5 ? "bg-[#FCE7E0] text-[#D9714E]" : "bg-green-50 text-[#31B757]"
                  }`}>
                    <span className={`w-1 h-1 rounded-full shrink-0 ${
                      !product.isActive ? "bg-slate-400" :
                      product.stock === 0 ? "bg-[#EF4444]" :
                      product.stock <= 5 ? "bg-[#D9714E]" : "bg-[#31B757]"
                    }`} />
                    {!product.isActive ? "Paused" : product.stock === 0 ? "Out of Stock" : product.stock <= 5 ? `Low · ${product.stock} Left` : `${product.stock} Units`}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* --- 5.6 FLOATING OPTIONS MODAL DRAWER FRAME COMPONENT SHEET --- */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[100] animate-in fade-in duration-200" onClick={() => setSelectedProduct(null)} />
          <div className="fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[420px] bg-white rounded-t-xl sm:rounded-sm z-[101] shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 overflow-hidden border border-slate-100">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3 min-w-0">
                <img src={selectedProduct.img} alt="" className="w-10 h-10 object-contain bg-white p-0.5 border rounded-sm shrink-0" />
                <div className="min-w-0 text-left">
                  <h4 className="text-xs font-black text-slate-800 truncate max-w-[280px]">{selectedProduct.name}</h4>
                  <p className="text-[11px] font-bold text-[#149FCD] mt-0.5">₦{selectedProduct.price.toLocaleString()}.00</p>
                </div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-700 p-1 shrink-0"><X size={16} /></button>
            </div>

            <div className="p-2 divide-y divide-slate-50">
              <button className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"><Eye size={15} /> View Details</button>
              <button className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"><Edit2 size={15} /> Edit Product</button>
              
              <button 
                onClick={() => handleToggleActive(selectedProduct.id)}
                className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"
              >
                {selectedProduct.isActive ? (
                  <><Pause size={15} className="text-[#D9714E]" /> Pause Listing</>
                ) : (
                  <><Play size={15} className="text-[#31B757]" /> Activate Listing</>
                )}
              </button>
              
              <button className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"><Copy size={15} /> Duplicate Item</button>
              <button className="w-full px-4 py-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"><Share2 size={15} /> Share Link</button>
              
              <button 
                onClick={() => handleDeleteProduct(selectedProduct.id)}
                className="w-full px-4 py-3 text-left text-xs font-black text-[#EF4444] hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <Trash2 size={15} /> Delete Product
              </button>
            </div>

          </div>
        </>
      )}

      {/* --- 7.0 MOUNTED MULTI-STEP CREATION WIZARD MODAL PANEL --- */}
      <AddProductWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />

    </div>
  );
}