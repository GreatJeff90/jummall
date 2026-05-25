'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Star, MessageSquarePlus, ClipboardCheck, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyOrders, fetchMyProductReview, OrderItem } from "../../lib/api/auth";

interface ReviewableItem extends OrderItem {
  order_number: string;
  hasReview: boolean;
  existingRating?: number;
}

export default function CustomerReviews() {
  // 1. Fetch dynamic base purchase history using TanStack Query
  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ["customerOrdersHistory"], // Reuses existing historical order cache lines
    queryFn: fetchMyOrders,
    staleTime: 1000 * 60 * 10,
  });

  // 2. Fetch individual review profiles in high-speed parallel concurrency loops
  const { data: reviewableItems = [], isLoading: loadingReviews } = useQuery<ReviewableItem[]>({
    queryKey: ["customerReviewableItems", orders],
    queryFn: async () => {
      const activeOrders = Array.isArray(orders) ? orders : [];
      const temporaryList: Array<OrderItem & { order_number: string }> = [];

      // Flatten items into a structured iteration array block
      activeOrders.forEach(order => {
        if (order.items) {
          order.items.forEach(item => {
            temporaryList.push({
              ...item,
              order_number: order.order_number
            });
          });
        }
      });

      // Execute all network lookups concurrently instead of sequentially blocking
      return await Promise.all(
        temporaryList.map(async (item) => {
          try {
            const review = await fetchMyProductReview(item.product_id);
            return {
              ...item,
              hasReview: !!review,
              existingRating: review?.rating
            };
          } catch (_err) {
            return {
              ...item,
              hasReview: false
            };
          }
        })
      );
    },
    enabled: orders.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = loadingOrders || (orders.length > 0 && loadingReviews);

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3 min-h-[350px] shadow-sm select-none">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Analyzing purchase history for product loops...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat uppercase tracking-tight select-none">Product Reviews</h1>

      {/* --- CONDITIONAL EMPTY STATE CONTAINER --- */}
      {reviewableItems.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-sm p-20 shadow-sm flex flex-col items-center justify-center text-center select-none">
          <div className="relative w-40 h-40 mb-6 opacity-20">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                 <Star size={40} className="stroke-1" />
               </div>
            </div>
          </div>

          <h2 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">
            No reviews yet!
          </h2>
          
          <p className="text-xs font-medium text-slate-400 max-w-md mb-8 leading-relaxed">
            Start shopping and share your experience by reviewing products you&apos;ve purchased.
          </p>

          <Link 
            href="/shop" 
            className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-3 px-8 rounded-sm flex items-center gap-2 transition-all shadow-md uppercase tracking-wider focus:outline-none"
          >
            <Plus size={18} /> Start Shopping
          </Link>
        </div>
      ) : (
        /* --- RENDER ACTIVE REVIEW CARD MATRIX BLOCK --- */
        <div className="grid grid-cols-1 gap-4">
          {reviewableItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-slate-100 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-200 transition-all shadow-sm animate-in fade-in duration-150"
            >
              <div className="flex items-center gap-6 w-full md:w-auto min-w-0">
                {/* Optimized Next.js Framework Image Container */}
                <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0 flex items-center justify-center select-none">
                  <Image
                    src={item.image_url || "/placeholder-product.png"}
                    alt={item.product_name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-1 text-left min-w-0 flex-1">
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase select-none">
                    Order #{item.order_number}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug mt-1 truncate" title={item.product_name}>
                    {item.product_name}
                  </h4>
                  {item.vendor_name && (
                    <p className="text-[11px] text-slate-400 select-none">
                      Sold by: <span className="text-[#149fcd] font-semibold">{item.vendor_name}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 select-none">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Review Status</p>
                  {item.hasReview ? (
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-sm shadow-3xs">
                      <ClipboardCheck size={14} /> Shared ({item.existingRating}★)
                    </div>
                  ) : (
                    <div className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-sm shadow-3xs">
                      Pending Feedback
                    </div>
                  )}
                </div>

                <Link 
                  href={`/shop?product=${item.product_id}#reviews`}
                  className={`text-[11px] font-bold py-2.5 px-5 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wide border focus:outline-none ${
                    item.hasReview 
                      ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50" 
                      : "bg-[#149fcd] border-[#149fcd] text-white hover:bg-[#118eb8]"
                  }`}
                >
                  <MessageSquarePlus size={14} /> {item.hasReview ? "Update Review" : "Write Review"}
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}