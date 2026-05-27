'use client';

import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="text-[#10B981]" size={20} strokeWidth={2} />,
    bgIcon: "bg-[#E6F4EA]", // Clean soft pastel emerald green for escrow trust
    title: "Escrow protected",
    description: "Funds released only on delivery",
  },
  {
    icon: <Truck className="text-[#0284c7]" size={20} strokeWidth={2} />,
    bgIcon: "bg-[#E0F2FE]", // Soft blue badge
    title: "Free shipping",
    description: "On orders over ₦100,000",
  },
  {
    icon: <RotateCcw className="text-[#64748B]" size={20} strokeWidth={2} />,
    bgIcon: "bg-[#F1F5F9]", // Neutral slate gray badge
    title: "Easy returns",
    description: "7-day return window",
  },
  {
    icon: <Headphones className="text-[#475569]" size={20} strokeWidth={2} />,
    bgIcon: "bg-[#F1F5F9]",
    title: "24/7 support",
    description: "Chat or call anytime",
  },
];

export default function FeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 select-none font-sans">
      {/* Unified minimalist background bar wrapper matching the luxury look */}
      <div className="w-full bg-[#FAFAFA] rounded-2xl border border-slate-100/70 py-6 px-8 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 items-center">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 text-left w-full lg:px-4 ${
                index > 0 ? "lg:border-l lg:border-slate-200/60" : ""
              }`}
            >
              {/* Premium rounded structural icon container */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${feature.bgIcon} shadow-3xs`}>
                {feature.icon}
              </div>
              
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight uppercase font-montserrat">
                  {feature.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 leading-normal tracking-wide">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}