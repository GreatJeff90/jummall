'use client';
import {toast} from "sonner";
import React, { useState, useEffect } from "react";
import { 
  Store,
  MapPin,
  Star,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Award,
  Image as ImageIcon,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Sun,
  MessageSquare,
  User,
  Lock,
  LifeBuoy,
  Info,
  LogOut,
  RefreshCw,
  SquareCheck,
  Check,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  fetchMyStoreProfileAPI, 
  updateMyStoreProfileAPI, 
  startSellerVerificationAPI, 
  completeSellerVerificationAPI, 
  fetchSellerVerificationStatusAPI,
  MyStoreProfileResponse,
  VerificationStatusSummary,
  DojahLaunchConfig
} from "../../lib/api/auth";

interface DojahInstanceOptions {
  appId: string;
  pKey: string;
  widgetId: string;
  referenceId: string;
  environment: string;
  userData: Record<string, unknown>;
  onSuccess: (response: Record<string, unknown>) => void;
  onError: (error: Record<string, unknown>) => void;
  onClose: () => void;
}

interface ExtendedWindow extends Window {
  Dojah?: new (options: DojahInstanceOptions) => { open: () => void };
}

// Add an onNavigate property interface to link sub-pages across dashboard tabs layout contexts
interface VendorStoreViewProps {
  onNavigate?: (tabId: number) => void;
}

export default function VendorStoreView({ onNavigate }: VendorStoreViewProps) {
  const { logout } = useAuth();
  const [store, setStore] = useState<MyStoreProfileResponse | null>(null);
  const [verification, setVerification] = useState<VerificationStatusSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const syncStoreConfiguration = async () => {
    try {
      setLoading(true);
      const [profileData, verificationData] = await Promise.all([
        fetchMyStoreProfileAPI(),
        fetchSellerVerificationStatusAPI()
      ]);
      setStore(profileData);
      setVerification(verificationData.summary);
    } catch (err) {
      console.error("Failed downloading current merchant store configurations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeStoreProfile = async () => {
      await syncStoreConfiguration();
    };
    initializeStoreProfile();
  }, []);

  function bootDojahWidget(config: DojahLaunchConfig) {
    try {
      const customWindow = window as ExtendedWindow;
      if (!customWindow.Dojah) return;

      const options: DojahInstanceOptions = {
        appId: config.app_id,
        pKey: config.public_key,
        widgetId: config.widget_id,
        referenceId: config.reference_id,
        environment: config.environment || "sandbox",
        userData: config.user_data,
        onSuccess: async (response: Record<string, unknown>) => {
          try {
            setLoading(true);
            const result = await completeSellerVerificationAPI({
              reference_id: config.reference_id,
              sdk_result: response
            });
            setVerification(result.summary);
            const updatedProfile = await fetchMyStoreProfileAPI();
            setStore(updatedProfile);
          } catch (syncErr) {
            console.error("Server synchronization crash hook error:", syncErr);
          } finally {
            setLoading(false);
          }
        },
        onError: (error: Record<string, unknown>) => {
          console.error("Dojah-SDK Error Event:", error);
          setVerifying(false);
        },
        onClose: () => {
          setVerifying(false);
        }
      };

      const DojahConnect = new customWindow.Dojah(options);
      DojahConnect.open();
    } catch (error) {
      console.error("SDK initialization mismatch:", error);
      setVerifying(false);
    }
  }

  const handleLaunchVerification = async () => {
    if (verification?.status === "verified" || verification?.status === "pending" || verifying) return;
    
    try {
      setVerifying(true);
      const config = await startSellerVerificationAPI();
      
      const customWindow = window as ExtendedWindow;
      if (typeof window !== "undefined" && !customWindow.Dojah) {
        const script = document.createElement("script");
        script.src = "https://cdn.dojah.io/widget/loading.js";
        script.async = true;
        script.onload = () => bootDojahWidget(config);
        document.body.appendChild(script);
      } else {
        bootDojahWidget(config);
      }
    } catch (err) {
      console.error("Verification boot error detail:", err);
      const errorInstance = err as { response?: { data?: { message?: string } }; message?: string };
      const backendMessage = errorInstance.response?.data?.message || errorInstance.message || "Unknown communication failure";
      toast.error(`Failed initializing onboarding context: ${backendMessage}`);
      setVerifying(false);
    }
  };

  const handleToggleVacationMode = async () => {
    if (!store || toggleLoading) return;
    try {
      setToggleLoading(true);
      const nextVacationState = !store.is_vacation_mode;
      const updatedStore = await updateMyStoreProfileAPI({ is_vacation_mode: nextVacationState });
      setStore(updatedStore);
    } catch (err) {
      console.error("Failed to modify merchant vacation mode properties status:", err);
      toast.error("Failed to modify merchant vacation mode properties status.");
    } finally {
      setToggleLoading(false);
    }
  };

  const getStoreInitial = () => {
    if (!store?.shop_name) return "G";
    return store.shop_name.charAt(0).toUpperCase();
  };

  const getVerificationStyles = () => {
    const status = verification?.status || "unverified";
    switch (status) {
      case "verified":
        return { label: "Tier 1 verified · blue tick active", color: "text-[#31B757]" };
      case "pending":
        return { label: "Identity verification under review", color: "text-amber-500 animate-pulse" };
      case "manual_review":
        return { label: "Manual validation check ongoing", color: "text-amber-600" };
      case "failed":
        return { label: `Verification unsuccessful: ${verification?.failure_reason || "Check data"}`, color: "text-rose-500" };
      default:
        return { label: "Pending identity checklist submission", color: "text-amber-500" };
    }
  };

  const metrics = store?.metrics || {
    total_products_count: 0,
    active_products_count: 0,
    total_sold_count: 0,
    rating_average: 5.0,
    reviews_count: 0,
    profile_completion_percentage: 100
  };

  const metricCards = [
    { icon: ShoppingBag, value: metrics.total_products_count, label: "Products" },
    { icon: SquareCheck, value: metrics.active_products_count, label: "Active" },
    { icon: TrendingUp, value: metrics.total_sold_count, label: "Sold" },
    { icon: Award, value: metrics.rating_average.toFixed(1), label: "Rating" }
  ];

  const verificationMeta = getVerificationStyles();

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200 text-left font-sans">
      
      {/* --- 8.1 PAGE HEADER COMPONENT ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 select-none">
        <div>
          <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Seller</span>
          <h1 className="text-2xl font-black text-[#010F1C] tracking-tight font-montserrat mt-0.5">Your Store</h1>
        </div>

        <button 
          type="button"
          onClick={syncStoreConfiguration}
          className="w-10 h-10 bg-white border border-[#EAEBED] rounded-md flex items-center justify-center text-slate-500 hover:text-[#149FCD] hover:border-[#149FCD] transition-all shadow-sm"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* --- 8.2 STORE HERO BRANDING ACCENT CARD --- */}
      <div className="w-full rounded-sm bg-gradient-to-br from-[#1B4D5E] to-[#143D4A] overflow-hidden relative text-white shadow-md border border-[#143D4A] p-6">
        <div className="absolute -top-28 -right-28 w-64 h-64 rounded-full bg-[#149FCD]/40 blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[#FFD43A]/15 blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[#149FCD] to-[#1284AC] flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-lg uppercase border-2 border-white/10">
              {getStoreInitial()}
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h2 className="text-xl font-black tracking-tight">{store?.shop_name || "My Shop"}</h2>
                {store?.is_verified !== false && (
                  <span className="bg-[#FFD43A] text-[#143D4A] p-0.5 rounded-full shadow-sm flex items-center justify-center shrink-0" title="Verified Merchant">
                    <Check size={10} className="stroke-[3]" />
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/70 font-medium select-none">
                <MapPin size={13} className="text-[#FFD43A]" />
                <span>{store?.location_text || "Port Harcourt, Nigeria"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#FFD43A] text-[#143D4A] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm select-none">
                <Star size={12} className="fill-[#143D4A] stroke-none" />
                <span>{metrics.rating_average.toFixed(1)}</span>
                <span className="text-[#143D4A]/60 font-bold">· {metrics.reviews_count || 0} reviews</span>
              </div>
            </div>
          </div>

          <a 
            href={`/stores/${store?.shop_url || ""}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 text-[#143D4A] px-5 h-11 text-xs font-black uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all shadow-md shrink-0 z-10"
          >
            <ExternalLink size={14} className="stroke-[2.5]" /> Public Storefront
          </a>
        </div>
      </div>

      {/* --- 8.3 PROFILE COMPLETION TRACKER CARD --- */}
      <div className="bg-white border border-[#EAEBED] p-5 rounded-sm shadow-sm space-y-3 text-left select-none">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD] shrink-0">
            <Sparkles size={18} className="stroke-[2]" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex justify-between items-baseline gap-4">
              <h4 className="text-[13.5px] font-bold text-slate-800 tracking-tight">Polish your store</h4>
              <span className="text-xs font-black text-[#149FCD] font-montserrat">{metrics.profile_completion_percentage}%</span>
            </div>
            <p className="text-[11.5px] font-medium text-slate-400 leading-normal">
              Add a logo, banner & tagline so buyers trust your store description metrics.
            </p>
          </div>
        </div>
        
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#149FCD] transition-all duration-300" style={{ width: `${metrics.profile_completion_percentage}%` }} />
        </div>
      </div>

      {/* --- 8.4 STORE CORE METRIC COUNTERS GRID TRAY --- */}
      <div className="bg-white border border-[#EAEBED] p-4 rounded-sm shadow-sm grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-slate-100/80 gap-y-4 md:gap-y-0 select-none">
        {metricCards.map((metric, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-1">
            <span className="text-lg font-black text-slate-800 font-montserrat tracking-tight block leading-none">{metric.value}</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* ================= 8.5 ACTION MENU SECTIONS ================= */}
      <div className="space-y-2.5 text-left select-none">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Storefront</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          
          {/* Edit Store Info Line (Tab ID: 6) */}
          <div 
            onClick={() => onNavigate && onNavigate(6)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]">
                <Store size={16} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Edit store info</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Name, bio, location</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

          {/* Banner & Branding Line (Tab ID: 7) */}
          <div 
            onClick={() => onNavigate && onNavigate(7)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]"><ImageIcon size={16} /></div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Banner & branding</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Logo, cover photo, colors</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-left select-none">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Finance</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          
          {/* Bank Account Line (Tab ID: 8) */}
          <div 
            onClick={() => onNavigate && onNavigate(8)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]"><CreditCard size={16} /></div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Bank account</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">For payout transfers</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

          {/* Reports & Insights Line (Tab ID: 9) */}
          <div 
            onClick={() => onNavigate && onNavigate(9)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-[#1B4D5E]"><BarChart3 size={16} /></div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Reports & insights</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Sales, visits, conversion</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-left">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1 select-none">Business</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          
          <div 
            onClick={handleLaunchVerification}
            className={`p-4 flex items-center justify-between gap-4 transition-colors select-none ${
              verification?.status === "verified" || verification?.status === "pending"
                ? "cursor-default"
                : "cursor-pointer hover:bg-slate-50/50"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center text-[#31B757]">
                {verifying ? <Loader2 size={15} className="animate-spin text-[#31B757]" /> : <ShieldCheck size={16} />}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Identity Verification</h4>
                <p className={`text-[11.5px] mt-0.5 font-bold ${verificationMeta.color}`}>
                  {verificationMeta.label}
                </p>
              </div>
            </div>
            {verification?.status !== "verified" && verification?.status !== "pending" && (
              <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
            )}
          </div>

          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]">
                {toggleLoading ? <Loader2 size={15} className="animate-spin text-[#D9714E]" /> : <Sun size={16} />}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Vacation mode</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {store?.is_vacation_mode ? "Store paused — buyers see you as away" : "Pause sales temporarily"}
                </p>
              </div>
            </div>
            
            <button 
              type="button"
              disabled={toggleLoading}
              onClick={handleToggleVacationMode}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center shrink-0 disabled:opacity-40 ${
                store?.is_vacation_mode ? "bg-[#149FCD]" : "bg-slate-200"
              }`}
              style={{ minWidth: "40px", height: "22px" }}
            >
              <div 
                className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200"
                style={{ transform: store?.is_vacation_mode ? "translateX(18px)" : "translateX(2px)" }}
              />
            </button>
          </div>

          {/* Trigger layout state navigation shifts when clicking Auto-replies option row (Tab ID: 5) */}
          <div 
            onClick={() => onNavigate && onNavigate(5)} 
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#E5F4FA] flex items-center justify-center text-[#149FCD]"><MessageSquare size={16} /></div>
              <div><h4 className="text-[13px] font-bold text-slate-800">Auto-replies</h4><p className="text-[11px] font-medium text-slate-400 mt-0.5">Quick replies for buyers</p></div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>
        </div>
      </div>

      {/* ================= ACCOUNT & HELP MENU SECTIONS ================= */}
      <div className="space-y-2.5 text-left select-none">
        <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider ml-1">Account & Help</h3>
        <div className="bg-white border border-[#EAEBED] rounded-sm shadow-sm divide-y divide-slate-50 overflow-hidden">
          
          {/* Personal Info Row (Tab ID: 10) */}
          <div 
            onClick={() => onNavigate && onNavigate(10)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                <User size={16} />
              </div>
              <h4 className="text-[13px] font-bold text-slate-800">Personal Info</h4>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

          {/* Security Row (Tab ID: 11) */}
          <div 
            onClick={() => onNavigate && onNavigate(11)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-[#1B4D5E]">
                <Lock size={16} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Security</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Password & 2FA</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

          {/* Seller Support Row (Tab ID: 12) */}
          <div 
            onClick={() => onNavigate && onNavigate(12)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-[#FCE7E0] flex items-center justify-center text-[#D9714E]">
                <LifeBuoy size={16} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Seller Support</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">24/7 — usually replies in minutes</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

          {/* About Jummall Row (Tab ID: 13) */}
          <div 
            onClick={() => onNavigate && onNavigate(13)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                <Info size={16} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">About Jummall</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Version 1.0.0</p>
              </div>
            </div>
            <div className="text-slate-300"><ChevronRightIcon size={14} /></div>
          </div>

        </div>
      </div>

      {/* --- 8.6 DESTRUCTIVE LOGOUT TILE CARD LINE --- */}
      <div className="bg-white border border-red-200/60 rounded-sm shadow-sm overflow-hidden text-left select-none">
        <button 
          type="button"
          onClick={logout}
          className="w-full p-4 flex items-center gap-3.5 cursor-pointer hover:bg-red-50/40 transition-colors text-[#EF4444] font-bold text-[13px]"
        >
          <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center text-[#EF4444]">
            <LogOut size={16} />
          </div>
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
}

function ChevronRightIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}