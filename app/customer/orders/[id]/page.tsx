import Image from "next/image";
import { 
  Printer, 
  Download, 
  XCircle, 
  Upload, 
  FileText, 
  CloudUpload 
} from "lucide-react";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Order information</h1>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-12">
        
        {/* --- 1. Order & Shipping Info Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-50 pb-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Order information</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400">Order number:</span>
              <span className="text-slate-900 font-black">#3M-10000049</span>
              <span className="text-slate-400">Time:</span>
              <span className="text-slate-700 font-medium">08 May 2026 20:04:44</span>
              <span className="text-slate-400">Order status:</span>
              <span><span className="bg-[#149fcd] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase">Processing</span></span>
              <span className="text-slate-400">Payment method:</span>
              <span className="text-slate-700 font-medium">Pay online via Paystack</span>
              <span className="text-slate-400">Payment status:</span>
              <span><span className="bg-[#10B981] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase">Completed</span></span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Shipping Address</h3>
            <div className="grid grid-cols-2 text-[13px] gap-y-3">
              <span className="text-slate-400">Full Name:</span>
              <span className="text-slate-700 font-medium">Neel Ade</span>
              <span className="text-slate-400">Phone:</span>
              <span className="text-slate-700 font-medium">+2349060690604</span>
              <span className="text-slate-400">Address:</span>
              <span className="text-slate-700 font-medium leading-relaxed">Plot 100 area c Nyanya, Abuja, Abuja</span>
            </div>
          </div>
        </div>

        {/* --- 2. Products Section --- */}
        <section>
          <h3 className="font-bold text-slate-800 mb-6">Products</h3>
          <div className="border border-slate-50 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 bg-slate-50 rounded-md overflow-hidden border border-slate-100 shrink-0">
                <Image src="/img-20260509-wa0017-600x600.jpg" alt="Product" fill className="object-contain p-2" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">Cross Line Lining Undies</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase">JM-2443-TZLA</p>
                <p className="text-[11px] text-slate-500">Sold by: <span className="text-[#149fcd] hover:underline cursor-pointer">Ozi_Collection</span></p>
              </div>
            </div>
            
            <div className="flex gap-12 text-right">
              <div className="text-center md:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Price:</p>
                <p className="text-xs font-bold text-slate-700">₦1,200.00</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Quantity:</p>
                <p className="text-xs font-bold text-slate-700">1</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total:</p>
                <p className="text-xs font-bold text-[#149fcd]">₦1,200.00</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-black text-slate-900">Total Amount:</h3>
            <span className="text-xl font-black text-[#149fcd]">₦1,200.00</span>
          </div>
        </section>

        {/* --- 3. Shipping Status --- */}
        <section className="bg-slate-50/50 p-6 rounded-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Shipping Information</h3>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Shipping Status:</span>
            <span className="bg-[#FFC107] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">Pending</span>
          </div>
        </section>

        {/* --- 4. Payment Proof Upload --- */}
        <section className="border-t border-slate-100 pt-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center text-slate-400 border border-slate-100">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Payment Proof</h3>
              <p className="text-[12px] text-slate-400 leading-relaxed max-w-2xl">
                The order is currently being processed. For expedited processing, kindly upload a copy of your payment proof:
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-sm p-4 flex items-center justify-between gap-4 bg-slate-50/30 group hover:border-[#149fcd] transition-colors">
              <div className="flex items-center gap-3">
                <CloudUpload size={20} className="text-slate-300 group-hover:text-[#149fcd]" />
                <span className="text-xs text-slate-400">Choose file or drag & drop here</span>
              </div>
              <button className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold py-2 px-4 rounded-sm hover:bg-slate-50 transition-colors">
                Browse
              </button>
            </div>
            <button className="bg-[#149fcd] hover:bg-[#118eb8] text-white font-bold py-3 px-8 rounded-sm flex items-center justify-center gap-2 text-xs transition-all shrink-0">
              <Upload size={16} /> Upload
            </button>
          </div>
          <p className="text-[10px] text-slate-300 mt-3 italic">You can upload the following file types: jpg, jpeg, png, pdf and max file size is 2MB.</p>
        </section>

        {/* --- 5. Action Buttons --- */}
        <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100">
          <button className="bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            <Printer size={16} /> Print invoice
          </button>
          <button className="bg-[#1a6e8a] hover:bg-[#145d75] text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            <Download size={16} /> Download invoice
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold py-3 px-6 rounded-sm flex items-center gap-2 transition-all">
            <XCircle size={16} /> Cancel order
          </button>
        </div>
      </div>
    </div>
  );
}