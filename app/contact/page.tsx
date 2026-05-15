'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiYoutube } from "react-icons/si";

export default function ContactPage() {
  return (
    <main className="bg-[#F4F7F9] min-h-screen pb-28">
      
      {/* --- HERO / BREADCRUMB SECTION --- */}
      {/* --- BREADCRUMB HEADER (Full Background Image) --- */}
            <div className="relative h-64 md:h-32 md:mb-32 w-full flex items-center overflow-hidden">
              {/* Background Image using fill and object-cover */}
              <Image 
                src="/breadcrumb-1.jpg" 
                alt="Login Header Background" 
                fill 
                className="object-cover"
                priority
              />
              {/* Darker overlay for text readability if needed */}
              <div className="absolute inset-0 bg-white/20" />
              
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">
                <h1 className="text-5xl  tracking-tight text-[#0F172A]">Contact</h1>
                <p className="text-sm text-slate-500 mt-2   uppercase tracking-widest flex items-center gap-2">
                  Home <span className="text-slate-300">/</span> <span className="text-sky-600">Contact</span>
                </p>
              </div>
            </div>

      {/* --- CONTACT FORM & INFO SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-16 flex flex-col lg:flex-row gap-16">
          
          {/* Left: Message Form */}
          <div className="flex-1">
            <h2 className="text-2xl   text-slate-900 mb-8">Sent A Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px]   uppercase tracking-widest text-slate-400">Name *</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg px-6 py-4 outline-none focus:border-sky-500 transition-all text-sm font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px]   uppercase tracking-widest text-slate-400">Message *</label>
                <textarea 
                  rows={6} 
                  placeholder="Your Message" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg px-6 py-4 outline-none focus:border-sky-500 transition-all text-sm font-medium resize-none" 
                />
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-200 text-sky-500 focus:ring-sky-500" />
                <label htmlFor="terms" className="text-xs font-medium text-slate-400 cursor-pointer">
                  I agree to the Terms and Privacy Policy *
                </label>
              </div>

              <button className="bg-[#010F1C] text-white px-10 py-4 rounded-lg   text-sm uppercase tracking-widest hover:bg-sky-900 transition-all flex items-center gap-3">
                Send
              </button>
            </form>
          </div>

          {/* Right: Contact Information */}
          <div className="lg:w-1/3 space-y-12 pt-4">
            
            {/* Info Item: Email & Phone */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 shrink-0">
                <Mail size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-sm   text-slate-800">support@jummall.com</p>
                <p className="text-lg   text-slate-900">+234 703 9340 610</p>
              </div>
            </div>

            {/* Info Item: Location */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 shrink-0">
                <MapPin size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-lg   text-slate-900 leading-tight">Abuja, Nigeria</p>
              </div>
            </div>

            {/* Info Item: Socials */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                <SiYoutube size={24} />
              </div>
              <div className="space-y-4">
                <p className="text-sm   text-slate-800">Find on social media</p>
                <div className="flex gap-3">
                  {[SiFacebook, SiX, SiInstagram, SiYoutube].map((Icon, i) => (
                    <Link key={i} href="#" className="w-9 h-9 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all">
                      <Icon size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
  <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.84377317765!2d7.382218055620986!3d9.034346851253457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a2035d07!2sAbuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1715617454321!5m2!1sen!2sng" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      className="grayscale-[0.2] contrast-[1.1]" // Optional: light filters to match the clean look of image_1f02fd.png
    />
  </div>
</section>

    </main>
  );
}