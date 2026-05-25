'use client';
import {toast} from "sonner";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, ArrowLeft, Loader2 } from "lucide-react";
import { fetchMyAddresses, updateAddressDetails } from "../../../../lib/api/auth";

export default function EditAddress() {
  const params = useParams();
  const router = useRouter();
  const addressId = params?.id as string; // Reads target index key from dynamic context block segment

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
    is_default: false
  });

  useEffect(() => {
    if (!addressId) return;
    
    const loadSpecificAddress = async () => {
      try {
        setLoading(true);
        const data = await fetchMyAddresses();
        const matches = data.find(addr => addr.id === addressId);
        
        if (matches) {
          // Normalize prefix code values out of display string if required
          const displayPhone = matches.phone.replace("+234", "");
          setFormData({
            name: matches.name,
            phone: displayPhone,
            email: matches.email,
            state: matches.state,
            city: matches.city,
            address: matches.address,
            is_default: matches.is_default
          });
        } else {
          toast.error("Target record details absent in data schema.");
          router.push("/customer/addresses");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSpecificAddress();
  }, [addressId, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const cleanedPhone = formData.phone.startsWith("+234") ? formData.phone : `+234${formData.phone.replace(/\s+/g, "")}`;
      
      await updateAddressDetails(addressId, {
        ...formData,
        phone: cleanedPhone
      });

      router.push("/customer/addresses");
    } catch (err) {
      toast.error("Failed to push patch record modifications updating payload.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Reassembling address data hooks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <button onClick={() => router.push("/customer/addresses")} className="flex items-center gap-2 text-xs font-bold text-[#149fcd] hover:underline uppercase tracking-wider">
        <ArrowLeft size={14} /> Cancel modifications
      </button>

      <div className="bg-white border border-slate-100 rounded-sm p-8 md:p-12 shadow-sm">
        <h1 className="text-xl font-black text-slate-800 font-montserrat uppercase tracking-tight mb-8">
          Modify address entry
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <div className="flex border border-slate-200 rounded-sm overflow-hidden focus-within:border-[#149fcd] transition-colors">
                <div className="flex items-center gap-2 px-3 border-r border-slate-100 bg-slate-50/50 cursor-pointer">
                  <div className="w-5 h-3.5 bg-[#008751] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-full bg-white mx-auto" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">+234</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="flex-1 px-4 py-3 text-sm text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors"
              />
            </div>

            <div className="md:col-span-1" />

            {/* State */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">State</label>
              <div className="relative">
                <select 
                  value={formData.state}
                  onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors bg-white"
                >
                  <option value="Abuja">Abuja</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Rivers">Rivers</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">City</label>
              <input 
                type="text" 
                required
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors"
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Address</label>
              <input 
                type="text" 
                required
                value={formData.address}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#149fcd] transition-colors"
              />
            </div>
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="isDefault" 
              checked={formData.is_default}
              onChange={e => setFormData(prev => ({ ...prev, is_default: e.target.checked }))}
              className="w-4 h-4 rounded-sm border-slate-300 text-[#149fcd] focus:ring-[#149fcd] cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-[12px] text-slate-400 font-medium cursor-pointer select-none">
              Use this address as default shipping fallback destination node.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={updating}
              className="bg-[#149fcd] hover:bg-[#118eb8] disabled:bg-slate-300 text-white text-xs font-bold py-3.5 px-10 rounded-sm transition-all shadow-sm uppercase tracking-wider flex items-center gap-2"
            >
              {updating ? <Loader2 size={14} className="animate-spin" /> : "Update Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}