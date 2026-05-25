'use client';

import React from "react";
import Link from "next/link";
import { RotateCcw, Eye, ClipboardList, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyOrders, OrderDetailResponse } from "../../lib/api/auth";

export default function OrderReturnRequests() {
  // 1. Fetch data stream natively via TanStack Query
  const { data: rawOrders = [], isLoading } = useQuery<OrderDetailResponse[]>({
    queryKey: ["customerOrdersHistory"], // Reuses your customer cache keys to avoid redundant network hits!
    queryFn: fetchMyOrders,
    staleTime: 1000 * 60 * 10,
  });

  // Extract return parameters dynamically on execution with proper data memoization bounds
  const returnOrders = React.useMemo(() => {
    if (!Array.isArray(rawOrders)) return [];
    return rawOrders.filter(order => order.status === "disputed" || order.status === "cancelled");
  }, [rawOrders]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3 min-h-[350px] shadow-sm select-none">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Scanning return queue stubs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat uppercase tracking-tight select-none">
        Order Return Requests
      </h1>

      {/* --- CONDITIONAL EMPTY STATE AREA (Triggers when returnOrders length is 0) --- */}
      {returnOrders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-sm p-24 shadow-sm flex flex-col items-center justify-center text-center select-none">
          {/* Custom SVG Illustration */}
          <div className="mb-8 opacity-60">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 512 512" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-200"
            >
              <circle cx="256" cy="256" r="200" fill="#F8FAFC" />
              <g transform="translate(0, 0)">
                <path 
                  fill="#867B99" 
                  d="M290.479,197.137c-0.265,0-0.485-0.209-0.496-0.477c-0.121-3.111-0.419-6.198-0.708-9.185
                     c-0.085-0.883-0.17-1.766-0.252-2.65c-0.104-1.1-0.224-2.246-0.346-3.422c-0.188-1.805-0.383-3.68-0.543-5.577
                     c-0.023-0.273,0.179-0.513,0.452-0.536c0.269-0.025,0.512,0.179,0.535,0.453c0.16,1.89,0.354,3.759,0.541,5.558
                     c0.123,1.179,0.243,2.327,0.348,3.432c0.08,0.884,0.166,1.765,0.251,2.647c0.29,2.999,0.59,6.102,0.712,9.241
                     c0.011,0.274-0.203,0.505-0.476,0.516C290.491,197.137,290.484,197.137,290.479,197.137z"
                />
              </g>
              <path 
                d="M320 300H192c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16z" 
                fill="#CBD5E1" 
              />
            </svg>
          </div>

          <h2 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">
            No order return requests yet!
          </h2>
          
          <p className="text-xs font-medium text-slate-400 max-w-sm leading-relaxed">
            You have not placed any order return requests yet.
          </p>
        </div>
      ) : (
        /* --- DYNAMIC RENDERING FOR RETURNS/DISPUTES SETS --- */
        <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden divide-y divide-slate-100">
          {returnOrders.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in duration-150">
              
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-sm border border-orange-100 flex items-center justify-center shrink-0 select-none">
                  <RotateCcw size={18} />
                </div>
                <div className="space-y-1 text-left min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 select-none">
                    <span className="font-black text-slate-800 text-sm">Return Request for #{item.order_number}</span>
                    <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wide shadow-3xs">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 select-none">
                    Initiated on: <span className="text-slate-600 font-medium">{formatDate(item.created_at)}</span>
                  </p>
                  <p className="text-xs text-slate-400 select-none">
                    Payment Origin: <span className="text-slate-700 font-semibold">{item.payment_method}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right select-none">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Withheld Total</p>
                  <p className="text-sm font-black text-[#149fcd] font-montserrat">{formatCurrency(item.total_amount)}</p>
                </div>

                <div className="flex items-center gap-2 select-none">
                  <Link 
                    href={`/customer/orders/${item.id}`}
                    className="border border-slate-200 text-slate-600 hover:border-[#149fcd] hover:text-[#149fcd] p-2.5 rounded-sm transition-colors bg-white shadow-sm focus:outline-none"
                    title="View Dispute Progress"
                  >
                    <Eye size={15} />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}