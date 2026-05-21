'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Pencil, Trash2, Plus, Star } from "lucide-react";
import { fetchMyAddresses, deleteAddressRecord, setDefaultAddressRecord, AddressItem } from "../../lib/api/auth";

export default function AddressBooks() {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(true);

 // --- KEEP YOUR EXISTING loadAddresses FUNCTION AS IT IS ---
  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await fetchMyAddresses();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching address inventory lists:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATED CLEAN EFFECT COUPLING TO CLEAR ESLINT WARNING ---
  useEffect(() => {
    const initializeAddresses = async () => {
      await loadAddresses();
    };
    initializeAddresses();
  }, []);

  const handleRemove = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address from your book?")) return;
    try {
      await deleteAddressRecord(id);
      setAddresses(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert("Failed to remove target address record. Try again.");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddressRecord(id);
      await loadAddresses(); // Reload payload to rearrange the conditional indicator states smoothly
    } catch (err) {
      alert("Failed to update default address fallback selection.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Syncing shipping destinations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat uppercase tracking-tight">
        Address books
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-base font-bold text-slate-800">Your Addresses</h2>
          <p className="text-[11px] text-slate-400">Manage your shipping and billing addresses.</p>
        </div>

        {/* --- Address Card Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Loop Real Database Storage Blocks */}
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-slate-100 rounded-sm overflow-hidden flex flex-col hover:border-slate-200 transition-all bg-white">
              <div className="p-6 space-y-5 flex-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-[#149fcd] text-sm truncate max-w-[150px]">{addr.name}</h3>
                  {addr.is_default ? (
                    <span className="bg-[#149fcd] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                      Default
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleSetDefault(addr.id)} 
                      className="text-slate-400 hover:text-amber-500 text-[10px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Star size={11} /> Make Default
                    </button>
                  )}
                </div>

                <div className="space-y-3 text-[12px] text-slate-500 leading-relaxed">
                  <div className="flex gap-3">
                    <MapPin size={14} className="text-slate-300 shrink-0 mt-0.5" />
                    <span>{addr.address}, {addr.city}, {addr.state}</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={14} className="text-slate-300 shrink-0 mt-0.5" />
                    <span>{addr.phone}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions Map Setup */}
              <div className="px-6 py-4 border-t border-slate-50 flex gap-2 bg-slate-50/20">
                <Link 
                  href={`/customer/addresses/edit/${addr.id}`} // Structured dynamic reference linkage redirect route
                  className="flex items-center gap-2 bg-[#149fcd] hover:bg-[#118eb8] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm uppercase tracking-wide"
                >
                  <Pencil size={12} /> Edit
                </Link>
                <button 
                  onClick={() => handleRemove(addr.id)}
                  className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm uppercase tracking-wide"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* --- "Add New" Dynamic Option Placeholder Box Card --- */}
          <div className="border border-dashed border-slate-200 rounded-sm p-8 flex flex-col items-center justify-center text-center bg-slate-50/20">
            <div className="w-10 h-10 bg-[#146e8a] rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
              <Plus size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Need another address?</h4>
            <p className="text-[10px] text-slate-400 mb-6 max-w-[180px] leading-normal">
              Add multiple addresses for different shipping locations or billing purposes.
            </p>
            <Link 
              href="/customer/addresses/create"
              className="border border-[#149fcd] text-[#149fcd] hover:bg-[#149fcd] hover:text-white transition-all text-[11px] font-bold px-6 py-2.5 rounded-sm flex items-center gap-2 bg-white shadow-xs uppercase tracking-wider"
            >
              <Plus size={14} /> Add Another Address
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}