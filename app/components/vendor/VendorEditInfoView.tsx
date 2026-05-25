'use client';

import React, { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyStoreProfileAPI, updateMyStoreProfileAPI } from "../../lib/api/auth";

export default function VendorEditInfoView({ onBack }: { onBack: () => void }) {
  const queryClient = useQueryClient();

  // --- LOCAL MUTATION BUFFER INPUT STATES ---
  const [localShopName, setLocalShopName] = useState<string | null>(null);
  const [localLocationText, setLocalLocationText] = useState<string | null>(null);

  // 1. Fetch live profile dataset records using TanStack Query
  const { data: storeProfile, isLoading } = useQuery({
    queryKey: ["myStoreProfile"],
    queryFn: fetchMyStoreProfileAPI,
    staleTime: 1000 * 60 * 15, // Keep configuration profiles fresh for 15 minutes
  });

  // Fallback calculations resolving dynamic form synchronization cleanly on execution
  const shopName = localShopName ?? (storeProfile?.shop_name || "");
  const shopPhone = storeProfile?.shop_phone || "";
  const locationText = localLocationText ?? (storeProfile?.location_text || "");

  // 2. Encapsulate backend payload storage edits using an explicit useMutation macro channel
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      // Strictly pass only the exact parameters matching your authorized API parameter type definitions
      return await updateMyStoreProfileAPI({
        shop_name: shopName.trim()
      });
    },
    onSuccess: () => {
      // Flush state buffers to sync completely with server cache snapshots
      setLocalShopName(null);
      setLocalLocationText(null);
      
      queryClient.invalidateQueries({ queryKey: ["myStoreProfile"] });
      alert("Store profile text data successfully updated!");
    },
    onError: (_err: unknown) => {
      alert("Failed updating store records. Please check your data shapes.");
    }
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim() || updateProfileMutation.isPending) return;
    updateProfileMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="p-24 text-center select-none min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#149FCD]" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      
      {/* --- HEADER BACK-LINK PANEL --- */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button 
          type="button" 
          onClick={onBack} 
          className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none"
        >
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Storefront</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Edit store info</h1>
        </div>
      </div>

      {/* --- REFACTOR FORM BLOCK MATRIX --- */}
      <form onSubmit={handleUpdate} className="space-y-5 max-w-2xl">
        
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Shop Name *</label>
          <input 
            type="text" 
            required 
            value={shopName} 
            onChange={e => setLocalShopName(e.target.value)} 
            disabled={updateProfileMutation.isPending}
            className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#149FCD] bg-white transition-colors" 
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Shop Phone</label>
          <input 
            type="text" 
            disabled 
            value={shopPhone} 
            className="w-full border border-slate-100 bg-slate-50/60 rounded-sm px-4 py-3 text-sm font-semibold text-slate-400 outline-none cursor-not-allowed select-none" 
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Operational Base Location</label>
          <input 
            type="text" 
            value={locationText} 
            onChange={e => setLocalLocationText(e.target.value)} 
            disabled={updateProfileMutation.isPending}
            placeholder="e.g. Port Harcourt, Nigeria" 
            className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#149FCD] bg-white transition-colors" 
          />
        </div>

        {/* TRANSACTION SUBMISSION ACTION FOOTER */}
        <button 
          type="submit" 
          disabled={updateProfileMutation.isPending} 
          className="bg-[#143D4A] hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md focus:outline-none select-none"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Synchronizing...
            </>
          ) : (
            <>
              <Save size={14} /> Save Metadata
            </>
          )}
        </button>
        
      </form>
    </div>
  );
}