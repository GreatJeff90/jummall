'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag, Loader2, ArrowLeft, X } from "lucide-react";
import { fetchMyCart, updateCartItemQuantity, removeCartItem, CartItemBackend, CartResponse } from "../lib/api/auth";

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadCartData = async () => {
    try {
      setLoading(true);
      const data = await fetchMyCart();
      setCart(data);
    } catch (err) {
      console.error("Error retrieving user shopping cart state metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeCartLifecycle = async () => {
      await loadCartData();
    };
    initializeCartLifecycle();
  }, []);

  const handleQuantityAdjust = async (productId: string, currentQty: number, increment: boolean) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
      setUpdatingId(productId);
      const updatedCart = await updateCartItemQuantity(productId, newQty);
      setCart(updatedCart);
    } catch (err) {
      alert("Failed to adjust item threshold count. Verify inventory limits.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    if (!window.confirm("Remove item from shopping cart registry?")) return;
    try {
      setUpdatingId(productId);
      const updatedCart = await removeCartItem(productId);
      setCart(updatedCart);
    } catch (err) {
      alert("Removal sequence failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value).replace("NGN", "₦");
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 bg-white border border-slate-100 rounded-sm my-12 max-w-7xl mx-auto px-4">
        <div className="w-10 h-10 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400">Loading your shopping basket details...</p>
      </div>
    );
  }

  const items = cart?.items || [];

  return (
    <div className="w-full bg-[#f4f7f9]/50 min-h-screen pb-24 text-left font-sans">
      
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl tracking-tight text-[#0F172A]">Shopping Cart</h1>
                <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Shopping Cart</span>
                </p>
              </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 md:px-16">
        {/* --- CONDITIONAL SCREEN STATE BOUNDARY --- */}
        {items.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100">
              <ShoppingBag size={30} className="stroke-1" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Your shopping cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                You haven&apos;t added any items to your queue yet. Head over to our catalog to fill up your bag!
              </p>
            </div>
            <Link href="/shop" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-3.5 px-8 rounded-sm transition-all uppercase tracking-wider shadow-sm">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- LEFT SIDE: CART ENTRIES RAIL BLOCK (Spans 8 Columns) --- */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-xs">
                <table className="w-full border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-[#010F1C] bg-[#F8FAFC] tracking-tight text-left">
                      <th className="py-4 px-6 w-[45%]">Product</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4 text-center">Quantity</th>
                      <th className="py-4 px-4">Total</th>
                      <th className="py-4 px-6 text-center w-14"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/70">
                    {items.map((item) => (
                      <tr key={item.product_id} className={`transition-all ${updatingId === item.product_id ? 'opacity-40 pointer-events-none' : ''}`}>
                        
                        {/* Product Data Meta Column */}
                        <td className="py-6 px-6 flex items-center gap-5 text-left">
                          <div className="relative w-16 h-20 bg-[#F8FAFC] border border-slate-100 rounded-sm overflow-hidden shrink-0 shadow-2xs">
                            <Image 
                              src={item.image_url || "/placeholder-product.png"} 
                              alt={item.product_name} 
                              fill 
                              className="object-contain p-1.5" 
                            />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-[14px] leading-tight hover:text-[#149fcd] transition-colors cursor-pointer truncate max-w-[260px]" title={item.product_name}>
                              {item.product_name}
                            </h4>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">
                              In stock
                            </p>
                            {item.vendor_name && (
                              <p className="text-[11px] text-slate-400 font-medium">
                                Vendor: <span className="text-slate-600 font-bold">{item.vendor_name}</span>
                              </p>
                            )}
                            {item.color && (
                              <p className="text-[11px] text-slate-400 italic">Color: {item.color}</p>
                            )}
                          </div>
                        </td>

                        {/* Price Column */}
                        <td className="py-6 px-4 font-bold text-[#010F1C] text-sm tracking-tight">
                          {formatCurrency(item.price)}
                        </td>

                        {/* Quantity Counter Action Rails */}
                        <td className="py-6 px-4">
                          <div className="flex items-center border border-slate-200 rounded-sm w-fit mx-auto bg-white h-8 shadow-2xs">
                            <button 
                              type="button"
                              onClick={() => handleQuantityAdjust(item.product_id, item.quantity, false)}
                              className="px-2.5 text-slate-400 hover:text-[#010F1C] h-full transition-colors flex items-center"
                            >
                              <Minus size={10} className="stroke-[2.5]" />
                            </button>
                            <span className="px-2 text-xs font-black text-[#010F1C] min-w-[24px] text-center select-none">
                              {item.quantity}
                            </span>
                            <button 
                              type="button"
                              onClick={() => handleQuantityAdjust(item.product_id, item.quantity, true)}
                              className="px-2.5 text-slate-400 hover:text-[#010F1C] h-full transition-colors flex items-center"
                            >
                              <Plus size={10} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </td>

                        {/* Row Calculations Total Column */}
                        <td className="py-6 px-4 font-bold text-[#55585B] text-sm tracking-tight">
                          {formatCurrency(item.total_price)}
                        </td>

                        {/* Action Removals Trash Core Button */}
                        <td className="py-6 px-6 text-center">
                          <button 
                            type="button"
                            onClick={() => handleRemoveProduct(item.product_id)}
                            className="text-slate-300 hover:text-red-500 p-2 transition-colors rounded-sm hover:bg-red-50/60"
                            title="Remove product item"
                          >
                            <Trash2 size={16} className="stroke-[1.8]" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* --- COUPON BAR SUB-SECTION --- */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm text-left pt-2">
                <input 
                  type="text" 
                  placeholder="Enter Coupon Code" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 border border-slate-200 rounded-sm px-4 py-3 text-xs outline-none focus:border-[#149fcd] uppercase font-mono tracking-wider bg-white shadow-2xs placeholder:normal-case placeholder:font-sans"
                />
                <button 
                  type="button"
                  className="bg-[#010F1C] hover:bg-[#149fcd] text-white font-bold px-6 py-3 text-xs uppercase tracking-wider rounded-sm transition-colors shrink-0 shadow-sm"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* --- RIGHT SIDE: COMPACT SUMMARY DISPLAY MATRIX (Spans 4 Columns) --- */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-sm p-8 shadow-xs space-y-6 text-left">
              <div className="space-y-4 text-sm border-b border-slate-100 pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#55585B] text-[15px] font-semibold">Subtotal</span>
                  <span className="font-black text-slate-800 text-[16px] tracking-tight">{formatCurrency(cart?.subtotal || 0)}</span>
                </div>
                <hr className="border-slate-100/60" />
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#010F1C] text-[16px] font-black uppercase tracking-tight pt-0.5">Total</span>
                  <div className="text-right space-y-1">
                    <p className="font-black text-xl text-[#010F1C] tracking-tight">{formatCurrency(cart?.total || 0)}</p>
                    <p className="text-[11px] text-slate-400 italic font-medium leading-none">(Shipping fees not included)</p>
                  </div>
                </div>
              </div>

              {/* Action Button Queues */}
              <div className="space-y-3 pt-2">
                <Link 
                  href="/checkout" 
                  className="w-full bg-[#010F1C] hover:bg-[#149fcd] text-white font-bold py-4 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center transition-all shadow-sm"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  href="/shop" 
                  className="w-full text-slate-400 font-bold py-2 text-xs uppercase tracking-wider flex items-center justify-center hover:text-[#149fcd] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}