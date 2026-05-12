import { 
  ShoppingBag, 
  Eye, 
  Heart,
  // Facebook as FacebookIcon, 
  // Twitter as TwitterIcon, 
  // Instagram as InstagramIcon 
} from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Phones & Tablets", icon: "📱" },
    { name: "Computing", icon: "💻" },
    { name: "Electronics", icon: "📺" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Office", icon: "🏠" },
  ];

  const trendingProducts = [
    { id: 1, name: "Navy Blue Shorts", price: 15.00, oldPrice: 25.00, badge: "SALE", img: "🩳" },
    { id: 2, name: "Black Polo Shirt", price: 22.00, oldPrice: 30.00, badge: "NEW", img: "👕" },
    { id: 3, name: "Red Classic Tee", price: 18.00, oldPrice: 22.00, badge: "SALE", img: "👕" },
    { id: 4, name: "White Graphic Jersey", price: 45.00, oldPrice: 60.00, badge: "HOT", img: "🎽" },
    { id: 5, name: "Brown Cargo Pants", price: 35.00, oldPrice: 50.00, badge: "SALE", img: "👖" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans">
      
      <main>
        {/* --- HERO SECTION --- */}
        <section className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto bg-sky-600 rounded-[2rem] p-8 md:p-20 relative overflow-hidden flex items-center min-h-[400px]">
            <div className="z-10 relative text-white max-w-lg text-center md:text-left">
              <p className="text-sky-200 font-bold uppercase tracking-[0.2em] text-xs mb-4">{"Limited Edition"}</p>
              <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6">
                {"The Best Phone"} <br /> {"Collection 2026"}
              </h1>
              <button className="bg-white text-sky-600 px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl">
                {"Shop Collection"}
              </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[120%] bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-4 mt-[-40px] px-4 relative z-20">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-2xl shadow-xl flex flex-col items-center hover:translate-y-[-5px] transition-all cursor-pointer group border border-gray-50">
                <span className="text-3xl md:text-4xl mb-2 group-hover:scale-125 transition-transform">{cat.icon}</span>
                <span className="text-[10px] md:text-xs font-bold text-center text-slate-500 uppercase tracking-tight">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- TRENDING PRODUCTS --- */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">{"Trending Products"}</h2>
              <p className="text-gray-400 text-sm">{"Don't miss out on these favorites"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {trendingProducts.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all relative">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-lg shadow-red-200">
                  {p.badge}
                </span>
                <div className="aspect-square bg-slate-50 flex items-center justify-center text-6xl relative overflow-hidden">
                  {p.img}
                  <div className="absolute inset-0 bg-sky-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-sky-600 hover:text-white transition-colors"><Heart size={18} /></button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-sky-600 hover:text-white transition-colors"><Eye size={18} /></button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-800 mb-2 truncate">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-600 font-black">${p.price.toFixed(2)}</span>
                    <span className="text-gray-300 text-xs line-through">${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-4 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-sky-600 transition-colors uppercase tracking-widest">
                    {"Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FEATURED BANNER --- */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-[#0092BA] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-sky-200">
            <div className="z-10 text-center md:text-left text-white">
              <h3 className="text-white/80 font-bold uppercase tracking-widest text-[10px] mb-2">{"Editor's Choice"}</h3>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
                {"Samsung Galaxy"} <br /> {"Tab S6, Wifi Tablet"}
              </h2>
              <button className="bg-black text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-900 transition-all">
                {"Explore Tablet"}
              </button>
            </div>
            <div className="w-full md:w-[450px] h-64 md:h-80 bg-white/20 rounded-3xl border-4 border-white/30 flex items-center justify-center text-white text-xl font-black italic relative z-10">
              {"TAB S6 VISUAL"}
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-slate-400">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white font-black tracking-tighter text-xl uppercase">
              <div className="bg-sky-600 p-1 rounded-md"><ShoppingBag size={20} /></div>
              {"JUMMALL"}
            </div>
            <p className="text-sm italic mb-6">
              {"One store, endless possibilities. Bringing premium tech to your doorstep."}
            </p>
            <div className="flex gap-4">
              {/* <FacebookIcon size={18} className="hover:text-sky-500 cursor-pointer transition-colors" />
              <TwitterIcon size={18} className="hover:text-sky-500 cursor-pointer transition-colors" />
              <InstagramIcon size={18} className="hover:text-sky-500 cursor-pointer transition-colors" /> */}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest">{"Support"}</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">{"Help Center"}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{"Track Order"}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{"Returns"}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest">{"Store"}</h4>
            <p className="text-xs mb-2">{"University of Port Harcourt,"}</p>
            <p className="text-xs mb-4">{"Rivers State, Nigeria"}</p>
            <p className="text-sky-500 font-bold text-sm underline cursor-pointer">{"+234 905 599 9998"}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
          {"© 2026 Jummall. Designed by Great Jeff Pam."}
        </div>
      </footer>
    </div>
  );
}