'use client';

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function BecomeVendor() {
  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
        Become Vendor
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 md:p-10 shadow-sm">
        <form className="space-y-6 max-w-4xl">
          
          {/* Shop Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop Name *</label>
            <input 
              type="text" 
              placeholder="Ex: My Shop"
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300"
            />
          </div>

          {/* Shop URL */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop URL *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd]">
              <div className="bg-slate-50 px-4 py-3 border-r border-slate-100 text-slate-400 text-sm whitespace-nowrap">
                https://jummall.com/stores
              </div>
              <input 
                type="text" 
                placeholder="ex: my-awesome-store"
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300"
              />
            </div>
            <p className="text-[10px] text-slate-400 italic">This will be your store&apos;s unique URL. Only letters, numbers, and hyphens are allowed. Example: my-awesome-store</p>
          </div>

          {/* Shop Phone */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shop Phone *</label>
            <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd]">
              <div className="flex items-center gap-2 px-3 border-r border-slate-100 bg-slate-50/50">
                <div className="w-5 h-3.5 bg-[#008751] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-full bg-white" />
                    </div>
                </div>
                <span className="text-xs font-bold text-slate-600">+234</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Ex: +1234567890"
                className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Vendor Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vendor Type *</label>
            <div className="relative">
              <select className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none bg-white">
                <option>Individual (Sole Proprietor)</option>
                <option>Registered Company</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ID Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID Type *</label>
            <div className="relative">
              <select className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none bg-white">
                <option>National ID</option>
                <option>Voters Card</option>
                <option>International Passport</option>
                <option>Drivers License</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID Number *</label>
            <input 
              type="text" 
              placeholder="Enter ID Number"
              className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] placeholder:text-slate-300"
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upload ID Document *</label>
              <input type="file" className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Proof of Address *</label>
              <input type="file" className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 border border-slate-200 rounded-sm p-1" />
            </div>
          </div>

          {/* Banking Info Section */}
          <div className="space-y-6 pt-4">
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bank Name *</label>
                <input type="text" placeholder="Enter Bank Name" className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300" />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Name *</label>
                <input type="text" placeholder="Enter Account Name" className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300" />
                <p className="text-[10px] text-slate-400 italic">Account Name must match the name on the Government ID submitted</p>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Number *</label>
                <input type="text" placeholder="Enter Account Number" className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300" />
             </div>
          </div>

          {/* Terms and Policy */}
          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="terms" className="w-4 h-4 rounded-sm border-slate-300 text-[#149fcd] focus:ring-[#149fcd] cursor-pointer" />
            <label htmlFor="terms" className="text-[12px] text-slate-400 font-medium cursor-pointer">
              I agree to the <Link href="/terms" className="text-[#149fcd] hover:underline transition-colors">Terms and Privacy Policy</Link>
            </label>
          </div>

          {/* Register Button */}
          <button type="submit" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[13px] font-bold py-3 px-12 rounded-sm transition-all shadow-sm uppercase tracking-wide">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}