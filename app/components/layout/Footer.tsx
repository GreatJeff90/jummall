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
    <footer className="w-full font-sans">
      
      {/* --- NEWSLETTER BANNER --- */}
      <section className="bg-[#149fcd] py-16 px-6 md:px-16 relative overflow-visible">
        <div className="absolute left-0 top-0 h-full opacity-40 pointer-events-none overflow-hidden">
            <Image src="/shape-1.png" alt="" width={400} height={300} className="object-contain" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-white text-center lg:text-left">
            <p className="text-[14px]   uppercase tracking-wide mb-2">
              {"Be among the first 50 and get 5% off your first order"}
            </p>
            <h2 className="text-[42px] md:text-[50px]   leading-tight">
              {"Subscribe to our Newsletter"}
            </h2>
          </div>

          <div className="relative w-full max-w-xl flex items-center pt-8 lg:pt-0">
            <div className="absolute -top-16 -left-8 z-10 hidden sm:block">
                <div className="relative">
                    <Image src="/plane.png" alt="Plane" width={50} height={50} />
                    <svg width="650" height="170" className="absolute top-8 left-6 -z-10" viewBox="0 0 399 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22" stroke="white" strokeOpacity="0.4" strokeDasharray="6 6" strokeWidth="2"></path>
                    </svg>
                </div>
            </div>

            <div className="flex w-full bg-white rounded-xl overflow-hidden shadow-xl relative z-20">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="flex-1 px-8 py-5 outline-none text-slate-500 text-[16px] font-medium" 
              />
              <button className="bg-[#010F1C] text-white px-10 py-5   text-[16px] hover:bg-slate-900 transition-all">
                {"Subscribe"}
              </button>
            </div>

            <div className="hidden lg:block absolute -right-10 -bottom- z-10 translate-y-[-15%]">
                <Image 
                  src="/shape-4.png" 
                  alt="Mailman" 
                  width={150} 
                  height={240} 
                  className="object-contain" 
                />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN FOOTER (Layout adjusted for image_1fd60e.png) --- */}
      <div className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Changed grid-cols-4 to grid-cols-12 to allow more precise alignment */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            
            {/* Logo and About - Taking 4 columns */}
            <div className="md:col-span-4 space-y-8">
              <Link href="/">
                <Image src="/jummall-logo.png" alt="Jummall" width={160} height={50} priority />
              </Link>
              <p className="text-[13px] text-[#55585B] leading-relaxed font-medium max-w-[280px]">
                {"Jummall is a trusted multi-vendor e-commerce marketplace designed for emerging markets. Shop from multiple vendors in one transaction."}
              </p>
              {/* Refined social icons to match image_1fd60e.png */}
              <div className="flex gap-3">
                {[SiFacebook, SiX, SiInstagram, SiYoutube].map((Icon, i) => (
                  <Link key={i} href="#" className="w-10 h-10 rounded-lg border border-[#E0E2E3] flex items-center justify-center text-[#55585B] hover:text-[#149fcd] transition-all">
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Empty space to align remaining text with the newsletter input */}
            <div className="hidden md:block md:col-span-1"></div>

            {/* Column 2 - My Account */}
            <div className="md:col-span-2">
              <h4 className="text-[18px]   text-[#010F1C] mb-8 uppercase tracking-tighter">My Account</h4>
              <ul className="space-y-4 text-[14px] text-[#55585B]">
                {['Track Orders', 'Shipping', 'Wishlist', 'My Account', 'Order History'].map((item) => (
                  <li key={item} className="hover:text-[#149fcd] cursor-pointer transition-colors font-medium">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Information */}
            <div className="md:col-span-2">
              <h4 className="text-[18px]   text-[#010F1C] mb-8 uppercase tracking-tighter">Information</h4>
              <ul className="space-y-4 text-[14px] text-[#55585B]">
                {['About Us', 'Latest News', 'Contact Us', 'FAQs', 'Terms & Conditions'].map((item) => (
                  <li key={item} className="hover:text-[#149fcd] cursor-pointer transition-colors font-medium">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Talk To Us */}
            <div className="md:col-span-3">
              <h4 className="text-[18px]   text-[#010F1C] mb-8 uppercase tracking-tighter">Talk To Us</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px]   text-[#55585B] uppercase tracking-widest mb-1">Got Questions? Call us</p>
                  <p className="text-[22px]   text-[#010F1C] tracking-tighter hover:text-[#149fcd] cursor-pointer transition-colors">+2347039340610</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#55585B] group cursor-pointer">
                    <Mail size={18} className="text-[#149fcd]" />
                    <span className="text-[14px] font-medium group-hover:text-[#149fcd]">support@jummall.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#55585B]">
                    <MapPin size={18} className="text-[#149fcd]" />
                    <span className="text-[14px] font-medium">Abuja, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#E0E2E3] pt-10 flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <p className="text-[13px] text-[#55585B] uppercase tracking-widest font-medium">
              © 2026 JUMMALL MARKETPLACE. ALL RIGHTS RESERVED.
            </p>
            
            <div className="relative w-[220px] h-[60px]">
              <Image 
                src="/secured_by_paystack.png" 
                alt="Secured by Paystack" 
                fill 
                className="object-contain"
              />
            </div>

            <button 
              onClick={scrollToTop}
              className="absolute -top-7 right-0 bg-[#010F1C] text-white p-4 rounded-full shadow-2xl hover:bg-[#149fcd] transition-all hover:-translate-y-1"
            >
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}