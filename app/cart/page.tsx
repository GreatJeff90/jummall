'use client';

import { toast } from "sonner";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/app/hooks/useEcosystem";
import { useQueryClient } from "@tanstack/react-query";
import { updateCartItemQuantity, removeCartItem, CartItemBackend } from "../lib/api/auth";
import { Skeleton } from "../components/ui/skeleton/Skeleton";

// Skeleton component specific to the Cart layout
const CartSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">
    <div className="lg:col-span-8 space-y-8">
      <div className="bg-white border border-slate-100 rounded-sm p-6 space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 items-center">
            <Skeleton className="w-16 h-20" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-sm p-8 space-y-6">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export default function ShoppingCartPage() {
  const queryClient = useQueryClient();
  const [couponCode, setCouponCode] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: cart, isLoading } = useCart();

  const handleQuantityAdjust = async (productId: string, currentQty: number, increment: boolean) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
      setUpdatingId(productId);
      const updatedCart = await updateCartItemQuantity(productId, newQty);
      queryClient.setQueryData(["cart"], updatedCart);
    } catch (err) {
      toast.error("Failed to adjust item threshold count. Verify inventory limits.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    if (!window.confirm("Remove item from shopping cart registry?")) return;
    try {
      setUpdatingId(productId);
      const updatedCart = await removeCartItem(productId);
      queryClient.setQueryData(["cart"], updatedCart);
    } catch (err) {
      toast.error("Removal sequence failed.");
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

  const items: CartItemBackend[] = cart?.items || [];

  return (
    <div className="w-full bg-[#f8fbfc] min-h-screen pb-24 text-left font-sans">
      <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
        <Image src="/breadcrumb-1.jpg" alt="Header" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
          <h1 className="text-5xl tracking-tight text-[#0F172A]">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-2">
            Home <span className="text-slate-300">/</span> <span className="text-sky-600">Shopping Cart</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-16">
        {isLoading ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-sm p-16 flex flex-col items-center justify-center text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100">
              <ShoppingBag size={30} className="stroke-1" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Your shopping cart is empty</h3>
            <Link href="/shop" className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-3.5 px-8 rounded-sm transition-all uppercase tracking-wider shadow-sm">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-xs">
                <table className="w-full border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-[#010F1C] bg-[#F8FAFC] p-4 text-left">
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
                        <td className="py-6 px-6 flex items-center gap-5 text-left">
                          <div className="relative w-16 h-20 bg-[#F8FAFC] border border-slate-100 rounded-sm overflow-hidden shrink-0">
                            <Image src={item.image_url || "/placeholder-product.png"} alt={item.product_name} fill className="object-contain p-1.5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-[14px] truncate max-w-[200px]">{item.product_name}</h4>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase">In stock</p>
                          </div>
                        </td>
                        <td className="py-6 px-4 font-bold text-sm">{formatCurrency(item.price)}</td>
                        <td className="py-6 px-4">
                          <div className="flex items-center border border-slate-200 rounded-sm w-fit mx-auto h-8">
                            <button onClick={() => handleQuantityAdjust(item.product_id, item.quantity, false)} className="px-2.5 text-slate-400"><Minus size={10} /></button>
                            <span className="px-2 text-xs font-black">{item.quantity}</span>
                            <button onClick={() => handleQuantityAdjust(item.product_id, item.quantity, true)} className="px-2.5 text-slate-400"><Plus size={10} /></button>
                          </div>
                        </td>
                        <td className="py-6 px-4 font-bold text-sm">{formatCurrency(item.total_price)}</td>
                        <td className="py-6 px-6 text-center">
                          <button onClick={() => handleRemoveProduct(item.product_id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-sm p-8 shadow-xs space-y-6">
              <div className="space-y-4 text-sm border-b border-slate-100 pb-6">
                <div className="flex justify-between font-semibold"><span>Subtotal</span> <span>{formatCurrency(cart?.subtotal || 0)}</span></div>
                <div className="flex justify-between font-black text-xl"><span>Total</span> <span>{formatCurrency(cart?.total || 0)}</span></div>
              </div>
              <Link href="/checkout" className="w-full bg-[#010F1C] text-white font-bold py-4 rounded-sm text-xs uppercase flex justify-center">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}