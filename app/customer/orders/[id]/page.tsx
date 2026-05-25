'use client';

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ShieldCheck, XCircle, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderDetails, OrderDetailResponse } from "../../../lib/api/auth";
import { api } from "@/app/lib/api/client";

export default function SellerOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderId = params?.id as string;

  const [releaseCode, setReleaseCode] = useState("");

 const { data: order, isLoading } = useQuery<OrderDetailResponse | null>({
    queryKey: ["sellerOrderDetail", orderId],
    queryFn: () => fetchOrderDetails(orderId), // Using the correct fetcher
  });

  // 1. Advance Order State (paid → processing → shipped → awaiting_handoff)
  const advanceMutation = useMutation({
    mutationFn: () => api.post(`/orders/${orderId}/advance`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerOrderDetail", orderId] });
      alert("Order status advanced.");
    }
  });

  // 2. Verify Release Code (Release Funds)
  const verifyCodeMutation = useMutation({
    mutationFn: (code: string) => api.post(`/orders/${orderId}/verify-code`, { code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerOrderDetail", orderId] });
      alert("Funds released to your wallet.");
    }
  });

  // 3. Cancel Order
  const cancelMutation = useMutation({
    mutationFn: () => api.post(`/orders/${orderId}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerOrderDetail", orderId] });
      alert("Order cancelled.");
    }
  });

  if (isLoading) return <div className="p-16 text-center"><Loader2 className="animate-spin mx-auto" size={32} /></div>;
  if (!order) return <div className="p-12 text-center text-red-500">Order not found.</div>;

  return (
    <div className="space-y-6 p-6">
      <button onClick={() => router.push("/seller/orders")} className="flex items-center gap-2 text-xs font-bold text-[#149fcd] uppercase">
        <ArrowLeft size={14} /> Back to dashboard
      </button>

      <div className="bg-white border p-8 space-y-8">
        <h1 className="text-xl font-black uppercase tracking-wide">Order #{order.order_number}</h1>
        
        {/* Vendor Operation Panel */}
        <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase">Order Lifecycle</h3>
            <button 
              onClick={() => advanceMutation.mutate()}
              className="w-full bg-[#149fcd] text-white py-3 font-bold uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#118eb8]"
            >
              Advance Order Status <ChevronRight size={16} />
            </button>
            
            <button 
              onClick={() => cancelMutation.mutate()}
              className="w-full bg-red-50 text-red-600 border border-red-200 py-3 font-bold uppercase text-xs hover:bg-red-100"
            >
              <XCircle size={14} className="inline mr-2" /> Cancel Order
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase">Funds Release</h3>
            <div className="flex gap-2">
              <input 
                className="flex-1 border p-2 text-sm" 
                placeholder="Enter 6-digit release code"
                value={releaseCode}
                onChange={(e) => setReleaseCode(e.target.value)}
              />
              <button 
                onClick={() => verifyCodeMutation.mutate(releaseCode)}
                className="bg-emerald-600 text-white px-4 py-2 font-bold text-xs uppercase flex items-center gap-2"
              >
                <ShieldCheck size={16} /> Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}