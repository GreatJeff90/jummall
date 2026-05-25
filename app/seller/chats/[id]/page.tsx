'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useChatSocket } from '@/app/hooks/useChatSocket';
import { api } from '@/app/lib/api/client';
import { Loader2, Send } from 'lucide-react';

export default function SellerChatPage({ params }: { params: { id: string } }) {
  const chatId = params.id;
  const { messages, isTyping, sendMessage, sendTyping } = useChatSocket(chatId);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['sellerChatMessages', chatId],
    queryFn: ({ pageParam }) => api.get(`/seller/chats/${chatId}/messages?cursor=${pageParam}`),
    getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    initialPageParam: 0
  });

  return (
    <div className="flex flex-col h-[80vh] bg-white border border-slate-100 shadow-sm rounded-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 font-black text-xs uppercase tracking-wider text-slate-700">
        Active Conversation #{chatId.slice(0, 8)}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {data?.pages.flatMap(p => p.data.messages).map(m => (
          <div key={m.id} className="text-sm font-semibold">{m.content}</div>
        ))}
        {messages.map((m, i) => (
          <div key={i} className="text-sm font-semibold text-[#149fcd]">{m.content}</div>
        ))}
        {isTyping && <div className="text-[10px] italic text-slate-400">Buyer is typing...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 flex gap-2">
        <input 
          className="flex-1 border border-slate-200 px-4 py-2 text-sm rounded-sm focus:outline-none focus:border-[#149fcd]"
          placeholder="Type a response..."
          onFocus={() => sendTyping(true)}
          onBlur={() => sendTyping(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              sendMessage(e.currentTarget.value, 'text');
              e.currentTarget.value = '';
            }
          }}
        />
        <button className="bg-[#149fcd] p-2 text-white rounded-sm"><Send size={18} /></button>
      </div>
    </div>
  );
}