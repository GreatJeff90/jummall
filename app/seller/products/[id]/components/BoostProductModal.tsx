'use client';

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { Loader2, Zap, CheckCircle } from "lucide-react";

interface BoostTier {
  id: string;
  name: string;
  price: number;
  duration_days: number;
}

interface BoostProductModalProps {
  productId: string;
  onClose: () => void;
}

export default function BoostProductModal({ productId, onClose }: BoostProductModalProps) {
  const queryClient = useQueryClient();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // 1. Fetch boost status and available tiers
  const { data, isLoading } = useQuery<{ status: string; tiers: BoostTier[] }>({
    queryKey: ["productBoostInfo", productId],
    queryFn: async () => {
      const res = await api.get(`/products/${productId}/boost`);
      return res.data;
    },
  });

  // 2. Initiate Boost Payment
  const initiateBoostMutation = useMutation({
    mutationFn: (tierId: string) => api.post(`/products/${productId}/boost`, { tier: tierId }),
    onSuccess: (res) => {
      // res.data should contain authorization_url
      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url;
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-sm w-full max-w-lg space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest border-b pb-3">Boost Product Visibility</h2>

        {isLoading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          <div className="space-y-4">
            {data?.tiers.map((tier) => (
              <div 
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-4 border cursor-pointer ${selectedTier === tier.id ? 'border-[#149fcd] bg-sky-50' : 'border-slate-200'}`}
              >
                <div className="flex justify-between font-bold text-sm">
                  <span>{tier.name}</span>
                  <span>₦{tier.price.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase">{tier.duration_days} Days Exposure</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase">Cancel</button>
          <button 
            disabled={!selectedTier || initiateBoostMutation.isPending}
            onClick={() => selectedTier && initiateBoostMutation.mutate(selectedTier)}
            className="flex-1 bg-[#149fcd] text-white py-2 font-bold uppercase text-xs"
          >
            {initiateBoostMutation.isPending ? "Redirecting..." : "Pay for Boost"}
          </button>
        </div>
      </div>
    </div>
  );
}