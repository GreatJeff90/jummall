'use client';

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    q: "How do I become a vendor on JUMMALL?",
    a: "Sign up through our vendor registration page, provide your business details, and start listing products once approved."
  },
  {
    q: "What products can I sell?",
    a: "Vendors can sell across categories including electronics, fashion, home essentials, healthcare, gadgets, and more. Restricted items (e.g., counterfeit goods, hazardous products) are not allowed."
  },
  {
    q: "How do I get paid?",
    a: "Payments are processed securely through JUMMALL's payment system. Earnings are transferred to your bank account after successful order completion."
  },
  {
    q: "Who handles delivery?",
    a: "Vendors prepare and package all products. JUMMALL integrates with trusted logistics networks to ensure smooth, trackable, and safe distribution across Nigeria."
  },
  {
    q: "What support is available for vendors?",
    a: "We provide dedicated vendor support, training resources, and marketing tools to help you start, manage, and grow your business with confidence."
  }
];

export default function VendorFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      {/* Header section formatting */}
      <div className="mb-12 text-left select-none">
        <h2 className="text-[40px] font-black text-[#001F3F] mb-4 font-montserrat uppercase tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-[#55585B] text-base max-w-5xl leading-relaxed font-medium">
          Everything you need to know about selling on JUMMALL. From registration to payments, delivery, and support, our Vendor FAQs provide clear answers to help you start, manage, and grow your business with confidence.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="border border-slate-200 rounded-sm overflow-hidden bg-white shadow-xs">
        {faqData.map((item, index) => (
          <div key={index} className="border-b last:border-b-0 border-slate-200">
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full px-8 py-7 flex items-center justify-between text-left group hover:bg-slate-50/80 transition-colors focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className={`text-base font-bold uppercase tracking-tight transition-colors ${
                openIndex === index ? 'text-[#149fcd]' : 'text-slate-900 group-hover:text-[#149fcd]'
              }`}>
                {item.q}
              </span>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#149fcd] group-hover:text-[#149fcd] transition-all shrink-0">
                {openIndex === index ? <Minus size={16} className="stroke-[2.5]" /> : <Plus size={16} className="stroke-[2.5]" />}
              </div>
            </button>

            {/* Answer Content Wrapper */}
            <div className={`px-8 transition-all duration-300 ease-in-out overflow-hidden text-left ${
              openIndex === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-[#55585B] font-medium text-sm leading-relaxed max-w-4xl">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}