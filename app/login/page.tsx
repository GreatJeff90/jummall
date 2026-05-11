import { Lock, Mail, Eye, ShoppingBag, ArrowRight, Phone } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      
      {/* --- BREADCRUMB HEADER --- */}
      <div className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Login</h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Home <span className="mx-2 text-gray-200">/</span> <span className="text-sky-600">Login</span>
          </p>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row border border-gray-50">
          
          {/* LEFT SIDE: ILLUSTRATION */}
          <div className="hidden md:flex md:w-1/2 bg-sky-50 items-center justify-center p-12 relative overflow-hidden">
             <div className="z-10 text-center">
                <div className="w-64 h-64 bg-white rounded-3xl shadow-xl border border-sky-100 flex items-center justify-center mb-8 mx-auto rotate-3">
                   <div className="w-48 h-12 bg-sky-100 rounded-full mb-4 animate-pulse"></div>
                   <div className="w-32 h-32 bg-sky-600 rounded-2xl flex items-center justify-center text-white font-black text-4xl">JM</div>
                </div>
                <h2 className="text-2xl font-black text-sky-900">{"Seamless Shopping"}</h2>
                <p className="text-sky-600/70 mt-2 text-sm max-w-xs mx-auto font-medium">
                  {"Access your orders, wishlist, and personalized recommendations."}
                </p>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-sky-200/30 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-sky-400/20 rounded-full blur-3xl"></div>
          </div>

          {/* RIGHT SIDE: LOGIN FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-sky-100 p-2 rounded-xl text-sky-600">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">{"Login to your account"}</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{"Welcome back to Jummall"}</p>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block ml-1">{"Email or Phone"}</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter your email or phone" 
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block ml-1">{"Password"}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-sky-600 transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all text-sm"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-slate-600">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded-md border-gray-200 text-sky-600 focus:ring-sky-500" />
                  <span className="text-slate-500 font-medium group-hover:text-slate-800 transition-colors">{"Remember me"}</span>
                </label>
                <a href="#" className="text-sky-600 font-bold hover:underline">{"Forgot password?"}</a>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                {"Login Now"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-slate-400 font-medium">
                {"Don't have an account?"} <a href="#" className="text-sky-600 font-black hover:underline">{"Register now"}</a>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* --- NEWSLETTER SECTION (Consistent with Home) --- */}
      <section className="bg-sky-600 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl font-black">{"Get 5% OFF your first order"}</h2>
            <p className="text-sky-100 text-sm font-medium">{"Join 50,000+ shoppers and get the best tech deals."}</p>
          </div>
          <div className="flex w-full md:w-auto gap-2 bg-white p-1.5 rounded-2xl shadow-xl">
            <input type="email" placeholder="Enter your email" className="bg-transparent px-6 py-3 outline-none text-sm w-full md:w-64" />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-700 transition-all">
              {"Subscribe"}
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="bg-sky-600 p-1 rounded-md text-white"><ShoppingBag size={20} /></div>
                <span className="text-xl font-black tracking-tighter">JUMMALL</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {"A trusted multi-vendor marketplace designed for emerging markets. Secure payments and escrow protection."}
             </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-widest mb-6">{"My Account"}</h4>
            <ul className="space-y-3 text-xs text-slate-400 font-bold">
              <li className="hover:text-sky-600 cursor-pointer">{"Order History"}</li>
              <li className="hover:text-sky-600 cursor-pointer">{"Wishlist"}</li>
              <li className="hover:text-sky-600 cursor-pointer">{"Returns"}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-widest mb-6">{"Talk to Us"}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-sky-600" />
                <span className="text-sm font-black text-slate-800">+2347039340610</span>
              </div>
              <p className="text-xs text-slate-400 font-medium ml-7">{"Abuja, Nigeria"}</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
             <div className="flex gap-4">
                {/* <div className="p-3 bg-slate-50 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-all cursor-pointer"><Facebook size={18} /></div>
                <div className="p-3 bg-slate-50 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-all cursor-pointer"><Twitter size={18} /></div>
                <div className="p-3 bg-slate-50 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-all cursor-pointer"><Instagram size={18} /></div> */}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}