'use client';

import React from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import { ShoppingBag, Eye, BarChart3, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSellerAnalyticsOverview, SellerAnalyticsOverviewResponse, DailyChartPoint } from "../../../lib/api/auth";

export default function RevenueChartCard() {
  // 1. Fetch data stream natively via TanStack Query
  const { data: metrics, isLoading } = useQuery<SellerAnalyticsOverviewResponse>({
    queryKey: ["sellerAnalyticsOverview"],
    queryFn: fetchSellerAnalyticsOverview,
    staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 minutes
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value).replace("NGN", "₦");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[280px] rounded-[24px] bg-[#1B4D5E] flex flex-col items-center justify-center text-white/60 gap-2 border border-[#143D4A] select-none">
        <Loader2 size={24} className="animate-spin text-[#FFD43A]" />
        <span className="text-xs font-bold uppercase tracking-wider">Syncing analytics database...</span>
      </div>
    );
  }

  // Derived properties from server state data maps
  const chartData: DailyChartPoint[] = metrics?.chart_trend_data || [];
  const isPositive = (metrics?.revenue_change_percentage || 0) >= 0;

  return (
    <div className="w-full rounded-[24px] bg-gradient-to-br from-[#1B4D5E] to-[#143D4A] overflow-hidden relative text-white shadow-lg border border-[#143D4A] text-left">
      
      {/* Decorative Blur Ambient Circles Glow */}
      <div className="absolute -top-28 -right-28 w-64 h-64 rounded-full bg-[#149FCD]/40 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[#149FCD]/20 blur-3xl pointer-events-none z-0" />

      {/* Main Content Split Grid Row */}
      <div className="relative z-10 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Ticker Information Parameter Stack */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#FFD43A] tracking-[2.5px] uppercase block select-none">
              Today&apos;s Revenue
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1.5 leading-none font-montserrat">
              {formatCurrency(metrics?.today_revenue || 0)}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap select-none">
            <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs bg-white/10 ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}{metrics?.revenue_change_percentage}%
            </span>
            <span className="text-[11px] font-semibold text-white/60">
              vs {formatCurrency(metrics?.yesterday_revenue || 0)} yesterday
            </span>
          </div>
        </div>

        {/* Right Chart Performance Segment Viewport */}
        <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-end">
          <div className="w-full h-16 max-w-[240px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={10}>
                    {chartData.map((_, index) => {
                      const isToday = index === chartData.length - 1;
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isToday ? "#FFD43A" : "rgba(255, 255, 255, 0.24)"} 
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[10px] text-white/40 select-none">
                No trend metrics logged
              </div>
            )}
          </div>
          <span className="text-[10px] font-semibold text-white/60 tracking-wider lg:mr-2 mt-2 uppercase block select-none">
            Last 7 days trend
          </span>
        </div>

      </div>

      {/* Inline Bottom Metrics Tray Segment Row Panel */}
      <div className="relative z-10 bg-black/10 border-t border-white/10 px-6 py-4 grid grid-cols-3 text-center divide-x divide-white/10 select-none">
        
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <ShoppingBag size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">{metrics?.total_orders_count || 0}</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Orders</span>
        </div>

        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <Eye size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">{metrics?.total_visitors_count || "0"}</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Visitors</span>
        </div>

        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <BarChart3 size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">{metrics?.conversion_rate || 0}%</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Conv.</span>
        </div>

      </div>

    </div>
  );
}