import { MapPin, Phone, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link"; // Added Link import

export default function AddressBooks() {
  return (
    <div className="space-y-8">
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
          
          {/* Main Address Card */}
          <div className="border border-slate-100 rounded-sm overflow-hidden flex flex-col">
            <div className="p-6 space-y-5 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#149fcd] text-sm">Neel Ade</h3>
                <span className="bg-[#149fcd] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase">
                  Default
                </span>
              </div>

              <div className="space-y-3 text-[12px] text-slate-500 leading-relaxed">
                <div className="flex gap-3">
                  <MapPin size={14} className="text-slate-300 shrink-0 mt-0.5" />
                  <span>Plot 100 area c Nyanya, Abuja, Abuja</span>
                </div>
                <div className="flex gap-3">
                  <Phone size={14} className="text-slate-300 shrink-0 mt-0.5" />
                  <span>+2349060690604</span>
                </div>
              </div>
            </div>

            {/* Card Actions - Updated to Links */}
            <div className="px-6 py-4 border-t border-slate-50 flex gap-2">
              <Link 
                href="/customer/addresses/edit"
                className="flex items-center gap-2 bg-[#149fcd] hover:bg-[#118eb8] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm"
              >
                <Pencil size={12} /> Edit
              </Link>
              <button className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[10px] font-bold px-4 py-2 rounded-sm transition-all shadow-sm">
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>

          {/* --- "Add New" Placeholder Area - Updated to Link --- */}
          <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-[#146e8a] rounded-full flex items-center justify-center text-white mb-4">
              <Plus size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Need another address?</h4>
            <p className="text-[10px] text-slate-400 mb-6 max-w-[180px]">
              Add multiple addresses for different shipping locations or billing purposes.
            </p>
            <Link 
              href="/customer/addresses/create"
              className="border border-[#149fcd] text-[#149fcd] hover:bg-[#149fcd] hover:text-white transition-all text-[11px] font-bold px-6 py-2.5 rounded-sm flex items-center gap-2 bg-white"
            >
              <Plus size={14} /> Add Another Address
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}