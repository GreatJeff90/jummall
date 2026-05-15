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
    a: "Vendors prepare all products and package and process"
  },
  {
    q: "What support is available for vendors?",
    a: "We provide dedicated vendor support, training resources, and marketing tools to help you grow your business."
  }
];

export default function VendorFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      {/* Header matching image_1e1e5b.png */}
      <div className="mb-12">
        <h2 className="text-[40px] font-black text-[#001F3F] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-[#55585B] text-lg max-w-5xl leading-relaxed">
          Everything you need to know about selling on JUMMALL. From registration to payments, delivery, and support, our Vendor FAQs provide clear answers to help you start, manage, and grow your business with confidence.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
        {faqData.map((item, index) => (
          <div key={index} className="border-b last:border-b-0 border-slate-200">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-8 py-7 flex items-center justify-between text-left group hover:bg-slate-50 transition-colors"
            >
              <span className={`text-lg   transition-colors ${
                openIndex === index ? 'text-[#149fcd]' : 'text-[#149fcd]'
              }`}>
                {item.q}
              </span>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-400 transition-all">
                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>

            {/* Answer Content */}
            <div className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-[#55585B] font-medium leading-relaxed max-w-4xl">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}