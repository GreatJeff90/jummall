'use client';
import {toast} from "sonner";
import React, { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuthMeAPI, updateAuthMeAPI } from "../../lib/api/auth";

export default function VendorPersonalInfoView({ onBack }: { onBack: () => void }) {
  const { refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  // --- LOCAL MUTATION BUFFER INPUT STATES ---
  const [localFullName, setLocalFullName] = useState<string | null>(null);

  // 1. Fetch certified user identity logs natively via TanStack Query
  const { data: userData, isLoading } = useQuery({
    queryKey: ["authMeUser"],
    queryFn: fetchAuthMeAPI,
    staleTime: 1000 * 60 * 15, // Caches authenticated user credentials for 15 minutes
  });

  // Calculate fields dynamically on execution to keep local edits responsive
  const fullName = localFullName ?? (userData?.name || "");
  const emailAddress = userData?.email || "";

  // 2. Encapsulate account profile modifications into a TanStack mutation channel
  const updateUserMutation = useMutation({
    mutationFn: async () => {
      return await updateAuthMeAPI({ name: fullName.trim() });
    },
    onSuccess: async () => {
      // Flush input state buffers to pull newly cached database properties
      setLocalFullName(null);
      
      queryClient.invalidateQueries({ queryKey: ["authMeUser"] });
      
      if (refreshProfile) {
        await refreshProfile(); // Refresh global legacy auth context states dynamically
      }
      
      toast.error("Personal credentials updated successfully!");
    },
    onError: (err: unknown) => {
      console.error("Failed updating profile records:", err);
      const errorInstance = err as { response?: { data?: { message?: string } }; message?: string };
      const backendMessage = errorInstance.response?.data?.message || errorInstance.message || "Unknown server error";
      toast.error(`Update failed: ${backendMessage}`);
    }
  });

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || updateUserMutation.isPending) return;
    updateUserMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 min-h-[350px]">
        <Loader2 size={32} className="animate-spin text-[#149FCD]" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Fetching user identity logs...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      
      {/* --- HEADER NAVIGATION PANEL --- */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button 
          type="button" 
          onClick={onBack} 
          className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none"
        >
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Account</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Personal Info</h1>
        </div>
      </div>

      {/* --- ACCOUNT OWNER PROFILE EDIT FORM --- */}
      <form onSubmit={handleUpdateUser} className="space-y-5 max-w-xl">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Account Owner Name *</label>
          <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
            <input 
              type="text" 
              required 
              value={fullName} 
              onChange={e => setLocalFullName(e.target.value)} 
              disabled={updateUserMutation.isPending}
              className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Primary Email Address</label>
          <input 
            type="text" 
            disabled 
            value={emailAddress || "merchant@jummall.com"} 
            className="w-full border border-slate-100 bg-slate-50/60 rounded-sm px-4 py-3 text-sm font-semibold text-slate-400 outline-none cursor-not-allowed font-mono select-all" 
          />
          <p className="text-[10px] text-slate-400 italic px-1 select-none">Email routing profiles must be modified via merchant security desk parameters.</p>
        </div>

        {/* SUBMIT CONTROL BUTTON */}
        <button 
          type="submit" 
          disabled={updateUserMutation.isPending} 
          className="bg-[#143D4A] hover:bg-slate-800 text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none focus:outline-none select-none"
        >
          {updateUserMutation.isPending ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Updating...
            </>
          ) : (
            <>
              <Save size={14} /> Update Account Info
            </>
          )}
        </button>
      </form>
    </div>
  );
}