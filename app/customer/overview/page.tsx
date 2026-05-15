import { ShoppingBag, MapPin, Settings, MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function CustomerOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Overview</h1>

      {/* Welcome Banner */}
      <div className="bg-white border border-slate-100 p-8 rounded-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 rounded-full bg-[#3b4d9b] flex items-center justify-center border-4 border-slate-50 shrink-0">
          <span className="text-white text-3xl font-bold">N</span>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Welcome back, <span className="text-slate-900">Neel Ade!</span>
          </h2>
          <p className="text-sm text-slate-400">
            Manage your account, view orders, and update your preferences from your personal dashboard.
          </p>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* View Orders */}
        <div className="bg-[#1a6e8a] p-8 text-center text-white rounded-sm flex flex-col items-center group">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={20} />
          </div>
          <h3 className="font-bold mb-2">View Orders</h3>
          <p className="text-[11px] text-white/70 mb-6 leading-relaxed">
            Track your recent orders and order history
          </p>
          <Link href="/customer/orders" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            View Orders <MoveRight size={14} />
          </Link>
        </div>

        {/* Manage Addresses */}
        <div className="bg-[#E6F4EA] p-8 text-center rounded-sm flex flex-col items-center group border border-[#CEEAD6]">
          <div className="w-12 h-12 bg-[#34A853] rounded-full flex items-center justify-center mb-4 text-white">
            <MapPin size={20} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Manage Addresses</h3>
          <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
            Update your shipping and billing addresses
          </p>
          <Link href="/customer/addresses" className="bg-[#34A853] hover:bg-[#2d9147] text-white text-xs font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            Manage Addresses <MoveRight size={14} />
          </Link>
        </div>

        {/* Account Settings */}
        <div className="bg-[#FFF8E1] p-8 text-center rounded-sm flex flex-col items-center group border border-[#FFECB3]">
          <div className="w-12 h-12 bg-[#FFC107] rounded-full flex items-center justify-center mb-4 text-white">
            <Settings size={20} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Account Settings</h3>
          <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
            Edit your profile and account details
          </p>
          <Link href="/customer/settings" className="bg-[#FFC107] hover:bg-[#e6ae06] text-white text-xs font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            Edit Account <MoveRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}