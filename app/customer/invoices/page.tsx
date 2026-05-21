'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, FileText, ClipboardList } from "lucide-react";
import { fetchMyOrders, OrderDetailResponse } from "../../lib/api/auth";

export default function CustomerInvoices() {
  const [invoices, setInvoices] = useState<OrderDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        setLoading(true);
        setErrorOccurred(false);
        const data = await fetchMyOrders();
        
        // Filter out any completely unsubmitted or cancelled states if you want invoices strictly for active billings
        const filteredInvoices = Array.isArray(data) ? data : [];
        setInvoices(filteredInvoices);
      } catch (err) {
        console.error("Error retrieving user invoice ledger data:", err);
        setErrorOccurred(true);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
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

  const paymentStatusColors: Record<string, string> = {
    pending: "bg-amber-500",
    completed: "bg-[#10B981]",
    failed: "bg-red-500",
    refunded: "bg-slate-500"
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Syncing live account ledger...</p>
      </div>
    );
  }

  if (errorOccurred) {
    return (
      <div className="bg-white border border-red-100 rounded-sm p-12 text-center space-y-3">
        <p className="text-sm font-bold text-red-500">⚠️ Session authentication failure.</p>
        <p className="text-xs text-slate-400">Please log back into your profile to rebuild active request context states safely.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Invoices</h1>

      <div className="space-y-6">
        {/* --- DYNAMIC EMPTY LAYOUT FALLBACK BOUNDARY --- */}
        {invoices.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100/80">
              <ClipboardList size={32} className="stroke-1" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No active invoices discovered</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                We couldn&quot;t spot any billing sheets attached to your current profile. Once you execute checkout purchases, statements populate here dynamically.
              </p>
            </div>
          </div>
        ) : (
          /* --- MAP DYNAMIC LIVE ENDPOINT OBJECTS --- */
          invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="bg-white border border-slate-100 rounded-sm p-6 md:p-8 shadow-sm transition-all hover:border-slate-200"
            >
              {/* Invoice Header Layer */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="text-slate-400" size={18} /> Invoice INV-{invoice.order_number}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`${paymentStatusColors[invoice.payment_status] || "bg-slate-400"} text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wide`}>
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
                  <span className="text-[11px] font-medium text-slate-400 md:w-24 uppercase tracking-wider">Total Amount</span>
                  <span className="text-[14px] font-black text-[#149fcd]">{formatCurrency(invoice.total_amount)}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-medium text-slate-400 md:w-16 uppercase tracking-wider">Items Count</span>
                  <span className="text-[14px] font-bold text-slate-700">{invoice.items?.length || 0}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-medium text-slate-400 md:w-20 uppercase tracking-wider">Payment Via</span>
                  <span className="text-[14px] font-medium text-slate-600 truncate max-w-[200px]" title={invoice.payment_method}>
                    {invoice.payment_method}
                  </span>
                </div>
              </div>

              {/* Action Dynamic Redirection Button */}
              <div className="mt-6 flex justify-end">
                <Link 
                  href={`/customer/orders/${invoice.id}`} // Links out directly to your clean orders dynamic tracking sheet
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