'use client';

import React, { useState } from "react";
import { ChevronDown, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/app/lib/api/client";

export default function BecomeVendor() {
  const router = useRouter();
  const { refreshProfile } = useAuth();

  // --- TEXT INTERACTIVE VALUES STATE ---
  const [shopName, setShopName] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [vendorType, setVendorType] = useState("Individual (Sole Proprietor)");
  const [idType, setIdType] = useState("National ID");
  const [idNumber, setIdNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- COMPLEX DATA IMAGE CORRIDOR OBJECT STORES ---
  const [idFile, setIdFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);

  // Encapsulate multi-part multi-media onboarding workflows inside a TanStack mutation channel
  const onboardingMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await api.post("/vendor/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: async () => {
      // Synchronize shared session wrappers instantly to enable layout vendor state privileges
      if (refreshProfile) {
        await refreshProfile();
      }
      
      // Navigate directly into your newly structured administration channels
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 1500);
    },
    onError: (err: unknown) => {
      console.error("Merchant onboarding verification block crash:", err);
      const errorInstance = err as { response?: { data?: { message?: string } } };
      const backendMessage = errorInstance.response?.data?.message || "Verify your connection parameters and data inputs.";
      alert(`Onboarding registration failed: ${backendMessage}`);
    }
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification checkpoint assertions
    if (!agreedToTerms) {
      alert("You must check and agree to the Terms and Privacy Policy before registration.");
      return;
    }
    if (!idFile || !addressFile) {
      alert("Kindly upload your required identification and proof of address certificates.");
      return;
    }

    // Package text entries alongside raw image/document buffer parameters
    const submissionPayload = new FormData();
    submissionPayload.append("shop_name", shopName.trim());
    submissionPayload.append("shop_url", shopUrl.trim());
    submissionPayload.append("shop_phone", shopPhone.startsWith("+234") ? shopPhone.trim() : `+234${shopPhone.replace(/\s+/g, "")}`);
    submissionPayload.append("vendor_type", vendorType);
    submissionPayload.append("id_type", idType);
    submissionPayload.append("id_number", idNumber.trim());
    submissionPayload.append("bank_name", bankName.trim());
    submissionPayload.append("account_name", accountName.trim());
    submissionPayload.append("account_number", accountNumber.trim());
    
    // Append binary handles directly to the network data boundaries
    submissionPayload.append("id_document_file", idFile);
    submissionPayload.append("proof_of_address_file", addressFile);

    onboardingMutation.mutate(submissionPayload);
  };

  return (
    <div className="space-y-6 pb-12 text-left font-sans max-w-4xl mx-auto px-4 md:px-0">
      
      {/* ================= EXISTING VENDOR REDIRECT BAR LINK ================= */}
      <div className="w-full bg-slate-100 border border-slate-200/60 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs select-none animate-in fade-in duration-200">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
          Already registered a merchant store front here?
        </span>
        <Link 
          href="/seller/dashboard" 
          className="text-xs font-black uppercase text-[#149fcd] hover:text-[#118eb8] flex items-center gap-1.5 group transition-colors tracking-wider"
        >
          Go to Vendor Dashboard <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight uppercase select-none">
        Become Vendor
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-6 md:p-10 shadow-sm">
        <form 
          onSubmit={handleFormSubmit} 
          className="space-y-6"
          aria-label="Merchant Registration Form"
        >
          
          {onboardingMutation.isSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-sm flex items-center gap-2 text-xs font-bold animate-in fade-in duration-200 select-none">
              <CheckCircle2 size={16} /> Shop parameters verified! Redirecting to merchant management panel...
            </div>
          )}

          {/* Shop Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Shop Name *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: My Shop"
              value={shopName}
              disabled={onboardingMutation.isPending}
              onChange={e => setShopName(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300 font-semibold transition-colors bg-white"
            />
          </div>

          {/* Shop URL */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Shop URL *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd] bg-white transition-colors">
              <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wide whitespace-nowrap select-none flex items-center">
                https://jummall.com/stores/
              </div>
              <input 
                type="text" 
                required
                placeholder="my-awesome-store"
                value={shopUrl}
                disabled={onboardingMutation.isPending}
                onChange={e => setShopUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300 font-mono font-bold bg-white"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic select-none">This will be your store&apos;s unique URL. Only lower-case letters, numbers, and hyphens are allowed. Example: my-awesome-store</p>
          </div>

          {/* Shop Phone */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Shop Phone *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd] bg-white transition-colors">
              <div className="flex items-center gap-2 px-3 border-r border-slate-200 bg-slate-50 select-none shrink-0">
                <div className="w-5 h-3.5 bg-[#008751] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-full bg-white mx-auto" />
                  </div>
                </div>
                <span className="text-xs font-black text-slate-600">+234</span>
                <ChevronDown size={12} className="text-slate-400 stroke-[2.5]" />
              </div>
              <input 
                type="text" 
                required
                placeholder="9060690604"
                value={shopPhone}
                disabled={onboardingMutation.isPending}
                onChange={e => setShopPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300 font-semibold bg-white"
              />
            </div>
          </div>

          {/* Vendor Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Vendor Type *</label>
            <div className="relative">
              <select 
                value={vendorType}
                disabled={onboardingMutation.isPending}
                onChange={e => setVendorType(e.target.value)}
                className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none bg-white cursor-pointer focus:border-[#149fcd] transition-colors"
              >
                <option value="Individual (Sole Proprietor)">Individual (Sole Proprietor)</option>
                <option value="Registered Company">Registered Company</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[2.5]" />
            </div>
          </div>

          {/* ID Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">ID Type *</label>
            <div className="relative">
              <select 
                value={idType}
                disabled={onboardingMutation.isPending}
                onChange={e => setIdType(e.target.value)}
                className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none bg-white cursor-pointer focus:border-[#149fcd] transition-colors"
              >
                <option value="National ID">National ID (NIN)</option>
                <option value="Voters Card">Voters Card</option>
                <option value="International Passport">International Passport</option>
                <option value="Drivers License">Drivers License</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[2.5]" />
            </div>
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">ID Number *</label>
            <input 
              type="text" 
              required
              placeholder="Enter Government Identification Number"
              value={idNumber}
              disabled={onboardingMutation.isPending}
              onChange={e => setIdNumber(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300 font-semibold transition-colors bg-white"
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Upload ID Document *</label>
              <input 
                type="file" 
                required
                accept="image/*,.pdf"
                disabled={onboardingMutation.isPending}
                onChange={e => setIdFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1 cursor-pointer bg-white focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Proof of Address *</label>
              <input 
                type="file" 
                required
                accept="image/*,.pdf"
                disabled={onboardingMutation.isPending}
                onChange={e => setAddressFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1 cursor-pointer bg-white focus:outline-none" 
              />
            </div>
          </div>

          {/* Banking Info Section */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
             <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Bank Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Access Bank, GTBank" 
                  value={bankName}
                  disabled={onboardingMutation.isPending}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300 font-semibold transition-colors bg-white" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Account Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Bank Account Name" 
                  value={accountName}
                  disabled={onboardingMutation.isPending}
                  onChange={e => setAccountName(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300 font-semibold transition-colors bg-white" 
                />
                <p className="text-[10px] text-slate-400 font-medium italic select-none">Account Name must correspond precisely with the identification credentials provided</p>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block select-none">Account Number *</label>
                <input 
                  type="text" 
                  required
                  maxLength={10}
                  placeholder="Enter 10-Digit NUBAN Number" 
                  value={accountNumber}
                  disabled={onboardingMutation.isPending}
                  onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300 font-mono font-bold tracking-wider bg-white transition-colors" 
                />
             </div>
          </div>

          {/* Terms and Policy */}
          <div className="flex items-center gap-3 pt-2 select-none">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms}
              disabled={onboardingMutation.isPending}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded-xs border-slate-300 text-[#149fcd] focus:ring-[#149fcd] cursor-pointer shadow-3xs focus:outline-none" 
            />
            <label htmlFor="terms" className="text-[12px] text-slate-500 font-bold cursor-pointer transition-colors hover:text-slate-800">
              I agree to the <Link href="/terms" className="text-[#149fcd] hover:underline">Terms and Privacy Policy</Link>
            </label>
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            disabled={onboardingMutation.isPending}
            className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-300 text-white text-[13px] font-black py-3.5 px-12 rounded-sm transition-all shadow-md uppercase tracking-wider flex items-center gap-2 focus:outline-none select-none"
          >
            {onboardingMutation.isPending ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Launching Store...
              </>
            ) : (
              "Register Shop"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}