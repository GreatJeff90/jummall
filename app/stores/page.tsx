'use client';

import React from "react";
import { StorefrontProvider } from "@/context/StorefrontContext";
import HeroBannerSlider from "../components/home/HeroSlider"; // Maps precisely to components/home/HeroSlider.tsx
import ProductCategoriesGrid from "../components/home/CategoryShowcase"; // Maps to components/home/CategoryShowcase.tsx
import TrendingProducts from "../components/home/TrendingProducts"; // Maps to components/home/TrendingProducts.tsx
import NewArrivals from "../components/home/NewArrivals"; // Maps to components/home/NewArrivals.tsx
import ProductLists from "../components/home/ProductLists"; // Maps to components/home/ProductLists.tsx
export default function PublicStorefrontPage() {
  return (
    <StorefrontProvider>
      <div className="bg-[#F6F7F9] min-h-screen antialiased space-y-2">
        
        {/* 1. Dynamic Marketing Carousel Section Layout */}
        <HeroBannerSlider />

        {/* 2. Horizontal Categories Matrix Strip Row Block */}
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <ProductCategoriesGrid />
        </div>

        {/* 3. Core Store Layout Product Display Grid Panels Tays */}
        <TrendingProducts />
        
        <NewArrivals />
        
        <ProductLists />
      </div>
    </StorefrontProvider>
  );
}