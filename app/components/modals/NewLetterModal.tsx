'use client';

import {toast} from "sonner";
import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/app/lib/api/client';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [dismissPermanently, setDismissPermanently] = useState(false);

  // Automatically check dismiss tokens and pop modal after 2 seconds
  useEffect(() => {
    const isSuppressed = localStorage.getItem("suppress_newsletter_modal") === "true";
    if (isSuppressed) return;

    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Encapsulate subscription state tracking cleanly via a TanStack Mutation handler
  const subscribeMutation = useMutation({
    mutationFn: async (targetEmail: string) => {
      const response = await api.post('/newsletter/subscribe', { email: targetEmail });
      return response.data;
    },
    onSuccess: () => {
      if (dismissPermanently) {
        localStorage.setItem("suppress_newsletter_modal", "true");
      }
      toast.error("Successfully subscribed to the Jummall newsletter! Check your inbox for your 5% discount code.");
      setIsOpen(false);
    },
    onError: (err: unknown) => {
  const errorInstance = err as { response?: { data?: { message?: string } } };
  const backendMessage = errorInstance.response?.data?.message || "Something went wrong. Please check your network connection.";
  toast.error(`Subscription failed: ${backendMessage}`);
}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || subscribeMutation.isPending) return;
    subscribeMutation.mutate(email.trim());
  };

  const handleClose = () => {
    if (dismissPermanently) {
      localStorage.setItem("suppress_newsletter_modal", "true");
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 focus:outline-none"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image 
            src="/contact-img.jpg" 
            alt="Newsletter Campaign Feature Showcase" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2 select-none">
            Newsletter
          </p>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-tight text-slate-900 mb-4 uppercase">
            Subscribe Now
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            {"Subscribe to our newsletter and get 5% off your first purchase"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-800 mb-2 select-none">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter Your Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#22A7D0]/20 focus:border-[#22A7D0] transition-all bg-white"
                required
                disabled={subscribeMutation.isPending}
              />
            </div>
            
            <button 
              type="submit"
              disabled={subscribeMutation.isPending}
              className="w-full bg-[#22A7D0] hover:bg-[#1a8bad] text-white py-3.5 rounded-md transition-colors font-black text-xs uppercase tracking-widest shadow-lg shadow-sky-100 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none focus:outline-none"
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin text-[#22A7D0]" /> Synchronizing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>

            <label className="flex items-center gap-3 cursor-pointer group mt-6 select-none">
              <input 
                type="checkbox" 
                checked={dismissPermanently}
                onChange={e => setDismissPermanently(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#22A7D0] focus:ring-[#22A7D0]" 
              />
              <span className="text-xs text-slate-500 font-semibold group-hover:text-slate-800 transition-colors">
                {"Don't show this popup again"}
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}