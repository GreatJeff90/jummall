'use client';

import { 
  Mail, 
  MapPin, 
  Phone,
  ArrowUp,
  Instagram
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#12363F] text-[#9FB5B9] font-sans text-[13px] select-none text-left border-t border-[#1a4a56]">
      
      {/* ================= PRIMARY FOOTER CORES MATRIX ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* COLUMN 1: BRAND PLATFORM ROOT SUMMARY (4 COLS) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-start text-left">
            <Link href="/" className="block">
              <div className="relative w-[150px] h-[42px]">
                <Image 
                  src="/Jummall.png" 
                  alt="Jummall Logo" 
                  fill 
                  className="object-contain object-left" 
                  priority 
                  unoptimized
                />
              </div>
            </Link>
            
            <p className="text-white font-black font-montserrat text-base tracking-tight leading-snug">
              One marketplace. Endless possibilities.
            </p>
            
            <p className="text-[#9FB5B9]/80 font-medium leading-relaxed max-w-xs">
              Made in Lagos, Nigeria.<br />
              Shipping nationwide since 2024.
            </p>

            {/* Premium Circular Minimal Social Tracks */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { label: "X", icon: () => <span className="font-black text-xs font-montserrat">X</span>, href: "#" },
                { label: "IG", icon: () => <Instagram size={14} className="stroke-[2.5]" />, href: "#" },
                { label: "TK", icon: () => <span className="font-black text-xs font-sans">ت</span>, href: "#" },
                { label: "FB", icon: () => <span className="font-black text-xs font-montserrat">f</span>, href: "#" },
                { label: "LN", icon: () => <span className="font-black text-xs font-montserrat">in</span>, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9FB5B9] hover:bg-[#149fcd] hover:text-white hover:border-[#149fcd] transition-all"
                  aria-label={social.label}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: MY ACCOUNT LAYER LINKS (2 COLS) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-start text-left">
            <h4 className="text-white font-black font-montserrat uppercase text-xs tracking-widest select-none">
              My Account
            </h4>
            <ul className="space-y-3 font-semibold text-[#9FB5B9]/90">
              {[
                { label: "Sign in", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "Track order", href: "/profile/orders" },
                { label: "Wishlist", href: "/profile/wishlist" },
                { label: "Returns", href: "/returns-exchange" },
                { label: "My addresses", href: "/profile/addresses" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: MARKETPLACE CHANNELS RAILS (2 COLS) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-start text-left">
            <h4 className="text-white font-black font-montserrat uppercase text-xs tracking-widest select-none">
              Shop
            </h4>
            <ul className="space-y-3 font-semibold text-[#9FB5B9]/90">
              {[
                { label: "All categories", href: "/categories" },
                { label: "New arrivals", href: "/shop?sort=newest" },
                { label: "Best sellers", href: "/shop?sort=best" },
                { label: "Today's deals", href: "/shop?sort=deals" },
                { label: "Top vendors", href: "/vendors" },
                { label: "Gift cards", href: "/gift-cards" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: INFORMATION & LEGAL POLICIES (2 COLS) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-start text-left">
            <h4 className="text-white font-black font-montserrat uppercase text-xs tracking-widest select-none">
              Information
            </h4>
            <ul className="space-y-3 font-semibold text-[#9FB5B9]/90">
              {[
                { label: "About us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "/faqs" },
                { label: "Terms & conditions", href: "/terms" },
                { label: "Privacy policy", href: "/privacy" },
                { label: "Seller agreement", href: "/seller-agreement" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: TALK TO US / CONTACT ANCHORS TRACK (2 COLS) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-start text-left">
            <h4 className="text-white font-black font-montserrat uppercase text-xs tracking-widest select-none">
              Talk to us
            </h4>
            <div className="space-y-3.5 font-semibold text-[#9FB5B9]/90 w-full">
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <Phone size={14} className="text-[#9FB5B9]/60 group-hover:text-white transition-colors" />
                <span className="hover:text-white transition-colors tracking-tight">+234 905 599 9999</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <Mail size={14} className="text-[#9FB5B9]/60 group-hover:text-white transition-colors" />
                <span className="hover:text-white transition-colors truncate">support@jummall.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#9FB5B9]/60" />
                <span>Lagos, Nigeria</span>
              </div>

              {/* 24/7 Response Speed Parameter Alert Box Component Layout */}
              <div className="bg-[#18424D] border border-white/5 rounded-xl p-3.5 mt-2 text-left space-y-1 shadow-inner select-none">
                <p className="text-white font-black text-[11px] uppercase tracking-wide">24/7 Support</p>
                <p className="text-[11px] text-[#9FB5B9]/70 leading-normal font-medium">
                  We typically reply in <span className="text-[#FFD13B] font-black">&lt; 5 minutes</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= TRANSACTIONS CHANNELS ROW MIDDLE BAR ================= */}
      <div className="w-full border-t border-[#1a4a56] bg-[#0F2D35]/50 py-5 px-4 sm:px-6 md:px-16 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Secure Payment System Nodes Stack */}
          <div className="flex items-center flex-wrap gap-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40 block mr-1">Secure payments</span>
            
            {/* Securing escrow paystack engine layout token badge */}
            <div className="bg-[#12363F] border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center grayscale opacity-60">
              <span className="text-[7px] font-bold text-[#9FB5B9]/40 uppercase tracking-wider block mr-1 select-none">Secured by</span>
              <span className="text-[10px] font-black text-[#00c5ff] tracking-tighter">paystack</span>
            </div>

            {['VISA', 'Mastercard', 'Verve', 'Bank Transfer'].map((pay) => (
              <span key={pay} className="bg-[#12363F] border border-white/5 text-white/80 font-black tracking-wide text-[10px] uppercase px-3 py-1.5 rounded-lg">
                {pay}
              </span>
            ))}
          </div>

          {/* App Availability Distribution Track Download Anchors */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40 block mr-1">App available on</span>
            {['iOS', 'Android'].map((platform) => (
              <span key={platform} className="bg-[#12363F] border border-white/5 text-white/80 font-black tracking-wide text-[10px] uppercase px-3.5 py-1.5 rounded-lg cursor-pointer hover:border-[#149fcd] transition-all">
                {platform}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ================= COPYRIGHT COMPLIANCE TERMINAL BASE ROW ================= */}
      <div className="w-full bg-[#0B2329] py-5 px-4 sm:px-6 md:px-16 border-t border-white/5 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Main localization statement text node */}
          <p className="text-[11px] font-black tracking-wider uppercase text-[#9FB5B9]/60 flex items-center justify-center sm:justify-start gap-1.5">
            © 2026 Jummall · Made in Nigeria 
            <span className="inline-block w-4 h-2.5 relative rounded-xs overflow-hidden border border-white/10"><span className="absolute top-0 left-0 w-1/3 h-full bg-[#008751]" /><span className="absolute top-0 left-1/3 w-1/3 h-full bg-white" /><span className="absolute top-0 left-2/3 w-1/3 h-full bg-[#008751]" /></span>
          </p>

          {/* Legal references node indexes rows */}
          <div className="flex items-center justify-center gap-5 text-[11px] font-black uppercase tracking-wider text-[#9FB5B9]/50">
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <span className="text-white/5 select-none">|</span>
            <span className="cursor-pointer hover:text-white transition-colors">Cookie preferences</span>
            <span className="text-white/5 select-none">|</span>
            <span className="text-[#FFD13B] font-black tracking-tight select-none">Naira ₦</span>
            <span className="text-white/5 select-none">|</span>
            <span className="text-white select-none">EN •</span>
          </div>

        </div>
      </div>

      {/* ================= SCROLL BACK TO TOP FLOATING LAUNCH TOOL ================= */}
      <button 
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#149fcd] hover:bg-[#118eb8] text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 z-50 border border-white/10 select-none group"
        title="Scroll to Top"
      >
        <ArrowUp size={18} className="stroke-[3] group-hover:animate-pulse" />
      </button>

    </footer>
  );
}