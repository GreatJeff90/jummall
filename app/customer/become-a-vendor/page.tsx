'use client';

import React, { useState } from "react";
import { ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function BecomeVendor() {
  const router = useRouter();
  const { refreshProfile } = useAuth(); // Import profile contextual layer to update roles upon approval

  // --- SUBMISSION REACTION CONTROLS ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
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

    try {
      setLoading(true);

      // Package text entries alongside raw image/document buffer parameters
      const submissionPayload = new FormData();
      submissionPayload.append("shop_name", shopName);
      submissionPayload.append("shop_url", shopUrl);
      submissionPayload.append("shop_phone", shopPhone.startsWith("+234") ? shopPhone : `+234${shopPhone.replace(/\s+/g, "")}`);
      submissionPayload.append("vendor_type", vendorType);
      submissionPayload.append("id_type", idType);
      submissionPayload.append("id_number", idNumber);
      submissionPayload.append("bank_name", bankName);
      submissionPayload.append("account_name", accountName);
      submissionPayload.append("account_number", accountNumber);
      
      // Append files directly down to the payload dictionary
      submissionPayload.append("id_document_file", idFile);
      submissionPayload.append("proof_of_address_file", addressFile);

      // Execute network task
      // await api.post("/vendor/register", submissionPayload, { headers: { 'Content-Type': 'multipart/form-data' } });

      setSuccess(true);
      
      // Update global context cache profiles so client elements switch layout privileges seamlessly
      if (refreshProfile) {
        await refreshProfile();
      }

      // Short delay timer path to present confirmation to user before routing
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 1500);

    } catch (err) {
      console.error("Merchant onboarding verification block crash:", err);
      alert("Onboarding registration failed. Please cross-check your data inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
        Become Vendor
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 md:p-10 shadow-sm">
        <form onSubmit={handleFormSubmit} className="space-y-6 max-w-4xl">
          
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-sm flex items-center gap-2 text-xs font-bold animate-in fade-in duration-200">
              <CheckCircle2 size={16} /> Shop parameters verified! Redirecting to merchant management panel...
            </div>
          )}

          {/* Shop Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop Name *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: My Shop"
              value={shopName}
              onChange={e => setShopName(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300"
            />
          </div>

          {/* Shop URL */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop URL *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd]">
              <div className="bg-slate-50 px-4 py-3 border-r border-slate-100 text-slate-400 text-sm whitespace-nowrap select-none">
                https://jummall.com/stores/
              </div>
              <input 
                type="text" 
                required
                placeholder="my-awesome-store"
                value={shopUrl}
                onChange={e => setShopUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300 font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400 italic">This will be your store&apos;s unique URL. Only letters, numbers, and hyphens are allowed. Example: my-awesome-store</p>
          </div>

          {/* Shop Phone */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop Phone *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd]">
              <div className="flex items-center gap-2 px-3 border-r border-slate-100 bg-slate-50/50 cursor-pointer">
                <div className="w-5 h-3.5 bg-[#008751] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-full bg-white mx-auto" />
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-600">+234</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                required
                placeholder="9060690604"
                value={shopPhone}
                onChange={e => setShopPhone(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Vendor Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vendor Type *</label>
            <div className="relative">
              <select 
                value={vendorType}
                onChange={e => setVendorType(e.target.value)}
                className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none bg-white cursor-pointer"
              >
                <option value="Individual (Sole Proprietor)">Individual (Sole Proprietor)</option>
                <option value="Registered Company">Registered Company</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ID Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID Type *</label>
            <div className="relative">
              <select 
                value={idType}
                onChange={e => setIdType(e.target.value)}
                className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none bg-white cursor-pointer"
              >
                <option value="National ID">National ID</option>
                <option value="Voters Card">Voters Card</option>
                <option value="International Passport">International Passport</option>
                <option value="Drivers License">Drivers License</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID Number *</label>
            <input 
              type="text" 
              required
              placeholder="Enter ID Number"
              value={idNumber}
              onChange={e => setIdNumber(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300"
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upload ID Document *</label>
              <input 
                type="file" 
                required
                accept="image/*,.pdf"
                onChange={e => setIdFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1 cursor-pointer bg-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Proof of Address *</label>
              <input 
                type="file" 
                required
                accept="image/*,.pdf"
                onChange={e => setAddressFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1 cursor-pointer bg-white" 
              />
            </div>
          </div>

          {/* Banking Info Section */}
          <div className="space-y-6 pt-4 border-t border-slate-50">
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bank Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Bank Name" 
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Account Name" 
                  value={accountName}
                  onChange={e => setAccountName(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300" 
                />
                <p className="text-[10px] text-slate-400 italic">Account Name must match the name on the Government ID submitted</p>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Number *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Account Number" 
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300" 
                />
             </div>
          </div>

          {/* Terms and Policy */}
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded-sm border-slate-300 text-[#149fcd] focus:ring-[#149fcd] cursor-pointer" 
            />
            <label htmlFor="terms" className="text-[12px] text-slate-400 font-medium cursor-pointer select-none">
              I agree to the <Link href="/terms" className="text-[#149fcd] hover:underline transition-colors">Terms and Privacy Policy</Link>
            </label>
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-300 text-white text-[13px] font-bold py-3.5 px-12 rounded-sm transition-all shadow-sm uppercase tracking-wide flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Launching Store...
              </>
            ) : (
              "Register"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}