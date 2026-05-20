'use client';

import React from "react";
import { 
  ArrowRight, 
  Bell, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  MessageSquare, 
  CheckSquare, 
  Image as ImageIcon,
  ChevronDown
} from "lucide-react";
import RevenueChartCard from "../charts/RevenueChartCard";

export default function VendorDashboardView() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 pb-24">
      
      {/* --- 1.1 SELLER APP BAR ROW PANEL --- */}
      <div className="flex items-center justify-between gap-8 bg-white border border-[#EAEBED] p-4 rounded-[20px] shadow-sm">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Store Avatar Diagonal Gradient */}
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#149FCD] to-[#1284AC] flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-inner">
            G
          </div>
          <div className="text-left min-w-0">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <h1 className="text-[15px] font-bold text-[#010F1C] tracking-tight truncate max-w-[180px]">
                Glorious God&apos;s Store
              </h1>
              <ChevronDown size={14} className="text-[#55585B] group-hover:text-[#149FCD] transition-colors shrink-0 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31B757] shrink-0 animate-ping" />
              <span className="text-[11.5px] font-semibold text-[#31B757]">Store is open</span>
            </div>
          </div>
        </div>

        {/* Bell Button with count badge overlays */}
        <button className="w-11 h-11 bg-white border border-[#EAEBED] rounded-[14px] flex items-center justify-center text-[#010F1C] relative hover:bg-slate-50 transition-colors shrink-0">
          <Bell size={20} className="stroke-[2]" />
          <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow-sm">
            2
          </span>
        </button>
      </div>

      {/* --- 1.2 VERIFICATION BANNER GRID --- */}
      <div className="bg-[#E5F4FA] border border-[#149FCD]/30 p-5 rounded-[16px] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#149FCD]/10 transition-colors shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-[11px] bg-[#149FCD] flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-200">
            <ShieldCheck size={20} className="stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-[13.5px] font-extrabold text-[#1B4D5E] tracking-tight">
              Verify your identity to start selling
            </h3>
            <p className="text-[11.5px] font-medium text-[#55585B] leading-relaxed max-w-2xl">
              Buyers can&apos;t see your products until you verify. Takes 2 mins — just NIN + a selfie.
            </p>
          </div>
        </div>
        <ArrowRight size={16} className="text-[#149FCD] shrink-0 stroke-[2.5]" />
      </div>

      {/* --- 1.3 REVENUE DISPLAY CHARTS SPLIT ROW CONTAINER --- */}
      <RevenueChartCard />

      {/* --- 1.4 STATS GRID MATRICES PANEL --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ShoppingBag, value: "12", label: "Pending orders", colors: "text-[#D9714E] bg-[#FCE7E0]" },
          { icon: Truck, value: "4", label: "In transit", colors: "text-[#149FCD] bg-[#E5F4FA]" },
          { icon: MessageSquare, value: "8", label: "Need replies", colors: "text-[#149FCD] bg-[#E5F4FA]" },
          { icon: CheckSquare, value: "164", label: "Completed", colors: "text-[#31B757] bg-[#DCFCE7]" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-[#EAEBED] p-4 rounded-[18px] shadow-sm flex flex-col justify-between aspect-[1.4] relative group hover:border-[#149FCD]/40 transition-colors">
            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${card.colors} shadow-inner`}>
              <card.icon size={18} className="stroke-[2]" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-extrabold text-[#010F1C] tracking-tight block leading-none">
                {card.value}
              </span>
              <span className="text-[11.5px] font-medium text-[#55585B] tracking-tight block truncate mt-1">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- 1.5 WHAT NEEDS YOU ACTION TASKS ROW LAYOUT --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#010F1C] tracking-tight uppercase tracking-wider text-[11px] opacity-70">
            What needs you
          </h2>
          <button className="text-xs font-bold text-[#149FCD] flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-[18px] overflow-hidden shadow-sm divide-y divide-[#EAEBED]/60">
          {[
            { title: "Pack 3 new order(s)", sub: "Buyers are waiting on dispatch", icon: Truck, tint: "bg-[#FCE7E0] text-[#D9714E]" },
            { title: "Reply to 8 buyer(s)", sub: "Faster replies improve your store rating", icon: MessageSquare, tint: "bg-[#E5F4FA] text-[#149FCD]" },
          ].map((task, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 ${task.tint}`}>
                  <task.icon size={18} className="stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#010F1C] leading-none">{task.title}</h4>
                  <p className="text-[11.5px] font-medium text-[#55585B] mt-1 leading-none">{task.sub}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#9CA3AF] stroke-[2.5]" />
            </div>
          ))}
        </div>
      </div>

      {/* --- 1.6 RERECENT ORDERS MATRIX PANEL TABLE --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#010F1C] tracking-tight uppercase tracking-wider text-[11px] opacity-70">
            Recent Orders
          </h2>
          <button className="text-xs font-bold text-[#149FCD] flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-[18px] overflow-hidden shadow-sm divide-y divide-[#EAEBED]/60">
          {[
            { id: "#JM-99432", name: "Premium Wide-Leg Denim Jeans", time: "10 mins ago", price: 14999, status: "Paid", color: "bg-teal-600", tag: "P" },
            { id: "#JM-98311", name: "Xiaomi Redmi Bluetooth Speaker ASM11A", time: "1 hr ago", price: 25000, status: "Preparing", color: "bg-orange-500", tag: "M" },
          ].map((order, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-[14px] bg-[#F6F7F9] border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 relative">
                  <ImageIcon size={18} className="stroke-[2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#010F1C] leading-none">{order.id}</span>
                    <span className={`w-4 h-4 rounded-[5px] flex items-center justify-center text-white text-[9px] font-extrabold ${order.color}`}>{order.tag}</span>
                    <span className="text-[10px] font-medium text-[#9CA3AF]">{order.time}</span>
                  </div>
                  <p className="text-[12px] font-medium text-[#55585B] truncate mt-1.5">{order.name}</p>
                </div>
              </div>

              <div className="text-right shrink-0 space-y-1.5">
                <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-[8px] ${
                  order.status === "Paid" ? "bg-[#FCE7E0] text-[#D9714E]" : "bg-yellow-100 text-[#143D4A]"
                }`}>
                  {order.status}
                </span>
                <p className="text-[13px] font-extrabold text-[#010F1C]">₦{order.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 1.7 QUICK PRODUCT PLACEMENT ACCENT BANNER STRIP --- */}
      <div className="bg-gradient-to-r from-[#E5F4FA] to-[#F6FBFD] border border-[#149FCD]/20 p-4 rounded-[18px] flex items-center justify-between gap-4 cursor-pointer hover:border-[#149FCD]/40 transition-all shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-[12px] bg-[#149FCD] flex items-center justify-center text-white shrink-0 shadow-md">
            <span className="font-black text-xl leading-none">+</span>
          </div>
          <div>
            <h3 className="text-[13.5px] font-bold text-[#1B4D5E] leading-none">Add a new product</h3>
            <p className="text-[11.5px] font-medium text-[#55585B] mt-1 leading-none">Listings with photos sell 3× faster</p>
          </div>
        </div>
        <ArrowRight size={18} className="text-[#149FCD] stroke-[2.5]" />
      </div>

    </div>
  );
}