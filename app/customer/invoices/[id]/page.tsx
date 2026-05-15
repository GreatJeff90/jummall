import { Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">
        Invoice - {resolvedParams.id}
      </h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 md:p-12 shadow-sm space-y-12">
        
        {/* --- 1. Header Information Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-50 pb-12">
          {/* Invoice Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Invoice</h3>
            <div className="grid grid-cols-2 text-[12px] gap-y-3">
              <span className="text-slate-400">Invoice Code:</span>
              <span className="text-slate-900 font-bold">{resolvedParams.id}</span>
              
              <span className="text-slate-400">Issue At:</span>
              <span className="text-slate-700">08 May 2026 20:04:44</span>
              
              <span className="text-slate-400">Payment Status:</span>
              <span>
                <span className="bg-[#10B981] text-white text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase">
                  Completed
                </span>
              </span>
              
              <span className="text-slate-400">Payment Method:</span>
              <span className="text-slate-700">Pay online via Paystack</span>
              
              <span className="text-slate-400">Order:</span>
              <Link href="/customer/orders/JM-10000049" className="text-[#149fcd] hover:underline font-medium">
                #JM-10000049
              </Link>
            </div>
          </div>

          {/* Billing Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Invoice To</h3>
            <div className="grid grid-cols-2 text-[12px] gap-y-3">
              <span className="text-slate-400">Full Name:</span>
              <span className="text-slate-700">Neel Ade</span>
              
              <span className="text-slate-400">Email:</span>
              <span className="text-slate-700">neelorneels@gmail.com</span>
              
              <span className="text-slate-400">Phone:</span>
              <span className="text-slate-700">+2349060690604</span>
              
              <span className="text-slate-400">Address:</span>
              <span className="text-slate-700 leading-relaxed">
                Plot 100 area c Nyanya, Abuja, Abuja
              </span>
            </div>
          </div>
        </div>

        {/* --- 2. Description Section --- */}
        <div className="space-y-6 pb-12 border-b border-slate-50">
          <h3 className="font-bold text-slate-800 text-sm">Description</h3>
          
          <div className="space-y-1 text-[13px]">
            <p className="text-slate-800 font-medium">Cross Line Lining Undies</p>
            <p className="text-slate-400">Quantity: 1</p>
            <p className="text-slate-400">Amount: ₦1,200.00</p>
          </div>

          <div className="pt-6 space-y-2 max-w-xs ml-auto text-right">
            <div className="flex justify-between text-[13px]">
              <span className="text-slate-400">Sub Total:</span>
              <span className="text-slate-700 font-bold">₦1,200.00</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-slate-100">
              <span className="text-slate-900 font-black">Grand Total:</span>
              <span className="text-[#149fcd] font-black">₦1,200.00</span>
            </div>
          </div>
        </div>

        {/* --- 3. Action Buttons --- */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all shadow-sm">
            <Printer size={16} /> Print Invoice
          </button>
          
          <button className="bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all shadow-sm">
            <Download size={16} /> Download Invoice
          </button>
          
          <Link 
            href="/customer/invoices" 
            className="bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft size={16} /> Back to Invoices
          </Link>
        </div>
      </div>
    </div>
  );
}