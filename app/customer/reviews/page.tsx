'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Star, MessageSquarePlus, ClipboardCheck } from "lucide-react";
import { fetchMyOrders, fetchMyProductReview, OrderItem } from "../../lib/api/auth";

interface ReviewableItem extends OrderItem {
  order_number: string;
  hasReview: boolean;
  existingRating?: number;
}

export default function CustomerReviews() {
  const [reviewableItems, setReviewableItems] = useState<ReviewableItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviewableItems = async () => {
      try {
        setLoading(true);
        const orders = await fetchMyOrders();
        
        // Extract items from completed or processing orders
        const itemsList: ReviewableItem[] = [];
        const activeOrders = Array.isArray(orders) ? orders : [];

        for (const order of activeOrders) {
          if (order.items) {
            for (const item of order.items) {
              // Fetch individual review status across product definitions
              const review = await fetchMyProductReview(item.product_id);
              itemsList.push({
                ...item,
                order_number: order.order_number,
                hasReview: !!review,
                existingRating: review?.rating
              });
            }
          }
        }
        setReviewableItems(itemsList);
      } catch (err) {
        console.error("Error building dashboard review layout nodes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviewableItems();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Analyzing purchase history for product loops...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Product Reviews</h1>

      {/* --- CONDITIONAL EMPTY STATE CONTAINER --- */}
      {reviewableItems.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-sm p-20 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 mb-6 opacity-20">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                 <Star size={40} className="stroke-1" />
               </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No reviews yet!
          </h2>
          
          <p className="text-[13px] text-slate-400 max-w-md mb-8 leading-relaxed">
            Start shopping and share your experience by reviewing products you&apos;ve purchased.
          </p>

          <Link 
            href="/shop" 
            className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-sm font-bold py-3 px-8 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
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
              className="bg-white border border-slate-100 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-200 transition-all shadow-sm"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0 flex items-center justify-center text-xs text-slate-300">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.product_name} className="object-contain p-1 w-full h-full" />
                  ) : (
                    "Img"
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase">Order #{item.order_number}</span>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug mt-1">{item.product_name}</h4>
                  {item.vendor_name && <p className="text-[11px] text-slate-400">Sold by: <span className="text-[#149fcd]">{item.vendor_name}</span></p>}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Review Status</p>
                  {item.hasReview ? (
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-sm">
                      <ClipboardCheck size={14} /> Shared ({item.existingRating}★)
                    </div>
                  ) : (
                    <div className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-sm">
                      Pending Feedback
                    </div>
                  )}
                </div>

                <Link 
                  href={`/shop?product=${item.product_id}#reviews`} // Deep links directly to the public product sheet review view tab
                  className={`text-[11px] font-bold py-2.5 px-5 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wide border ${
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