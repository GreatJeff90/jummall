'use client';

import {toast} from "sonner";
import React, { useState } from "react";
import { ArrowLeft, Upload, ImageIcon, Loader2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";

interface VendorBrandingViewProps {
  onBack: () => void;
}

export default function VendorBrandingView({ onBack }: VendorBrandingViewProps) {
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Generates real-time client preview handles securely out of current raw local file nodes
  const logoPreview = logoFile ? URL.createObjectURL(logoFile) : null;
  const coverPreview = coverFile ? URL.createObjectURL(coverFile) : null;

  // Encapsulate multi-part binary multi-media submissions cleanly inside a TanStack mutation block
  const uploadBrandingMutation = useMutation({
    mutationFn: async () => {
      const payload = new FormData();
      if (logoFile) payload.append("logo", logoFile);
      if (coverFile) payload.append("cover_banner", coverFile);

      const response = await api.post("/vendor/branding", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Flush client instance object URLs out of memory arrays to eliminate RAM leakage artifacts
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      
      setLogoFile(null);
      setCoverFile(null);
      
      queryClient.invalidateQueries({ queryKey: ["vendorProfile"] });
      toast.error("Store asset branding deployed successfully!");
    },
    onError: (err: unknown) => {
      console.error("Storefront branding update failed:", err);
      const errorInstance = err as { response?: { data?: { message?: string } } };
      const backendMessage = errorInstance.response?.data?.message || "Verify maximum multi-media file sizes.";
      toast.error(`Asset submission failed: ${backendMessage}`);
    }
  });

  const handleBrandingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile && !coverFile) {
      toast.error("Please select at least one media slot asset string to modify.");
      return;
    }
    uploadBrandingMutation.mutate();
  };

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
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Storefront</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Banner & branding</h1>
        </div>
      </div>

      {/* --- LIVE INTERACTIVE FORMS RAIL --- */}
      <form onSubmit={handleBrandingSubmit} className="space-y-6 max-w-2xl">
        
        {/* STORE LOGO MULTI-MEDIA SLOT CARD */}
        <div className="p-5 border border-slate-200 rounded-sm bg-white space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Store Logo</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recommended footprint dimensions: Square 500x500px aspect-ratio canvas</p>
          </div>

          <div className="flex items-center gap-5">
            {logoPreview ? (
              <div className="relative w-20 h-20 bg-slate-50 border border-slate-200 rounded-md overflow-hidden shrink-0 group">
                <img src={logoPreview} alt="Logo Canvas Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setLogoFile(null)} 
                  className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 bg-slate-50 border border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center text-slate-300 shrink-0 select-none">
                <ImageIcon size={22} className="stroke-1" />
                <span className="text-[9px] font-bold uppercase mt-1 tracking-wide">No image</span>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setLogoFile(e.target.files?.[0] || null)} 
              disabled={uploadBrandingMutation.isPending}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 cursor-pointer focus:outline-none" 
            />
          </div>
        </div>

        {/* COVER BANNER PHOTO MULTI-MEDIA SLOT CARD */}
        <div className="p-5 border border-slate-200 rounded-sm bg-white space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Cover Banner Photo</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recommended footprint dimensions: Landscape 1200x400px aspect-ratio backdrop</p>
          </div>

          {coverPreview && (
            <div className="relative w-full h-32 bg-slate-50 border border-slate-200 rounded-sm overflow-hidden group animate-in fade-in duration-150">
              <img src={coverPreview} alt="Backdrop Landscape Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => setCoverFile(null)} 
                className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setCoverFile(e.target.files?.[0] || null)} 
            disabled={uploadBrandingMutation.isPending}
            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 cursor-pointer focus:outline-none" 
          />
        </div>

        {/* MUTATION TRANSACTION FORM SUBMISSION TRIGGER BUTTON */}
        <button 
          type="submit" 
          disabled={uploadBrandingMutation.isPending} 
          className="bg-[#143D4A] hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none text-white px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md focus:outline-none select-none"
        >
          {uploadBrandingMutation.isPending ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Uploading assets...
            </>
          ) : (
            <>
              <Upload size={14} /> Deploy Assets
            </>
          )}
        </button>
      </form>
    </div>
  );
}