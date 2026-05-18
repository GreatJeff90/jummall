'use client';

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Info, ArrowRight } from "lucide-react";

// modular utility to calculate readable category label
function formatQuery(query: string | null) {
  if (!query) return "Your Selection";
  return query
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ================= THE EMPTY GRID MESSAGE BOX (Repurposed from image_7.png) =================
function EmptyGridContent() {
  const searchParams = useSearchParams();
  // Target your dynamic query key; here assuming it is 'query' or 'category'
  const activeQuery = searchParams.get("query"); 
  
  const categoryLabel = formatQuery(activeQuery);

  return (
    <div className="w-full space-y-12 animate-in fade-in duration-300">
      
      {/* --- The Precise Message Box (Exact match to image_7.png) --- */}
      <div className="bg-[#FFF8E1] border-l-4 border-[#FFA000] p-4 rounded-sm flex items-start gap-3 shadow-sm shadow-amber-50">
        <Info size={16} className="text-[#FF8F00] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-slate-800 leading-tight">
            {"No products were found matching your selection."}
          </p>
          <p className="text-[11px] font-medium text-slate-500 mt-1">
            {"We couldn't find items in the"} <strong className="text-slate-800">{`"${categoryLabel}"`}</strong> {"collection right now. Try adjusting your active filters or clear them below."}
          </p>
        </div>
      </div>

      {/* --- Action call to return or clear --- */}
      <div className="w-full bg-slate-50/50 border border-slate-100 rounded-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
          <Link href="/shop" className="bg-[#0F172A] hover:bg-[#149fcd] text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md">
            Clear Filters <ArrowRight size={14} className="stroke-[2.5]" />
          </Link>
          <span className="text-[10px] font-medium text-slate-400">or return to main shop catalogue</span>
      </div>

    </div>
  );
}

// --- Loading Fallback UI ---
function EmptyGridFallback() {
  return (
    <div className="w-full bg-[#FFF8E1]/50 border-l-4 border-[#FFA000]/50 p-4 animate-pulse">
       <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-[#FF8F00]/20 rounded-full"/>
          <div className="w-2/3 h-3 bg-slate-200 rounded"/>
       </div>
    </div>
  );
}

// ================= GLOBAL EXPORT SECTIONFrame =================
export default function EmptyGrid() {
  return (
    <div className="w-full relative min-h-[300px]">
      
      {/* CRITICAL FIX (Ref image_6.png): Any component reading searchParams must 
        be wrapped in Suspense to fix prerendering crashes during builds.
      */}
      <Suspense fallback={<EmptyGridFallback />}>
        <EmptyGridContent />
      </Suspense>

    </div>
  );
}