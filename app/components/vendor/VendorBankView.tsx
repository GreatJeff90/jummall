'use client';

import React, { useState } from "react";
import { Loader2, Landmark, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPayoutBanksAPI, resolveBankAccountAPI, fetchSavedBankAPI, saveBankAccountAPI, BankItemAPI } from "@/app/lib/api/auth";

export default function VendorBankView() {
  const queryClient = useQueryClient();

  // --- LOCAL FORM STATES ---
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // 1. Fetch live available financial institutions framework query
  const { data: banksList = [], isLoading: loadingBanks } = useQuery<BankItemAPI[]>({
    queryKey: ["payoutBanksList"],
    queryFn: fetchPayoutBanksAPI,
    staleTime: 1000 * 60 * 60, // Bank lists remain fresh for 1 hour
  });

  // 2. Fetch the active user's current profile bank configurations
  const { isLoading: loadingProfile } = useQuery({
    queryKey: ["savedBankProfile"],
    queryFn: async () => {
      const data = await fetchSavedBankAPI();
      if (data) {
        setSelectedBankCode(data.bank_code);
        setAccountNumber(data.account_number);
      }
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  // 3. Real-time background query replacing the old input-watching validation loop
  const isLookupReady = accountNumber.trim().length === 10 && !!selectedBankCode;
  
  const { data: verificationData, isFetching: verifying, isError: lookupFailed } = useQuery({
    queryKey: ["resolveBankAccount", selectedBankCode, accountNumber],
    queryFn: () => resolveBankAccountAPI({
      account_number: accountNumber.trim(),
      bank_code: selectedBankCode
    }),
    enabled: isLookupReady,
    staleTime: 1000 * 60 * 5,
    retry: false, // Don't spam retries on wrong bank/account number inputs
  });

  const resolvedAccountName = verificationData?.account_name || "";
  const isVerified = isLookupReady && !verifying && !lookupFailed && !!resolvedAccountName;

  // 4. Save settlement form variables securely inside a TanStack mutation block
  const saveBankMutation = useMutation({
    mutationFn: async () => {
      const chosenBank = banksList.find(b => b.code === selectedBankCode);
      return await saveBankAccountAPI({
        bank_name: chosenBank ? chosenBank.name : "Unknown Bank",
        bank_code: selectedBankCode,
        account_number: accountNumber.trim(),
        account_name: resolvedAccountName
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedBankProfile"] });
      alert("Settlement payout bank configurations deployed successfully!");
    },
    onError: () => {
      alert("Failed saving settlement profile updates to the cluster.");
    }
  });

  const handleSaveBankSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified || saveBankMutation.isPending) return;
    saveBankMutation.mutate();
  };

  const loading = loadingBanks || loadingProfile;

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
          {(verifying || resolvedAccountName || lookupFailed) && (
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
                  <span className="text-xs font-bold">
                    {lookupFailed 
                      ? "Could not resolve account details. Please check account information." 
                      : resolvedAccountName
                    }
                  </span>
                </>
              )}
            </div>
          )}

          {/* Submission CTA Activation Control Bar */}
          <button
            type="submit"
            disabled={!isVerified || saveBankMutation.isPending}
            className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-md mt-6 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none focus:outline-none"
          >
            {saveBankMutation.isPending ? (
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