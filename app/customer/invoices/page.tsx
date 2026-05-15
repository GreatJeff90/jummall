import { Eye } from "lucide-react";
import Link from "next/link";

const invoices = [
  {
    id: "INV-4",
    status: "Completed",
    date: "May 08, 2026",
    totalAmount: 1200.00,
    itemCount: 1,
    paymentMethod: "Pay online via Paystack",
  },
];

export default function CustomerInvoices() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Invoices</h1>

      <div className="space-y-4">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="bg-white border border-slate-100 rounded-sm p-6 md:p-8 shadow-sm"
            >
              {/* Invoice Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Invoice {invoice.id}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-[#10B981] text-white text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
                      {invoice.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      • {invoice.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-medium text-slate-400 md:w-24">Total Amount</span>
                  <span className="text-[14px] font-bold text-slate-700">₦{invoice.totalAmount.toLocaleString()}.00</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-medium text-slate-400 md:w-16">Items</span>
                  <span className="text-[14px] font-bold text-slate-700">{invoice.itemCount}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <span className="text-[11px] font-medium text-slate-400 md:w-20">Payment</span>
                  <span className="text-[14px] font-bold text-slate-700">{invoice.paymentMethod}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-end">
                <Link 
                  href={`/customer/invoices/${invoice.id}`}
                  className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-[11px] font-bold py-2 px-5 rounded-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <Eye size={14} /> View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-100 rounded-sm p-12 text-center">
            <p className="text-slate-400 font-medium">No invoices found.</p>
          </div>
        )}
      </div>
    </div>
  );
}