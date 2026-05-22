'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bell, 
  ShoppingBag, 
  MessageSquare, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  RefreshCw 
} from "lucide-react";
import { fetchNotificationsAPI, markNotificationsAsReadAPI, NotificationItemAPI } from "../lib/api/auth";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItemAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const syncNotificationsFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchNotificationsAPI();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed downloading notification feed array indices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeNotificationsTimeline = async () => {
      await syncNotificationsFeed();
    };
    initializeNotificationsTimeline();
  }, []);

  const handleMarkSingleAsRead = async (notificationId: string, currentReadState: boolean) => {
    if (currentReadState) return; // Skip if already processed
    try {
      // Optimistically flip the read status within local view vectors instantly
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      await markNotificationsAsReadAPI({ notification_ids: [notificationId] });
    } catch (err) {
      console.error("Failed executing unread mutation check payload:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0 || actionLoading) return;

    try {
      setActionLoading(true);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      await markNotificationsAsReadAPI({ notification_ids: unreadIds });
    } catch (err) {
      console.error("Failed converting all alert flags to read states:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag size={16} className="text-[#149FCD]" />;
      case "chat":
        return <MessageSquare size={16} className="text-purple-500" />;
      case "promotion":
        return <Sparkles size={16} className="text-amber-500" />;
      default:
        return <AlertCircle size={16} className="text-slate-400" />;
    }
  };

  const totalUnreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans antialiased pb-16">
      
      {/* ================= BREADCRUMB HEADER (Full Background Image Layout) ================= */}
      <div className="relative h-44 md:h-32 md:mb-12 w-full flex items-center overflow-hidden border-b border-slate-100 select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Notifications Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-16 flex flex-col items-start text-left">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight font-montserrat uppercase">Notifications</h1>
          <p className="text-[11px] font-black text-slate-500 mt-1.5 uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-[#149FCD] transition-colors">Home</Link> 
            <span className="text-slate-300">/</span> 
            <span className="text-[#149FCD]">Notifications</span>
          </p>
        </div>
      </div>

      {/* ================= CORE UTILITY LAYOUT WINDOW FRAME ================= */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* Controls Action Panel Block */}
        <div className="w-full flex items-center justify-between mb-4 select-none">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase text-[#149FCD] tracking-wider">Updates Center</p>
            <h2 className="text-sm font-bold text-slate-700 mt-0.5">
              {totalUnreadCount > 0 ? `${totalUnreadCount} unread notification alerts` : "No pending alert records"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {totalUnreadCount > 0 && (
              <button
                type="button"
                disabled={actionLoading || loading}
                onClick={handleMarkAllAsRead}
                className="text-xs font-black uppercase text-[#149FCD] hover:text-[#118eb8] tracking-wider transition-colors disabled:opacity-40"
              >
                Mark all as read
              </button>
            )}
            <button 
              type="button"
              onClick={syncNotificationsFeed}
              disabled={loading}
              className="w-9 h-9 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all disabled:opacity-40 shadow-xs"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-[#149FCD]" : ""} />
            </button>
          </div>
        </div>

        {/* Dynamic Hydration Display Layer Switcher */}
        {loading ? (
          <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 shadow-xs min-h-[300px]">
            <Loader2 size={32} className="animate-spin text-[#149FCD]" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing message queues...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="w-full bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center shadow-xs min-h-[300px] select-none">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Bell size={22} className="stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Your stream is empty</h3>
            <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
              When system messages or order actions trigger across Jummall engines, they will aggregate right here.
            </p>
          </div>
        ) : (
          /* ================= FEED ITEMS LIST MATRIX ================= */
          <div className="bg-white border border-[#EAEBED] rounded-sm shadow-xs divide-y divide-slate-100/80 overflow-hidden animate-in fade-in duration-200">
            {notifications.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleMarkSingleAsRead(item.id, item.is_read)}
                className={`p-4 md:p-5 flex gap-4 transition-colors relative text-left select-none ${
                  item.is_read ? "bg-white opacity-75" : "bg-sky-50/20 cursor-pointer hover:bg-sky-50/40"
                }`}
              >
                {/* Left Accent Bar Overlay indicating unread status values */}
                {!item.is_read && (
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#149FCD]" />
                )}

                {/* Conceptual Type Icon Badge Capsule wrapper */}
                <div className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center border ${
                  item.is_read ? "bg-slate-50 border-slate-100" : "bg-white border-slate-200"
                }`}>
                  {getAlertIcon(item.type)}
                </div>

                {/* Content Descriptions Text block stack */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className={`text-[13.5px] tracking-tight truncate pr-2 ${
                      item.is_read ? "text-slate-700 font-semibold" : "text-slate-900 font-black"
                    }`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap pt-0.5">
                      {item.created_at_human}
                    </span>
                  </div>
                  <p className={`text-[12.5px] leading-relaxed line-clamp-2 ${
                    item.is_read ? "text-slate-400 font-medium" : "text-slate-600 font-semibold"
                  }`}>
                    {item.message}
                  </p>
                </div>

                {/* Read Checklist Ring Marker Overlay */}
                {item.is_read && (
                  <div className="flex items-center text-slate-200 pl-2 shrink-0">
                    <CheckCircle2 size={14} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}