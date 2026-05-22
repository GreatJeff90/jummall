'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  ArrowRight, 
  Bell, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  MessageSquare, 
  CheckSquare, 
  Image as ImageIcon,
  ChevronDown,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchSellerAnalyticsOverview, SellerAnalyticsOverviewResponse } from "../../../lib/api/auth";
import RevenueChartCard from "../charts/RevenueChartCard";

interface ExtendedVendorUser {
  name?: string;
  email?: string;
  vendor_profile?: {
    shop_name?: string;
    is_verified?: boolean;
  };
}

export default function VendorDashboardView() {
  const { user } = useAuth() as { user: ExtendedVendorUser | null };
  const [data, setData] = useState<SellerAnalyticsOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardContextMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetchSellerAnalyticsOverview();
        setData(response);
      } catch (err) {
        console.error("Failed to load seller dashboard contextual fields:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardContextMetrics();
  }, []);

  const getStoreInitial = () => {
    if (!user?.vendor_profile?.shop_name) return "G";
    return user.vendor_profile.shop_name.charAt(0).toUpperCase();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value).replace("NGN", "₦");
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3 bg-white border border-slate-100 rounded-xl max-w-6xl mx-auto px-6 py-8 shadow-sm">
        <Loader2 size={32} className="animate-spin text-[#149FCD]" />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Hydrating backend metrics stream...</p>
      </div>
    );
  }

  // Map dynamic counter arrays cleanly with full structural lookups
  const metricCards = [
    { icon: ShoppingBag, value: data?.pending_orders_count ?? 0, label: "Pending orders", colors: "text-[#D9714E] bg-[#FCE7E0]" },
    { icon: Truck, value: data?.in_transit_orders_count ?? 0, label: "In transit", colors: "text-[#149FCD] bg-[#E5F4FA]" },
    { icon: MessageSquare, value: data?.unread_chats_count ?? 0, label: "Need replies", colors: "text-[#149FCD] bg-[#E5F4FA]" },
    { icon: CheckSquare, value: data?.completed_orders_count ?? 0, label: "Completed", colors: "text-[#31B757] bg-[#DCFCE7]" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-0 space-y-8 pb-24 text-left font-sans">
      
      {/* --- 1.1 SELLER APP BAR ROW PANEL --- */}
      <div className="flex items-center justify-between gap-8 bg-white border border-[#EAEBED] p-4 rounded-[20px] shadow-sm">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#149FCD] to-[#1284AC] flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-inner">
            {getStoreInitial()}
          </div>
          <div className="text-left min-w-0">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <h1 className="text-[15px] font-bold text-[#010F1C] tracking-tight truncate max-w-[180px]">
                {user?.vendor_profile?.shop_name || "My Retail Shop"}
              </h1>
              <ChevronDown size={14} className="text-[#55585B] group-hover:text-[#149FCD] transition-colors shrink-0 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31B757] shrink-0 animate-ping" />
              <span className="text-[11.5px] font-semibold text-[#31B757]">Store is open</span>
            </div>
          </div>
        </div>

        {/* Bell Button - Notification Count Hydrated via API */}
<Link 
  href="/notifications" 
  className="w-11 h-11 bg-white border border-[#EAEBED] rounded-[14px] flex items-center justify-center text-[#010F1C] relative hover:bg-slate-50 transition-colors shrink-0 select-none"
>
  <Bell size={20} className="stroke-[2]" />
  {data && data.unread_notifications_count > 0 && (
    <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow-sm animate-pulse">
      {data.unread_notifications_count}
    </span>
  )}
</Link>
      </div>

      {/* --- 1.2 DYNAMIC VERIFICATION CHECK BANNER GRID --- */}
      {user?.vendor_profile?.is_verified !== true && (
        <div className="bg-[#E5F4FA] border border-[#149FCD]/30 p-5 rounded-[16px] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#149FCD]/10 transition-colors shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-[11px] bg-[#149FCD] flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-200">
              <ShieldCheck size={20} className="stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[13px] font-black text-[#1B4D5E] tracking-tight uppercase">
                Verify your identity to start selling
              </h3>
              <p className="text-[11.5px] font-medium text-[#55585B] leading-relaxed max-w-2xl">
                Buyers won&apos;t see your live listings across the marketplace grids until identification setup wraps up. Only takes 2 mins.
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="text-[#149FCD] shrink-0 stroke-[2.5]" />
        </div>
      )}

      {/* --- 1.3 REVENUE DISPLAY CHARTS SPLIT ROW CONTAINER --- */}
      <RevenueChartCard />

      {/* --- 1.4 STATS GRID MATRICES PANEL (Completely Dynamic API Values) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <div key={idx} className="bg-white border border-[#EAEBED] p-4 rounded-[18px] shadow-sm flex flex-col justify-between aspect-[1.4] relative group hover:border-[#149FCD]/40 transition-colors">
            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${card.colors} shadow-inner`}>
              <card.icon size={18} className="stroke-[2]" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-extrabold text-[#010F1C] tracking-tight block leading-none">
                {card.value.toLocaleString()}
              </span>
              <span className="text-[11.5px] font-medium text-[#55585B] tracking-tight block truncate mt-1">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- 1.5 WHAT NEEDS YOU ACTION TASKS ROW LAYOUT (Dynamic API Feed Mapping) --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#010F1C] tracking-tight uppercase text-[11px] opacity-70 tracking-wider">
            What needs you
          </h2>
          <button type="button" className="text-xs font-bold text-[#149FCD] flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-[18px] overflow-hidden shadow-sm divide-y divide-[#EAEBED]/60">
          {data?.action_tasks && data.action_tasks.length > 0 ? (
            data.action_tasks.map((task, i) => {
              const TaskIcon = task.type === "orders" ? Truck : MessageSquare;
              const taskTint = task.type === "orders" ? "bg-[#FCE7E0] text-[#D9714E]" : "bg-sky-50 text-[#149FCD]";
              return (
                <div key={i} className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 ${taskTint}`}>
                      <TaskIcon size={18} className="stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-[#010F1C] leading-none">{task.title}</h4>
                      <p className="text-[11.5px] font-medium text-[#55585B] mt-1 leading-none">{task.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#9CA3AF] stroke-[2.5]" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">All caught up! No critical actions required.</div>
          )}
        </div>
      </div>

      {/* --- 1.6 RECENT ORDERS MATRIX TABLE (Dynamic API Feed Mapping) --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#010F1C] tracking-tight uppercase text-[11px] opacity-70 tracking-wider">
            Recent Orders
          </h2>
          <button type="button" className="text-xs font-bold text-[#149FCD] flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-[18px] overflow-hidden shadow-sm divide-y divide-[#EAEBED]/60">
          {data?.recent_orders && data.recent_orders.length > 0 ? (
            data.recent_orders.map((order, i) => {
              const isPaid = order.status.toLowerCase() === "paid";
              return (
                <div key={i} className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-[14px] bg-[#F6F7F9] border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 relative">
                      <ImageIcon size={18} className="stroke-[2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <span className="text-[13px] font-bold text-[#010F1C] leading-none">{order.id}</span>
                        <span className={`w-4 h-4 rounded-[5px] flex items-center justify-center text-white text-[9px] font-extrabold ${
                          isPaid ? "bg-teal-600" : "bg-orange-500"
                        }`}>
                          {order.fallback_initial || "P"}
                        </span>
                        <span className="text-[10px] font-medium text-[#9CA3AF] whitespace-nowrap">{order.created_at_human}</span>
                      </div>
                      <p className="text-[12px] font-medium text-[#55585B] truncate mt-1.5">{order.product_name}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1.5">
                    <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-[8px] ${
                      isPaid ? "bg-[#DCFCE7] text-[#31B757]" : "bg-[#FFF9E6] text-[#D9A700]"
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-[13px] font-extrabold text-[#010F1C]">{formatCurrency(order.price)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">No sales logs recorded yet.</div>
          )}
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