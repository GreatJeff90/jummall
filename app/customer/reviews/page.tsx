import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CustomerReviews() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Product Reviews</h1>

      {/* --- Empty State Container --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-20 shadow-sm flex flex-col items-center justify-center text-center">
        
        {/* Placeholder for the Illustration seen in the screenshot */}
        <div className="relative w-40 h-40 mb-6 opacity-20">
          <Image 
            src="/empty-review-illustration.png" 
            alt="No reviews" 
            fill 
            className="object-contain grayscale"
          />
          {/* Fallback if image isn't there yet */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 bg-slate-100 rounded-full" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-2">
          No reviews yet!
        </h2>
        
        <p className="text-[13px] text-slate-400 max-w-md mb-8 leading-relaxed">
          Start shopping and share your experience by reviewing products you&apos;ve purchased.
        </p>

        <Link 
          href="/shop" 
          className="bg-[#149fcd] hover:bg-[#118eb8] text-white text-sm font-bold py-3 px-8 rounded-sm flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} /> Start Shopping
        </Link>
      </div>
    </div>
  );
}