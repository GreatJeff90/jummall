'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Box, 
  RefreshCw,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchActiveChatThreadsAPI, markThreadAsReadAPI, ChatThreadBackend } from "../../lib/api/auth";

export default function VendorChatsView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Compute filtering parameters directly for query keys
  const filterParam = activeFilter === "All" ? undefined : activeFilter.toLowerCase().replace(" ", "-");

  // 1. Synchronize conversation feeds using a reactive TanStack Query hook layer
  const { data: chats = [], isLoading, isFetching } = useQuery<ChatThreadBackend[]>({
    queryKey: ["vendorChatThreads", filterParam],
    queryFn: () => fetchActiveChatThreadsAPI({ filter: filterParam }),
    staleTime: 1000 * 30, // Threads remain fresh for 30 seconds
    refetchOnWindowFocus: true,
  });

  // 2. Encapsulate read receipts acknowledgement within a high-performance useMutation wrapper
  const markAsReadMutation = useMutation({
    mutationFn: markThreadAsReadAPI,
    onMutate: async (chatId) => {
      // Cancel outbound structural re-fetches to safeguard optimistic changes
      await queryClient.cancelQueries({ queryKey: ["vendorChatThreads", filterParam] });

      // Take a snapshot of the preceding cache context state lines
      const previousChats = queryClient.getQueryData<ChatThreadBackend[]>(["vendorChatThreads", filterParam]);

      // Optimistically overwrite the target index count state directly in memory
      if (previousChats) {
        queryClient.setQueryData<ChatThreadBackend[]>(
          ["vendorChatThreads", filterParam],
          previousChats.map(c => c.id === chatId ? { ...c, unread_messages_count: 0 } : c)
        );
      }

      return { previousChats };
    },
    onError: (_err, _chatId, context) => {
      // Revert caching layer to snapshot states if database nodes drop transaction writes
      if (context?.previousChats) {
        queryClient.setQueryData(["vendorChatThreads", filterParam], context.previousChats);
      }
    },
    onSuccess: (_data, chatId) => {
      queryClient.invalidateQueries({ queryKey: ["vendorChatThreads"] });
      router.push(`/seller/chats?active=${chatId}`);
    }
  });

  const handleManualRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["vendorChatThreads", filterParam] });
  };

  const handleOpenConversation = (chatId: string) => {
    markAsReadMutation.mutate(chatId);
  };

  // Compute live contextual layout markers straight from server states
  const threadsNeedingReplies = chats.filter(c => c.unread_messages_count > 0).length;

  const filteredChats = chats.filter(chat => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      chat.partner_name.toLowerCase().includes(query) || 
      chat.last_message_content.toLowerCase().includes(query) ||
      (chat.associated_order_id && chat.associated_order_id.includes(query))
    );
  });

  const getFilterBadgeCount = (filterLabel: string) => {
    if (filterLabel === "Unread") return chats.filter(c => c.unread_messages_count > 0).length;
    if (filterLabel === "With orders") return chats.filter(c => !!c.associated_order_id).length;
    return 0;
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 text-left font-sans">
      
      {/* --- 12.1 CHATS CORE HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 select-none">
        <div>
          <p className={`text-xs font-black uppercase tracking-widest ${threadsNeedingReplies > 0 ? "text-[#149FCD]" : "text-[#31B757]"}`}>
            {threadsNeedingReplies > 0 ? `${threadsNeedingReplies} need replies` : "All caught up"}
          </p>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-1">
            Buyer Chats
          </h1>
        </div>

        <button 
          type="button"
          onClick={handleManualRefresh}
          disabled={isFetching}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-50 shadow-sm focus:outline-none"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin text-[#149FCD]" : ""} />
        </button>
      </div>

      {/* --- 12.2 SEARCH INPUT --- */}
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
      <div className="w-full flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 select-none">
        ={["All", "Unread", "With orders"].map((label) => {
          const isActive = activeFilter === label;
          const badgeValue = getFilterBadgeCount(label);

          return (
            <button
              type="button"
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-tight shrink-0 transition-all flex items-center gap-2 border shadow-sm focus:outline-none ${
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

      {/* --- 12.4 DATA LOAD BOUNDARY GRID LAYER --- */}
      {isLoading && chats.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 shadow-sm min-h-[350px]">
          <Loader2 size={32} className="animate-spin text-[#149FCD]" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Streaming conversation loops...</p>
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[350px] select-none">
          <div className="w-16 h-16 rounded-2xl bg-[#E5F4FA] flex items-center justify-center text-[#149FCD] border border-slate-100 mb-4">
            <MessageSquare size={26} className="stroke-[1.5]" />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase">No active channels discovered</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
            No communication lines matching this filter parameter are registered under your storefront logs.
          </p>
        </div>
      ) : (
        /* --- 12.5 SELLER CHAT LIST TILE MATRIX GROUP LOOP --- */
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-100 overflow-hidden animate-in fade-in duration-200">
          {filteredChats.map((chat) => {
            const hasUnread = chat.unread_messages_count > 0;
            const fallbackBg = chat.avatar_gradient_class || "from-slate-500 to-slate-600";
            return (
              <div 
                key={chat.id}
                onClick={() => handleOpenConversation(chat.id)}
                className="p-4 flex items-start gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors group relative"
              >
                
                {/* Profile Avatar Unit displaying Initials fallback tokens */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fallbackBg} flex items-center justify-center text-white font-extrabold text-sm tracking-tight shrink-0 shadow-xs uppercase select-none`}>
                  {chat.initials_fallback || chat.partner_name.slice(0, 2).toUpperCase()}
                </div>

                {/* Chat Information Container Stack */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-4 select-none">
                    <h4 className="text-[13px] font-bold text-slate-800 tracking-tight truncate group-hover:text-[#149FCD] transition-colors">
                      {chat.partner_name}
                    </h4>
                    <span className={`text-[10px] shrink-0 whitespace-nowrap ${hasUnread ? "text-[#149FCD] font-bold" : "text-slate-400 font-medium"}`}>
                      {chat.updated_at_human}
                    </span>
                  </div>

                  {/* Embedded Reference Order Chip Row */}
                  {chat.associated_order_id && (
                    <div className="inline-flex items-center gap-1.5 bg-[#E5F4FA] text-[#149FCD] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-2xs select-none">
                      <Box size={10} className="stroke-[2.5]" />
                      <span>Order #{chat.associated_order_id}</span>
                    </div>
                  )}

                  {/* Outgoing checklist check indicators previews */}
                  <div className="flex items-start gap-1.5 pr-6">
                    {chat.is_last_message_by_me && (
                      <CheckCircle2 size={13} className="text-[#149FCD] fill-[#E5F4FA] mt-0.5 shrink-0" />
                    )}
                    <p className={`text-[12px] leading-normal line-clamp-1 truncate ${hasUnread ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                      {chat.last_message_content}
                    </p>
                  </div>
                </div>

                {/* Interactive Circle Notification Counter Dot Overlays */}
                {hasUnread && (
                  <span className="absolute bottom-4 right-4 bg-[#149FCD] text-white text-[9px] font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center border border-white shadow-md shadow-sky-100 select-none animate-pulse">
                    {chat.unread_messages_count}
                  </span>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}