'use client';

import { ChevronDown, Eye, EyeOff, AlertTriangle, Trash2, User, Lock } from "lucide-react";
import { useState } from "react";

export default function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
        Account Settings
      </h1>

      {/* --- 1. Profile Information Section --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
          <div className="w-10 h-10 bg-[#146e8a] rounded-full flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">Profile Information</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Update your account profile information and email address.</p>
          </div>
        </div>

        <form className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Full name</label>
            <input 
              type="text" 
              defaultValue="Neel Ade"
              className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#149fcd]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Date of birth</label>
            <input 
              type="date" 
              className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#149fcd]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
            <input 
              type="email" 
              defaultValue="neelorneels@gmail.com"
              disabled
              className="w-full border border-slate-100 bg-slate-50 rounded-sm px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Phone</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd]">
              <div className="flex items-center gap-2 px-3 border-r border-slate-100 bg-slate-50/50">
                <div className="w-5 h-3.5 bg-[#008751] flex items-center justify-center">
                   <div className="w-1.5 h-full bg-white" />
                </div>
                <span className="text-xs font-bold text-slate-600">+234</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                defaultValue="906 069 0604"
                className="flex-1 px-4 py-2.5 text-sm text-slate-700 outline-none"
              />
            </div>
          </div>

          <button type="submit" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-bold py-2.5 px-8 rounded-sm transition-all uppercase">
            Update
          </button>
        </form>
      </div>

      {/* --- 2. Change Password Section --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
          <div className="w-10 h-10 bg-[#FFF8E1] rounded-full flex items-center justify-center text-[#FFC107]">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">Change password</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>

        <form className="space-y-6 max-w-3xl">
          {['Current password', 'New password', 'Confirm password'].map((label) => (
            <div key={label} className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">{label} *</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={label}
                  className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#149fcd] pr-10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}

          <button type="submit" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-bold py-2.5 px-8 rounded-sm transition-all uppercase">
            Change password
          </button>
        </form>
      </div>

      {/* --- 3. Delete Account Section --- */}
      <div className="bg-[#FEF2F2] border border-red-100 rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm">
            <Trash2 size={20} />
          </div>
          <h2 className="text-base font-bold text-red-800">Delete Account</h2>
        </div>
        
        <p className="text-[12px] text-red-600/70 mb-8 leading-relaxed">
          Permanently delete your account and all associated data.
        </p>

        <div className="bg-[#FFFBEB] border border-amber-100 p-4 rounded-sm flex gap-4 mb-8">
          <AlertTriangle className="text-amber-500 shrink-0" size={20} />
          <div className="space-y-1">
             <h4 className="text-[13px] font-bold text-amber-900">Warning</h4>
             <p className="text-[11px] text-amber-700 leading-relaxed">
               This action will permanently delete your account and all associated data and is irreversible. Please be sure before proceeding.
             </p>
          </div>
        </div>

        <button className="bg-white border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold py-2.5 px-6 rounded-sm flex items-center gap-2 transition-all shadow-sm">
           <Trash2 size={14} /> Delete your account
        </button>
      </div>
    </div>
  );
}