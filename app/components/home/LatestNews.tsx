'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Article {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  img: string;
  readTime: string; // Dynamic presentation field matching screenshot design attributes
}

const articles: Article[] = [
  {
    id: 1,
    date: "Dec 01, 2025",
    category: "Shopping & Savings",
    title: "Why Multivendor Marketplaces Are Changing Online Retail Flow",
    excerpt: "Discover how multivendor marketplaces are transforming online shopping by offering variety, trust, and unbeatable deals—all in one platform.",
    img: "/multivendor-markeplace-featured-img-420x270.png",
    readTime: "4 min read"
  },
  {
    id: 2,
    date: "Dec 01, 2025",
    category: "Shopping & Savings",
    title: "Smart Shopping: How to Get the Best Deals Safely on Storefronts",
    excerpt: "Learn how to shop smarter online with tips on comparing prices, spotting genuine products, and maximizing deals on a multivendor...",
    img: "/smart-shopping-featured-img-420x270.png",
    readTime: "6 min read"
  },
  {
    id: 3,
    date: "Dec 01, 2025",
    category: "Home & Living",
    title: "How to Transform Your Kitchen with Affordable Smart Utensils",
    excerpt: "Upgrade your kitchen without breaking the bank. Explore affordable appliances like gas cookers, refrigerators, and blenders that save time, energy,... ",
    img: "/kitchen-transformation-featured-img-420x270.png",
    readTime: "8 min read"
  }
];

export default function LatestNews() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 font-sans select-none text-left">
      
      {/* ================= HEADER SECTION CONTAINER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
            The Jummall Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-slate-900 tracking-tight leading-none uppercase">
            Stories, guides & drops.
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2">
            Buyer guides, vendor spotlights, and the inside view from Lagos’s most-loved marketplace.
          </p>
        </div>

        <Link 
          href="/blog" 
          className="shrink-0 border border-slate-200 hover:border-[#149fcd] hover:text-[#149fcd] transition-all text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 bg-white text-slate-600 shadow-3xs"
        >
          Read all posts <ChevronRight size={14} className="stroke-[3]" />
        </Link>
      </div>

      {/* ================= ARTICLES FEED BENTO GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-[28px] border border-slate-100/70 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-4"
          >
            <div>
              {/* Image Graphic Canvas Layer */}
              <Link 
                href={`/blog/${article.id}`} 
                className="relative aspect-[420/270] rounded-2xl overflow-hidden mb-5 block bg-slate-100 group"
              >
                <Image 
                  src={article.img} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-104"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </Link>

              {/* Text Meta Fields Content Layout Block */}
              <div className="px-2 space-y-3">
                
                {/* Category Pill Badge Indicator */}
                <div className="w-full">
                  <span className="inline-block bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-wide px-3 py-1 rounded-md">
                    {article.category}
                  </span>
                </div>
                
                {/* Main Heading Title Anchor */}
                <Link href={`/blog/${article.id}`} className="block group/title">
                  <h3 className="text-base sm:text-[17px] font-black tracking-tight text-slate-800 leading-snug group-hover/title:text-[#149fcd] transition-colors uppercase font-montserrat line-clamp-2" title={article.title}>
                    {article.title}
                  </h3>
                </Link>
                
                {/* Subtext Description Segment */}
                <p className="text-xs sm:text-sm font-semibold text-slate-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Bottom Timeline Footer Node Row */}
            <div className="px-2 pt-6 mt-auto flex items-center gap-2 text-[11px] font-bold text-slate-300 select-none">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}