'use client';

import HeroSlider from "./components/home/HeroSlider";
import CategoryShowcase from "./components/home/CategoryShowcase";
import FeatureSection from "./components/home/FeatureSection";
import TrendingProducts from "./components/home/TrendingProducts";
import AdBanner from "./components/home/AdBanner";
import TabletHero from "./components/home/TabletHero";

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

        {/* --- SECTION 4: TRENDING PRODUCTS --- */}
        <TrendingProducts />

        {/* --- SECTION 5: ADVERTISEMENT BANNERS --- */}
        <AdBanner />

        {/* --- SECTION 6: SECONDARY PROMO (TABLET COLLECTION) --- */}
        {/* Replaced the old static section with the dynamic TabletHero component */}
        <div className="mb-20">
          <TabletHero />
        </div>
      </main>
    </div>
  );
}