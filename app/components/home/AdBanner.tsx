import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* 
          Grid adjustment: 
          In image_4678bb.png, the left side is roughly 2/3 and the right is 1/3.
          We use grid-cols-3 and col-span-2 to achieve this ratio.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT BANNER (Wider) */}
        <div className="lg:col-span-2 relative bg-[#EFF3F6] rounded-xl overflow-hidden h-[340px] flex items-center p-10 md:p-16 group">
          <div className="z-10 relative">
            <p className="text-slate-700 text-base mb-2 font-medium">Sale 20% off all store</p>
            <h3 className="text-xl font-medium text-slate-800 leading-tight mb-8">
              Smartphone <br /> 
              <span className="text-slate-900">BLU G91 Pro 2022</span>
            </h3>
            <Link 
              href="/shop" 
              className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors group"
            >
              Shop Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 
              Image positioning: 
              Using absolute positioning to make the phones "pop" 
              and bleed off the bottom/right slightly.
          */}
          <div className="absolute right-0 bottom-0 w-5/5 h-[90%] pointer-events-none">
            <Image 
              src="/ads-1.jpg" 
              alt="Smartphone" 
              fill 
              className="object-contain object-right-bottom"
              priority
            />
          </div>
          
          {/* Subtle background decorative shape */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl -z-0" />
        </div>

        {/* RIGHT BANNER (Narrower) */}
        
<div className="relative bg-[#90daff] rounded-xl overflow-hidden h-[340px] flex flex-col justify-center p-10 group">
  <div className="z-10 relative mb-4">
    <p className="text-slate-800 text-base mb-2 font-medium">Sale 35% off</p>
    <h3 className="text-xl font-medium text-slate-900 leading-tight mb-8">
      HyperX Cloud II <br /> Wireless
    </h3>
    <Link 
      href="/shop" 
      className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors group"
    >
      Shop Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
    </Link>
  </div>

  {/* 
      Image positioning updated for larger scale:
      The width and height are increased to 80% of the container 
      to achieve the "bigger" look from image_3c96bd.png.
  */}
  <div className="absolute -right-4 bottom-4 w-[100%] h-[0%] pointer-events-none">
    <Image 
      src="/ads-2.jpg" 
      alt="Headphones" 
      fill 
      className="object-contain object-right-bottom transition-transform duration-500 group-hover:scale-105"
      priority
    />
  </div>
</div>

      </div>
    </section>
  );
}