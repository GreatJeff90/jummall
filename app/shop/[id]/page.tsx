'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import { 
  Minus, Plus, Heart, ArrowLeftRight, CheckCircle, 
  Clock, Star 
} from "lucide-react";

interface ProductType {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  vendor: string;
  category: string;
  subCategory?: string;
  description: string;
  images: string[];
  sizes: string[];
  features: string[];
}

// Strictly type your internal mock database to eliminate the explicit layout 'any' check warning
const inventoryCatalog: Record<string, ProductType> = {
  "1": {
    id: "JM-1042-REDM",
    name: "Xiaomi Redmi Portable Bluetooth Speaker (ASM11A).",
    price: 25000.00,
    vendor: "Jummall official",
    category: "Electronics",
    subCategory: "Home Audio",
    description: "Experience dynamic sound anywhere with the Xiaomi Redmi Portable Bluetooth Speaker. Engineered with clear acoustics and a highly compact build, it offers long-lasting play cycles ideal for audio enthusiasts looking for crisp balance on the go.",
    images: ["/redmi-600x600.webp"],
    sizes: ["Standard"],
    features: ["Bluetooth 5.3 clear streaming technology", "Compact and ultra-portable structural body", "Long-life internal battery capacity pack"]
  },
  "2": {
    id: "JM-8576-PHIL",
    name: "Philips TAS1120 Portable Wireless Bluetooth Speaker – Waterproof...",
    price: 20000.00,
    vendor: "Jummall official",
    category: "Electronics",
    subCategory: "Home Audio",
    description: "Take your tunes safely to the poolside with the rugged waterproof Philips TAS1120. Crafted explicitly to endure wet environments while keeping high fidelity sound clean, transparent, and driving.",
    images: ["/img-8576-600x600.jpeg"],
    sizes: ["Standard"],
    features: ["IPX7 Certified reliable waterproof exterior build", "High-efficiency sound output parameters", "Durable travel strap loop integration hanger"]
  },
  "3": {
    id: "JM-8266-CAAN",
    name: "Caankei CS20 2-in-1 Magnetic Bluetooth Speaker – Wireless...",
    price: 35000.00,
    vendor: "Jummall official",
    category: "Electronics",
    subCategory: "Home Audio",
    description: "The Caankei CS20 transforms your workflow with an innovative 2-in-1 magnetic splitting sound frame design. Snap it together for deep mono projection, or break it apart for true wireless spatial separation layout.",
    images: ["/img-8266-600x600.jpeg"],
    sizes: ["Standard"],
    features: ["Dual magnetic splitting speaker modules system", "High-speed wireless surround sync profiles", "Responsive premium ambient light band trim layer"]
  }
};

const defaultFallbackJeans: ProductType = {
  id: "JM-2443-XZRF",
  name: "Premium Wide-Leg Faded Blue Denim Jeans",
  price: 14999.00,
  vendor: "Glorious God's Boutique and Stores",
  category: "Fashion",
  subCategory: "Jeans & Trousers",
  description: "Denim Stone Jeans classic style with modern comfort. Featuring a curated vintage-inspired fade through the thighs and knees, these jeans offer a broken-in look from day one. Crafted from durable, high-quality cotton denim with a hint of stretch, they provide an optimized fit that moves with you while maintaining its shape.",
  images: ["/jeans-main.jpg", "/jeans-back.jpg"],
  sizes: ["X", "XL", "XXL", "XXXL", "XXXXL"],
  features: ["High quality denim fabric", "Classic five-pocket styling", "Distinct vintage inspired vertical fading", "Relaxed wide-leg silhouette"]
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  const productId = params.id as string;
  const currentProduct = inventoryCatalog[productId] || defaultFallbackJeans;

  // Set local state derived directly from initial properties context parameters, bypassing empty useEffect routines completely
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(currentProduct.sizes[0] || "");
  const [activeTab, setActiveTab] = useState("description");
  const [localImage, setLocalImage] = useState("");

  // Safely fallback to first asset if local hover display state hasn't been set by thumbnail interaction
  const mainImage = localImage || currentProduct.images[0];

  const handleBuyNow = () => {
    const checkoutParams = new URLSearchParams({
      name: currentProduct.name,
      price: currentProduct.price.toString(),
      vendor: currentProduct.vendor,
      img: mainImage
    });
    router.push(`/checkout?${checkoutParams.toString()}`);
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- Breadcrumbs System --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-xs font-medium text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#149fcd]">Home</Link> • 
          <Link href="/shop" className="hover:text-[#149fcd]">Products</Link> • 
          <span>{currentProduct.category}</span> • 
          {currentProduct.subCategory && <span>{currentProduct.subCategory}</span>} • 
          <span className="text-slate-400 truncate max-w-xs">{currentProduct.name}</span>
        </div>
      </div>

      {/* --- Main Display Details Workspace Container --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Block: Image Layout Galleries */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-slate-50 border border-slate-100 rounded-sm overflow-hidden flex items-center justify-center p-6">
              <span className="absolute top-4 right-4 bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-sm uppercase z-10 tracking-wider">Hot</span>
              <Image 
                src={mainImage} 
                alt={currentProduct.name} 
                fill 
                className="object-contain p-4"
                priority
              />
            </div>
            
            {/* Gallery Thumbnails List Track */}
            {currentProduct.images.length > 1 && (
              <div className="flex gap-3">
                {currentProduct.images.map((img: string, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setLocalImage(img)}
                    className={`w-20 h-24 border rounded-sm overflow-hidden relative bg-white p-1 transition-all ${
                      mainImage === img ? 'border-[#149fcd] ring-1 ring-[#149fcd]' : 'border-slate-200'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image src={img} alt={`Thumbnail preview ${i}`} fill className="object-contain" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Content Meta Details and Actions */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight font-montserrat">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-[#149fcd] hover:underline cursor-pointer">{currentProduct.vendor}</span>
              <span className="text-slate-300">|</span>
              <div className="flex gap-0.5 text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-slate-400 font-medium">(0 reviews)</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed border-b border-slate-100 pb-6">
              {currentProduct.description}
            </p>

            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ₦{currentProduct.price.toLocaleString()}.00
            </div>

            {/* Sizes Options Block */}
            {currentProduct.sizes && currentProduct.sizes[0] !== "Standard" && (
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Size *</span>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[40px] h-10 px-3 border text-xs font-bold rounded-sm transition-all ${
                        selectedSize === size 
                        ? 'border-[#149fcd] bg-[#149fcd] text-white' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity control options matrix block */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-slate-200 rounded-sm bg-white h-12">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-slate-400 hover:text-slate-800 h-full transition-colors"><Minus size={14}/></button>
                  <span className="px-4 text-sm font-bold text-slate-700">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-slate-400 hover:text-slate-800 h-full transition-colors"><Plus size={14}/></button>
                </div>

                <button className="flex-1 h-12 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-sm hover:bg-slate-50 transition-colors uppercase tracking-wide">
                  Add To Cart
                </button>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-bold text-sm rounded-sm transition-colors uppercase tracking-wide shadow-sm"
              >
                Buy Now
              </button>
            </div>

            {/* Core Utilities Panels */}
            <div className="flex items-center gap-6 text-xs font-bold text-slate-500 pt-2">
              <button className="flex items-center gap-2 hover:text-[#149fcd] transition-colors"><ArrowLeftRight size={14}/> Compare</button>
              <button className="flex items-center gap-2 hover:text-[#149fcd] transition-colors"><Heart size={14}/> Add Wishlist</button>
            </div>

            {/* Categorical System Specifications Parameters */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-medium">
              <p className="text-slate-500">SKU: <span className="text-slate-800 font-bold uppercase">{currentProduct.id}</span></p>
              <p className="text-slate-500">Category: <span className="text-slate-800 font-bold">{currentProduct.category}</span></p>
            </div>

            {/* Quality Seals Blocks Layout */}
            <div className="space-y-2.5 pt-4 text-xs font-medium text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-3"><CheckCircle size={16} className="text-[#149fcd] shrink-0"/> <span>30 days easy returns guarantee</span></div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-[#149fcd] shrink-0"/> <span>Order before 2:30pm for same day dispatch routing</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= EXTENDED INFO TABS AREA ================= */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-100">
        <div className="flex gap-8 border-b border-slate-100 mb-8">
          {['description features', 'reviews (0)', 'vendor overview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.split(' ')[0])}
              className={`pb-4 text-sm font-bold capitalize transition-all relative ${
                activeTab === tab.split(' ')[0] ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab.split(' ')[0] && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#149fcd]" />}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <ul className="space-y-3 list-disc list-inside text-slate-600 text-sm font-medium">
            {currentProduct.features.map((feature: string, idx: number) => (
              <li key={idx} className="marker:text-slate-300">{feature}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}