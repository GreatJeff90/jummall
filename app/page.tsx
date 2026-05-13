'use client';

import HeroSlider from "./components/home/HeroSlider";
import CategoryShowcase from "./components/home/CategoryShowcase";
import FeatureSection from "./components/home/FeatureSection";
import TrendingProducts from "./components/home/TrendingProducts";
import AdBanner from "./components/home/AdBanner";
import TabletHero from "./components/home/TabletHero";
import GadgetSection from "./components/home/GadgetSection";
import NewArrivals from "./components/home/NewArrivals";
import ProductLists from "./components/home/ProductLists";  
import LatestNews from "./components/home/LatestNews";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      <main className="flex-grow">
        {/* --- SECTION 1: MAIN HERO SLIDER --- */}
        <HeroSlider />

        {/* --- SECTION 2: CIRCULAR CATEGORIES --- */}
        <CategoryShowcase />

        {/* --- SECTION 3: FEATURE TRUST BAR --- */}
        <FeatureSection />

        

        {/* --- SECTION 5: TRENDING PRODUCTS --- */}
        <TrendingProducts />

       

        {/* --- SECTION 6: ADVERTISEMENT BANNERS --- */}
        <AdBanner />

     {/* --- SECTION 4: GADGETS & COMPUTERS --- */}
        {/* New section featuring the sidebar navigation and speaker products */}
        <GadgetSection />

        {/* --- SECTION 7: SECONDARY PROMO (TABLET COLLECTION) --- */}
        <div className="mb-20">
          <TabletHero />
        </div>

        {/* --- SECTION 8: NEW ARRIVALS --- */}
        <NewArrivals />

        {/* --- SECTION 9: PRODUCT LISTS (ON SALE & TRENDING) --- */}
        <ProductLists />

        {/* --- SECTION 10: LATEST NEWS & ARTICLES --- */}
        <LatestNews />
      </main>
    </div>
  );
}