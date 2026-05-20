'use client';

import React, { useState } from "react";
import { 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Box, 
  Check, 
  CornerDownLeft, 
  Pin,
  RefreshCw
} from "lucide-react";

interface ChatThread {
  id: string;
  partnerName: string;
  avatarGradient: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  orderNumber?: string;
  isLastMessageMine?: boolean;
}

// Data array modeled precisely from your chat layout requirements
const initialChats: ChatThread[] = [
  {
    id: "thread-1",
    partnerName: "Amadi Port-Harcourt",
    avatarGradient: "from-rose-500 to-orange-500",
    initials: "AP",
    lastMessage: "Please let me know when you pack the Premium Denim jeans, looking forward to delivery.",
    timestamp: "10 mins ago",
    unreadCount: 2,
    orderNumber: "99432",
  },
  {
    id: "thread-2",
    partnerName: "Chioma Chukwu",
    avatarGradient: "from-purple-600 to-indigo-600",
    initials: "CC",
    lastMessage: "I have dropped the release token. Can you check if it reflects on your dashboard yet?",
    timestamp: "1 hr ago",
    unreadCount: 1,
    orderNumber: "98311",
  },
  {
    id: "thread-3",
    partnerName: "Tunde Lagos",
    avatarGradient: "from-teal-500 to-[#149FCD]",
    initials: "TL",
    lastMessage: "Awesome doing business with you, the travel bundle hotspot is working perfectly!",
    timestamp: "Yesterday",
    unreadCount: 0,
    orderNumber: "97204",
    isLastMessageMine: true,
  },
  {
    id: "thread-4",
    partnerName: "Bisi Adebayo",
    avatarGradient: "from-emerald-500 to-green-600",
    initials: "BA",
    lastMessage: "Hello merchant, do you have alternative color slots for this selfie ring light?",
    timestamp: "3 days ago",
    unreadCount: 0,
  }
];

export default function VendorChatsView() {
  const [chats, setChats] = useState<ChatThread[]>(initialChats);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Structural header status indicators
  const threadsNeedingReplies = chats.filter(c => c.unreadCount > 0).length;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  // Chat criteria matching processing rules
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (chat.orderNumber && chat.orderNumber.includes(searchQuery));
    
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return chat.unreadCount > 0;
    if (activeFilter === "With orders") return !!chat.orderNumber;
    return true;
  });

  const getFilterBadgeCount = (filterLabel: string) => {
    if (filterLabel === "Unread") return chats.filter(c => c.unreadCount > 0).length;
    return 0;
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* --- 12.1 CHATS CORE HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="text-left">
          <p className={`text-xs font-black uppercase tracking-widest ${threadsNeedingReplies > 0 ? "text-[#149FCD]" : "text-[#31B757]"}`}>
            {threadsNeedingReplies > 0 ? `${threadsNeedingReplies} need replies` : "All caught up"}
          </p>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-1">
            Buyer Chats
          </h1>
        </div>

        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCw size={16} className={`${loading ? "animate-spin text-[#149FCD]" : ""}`} />
        </button>
      </div>

      {/* --- 12.2 SEARCH INPUT preset --- */}
      <div className="relative border border-slate-200 rounded-sm bg-white overflow-hidden focus-within:border-[#149FCD] transition-colors shadow-sm">
        <input 
          type="text" 
          placeholder="Search buyers or order numbers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 pr-12 outline-none text-[13px] text-slate-600 bg-white font-medium"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      </div>

      {/* --- 12.3 HORIZONTAL FILTER CHIP CHANNELS --- */}
      <div className="w-full flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        {["All", "Unread", "With orders", "Closed"].map((label) => {
          const isActive = activeFilter === label;
          const badgeValue = getFilterBadgeCount(label);

          return (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-tight shrink-0 transition-all flex items-center gap-2 border shadow-sm ${
                isActive 
                  ? "bg-[#143D4A] border-[#143D4A] text-white" 
                  : "bg-white border-[#EAEBED] text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{label}</span>
              {badgeValue > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none transition-colors ${
                  isActive ? "bg-[#FFD43A] text-[#143D4A]" : "bg-slate-100 text-slate-500"
                }`}>
                  {badgeValue}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- 12.4 BOUNDARY DISPLAY MATRIX DISPATCHER --- */}
      {loading ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 shadow-sm min-h-[350px]">
          <div className="w-10 h-10 border-4 border-[#149FCD]/20 border-t-[#149FCD] rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 tracking-wide">Hydrating Conversation Threads...</p>
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[350px]">
          <div className="w-16 h-16 rounded-2xl bg-[#E5F4FA] flex items-center justify-center text-[#149FCD] border border-slate-100 mb-4">
            <MessageSquare size={26} className="stroke-[1.5]" />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase">No buyer chats yet</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
            Buyers can reach you from your store and product pages.
          </p>
        </div>
      ) : (
        /* --- 12.5 SELLER CHAT LIST TILE MATRIX GROUP --- */
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-100 overflow-hidden">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              className="p-4 flex items-start gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors group relative"
            >
              
              {/* Profile Avatar Unit displaying Initials */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${chat.avatarGradient} flex items-center justify-center text-white font-extrabold text-sm tracking-tight shrink-0 shadow-sm uppercase`}>
                {chat.initials}
              </div>

              {/* Chat Text Info Metadata Block Stack */}
              <div className="min-w-0 flex-1 space-y-1.5 text-left">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[13.5px] font-black text-slate-800 tracking-tight truncate group-hover:text-[#149FCD] transition-colors">
                    {chat.partnerName}
                  </h4>
                  <span className={`text-[10.5px] shrink-0 whitespace-nowrap ${chat.unreadCount > 0 ? "text-[#149FCD] font-bold" : "text-slate-400 font-medium"}`}>
                    {chat.timestamp}
                  </span>
                </div>

                {/* Embedded Reference Order Chip Row */}
                {chat.orderNumber && (
                  <div className="inline-flex items-center gap-1.5 bg-[#E5F4FA] text-[#149FCD] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
                    <Box size={10} className="stroke-[2.5]" />
                    <span>Order #{chat.orderNumber}</span>
                  </div>
                )}

                {/* Outgoing checklist message indicators previews */}
                <div className="flex items-start gap-1.5 pr-6">
                  {chat.isLastMessageMine && (
                    <CheckCircle2 size={13} className="text-[#149FCD] fill-[#E5F4FA] mt-0.5 shrink-0" />
                  )}
                  <p className={`text-[12.5px] leading-normal line-clamp-1 truncate ${chat.unreadCount > 0 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>

              {/* Interactive Circle Notification Counter Dot Overlays */}
              {chat.unreadCount > 0 && (
                <span className="absolute bottom-4 right-4 bg-[#149FCD] text-white text-[9px] font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center border border-white shadow-md shadow-sky-100">
                  {chat.unreadCount}
                </span>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}