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
        <h2 className="text-3xl   text-slate-900">
          <span className="text-sky-500 border-b-4 border-sky-500 pb-4">Latest</span> news & articles
        </h2>
        <Link 
          href="/blog" 
          className="bg-sky-500 text-white px-6 py-2 rounded-lg   text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-[420/270] rounded-xl overflow-hidden mb-6">
              <Image 
                src={article.img} 
                alt={article.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px]   px-3 py-1.5 rounded uppercase tracking-wider">
                {article.date}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Tag size={14} className="text-sky-500" />
                <span className="text-xs   uppercase tracking-tight">{article.category}</span>
              </div>
              <h3 className="text-xl   text-slate-800 leading-snug group-hover:text-sky-500 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}