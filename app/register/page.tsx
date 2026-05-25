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
import GoogleLoginButton from "../components/auth/GoogleLoginButton"; // Added import

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

  // ... (handleVerifyEmail and handleVerifyPhone remain unchanged)
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
      await verifyEmailOtp({ email, code: emailOtp.trim(), purpose: "signup" });
      await requestPhoneOtp({ phone, email }); 
      setVerificationStep(3); 
    } catch (err: unknown) {
      setErrorMessage("Invalid Email Verification Code.");
    } finally {
      setLoading(false);
    }
  };

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
      if (role === "seller") router.push("/seller/dashboard");
      else router.push("/customer/overview");
    } catch (err: unknown) {
      setErrorMessage("Invalid Phone Verification Code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden select-none">
        <Image src="/breadcrumb-1.jpg" alt="Header" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 text-left">
          <h1 className="text-5xl tracking-tight text-[#0F172A] font-montserrat uppercase font-black">Register</h1>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 md:pt-16 pb-20 relative z-20">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 -mt-10 md:-mt-14">
          <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-12 border-r border-gray-50">
             <div className="relative w-full h-[400px]">
                <Image src="/auth-banner-new.png" alt="Illustration" fill className="object-contain" priority />
             </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-[#EF4444] rounded-xl text-xs font-bold shadow-sm">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {verificationStep === 1 && (
              <>
                <form className="space-y-5" onSubmit={handleSubmit(handleRegisterValid)}>
                  {/* ... (Your existing input fields remain here) */}
                  <div className="text-left space-y-1"><label className="text-xs font-bold">Full name *</label><input {...register("name")} className="w-full border rounded-xl py-3.5 px-4 text-sm" /></div>
                  <div className="text-left space-y-1"><label className="text-xs font-bold">Email *</label><input {...register("email")} className="w-full border rounded-xl py-3.5 px-4 text-sm" /></div>
                  <div className="text-left space-y-1"><label className="text-xs font-bold">Phone *</label><input {...register("phone")} className="w-full border rounded-xl py-3.5 px-4 text-sm" /></div>
                  <div className="text-left space-y-1"><label className="text-xs font-bold">Password *</label><input type="password" {...register("password")} className="w-full border rounded-xl py-3.5 px-4 text-sm" /></div>
                  <div className="text-left space-y-1"><label className="text-xs font-bold">Confirm Password *</label><input type="password" {...register("confirmPassword")} className="w-full border rounded-xl py-3.5 px-4 text-sm" /></div>

                  <button type="submit" className="w-full h-14 bg-[#0F172A] text-white rounded-xl text-xs font-black uppercase">
                    {loading ? <Loader2 className="animate-spin" /> : "Register Account"}
                  </button>

                  {/* Google Integration Section */}
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-xs text-gray-400 font-bold uppercase">Or continue with</span>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>
                  <GoogleLoginButton />
                </form>
              </>
            )}
            {/* Steps 2 and 3 remain unchanged */}
          </div>
        </div>
      </main>
    </div>
  );
}