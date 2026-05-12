'use client';

import { Lock, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
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
          <h1 className="text-5xl font-black tracking-tight text-[#0F172A]">Login</h1>
          <p className="text-sm text-slate-500 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Login</span>
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

          {/* RIGHT SIDE: LOGIN FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-16 border-l border-gray-50 flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-sky-50 p-2 rounded-lg text-sky-500 mt-1">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Login to your account</h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {"Your personal data will be used to support your experience throughout this website, to manage access to your account."}
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 block ml-1">
                  Email or phone
                </label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Email or Phone number" 
                    className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 block ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                  <span className="text-slate-500 group-hover:text-slate-800 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sky-600 font-bold hover:underline">Forgot password?</a>
              </div>

              <button className="w-full bg-[#0F172A] text-white py-4.5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                Login <ArrowRight size={18} />
              </button>

              <div className="text-center pt-4">
                <span className="text-xs text-slate-400 font-medium">{"Don't have an account? "}</span>
                <a href="#" className="text-sky-600 font-black text-xs hover:underline uppercase tracking-tighter">Register now</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function UserIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}