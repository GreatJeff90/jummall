'use client';

import React, { useState } from "react";
import { ArrowLeft, Upload, ImageIcon, Loader2 } from "lucide-react";

export default function VendorBrandingView({ onBack }: { onBack: () => void }) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleBrandingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("Store asset branding deployed successfully!");
    }, 1000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Storefront</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Banner & branding</h1>
        </div>
      </div>

      <form onSubmit={handleBrandingSubmit} className="space-y-6 max-w-2xl">
        <div className="p-5 border border-slate-200 rounded-sm bg-white space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Store Logo</h3>
          <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 cursor-pointer" />
        </div>

        <div className="p-5 border border-slate-200 rounded-sm bg-white space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Cover Banner Photo</h3>
          <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 cursor-pointer" />
        </div>

        <button type="submit" disabled={uploading} className="bg-[#143D4A] hover:bg-slate-800 text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Deploy Assets
        </button>
      </form>
    </div>
  );
}