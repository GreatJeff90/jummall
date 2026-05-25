'use client';

import Image from "next/image";
import React, { useState } from "react";
import { 
  ShoppingBag, 
  ChevronRight, 
  RefreshCw, 
  Loader2 
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSellerOrders, SellerOrderItemAPI } from "../../lib/api/auth";

const filterCategories = [
  { label: "All", filterKey: "all" },
  { label: "New", filterKey: "Paid" },
  { label: "Packing", filterKey: "Preparing" },
  { label: "Shipped", filterKey: "On the way" },
  { label: "Handoff", filterKey: "Ready for handoff" },
  { label: "Released", filterKey: "Completed" },
  { label: "Cancelled", filterKey: "Cancelled" }
];

export default function VendorOrdersView() {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("all");

  // Compute dynamic query tracking parameters on the fly
  const statusParam = activeFilter === "all" ? undefined : activeFilter;

  // 1. Synchronize real-time order lists natively through TanStack Query
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sellerOrders", statusParam],
    queryFn: () => fetchSellerOrders({ status: statusParam }),
    staleTime: 1000 * 45, // Keep transactions cached for 45 seconds before validating entries
    placeholderData: (previousData) => previousData, // Maintain seamless background layout changes
  });

  const orders: SellerOrderItemAPI[] = Array.isArray(data?.orders) ? data.orders : [];
  const toShipCount = data?.to_ship_count ?? 0;

  const handleManualRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["sellerOrders", statusParam] });
  };

  // Utility to determine badge counts directly from cached data shapes safely inside render execution
  const getBadgeCount = (filterKey: string) => {
    if (filterKey === "all") return 0;
    return orders.filter(o => o.status === filterKey).length;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value).replace("NGN", "₦");
  };

  const getStatusStyles = (status: SellerOrderItemAPI['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#FCE7E0] text-[#D9714E]';
      case 'Preparing':
        return 'bg-slate-100 text-[#1B4D5E]';
      case 'On the way':
        return 'bg-[#E5F4FA] text-[#149FCD]';
      case 'Ready for handoff':
        return 'bg-yellow-100 text-[#143D4A]';
      case 'Completed':
        return 'bg-green-100 text-[#31B757]';
      default:
        return 'bg-red-100 text-[#EF4444]';
    }
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* --- 2.1 HEADER COMPONENT ZONE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 select-none">
        <div>
          <p className={`text-xs font-black uppercase tracking-widest ${toShipCount > 0 ? "text-[#D9714E]" : "text-[#31B757]"}`}>
            {toShipCount > 0 ? `${toShipCount} to ship` : "All caught up"}
          </p>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-1">
            Orders
          </h1>
        </div>

        <button 
          type="button"
          onClick={handleManualRefresh}
          disabled={isFetching}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-50 self-end sm:self-auto shadow-sm focus:outline-none"
        >
          <RefreshCw size={16} className={`transition-transform duration-500 ${isFetching ? "animate-spin text-[#149FCD]" : ""}`} />
        </button>
      </div>

      {/* --- 2.2 HORIZONTAL SCROLL CHIP NAVIGATION STRIP --- */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 py-1.5 flex items-center gap-2.5 select-none">
        {filterCategories.map((tab) => {
          const isActive = activeFilter === tab.filterKey;
          const badgeCount = getBadgeCount(tab.filterKey);

          return (
            <button
              type="button"
              key={tab.label}
              onClick={() => setActiveFilter(tab.filterKey)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-bold tracking-tight shrink-0 transition-all flex items-center gap-2 border shadow-sm focus:outline-none ${
                isActive 
                  ? "bg-[#143D4A] border-[#143D4A] text-white" 
                  : "bg-white border-[#EAEBED] text-[#010F1C] hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              
              {badgeCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none border transition-colors ${
                  isActive 
                    ? "bg-[#FFD43A] border-[#143D4A] text-[#143D4A]" 
                    : "bg-slate-100 border-slate-200 text-[#55585B]"
                }`}>
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- 2.3 EMPTY & DATA RENDERING BOUNDARY DISPATCHER LAYER --- */}
      {isLoading && orders.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 shadow-sm min-h-[400px]">
          <Loader2 size={32} className="animate-spin text-[#149FCD]" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide animate-pulse">Syncing Jummall Escrow Metrics...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[400px] select-none">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 mb-5">
            <ShoppingBag size={28} className="stroke-[1.5]" />
          </div>
          <h3 className="text-[15px] font-black text-slate-800 tracking-tight uppercase">Nothing here</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
            No orders match this filter requirement right now.
          </p>
        </div>
      ) : (
        /* --- 2.4 DYNAMIC ORDER LIST ROWS TRACKER LOOP --- */
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="w-full bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[#149FCD]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Product Frame Thumbnail Box */}
                <div className="relative w-14 h-16 bg-[#F6F7F9] border border-slate-100 rounded-sm p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                  <Image 
  src={order.img || "/placeholder-product.png"} 
  alt={order.productName} 
  fill
  sizes="56px"
  className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300" 
/>
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-black text-[#010F1C] tracking-tight">{order.id}</span>
                    <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[140px]">
                      · {order.customerName}
                    </span>
                    
                    {order.isPOD && (
                      <span className="bg-[#FFF5D9] border border-[#FFD43A]/40 text-[#143D4A] text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-2xs">
                        POD
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[12.5px] font-bold text-slate-600 truncate max-w-md" title={order.productName}>
                    {order.productName}
                    {order.itemCount > 1 && (
                      <span className="text-[#149FCD] font-black text-[11px] ml-1.5 uppercase tracking-wide">
                        + {order.itemCount - 1} item(s)
                      </span>
                    )}
                  </p>
                  
                  <p className="text-[13px] font-black text-[#31B757] tracking-tight pt-0.5">
                    {formatCurrency(order.price)}
                  </p>
                </div>
              </div>

              {/* Status Pill Action Area Container Block */}
              <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-0 pt-3 sm:pt-0 border-slate-50">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs ${getStatusStyles(order.status)}`}>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-[#149FCD] transition-colors hidden sm:block stroke-[2.5]" />
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}