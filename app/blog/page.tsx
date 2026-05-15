import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Grid, List } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Multivendor Marketplaces Are Changing the Way We Shop",
    excerpt: "Discover how multivendor marketplaces are transforming online shopping by offering variety, trust, and unbeatable deals...",
    image: "/multivendor-markeplace-featured-img-420x270.png",
    date: "Dec 01, 2025",
    author: "Super Admin",
    category: "Shopping & Savings"
  },
  {
    id: 2,
    title: "Smart Shopping: How to Get the Best Deals Online",
    excerpt: "Learn how to shop smarter online with tips on comparing prices, spotting genuine products, and maximizing...",
    image: "/smart-shopping-featured-img-420x270.png",
    date: "Dec 01, 2025",
    author: "Super Admin",
    category: "Shopping & Savings"
  },
  {
    id: 3,
    title: "How to Transform Your Kitchen with Affordable Appliances",
    excerpt: "Upgrade your kitchen without breaking the bank. Explore affordable appliances like gas cookers, refrigerators, and blenders...",
    image: "/kitchen-transformation-featured-img-420x270.png",
    date: "Dec 01, 2025",
    author: "Super Admin",
    category: "Home & Living"
  },
  {
    id: 4,
    title: "Top 5 Must-Have Gadgets for 2026",
    excerpt: "Discover the latest must-have gadgets of 2026, from AI-powered smartphones to gaming laptops and smart accessories...",
    image: "/top-5-gadgets-featured-img-420x270.png",
    date: "Dec 01, 2025",
    author: "Super Admin",
    category: "Tech & Gadgets"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* --- BREADCRUMB HEADER --- */}
      <div className="relative h-64 md:h-48 w-full flex items-center overflow-hidden">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Blog Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
          <h1 className="text-5xl   tracking-tight text-[#0F172A] font-montserrat">Blog</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2  ">
            <Link href="/" className="hover:text-[#149fcd] transition-colors">Home</Link> 
            <span className="text-slate-300">/</span> 
            <span className="text-sky-600">Blog</span>
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- MAIN CONTENT (LEFT) --- */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between border border-slate-100 rounded-lg p-4 mb-8 text-sm font-medium text-slate-400">
              <p>Showing 1 to {blogPosts.length} of {blogPosts.length} results</p>
              <div className="flex items-center gap-4">
                <Grid size={18} className="text-[#149fcd] cursor-pointer" />
                <List size={18} className="hover:text-[#149fcd] cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group border border-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px]   text-slate-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                      <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <h2 className="text-xl   text-slate-900 leading-tight mb-4 group-hover:text-[#149fcd] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm   text-slate-400 group-hover:text-[#149fcd] transition-colors">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* --- SIDEBAR (RIGHT) --- */}
          <aside className="lg:w-1/3 space-y-12">
            <div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#149fcd] outline-none text-sm"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </div>

            <div className="border border-slate-50 rounded-2xl p-8">
              <h3 className="text-lg   text-slate-900 mb-8">Latest Posts</h3>
              <div className="space-y-6">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={post.image} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px]   text-slate-400 mb-1">{post.date}</p>
                      <h4 className="text-sm   text-slate-800 leading-snug group-hover:text-[#149fcd] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-slate-50 rounded-2xl p-8">
              <h3 className="text-lg   text-slate-900 mb-8">Categories</h3>
              <ul className="space-y-4">
                {[
                  { name: "Tech & Gadgets", count: 1 },
                  { name: "Home & Living", count: 1 },
                  { name: "Shopping & Savings", count: 2 }
                ].map((cat) => (
                  <li key={cat.name} className="flex items-center justify-between text-sm   text-slate-500 hover:text-[#149fcd] cursor-pointer transition-colors">
                    <span>• {cat.name}</span>
                    <span>({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg   text-slate-900 mb-8">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["online shopping", "deals", "ecommerce", "tablets", "digital retail", "technology trends"].map((tag) => (
                  <span key={tag} className="px-4 py-2 border border-slate-100 rounded-lg text-xs   text-slate-400 hover:bg-[#149fcd] hover:text-white cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}