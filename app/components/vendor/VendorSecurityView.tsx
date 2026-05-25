'use client';
import {toast} from "sonner";
import React, { useState } from "react";
import { ArrowLeft, Lock, Loader2, ShieldAlert } from "lucide-react";
import { changePasswordAPI } from "../../lib/api/auth";

interface VendorSecurityViewProps {
  onBack: () => void;
}

export default function VendorSecurityView({ onBack }: VendorSecurityViewProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isTwoFactorActive, setIsTwoFactorActive] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || updating) return;

    try {
      setUpdating(true);

      // Execute live backend network task matching Swagger
      await changePasswordAPI({
        current_password: currentPassword,
        new_password: newPassword
      });

      toast.error("Authentication credentials updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Password modification failure:", err);
      // Type assertion mapping response safely avoiding rules errors
      const errorInstance = err as { response?: { data?: { message?: string } }; message?: string };
      const backendMessage = errorInstance.response?.data?.message || errorInstance.message || "Unknown validation exception";
      toast.error(`Security update rejected: ${backendMessage}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      
      {/* --- HEADER NAVIGATION BLOCK --- */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 select-none">
        <button 
          type="button" 
          onClick={onBack} 
          className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={16} className="stroke-[2.5]" />
        </button>
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Security</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Security & 2FA</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Passwords Input Form Column */}
        <form onSubmit={handlePasswordReset} className="md:col-span-7 bg-white border border-slate-200 p-6 rounded-sm shadow-2xs space-y-5">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight select-none">Modify Password</h3>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Current Password</label>
            <input 
              type="password" 
              required 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 font-semibold outline-none focus:border-[#149FCD]" 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">New Secure Password</label>
            <input 
              type="password" 
              required 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 font-semibold outline-none focus:border-[#149FCD]" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={updating} 
            className="bg-[#143D4A] hover:bg-slate-800 text-white px-6 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
          >
            {updating ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Synchronizing...
              </>
            ) : (
              <>
                <Lock size={14} /> Update Security Tokens
              </>
            )}
          </button>
        </form>

        {/* Two-Factor Toggle Right Column */}
        <div className="md:col-span-5 bg-white border border-slate-200 p-6 rounded-sm shadow-2xs flex flex-col justify-between min-h-[220px]">
          <div className="space-y-2 select-none">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Two-Factor Auth</h3>
            <p className="text-xs text-slate-400 leading-normal font-medium">Add an additional cryptographic validation shield layer over your store wallet logs.</p>
          </div>
          
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 select-none">
            <span className={`text-xs font-black uppercase tracking-wider ${isTwoFactorActive ? "text-[#31B757]" : "text-slate-400"}`}>
              {isTwoFactorActive ? "MFA Shield Active" : "MFA Disabled"}
            </span>
            <button 
              type="button" 
              onClick={() => setIsTwoFactorActive(!isTwoFactorActive)} 
              className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 flex items-center shrink-0 ${isTwoFactorActive ? "bg-[#149FCD]" : "bg-slate-200"}`} 
              style={{ minWidth: "40px", height: "22px" }}
            >
              <div 
                className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200" 
                style={{ transform: isTwoFactorActive ? "translateX(18px)" : "translateX(2px)" }} 
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}