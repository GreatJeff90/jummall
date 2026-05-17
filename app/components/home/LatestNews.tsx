'use client';

import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

interface Article {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  img: string;
}

const articles: Article[] = [
  {
    id: 1,
    date: "Dec 01, 2025",
    category: "Shopping & Savings",
    title: "Why Multivendor Marketplaces Are Changin...",
    excerpt: "Discover how multivendor marketplaces are transforming online shopping by offering variety, trust, and unbeatable deals—all in one platform.",
    img: "/multivendor-markeplace-featured-img-420x270.png",
  },
  {
    id: 2,
    date: "Dec 01, 2025",
    category: "Shopping & Savings",
    title: "Smart Shopping: How to Get the Best Deals ...",
    excerpt: "Learn how to shop smarter online with tips on comparing prices, spotting genuine products, and maximizing deals on a multivendor...",
    img: "/smart-shopping-featured-img-420x270.png",
  },
  {
    id: 3,
    date: "Dec 01, 2025",
    category: "Home & Living",
    title: "How to Transform Your Kitchen with Afforda...",
    excerpt: "Upgrade your kitchen without breaking the bank. Explore affordable appliances like gas cookers, refrigerators, and blenders that save time, energy,... ",
    img: "/kitchen-transformation-featured-img-420x270.png",
  }
];

export default function LatestNews() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-4">
        <h2 className="text-3xl text-slate-900 font-sans">
          <span className="text-sky-500 border-b-4 border-sky-500 pb-4">Latest</span> news & articles
        </h2>
        <Link 
          href="/blog" 
          className="bg-sky-500 text-white px-6 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors font-medium shadow-sm"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="group flex flex-col">
            
            {/* Image Container wrapped inside Link layout */}
            <Link 
              href={`/blog/${article.id}`} 
              className="relative aspect-[420/270] rounded-xl overflow-hidden mb-6 block z-0"
            >
              <Image 
                src={article.img} 
                alt={article.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded uppercase tracking-wider font-bold z-10">
                {article.date}
              </div>
            </Link>

            {/* Content Details Block */}
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-slate-400">
                <Tag size={14} className="text-sky-500" />
                <span className="text-xs uppercase tracking-tight font-semibold">{article.category}</span>
              </div>
              
              {/* Heading Title Link points directly to detailed post page */}
              <Link href={`/blog/${article.id}`} className="block group/title">
                <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover/title:text-sky-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium flex-1">
                {article.excerpt}
              </p>
              
              {/* Read More link anchor text */}
              <div className="pt-2">
                <Link 
                  href={`/blog/${article.id}`} 
                  className="text-xs font-black text-slate-700 group-hover:text-sky-500 flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  Read More <ArrowRight size={12} className="stroke-[2.5]" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}