'use client';

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Product {
  id: number;
  store: string;
  name: string;
  price: number;
  oldPrice?: number;
  img: string;
}

const saleProducts: Product[] = [
  {
    id: 1,
    store: "Glorious God's Boutique and Stores",
    name: "Gown",
    price: 5999,
    img: "/img-20260509-wa0020-150x150.jpg",
  },
  {
    id: 2,
    store: "Glorious God's Boutique and Stores",
    name: "Long-sleeve shirtdress. Gown",
    price: 5999,
    img: "/img-20260509-wa0021-150x150.jpg",
  },
  {
    id: 3,
    store: "Glorious God's Boutique and Stores",
    name: "Midi-length shirt dress",
    price: 5999,
    img: "/img-20260509-wa0017-150x150.jpg",
  }
];

const trendingProducts: Product[] = [
  {
    id: 1,
    store: "Jummall official",
    name: "Acer OHR555 Ear Clip Wireless Earbuds",
    price: 35000,
    img: "/acer12-150x150.webp",
  },
  {
    id: 2,
    store: "Jummall official",
    name: "Bluetooth wireless headphone",
    price: 70000,
    img: "/headset1-150x150.jpg",
  },
  {
    id: 3,
    store: "Jummall official",
    name: "SooPii 240W Retractable USB-C to USB-C Fast Charging Cable",
    price: 15000,
    oldPrice: 16999,
    img: "/img-8556-150x150.jpeg",
  }
];

const ProductItem = ({ product }: { product: Product }) => (
  <div className="flex gap-4 group border-b border-slate-100 pb-6 last:border-0">
    
    {/* Product Image wrapped inside detail link anchor */}
    <Link 
      href={`/shop/${product.id}`} 
      className="relative w-32 h-32 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden block z-0"
    >
      <Image 
        src={product.img} 
        alt={product.name} 
        fill 
        className="object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </Link>

    <div className="flex flex-col justify-center space-y-1 flex-1">
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-slate-400 font-medium">{product.store}</span>
        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-1 h-1.5 border-r border-b border-white rotate-45 mb-0.5" />
        </div>
      </div>

      {/* Product Title wrapped inside detail link anchor */}
      <Link href={`/shop/${product.id}`} className="block group/title">
        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover/title:text-sky-500 transition-colors">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-0.5 text-slate-200">
        {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
        <span className="text-[10px] text-slate-300 ml-1 font-medium">(0 reviews)</span>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <span className="text-sm font-black text-sky-600">₦{product.price.toLocaleString()}.00</span>
        {product.oldPrice && (
          <span className="text-xs text-slate-400 line-through decoration-slate-400 font-medium">
            ₦{product.oldPrice.toLocaleString()}.00
          </span>
        )}
      </div>
    </div>

  </div>
);

export default function ProductLists() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 font-montserrat tracking-tight">On Sale</h2>
        <div className="space-y-6">
          {saleProducts.map(p => <ProductItem key={p.id} product={p} />)}
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 font-montserrat tracking-tight">Trending Products</h2>
        <div className="space-y-6">
          {trendingProducts.map(p => <ProductItem key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}