'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  Printer, 
  Download, 
  XCircle, 
  Upload, 
  FileText, 
  CloudUpload,
  ArrowLeft
} from "lucide-react";
import { fetchOrderDetails, OrderDetailResponse } from "../../../lib/api/auth";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string; // Safely reads dynamic id parameter segment straight from the URL grid

  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const loadOrderData = async () => {
      try {
        setLoading(true);
        setErrorOccurred(false);
        const data = await fetchOrderDetails(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Error retrieving order information details payload:", err);
        setErrorOccurred(true);
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [orderId]);

  // Helper formatting engine utility for Naira display contracts
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  // Utility hook to display dates cleanly
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) + " — " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return dateStr;
    }
  };

  // Helper dictionary mapping status types to background colors
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
        <p className="text-xs text-slate-400 font-medium">Fetching order configurations from gateway...</p>
      </div>
    );
  }

  if (errorOccurred || !order) {
    return (
      <div className="space-y-6 text-left">
        <button onClick={() => router.push("/customer/orders")} className="flex items-center gap-2 text-xs font-bold text-[#149fcd] hover:underline uppercase tracking-wider">
          <ArrowLeft size={14} /> Back to list
        </button>
        <div className="bg-white border border-red-100 rounded-sm p-12 text-center space-y-4">
          <p className="text-sm font-bold text-red-500">⚠️ Error loading order records configuration.</p>
          <p className="text-xs text-slate-400">Could not pull database records for target identifier path: <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 font-bold">{orderId}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Top Breadcrumb Navigation Shortcut */}
      <button onClick={() => router.push("/customer/orders")} className="flex items-center gap-2 text-xs font-bold text-[#149fcd] hover:underline uppercase tracking-wider">
        <ArrowLeft size={14} /> Back to my orders
      </button>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-12">
        
        {/* --- 1. Order & Shipping Info Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-50 pb-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Order details</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400">Order number:</span>
              <span className="text-slate-900 font-black">#{order.order_number}</span>
              
              <span className="text-slate-400">Time:</span>
              <span className="text-slate-700 font-medium">{formatDate(order.created_at)}</span>
              
              <span className="text-slate-400">Order status:</span>
              <span>
                <span className={`${statusColors[order.status] || "bg-slate-400"} text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide`}>
                  {order.status}
                </span>
              </span>
              
              <span className="text-slate-400">Payment method:</span>
              <span className="text-slate-700 font-medium">{order.payment_method}</span>
              
              <span className="text-slate-400">Payment status:</span>
              <span>
                <span className={`${order.payment_status === "completed" ? "bg-[#10B981]" : "bg-amber-500"} text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide`}>
                  {order.payment_status}
                </span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Shipping Destination</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400">Full Name:</span>
              <span className="text-slate-700 font-medium">{order.shipping_name}</span>
              
              <span className="text-slate-400">Phone:</span>
              <span className="text-slate-700 font-medium">{order.shipping_phone}</span>
              
              <span className="text-slate-400">Address:</span>
              <span className="text-slate-700 font-medium leading-relaxed">{order.shipping_address}</span>
            </div>
          </div>
        </div>

        {/* --- 2. Products Section --- */}
        <section>
          <h3 className="font-bold text-slate-800 mb-6">Products Package Details</h3>
          
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div key={item.id} className="border border-slate-50 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/20 transition-colors">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative w-20 h-20 bg-slate-50 rounded-md overflow-hidden border border-slate-100 shrink-0">
                    <Image 
                      src={item.image_url || "/placeholder-product.png"} 
                      alt={item.product_name} 
                      fill 
                      className="object-contain p-2" 
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{item.product_name}</h4>
                    {item.sku && <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{item.sku}</p>}
                    {item.vendor_name && (
                      <p className="text-[11px] text-slate-500">
                        Sold by: <span className="text-[#149fcd] hover:underline cursor-pointer font-medium">{item.vendor_name}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between md:justify-end gap-12 w-full md:w-auto text-right border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Price</p>
                    <p className="text-xs font-bold text-slate-700">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Quantity</p>
                    <p className="text-xs font-bold text-slate-700">{item.quantity}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total</p>
                    <p className="text-xs font-black text-[#149fcd]">{formatCurrency(item.total_price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-black text-slate-900">Total Bill Amount:</h3>
            <span className="text-xl font-black text-[#149fcd]">{formatCurrency(order.total_amount)}</span>
          </div>
        </section>

        {/* --- 3. Shipping Tracking Status --- */}
        <section className="bg-slate-50/50 p-6 rounded-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500 font-medium">Logistics Shipping Status:</span>
            <span className="bg-[#FFC107] text-white text-[10px] px-2.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              {order.shipping_status || "Pending Fulfillment"}
            </span>
          </div>
        </section>

        {/* --- 4. Payment Proof Upload Actions --- */}
        <section className="border-t border-slate-100 pt-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Upload Payment Proof Receipt</h3>
              <p className="text-[12px] text-slate-400 leading-relaxed max-w-2xl mt-1">
                This transaction record is currently being verified. To accelerate logistics clearance, please attach a copy of your bank deposit or transfer slip below:
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-sm p-4 flex items-center justify-between gap-4 bg-slate-50/30 group hover:border-[#149fcd] transition-colors">
              <div className="flex items-center gap-3">
                <CloudUpload size={20} className="text-slate-300 group-hover:text-[#149fcd]" />
                <span className="text-xs text-slate-400">Choose file or drag & drop slip here</span>
              </div>
              <button className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold py-2 px-4 rounded-sm hover:bg-slate-50 transition-colors">
                Browse File
              </button>
            </div>
            <button className="bg-[#149fcd] hover:bg-[#118eb8] text-white font-bold py-3 px-8 rounded-sm flex items-center justify-center gap-2 text-xs transition-all shrink-0 uppercase tracking-wider shadow-sm">
              <Upload size={16} /> Submit Proof
            </button>
          </div>
          <p className="text-[10px] text-slate-300 mt-3 italic">Supported formats: JPG, JPEG, PNG, PDF. Max upload payload threshold size: 2MB.</p>
        </section>

        {/* --- 5. Final Workspace Actions --- */}
        <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100">
          <button className="bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm">
            <Printer size={16} /> Print invoice
          </button>
          <button className="bg-[#1a6e8a] hover:bg-[#145d75] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm">
            <Download size={16} /> Download invoice
          </button>
          {order.status !== "cancelled" && order.status !== "completed" && (
            <button className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm">
              <XCircle size={16} /> Cancel order
            </button>
          )}
        </div>

      </div>
    </div>
  );
}