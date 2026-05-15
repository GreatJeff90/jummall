'use client';

import { ChevronDown } from "lucide-react";

export default function AddAddress() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
        Add a new address
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 md:p-12 shadow-sm">
        <form className="space-y-6 max-w-4xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Full name</label>
              <input 
                type="text" 
                placeholder="Enter name"
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors placeholder:text-slate-300"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Phone</label>
              <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd] transition-colors">
                <div className="flex items-center gap-2 px-3 border-r border-slate-100 bg-slate-50/50 cursor-pointer">
                  {/* Nigerian Flag SVG */}
                  <div className="w-5 h-3.5 bg-[#008751] flex items-center justify-center">
                    <div className="w-1.5 h-full bg-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-600">+234</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter phone"
                  className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
              <input 
                type="email" 
                placeholder="e.g: example@domain.com"
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors placeholder:text-slate-300"
              />
            </div>

            {/* Spacer for 2-column alignment */}
            <div className="hidden md:block" />

            {/* State Dropdown */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">State</label>
              <div className="relative">
                <select className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-300 outline-none focus:border-[#149fcd] transition-colors bg-white cursor-pointer">
                  <option value="" disabled selected>Select state...</option>
                  <option value="abuja">Abuja</option>
                  <option value="lagos">Lagos</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* City Dropdown */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">City</label>
              <div className="relative">
                <select className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-300 outline-none focus:border-[#149fcd] transition-colors bg-white cursor-pointer">
                  <option value="" disabled selected>Select city...</option>
                  <option value="abuja-city">Abuja City</option>
                </select>
    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Address</label>
              <input 
                type="text" 
                placeholder="Enter address"
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="isDefault" 
              className="w-4 h-4 rounded-sm border-slate-300 text-[#149fcd] focus:ring-[#149fcd] cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-[12px] text-slate-300 font-medium cursor-pointer">
              Use this address as default.
            </label>
          </div>

          {/* Create Button */}
          <div className="pt-4">
            <button 
              type="submit"
              className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[13px] font-bold py-2.5 px-8 rounded-sm transition-all shadow-sm uppercase"
            >
              Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}