import Image from "next/image";
import Link from "next/link";

export default function SellHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-[#EBF7FF] rounded-[40px] p-8 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
        
        {/* Background Decorative Shape: shape-1 (1).png */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-40 pointer-events-none">
          <Image 
            src="/shape-1 (1).png" 
            alt="" 
            fill 
            className="object-contain object-right-top" 
          />
        </div>

        {/* Text Content */}
        <div className="max-w-xl z-10">
          <p className="text-slate-600 text-lg font-medium mb-4">
            Join thousands of vendors reaching millions of customers.
          </p>
          <h2 className="text-5xl md:text-7xl   text-[#001F3F] leading-[1.1] mb-10 font-montserrat">
            Grow Your Business with <span className="text-[#149fcd]">JUMMALL</span>
          </h2>
          <Link 
  href="/customer/become-a-vendor" 
  className="bg-white text-[#149fcd] px-10 py-4 rounded-xl text-sm shadow-sm hover:shadow-md transition-all inline-block font-bold uppercase tracking-wider"
>
  Start Selling Today
</Link>
        </div>

        {/* Main Image: vendor-seller.png */}
        <div className="relative w-full md:w-[550px] h-[450px] z-10">
          <Image 
            src="/vendor-seller.png" 
            alt="Grow Your Business with JUMMALL" 
            fill 
            className="object-contain scale-110 translate-y-4" 
            priority
          />
        </div>

      </div>
    </section>
  );
}