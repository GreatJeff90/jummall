import { useEffect, useRef, useState } from 'react';

export interface ChatMessage {
  id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'image' | 'product' | 'order';
  created_at: string;
}

export function useChatSocket(chatId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // Ensure the endpoint matches your seller-specific WebSocket route
    const socketUrl = `${protocol}://${window.location.host}/ws/seller/chats/${chatId}`;
    
    ws.current = new WebSocket(socketUrl);

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          setMessages((prev) => [...prev, data.payload as ChatMessage]);
        }
        if (data.type === 'typing') {
          setIsTyping(data.is_typing as boolean);
        }
      } catch (err) {
        console.error("Failed parsing WebSocket message:", err);
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [chatId]);

  const sendMessage = (content: string, type: ChatMessage['type']) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, content }));
    }
  };

  const sendTyping = (isTypingStatus: boolean) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'typing', is_typing: isTypingStatus }));
    }
  };

  return { messages, isTyping, sendMessage, sendTyping };
}