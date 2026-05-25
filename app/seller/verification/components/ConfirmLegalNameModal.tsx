'use client';

import React, { useState } from "react";
import { User, Loader2 } from "lucide-react";

interface Props {
  initialName: string;
  onConfirm: (data: { first_name: string; middle_name: string; last_name: string }) => void;
  isPending: boolean;
}

export default function ConfirmLegalNameModal({ initialName, onConfirm, isPending }: Props) {
  // Split name by spaces
  const parts = initialName.split(' ');
  const [firstName, setFirstName] = useState(parts[0] || "");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState(parts.slice(1).join(' ') || "");

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-sm w-full max-w-sm shadow-xl space-y-4">
        <h3 className="font-black text-slate-800 uppercase text-sm">Confirm Legal Name</h3>
        <p className="text-[11px] text-slate-500">Ensure these names match your official NIN/BVN records exactly.</p>
        
        <input className="w-full border p-2 text-sm" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input className="w-full border p-2 text-sm" placeholder="Middle Name (Optional)" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        <input className="w-full border p-2 text-sm" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <button 
          disabled={isPending}
          onClick={() => onConfirm({ first_name: firstName, middle_name: middleName, last_name: lastName })}
          className="w-full bg-[#149fcd] text-white py-3 font-bold uppercase text-xs"
        >
          {isPending ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Continue to Verification"}
        </button>
      </div>
    </div>
  );
}