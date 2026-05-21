'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Eye, ClipboardList } from "lucide-react";
import { fetchMyOrders, OrderDetailResponse } from "../../lib/api/auth";

export default function CustomerOrdersPage() {
  // Initialized to an empty array so no hardcoded mock item defaults exist on load
  const [orders, setOrders] = useState<OrderDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    const loadOrdersList = async () => {
      try {
        setLoading(true);
        setErrorOccurred(false);
        const data = await fetchMyOrders();
        
        // Populate layout state context with your real database results array
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error retrieving user orders history payload:", err);
        setErrorOccurred(true);
      } finally {
        setLoading(false);
      }
    };

    loadOrdersList();
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

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500",
    processing: "bg-[#149fcd]",
    completed: "bg-[#10B981]",
    cancelled: "bg-red-500",
    disputed: "bg-orange-600"
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Loading your real order logs...</p>
      </div>
    );
  }

  if (errorOccurred) {
    return (
      <div className="bg-white border border-red-100 rounded-sm p-12 text-center space-y-3">
        <p className="text-sm font-bold text-red-500">⚠️ Session expired or access restricted.</p>
        <p className="text-xs text-slate-400">Please sign out from the sidebar and log back in to renew your security authorization token keys.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-800 font-montserrat">My Orders</h1>
        {orders.length > 0 && (
          <div className="bg-sky-50 text-[#149fcd] px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider">
            Total: {orders.length}
          </div>
        )}
      </div>

      {/* --- CONDITIONAL EMPTY STATE CHECK (No default data falls through) --- */}
      {orders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100/80">
            <ClipboardList size={32} className="stroke-1" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">Your order history is empty</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              You have not placed any purchases yet. Explore our open marketplace collections to fill your shopping queue!
            </p>
          </div>
          <Link 
            href="/shop" 
            className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-3 px-6 rounded-sm transition-all uppercase tracking-wider inline-block shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        /* --- RENDER REAL LOGGED IN DATA ROWS --- */
        <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden divide-y divide-slate-100">
          {orders.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-800 text-sm">#{item.order_number}</span>
                    <span className={`${statusColors[item.status] || "bg-slate-400"} text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Placed on: <span className="text-slate-600 font-medium">{formatDate(item.created_at)}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Items Count: <span className="text-slate-700 font-bold">{item.items?.length || 0} items</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Total Bill</p>
                  <p className="text-sm font-black text-[#149fcd]">{formatCurrency(item.total_amount)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={`/customer/orders/${item.id}`} // Routes seamlessly to the specific dynamic profile item folder details view 
                    className="border border-slate-200 text-slate-600 hover:border-[#149fcd] hover:text-[#149fcd] p-2.5 rounded-sm transition-colors bg-white shadow-sm"
                    title="View Details"
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