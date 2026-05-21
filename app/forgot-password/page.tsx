'use client';

import React, { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { forgotPasswordRequest, resetPasswordConfirm } from "../lib/api/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // --- Wizard Step Flow Tracking ---
  // Step 1 = Request code, Step 2 = Enter code & new password
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);

  // --- Core State Variables ---
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Interface Response & Utility Hooks ---
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // --- STEP 1: INITIAL CODE DISPATCH REQUEST ---
const handleRequestCode = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage(null);
  setSuccessMessage(null);
  setLoading(true);

  try {
    // 1. Await the server response completely first!
    await forgotPasswordRequest(email);
    
    // 2. Only show success and switch views once the server confirms 200 OK
    setSuccessMessage(`A password reset pin has been dispatched to ${email}.`);
    setWizardStep(2); 
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.detail) {
      const detail = err.response.data.detail;
      setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
    } else {
      setErrorMessage("Failed to send code. Please verify email is correct.");
    }
  } finally {
    setLoading(false);
  }
};

  // --- STEP 2: VERIFY PIN CODE & UPDATE PASSWORD ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Maps configuration properties perfectly to your Swagger schema contract layout
      await resetPasswordConfirm({
        email,
        code: resetCode,
        new_password: newPassword
      });

      setSuccessMessage("Password modified successfully! Re-routing you to login page...");
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
      } else {
        setErrorMessage("Invalid verification code or link expired.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      
      {/* --- BREADCRUMB HEADER --- */}
      <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Login Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
          <h1 className="text-5xl tracking-tight text-[#0F172A]">Forgot Password</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Forgot Password</span>
          </p>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 pt-16 md:pt-24 pb-20 relative z-20">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-16 flex flex-col items-center -mt-16 md:-mt-24">
          
          {/* Status Alert Notification Blocks */}
          {errorMessage && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 text-[#EF4444] rounded-xl text-xs font-bold flex items-center gap-2 alert-box text-left">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="w-full mb-6 p-4 bg-green-50 border border-green-200 text-[#31B757] rounded-xl text-xs font-bold flex items-center gap-2 text-left">
              <span>✅ {successMessage}</span>
            </div>
          )}

          {/* --- VIEW STATE 1: EMAIL ADDRESS INPUT REQUEST --- */}
          {wizardStep === 1 && (
            <>
              <div className="text-center mb-8 max-w-lg">
                <div className="flex justify-center mb-4">
                  <div className="text-sky-500 bg-sky-50 p-2 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                </div>
                <h2 className="text-3xl text-slate-800 tracking-tight mb-3">Forgot Password</h2>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Lost your password? Please provide your registered account email address below. You will receive a 6-digit validation security pin instantly.
                </p>
              </div>

              <form className="w-full space-y-6" onSubmit={handleRequestCode}>
                <div className="w-full text-left">
                  <label className="text-xs text-slate-700 mb-2 block ml-1 font-semibold">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#010F1C] hover:bg-sky-600 text-white py-4.5 rounded-xl text-sm uppercase tracking-widest transition-all font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Sending Pin..." : "Send Verification Pin"} <ArrowRight size={16} />
                </button>
              </form>
            </>
          )}

          {/* --- VIEW STATE 2: INPUT VALIDATION PIN & NEW PASSWORD --- */}
          {wizardStep === 2 && (
            <>
              <div className="text-center mb-8 max-w-lg">
                <div className="flex justify-center mb-4">
                  <div className="text-sky-500 bg-sky-50 p-2 rounded-lg">
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <h2 className="text-3xl text-slate-800 tracking-tight mb-3">Reset Password</h2>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Provide the security authorization code received in your inbox alongside your new chosen security credentials.
                </p>
              </div>

              <form className="w-full space-y-5" onSubmit={handleResetPassword}>
                {/* Reset Code Input Field */}
                <div className="w-full text-left">
                  <label className="text-xs text-slate-700 mb-1.5 block ml-1 font-semibold">Verification Code *</label>
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter 6-digit code" 
                      value={resetCode} // Bound cleanly explicitly to resetCode state value variable string
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 text-sm font-black tracking-widest text-center text-slate-800"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="w-full text-left">
                  <label className="text-xs text-slate-700 mb-1.5 block ml-1 font-semibold">New Password *</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="Create a strong password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 text-sm font-semibold"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="w-full text-left">
                  <label className="text-xs text-slate-700 mb-1.5 block ml-1 font-semibold">Confirm New Password *</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="Confirm password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 text-sm font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F172A] hover:bg-sky-600 text-white py-4 rounded-xl text-sm uppercase tracking-widest transition-all font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Modifying Credentials..." : "Confirm New Password"}
                </button>
              </form>
            </>
          )}

          {/* Back to Login Anchor link footer */}
          <div className="text-center pt-5">
            <Link 
              href="/login" 
              className="text-sky-500 text-xs hover:underline tracking-tight transition-all font-bold uppercase"
            >
              Back to login page
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}