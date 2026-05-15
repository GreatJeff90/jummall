import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  User, 
  Eye, 
  Link as LinkIcon, 
  Mail,
  ArrowRight
} from "lucide-react";
import { 
  SiFacebook, 
  SiX, 
  SiInstagram, 
  SiYoutube 
} from "react-icons/si";
import BlogSidebar from "../../components/blog/BlogSidebar";

const allArticles = {
  "1": {
    category: "Shopping & Savings",
    title: "Why Multivendor Marketplaces Are Changing the Way We Shop",
    author: "Super Admin",
    date: "Dec 01, 2025",
    views: 578,
    tags: ["ecommerce", "online shopping", "Nigeria", "deals", "customer experience", "digital retail"],
    image: "/multivendor-markeplace-featured-img-420x270.png",
    body: [
      "Online shopping has grown rapidly in Nigeria and across the world, but multivendor marketplaces are taking it to the next level.",
      "One of the biggest advantages is variety. Whether you're looking for electronics, kitchen appliances, or computer accessories...",
      "Another benefit is trust. With vendor ratings, reviews, and warranties, customers can shop confidently knowing they're buying from reliable sources.",
      "Finally, affordability is a major draw. Sellers compete to offer the best deals, and customers enjoy discounts, flash sales, and bundled offers."
    ]
  },
  "2": {
    category: "Shopping & Savings",
    title: "Smart Shopping: How to Get the Best Deals Online",
    author: "Super Admin",
    date: "Dec 01, 2025",
    views: 1399,
    tags: ["online shopping", "ecommerce", "discounts", "deals", "marketplace", "savings", "buyer tips"],
    image: "/smart-shopping-featured-img-420x270.png",
    body: [
      "Online shopping has revolutionized the way we buy products, but getting the best deals requires a little strategy.",
      "First, always compare prices across vendors. A multivendor marketplace gives you the advantage of choice...",
      "Second, take advantage of discounts and flash sales. Many marketplaces offer seasonal promotions or limited-time deals.",
      "Third, look for bundled offers. Buying accessories alongside electronics or kitchen items often comes at a reduced price."
    ]
  },
  "3": {
    category: "Home & Living",
    title: "How to Transform Your Kitchen with Affordable Appliances",
    author: "Super Admin",
    date: "Dec 01, 2025",
    views: 262,
    tags: ["kitchen appliances", "home improvement", "gas cooker", "refrigerator", "blenders", "affordable living", "lifestyle"],
    image: "/kitchen-transformation-featured-img-420x270.png",
    body: [
      "Your kitchen is the heart of your home, and upgrading it doesn't have to break the bank.",
      "Start with a reliable gas cooker. Models with multiple burners allow you to prepare different meals simultaneously...",
      "Blenders and food processors are another must-have. From smoothies to soups, they simplify meal prep.",
      "Lighting also plays a big role. LED fixtures not only brighten your kitchen but also save on electricity bills."
    ]
  },
  "4": {
    category: "Tech & Gadgets",
    title: "Top 5 Must-Have Gadgets for 2026",
    author: "Super Admin",
    date: "Dec 01, 2025",
    views: 1504,
    tags: ["smartphones", "tablets", "laptop", "gadgets", "technology trends", "electronics", "accessories"],
    image: "/top-5-gadgets-featured-img-420x270.png",
    body: [
      "Technology continues to evolve at lightning speed, and 2026 is no exception.",
      "First on the list are smartphones with AI-powered cameras. These devices don't just capture photos—they analyze lighting.",
      "Next are tablets designed for multitasking. With split-screen functionality and powerful processors...",
      "Smart home assistants also continue to dominate. From controlling appliances to managing schedules."
    ]
  }
};

// Async function to handle params promise
export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Fetching the correct article based on ID
  const articleContent = allArticles[id as keyof typeof allArticles] || allArticles["1"];
  
  // Logic for related article
  const relatedId = id === "1" ? "2" : "1";
  const relatedArticle = allArticles[relatedId as keyof typeof allArticles];

  return (
    <main className="bg-white min-h-screen">
      
      {/* --- BREADCRUMB HERO --- */}
      <section className="bg-[#F4F7F9] py-8 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/" className="hover:text-[#149fcd] transition-colors">Home</Link>
          <span className="text-slate-300">•</span>
          <Link href="/blog" className="hover:text-[#149fcd] transition-colors">{articleContent.category}</Link>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 truncate max-w-xs">{articleContent.title}</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
            <header className="mb-10">
              <Link href="#" className="text-[#149fcd] font-bold text-sm hover:underline">
                {articleContent.category}
              </Link>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight font-montserrat">
                {articleContent.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-[#149fcd]" /> By {articleContent.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#149fcd]" /> {articleContent.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={14} className="text-[#149fcd]" /> {articleContent.views}
                </span>
              </div>
            </header>

            <div className="space-y-8 mb-12">
              {articleContent.body.map((para, i) => (
                <p key={i} className="text-slate-600 leading-[1.8] text-[15px] font-medium">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-10 border-t border-slate-100 space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-black text-slate-900 mr-2">Tags:</span>
                {articleContent.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 border border-slate-100 rounded-lg text-xs font-bold text-slate-400 hover:text-[#149fcd] cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-slate-900 mr-2">Share:</span>
                <div className="flex gap-3">
                  {[SiFacebook, SiX, SiInstagram, SiYoutube, LinkIcon, Mail].map((Icon, i) => (
                    <button key={i} className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#149fcd] hover:text-white hover:border-[#149fcd] transition-all">
                      <Icon size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* --- RELATED ARTICLES SECTION --- */}
      <section className="bg-[#F8FBFC] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-12 font-montserrat">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm group border border-slate-50">
              <div className="relative h-48 w-full">
                <Image 
                  src={relatedArticle.image} 
                  alt="Related Post" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {relatedArticle.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {relatedArticle.author}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-[#149fcd] transition-colors">
                  {relatedArticle.title.substring(0, 25)}...
                </h3>
                <Link href={`/blog/${relatedId}`} className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-[#149fcd] transition-colors">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}