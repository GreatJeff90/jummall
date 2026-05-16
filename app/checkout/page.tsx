'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowLeft, Minus, Plus } from "lucide-react";
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  
  // Dynamic data received from the "coming from" product
  const productName = searchParams.get('name') || "17promax and 16promax Charger";
  const productPrice = Number(searchParams.get('price')) || 25000;
  const productImg = searchParams.get('img') || "/charger.jpg";
  const vendorName = searchParams.get('vendor') || "Danbaleri mobile business";

  return (
    <main className="bg-[#F8FBFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT COLUMN: Checkout Form --- */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 border border-slate-100 rounded-sm shadow-sm space-y-8">
              
              {/* Shipping Information */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800">Shipping information</h2>
                <p className="text-[12px] text-slate-500">
                  Account: <span className="font-bold text-slate-800">Neel Ade</span> - neelorneels@gmail.com 
                  <Link href="/logout" className="text-[#149fcd] ml-1">(Logout)</Link>
                </p>
                
                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Select available addresses:</label>
                  <div className="relative">
                    <select className="w-full appearance-none border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 outline-none bg-white">
                      <option>Plot 100 area c Nyanya, Abuja, Abuja</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="border-2 border-dashed border-[#149fcd] p-6 rounded-sm relative">
                  <span className="absolute top-2 right-4 text-[9px] font-bold text-[#149fcd] uppercase italic">Default</span>
                  <div className="space-y-1 text-[13px]">
                    <p className="font-bold text-slate-800">Neel Ade</p>
                    <p className="text-slate-500">Plot 100 area c Nyanya, Abuja, Abuja</p>
                    <p className="text-slate-500">Phone: +2349060690604</p>
                    <p className="text-slate-500 mt-2 italic">Email: neelorneels@gmail.com</p>
                  </div>
                </div>
              </section>

              {/* Billing Info */}
              <section className="pt-6 border-t border-slate-50">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Billing information</h2>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="sameAsShipping" defaultChecked className="w-4 h-4 rounded-sm text-[#149fcd] focus:ring-[#149fcd]" />
                  <label htmlFor="sameAsShipping" className="text-[13px] text-slate-500 font-medium cursor-pointer">Same as shipping information</label>
                </div>
              </section>

              {/* Payment Method */}
              <section className="pt-6 border-t border-slate-50">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Payment method</h2>
                <div className="border border-slate-200 p-6 rounded-sm flex items-center justify-between group cursor-pointer hover:border-[#149fcd] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-4 h-4 rounded-full border-4 border-[#149fcd]" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Pay online via Paystack</p>
                      <p className="text-[11px] text-slate-400 mt-1">Make your payments seamlessly via Paystack.</p>
                    </div>
                  </div>
                  <Image src="/paystack-logo.png" alt="Paystack" width={80} height={20} className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                </div>
              </section>

              {/* Order Notes */}
              <section className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Order notes</label>
                <textarea 
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full border border-slate-200 rounded-sm p-4 text-sm outline-none focus:border-[#149fcd] h-32"
                />
              </section>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="agree" className="w-4 h-4 rounded-sm text-[#149fcd] focus:ring-[#149fcd]" />
                <label htmlFor="agree" className="text-[12px] text-slate-500">I agree to the <Link href="/terms" className="text-[#149fcd] hover:underline">Terms and Privacy Policy</Link></label>
              </div>

              <div className="flex items-center justify-between pt-6">
                <Link href="/cart" className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-slate-800">
                  <ArrowLeft size={14} /> Back to cart
                </Link>
                <button className="bg-[#149fcd] hover:bg-[#118eb8] text-white font-black py-4 px-12 rounded-sm text-sm uppercase shadow-lg shadow-[#149fcd]/20">
                  Checkout
                </button>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Summary --- */}
          <div className="lg:w-[400px] space-y-4">
            <div className="bg-[#F1F5F9]/50 border border-slate-100 rounded-sm p-6">
               <h3 className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-widest">Product(s)</h3>
               
               {/* Vendor Block */}
               <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-[#FFF7ED] p-3 rounded-sm border border-orange-100">
                      <p className="text-[13px] font-bold text-slate-800">{vendorName}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-slate-200 text-[10px]">★</span>)}
                        <span className="text-[9px] text-slate-400 ml-1">(0 Reviews)</span>
                      </div>
                    </div>

                    <div className="flex gap-4 border-b border-slate-100 pb-6">
                      <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-sm overflow-hidden shrink-0">
                        <Image src={productImg} alt="Product" fill className="object-contain p-1" />
                        <span className="absolute top-0 right-0 bg-slate-400 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-bl-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[13px] font-bold text-slate-700 leading-tight pr-4">{productName}</h4>
                          <span className="text-[13px] font-black text-slate-900 shrink-0">₦{productPrice.toLocaleString()}.00</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">(Color: White)</p>
                        
                        <div className="flex items-center border border-slate-200 rounded-sm w-fit mt-4">
                           <button className="p-1 px-2 text-slate-400 hover:text-slate-800"><Minus size={12}/></button>
                           <span className="px-3 text-xs font-bold text-slate-700">1</span>
                           <button className="p-1 px-2 text-slate-400 hover:text-slate-800"><Plus size={12}/></button>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-3">
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Shipping method:</p>
                      {[
                        { id: 'pickup', label: 'store Pickup', price: 'Free shipping' },
                        { id: 'within', label: 'Within Abuja', price: '₦3,000.00' },
                        { id: 'outside', label: 'Outside Abuja', price: '₦5,000.00' }
                      ].map((method) => (
                        <div key={method.id} className="flex items-center justify-between border border-slate-200 p-3 rounded-sm bg-white cursor-pointer hover:border-[#149fcd]">
                          <div className="flex items-center gap-3">
                             <div className={`w-3.5 h-3.5 rounded-full border-2 ${method.id === 'pickup' ? 'border-[#149fcd]' : 'border-slate-200'}`} />
                             <span className="text-[11px] font-bold text-slate-700">{method.label}</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-900">{method.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>

               {/* Final Totals */}
               <div className="mt-12 pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-slate-400 font-medium">Shipping fee:</span>
                    <span className="text-slate-900 font-bold">Free shipping</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[14px] font-black text-slate-900">Total:</span>
                    <span className="text-xl font-black text-slate-900">₦{productPrice.toLocaleString()}.00</span>
                  </div>
               </div>
               
               <button className="w-full text-center mt-10 text-[11px] font-bold text-[#149fcd] hover:underline">
                 You have a coupon code?
               </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}