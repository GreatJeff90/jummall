'use client';

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Loader2,
  Flag, 
  CheckCircle 
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderDetails, OrderDetailResponse } from "../../../lib/api/auth";
import { api } from "@/app/lib/api/client";
import { uploadProductImagesWorkflow } from "@/app/lib/utils/imageUploader";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const orderId = params?.id as string;

  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeFile, setDisputeFile] = useState<File | null>(null);

  // 1. Synchronize granular order details
  const { data: order, isLoading, isError } = useQuery<OrderDetailResponse | null>({
    queryKey: ["customerOrderDetail", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });

  // 2. Mutation for Delivery Confirmation
  const confirmDeliveryMutation = useMutation({
    mutationFn: () => api.post(`/orders/${orderId}/confirm-delivery`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerOrderDetail", orderId] });
      alert("Delivery confirmed. Thank you!");
    }
  });

  // 3. Mutation for Dispute Initiation
  const initiateDisputeMutation = useMutation({
    mutationFn: async () => {
      if (!disputeFile) throw new Error("Evidence file required");
      const uploadedAssetsMap = await uploadProductImagesWorkflow([disputeFile]);
      return api.post(`/orders/${orderId}/dispute`, { 
        reason: disputeReason, 
        evidence_image: uploadedAssetsMap[0] 
      });
    },
    onSuccess: () => {
      setShowDisputeModal(false);
      queryClient.invalidateQueries({ queryKey: ["customerOrderDetail", orderId] });
      alert("Dispute filed successfully.");
    }
  });

  // --- HELPERS ---
const statusColors: Record<string, string> = {
  pending: "bg-amber-500",
  processing: "bg-[#149fcd]",
  completed: "bg-[#10B981]",
  cancelled: "bg-red-500",
  disputed: "bg-orange-600",
  awaiting_handoff: "bg-purple-500" // Adding it here helps TS recognize the key exists
};

  if (isLoading) return <div className="p-16 text-center"><Loader2 className="animate-spin mx-auto text-[#149fcd]" size={32} /></div>;
  if (isError || !order) return <div className="p-12 text-center text-red-500 font-bold">Error loading order.</div>;

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      <button onClick={() => router.push("/customer/orders")} className="flex items-center gap-2 text-xs font-black text-[#149fcd] hover:underline uppercase tracking-wider">
        <ArrowLeft size={14} /> Back to my orders
      </button>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-50 pb-10">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase text-slate-800 border-b pb-2">Order details</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400">Order number:</span> <span className="font-black">#{order.order_number}</span>
              <span className="text-slate-400">Status:</span> 
              <span className={`${statusColors[order.status] || 'bg-slate-400'} text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100">
          {(order.status as string) === "awaiting_handoff" && (
            <button onClick={() => confirmDeliveryMutation.mutate()} className="bg-[#10B981] text-white text-[11px] font-black py-3 px-6 rounded-sm flex items-center gap-2 uppercase">
              <CheckCircle size={16} /> Confirm Delivery
            </button>
          )}
          {["completed", "processing"].includes(order.status) && (
            <button onClick={() => setShowDisputeModal(true)} className="bg-orange-600 text-white text-[11px] font-black py-3 px-6 rounded-sm flex items-center gap-2 uppercase">
              <Flag size={16} /> File Dispute
            </button>
          )}
        </div>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-sm max-w-md w-full space-y-4">
            <h3 className="font-black text-slate-800 uppercase">File a Dispute</h3>
            <textarea className="w-full border p-3 text-sm" placeholder="Reason..." onChange={(e) => setDisputeReason(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => e.target.files && setDisputeFile(e.target.files[0])} />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDisputeModal(false)} className="text-xs font-bold uppercase">Cancel</button>
              <button onClick={() => initiateDisputeMutation.mutate()} className="bg-orange-600 text-white px-4 py-2 text-xs font-bold uppercase">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}