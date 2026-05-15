import Image from "next/image";
import CategoryShowcase from "../components/home/CategoryShowcase";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import ShopSidebar from "../components/shop/ShopSidebar";
import BrandSlider from "../components/shop/BrandSlider";


export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32  w-full flex items-center overflow-hidden">
              {/* Background Image using fill and object-cover */}
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              {/* Darker overlay for text readability if needed */}
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl   tracking-tight text-[#0F172A]">Products</h1>
                <p className="text-sm text-slate-500 mt-2   uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Products</span>
                </p>
              </div>
            </div>

      {/* --- Brand Slider --- */}
        <BrandSlider />

      {/* --- Category Circles --- */}
      <CategoryShowcase />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <main className="lg:w-1/4">
            <ShopSidebar />
          </main>

          <main className="lg:w-3/4">
            <ShopProductGrid />
          </main>

        </div>
      </section>
    </main>
  );
}