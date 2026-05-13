'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Headset, 
  ChevronDown, 
  Plus, 
  Minus,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import HowItWorks from "../components/sell/HowItWorks";
import VendorTestimonials from "../components/sell/VendorTestimonials";
import VendorFaq from "../components/sell/VendorFAQ";
import SellHero from "../components/sell/SellHero";

const features = [
  {
    title: "Expand Your Reach",
    desc: "Gain access to millions of customers across the region.",
    icon: <TrendingUp className="text-sky-500" size={28} />,
    bg: "bg-sky-50"
  },
  {
    title: "Secure Payments",
    desc: "Our escrow system ensures you get paid for every valid sale.",
    icon: <ShieldCheck className="text-blue-500" size={28} />,
    bg: "bg-blue-50"
  },
  {
    title: "Reliable Logistics",
    desc: "Let our delivery partners handle the heavy lifting for you.",
    icon: <Truck className="text-teal-500" size={28} />,
    bg: "bg-teal-50"
  },
  {
    title: "Vendor Support",
    desc: "Dedicated support to help you grow your business 24/7.",
    icon: <Headset className="text-indigo-500" size={28} />,
    bg: "bg-indigo-50"
  }
];



export default function SellOnJummall() {

  return (
    <main className="bg-white min-h-screen">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
              {/* Background Image using fill and object-cover */}
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              {/* Darker overlay for text readability if needed */}
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl   tracking-tight text-[#0F172A]">Sell on Jummall</h1>
                <p className="text-sm text-slate-500 mt-2   uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Login</span>
                </p>
              </div>
            </div>

      {/* --- MAIN CALL TO ACTION BANNER --- */}
       <SellHero />

      {/* --- FEATURE HIGHLIGHTS --- */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition-all group">
            <div className={`${f.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-3">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      <HowItWorks/>

      <VendorTestimonials />

      <VendorFaq />

     

      {/* --- BOTTOM CONVERSION --- */}
      <section className="max-w-7xl mx-auto px-4 py-24">
         <div className="bg-[#149fcd] rounded-[40px] py-20 px-8 text-center text-white relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-black mb-8 relative z-10">
  &quot;Your products. Our marketplace. One JUMMALL.&quot;
</h2>
            <button className="bg-orange-500 text-white px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 shadow-2xl relative z-10 transition-all">
               Become a Seller
            </button>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 border-8 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
         </div>
      </section>

    </main>
  );
}

// Minimalist User icon placeholder for testimonial
function User({ className, size }: { className?: string; size?: number }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}