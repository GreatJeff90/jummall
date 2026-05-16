'use client';

import Link from "next/link";
import { useRouter, } from "next/navigation";
import { useState } from "react";
import { 
  Minus, Plus, Heart, ArrowLeftRight, CheckCircle, 
  Clock 
} from "lucide-react";

const productData = {
  id: "JM-2443-XZRF",
  name: "Premium Wide-Leg Faded Blue Denim Jeans",
  price: 14999.00,
  vendor: "Glorious God's Boutique and Stores",
  category: "Jeans & Trousers",
  description: "Denim Stone Jeans classic style with modern comfort. Featuring a curated vintage-inspired fade through the thighs and knees, these jeans offer a broken-in look from day one. Crafted from durable, high-quality cotton denim with a hint of stretch, they provide an optimized fit that moves with you while maintaining its shape.",
  images: [
    "/jeans-main.jpg",
    "/jeans-back.jpg"
  ],
  sizes: ["X", "XL", "XXL", "XXXL", "XXXXL"],
  features: [
    "High quality denim fabric",
    "Classic five-pocket styling",
    "Distinct vintage inspired vertical fading",
    "Relaxed wide-leg silhouette",
    "Durable contrast stitching",
    "Secure button and zip fly closure",
    "Perfect for casual everyday wear",
    "Sizes: X - 4XL"
  ]
};

export default function ProductDetailsPage() {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("X");
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(productData.images[0]);

  // Pass details directly to checkout page when Buy Now is clicked
  const handleBuyNow = () => {
    const checkoutParams = new URLSearchParams({
      name: productData.name,
      price: productData.price.toString(),
      vendor: productData.vendor,
      img: mainImage
    });
    router.push(`/checkout?${checkoutParams.toString()}`);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* --- Breadcrumbs --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-xs font-medium text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#149fcd]">Home</Link> • 
          <Link href="/shop" className="hover:text-[#149fcd]">Products</Link> • 
          <span>Fashion</span> • <span>Male fashion</span> • <span>Jeans & Trousers</span> • 
          <span className="text-slate-400 truncate max-w-xs">{productData.name}</span>
        </div>
      </div>

      {/* --- Main Product Layout --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Block: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-slate-50 border border-slate-100 rounded-sm overflow-hidden group">
              <span className="absolute top-4 right-4 bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-sm uppercase z-10">Hot</span>
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">Main Product View</div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-3">
              {productData.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-24 border rounded-sm overflow-hidden relative bg-slate-50 transition-all ${
                    mainImage === img ? 'border-[#149fcd] ring-1 ring-[#149fcd]' : 'border-slate-200'
                  }`}
                >
                  <div className="w-full h-full bg-slate-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Block: Purchase & Info details */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
              {productData.name}
            </h1>

            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-[#149fcd] hover:underline cursor-pointer">{productData.vendor}</span>
              <span className="text-slate-300">|</span>
              <div className="flex gap-0.5 text-slate-200">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <span className="text-slate-400 font-medium">(0 reviews)</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed border-b border-slate-50 pb-6">
              {productData.description}
            </p>

            <div className="text-2xl font-black text-slate-900">
              ₦{productData.price.toLocaleString()}.00
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Size *</span>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[40px] h-10 px-3 border text-xs font-bold rounded-sm transition-all ${
                      selectedSize === size 
                      ? 'border-[#149fcd] bg-[#149fcd] text-white' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
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
                className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-bold text-sm rounded-sm transition-colors uppercase tracking-wide"
              >
                Buy Now
              </button>
            </div>

            {/* Utilities */}
            <div className="flex items-center gap-6 text-xs font-bold text-slate-500 pt-2">
              <button className="flex items-center gap-2 hover:text-[#149fcd] transition-colors"><ArrowLeftRight size={14}/> Compare</button>
              <button className="flex items-center gap-2 hover:text-[#149fcd] transition-colors"><Heart size={14}/> Add Wishlist</button>
            </div>

            {/* Metadata */}
            <div className="border-t border-slate-50 pt-4 space-y-2 text-xs">
              <p className="text-slate-500 font-medium">SKU: <span className="text-slate-800 font-bold uppercase">{productData.id}</span></p>
              <p className="text-slate-500 font-medium">Category: <span className="text-slate-800 font-bold">{productData.category}</span></p>
            </div>

            {/* Guarantees */}
            <div className="space-y-2.5 pt-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-3"><CheckCircle size={16} className="text-[#149fcd]"/> <span>30 days easy returns</span></div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-[#149fcd]"/> <span>Order yours before 2:30pm for same day dispatch</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Tabs Section (Description, Reviews, Vendor) --- */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-100">
        <div className="flex gap-8 border-b border-slate-100 mb-8">
          {['description', 'reviews (0)', 'vendor'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold capitalize transition-all relative ${
                activeTab === tab ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#149fcd]" />}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <ul className="space-y-3 list-disc list-inside text-slate-600 text-sm">
            {productData.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}