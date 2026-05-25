'use client';
import { toast } from "sonner";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, ShoppingBag, Loader2, Truck } from "lucide-react";
import { useCart } from "@/app/hooks/useEcosystem";
import { useQuery, useMutation } from "@tanstack/react-query";
import { checkoutSchema, CheckoutInput } from "@/app/lib/validations";
import { api } from "@/app/lib/api/client";
import { createMarketplaceOrderAPI, initializeOrderPaymentAPI, CartItemAPI } from "../lib/api/auth";

interface SellerDeliveryQuote {
  vendor_id: string;
  vendor_name: string;
  delivery_fee: number;
}

// Structured wrapper to bind your validated inputs with an tracking idempotency signature
interface IdempotentCheckoutPayload {
  formData: CheckoutInput;
  idempotencyKey: string;
}

export default function CheckoutPage() {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      state: "Rivers State",
      paymentMethod: "Paystack"
    }
  });

  const watchedState = useWatch({ control, name: "state" });

  const { data: cartData, isLoading: loadingCart } = useCart();
  const cartItems: CartItemAPI[] = cartData?.items || [];
  const subtotal: number = cartData?.subtotal || 0;

  const { data: deliveryQuotes = [], isLoading: loadingQuotes } = useQuery<SellerDeliveryQuote[]>({
    queryKey: ["deliveryQuotes", watchedState],
    queryFn: async () => {
      if (!watchedState || watchedState.trim().length < 2) return [];
      const response = await api.get(`/orders/delivery-quote?state=${encodeURIComponent(watchedState.trim())}`);
      return response.data;
    },
    enabled: !!watchedState && cartItems.length > 0,
    staleTime: 1000 * 60 * 2,
  });

  const totalDeliveryFee = deliveryQuotes.reduce((sum, quote) => sum + quote.delivery_fee, 0);
  const dynamicTotalAmount = subtotal + (cartItems.length > 0 ? totalDeliveryFee : 0);

  // --- ENFORCED IDEMPOTENT ORDER MUTATION PIPELINE ---
  const orderSubmissionMutation = useMutation({
    mutationFn: async ({ formData, idempotencyKey }: IdempotentCheckoutPayload) => {
      if (cartItems.length === 0) throw new Error("Your cart is empty.");

      // STEP A: Deploy Marketplace order with fixed Idempotency verification configurations
      const response = await api.post("/orders", {
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
      }, {
        headers: {
          // Send as direct standard request header
          "Idempotency-Key": idempotencyKey
        }
      });

      const freshOrder = response.data;
      const orderTargetId = freshOrder.id || freshOrder.order_id;

      // STEP B: Process redirection parameter configurations via the gateway
      return await initializeOrderPaymentAPI(orderTargetId);
    },
    onSuccess: (paymentConfig) => {
      if (paymentConfig?.authorization_url) {
        window.location.href = paymentConfig.authorization_url;
      } else {
        toast.error("Payment gateway communication link dropped unexpectedly.");
      }
    },
    onError: (err: unknown) => {
      console.error("Checkout submission failed:", err);
      const errorInstance = err as { response?: { data?: { message?: string } } };
      const backendMessage = errorInstance.response?.data?.message || "Verify your balance parameters and connection status.";
      toast.error(`Order placement stopped: ${backendMessage}`);
    }
  });

  const onValidSubmit = (data: CheckoutInput) => {
    // Safety lock validation: block initialization routines while active requests stream in
    if (orderSubmissionMutation.isPending) return;

    // Generate a cryptographically secure isolation string on tap event millisecond
    const cleanIdempotencyToken = crypto.randomUUID();

    orderSubmissionMutation.mutate({
      formData: data,
      idempotencyKey: cleanIdempotencyToken
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(value).replace("NGN", "₦");
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- BREADCRUMB HEADER --- */}
      <div className="relative h-44 md:h-32 md:mb-12 w-full flex items-center overflow-hidden border-b border-slate-100 select-none">
        <Image 
          src="/breadcrumb-1.jpg" 
          alt="Checkout Header Background" 
          fill 
          sizes="100vw"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            
            {/* Billing Information Form Field Blocks */}
            <form onSubmit={handleSubmit(onValidSubmit)} className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-sm space-y-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide border-b border-slate-50 pb-3 text-left select-none">
                Billing details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">First name *</label>
                  <input type="text" disabled={orderSubmissionMutation.isPending} {...register("firstName")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.firstName && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">Last name *</label>
                  <input type="text" disabled={orderSubmissionMutation.isPending} {...register("lastName")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.lastName && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="text-left space-y-1">
                <label className="text-xs font-bold text-slate-600 block select-none">Delivery Address *</label>
                <input type="text" placeholder="Street address, apartment, suite" disabled={orderSubmissionMutation.isPending} {...register("address")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                {errors.address && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">Town / City *</label>
                  <input type="text" disabled={orderSubmissionMutation.isPending} {...register("city")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.city && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.city.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">State *</label>
                  <input type="text" placeholder="e.g. Rivers State, Akwa Ibom" disabled={orderSubmissionMutation.isPending} {...register("state")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.state && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.state.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">Phone *</label>
                  <input type="tel" disabled={orderSubmissionMutation.isPending} {...register("phone")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.phone && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block select-none">Email address *</label>
                  <input type="text" disabled={orderSubmissionMutation.isPending} {...register("email")} className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#149fcd] font-semibold text-slate-700 bg-white transition-colors" />
                  {errors.email && <p className="text-red-500 text-[10.5px] font-bold mt-1">{errors.email.message}</p>}
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
                disabled={orderSubmissionMutation.isPending || loadingQuotes}
                className="w-full h-12 bg-[#149fcd] hover:bg-[#118eb8] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-md mt-4 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none focus:outline-none select-none"
              >
                {orderSubmissionMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#149fcd]" /> Finalizing registration signature...
                  </>
                ) : loadingQuotes ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-slate-400" /> Computing shipping variants...
                  </>
                ) : (
                  <>Place Order {formatCurrency(dynamicTotalAmount)}</>
                )}
              </button>
            </form>

            {/* Checkout Sidebar Summary Block */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm space-y-4">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3 text-left select-none">
                  Your Order
                </h2>

                <div className="divide-y divide-slate-200/60 max-h-[300px] overflow-y-auto custom-sidebar-scroll pr-1">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center py-3 first:pt-0 last:pb-0">
                      <div className="relative w-14 h-16 bg-white border border-slate-200 rounded-sm overflow-hidden shrink-0 flex items-center justify-center p-0.5 shadow-2xs select-none">
                        <Image src={item.image_url || "/placeholder-product.png"} alt={item.name} fill sizes="56px" className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0 text-left space-y-0.5">
                        <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug" title={item.name}>{item.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">{item.vendor_name || "Jummall Retailer"}</p>
                        <div className="flex items-center justify-between pt-0.5 select-none">
                          <span className="text-[10px] text-slate-400 font-black">QTY: {item.quantity}</span>
                          <span className="text-xs font-black text-[#149fcd] font-montserrat">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vendor Fulfillment Breakdown */}
                <div className="border-t border-slate-200 pt-4 space-y-2 text-left select-none">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Truck size={12} className="text-[#149fcd]" /> Vendor Fulfillment Breakdown
                  </h4>
                  {loadingQuotes ? (
                    <div className="flex items-center gap-2 py-1 text-slate-400 text-xs italic">
                      <Loader2 size={12} className="animate-spin text-[#149fcd]" /> Fetching dynamic cross-vendor quotes...
                    </div>
                  ) : deliveryQuotes.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">Enter shipping state above to calculate regional cross-vendor rates.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 bg-white border border-slate-100 p-2.5 rounded-sm shadow-3xs">
                      {deliveryQuotes.map((quote) => (
                        <div key={quote.vendor_id} className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-500 truncate max-w-[180px] font-semibold">{quote.vendor_name}</span>
                          <span className="text-slate-700 font-bold font-montserrat">{formatCurrency(quote.delivery_fee)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs font-medium text-slate-600 select-none">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold font-montserrat">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combined Shipping</span>
                    <span className="text-slate-800 font-bold font-montserrat">
                      {loadingQuotes ? "Calculating..." : formatCurrency(totalDeliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-sm">
                    <span className="text-slate-800 font-black uppercase tracking-wide">Total</span>
                    <span className="text-base font-black text-slate-900 font-montserrat">
                      {loadingQuotes ? "Calculating..." : formatCurrency(dynamicTotalAmount)}
                    </span>
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