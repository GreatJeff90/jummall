import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const latestPosts = [
  {
    id: 1,
    title: "Why Multivendor Marketplaces Are Changing the Way We Shop",
    date: "Dec 01, 2025",
    image: "/multivendor-markeplace-featured-img-420x270.png"
  },
  {
    id: 2,
    title: "Smart Shopping: How to Get the Best Deals Online",
    date: "Dec 01, 2025",
    image: "/smart-shopping-featured-img-420x270.png"
  },
  {
    id: 3,
    title: "How to Transform Your Kitchen with Affordable Appliances",
    date: "Dec 01, 2025",
    image: "/kitchen-transformation-featured-img-420x270.png"
  }
];

const categories = [
  { name: "Tech & Gadgets", count: 1 },
  { name: "Home & Living", count: 1 },
  { name: "Shopping & Savings", count: 2 }
];

const tags = [
  "online shopping", 
  "deals", 
  "ecommerce", 
  "tablets", 
  "digital retail", 
  "technology trends"
];

export default function BlogSidebar() {
  return (
    <aside className="space-y-10">
      {/* --- Search Widget --- */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-white border border-slate-200 rounded-lg py-3 px-5 focus:ring-1 focus:ring-[#149fcd] outline-none text-sm transition-all"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      </div>

      {/* --- Latest Posts Widget --- */}
      <div>
        <h3 className="text-md font-black text-slate-900 mb-6 uppercase tracking-tight">Latest Posts</h3>
        <div className="border border-slate-100 rounded-xl p-6 space-y-6">
          {latestPosts.map((post, index) => (
            <div key={post.id}>
              <Link href={`/blog/${post.id}`} className="flex gap-4 group">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-50">
                  <Image src={post.image} alt="" fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400">{post.date}</p>
                  <h4 className="text-xs font-black text-slate-800 leading-snug group-hover:text-[#149fcd] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </Link>
              {index !== latestPosts.length - 1 && (
                <div className="h-[1px] bg-slate-50 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Categories Widget --- */}
      <div>
        <h3 className="text-md font-black text-slate-900 mb-6 uppercase tracking-tight">Categories</h3>
        <div className="border border-slate-100 rounded-xl p-6">
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link href="#" className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-[#149fcd] transition-colors">
                  <span>• {cat.name}</span>
                  <span className="text-slate-300">({cat.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Popular Tags Widget --- */}
      <div>
        <h3 className="text-md font-black text-slate-900 mb-6 uppercase tracking-tight">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link 
              key={tag} 
              href="#" 
              className="px-4 py-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-[#149fcd] hover:text-white hover:border-[#149fcd] transition-all whitespace-nowrap"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}