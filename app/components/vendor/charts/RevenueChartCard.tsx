'use client';

import React from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import { ShoppingBag, Eye, BarChart3 } from "lucide-react";

const chartData = [
  { name: "Mon", revenue: 45000 },
  { name: "Tue", revenue: 72000 },
  { name: "Wed", revenue: 31000 },
  { name: "Thu", revenue: 94000 },
  { name: "Fri", revenue: 58000 },
  { name: "Sat", revenue: 110000 },
  { name: "Sun", revenue: 125400 }, // Today
];

export default function RevenueChartCard() {
  return (
    <div className="w-full rounded-[24px] bg-gradient-to-br from-[#1B4D5E] to-[#143D4A] overflow-hidden relative text-white shadow-lg border border-[#143D4A]">
      
      {/* Decorative Blur Ambient Circles Glow (Section §1.3 Spec) */}
      <div className="absolute -top-28 -right-28 w-64 h-64 rounded-full bg-[#149FCD]/40 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[#149FCD]/20 blur-3xl pointer-events-none z-0" />

      {/* Main Content Split Grid Row */}
      <div className="relative z-10 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Ticker Information Parameter Stack */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#FFD43A] tracking-[2.5px] uppercase block">
              Today&apos;s Revenue
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1.5 leading-none font-montserrat">
              ₦125,400
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#31B757]/18 text-[#31B757] text-[11.5px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              ▲ +12.3%
            </span>
            <span className="text-[11px] font-semibold text-white/60">
              vs ₦111,600 yesterday
            </span>
          </div>
        </div>

        {/* Right Chart Performance Segment Viewport */}
        <div className="lg:col-span-5 w-full flex flex-col items-end">
          <div className="w-full h-16 max-w-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={10}>
                  {chartData.map((entry, index) => {
                    const isToday = index === chartData.length - 1;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={isToday ? "#FFD43A" : "rgba(255, 255, 255, 0.28)"} 
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[10px] font-semibold text-white/60 tracking-wider mr-2 mt-2 uppercase block">
            Last 7 days trend
          </span>
        </div>

      </div>

      {/* Inline Bottom Metrics Tray Segment Row Panel (Divider split lines) */}
      <div className="relative z-10 bg-black/10 border-t border-white/10 px-6 py-4 grid grid-cols-3 text-center divide-x divide-white/10">
        
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <ShoppingBag size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">42</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Orders</span>
        </div>

        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <Eye size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">1.8K</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Visitors</span>
        </div>

        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1.5 text-[#FFD43A]">
            <BarChart3 size={15} className="stroke-[2.5]" />
            <span className="text-sm font-extrabold text-white">3.4%</span>
          </div>
          <span className="text-[10.5px] font-semibold text-white/60 mt-0.5 uppercase tracking-wide">Conv.</span>
        </div>

      </div>

    </div>
  );
}