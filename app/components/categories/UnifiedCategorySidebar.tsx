'use client';

import React from "react";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { CategoryItem } from "@/app/lib/api/auth";

interface SidebarProps {
  categories: CategoryItem[];
  currentSlug: string;
}

export default function UnifiedCategorySidebar({ categories, currentSlug }: SidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] bg-white border border-slate-100 rounded-sm p-5 shrink-0 shadow-sm text-left font-sans select-none">
      
      <div className="flex items-center gap-2.5 border-b border-slate-50 pb-4 mb-4">
        <Layers size={16} className="text-[#149fcd]" />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
          Browse Categories
        </h3>
      </div>

      <nav className="space-y-1">
        {categories.map((category) => {
          const isActive = currentSlug === category.slug;
          
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all text-xs font-semibold uppercase tracking-wider ${
                isActive 
                  ? "bg-[#E5F4FA] text-[#149FCD] font-black" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="truncate pr-2">{category.name}</span>
              
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-[#149FCD] text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {category.product_count}
                </span>
                <ChevronRight size={12} className={isActive ? "text-[#149FCD]" : "text-slate-300"} />
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}