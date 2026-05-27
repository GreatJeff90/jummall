'use client';

import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/app/hooks/useEcosystem";

// Premium color blocks with their aligned image names matching your public assets directory
const categoryLayoutConfigs: Record<string, { img: string; bg: string; gridStyle: string }> = {
  "fashion": {
    img: "/chic-accessories-on-white-background.png",
    bg: "bg-gradient-to-br from-[#E4A853] via-[#C99142] to-[#405459]",
    gridStyle: "md:col-span-6 md:row-span-2 min-h-[350px] md:min-h-[480px]",
  },
  "electronics": {
    img: "/electronics-category-img.png",
    bg: "bg-[#87B0CC]",
    gridStyle: "md:col-span-3 h-[230px]",
  },
  "phones": {
    img: "/phone-tablets.png",
    bg: "bg-[#47566A]",
    gridStyle: "md:col-span-3 h-[230px]",
  },
  "accessories": {
    img: "/phone-accessories-category-img.png",
    bg: "bg-[#A5C9C1]",
    gridStyle: "md:col-span-3 h-[230px]",
  },
  "computers": {
    img: "/computers-category-img.png",
    bg: "bg-[#94918F]",
    gridStyle: "md:col-span-3 h-[230px]",
  },
  "gaming": {
    img: "/gaming-category-img.png",
    bg: "bg-[#434845]",
    gridStyle: "md:col-span-3 h-[115px]",
  },
  "kitchen": {
    img: "/kitchen-items-category-img.png",
    bg: "bg-[#C4B49F]",
    gridStyle: "md:col-span-3 h-[115px]",
  }
};

// Emergency local fallback list so the structure remains clean regardless of server state
const localFallbackCategories = [
  { name: "Fashion", slug: "fashion", product_count: 30 },
  { name: "Electronics", slug: "electronics", product_count: 5 },
  { name: "Phones & Tablets", slug: "phones", product_count: 18 },
  { name: "Accessories", slug: "accessories", product_count: 16 },
  { name: "Computers", slug: "computers", product_count: 3 },
  { name: "Gaming", slug: "gaming", product_count: 13 },
  { name: "Kitchen", slug: "kitchen", product_count: 21 },
];

export default function CategoryShowcase() {
  const { data: serverCategories, isLoading } = useCategories() as { 
  data: Array<{ name: string; slug: string; product_count: number }>; 
  isLoading: boolean 
};

  // Pick up active set using defensive server layout mapping checkpoints
  const activeCategories = serverCategories && serverCategories.length > 0 
    ? serverCategories 
    : localFallbackCategories;

  if (isLoading && (!serverCategories || serverCategories.length === 0)) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-6 w-32 bg-slate-100 rounded-md mb-4" />
        <div className="h-10 w-64 bg-slate-100 rounded-md mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[500px]">
          <div className="md:col-span-6 bg-slate-100 rounded-[24px]" />
          <div className="md:col-span-6 grid grid-cols-2 gap-5">
            <div className="bg-slate-100 rounded-[24px]" />
            <div className="bg-slate-100 rounded-[24px]" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans select-none">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
        <div>
          <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none">
            Shop by category.
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2">
            From phones to fashion, gadgets to gourmet — all under one trusted roof.
          </p>
        </div>

        <Link 
          href="/categories" 
          className="shrink-0 border border-slate-200 hover:border-[#149fcd] hover:text-[#149fcd] transition-all text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 bg-white text-slate-600 shadow-3xs"
        >
          Browse all categories <span>→</span>
        </Link>
      </div>

      {/* ================= BENTO GRID WITH LAYERED IMAGES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-max">
        {activeCategories.map((cat) => {
          const nameString = String(cat.name || "").toLowerCase();
          const slugString = String(cat.slug || "").toLowerCase();

          let config = categoryLayoutConfigs[slugString];

          // Substring lookups for fuzzy naming coverage
          if (!config) {
            if (nameString.includes("fashion")) config = categoryLayoutConfigs["fashion"];
            else if (nameString.includes("electronic")) config = categoryLayoutConfigs["electronics"];
            else if (nameString.includes("phone") || nameString.includes("tablet")) config = categoryLayoutConfigs["phones"];
            else if (nameString.includes("accessories")) config = categoryLayoutConfigs["accessories"];
            else if (nameString.includes("computer") || nameString.includes("laptop")) config = categoryLayoutConfigs["computers"];
            else if (nameString.includes("gaming")) config = categoryLayoutConfigs["gaming"];
            else if (nameString.includes("kitchen") || nameString.includes("home")) config = categoryLayoutConfigs["kitchen"];
            else {
              config = categoryLayoutConfigs["electronics"];
            }
          }

          const isFashionMain = nameString.includes("fashion");

          return (
            <Link
              key={cat.slug || cat.name}
              href={`/categories/${cat.slug || slugString}`}
              className={`relative rounded-[24px] overflow-hidden group/box flex flex-col justify-between p-7 transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 ${config.bg} ${config.gridStyle}`}
            >
              
              {/* IMAGE CANVAS LAYER: Positions asset to overlay matching the background color bounds */}
              <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none mix-blend-multiply opacity-90 transition-transform duration-700 group-hover/box:scale-105">
                <Image
                  src={config.img}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Dynamic bottom vignette to make text pop over white backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent z-10 pointer-events-none" />

              {/* Text Meta Content Details Block (All forced to premium text-white) */}
              <div className="relative z-20 text-left">
                <span className="text-[11px] font-black tracking-wider uppercase block text-white/70">
                  {cat.product_count || 0} {cat.product_count === 1 ? "Product" : "Products"}
                </span>
                <h3 className="text-2xl font-black tracking-tight font-montserrat mt-1 text-white drop-shadow-xs">
                  {cat.name}
                </h3>
              </div>

              {/* Special Button CTA for the Primary Fashion Card */}
              {isFashionMain && (
                <div className="relative z-20 text-left mt-auto">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all group-hover/box:bg-[#149fcd] group-hover/box:border-[#149fcd]">
                    Shop fashion <span>→</span>
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

    </section>
  );
}