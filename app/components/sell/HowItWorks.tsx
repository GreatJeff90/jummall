'use client';

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "1. Register:",
    content: "Sign up as a vendor in minutes with simple onboarding.",
  },
  {
    title: "2. List Products:",
    content: "Upload your items with clear descriptions, images, and pricing.",
  },
  {
    title: "3. Sell and Earn",
    content: "Customers shop, you get paid securely through JUMMALL's trusted payment system.",
  },
  {
    title: "4. Grow:",
    content: "Use our marketing tools, analytics, and support to expand your business and reach new customers.",
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-[#001F3F] font-montserrat">
          How It Works (Step-by-Step Guide)
        </h2>
      </div>

      <div className="border border-slate-200 rounded-sm bg-white overflow-hidden">
        {steps.map((step, index) => (
          <div key={index} className="border-b last:border-b-0 border-slate-200">
            <button
              onClick={() => setActiveStep(activeStep === index ? null : index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-slate-50 group"
            >
              <span className={`text-lg   transition-colors ${
                activeStep === index ? 'text-[#149fcd]' : 'text-slate-900 group-hover:text-[#149fcd]'
              }`}>
                {step.title}
              </span>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#149fcd] group-hover:text-[#149fcd] transition-all">
                {activeStep === index ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            
            {activeStep === index && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                <p className="text-slate-500 font-medium leading-relaxed max-w-4xl">
                  {step.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}