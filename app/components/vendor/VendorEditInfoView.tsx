'use client';

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2, Store, MapPin } from "lucide-react";
import { fetchMyStoreProfileAPI, updateMyStoreProfileAPI } from "../../lib/api/auth";

export default function VendorEditInfoView({ onBack }: { onBack: () => void }) {
  const [shopName, setShopName] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [locationText, setLocationText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchMyStoreProfileAPI();
        setShopName(data.shop_name);
        setShopPhone(data.shop_phone);
        setLocationText(data.location_text || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateMyStoreProfileAPI({ shop_name: shopName }); // Extend as endpoint payloads scale
      alert("Store profile text data successfully updated!");
    } catch (err) {
      alert("Failed updating store records.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-24 text-center select-none"><Loader2 className="animate-spin text-[#149FCD] mx-auto" size={32} /></div>;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Storefront</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Edit store info</h1>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5 max-w-2xl">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Shop Name *</label>
          <input type="text" required value={shopName} onChange={e => setShopName(e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#149FCD]" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Shop Phone</label>
          <input type="text" disabled value={shopPhone} className="w-full border border-slate-100 bg-slate-50/60 rounded-sm px-4 py-3 text-sm font-semibold text-slate-400 outline-none cursor-not-allowed" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Operational Base Location</label>
          <input type="text" value={locationText} onChange={e => setLocationText(e.target.value)} placeholder="e.g. Port Harcourt, Nigeria" className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#149FCD]" />
        </div>

        <button type="submit" disabled={saving} className="bg-[#143D4A] hover:bg-slate-800 text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md">
          {saving ? <Loader2 size={14} className="animate-spin text-[#149FCD]" /> : <Save size={14} />} Save Metadata
        </button>
      </form>
    </div>
  );
}