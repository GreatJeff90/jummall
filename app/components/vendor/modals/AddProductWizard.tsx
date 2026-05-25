'use client';

import React, { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { uploadProductImagesWorkflow } from "@/app/lib/utils/imageUploader"; 
import { api } from "@/app/lib/api/client"; 

// 1. Declare the type interfaces for modal orchestrations
interface AddProductWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => Promise<void> | void;
}

export default function AddProductWizard({ isOpen, onClose, onAdded }: AddProductWizardProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Guard clause: If the parent wrapper layout template states it should be hidden, return null
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || submitting) {
      alert("Please stage at least one product description asset image to continue.");
      return;
    }

    try {
      setSubmitting(true);

      // STEP A: Upload asset images straight to GCS buckets
      const uploadedAssetsMap = await uploadProductImagesWorkflow(selectedFiles);

      // STEP B: Dispatch structured JSON payload straight to your server instance
      await api.post("/products", {
        name: productName.trim(),
        price: parseFloat(price),
        description: description.trim(),
        images: uploadedAssetsMap
      });

      alert("Product successfully created and broadcast on Jummall streams!");
      
      // Flush form allocations
      setProductName("");
      setPrice("");
      setDescription("");
      setSelectedFiles([]);
      
      // Trigger context re-hydration and close modal safely
      if (onAdded) await onAdded();
      onClose();
    } catch (err) {
      console.error("Wizard transaction halted:", err);
      alert("Failed deploying item catalog configuration models to servers.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* --- MODAL DIALOG BACKDROP WRAPPER LAYER --- */
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white p-6 border border-slate-100 rounded-sm shadow-xl max-w-2xl w-full relative animate-in zoom-in-95 duration-150">
        
        {/* Absolute Close X Corner Button */}
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold p-1 select-none"
        >
          ✕
        </button>

        <form onSubmit={handleWizardSubmit} className="space-y-6 text-left font-sans">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-wide border-b pb-3">Create New Listing</h2>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Product Name *</label>
            <input type="text" required value={productName} onChange={e => setProductName(e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Retail Value (NGN) *</label>
            <input type="number" required placeholder="0.00" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Description *</label>
            <textarea rows={4} required value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] resize-none font-semibold text-slate-700 bg-white" />
          </div>

          {/* Structured Media Asset Drop-zone Container */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">Catalog Gallery Images *</label>
            <div className="border-2 border-dashed border-slate-200 hover:border-[#149fcd] bg-slate-50/50 p-6 rounded-sm text-center relative cursor-pointer transition-colors select-none">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              <UploadCloud size={32} className="mx-auto text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-500 block">Drag & drop or browse media gallery files</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">Staged file selections: {selectedFiles.length}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 h-12 border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-widest rounded-sm hover:bg-slate-50 transition-colors select-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 h-12 bg-[#143D4A] hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Publishing...
                </>
              ) : (
                <>Publish Listing</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}