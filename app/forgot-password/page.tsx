'use client';

import { Mail, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
              {/* Background Image using fill and object-cover */}
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              {/* Darker overlay for text readability if needed */}
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl font-black tracking-tight text-[#0F172A]">Forgot Password</h1>
                <p className="text-sm text-slate-500 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Login</span>
                </p>
              </div>
            </div>

      <main className="flex-grow flex items-start justify-center p-4 pt-16 md:pt-24 pb-20">
        {/* Wider, cleaner card to match screenshot */}
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-20 flex flex-col items-center">
          
          {/* Header Content */}
          <div className="text-center mb-10 max-w-lg">
             <div className="flex justify-center mb-6">
                <div className="text-sky-500 bg-sky-50 p-2 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
             </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">Forgot Password</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {"Lost your password? Please enter your username or email address. You will receive a link to create a new password via email."}
            </p>
          </div>

          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="w-full">
              <label className="text-xs font-bold text-slate-700 mb-2 block ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white border border-gray-200 rounded-lg py-4 pl-12 pr-4 outline-none focus:border-sky-500 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#010F1C] text-white py-4.5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-md">
              Send Password Reset Link
            </button>

            {/* Back to Login Link */}
            <div className="text-center pt-2">
              <Link 
                href="/login" 
                className="text-sky-500 font-bold text-xs hover:underline tracking-tight transition-all"
              >
                Back to login page
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}