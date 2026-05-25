'use client';

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Pencil, Trash2, Plus, Star, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyAddresses, deleteAddressRecord, setDefaultAddressRecord, AddressItem } from "../../lib/api/auth";

export default function AddressBooks() {
  const queryClient = useQueryClient();

  // 1. Fetch dynamic address records natively via TanStack Query
  const { data: addresses = [], isLoading } = useQuery<AddressItem[]>({
    queryKey: ["shippingAddresses"],
    queryFn: fetchMyAddresses,
    staleTime: 1000 * 60 * 10, // Cache addresses fresh for 10 minutes
  });

  // 2. Encapsulate card removal transactions inside a mutation hook block
  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddressRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingAddresses"] });
    },
    onError: () => {
      alert("Failed to remove target address record. Try again.");
    }
  });

  // 3. Encapsulate priority fallback modifiers into an explicit mutation channel
  const setDefaultMutation = useMutation({
    mutationFn: setDefaultAddressRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingAddresses"] });
    },
    onError: () => {
      alert("Failed to update default address fallback selection.");
    }
  });

  const handleRemove = (id: string) => {
    if (deleteAddressMutation.isPending) return;
    if (!window.confirm("Are you sure you want to delete this address from your book?")) return;
    deleteAddressMutation.mutate(id);
  };

  const handleSetDefault = (id: string) => {
    if (setDefaultMutation.isPending) return;
    setDefaultMutation.mutate(id);
  };

  const actionLoading = deleteAddressMutation.isPending || setDefaultMutation.isPending;

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-sm p-16 text-center flex flex-col items-center justify-center gap-3 min-h-[350px] shadow-sm select-none">
        <Loader2 size={32} className="animate-spin text-[#149fcd]" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Syncing shipping destinations...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 text-left transition-opacity duration-200 ${actionLoading ? "opacity-60 pointer-events-none" : ""}`}>
      <h1 className="text-2xl font-black text-slate-800 font-montserrat uppercase tracking-tight select-none">
        Address books
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        <div className="mb-8 select-none">
          <h2 className="text-base font-bold text-slate-800">Your Addresses</h2>
          <p className="text-[11px] text-slate-400">Manage your shipping and billing addresses.</p>
        </div>

        {/* --- Address Card Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Loop Real Database Storage Blocks */}
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-slate-100 rounded-sm overflow-hidden flex flex-col hover:border-slate-200 transition-all bg-white">
              <div className="p-6 space-y-5 flex-1">
                <div className="flex justify-between items-start gap-4 select-none">
                  <h3 className="font-bold text-[#149fcd] text-sm truncate max-w-[150px]">{addr.name}</h3>
                  {addr.is_default ? (
                    <span className="bg-[#149fcd] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap shadow-2xs">
                      Default
                    </span>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => handleSetDefault(addr.id)} 
                      className="text-slate-400 hover:text-amber-500 text-[10px] font-bold flex items-center gap-1 transition-colors focus:outline-none"
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
                  <div className="flex gap-3 select-all">
                    <Phone size={14} className="text-slate-300 shrink-0 mt-0.5" />
                    <span>{addr.phone}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions Map Setup */}
              <div className="px-6 py-4 border-t border-slate-50 flex gap-2 bg-slate-50/20 select-none">
                <Link 
                  href={`/customer/addresses/edit/${addr.id}`}
                  className="flex items-center gap-2 bg-[#149fcd] hover:bg-[#118eb8] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm uppercase tracking-wide"
                >
                  <Pencil size={12} /> Edit
                </Link>
                <button 
                  type="button"
                  onClick={() => handleRemove(addr.id)}
                  className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm uppercase tracking-wide focus:outline-none"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* --- "Add New" Dynamic Option Placeholder Box Card --- */}
          <div className="border border-dashed border-slate-200 rounded-sm p-8 flex flex-col items-center justify-center text-center bg-slate-50/20 select-none">
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