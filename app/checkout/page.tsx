'use client';

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";

// --- SUB-COMPONENT: READS SEARCH PARAMS SAFELY ---
function CheckoutFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract dynamic URL data sent over from buy now click triggers
  const productName = searchParams.get("name") || "Premium Item Bundle";
  const productPriceRaw = searchParams.get("price") || "0";
  const productVendor = searchParams.get("vendor") || "Jummall Official Seller";
  const productImage = searchParams.get("img") || "/jummall-logo.png";

  const productPrice = parseFloat(productPriceRaw);
  const deliveryFee = 2500; // Flat local logistics shipping line item
  const totalAmount = productPrice + deliveryFee;

  // Local Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // API placeholder boundary logic: Route straight to success view structure
    router.push("/customer/overview?order_success=true");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Billing Information Form Field Blocks (8 Columns) */}
      <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-sm space-y-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide border-b border-slate-50 pb-3">
          Billing details
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">First name *</label>
            <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">Last name *</label>
            <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 block mb-1.5">Delivery Address *</label>
          <input required type="text" placeholder="Street address, apartment, suite" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">Town / City *</label>
            <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">State *</label>
            <input required type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">Phone *</label>
            <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">Email address *</label>
            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd]" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Payment Gateway</h3>
          <div className="border border-slate-200 rounded-sm p-4 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-[#149fcd]" />
              <span className="text-xs font-bold text-slate-700">Pay via Card / Bank Transfer (Paystack)</span>
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest bg-sky-100 text-sky-700 px-2 py-0.5 rounded-sm">Secure</span>
          </div>
        </div>

        <button type="submit" className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-md mt-4">
          Place Order ₦{totalAmount.toLocaleString()}.00
        </button>
      </form>

      {/* Checkout Sidebar Summary Block (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm space-y-4">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3">
            Your Order
          </h2>

          {/* Active Product Line Card Item */}
          <div className="flex gap-4 items-center py-2">
            <div className="relative w-16 h-20 bg-white border border-slate-200 rounded-sm overflow-hidden p-1 shrink-0 flex items-center justify-center">
              <Image src={imageImageValid(productImage) ? productImage : "/jummall-logo.png"} alt={productName} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">{productName}</h3>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <span>{productVendor}</span>
                <CheckCircle2 size={10} className="fill-[#149fcd] text-white shrink-0" />
              </div>
              <p className="text-xs font-black text-[#149fcd]">₦{productPrice.toLocaleString()}.00</p>
            </div>
          </div>

          {/* Checkout Financial Matrices Calculations Tickers */}
          <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-800 font-bold">₦{productPrice.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping (Flat Rate)</span>
              <span className="text-slate-800 font-bold">₦{deliveryFee.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-sm">
              <span className="text-slate-800 font-black uppercase tracking-wide">Total</span>
              <span className="text-base font-black text-slate-900">₦{totalAmount.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Basic image endpoint safety utility helper
function imageImageValid(url: string) {
  return url.startsWith('/') || url.startsWith('http');
}

// --- LOADING FALLBACK PLACEHOLDER DURING HYDRATION DEFERMENT ---
function CheckoutSuspenseFallback() {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-sm p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm min-h-[400px]">
      <ShoppingBag size={48} className="text-slate-300 animate-bounce" />
      <p className="text-sm font-bold text-slate-500 animate-pulse">
        Securing checkout workspace parameters... Please wait.
      </p>
    </div>
  );
}

// ================= GLOBAL EXPORT PAGE =================
export default function CheckoutPage() {
  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- Breadcrumb Sub-Banner Row --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-xs font-medium text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#149fcd]">Home</Link> • 
            <span className="text-slate-400">Checkout</span>
          </div>
          <Link href="/shop" className="hover:text-[#149fcd] flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
            <ArrowLeft size={12} /> Return to Shop
          </Link>
        </div>
      </div>

      {/* --- Safe Outer Shell Wrap Container Frame --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-montserrat mb-8">
          Checkout
        </h1>

        {/* CRITICAL FIX: Wrapping the parameters consumer sub-module 
          safely inside Next.js core Suspense boundaries to fix compile crashes 
        */}
        <Suspense fallback={<CheckoutSuspenseFallback />}>
          <CheckoutFormContent />
        </Suspense>

      </section>
    </main>
  );
}