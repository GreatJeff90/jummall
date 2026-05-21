'use client';

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, User, Mail, UserPlus, Phone, ShieldCheck, KeyRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { registerAccount, verifyEmailOtp, requestPhoneOtp, verifyPhoneOtp } from "../lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();

  // --- Registration Core Input State Management ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- Multi-Step OTP Verification Visual Overlays ---
  const [verificationStep, setVerificationStep] = useState<1 | 2 | 3>(1);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // --- Component Diagnostics Feedback Helpers ---
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Define independent visibility toggle states for both fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- STEP 1: INITIAL REGISTRATION SUBMISSION ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      // PASS ALL ESSENTIALS: Including the user's secret password string parameter
      await registerAccount({ 
        name, 
        email, 
        phone, 
        role,
        password 
      });
      setVerificationStep(2); 
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
      } else {
        setErrorMessage("Registration failed. Please check inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: EMAIL VERIFICATION CHECKPOINT ---
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      // Fulfill precise parameter structures shown in Swagger UI document model
      await verifyEmailOtp({ 
        email, 
        code: emailOtp, // Binds form code state
        purpose: "signup" // Satisfies backend validation enum requirement
      });
      
      // Request SMS code by routing both phone and email down to the payload object context
      await requestPhoneOtp({ phone, email }); 
      setVerificationStep(3); 
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
      } else {
        setErrorMessage("Invalid Email Verification Code.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: FINAL PHONE VERIFICATION CHECKPOINT ---
  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      await verifyPhoneOtp({ phone, otp: phoneOtp });
      
      if (role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/customer/overview");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
      } else {
        setErrorMessage("Invalid Phone Verification Code.");
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
          alt="Register Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
          <h1 className="text-5xl tracking-tight text-[#0F172A]">Register</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Register</span>
          </p>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 md:pt-16 pb-20 relative z-20">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 -mt-10 md:-mt-14">
          
          {/* LEFT SIDE: ILLUSTRATION */}
          <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-12">
             <div className="relative w-full h-[400px]">
                <Image 
                  src="/auth-banner-new.png" 
                  alt="Auth Illustration" 
                  fill 
                  className="object-contain"
                  priority
                />
             </div>
          </div>

          {/* RIGHT SIDE: INTERACTIVE SIGNUP FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-16 border-l border-gray-50 flex flex-col justify-center">
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-[#EF4444] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {/* --- STATE 1: REGISTRATION INPUTS --- */}
            {verificationStep === 1 && (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1">
                    <UserPlus size={20} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl text-slate-800 tracking-tight">Register an account</h2>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Your personal data will be used to support your experience throughout this website, to manage access to your account.
                    </p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleRegister}>
                  {/* Full Name */}
                  <div className="text-left">
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Full name <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Your full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold" 
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="text-left">
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="Your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold" 
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="text-left">
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Phone <span className="text-red-500">*</span></label>
                    <div className="relative group flex">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-400 border-r pr-2 h-5 border-gray-200 group-focus-within:text-sky-600 transition-colors">
                        <Phone size={14} className="text-gray-400" />
                        <span>+234</span>
                      </div>
                      <input 
                        type="tel" 
                        required
                        placeholder="Phone number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-24 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-black tracking-wide" 
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="text-left">
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Password <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password Confirmation */}
                  <div className="text-left">
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Password confirmation <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required
                        placeholder="Password confirmation" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Register as Radio Toggle */}
                  <div className="py-2 ml-1 text-left">
                    <p className="text-[10px] uppercase text-slate-400 tracking-widest mb-3">Register as:</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="role" 
                          checked={role === "buyer"} 
                          onChange={() => setRole("buyer")}
                          className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300" 
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">I am a customer</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="role" 
                          checked={role === "seller"} 
                          onChange={() => setRole("seller")}
                          className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300" 
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">I am a vendor</span>
                      </label>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer group ml-1 text-left">
                    <input 
                      type="checkbox" 
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                    />
                    <span className="text-[11px] text-slate-500 font-medium">
                      I agree to the <Link href="#" className="text-sky-600 hover:underline">Terms and Privacy Policy</Link>
                    </span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0F172A] text-white py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Register"} <ArrowRight size={18} />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-400 font-medium">Already have an account? </span>
                    <Link href="/login" className="text-sky-600 text-xs hover:underline uppercase tracking-tighter font-bold">Login</Link>
                  </div>
                </form>
              </>
            )}

            {/* --- STATE 2: EMAIL VERIFICATION --- */}
            {verificationStep === 2 && (
              <div className="animate-in fade-in zoom-in-95 duration-200 text-left">
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1"><ShieldCheck size={20} /></div>
                  <div>
                    <h2 className="text-2xl text-slate-800 tracking-tight">Verify Email Address</h2>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      We have broadcast an access security pin to <span className="font-bold text-slate-800">{email}</span>. Provide it below to proceed.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyEmail} className="space-y-5">
                  <div>
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">Email Verification Code *</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Enter email OTP code" 
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-50 text-sm font-black tracking-widest text-center" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-sky-600 text-white py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-sky-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? "Verifying Email..." : "Confirm Email Verification"}
                  </button>
                </form>
              </div>
            )}

            {/* --- STATE 3: PHONE VERIFICATION --- */}
            {verificationStep === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-200 text-left">
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1"><Phone size={20} /></div>
                  <div>
                    <h2 className="text-2xl text-slate-800 tracking-tight">Verify Phone Number</h2>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Provide the registration SMS OTP pin code delivered to your handset <span className="font-bold text-slate-800">+234 {phone}</span> to activate your tokens.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyPhone} className="space-y-5">
                  <div>
                    <label className="text-xs text-slate-700 mb-1.5 block ml-1">SMS Verification Code *</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Enter phone OTP code" 
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-50 text-sm font-black tracking-widest text-center" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0F172A] text-white py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-slate-800 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? "Verifying Phone..." : "Complete Registration"}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}