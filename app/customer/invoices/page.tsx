'use client';

import React from "react";
import Link from "next/link";
import { Eye, FileText, ClipboardList, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyOrders, OrderDetailResponse } from "../../lib/api/auth";

export default function CustomerInvoices() {
  // 1. Fetch live accounting ledger directly via TanStack Query
  const { data: invoices = [], isLoading, isError } = useQuery<OrderDetailResponse[]>({
    queryKey: ["customerInvoicesLedger"],
    queryFn: fetchMyOrders,
    staleTime: 1000 * 60 * 15, // Cache ledger points fresh for 15 minutes
  });

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

  const paymentStatusColors: Record<string, string> = {
    pending: "bg-amber-500",
    completed: "bg-[#10B981]",
    failed: "bg-red-500",
    refunded: "bg-slate-500"
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3 min-h-[350px] shadow-sm select-none">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Syncing live account ledger...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-red-100 rounded-sm p-12 text-center space-y-3 shadow-xs select-none animate-in fade-in duration-150">
        <p className="text-sm font-bold text-red-500">⚠️ Session authentication failure.</p>
        <p className="text-xs text-slate-400">Please log back into your profile to rebuild active request context states safely.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat uppercase tracking-tight select-none">Invoices</h1>

      <div className="space-y-6">
        {/* --- DYNAMIC EMPTY LAYOUT FALLBACK BOUNDARY --- */}
        {invoices.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center space-y-5 shadow-xs select-none">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100/80">
              <ClipboardList size={32} className="stroke-1" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">No active invoices discovered</h3>
              <p className="text-xs font-medium text-slate-400 max-w-sm leading-relaxed">
                We couldn&apos;t spot any billing sheets attached to your current profile. Once you execute checkout purchases, statements populate here dynamically.
              </p>
            </div>
          </div>
        ) : (
          /* --- MAP DYNAMIC LIVE ENDPOINT OBJECTS --- */
          invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="bg-white border border-slate-100 rounded-sm p-6 md:p-8 shadow-sm transition-all hover:border-slate-200 animate-in fade-in duration-200"
            >
              {/* Invoice Header Layer */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6 select-none">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                    <FileText className="text-slate-400" size={18} /> Invoice INV-{invoice.order_number}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`${paymentStatusColors[invoice.payment_status] || "bg-slate-400"} text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wide shadow-3xs`}>
                      {invoice.payment_status === "completed" ? "Paid" : invoice.payment_status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      • Issued {formatDate(invoice.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Summary Structural Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-b border-slate-50/50 pb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-black text-slate-400 md:w-24 uppercase tracking-wider select-none">Total Amount</span>
                  <span className="text-[14px] font-black text-[#149fcd] font-montserrat">{formatCurrency(invoice.total_amount)}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-black text-slate-400 md:w-16 uppercase tracking-wider select-none">Items Count</span>
                  <span className="text-[14px] font-bold text-slate-700">{invoice.items?.length || 0}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-black text-slate-400 md:w-20 uppercase tracking-wider select-none">Payment Via</span>
                  <span className="text-[14px] font-semibold text-slate-600 truncate max-w-[200px]" title={invoice.payment_method}>
                    {invoice.payment_method}
                  </span>
                </div>
              </div>

              {/* Action Dynamic Redirection Button */}
              <div className="mt-6 flex justify-end select-none">
                <Link 
                  href={`/customer/orders/${invoice.id}`}
                  className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-bold py-2.5 px-5 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wide"
                >
                  <Eye size={14} /> View Statement Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}