'use client';

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, User, Mail, UserPlus, Phone, ShieldCheck, KeyRound, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { registerSchema, RegisterInput } from "@/app/lib/validations";
import { registerAccount, verifyEmailOtp, requestPhoneOtp, verifyPhoneOtp } from "../lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();

  // --- 1. React Hook Form Initialization ---
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- Multi-Step OTP Verification Visual Overlays ---
  const [verificationStep, setVerificationStep] = useState<1 | 2 | 3>(1);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // --- Component Diagnostics Feedback Helpers ---
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Visibility toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- STEP 1: INITIAL REGISTRATION SUBMISSION ---
  const handleRegisterValid = async (data: RegisterInput) => {
    setErrorMessage(null);

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await registerAccount({ 
        name: data.name.trim(), 
        email: data.email.trim(), 
        phone: data.phone.trim(), 
        role,
        password: data.password 
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
    
    const email = getValues("email");
    const phone = getValues("phone");

    if (!emailOtp.trim()) {
      setErrorMessage("Please supply your custom email verification code.");
      return;
    }

    setLoading(true);
    try {
      await verifyEmailOtp({ 
        email, 
        code: emailOtp.trim(), 
        purpose: "signup" 
      });
      
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

    const phone = getValues("phone");
    if (!phoneOtp.trim()) {
      setErrorMessage("Please supply your dynamic SMS OTP code.");
      return;
    }

    setLoading(true);
    try {
      await verifyPhoneOtp({ phone, otp: phoneOtp.trim() });
      
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
      <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Register Header Background" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 text-left">
          <h1 className="text-5xl tracking-tight text-[#0F172A] font-montserrat uppercase font-black">Register</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2 font-bold">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Register</span>
          </p>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 md:pt-16 pb-20 relative z-20">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 -mt-10 md:-mt-14">
          
          {/* LEFT SIDE: ILLUSTRATION */}
          <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-12 select-none border-r border-gray-50">
             <div className="relative w-full h-[400px]">
                <Image 
                  src="/auth-banner-new.png" 
                  alt="Auth Illustration" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
             </div>
          </div>

          {/* RIGHT SIDE: INTERACTIVE SIGNUP FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-[#EF4444] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse select-none">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {/* --- STATE 1: REGISTRATION INPUTS --- */}
            {verificationStep === 1 && (
              <>
                <div className="flex items-start gap-4 mb-8 select-none">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1 shrink-0">
                    <UserPlus size={20} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl text-slate-800 tracking-tight font-black uppercase font-montserrat">Register an account</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
                      Your personal data will be used to support your experience throughout this website, to manage access to your account.
                    </p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(handleRegisterValid)}>
                  {/* Full Name */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Full name <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type="text" 
                        disabled={loading}
                        placeholder="Your full name" 
                        {...register("name")}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold text-slate-700" 
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Email <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type="text" 
                        disabled={loading}
                        placeholder="Your email" 
                        {...register("email")}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold text-slate-700" 
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Phone *</label>
                    <div className="relative group flex">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-400 border-r pr-2 h-5 border-gray-200 group-focus-within:text-sky-600 transition-colors select-none">
                        <Phone size={14} className="text-gray-400" />
                        <span className="font-bold">+234</span>
                      </div>
                      <input 
                        type="tel" 
                        disabled={loading}
                        placeholder="Phone number" 
                        {...register("phone")}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-24 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-bold text-slate-700 tracking-wide" 
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.phone.message}</p>}
                  </div>

                  {/* Password */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Password <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        disabled={loading}
                        placeholder="Password" 
                        {...register("password")}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm text-slate-700" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.password.message}</p>}
                  </div>

                  {/* Password Confirmation */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Password confirmation <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        disabled={loading}
                        placeholder="Password confirmation" 
                        {...register("confirmPassword")}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm text-slate-700" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.confirmPassword.message}</p>}
                  </div>

                  {/* Register as Radio Toggle */}
                  <div className="py-2 ml-1 text-left select-none">
                    <p className="text-[10px] uppercase text-slate-400 tracking-widest mb-3 font-black">Register as:</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="role" 
                          disabled={loading}
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
                          disabled={loading}
                          checked={role === "seller"} 
                          onChange={() => setRole("seller")}
                          className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300" 
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">I am a vendor</span>
                      </label>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer group ml-1 text-left select-none">
                    <input 
                      type="checkbox" 
                      disabled={loading}
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                    />
                    <span className="text-[11px] text-slate-500 font-bold transition-colors group-hover:text-slate-700">
                      I agree to the <Link href="#" className="text-sky-600 hover:underline font-extrabold">Terms and Privacy Policy</Link>
                    </span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-[#0F172A] hover:bg-sky-600 text-white py-4 rounded-xl text-xs uppercase font-black tracking-widest transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none focus:outline-none select-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-sky-500" /> Dispatching profiles...
                      </>
                    ) : (
                      <>Register Account <ArrowRight size={16} className="stroke-[2.5]" /></>
                    )}
                  </button>

                  <div className="text-center pt-2 select-none">
                    <span className="text-xs text-slate-400 font-medium">Already have an account? </span>
                    <Link href="/login" className="text-sky-600 text-xs hover:underline uppercase tracking-tighter font-black">Login</Link>
                  </div>
                </form>
              </>
            )}

            {/* --- STATE 2: EMAIL VERIFICATION --- */}
            {verificationStep === 2 && (
              <div className="animate-in fade-in zoom-in-95 duration-200 text-left">
                <div className="flex items-start gap-4 mb-8 select-none">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1 shrink-0"><ShieldCheck size={20} /></div>
                  <div>
                    <h2 className="text-2xl text-slate-800 tracking-tight font-black uppercase font-montserrat">Verify Email Address</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
                      We have broadcast an access security pin to <span className="font-bold text-slate-800 select-all">{getValues("email")}</span>. Provide it below to proceed.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyEmail} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">Email Verification Code *</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        disabled={loading}
                        placeholder="Enter email OTP code" 
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-50 text-sm font-black tracking-widest text-center text-slate-700" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading || !emailOtp.trim()}
                    className="w-full h-14 bg-sky-600 text-white py-4 rounded-xl text-xs uppercase font-black tracking-widest hover:bg-sky-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center justify-center gap-2 focus:outline-none select-none"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin text-white" /> : "Confirm Email Verification"}
                  </button>
                </form>
              </div>
            )}

            {/* --- STATE 3: PHONE VERIFICATION --- */}
            {verificationStep === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-200 text-left">
                <div className="flex items-start gap-4 mb-8 select-none">
                  <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1 shrink-0"><Phone size={20} /></div>
                  <div>
                    <h2 className="text-2xl text-slate-800 tracking-tight font-black uppercase font-montserrat">Verify Phone Number</h2>
                    <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
                      Provide the registration SMS OTP pin code delivered to your handset <span className="font-bold text-slate-800 select-all">+234 {getValues("phone")}</span> to activate your tokens.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyPhone} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 select-none">SMS Verification Code *</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        disabled={loading}
                        placeholder="Enter phone OTP code" 
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-50 text-sm font-black tracking-widest text-center text-slate-700" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading || !phoneOtp.trim()}
                    className="w-full h-14 bg-[#0F172A] text-white py-4 rounded-xl text-xs uppercase font-black tracking-widest hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center justify-center gap-2 focus:outline-none select-none"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin text-sky-500" /> : "Complete Registration"}
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