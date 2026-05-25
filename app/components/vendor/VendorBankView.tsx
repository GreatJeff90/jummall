'use client';

import React, { useState, useEffect } from "react";
import { Loader2, Landmark, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { fetchPayoutBanksAPI, resolveBankAccountAPI, fetchSavedBankAPI, saveBankAccountAPI, BankItemAPI } from "@/app/lib/api/auth";

export default function VendorBankView() {
  const [banksList, setBanksList] = useState<BankItemAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [saving, setSaving] = useState(false);

  // Core configuration model fields
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Initialize data structures concurrently on page mount
  useEffect(() => {
    const hydrateBankWorkspace = async () => {
      try {
        setLoading(true);
        // Load bank list and current configuration settings in parallel
        const [banksData, currentSavedProfile] = await Promise.all([
          fetchPayoutBanksAPI(),
          fetchSavedBankAPI()
        ]);

        setBanksList(banksData || []);

        if (currentSavedProfile) {
          setSelectedBankCode(currentSavedProfile.bank_code);
          setAccountNumber(currentSavedProfile.account_number);
          setResolvedAccountName(currentSavedProfile.account_name);
          setIsVerified(true);
        }
      } catch (err) {
        console.error("Failed loading bank setup parameters:", err);
      } finally {
        setLoading(false);
      }
    };

    hydrateBankWorkspace();
  }, []);

  // Watch inputs to auto-trigger Paystack resolution once account number is exactly 10 digits
  useEffect(() => {
    const handleAccountValidationFlow = async () => {
      // If validation conditions aren't reached yet, perform clean-up operations safely inside the async flow
      if (accountNumber.length !== 10 || !selectedBankCode) {
        setResolvedAccountName("");
        setIsVerified(false);
        return;
      }

      try {
        setVerifying(true);
        setResolvedAccountName("");
        setIsVerified(false);

        const verification = await resolveBankAccountAPI({
          account_number: accountNumber.trim(),
          bank_code: selectedBankCode
        });

        if (verification && verification.account_name) {
          setResolvedAccountName(verification.account_name);
          setIsVerified(true);
        }
      } catch (err) {
        setResolvedAccountName("Could not resolve account details. Please double-check inputs.");
        setIsVerified(false);
      } finally {
        setVerifying(false);
      }
    };

    handleAccountValidationFlow();
  }, [accountNumber, selectedBankCode]);
  const handleSaveBankSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified || saving) return;

    try {
      setSaving(true);
      const chosenBank = banksList.find(b => b.code === selectedBankCode);
      
      await saveBankAccountAPI({
        bank_name: chosenBank ? chosenBank.name : "Unknown Bank",
        bank_code: selectedBankCode,
        account_number: accountNumber.trim(),
        account_name: resolvedAccountName
      });

      alert("Settlement payout bank configurations deployed successfully!");
    } catch (err) {
      alert("Failed saving settlement profile updates to the cluster.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-[#149FCD]" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing settlement parameters...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto text-left animate-in fade-in duration-200">
      <div className="bg-white border border-slate-100 rounded-sm p-6 shadow-sm">
        
        <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-6 select-none">
          <div className="w-10 h-10 bg-sky-50 text-[#149fcd] flex items-center justify-center rounded-sm">
            <Landmark size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800 uppercase tracking-wide">Payout Bank Account</h2>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Setup where your marketplace escrow disbursements are settled</p>
          </div>
        </div>

        <form onSubmit={handleSaveBankSettings} className="space-y-5">
          
          {/* Select Supported Banks Dropdown Option */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block select-none">Choose Financial Institution *</label>
            <select
              required
              value={selectedBankCode}
              onChange={e => {
                setSelectedBankCode(e.target.value);
                setAccountNumber("");
              }}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white"
            >
              <option value="">-- Select Bank --</option>
              {banksList.map((bank, index) => (
                <option key={index} value={bank.code}>{bank.name}</option>
              ))}
            </select>
          </div>

          {/* Account Number Field Block */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block select-none">Account Number (10 Digits) *</label>
            <input
              required
              type="text"
              maxLength={10}
              placeholder="e.g. 0123456789"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white tracking-widest"
            />
          </div>

          {/* Async Live Paystack Feedback Banner Layer */}
          {(verifying || resolvedAccountName) && (
            <div className={`p-4 rounded-sm flex items-center gap-3 border select-none transition-all ${
              isVerified 
                ? "bg-emerald-50/40 border-emerald-100 text-emerald-800" 
                : verifying 
                  ? "bg-slate-50 border-slate-100 text-slate-500" 
                  : "bg-amber-50/40 border-amber-100 text-amber-700"
            }`}>
              {verifying ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#149fcd] shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">Pinging Paystack registry...</span>
                </>
              ) : isVerified ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider">{resolvedAccountName}</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                  <span className="text-xs font-bold">{resolvedAccountName}</span>
                </>
              )}
            </div>
          )}

          {/* Submission CTA Activation Control Bar */}
          <button
            type="submit"
            disabled={!isVerified || saving}
            className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-md mt-6 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#149fcd]" /> Committing configurations...
              </>
            ) : (
              <>
                <Save size={14} /> Commit Settlement Account
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}