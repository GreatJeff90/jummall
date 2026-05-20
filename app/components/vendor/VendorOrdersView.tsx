'use client';

import React, { useState } from "react";
import { 
  Search, 
  ShoppingBag, 
  ArrowLeft, 
  ChevronRight, 
  RefreshCw, 
  AlertTriangle 
} from "lucide-react";

interface OrderItem {
  id: string;
  customerName: string;
  productName: string;
  itemCount: number;
  price: number;
  status: 'Awaiting payment' | 'Paid' | 'Preparing' | 'On the way' | 'Ready for handoff' | 'Completed' | 'Cancelled';
  img: string;
  isPOD?: boolean; // Pay on delivery status flag context indicator
}

// Data set structured exactly to match structural domains outlined in section §2.4
const initialOrders: OrderItem[] = [
  {
    id: "#JM-99432",
    customerName: "Amadi Port-Harcourt",
    productName: "Premium Wide-Leg Denim Jeans",
    itemCount: 1,
    price: 14999,
    status: "Paid",
    img: "/img-20260509-wa0020-150x150.jpg",
  },
  {
    id: "#JM-98311",
    customerName: "Chioma Chukwu",
    productName: "Xiaomi Redmi Bluetooth Speaker ASM11A",
    itemCount: 2,
    price: 25000,
    status: "Preparing",
    img: "/img-8221-600x600.jpeg",
    isPOD: true,
  },
  {
    id: "#JM-97204",
    customerName: "Tunde Lagos",
    productName: "4G WiFi 6 Hotspot & 10000mAh Power Bank Bundle",
    itemCount: 1,
    price: 60000,
    status: "On the way",
    img: "/whatsapp-image-2026-04-17-at-10859-pm-600x600.jpeg",
  },
  {
    id: "#JM-96119",
    customerName: "Bisi Adebayo",
    productName: "Telesin C03 Magnetic Selfie Ring Light",
    itemCount: 1,
    price: 35000,
    status: "Ready for handoff",
    img: "/cleo-el-telesin-c03-phone-magnetic-beauty-fill-light-pica-600x600.webp",
  },
  {
    id: "#JM-95088",
    customerName: "Emeka Okafor",
    productName: "TELESIN Fun Shot Magnetic Grip",
    itemCount: 3,
    price: 70000,
    status: "Completed",
    img: "/camera-white-1-600x600.jpg",
  }
];

const filterCategories = [
  { label: "All", filterKey: "all" },
  { label: "New", filterKey: "Paid" },
  { label: "Packing", filterKey: "Preparing" },
  { label: "Shipped", filterKey: "On the way" },
  { label: "Handoff", filterKey: "Ready for handoff" },
  { label: "Released", filterKey: "Completed" },
  { label: "Cancelled", filterKey: "Cancelled" }
];

export default function VendorOrdersView() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [loading, setLoading] = useState(false);

  // Derive contextual task metric status rows (§2.1 and §2.2)
  const toShipCount = orders.filter(o => o.status === "Paid" || o.status === "Preparing").length;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600); // Fast mock hydration frame trigger
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  // Utility to determine badge count weights per filter item context block
  const getBadgeCount = (filterKey: string) => {
    if (filterKey === "all") return 0;
    return orders.filter(o => o.status === filterKey).length;
  };

  // Status mapping color codes following the precise styling guide (§2.4 tokens)
  const getStatusStyles = (status: OrderItem['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#FCE7E0] text-[#D9714E]';
      case 'Preparing':
        return 'bg-slate-100 text-[#1B4D5E]';
      case 'On the way':
        return 'bg-[#E5F4FA] text-[#149FCD]';
      case 'Ready for handoff':
        return 'bg-yellow-100 text-[#143D4A]';
      case 'Completed':
        return 'bg-green-100 text-[#31B757]';
      default:
        return 'bg-red-100 text-[#EF4444]';
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* --- 2.1 HEADER COMPONENT ZONE (§2.1 requirements) --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="text-left">
          <p className={`text-xs font-black uppercase tracking-widest ${toShipCount > 0 ? "text-[#D9714E]" : "text-[#31B757]"}`}>
            {toShipCount > 0 ? `${toShipCount} to ship` : "All caught up"}
          </p>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-1">
            Orders
          </h1>
        </div>

        {/* Global Catalog Context Refetch Trigger Button */}
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-50 self-end sm:self-auto shadow-sm"
        >
          <RefreshCw size={16} className={`transition-transform duration-500 ${loading ? "animate-spin text-[#149FCD]" : ""}`} />
        </button>
      </div>

      {/* --- 2.2 HORIZONTAL SCROLL CHIP NAVIGATION STRIP (§2.2 spec) --- */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 py-1.5 flex items-center gap-2.5">
        {filterCategories.map((tab) => {
          const isActive = activeFilter === tab.filterKey;
          const badgeCount = getBadgeCount(tab.filterKey);

          return (
            <button
              key={tab.label}
              onClick={() => setActiveFilter(tab.filterKey)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-bold tracking-tight shrink-0 transition-all flex items-center gap-2 border shadow-sm ${
                isActive 
                  ? "bg-[#143D4A] border-[#143D4A] text-white" 
                  : "bg-white border-[#EAEBED] text-[#010F1C] hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              
              {/* Context Dependent Count Notification Badge Indicators */}
              {badgeCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none border transition-colors ${
                  isActive 
                    ? "bg-[#FFD43A] border-[#143D4A] text-[#143D4A]" 
                    : "bg-slate-100 border-slate-200 text-[#55585B]"
                }`}>
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- 2.3 EMPTY & DATA RENDERING BOUNDARY DISPATCHER LAYER (§2.3) --- */}
      {loading ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 shadow-sm min-h-[400px]">
          <div className="w-10 h-10 border-4 border-[#149FCD]/20 border-t-[#149FCD] rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 animate-pulse tracking-wide">Syncing Jummall Escrow Metrics...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[400px]">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 mb-5">
            <ShoppingBag size={28} className="stroke-[1.5]" />
          </div>
          <h3 className="text-[15px] font-black text-slate-800 tracking-tight uppercase">Nothing here</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
            No orders match this filter requirement right now.
          </p>
        </div>
      ) : (
        /* --- 2.4 DYNAMIC ORDER LIST SCROLL MATRIX OVERLAY BLOCK --- */
        <div className="space-y-3.5">
          {filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="w-full bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[#149FCD]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Product Frame Thumbnail Box */}
                <div className="relative w-14 h-16 bg-[#F6F7F9] border border-slate-100 rounded-sm p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={order.img} alt={order.productName} className="object-contain w-full h-full p-0.5 group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-black text-[#010F1C] tracking-tight">{order.id}</span>
                    <span className="text-[11px] font-medium text-slate-400 truncate max-w-[120px]">
                      · {order.customerName}
                    </span>
                    
                    {/* Pay On Delivery Pale Yellow Chip Tag (§2.4 optionals) */}
                    {order.isPOD && (
                      <span className="bg-[#FFF5D9] border border-[#FFD43A]/50 text-[#143D4A] text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider scale-95 shadow-sm">
                        POD
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[12.5px] font-medium text-slate-600 truncate max-w-md">
                    {order.productName}
                    {order.itemCount > 1 && (
                      <span className="text-[#149FCD] font-bold text-[11px] ml-1.5">
                        + {order.itemCount - 1} more item(s)
                      </span>
                    )}
                  </p>
                  
                  {/* Payout Currency Block Matrix Formatter */}
                  <p className="text-[13px] font-black text-[#31B757] tracking-tight pt-0.5">
                    ₦{order.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Pill Action Area Container Block */}
              <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-2 border-t sm:border-0 pt-3 sm:pt-0 border-slate-50">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm font-sans tracking-wide ${getStatusStyles(order.status)}`}>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-[#149FCD] transition-colors hidden sm:block stroke-[2.5]" />
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}