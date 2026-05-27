'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Loader2, MailCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Clean backend pipeline handshake simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setHasSubscribed(true);
      toast.success("Welcome aboard! Your 5% discount code has been dispatched.");
      setEmail('');
    } catch {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-sans select-none">
      {/* Master Container: Deep Luxury Teal Gradient Box Canvas */}
      <div className="w-full bg-gradient-to-br from-[#104E5B] via-[#116273] to-[#14839C] rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg">
        
        {/* ================= BACKGROUND FLOATING ACCENT PARTICLES ================= */}
        <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-amber-400 opacity-80 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
        <div className="absolute bottom-16 right-16 w-2.5 h-2.5 rounded-full bg-amber-300 opacity-70 shadow-[0_0_6px_rgba(251,191,36,0.6)] animate-pulse" />
        <div className="absolute top-16 right-24 w-3 h-3 rounded-full border-2 border-amber-300/40 opacity-60" />
        <div className="absolute bottom-24 left-16 w-1.5 h-1.5 rounded-full bg-white/30" />
        <div className="absolute top-1/2 left-20 w-1 h-1 rounded-full bg-white/20" />

        {/* Dynamic Light Overlay Glow effect */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* ================= CONTENT BODY SECTION ================= */}
        <div className="max-w-2xl mx-auto relative z-10 space-y-5">
          
          {/* Top Pill Subtitle Badge */}
          <div className="w-full flex justify-center">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 text-amber-400 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-2xs">
              Join the list
            </span>
          </div>

          {/* Main Strategic Header Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black font-montserrat text-white tracking-tight leading-[1.05] uppercase">
            Get 5% off your<br />first order.
          </h2>

          {/* Paragraph copy descriptors */}
          <p className="text-xs sm:text-sm font-medium text-slate-200/80 leading-relaxed max-w-xl mx-auto">
            Be the first to hear about new arrivals, exclusive deals, and vendor drops. First 50 subscribers each week get a bonus voucher.
          </p>

          {/* ================= INTERACTIVE SUBSCRIPTION SYSTEM FORM ================= */}
          <div className="pt-4 max-w-lg mx-auto">
            {hasSubscribed ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-center gap-3 text-white animate-in fade-in zoom-in-95 duration-300">
                <MailCheck className="text-amber-400 stroke-[2.5]" size={20} />
                <span className="text-xs font-black uppercase tracking-wider">Verification link dispatched successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-[22px] flex items-center shadow-inner relative group focus-within:border-white/20 focus-within:bg-white/10 transition-all">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-300/60 font-semibold px-4 text-xs sm:text-sm h-12 disabled:opacity-50"
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FFD13B] hover:bg-[#ffc61a] text-slate-900 font-black text-xs uppercase tracking-widest px-6 sm:px-8 h-12 rounded-[16px] transition-all duration-300 shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Bottom Compliance Privacy Note Layout Line */}
          <p className="text-[10px] font-medium text-slate-300/60 pt-2 select-none">
            By subscribing, you agree to our <Link href="/terms" className="underline hover:text-white transition-colors">Terms & Privacy</Link>. Unsubscribe anytime.
          </p>

        </div>

      </div>
    </section>
  );
}