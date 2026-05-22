'use client';

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  Store,
  Camera
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import VendorDashboardView from "./views/VendorDashboardView";
import VendorOrdersView from "./VendorOrdersView";
import VendorProductsView from "./VendorProductsView";
import VendorChatsView from "./VendorChatsView";
import VendorStoreView from "./VendorStoreView";
import VendorAutoRepliesView from "./VendorAutoRepliesView";
import VendorEditInfoView from "./VendorEditInfoView";
import VendorBrandingView from "./VendorBrandingView";
import VendorBankView from "./VendorBankView";
import VendorReportsView from "./VendorReportsView";
import VendorAboutView from "./VendorAboutView";
import VendorSupportView from "./VendorSupportView";
import VendorSecurityView from "./VendorSecurityView";
import VendorPersonalInfoView from "./VendorPersonalInfoView";

const sidebarItems = [
  { id: 0, label: "Dashboard", icon: LayoutDashboard, badge: 0 },
  { id: 1, label: "Orders", icon: ShoppingBag, badge: 3 }, 
  { id: 2, label: "Products", icon: Package, badge: 0 },
  { id: 3, label: "Chats", icon: MessageSquare, badge: 5 }, 
  { id: 4, label: "Store", icon: Store, badge: 0 },
];

export default function VendorLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth(); // Hydrate current active merchant data records instantly

  // Generate dynamic profile letter fallback based on user name
  const getInitials = () => {
    if (!user?.name) return "JM";
    return user.name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans antialiased text-[#010F1C] pb-24 lg:pb-0">
      
      {/* CRITICAL BREAKPOINT REMINDER: External global site navbars/footers are omitted entirely here.
         The UI uses a structural layout split: a sticky bottom tab bar for mobile viewports,
         and a dedicated 270px left navigation card column for desktop monitors.
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* ================= FIXED LEFT SIDEBAR (DESKTOP ONLY) ================= */}
          <aside className="hidden lg:flex w-full lg:w-[270px] bg-white border border-[#EAEBED] rounded-sm p-4 shrink-0 shadow-sm flex-col justify-between">
            <div className="space-y-4">
              
              {/* User Profile / Merchant Identity Header Block Section */}
              <div className="flex items-center gap-3 p-1">
                <div className="relative w-12 h-12 rounded-full bg-[#E5F4FA] flex items-center justify-center text-white shrink-0 group border border-slate-100 overflow-hidden">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="Merchant Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-purple-600 to-sky-500 flex items-center justify-center text-[11px] tracking-tight font-black uppercase text-white shadow-inner">
                      {getInitials()}
                    </div>
                  )}
                  {/* Photo Edit Circular Overlay Trigger Indicator */}
                  <div className="absolute bottom-0 right-0 bg-[#149fcd] text-white p-0.5 rounded-full border border-white translate-x-0.5 translate-y-0.5 shadow-sm opacity-95 z-20">
                    <Camera size={10} className="stroke-[2.5]" />
                  </div>
                </div>
                <div className="min-w-0 text-left">
                  <h2 className="text-[13.5px] font-bold text-slate-800 tracking-tight truncate leading-none">
                    {user?.name || "Syncing Store..."}
                  </h2>
                  <p className="text-[11px] font-medium text-slate-400 truncate mt-1.5">
                    {user?.email || "connecting account..."}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 w-full" />

              {/* Sidebar Actionable Link Navigation List Items */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const IconComponent = item.icon;
                  
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 text-left group ${
                        isActive 
                          ? "bg-[#E5F4FA] text-[#149FCD] font-bold" 
                          : "text-[#55585B] hover:bg-slate-50 hover:text-[#010F1C]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <IconComponent 
                          size={16} 
                          className={`shrink-0 transition-colors ${
                            isActive 
                              ? "text-[#149FCD] stroke-[2.5]" 
                              : "text-[#55585B] group-hover:text-[#010F1C]"
                          }`} 
                        />
                        <span className="text-[12.5px] tracking-tight font-medium">
                          {item.label}
                        </span>
                      </div>

                      {/* Dynamic boundary rendering: counts > 0 inject numbers, 0 yields complete omission */}
                      {item.badge > 0 && (
                        <span className="bg-[#EF4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white shrink-0 shadow-sm animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Minimalist Footnote Ticker */}
            <div className="mt-8 pt-4 border-t border-slate-50 text-center">
              <p className="text-[10px] font-semibold text-[#9CA3AF] tracking-wide">
                Selling since 2026 · Jummall
              </p>
            </div>
          </aside>

          <section className="flex-1 w-full space-y-6">
            {activeTab === 0 && <VendorDashboardView />}
            {activeTab === 1 && <VendorOrdersView />}
            {activeTab === 2 && <VendorProductsView />}
            {activeTab === 3 && <VendorChatsView />}
            
            {/* General setup page components links */}
            {activeTab === 4 && <VendorStoreView onNavigate={(id) => setActiveTab(id)} />}
            {activeTab === 5 && <VendorAutoRepliesView onBack={() => setActiveTab(4)} />}
            {activeTab === 6 && <VendorEditInfoView onBack={() => setActiveTab(4)} />}
            {activeTab === 7 && <VendorBrandingView onBack={() => setActiveTab(4)} />}
            {activeTab === 8 && <VendorBankView onBack={() => setActiveTab(4)} />}
            {activeTab === 9 && <VendorReportsView onBack={() => setActiveTab(4)} />}

            {/* The 4 brand new active Account & Help segments */}
            {activeTab === 10 && <VendorPersonalInfoView onBack={() => setActiveTab(4)} />}
            {activeTab === 11 && <VendorSecurityView onBack={() => setActiveTab(4)} />}
            {activeTab === 12 && <VendorSupportView onBack={() => setActiveTab(4)} />}
            {activeTab === 13 && <VendorAboutView onBack={() => setActiveTab(4)} />}
          </section>

        </div>
      </div>

      {/* ================= STRUCTURAL MOBILE BOTTOM BAR NAVIGATION ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEBED] px-2 py-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] flex items-center justify-around">
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center relative min-w-[64px] py-1 transition-all duration-150 rounded-md"
            >
              {/* Highlight active indicator backdrop tile envelope */}
              <div className={`p-2 rounded-[14px] transition-all duration-200 ${
                isActive ? "bg-[#E5F4FA] text-[#149FCD]" : "text-[#55585B]"
              }`}>
                <IconComponent 
                  size={20} 
                  className={isActive ? "stroke-[2.5] text-[#149FCD]" : "stroke-[2]"} 
                />
              </div>
              
              {/* Label tracking parameters */}
              <span className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                isActive ? "text-[#149FCD] font-bold" : "text-[#55585B] font-medium"
              }`}>
                {item.label}
              </span>

              {/* Dynamic boundary rendering for mobile layout viewport metrics */}
              {item.badge > 0 && (
                <span className="absolute top-1 right-3 bg-[#EF4444] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}