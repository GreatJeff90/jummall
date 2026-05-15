import { Eye } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "JM-10000049",
    status: "Processing",
    date: "May 08, 2026",
    totalAmount: 1200.00,
    itemCount: 1,
    paymentMethod: "Pay online via Paystack",
  },
];

export default function CustomerOrders() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Orders</h1>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-slate-100 rounded-sm p-6 md:p-8 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Order #{order.id}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
                      {order.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      • {order.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                    Total Amount
                  </p>
                  <p className="text-base font-black text-slate-900">
                    ₦{order.totalAmount.toLocaleString()}.00
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                    Items
                  </p>
                  <p className="text-base font-bold text-slate-700">
                    {order.itemCount}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                    Payment
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-end">
                <Link 
                  href={`/customer/orders/${order.id}`}
                  className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-xs font-bold py-2.5 px-5 rounded-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <Eye size={14} /> View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-100 rounded-sm p-12 text-center">
           <p className="text-slate-400 font-medium">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className="text-[#149fcd] font-bold text-sm mt-2 inline-block hover:underline">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}