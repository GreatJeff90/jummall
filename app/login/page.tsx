'use client';

import Link from "next/link";
import React, { useState, Suspense } from "react";
import { Lock, Eye, EyeOff, ArrowRight, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { loginSchema, LoginInput } from "@/app/lib/validations";
import { loginAccount } from "../lib/api/auth";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- 1. React Hook Form Initialization ---
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  // --- Operational State Feedbacks ---
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- REAL FUNCTIONAL SUBMISSION HANDLER ---
  const onValidSubmit = async (data: LoginInput) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      // Pass the validated data parameters down matching endpoint contracts
      const responseData = await loginAccount({ 
        email: data.email.trim(),
        password: data.password 
      });
      
      // Extract tokens from nested structures if available
      const token = responseData?.access_token || responseData?.tokens?.access_token;
      
      if (token) {
  (() => {
    document.cookie = `access_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure' : ''}`;
  })();
}

      // Check URL parameters for previous route intercept tags
      const nextTargetRoute = searchParams.get("next");

      if (nextTargetRoute) {
        router.push(decodeURIComponent(nextTargetRoute));
      } else if (responseData?.user?.role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/customer/overview");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
      } else {
        setErrorMessage("Invalid credentials or account does not exist.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 -mt-10 md:-mt-14 animate-in fade-in duration-200">
      
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

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-[#EF4444] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm select-none animate-pulse">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        <div className="flex items-start gap-4 mb-8 select-none">
          <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1 shrink-0">
            <Lock size={20} />
          </div>
          <div className="text-left">
            <h2 className="text-2xl text-slate-800 tracking-tight font-black font-montserrat uppercase">Login to your account</h2>
            <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
              Your personal data will be used to support your experience throughout this website, to manage access to your account.
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onValidSubmit)}>
          <div className="text-left space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1 select-none">
              Email address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
              <input 
                type="text" 
                disabled={loading}
                placeholder="Enter email address" 
                {...register("email")}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm font-semibold text-slate-700"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10.5px] font-bold mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div className="text-left space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1 select-none">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                disabled={loading}
                placeholder="Password" 
                {...register("password")}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm text-slate-700 font-semibold tracking-wide"
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

          <div className="flex items-center justify-between text-xs font-bold select-none">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" disabled={loading} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
              <span className="text-slate-500 group-hover:text-slate-800 transition-colors">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sky-600 hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-[#0F172A] hover:bg-sky-600 text-white py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none font-black focus:outline-none select-none"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin text-sky-500" /> Authenticating...
              </>
            ) : (
              <>Login <ArrowRight size={18} className="stroke-[2.5]" /></>
            )}
          </button>

          <div className="text-center pt-4 select-none">
            <span className="text-xs text-slate-400 font-medium">Don&apos;t have an account? </span>
            <Link href="/register" className="text-sky-600 text-xs hover:underline uppercase tracking-tighter font-bold">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// ================= GLOBAL EXPORT LAYER =================
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-44 md:h-32 md:mb-12 w-full flex items-center overflow-hidden border-b border-slate-100 select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Login Header Background" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 text-left">
          <h1 className="text-3xl font-black text-[#0F172A] font-montserrat uppercase tracking-tight">Login</h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Link href="/" className="hover:text-sky-600">Home</Link> <span className="text-slate-300">/</span> <span className="text-sky-600">Login</span>
          </p>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 md:pt-16 pb-20 relative z-20">
        <Suspense fallback={
          <div className="max-w-md w-full bg-white border border-slate-100 rounded-xl p-12 text-center text-slate-400 text-xs font-bold flex flex-col items-center justify-center gap-2 shadow-xs min-h-[300px] select-none">
            <Loader2 className="animate-spin text-sky-500" size={24} />
            <span>Assembling workspace authorization routes...</span>
          </div>
        }>
          <LoginFormContent />
        </Suspense>
      </main>
    </div>
  );
}