'use client';

import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronUp
} from "lucide-react";
import { 
  SiFacebook, 
  SiX, 
  SiInstagram, 
  SiYoutube
} from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full font-sans overflow-hidden">
      
      {/* --- NEWSLETTER BANNER --- */}
      <section className="bg-[#22A7D0] py-14 px-6 md:px-16 relative overflow-hidden">
        {/* Background Decorative Shape (shape-1) */}
        <div className="absolute left-0 top-0 opacity-10 pointer-events-none">
            <Image src="/shape-1.png" alt="" width={350} height={250} />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* Left: Text Content */}
          <div className="text-white text-center lg:text-left">
            <p className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.05em] mb-3">
              {"Be among the first 50 and get 5% off your first order"}
            </p>
            <h2 className="text-[40px] md:text-[70px] font-black tracking-tight leading-[1.1]">
              {"Subscribe to our Newsletter"}
            </h2>
          </div>

          {/* Right: Input & Assets */}
          <div className="relative w-full max-w-2xl flex items-center pt-10 lg:pt-0">
            
            {/* The Plane & SVG Path - Set to z-10 (Behind) */}
            <div className="absolute -top-12 left-4 md:left-10 z-10">
                <div className="relative">
                    <Image 
                        src="/plane.png" 
                        alt="Plane" 
                        width={40} 
                        height={40} 
                        className="animate-pulse"
                    />
                    <svg width="399" height="110" className="hidden sm:block absolute top-6 left-0 -z-10" viewBox="0 0 399 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22" stroke="white" strokeOpacity="0.4" strokeDasharray="4 4"></path>
                    </svg>
                </div>
            </div>

            {/* Input Group - Set to z-20 (In Front) */}
            <div className="flex w-full bg-white rounded-xl p-1 shadow-2xl relative z-20 overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="flex-1 px-8 py-5 outline-none text-[#6C757D] text-[16px] rounded-l-xl font-medium"
              />
              <button className="bg-[#010F1C] text-white px-10 py-5 rounded-lg font-black text-[14px] uppercase tracking-widest hover:bg-sky-950 transition-all">
                {"Subscribe"}
              </button>
            </div>

            {/* The Mailman Character - Set to z-10 (Behind) */}
            <div className="hidden lg:block absolute -right-20 -bottom-4 z-10">
                <Image src="/shape-4.png" alt="Mailman" width={170} height={210} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN FOOTER --- */}
      <div className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            <div className="space-y-8">
              <Link href="/">
                <Image src="/jummall-logo.png" alt="Jummall" width={160} height={50} priority />
              </Link>
              <p className="text-[13px] text-[#55585B] leading-relaxed font-medium max-w-[260px]">
                {"Jummall is a trusted multi-vendor e-commerce marketplace designed for emerging markets. Shop from multiple vendors in one transaction."}
              </p>
              <div className="flex gap-3">
                {[SiFacebook, SiX, SiInstagram, SiYoutube].map((Icon, i) => (
                  <Link key={i} href="#" className="w-10 h-10 rounded-lg border border-[#E0E2E3] flex items-center justify-center text-[#55585B] hover:text-white hover:bg-[#22A7D0] hover:border-[#22A7D0] transition-all">
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[20px] font-black text-[#010F1C] mb-8 uppercase tracking-tighter">My Account</h4>
              <ul className="space-y-4 text-[15px] font-bold text-[#55585B]">
                {['Track Orders', 'Shipping', 'Wishlist', 'My Account', 'Order History', 'Returns'].map((item) => (
                  <li key={item} className="hover:text-[#22A7D0] cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[20px] font-black text-[#010F1C] mb-8 uppercase tracking-tighter">Information</h4>
              <ul className="space-y-4 text-[15px] font-bold text-[#55585B]">
                {['About Us', 'Latest News', 'Contact Us', 'FAQs', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                  <li key={item} className="hover:text-[#22A7D0] cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[20px] font-black text-[#010F1C] mb-8 uppercase tracking-tighter">Talk To Us</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-black text-[#55585B] uppercase tracking-widest mb-1">Got Questions? Call us</p>
                  <p className="text-[24px] font-black text-[#010F1C] tracking-tighter hover:text-[#22A7D0] cursor-pointer transition-colors">+2347039340610</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#55585B] group cursor-pointer">
                    <Mail size={20} className="text-[#22A7D0]" />
                    <span className="text-[15px] font-bold group-hover:text-[#22A7D0]">support@jummall.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#55585B]">
                    <MapPin size={20} className="text-[#22A7D0]" />
                    <span className="text-[15px] font-bold">Abuja, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E0E2E3] pt-10 flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <p className="text-[13px] font-bold text-[#55585B] uppercase tracking-widest">
              © 2026 JUMMALL MARKETPLACE. ALL RIGHTS RESERVED.
            </p>
            
            <div className="flex flex-col md:items-end gap-3">
              <p className="text-[10px] font-black text-[#55585B] uppercase tracking-tighter">
                Secured by <span className="text-[#010F1C] font-black">paystack</span>
              </p>
              <div className="flex items-center gap-5 bg-[#F4F7F9] border border-[#E0E2E3] rounded-lg p-3 shadow-sm">
                <Image src="/verve-logo.png" alt="Verve" width={42} height={22} className="opacity-70 grayscale hover:grayscale-0 transition-all" />
                <Image src="/visa-logo.png" alt="Visa" width={42} height={22} className="opacity-70 grayscale hover:grayscale-0 transition-all" />
                <Image src="/mastercard-logo.png" alt="Mastercard" width={32} height={22} className="opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="absolute -top-7 right-0 bg-[#010F1C] text-white p-4 rounded-full shadow-2xl hover:bg-[#22A7D0] transition-all hover:-translate-y-1"
            >
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}