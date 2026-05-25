'use client';
import {toast} from "sonner";
import React, { useState, useEffect } from "react";
import { ChevronDown, Eye, EyeOff, AlertTriangle, Trash2, User, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateProfileInfo, changeAccountPassword } from "../../lib/api/auth";
import axios from "axios"; // Added missing import to resolve linter errors instantly!

export default function AccountSettings() {
  const { user, refreshProfile } = useAuth(); // Import live logged-in identity hooks

  // --- PROFILE INFORMATION STATES ---
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // --- PASSWORD ALTERATION STATES ---
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Sync state values when contextual profile hooks hydrate cleanly
  useEffect(() => {
    const syncProfileFields = () => {
      if (user) {
        setName(user.name || "");
        setPhone(user.phone ? user.phone.replace("+234", "") : "");
      }
    };
    syncProfileFields();
  }, [user]);

  // --- DISPATCH PROFILE CHANGES EVENT ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProfileLoading(true);
      setProfileSuccess(false);

      const cleanedPhone = phone.startsWith("+234") ? phone : `+234${phone.replace(/\s+/g, "")}`;

      await updateProfileInfo({
        name,
        phone: cleanedPhone,
        ...(dob && { dob })
      });

      await refreshProfile(); // Push live sync notification right down to your global navbar layer
      setProfileSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to modify user configuration variables matrix.");
    } finally {
      setProfileLoading(false);
    }
  };

  // --- DISPATCH PASSWORD AMENDMENT EVENT ---
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError("Confirm validation mismatch. Password entries must correspond.");
      return;
    }

    try {
      setPasswordLoading(true);
      await changeAccountPassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
        confirm_password: passwordData.confirm_password
      });

      setPasswordSuccess(true);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err: unknown) {
      // Safely read properties by validating error structures first to pass strict typescript rules
      if (axios.isAxiosError(err)) {
        setPasswordError(err?.response?.data?.message || "Invalid credential verification stubs matching input profile.");
      } else {
        setPasswordError("An unexpected compilation error occurred.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
        Account Settings
      </h1>

      {/* --- 1. Profile Information Section --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
          <div className="w-10 h-10 bg-[#146e8a] rounded-full flex items-center justify-center text-white shadow-sm">
            <User size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">Profile Information</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Update your account profile information and email address.</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-3xl">
          {profileSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-sm flex items-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 size={16} /> Profile parameters committed successfully!
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#149fcd]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date of birth</label>
            <input 
              type="date" 
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#149fcd]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email (Read Only)</label>
            <input 
              type="email" 
              value={user?.email || ""}
              disabled
              className="w-full border border-slate-100 bg-slate-50 rounded-sm px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed select-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
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
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-slate-700 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={profileLoading}
            className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-300 text-white text-[11px] font-bold py-2.5 px-8 rounded-sm transition-all uppercase tracking-wide flex items-center gap-2"
          >
            {profileLoading ? <Loader2 size={12} className="animate-spin" /> : "Update Details"}
          </button>
        </form>
      </div>

      {/* --- 2. Change Password Section --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
          <div className="w-10 h-10 bg-[#FFF8E1] rounded-full flex items-center justify-center text-[#FFC107] shadow-sm">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">Change password</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6 max-w-3xl">
          {passwordSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-sm flex items-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 size={16} /> Security credentials updated successfully!
            </div>
          )}

          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm text-xs font-bold animate-in shake">
              ⚠️ {passwordError}
            </div>
          )}

          {[
            { label: 'Current password', key: 'current_password' },
            { label: 'New password', key: 'new_password' },
            { label: 'Confirm password', key: 'confirm_password' }
          ].map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{field.label} *</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={passwordData[field.key as keyof typeof passwordData]}
                  onChange={e => setPasswordData(prev => ({ ...prev, [field.key]: e.target.value }))}
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

          <button 
            type="submit" 
            disabled={passwordLoading}
            className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-300 text-white text-[11px] font-bold py-2.5 px-8 rounded-sm transition-all uppercase tracking-wide flex items-center gap-2"
          >
            {passwordLoading ? <Loader2 size={12} className="animate-spin" /> : "Change password"}
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

        <button className="bg-white border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold py-2.5 px-6 rounded-sm flex items-center gap-2 transition-all shadow-sm uppercase tracking-wide">
           <Trash2 size={14} /> Delete your account
        </button>
      </div>
    </div>
  );
}