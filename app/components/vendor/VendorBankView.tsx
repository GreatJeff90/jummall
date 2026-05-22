'use client';

import React, { useState } from "react";
import { ArrowLeft, CreditCard, Save, Loader2 } from "lucide-react";

export default function VendorBankView({ onBack }: { onBack: () => void }) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Payout routing bank information updated securely.");
    }, 800);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button type="button" onClick={onBack} className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Finance</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Bank account</h1>
        </div>
      </div>

      <form onSubmit={handleSaveBank} className="space-y-5 max-w-2xl bg-white border border-slate-200 p-6 rounded-sm shadow-2xs">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Settlement Bank Name</label>
          <input type="text" required placeholder="e.g. GTBank, Access Bank" value={bankName} onChange={e => setBankName(e.target.value)} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#149FCD]" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">10-Digit NUBAN Account Number</label>
          <input type="text" maxLength={10} required placeholder="0123456789" value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ""))} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm font-mono font-bold tracking-wider text-slate-700 outline-none focus:border-[#149FCD]" />
        </div>

        <button type="submit" disabled={saving} className="bg-[#143D4A] hover:bg-slate-800 text-white px-6 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Link Settlement Account
        </button>
      </form>
    </div>
  );
}