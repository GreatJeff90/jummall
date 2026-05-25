'use client';

import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600 hover:border-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500 hover:border-sky-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600 hover:border-pink-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-600 hover:border-red-600" }
  ];

  return (
    <footer className="w-full font-sans text-left">
      
      {/* --- NEWSLETTER BANNER --- */}
      <section className="bg-[#149fcd] py-12 md:py-16 px-4 sm:px-6 md:px-16 relative overflow-hidden">
        {/* Decorative background shape - hidden on mobile to prevent layout shifting */}
        <div className="absolute left-0 top-0 h-full opacity-30 pointer-events-none hidden sm:block">
          <Image src="/shape-1.png" alt="" width={400} height={300} className="object-contain" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 relative z-10">
          <div className="text-white text-center lg:text-left space-y-1">
            <p className="text-[11px] md:text-[14px] uppercase font-bold tracking-wider opacity-90">
              Be among the first 50 and get 5% off your first order
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[50px] font-black leading-tight tracking-tight">
              Subscribe to our Newsletter
            </h2>
          </div>

          <div className="relative w-full max-w-xl flex flex-col items-center pt-2 lg:pt-0">
            {/* Paper Plane - Hidden on mobile, visible from sm up */}
            <div className="absolute -top-14 -left-8 z-10 hidden sm:block">
              <div className="relative">
                <Image src="/plane.png" alt="Plane" width={40} height={40} />
                <svg width="450" height="150" className="absolute top-6 left-6 -z-10 opacity-60" viewBox="0 0 399 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22" stroke="white" strokeOpacity="0.4" strokeDasharray="6 6" strokeWidth="2"></path>
                </svg>
              </div>
            </div>

            {/* Responsive Input Group: Stacks on mobile, inline on sm viewports */}
            <div className="flex flex-col sm:flex-row w-full bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-xl relative z-20 gap-1 sm:gap-0 p-1 sm:p-0">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="w-full px-5 py-4 sm:px-8 sm:py-5 outline-none text-slate-500 text-sm md:text-[16px] font-medium rounded-t-lg sm:rounded-none" 
              />
              <button className="bg-[#010F1C] text-white font-bold px-6 py-4 sm:px-10 sm:py-5 text-sm md:text-[16px] hover:bg-slate-900 transition-all rounded-b-lg sm:rounded-none shrink-0 uppercase tracking-wider">
                Subscribe
              </button>
            </div>

            {/* Mailman Mascot Illustration */}
            <div className="hidden lg:block absolute -right-10 z-10 translate-y-[-10%]">
              <Image 
                src="/shape-4.png" 
                alt="Mailman" 
                width={130} 
                height={220} 
                className="object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN FOOTER --- */}
      <div className="bg-white pt-16 md:pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-20">
            
            {/* Column 1: Logo and About - Spans full width on mobile, 4 cols on desktop */}
            <div className="sm:col-span-2 md:col-span-4 space-y-6 md:space-y-8 text-center sm:text-left flex flex-col items-center sm:items-start">
              <Link href="/">
                <Image src="/jummall-logo.png" alt="Jummall" width={150} height={45} priority />
              </Link>
              <p className="text-[13px] text-[#55585B] leading-relaxed font-medium max-w-sm sm:max-w-[280px]">
                Jummall is a trusted multi-vendor e-commerce marketplace designed for emerging markets. Shop from multiple vendors in one transaction.
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                {socialLinks.map((social, i) => (
                  <Link key={i} href={social.href} className={`w-9 h-9 rounded-lg border border-[#E0E2E3] flex items-center justify-center text-[#55585B] transition-all bg-white shadow-xs group ${social.color}`}>
                    <social.icon size={15} className="group-hover:scale-105 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Spacer for structural balance on large screens */}
            <div className="hidden md:block md:col-span-1"></div>

            {/* Column 2 - My Account */}
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <h4 className="text-[15px] md:text-[18px] font-black text-[#010F1C] uppercase tracking-wider border-b border-slate-50 sm:border-0 pb-2 sm:pb-0">
                My Account
              </h4>
              <ul className="space-y-3 text-xs md:text-[14px] text-[#55585B]">
                {['Track Orders', 'Shipping', 'Wishlist', 'My Account', 'Order History'].map((item) => (
                  <li key={item} className="hover:text-[#149fcd] cursor-pointer transition-colors font-semibold">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Information */}
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <h4 className="text-[15px] md:text-[18px] font-black text-[#010F1C] uppercase tracking-wider border-b border-slate-50 sm:border-0 pb-2 sm:pb-0">
                Information
              </h4>
              <ul className="space-y-3 text-xs md:text-[14px] text-[#55585B]">
                {['About Us', 'Latest News', 'Contact Us', 'FAQs', 'Terms & Conditions'].map((item) => (
                  <li key={item} className="hover:text-[#149fcd] cursor-pointer transition-colors font-semibold">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Talk To Us */}
            <div className="sm:col-span-2 md:col-span-3 space-y-4 md:space-y-6">
              <h4 className="text-[15px] md:text-[18px] font-black text-[#010F1C] uppercase tracking-wider border-b border-slate-50 sm:border-0 pb-2 sm:pb-0">
                Talk To Us
              </h4>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-[#55585B] uppercase tracking-widest mb-1">Got Questions? Call us</p>
                  <p className="text-[20px] md:text-[22px] font-black text-[#010F1C] tracking-tight hover:text-[#149fcd] cursor-pointer transition-colors">
                    +2347039340610
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#55585B] group cursor-pointer">
                    <Mail size={16} className="text-[#149fcd] shrink-0" />
                    <span className="text-xs md:text-[14px] font-semibold group-hover:text-[#149fcd] truncate">support@jummall.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#55585B]">
                    <MapPin size={16} className="text-[#149fcd] shrink-0" />
                    <span className="text-xs md:text-[14px] font-semibold">Abuja, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Payment Partners Bar */}
          <div className="border-t border-[#E0E2E3] pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 relative">
            <p className="text-[11px] md:text-[13px] text-[#55585B] uppercase tracking-wider font-semibold text-center md:text-left leading-relaxed">
              © 2026 JUMMALL MARKETPLACE. ALL RIGHTS RESERVED.
            </p>
            
            <div className="relative w-[180px] h-[45px] md:w-[220px] md:h-[60px]">
              <Image 
                src="/secured_by_paystack.png" 
                alt="Secured by Paystack" 
                fill 
                className="object-contain"
              />
            </div>

            {/* Back to top button positioned responsively on tiny viewport thresholds */}
            <button 
              type="button"
              onClick={scrollToTop}
              className="absolute -top-6 right-2 sm:right-0 bg-[#010F1C] text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-[#149fcd] transition-all hover:-translate-y-1 z-20 border border-white/10"
              title="Scroll to Top"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}