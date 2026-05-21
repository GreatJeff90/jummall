'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw, Eye, ClipboardList } from "lucide-react";
import { fetchMyOrders, OrderDetailResponse } from "../../lib/api/auth";

export default function OrderReturnRequests() {
  const [returnOrders, setReturnOrders] = useState<OrderDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReturnRequests = async () => {
      try {
        setLoading(true);
        const data = await fetchMyOrders();
        
        // Filter orders that are actively in a "disputed" state representing return/hold queues
        const filtered = Array.isArray(data) 
          ? data.filter(order => order.status === "disputed" || order.status === "cancelled") 
          : [];
          
        setReturnOrders(filtered);
      } catch (err) {
        console.error("Error pulling return requests payload stream:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReturnRequests();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Scanning return queue stubs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Order Return Requests</h1>

      {/* --- CONDITIONAL EMPTY STATE AREA (Triggers when returnOrders length is 0) --- */}
      {returnOrders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-sm p-24 shadow-sm flex flex-col items-center justify-center text-center">
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

          <h2 className="text-xl font-bold text-slate-800 mb-2 font-montserrat">
            No order return requests yet!
          </h2>
          
          <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
            You have not placed any order return requests yet.
          </p>
        </div>
      ) : (
        /* --- DYNAMIC RENDERING FOR RETURNS/DISPUTES SETS --- */
        <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden divide-y divide-slate-100">
          {returnOrders.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-sm border border-orange-100 flex items-center justify-center shrink-0">
                  <RotateCcw size={18} />
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-800 text-sm">Return Request for #{item.order_number}</span>
                    <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wide">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Initiated on: <span className="text-slate-600 font-medium">{formatDate(item.created_at)}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Payment Origin: <span className="text-slate-700 font-medium">{item.payment_method}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Withheld Total</p>
                  <p className="text-sm font-black text-[#149fcd]">{formatCurrency(item.total_amount)}</p>
                </div>

                <Link 
                  href={`/customer/orders/${item.id}`} // Links straight down into details view panel context for verification status tracking
                  className="border border-slate-200 text-slate-600 hover:border-[#149fcd] hover:text-[#149fcd] p-2.5 rounded-sm transition-colors bg-white shadow-sm"
                  title="View Dispute Progress"
                >
                  <Eye size={15} />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}