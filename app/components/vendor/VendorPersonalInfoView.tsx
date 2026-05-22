'use client';

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchAuthMeAPI, updateAuthMeAPI } from "../../lib/api/auth";

export default function VendorPersonalInfoView({ onBack }: { onBack: () => void }) {
  const { refreshProfile } = useAuth(); // Context hook to sync changes globally if available
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch verified user credentials directly from API on mount
  const syncUserDataFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchAuthMeAPI();
      setFullName(data.name || "");
      setEmailAddress(data.email || "");
    } catch (err) {
      console.error("Failed downloading authenticated user info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializePersonalInfo = async () => {
      await syncUserDataFeed();
    };
    initializePersonalInfo();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || saving) return;

    try {
      setSaving(true);
      // Dispatch payload to update user records via PATCH
      await updateAuthMeAPI({ name: fullName.trim() });
      
      if (refreshProfile) {
        await refreshProfile(); // Refresh global auth state cache context dynamically
      }
      
      alert("Personal credentials updated successfully!");
    } catch (err) {
      console.error("Failed updating profile records:", err);
      const errorInstance = err as { response?: { data?: { message?: string } }; message?: string };
      const backendMessage = errorInstance.response?.data?.message || errorInstance.message || "Unknown server error";
      alert(`Update failed: ${backendMessage}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
          className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
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
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Account Owner Name *</label>
          <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
            <input 
              type="text" 
              required 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
              className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Primary Email Address</label>
          <input 
            type="text" 
            disabled 
            value={emailAddress || "merchant@jummall.com"} 
            className="w-full border border-slate-100 bg-slate-50/60 rounded-sm px-4 py-3 text-sm font-semibold text-slate-400 outline-none cursor-not-allowed font-mono" 
          />
          <p className="text-[10px] text-slate-400 italic px-1 select-none">Email routing profiles must be modified via merchant security desk parameters.</p>
        </div>

        <button 
          type="submit" 
          disabled={saving} 
          className="bg-[#143D4A] hover:bg-slate-800 text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
        >
          {saving ? (
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