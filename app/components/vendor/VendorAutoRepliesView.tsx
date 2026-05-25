'use client';

import {toast} from "sonner";
import React, { useState } from "react";
import { ArrowLeft, MessageSquare, Save, Loader2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAutoRepliesAPI, createAutoReplyAPI, updateAutoReplyAPI, AutoReplyRuleAPI } from "../../lib/api/auth";

interface VendorAutoRepliesViewProps {
  onBack: () => void;
}

export default function VendorAutoRepliesView({ onBack }: VendorAutoRepliesViewProps) {
  const queryClient = useQueryClient();

  // --- LOCAL MUTATION BUFFER TRACKING ---
  // We keep local state for edits, initializing them as null to detect if the user has typed anything yet
  const [localIsEnabled, setLocalIsEnabled] = useState<boolean | null>(null);
  const [localWelcomeMessage, setLocalWelcomeMessage] = useState<string | null>(null);
  const [localOffHoursMessage, setLocalOffHoursMessage] = useState<string | null>(null);

  // 1. Fetch server rules list using TanStack Query
  const { data: rulesList = [], isLoading, isFetching } = useQuery<AutoReplyRuleAPI[]>({
    queryKey: ["vendorAutoReplies"],
    queryFn: fetchAutoRepliesAPI,
    staleTime: 1000 * 60 * 5,
  });

  // Extract rule matches on the fly during render execution (no useEffect needed!)
  const welcomeRule = rulesList.find(r => r.trigger_type === 'welcome') || null;
  const awayRule = rulesList.find(r => r.trigger_type === 'away') || null;

  // Deriving active states directly from server data or local updates
  const isEnabled = localIsEnabled ?? (!!welcomeRule?.is_enabled || !!awayRule?.is_enabled);
  const welcomeMessage = localWelcomeMessage ?? (welcomeRule?.message_content || "");
  const offHoursMessage = localOffHoursMessage ?? (awayRule?.message_content || "");

  // 2. Atomic mutation handling rule updates
  const saveSettingsMutation = useMutation({
    mutationFn: async () => {
      const processRuleSaving = async (
        currentRule: AutoReplyRuleAPI | null,
        type: 'welcome' | 'away',
        textValue: string
      ) => {
        if (currentRule) {
          return await updateAutoReplyAPI(currentRule.id, {
            message_content: textValue.trim(),
            is_enabled: isEnabled
          });
        } else {
          return await createAutoReplyAPI({
            trigger_type: type,
            message_content: textValue.trim(),
            is_enabled: isEnabled
          });
        }
      };

      return await Promise.all([
        processRuleSaving(welcomeRule, 'welcome', welcomeMessage),
        processRuleSaving(awayRule, 'away', offHoursMessage)
      ]);
    },
    onSuccess: () => {
      // Clear local buffer overrides on success so the view falls back to fresh server states
      setLocalIsEnabled(null);
      setLocalWelcomeMessage(null);
      setLocalOffHoursMessage(null);
      queryClient.invalidateQueries({ queryKey: ["vendorAutoReplies"] });
      toast.error("Auto-reply metrics successfully synchronized on servers!");
    },
    onError: (err: unknown) => {
      console.error("Auto replies sync crash loop error:", err);
      const errorInstance = err as { response?: { data?: { message?: string } } };
      const backendMessage = errorInstance.response?.data?.message || "Verify your connection profile thresholds.";
      toast.error(`Failed storing updated templates: ${backendMessage}`);
    }
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsMutation.mutate();
  };

  const handleManualRefresh = () => {
    // Wipe local user buffers on manual reload requests to fetch pristine values
    setLocalIsEnabled(null);
    setLocalWelcomeMessage(null);
    setLocalOffHoursMessage(null);
    queryClient.invalidateQueries({ queryKey: ["vendorAutoReplies"] });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-[#149FCD]" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing message templates...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      
      {/* --- HEADER NAVIGATION CONTROL PANEL --- */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 select-none">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={onBack}
            className="w-10 h-10 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <ArrowLeft size={16} className="stroke-[2.5]" />
          </button>
          <div>
            <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Store settings</span>
            <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Auto-replies</h1>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleManualRefresh}
          disabled={isFetching}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all shadow-sm disabled:opacity-40 focus:outline-none"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin text-[#149FCD]" : ""} />
        </button>
      </div>

      {/* --- EXPLANATORY INFORMATION ACCENT STRIP --- */}
      <div className="bg-[#E5F4FA] border border-[#149FCD]/20 p-4 rounded-sm flex items-start gap-4 shadow-2xs select-none">
        <div className="w-10 h-10 rounded-md bg-[#149FCD]/10 flex items-center justify-center text-[#149FCD] shrink-0">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-[#1B4D5E] uppercase tracking-tight">Convert buyers while you sleep</h4>
          <p className="text-xs font-medium text-slate-500 leading-normal">
            Automated instantaneous response rules keep your storefront reply time matrices down, signaling high engagement rates to Jummall algorithms.
          </p>
        </div>
      </div>

      {/* --- CORE FORM DATA ENTRY CONFIGURATOR --- */}
      <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
        
        {/* Toggle Switch Component Row */}
        <div className="bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm flex items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]">
              <MessageSquare size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-800">Enable Auto-replies</h4>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">Toggle instant automated text messaging</p>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => setLocalIsEnabled(!isEnabled)}
            className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center shrink-0 ${
              isEnabled ? "bg-[#149FCD]" : "bg-slate-200"
            }`}
            style={{ minWidth: "40px", height: "22px" }}
          >
            <div 
              className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200"
              style={{ transform: isEnabled ? "translateX(18px)" : "translateX(2px)" }}
            />
          </button>
        </div>

        {isEnabled && (
          <div className="space-y-6 animate-in slide-in-from-top-4 duration-200">
            
            {/* Welcome Instant Text Input Card */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">First Contact Welcome Message</label>
              <div className="border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                <textarea 
                  rows={3}
                  maxLength={250}
                  value={welcomeMessage}
                  onChange={(e) => setLocalWelcomeMessage(e.target.value)}
                  placeholder="Hello! Thanks for reaching out to our store. We've captured your query and our team will check it right away! 🚀"
                  className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white resize-none custom-sidebar-scroll"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold px-1 select-none">
                <span className="flex items-center gap-1"><AlertCircle size={11} /> Sent when a buyer initiates a fresh dialogue block</span>
                <span>{welcomeMessage.length} / 250</span>
              </div>
            </div>

            {/* Vacation / Off-Hours Alternate Message Input Card */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Off-Hours / Away Automated Response</label>
              <div className="border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                <textarea 
                  rows={3}
                  maxLength={250}
                  value={offHoursMessage}
                  onChange={(e) => setLocalOffHoursMessage(e.target.value)}
                  placeholder="Hi there! We are currently closed or out on dispatch logs. We will look through your queries as soon as business hours hit tomorrow morning! 🌤️"
                  className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white resize-none custom-sidebar-scroll"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold px-1 select-none">
                <span className="flex items-center gap-1"><AlertCircle size={11} /> Fired when Vacation Mode triggers are activated</span>
                <span>{offHoursMessage.length} / 250</span>
              </div>
            </div>

          </div>
        )}

        {/* Action Button Control Row */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saveSettingsMutation.isPending}
            className="bg-[#143D4A] hover:bg-slate-800 disabled:bg-slate-100 text-white px-6 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:text-slate-400 disabled:shadow-none focus:outline-none select-none"
          >
            {saveSettingsMutation.isPending ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#149FCD]" /> Synchronizing...
              </>
            ) : (
              <>
                <Save size={14} /> Commit Changes
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}