'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/app/hooks/useEcosystem";
import { useMutation } from "@tanstack/react-query";
import { createMarketplaceOrderAPI, initializeOrderPaymentAPI, CartItemAPI } from "../lib/api/auth";

export default function CheckoutPage() {
  // Local Shipping Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Rivers State",
  });

  // 1. Consume the global dynamic caching layer directly
  const { data: cartData, isLoading: loadingCart } = useCart();
  const cartItems: CartItemAPI[] = cartData?.items || [];
  const subtotal: number = cartData?.subtotal || 0;

  const deliveryFee = 2500; // Flat local logistics shipping line item
  const totalAmount = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  // 2. Encapsulate the order submission pipeline inside an optimized TanStack Mutation
  const orderSubmissionMutation = useMutation({
    mutationFn: async () => {
      if (cartItems.length === 0) throw new Error("Your cart is empty.");

      // STEP A: Construct payload using data elements mapped straight out of active cart arrays
      const freshOrder = await createMarketplaceOrderAPI({
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        })),
        shipping_address: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          address_line: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        }
      });

      const orderTargetId = freshOrder.id || freshOrder.order_id;

      // STEP B: Initialize Paystack gateway secure transaction token maps
      return await initializeOrderPaymentAPI(orderTargetId);
    },
    onSuccess: (paymentConfig) => {
      // Forward user viewport safely to Paystack's payment gate URL
      if (paymentConfig?.authorization_url) {
        window.location.href = paymentConfig.authorization_url;
      } else {
        alert("Payment gateway communication link dropped unexpectedly.");
      }
    },
    onError: (err: unknown) => {
  console.error("Checkout submission failed:", err);
  
  // Cast securely using an inline structural layout wrapper interface
  const errorInstance = err as { response?: { data?: { message?: string } } };
  const backendMessage = errorInstance.response?.data?.message || "Authentication token invalid. Please log back into your profile.";
  alert(`Order placement stopped: ${backendMessage}`);
}
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    orderSubmissionMutation.mutate();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(value).replace("NGN", "₦");
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
      <div className="relative h-44 md:h-32 md:mb-12 w-full flex items-center overflow-hidden border-b border-slate-100 select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Checkout Header Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col items-start text-left">
          <h1 className="text-3xl font-black text-[#0F172A] font-montserrat uppercase tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Link href="/" className="hover:text-[#149fcd]">Home</Link> <span className="text-slate-300">/</span> <span className="text-[#149fcd]">Checkout</span>
          </p>
        </div>
      </div>

      {/* --- MAIN INTERACTIVE CONTAINER --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-montserrat mb-8 text-left select-none">
          Checkout
        </h1>

        {loadingCart && !cartData ? (
          <div className="w-full bg-white border border-slate-100 rounded-sm p-24 flex flex-col items-center justify-center text-center space-y-3 min-h-[400px]">
            <Loader2 size={32} className="animate-spin text-[#149FCD]" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Assembling active order parameters...</p>
          </div>
        ) : cartItems.length === 0 ? (
          /* --- CLEAN EMPTY CHECKOUT PROFILE STATE --- */
          <div className="w-full bg-slate-50 border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center text-center rounded-sm min-h-[350px] select-none">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
              <ShoppingBag size={22} className="stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Your checkout basket is empty</h3>
            <p className="text-xs font-medium text-slate-400 max-w-xs mt-1 leading-normal">
              You do not have any pending item orders staged inside your shopping cart to process right now.
            </p>
            <Link href="/shop" className="mt-5 h-11 px-6 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm flex items-center shadow-md transition-all">
              Return To Storefront
            </Link>
          </div>
        ) : (
          /* --- LIVE RENDER FEED WITH VALID CART SELECTIONS --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            
            {/* Billing Information Form Field Blocks (7 Columns) */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-sm space-y-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide border-b border-slate-50 pb-3 text-left">
                Billing details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">First name *</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Last name *</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
              </div>

              <div className="text-left">
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Delivery Address *</label>
                <input required type="text" placeholder="Street address, apartment, suite" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Town / City *</label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">State *</label>
                  <input required type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Email address *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-3 text-left select-none">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Payment Gateway</h3>
                <div className="border border-slate-200 rounded-sm p-4 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-[#149fcd]" />
                    <span className="text-xs font-bold text-slate-700">Pay via Card / Bank Transfer (Paystack)</span>
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest bg-sky-100 text-sky-700 px-2 py-0.5 rounded-sm">Secure</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={orderSubmissionMutation.isPending}
                className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-md mt-4 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none"
              >
                {orderSubmissionMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#149fcd]" /> Connecting to Paystack gateway...
                  </>
                ) : (
                  <>Place Order {formatCurrency(totalAmount)}</>
                )}
              </button>
            </form>

            {/* Checkout Sidebar Summary Block (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm space-y-4">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3 text-left select-none">
                  Your Order
                </h2>

                <div className="divide-y divide-slate-200/60 max-h-[380px] overflow-y-auto custom-sidebar-scroll pr-1">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center py-3 first:pt-0 last:pb-0">
                      <div className="relative w-14 h-16 bg-white border border-slate-200 rounded-sm overflow-hidden shrink-0 flex items-center justify-center p-0.5 shadow-2xs">
                        <Image 
                          src={item.image_url || "/placeholder-product.png"} 
                          alt={item.name} 
                          fill 
                          sizes="56px"
                          className="object-contain p-1" 
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left space-y-0.5">
                        <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug" title={item.name}>{item.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.vendor_name || "Jummall Verified Retailer"}</p>
                        <div className="flex items-center justify-between pt-0.5">
                          <span className="text-[10px] text-slate-400 font-black">QTY: {item.quantity}</span>
                          <span className="text-xs font-black text-[#149fcd]">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs font-medium text-slate-600 select-none">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping (Flat Rate)</span>
                    <span className="text-slate-800 font-bold">{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-sm">
                    <span className="text-slate-800 font-black uppercase tracking-wide">Total</span>
                    <span className="text-base font-black text-slate-900">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </section>
    </main>
  );
}