'use client';

import { Lock, Eye, ArrowRight, User, Mail, Phone, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
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
          <h1 className="text-5xl   tracking-tight text-[#0F172A]">Register</h1>
          <p className="text-sm text-slate-500 mt-2   uppercase tracking-widest flex items-center gap-2">
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

          {/* RIGHT SIDE: REGISTER FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-16 border-l border-gray-50 flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1">
                <UserPlus size={20} />
              </div>
              <div>
                <h2 className="text-2xl   text-slate-800 tracking-tight">Register an account</h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {"Your personal data will be used to support your experience throughout this website, to manage access to your account."}
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label className="text-xs   text-slate-700 mb-1.5 block ml-1">Full name <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input type="text" placeholder="Your full name" className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs   text-slate-700 mb-1.5 block ml-1">Email <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input type="email" placeholder="Your email" className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs   text-slate-700 mb-1.5 block ml-1">Phone <span className="text-red-500">*</span></label>
                <div className="relative group flex">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs   text-slate-400 border-r pr-2 h-5 border-gray-200">
                    <span className="w-4 h-3 bg-green-600 rounded-sm"></span> +234
                  </div>
                  <input type="tel" placeholder="Phone number" className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-24 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs   text-slate-700 mb-1.5 block ml-1">Password <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input type="password" placeholder="Password" className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600"><Eye size={18} /></button>
                </div>
              </div>

              {/* Password Confirmation */}
              <div>
                <label className="text-xs   text-slate-700 mb-1.5 block ml-1">Password confirmation <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input type="password" placeholder="Password confirmation" className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm" />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600"><Eye size={18} /></button>
                </div>
              </div>

              {/* Register as Radio Toggle */}
              <div className="py-2 ml-1">
                <p className="text-[10px]   uppercase text-slate-400 tracking-widest mb-3">Register as:</p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="role" defaultChecked className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300" />
                    <span className="text-xs   text-slate-600 group-hover:text-slate-900 transition-colors">I am a customer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="role" className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300" />
                    <span className="text-xs   text-slate-600 group-hover:text-slate-900 transition-colors">I am a vendor</span>
                  </label>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer group ml-1">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                <span className="text-[11px] text-slate-500 font-medium">
                  I agree to the <Link href="#" className="text-sky-600   hover:underline">Terms and Privacy Policy</Link>
                </span>
              </label>

              <button className="w-full bg-[#0F172A] text-white py-4 rounded-xl   text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                Register <ArrowRight size={18} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400 font-medium">{"Already have an account? "}</span>
                <Link href="/login" className="text-sky-600   text-xs hover:underline uppercase tracking-tighter">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}