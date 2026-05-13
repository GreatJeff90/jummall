'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically show the modal after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image 
            src="/contact-img.jpg" 
            alt="Newsletter" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">
            Newsletter
          </p>
          <h2 className="text-3xl md:text-4xl   text-slate-900 mb-4">
            Subscribe Now
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            {"Subscribe to our newsletter and get 5% off your first purchase"}
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-xs   text-slate-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                required
              />
            </div>
            
            <button className="w-full bg-[#22A7D0] hover:bg-[#1a8bad] text-white py-3.5 rounded-md   transition-colors shadow-lg shadow-sky-200">
              Subscribe
            </button>

            <label className="flex items-center gap-3 cursor-pointer group mt-6">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
              />
              <span className="text-xs text-slate-500 font-medium group-hover:text-slate-800 transition-colors">
                {"Don't show this popup again"}
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}