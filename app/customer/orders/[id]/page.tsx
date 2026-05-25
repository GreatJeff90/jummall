'use client';

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  Printer, 
  Download, 
  XCircle, 
  Upload, 
  FileText, 
  CloudUpload,
  ArrowLeft,
  Loader2,
  X
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderDetails, OrderDetailResponse } from "../../../lib/api/auth";
import { api } from "@/app/lib/api/client";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const orderId = params?.id as string;

  // --- LOCAL FILE PREVIEW BUFFER OVERRIDES ---
  const [proofFile, setProofFile] = useState<File | null>(null);

  // 1. Synchronize granular product details using a target Query key dependency trace
  const { data: order, isLoading, isError } = useQuery<OrderDetailResponse | null>({
    queryKey: ["customerOrderDetail", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5, // Order parameters remain fresh for 5 minutes
  });

  // 2. Encapsulate transaction deposit slip uploads into an atomic Mutation block
  const uploadProofMutation = useMutation({
    mutationFn: async (file: File) => {
      const payload = new FormData();
      payload.append("payment_proof", file);
      
      const response = await api.post(`/customer/orders/${orderId}/proof`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    },
    onSuccess: () => {
      setProofFile(null);
      queryClient.invalidateQueries({ queryKey: ["customerOrderDetail", orderId] });
      alert("Payment proof receipt successfully deployed for confirmation routing!");
    },
    onError: (err: unknown) => {
      console.error("Failed uploading transfer receipt payload:", err);
      const errorInstance = err as { response?: { data?: { message?: string } } };
      const backendMessage = errorInstance.response?.data?.message || "Verify your connection data thresholds.";
      alert(`Upload failed: ${backendMessage}`);
    }
  });

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
      alert("Please select or drop a valid file document before submitting.");
      return;
    }
    uploadProofMutation.mutate(proofFile);
  };

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
        month: "long",
        year: "numeric",
      }) + " — " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
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

  const isUploading = uploadProofMutation.isPending;

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3 min-h-[400px] shadow-sm select-none">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Fetching order configurations from gateway...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="space-y-6 text-left animate-in fade-in duration-150">
        <button type="button" onClick={() => router.push("/customer/orders")} className="flex items-center gap-2 text-xs font-black text-[#149fcd] hover:underline uppercase tracking-wider focus:outline-none select-none">
          <ArrowLeft size={14} className="stroke-[2.5]" /> Back to list
        </button>
        <div className="bg-white border border-red-100 rounded-sm p-12 text-center space-y-4 shadow-sm select-none">
          <p className="text-sm font-bold text-red-500">⚠️ Error loading order records configuration.</p>
          <p className="text-xs text-slate-400">Could not pull database records for target identifier path: <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 font-bold">{orderId}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Top Breadcrumb Navigation Shortcut */}
      <button type="button" onClick={() => router.push("/customer/orders")} className="flex items-center gap-2 text-xs font-black text-[#149fcd] hover:underline uppercase tracking-wider focus:outline-none select-none">
        <ArrowLeft size={14} className="stroke-[2.5]" /> Back to my orders
      </button>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-12">
        
        {/* --- 1. Order & Shipping Info Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-50 pb-10">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider border-b border-slate-100 pb-2 mb-4 select-none">Order details</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400 select-none">Order number:</span>
              <span className="text-slate-900 font-black">#{order.order_number}</span>
              
              <span className="text-slate-400 select-none">Time:</span>
              <span className="text-slate-700 font-medium">{formatDate(order.created_at)}</span>
              
              <span className="text-slate-400 select-none">Order status:</span>
              <div>
                <span className={`${statusColors[order.status] || "bg-slate-400"} text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide select-none shadow-3xs`}>
                  {order.status}
                </span>
              </div>
              
              <span className="text-slate-400 select-none">Payment method:</span>
              <span className="text-slate-700 font-semibold">{order.payment_method}</span>
              
              <span className="text-slate-400 select-none">Payment status:</span>
              <div>
                <span className={`${order.payment_status === "completed" ? "bg-[#10B981]" : "bg-amber-500"} text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide select-none shadow-3xs`}>
                  {order.payment_status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider border-b border-slate-100 pb-2 mb-4 select-none">Shipping Destination</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400 select-none">Full Name:</span>
              <span className="text-slate-700 font-semibold">{order.shipping_name}</span>
              
              <span className="text-slate-400 select-none">Phone:</span>
              <span className="text-slate-700 font-medium select-all">{order.shipping_phone}</span>
              
              <span className="text-slate-400 select-none">Address:</span>
              <span className="text-slate-700 font-medium leading-relaxed select-all">{order.shipping_address}</span>
            </div>
          </div>
        </div>

        {/* --- 2. Products Section --- */}
        <section>
          <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider mb-6 select-none">Products Package Details</h3>
          
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div key={item.id} className="border border-slate-100 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/20 transition-colors animate-in fade-in duration-100">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative w-20 h-20 bg-slate-50 rounded-md overflow-hidden border border-slate-100 shrink-0 select-none">
                    <Image 
                      src={item.image_url || "/placeholder-product.png"} 
                      alt={item.product_name} 
                      fill 
                      sizes="80px"
                      className="object-contain p-2" 
                    />
                  </div>
                  <div className="space-y-1 text-left min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug truncate">{item.product_name}</h4>
                    {item.sku && <p className="text-[11px] text-slate-400 font-black uppercase tracking-wider">{item.sku}</p>}
                    {item.vendor_name && (
                      <p className="text-[11px] text-slate-500 select-none">
                        Sold by: <span className="text-[#149fcd] hover:underline cursor-pointer font-bold">{item.vendor_name}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between md:justify-end gap-12 w-full md:w-auto text-right border-t md:border-t-0 pt-4 md:pt-0 select-none">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Price</p>
                    <p className="text-xs font-bold text-slate-700 font-montserrat">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Quantity</p>
                    <p className="text-xs font-bold text-slate-700">{item.quantity}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total</p>
                    <p className="text-xs font-black text-[#149fcd] font-montserrat">{formatCurrency(item.total_price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100 select-none">
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Total Bill Amount:</h3>
            <span className="text-xl font-black text-[#149fcd] font-montserrat">{formatCurrency(order.total_amount)}</span>
          </div>
        </section>

        {/* --- 3. Shipping Tracking Status --- */}
        <section className="bg-slate-50/50 p-6 rounded-sm border border-slate-100 select-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Logistics Shipping Status:</span>
            <span className="bg-[#FFC107] text-white text-[10px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider shadow-3xs">
              {order.shipping_status || "Pending Fulfillment"}
            </span>
          </div>
        </section>

        {/* --- 4. Payment Proof Upload Actions --- */}
        <section className="border-t border-slate-100 pt-10">
          <div className="flex items-start gap-4 mb-6 select-none">
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

          <form 
            onSubmit={handleProofSubmit} 
            className="flex flex-col md:flex-row gap-4 items-stretch md:items-center"
            aria-label="Payment Proof Submission Form"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*,.pdf"
              disabled={isUploading}
              onChange={e => setProofFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-slate-200 rounded-sm p-4 flex items-center justify-between gap-4 bg-slate-50/30 group hover:border-[#149fcd] transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <CloudUpload size={20} className="text-slate-300 group-hover:text-[#149fcd] shrink-0" />
                <span className="text-xs text-slate-400 truncate max-w-[280px]">
                  {proofFile ? proofFile.name : "Choose file or drag & drop slip here"}
                </span>
              </div>
              
              {proofFile ? (
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setProofFile(null); }}
                  className="text-slate-400 hover:text-red-500 p-1 focus:outline-none"
                >
                  <X size={16} />
                </button>
              ) : (
                <button 
                  type="button"
                  disabled={isUploading}
                  className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold py-2 px-4 rounded-sm hover:bg-slate-50 transition-colors shrink-0 focus:outline-none"
                >
                  Browse File
                </button>
              )}
            </div>

            <button 
              type="submit"
              disabled={!proofFile || isUploading}
              className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white font-black py-3 px-8 h-14 rounded-sm flex items-center justify-center gap-2 text-xs transition-all shrink-0 uppercase tracking-wider shadow-md focus:outline-none select-none"
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#149FCD]" /> Submitting...
                </>
              ) : (
                <>
                  <Upload size={16} /> Submit Proof
                </>
              )}
            </button>
          </form>
          <p className="text-[10px] text-slate-300 mt-3 italic select-none">Supported formats: JPG, JPEG, PNG, PDF. Max upload payload threshold size: 2MB.</p>
        </section>

        {/* --- 5. Final Workspace Actions --- */}
        <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100 select-none">
          <button type="button" className="bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-black py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm focus:outline-none">
            <Printer size={16} /> Print invoice
          </button>
          <button type="button" className="bg-[#1a6e8a] hover:bg-[#145d75] text-white text-[11px] font-black py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm focus:outline-none">
            <Download size={16} /> Download invoice
          </button>
          {order.status !== "cancelled" && order.status !== "completed" && (
            <button type="button" className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-black py-3 px-6 rounded-sm flex items-center gap-2 transition-all uppercase tracking-wider shadow-sm focus:outline-none">
              <XCircle size={16} /> Cancel order
            </button>
          )}
        </div>

      </div>
    </div>
  );
}