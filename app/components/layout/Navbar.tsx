'use client';

import { 
  Search, ShoppingBag, User, Heart, Menu, Phone, ChevronDown, 
  ArrowLeftRight, X, Minus, Plus, ChevronRight, History, Trash,
  Sparkles, Tv, Laptop, Smartphone, Gamepad2, UtensilsCrossed,
  Shirt, HeartPulse, Lamp, Luggage, Baby, Car, Home, LogOut, Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useCart } from "@/app/hooks/useEcosystem";
import { useQueryClient } from "@tanstack/react-query";
import { 
  updateCartItemQuantity, removeCartItem, CartItemBackend,
  fetchRecentSearches, logRecentSearch, removeSingleSearchQuery, clearAllRecentSearches, RecentSearchItem
} from "../../lib/api/auth";

// Extracted and mapped from your provided categories select layout tree structure
const dropdownCategories = [
  { value: "", label: "All Categories" },
  { value: "1", label: "New Arrivals" },
  { value: "2", label: "Electronics" },
  { value: "27", label: "  Cameras & Photos" },
  { value: "343", label: "    Photography Accessories" },
  { value: "40", label: "  Generators & Portable Power" },
  { value: "39", label: "  Home Audio" },
  { value: "26", label: "  Television & Video" },
  { value: "47", label: "    Smart TVs" },
  { value: "49", label: "    LED TVs" },
  { value: "171", label: "  Electronic Accessories" },
  { value: "390", label: "    Surge Protectors" },
  { value: "389", label: "    Extension Boxes" },
  { value: "388", label: "    Power Banks" },
  { value: "387", label: "    USB Cables" },
  { value: "20", label: "Computers" },
  { value: "21", label: "  Desktop" },
  { value: "22", label: "  Laptop" },
  { value: "24", label: "  Computer Accessories" },
  { value: "384", label: "    Laptop Bags & Sleeves" },
  { value: "380", label: "    Laptop Stands" },
  { value: "374", label: "    Networking Devices" },
  { value: "373", label: "    Extension Cords" },
  { value: "372", label: "    Surge Protectors" },
  { value: "371", label: "    UPS" },
  { value: "370", label: "    Laptop Chargers" },
  { value: "369", label: "    Memory Cards" },
  { value: "368", label: "    Card Readers" },
  { value: "367", label: "    USB Flash Drives" },
  { value: "366", label: "    Adapters & Converters" },
  { value: "365", label: "    Ethernet (LAN) Cables" },
  { value: "364", label: "    HDMI Cables" },
  { value: "363", label: "    Webcams" },
  { value: "362", label: "    Speakers" },
  { value: "361", label: "    Projectors" },
  { value: "360", label: "    Monitors" },
  { value: "359", label: "    Mouse Pads" },
  { value: "358", label: "    Mice" },
  { value: "357", label: "    Keyboards" },
  { value: "25", label: "Phones & Tablets" },
  { value: "12", label: "  Phone Accessories" },
  { value: "13", label: "    Headphones" },
  { value: "14", label: "    Wireless Headphones" },
  { value: "15", label: "    TWS Earphones" },
  { value: "16", label: "    Smart Watch" },
  { value: "139", label: "    Cables" },
  { value: "138", label: "    Chargers" },
  { value: "137", label: "    Screen Protection" },
  { value: "136", label: "    Phone Cases & Covers" },
  { value: "41", label: "  Mobile Phones" },
  { value: "51", label: "    Budget Phones" },
  { value: "50", label: "    Smart Phones" },
  { value: "42", label: "  Tablets" },
  { value: "53", label: "    Android Tablets" },
  { value: "52", label: "    iPads" },
  { value: "17", label: "Gaming" },
  { value: "45", label: "  Gaming Console" },
  { value: "18", label: "    Playstation" },
  { value: "46", label: "  Gaming Accessories" },
  { value: "48", label: "Kitchen Items" },
  { value: "170", label: "  Cleaning & Kitchen Care" },
  { value: "169", label: "  Food Storage" },
  { value: "168", label: "  Kitchen Utensils" },
  { value: "167", label: "  Cookware" },
  { value: "54", label: "Fashion" },
  { value: "55", label: "  Female fashion" },
  { value: "114", label: "    Women's activewear" },
  { value: "458", label: "      Fitness Belts" },
  { value: "457", label: "      Sports Socks" },
  { value: "456", label: "      Headbands & Sweatbands" },
  { value: "455", label: "      Gym Gloves" },
  { value: "454", label: "      Bikinis (Sport Type)" },
  { value: "453", label: "      One-Piece Swimsuits" },
  { value: "452", label: "      Tracksuits" },
  { value: "451", label: "      Skorts (Skirt + Shorts)" },
  { value: "450", label: "      Workout Shorts" },
  { value: "449", label: "      Crop Tops" },
  { value: "448", label: "      Compression Shirts" },
  { value: "447", label: "      Tank Tops" },
  { value: "446", label: "      Sports Bras" },
  { value: "443", label: "      Running Pants" },
  { value: "442", label: "      Athletic Leggings" },
  { value: "441", label: "      Sweatpants" },
  { value: "84", label: "    Women's bags" },
  { value: "103", label: "      Women purse" },
  { value: "102", label: "      Shoulder bags" },
  { value: "101", label: "      Handbags" },
  { value: "466", label: "      Beaded / Handmade Bags" },
  { value: "465", label: "      Transparent Bags" },
  { value: "464", label: "      Wallets" },
  { value: "463", label: "      Laptop Bags" },
  { value: "462", label: "      Backpacks" },
  { value: "461", label: "      Clutch Bags" },
  { value: "460", label: "      Crossbody Bags" },
  { value: "459", label: "      Tote Bags" },
  { value: "83", label: "    Women's shoe" },
  { value: "410", label: "      Female Sneakers" },
  { value: "422", label: "        Suede Sneakers" },
  { value: "421", label: "        Mesh Sneakers (Breathable)" },
  { value: "420", label: "        Synthetic Sneakers" },
  { value: "419", label: "        Leather Sneakers" },
  { value: "418", label: "        Lace-Up Sneakers" },
  { value: "417", label: "        High-Top Sneakers" },
  { value: "416", label: "        Mid-Top Sneakers" },
  { value: "415", label: "        Low-Top Sneakers" },
  { value: "414", label: "        Designer Sneakers" },
  { value: "413", label: "        Vintage Sneakers" },
  { value: "412", label: "        Running Shoes" },
  { value: "411", label: "        Fashion Sneakers" },
  { value: "396", label: "      Heels" },
  { value: "408", label: "         Patent Heels" },
  { value: "407", label: "         Suede Heels" },
  { value: "406", label: "         Leather Heels" },
  { value: "405", label: "         High Heels" },
  { value: "404", label: "         Mid Heels" },
  { value: "403", label: "         Low Heels" },
  { value: "402", label: "         Round Toe Heels" },
  { value: "401", label: "         Pointed Toe Heels" },
  { value: "400", label: "         Peep-Toe Heels" },
  { value: "399", label: "         Wedge Heels" },
  { value: "398", label: "         Platform Heels" },
  { value: "397", label: "         Block Heels" },
  { value: "391", label: "      Flats" },
  { value: "409", label: "         Ballet Flats" },
  { value: "395", label: "         Pams" },
  { value: "394", label: "         Flat Sandals" },
  { value: "393", label: "         Slip-Ons" },
  { value: "392", label: "         women's loafers" },
  { value: "82", label: "    Lingerie & Sleepwear" },
  { value: "81", label: "    Jeans & Pants" },
  { value: "440", label: "      Faux Leather Leggings" },
  { value: "439", label: "      Jeggings" },
  { value: "438", label: "      Yoga Pants" },
  { value: "437", label: "      High-Waist Leggings" },
  { value: "436", label: "      Basic Leggings" },
  { value: "435", label: "      Suit Pants" },
  { value: "434", label: "      High-Waisted Office Pants" },
  { value: "433", label: "      Palazzo Pants" },
  { value: "432", label: "      Jogger Pants" },
  { value: "431", label: "      Cargo Pants" },
  { value: "430", label: "      Chinos" },
  { value: "429", label: "      Ripped jeans" },
  { value: "428", label: "      High-Waisted Jeans" },
  { value: "427", label: "      Boyfriend Jeans" },
  { value: "426", label: "      Wide Leg Jeans" },
  { value: "425", label: "      Flared Jeans" },
  { value: "424", label: "      Straight Leg Jeans" },
  { value: "423", label: "      Skinny Jeans" },
  { value: "435", label: "      Baggy Jeans" },
  { value: "444", label: "      Ankara Pants" },
  { value: "80", label: "    Skirts" },
  { value: "79", label: "    Tops & Blouses" },
  { value: "78", label: "    Women’s Accessories" },
  { value: "108", label: "      Scarves" },
  { value: "107", label: "      Hats & Caps" },
  { value: "106", label: "      Jewelries" },
  { value: "105", label: "      Sunglasses" },
  { value: "104", label: "      Female Wrist watches" },
  { value: "77", label: "  Kids fashion" },
  { value: "96", label: "    Kids Shoes" },
  { value: "95", label: "    Kids Accessories" },
  { value: "94", label: "    Girls Clothing" },
  { value: "93", label: "    Boys Clothing" },
  { value: "76", label: "  Male fashion" },
  { value: "92", label: "    Men’s Bags" },
  { value: "91", label: "    Men’s Accessories" },
  { value: "113", label: "      Belts" },
  { value: "112", label: "      Hats & Caps" },
  { value: "111", label: "      Jewelries" },
  { value: "110", label: "      Sunglasses" },
  { value: "109", label: "      Male Wrist watches" },
  { value: "90", label: "    Men’s Shoes" },
  { value: "100", label: "      Slippers" },
  { value: "99", label: "      Formal Shoes" },
  { value: "98", label: "      Sandals" },
  { value: "97", label: "      Sneakers" },
  { value: "89", label: "    Men's activewear" },
  { value: "88", label: "    Jackets & Coats" },
  { value: "87", label: "    Jeans & Trousers" },
  { value: "86", label: "    Shirts" },
  { value: "85", label: "    T-Shirts & Polos" },
  { value: "317", label: "      Printed shirts" },
  { value: "316", label: "      Plain T-shirts" },
  { value: "468", label: "  Umbrella" },
  { value: "56", label: "Health & Beauty" },
  { value: "120", label: "  Health Care & Medical supplies" },
  { value: "166", label: "    First Aid Supplies" },
  { value: "280", label: "      Plasters" },
  { value: "279", label: "      Bandages" },
  { value: "278", label: "      Antiseptic wipes" },
  { value: "277", label: "      Gauze and medical tape" },
  { value: "165", label: "    Hygiene & Protection" },
  { value: "311", label: "      Protective Clothing" },
  { value: "315", label: "        Face shields" },
  { value: "314", label: "        Hair caps" },
  { value: "313", label: "        Shoe covers" },
  { value: "312", label: "        Protective gowns" },
  { value: "307", label: "      Wipes & Tissues" },
  { value: "310", label: "        Paper towels" },
  { value: "309", label: "        Antibacterial wipes" },
  { value: "308", label: "        Wet wipes" },
  { value: "298", label: "      Gloves" },
  { value: "302", label: "         Vinyl gloves" },
  { value: "301", label: "         Nitrile gloves" },
  { value: "300", label: "         Latex gloves" },
  { value: "299", label: "         Disposable gloves" },
  { value: "291", label: "      Face Masks" },
  { value: "297", label: "         Reusable face masks" },
  { value: "296", label: "         Surgical masks" },
  { value: "295", label: "         Disposable face masks" },
  { value: "290", label: "      Disinfectant" },
  { value: "306", label: "         Sterilizing solutions" },
  { value: "305", label: "         Surface cleaners" },
  { value: "304", label: "         Antiseptic liquids" },
  { value: "303", label: "         Disinfectant sprays" },
  { value: "289", label: "      Hand wash" },
  { value: "288", label: "      Hand sanitizers" },
  { value: "164", label: "    Health Monitoring Devices" },
  { value: "287", label: "      Pregnancy test kits" },
  { value: "286", label: "      Blood sugar test strips" },
  { value: "285", label: "      Cholesterol test kits" },
  { value: "284", label: "      Nebulizers" },
  { value: "283", label: "      Glucose meters" },
  { value: "282", label: "      Blood pressure monitors" },
  { value: "281", label: "      Thermometers" },
  { value: "119", label: "  Fragrances" },
  { value: "163", label: "    Men’s Fragrances" },
  { value: "162", label: "    Women’s Fragrances" },
  { value: "161", label: "    Kids & Fragrances" },
  { value: "160", label: "    Fragrance Gift Sets" },
  { value: "159", label: "    Fragrance Accessories" },
  { value: "276", label: "    Car Fragrances" },
  { value: "275", label: "    Perfume Oils" },
  { value: "274", label: "    Body sprays" },
  { value: "273", label: "    Body mists" },
  { value: "118", label: "  Personal Care" },
  { value: "157", label: "    Shaving & Grooming" },
  { value: "261", label: "      Beard trimmers" },
  { value: "260", label: "      Beard wash" },
  { value: "259", label: "      Beard oils" },
  { value: "253", label: "      Waxing products" },
  { value: "252", label: "      Hair removal creams" },
  { value: "251", label: "      Aftershave" },
  { value: "250", label: "      Shaving creams" },
  { value: "249", label: "      Razors" },
  { value: "267", label: "    Deodorants & Antiperspirants" },
  { value: "271", label: "      Antiperspirant creams" },
  { value: "270", label: "      Stick deodorants" },
  { value: "269", label: "      Spray deodorants" },
  { value: "268", label: "      Roll-on deodorants" },
  { value: "116", label: "  Makeup / Cosmetics" },
  { value: "131", label: "    Makeup Brushes & Tools" },
  { value: "130", label: "    Powder & Concealer" },
  { value: "129", label: "    Eye Makeup" },
  { value: "128", label: "    Lipstick & Lip Gloss" },
  { value: "127", label: "    Foundation" },
  { value: "115", label: "  Skincare" },
  { value: "126", label: "    Sunscreen" },
  { value: "125", label: "    Cleansers & Face Wash" },
  { value: "124", label: "    Face Creams & Moisturizers" },
  { value: "122", label: "    Serums" },
  { value: "121", label: "  Body Lotions" },
  { value: "266", label: "    Toners" },
  { value: "58", label: "Lighting & Home fixture" },
  { value: "154", label: "  Electrical Fixtures" },
  { value: "153", label: "  Light Bulbs" },
  { value: "152", label: "  Outdoor Lighting" },
  { value: "151", label: "  Lamps" },
  { value: "150", label: "  Indoor Lighting" },
  { value: "59", label: "Luggage & Travel gear" },
  { value: "66", label: "Baby & Kids" },
  { value: "75", label: "  Learning & Educational Toys" },
  { value: "74", label: "  Kids Furniture" },
  { value: "73", label: "  Kids Accessories" },
  { value: "72", label: "  Kids Sports & Outdoor" },
  { value: "71", label: "  Learning & Educational Toys" },
  { value: "70", label: "  Kids Books" },
  { value: "69", label: "  Baby Care" },
  { value: "68", label: "  Toys & Games" },
  { value: "183", label: "Automobile" },
  { value: "210", label: "  Air & Fuel System" },
  { value: "209", label: "  Car cooling system" },
  { value: "208", label: "  Wheels & Tires" },
  { value: "207", label: "  Transmission & Drivetrain" },
  { value: "206", label: "  Suspension & Steering" },
  { value: "205", label: "  Braking System" },
  { value: "204", label: "  Car Lighting & Accessories" },
  { value: "203", label: "  Car electrical system & Accessories" },
  { value: "202", label: "  Fluids & Lubricants" },
  { value: "201", label: "  Engine Parts" },
  { value: "467", label: "Home decor" }
];

// Main core side layout links
const categoriesList = [
  { name: "New Arrivals", icon: Sparkles, hasArrow: false },
  { name: "Electronics", icon: Tv, hasArrow: true },
  { name: "Computers", icon: Laptop, hasArrow: true },
  { name: "Phones & Tablets", icon: Smartphone, hasArrow: true },
  { name: "Gaming", icon: Gamepad2, hasArrow: true },
  { name: "Kitchen Items", icon: UtensilsCrossed, hasArrow: true },
  { name: "Fashion", icon: Shirt, hasArrow: true },
  { name: "Health & Beauty", icon: HeartPulse, hasArrow: true },
  { name: "Lighting & Home fixture", icon: Lamp, hasArrow: true },
  { name: "Luggage & Travel gear", icon: Luggage, hasArrow: false },
  { name: "Baby & Kids", icon: Baby, hasArrow: true },
  { name: "Automobile", icon: Car, hasArrow: true },
  { name: "Home decor", icon: Home, hasArrow: false },
];

function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading: authLoading, logout } = useAuth();
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  // Sidebars and Inputs Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [showRecentPanel, setShowRecentPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // --- DYNAMIC REPLACEMENT LAYER: CONSUMING THE UNIFIED TANSTACK HOOK ---
  const { data: cartData } = useCart();
  const cartItems: CartItemBackend[] = cartData?.items || [];
  const subtotal: number = cartData?.subtotal || 0;
  const [cartLoading, setCartLoading] = useState(false);

  // --- API SEARCH HISTORY HANDLERS ---
  const loadSearchHistory = async () => {
    if (!user) return;
    try {
      const data = await fetchRecentSearches();
      setRecentSearches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error retrieving recent searches list:", err);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent | string) => {
    if (e && typeof e !== 'string') e.preventDefault();
    const activeQuery = typeof e === 'string' ? e : searchQuery;
    if (!activeQuery.trim() && !selectedCategory) return;

    try {
      if (user && activeQuery.trim()) {
        await logRecentSearch(activeQuery.trim());
      }
      setShowRecentPanel(false);
      
      const destinationUrl = `/shop?search=${encodeURIComponent(activeQuery.trim())}${selectedCategory ? `&category=${selectedCategory}` : ''}`;
      router.push(destinationUrl);
    } catch (err) {
      console.error("Failed to commit search entry log row:", err);
    }
  };

  const handleRemoveSingleQuery = async (e: React.MouseEvent, queryText: string) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await removeSingleSearchQuery(queryText);
      setRecentSearches(prev => prev.filter(item => item.query !== queryText));
    } catch (err) {
      console.error("Failed to clear separate search history node:", err);
    }
  };

  const handleClearAllHistory = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await clearAllRecentSearches();
      setRecentSearches([]);
    } catch (err) {
      console.error("Failed to clear search database table sets:", err);
    }
  };

  useEffect(() => {
    if (user) {
      loadSearchHistory();
    } else {
      setRecentSearches([]);
    }
  }, [user, pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowRecentPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateQuantity = async (productId: string, currentQty: number, increment: boolean) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;
    try {
      setCartLoading(true);
      const data = await updateCartItemQuantity(productId, newQty);
      // Synchronously enforce memory cache re-validation across all active subscribers
      queryClient.setQueryData(["cart"], data);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      setCartLoading(true);
      const data = await removeCartItem(productId);
      queryClient.setQueryData(["cart"], data);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, isMobileMenuOpen]);

  return (
    <div className="relative h-[80px] md:h-[160px] text-left"> 
      <header className={`w-full bg-white font-sans fixed top-0 left-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-md py-0' : ''}`}>
        
        {/* 1. Main Header Bar */}
        {!isSticky && (
          <div className="py-4 md:py-6 border-b border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
              
              {/* BRAND LOGO */}
              <Link href="/" className="shrink-0">
                <div className="relative w-[130px] h-[35px] md:w-[180px] md:h-[50px]">
                  <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" priority />
                </div>
              </Link>

              {/* --- DYNAMIC SEARCH BAR WITH LIVE CATEGORY FILTER SELECT --- */}
              <div className="hidden md:block flex-1 max-w-2xl relative z-50" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="flex w-full items-center border-2 border-[#149fcd] rounded-sm bg-white">
                  <input 
                    type="text" 
                    placeholder="Search for Products..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setShowRecentPanel(true)}
                    className="flex-1 px-5 py-3 outline-none text-sm text-slate-500 bg-transparent" 
                  />
                  <div className="h-6 w-[1px] bg-gray-300 shrink-0" />
                  
                  {/* --- FUNCTIONAL OPTION SELECT ELEMENTS W/ PROVIDER SPECIFICATIONS --- */}
                  <div className="relative flex items-center h-full max-w-[200px]">
                    <select 
                      name="categories[]"
                      aria-label="Product categories"
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white font-sans font-semibold text-slate-700 text-xs px-4 py-3 outline-none cursor-pointer pr-9 max-w-full truncate text-ellipsis"
                    >
                      {dropdownCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  <button type="submit" className="bg-[#149fcd] p-4 text-white hover:bg-[#118eb8] transition-colors shrink-0">
                    <Search size={22} />
                  </button>
                </form>

                {/* HISTORICAL AUTOCOMPLETE RESULTS DROP-DOWN OVERLAY */}
                {showRecentPanel && user && recentSearches.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 shadow-xl rounded-sm py-3 text-slate-700 max-h-[320px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 pb-2 mb-2 border-b border-slate-50 flex items-center justify-between select-none">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <History size={13} /> Recent Searches
                      </span>
                      <button 
                        onClick={handleClearAllHistory}
                        className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-1"
                      >
                        <Trash size={12} /> Clear All
                      </button>
                    </div>
                    {recentSearches.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => { setSearchQuery(item.query); handleSearchSubmit(item.query); }}
                        className="px-4 py-2.5 text-xs font-semibold hover:bg-slate-50/80 cursor-pointer flex items-center justify-between group/item transition-colors"
                      >
                        <span className="flex items-center gap-3 text-slate-700 group-hover/item:text-[#149fcd]">
                          <History size={14} className="text-slate-300" /> {item.query}
                        </span>
                        <button 
                          onClick={(e) => handleRemoveSingleQuery(e, item.query)}
                          className="text-slate-300 hover:text-red-500 p-1 rounded-sm md:opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DESKTOP ACTION AREA */}
              <div className="hidden md:flex items-center gap-6">
                {authLoading ? (
                  <div className="text-right pr-6 animate-pulse select-none">
                    <span className="text-xs text-slate-300 font-medium">Syncing profile...</span>
                  </div>
                ) : user ? (
                  <div className="flex items-center gap-3 border-r pr-6 border-gray-100 group relative cursor-pointer">
                    <div className="relative w-10 h-10 rounded-full bg-[#3b4d9b] flex items-center justify-center border-2 border-slate-50 overflow-hidden shrink-0">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-medium leading-none mb-1 max-w-[130px] truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold text-slate-800">Hello, {user.name}</span>
                        <ChevronDown size={12} className="text-slate-400 group-hover:text-[#149fcd] transition-colors" />
                      </div>
                    </div>

                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-sm py-2 z-50">
                      <Link href={user.role === "seller" ? "/seller/dashboard" : "/customer/overview"} className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Dashboard</Link>
                      <Link href={user.role === "seller" ? "/seller/settings" : "/customer/settings"} className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#149fcd]">Account Settings</Link>
                      <hr className="my-1 border-slate-50" />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">Logout</button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center gap-3 border-r pr-6 border-gray-100">
                    <div className="bg-white border border-gray-200 p-2.5 rounded-full text-slate-660"><User size={22} /></div>
                    <div className="text-left text-slate-900">
                      <p className="text-[10px] text-gray-500 leading-none mb-1">Hello, Guest</p>
                      <p className="text-sm font-semibold text-slate-700 hover:text-[#149fcd]">Login / Register</p>
                    </div>
                  </Link>
                )}

                <div className="flex items-center gap-5 select-none">
                  <Link href="/compare" className="relative cursor-pointer group block">
                    <ArrowLeftRight size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white ">1</span>
                  </Link>
                  <Link href="/wishlist" className="relative cursor-pointer group block">
                    <Heart size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">0</span>
                  </Link>
                  <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer group">
                    <ShoppingBag size={24} className="text-slate-800 group-hover:text-[#149fcd] transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center border border-white">{totalItemCount}</span>
                  </div>
                </div>
              </div>

              {/* --- MOBILE VIEW NAVIGATION BAR --- */}
              <div className="flex md:hidden items-center gap-5 select-none">
                <Link href="/compare" className="relative block text-slate-800 py-1 px-0.5">
                  <ArrowLeftRight size={22} className="rotate-90" />
                  <span className="absolute -top-1.5 -right-2 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">1</span>
                </Link>
                <div onClick={() => setIsCartOpen(true)} className="relative block text-slate-800 py-1 cursor-pointer">
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#149fcd] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{totalItemCount}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-900 p-1 hover:text-[#149fcd] transition-colors">
                  <Menu size={26} className="stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. Nav Row (Desktop Only Menu Rails) */}
        <div className={`hidden md:block transition-colors duration-300 ${isSticky ? 'bg-white py-1 shadow-sm' : 'bg-white border-t border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-10">
              {isSticky && (
                <Link href="/" className="shrink-0 mr-4">
                  <div className="relative w-[140px] h-[40px]">
                    <Image src="/jummall-logo.png" alt="Jummall Logo" fill className="object-contain" />
                  </div>
                </Link>
              )}

              {/* ALL CATEGORIES TRIGGER AND DROPDOWN PANEL BLOCK */}
              {!isSticky && (
                <div className="relative z-[40]">
                  <button 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
                    className="bg-[#149fcd] text-white px-8 py-4 flex items-center gap-16 text-sm font-bold min-w-[270px] justify-between transition-colors rounded-t-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Menu size={18} />
                      All Categories
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-x border-b border-slate-100 shadow-xl py-1 flex flex-col rounded-b-sm animate-in fade-in slide-in-from-top-2 duration-150">
                      {categoriesList.map((cat, index) => (
                        <Link
                          key={index}
                          href={`/categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center justify-between px-6 py-3.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-[#149fcd] transition-colors border-b border-slate-100/50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <cat.icon size={16} className="text-slate-400 shrink-0" />
                            <span>{cat.name}</span>
                          </div>
                          {cat.hasArrow && (
                            <ChevronRight size={14} className="text-slate-400" />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <nav className="flex gap-10 text-sm text-slate-800 py-4 font-semibold">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Shop', path: '/shop' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Sell on Jummall', path: '/sell' },
                ].map((item) => (
                  <Link key={item.name} href={item.path} className="hover:text-[#149fcd] transition-colors font-medium">{item.name}</Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
              {!isSticky && (
                <div className="flex items-center gap-3 select-none">
                  <Phone size={22} className="text-[#149fcd]" />
                  <div className="text-left leading-tight">
                    <p className="text-[10px] text-slate-500 uppercase">Hotline:</p>
                    <p className="text-sm font-black text-slate-900 tracking-tight">+2349055999998</p>
                  </div>
                </div>
              )}

              {isSticky && (
                 <div className="flex items-center gap-5 select-none">
                    {user && (
                      <div className="relative w-8 h-8 rounded-full bg-[#3b4d9b] flex items-center justify-center shrink-0 border border-slate-100 text-xs font-bold text-white mr-1 overflow-hidden">
                        {user.avatar_url ? <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" /> : <span>{user.name.charAt(0).toUpperCase()}</span>}
                      </div>
                    )}
                    <Link href="/compare" className="relative cursor-pointer block">
                      <ArrowLeftRight size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">1</span>
                    </Link>
                    <Link href="/wishlist" className="relative cursor-pointer block">
                      <Heart size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">0</span>
                    </Link>
                    <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
                      <ShoppingBag size={22} className="text-slate-800" />
                      <span className="absolute -top-2 -right-2 bg-[#149fcd] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">{totalItemCount}</span>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- 📱 MOBILE DRAWOUT MENU DRAWER --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[110] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-[111] md:hidden shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-28 h-8">
                <Image src="/jummall-logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#149fcd] flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden border border-white/20">
                  {user.avatar_url ? <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-bold truncate">Hello, {user.name}</p>
                  <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="pt-2 text-left">
                <p className="text-xs text-white/60">Welcome Visitor,</p>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-[#149fcd] hover:underline">Sign In / Register</Link>
              </div>
            )}
          </div>

          <div className="p-4 border-b border-slate-100 space-y-1 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">Quick Navigation</p>
            {[
              { name: 'Home Storefront', path: '/' },
              { name: 'Browse Shop', path: '/shop' },
              { name: 'Articles Blog', path: '/blog' },
              { name: 'Customer Assistance', path: '/contact' },
              { name: 'Merchant Portal', path: '/sell' },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#149fcd]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-4 space-y-1 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">User Terminal</p>
            {user && (
              <>
                <Link href={user.role === "seller" ? "/seller/dashboard" : "/customer/overview"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-sm text-sm font-medium text-slate-600 hover:bg-slate-50">Personal Dashboard</Link>
                <Link href={user.role === "seller" ? "/seller/settings" : "/customer/settings"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-sm text-sm font-medium text-slate-600 hover:bg-slate-50">Account Settings</Link>
              </>
            )}
          </div>
        </div>

        {user && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); logout(); }}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-3 rounded-sm uppercase tracking-wide shadow-sm"
            >
              <LogOut size={14} /> Clear Account Session
            </button>
          </div>
        )}
      </div>

      {/* --- SLIDE OUT SHOPPING CART DRAWER COMPONENT --- */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } ${cartLoading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between select-none">
          <h2 className="text-[15px] font-black text-slate-800 tracking-tight uppercase">Shopping cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-slate-100/60">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item.product_id} className={`flex gap-4 ${index > 0 ? 'pt-6' : ''}`}>
                <div className="relative w-16 h-20 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">Img</div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 relative text-left">
                  <button onClick={() => removeItem(item.product_id)} className="absolute top-0 right-0 text-slate-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>

                  <h3 className="text-[13px] font-bold text-slate-800 pr-5 leading-tight truncate max-w-[200px]" title={item.product_name}>
                    {item.product_name}
                  </h3>
                  
                  <div className="flex items-center border border-slate-200 rounded-sm w-fit bg-white h-7 shadow-2xs">
                    <button onClick={() => updateQuantity(item.product_id, item.quantity, false)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Minus size={10}/></button>
                    <span className="px-2 text-xs font-bold text-slate-700 min-w-[16px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product_id, item.quantity, true)} className="px-2 text-slate-400 hover:text-slate-800 h-full flex items-center"><Plus size={10}/></button>
                  </div>

                  <p className="text-[13px] font-bold text-[#149fcd] pt-1">
                    ₦{item.price.toLocaleString()}.00
                  </p>
                  {item.color && (
                    <p className="text-[10px] text-slate-300 italic font-medium">Color: {item.color}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400 space-y-3 select-none">
               <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center border border-slate-100">
                 <ShoppingBag size={28} className="stroke-1 text-slate-300"/>
               </div>
               <div className="space-y-0.5">
                 <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
                 <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-normal">Add products from the marketplace to initialize checkout tabs.</p>
               </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white space-y-4 animate-in fade-in duration-150 select-none">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-800 font-bold">Subtotal:</span>
              <span className="text-sm font-black text-slate-900">₦{subtotal.toLocaleString()}.00</span>
            </div>

            <div className="space-y-2 pt-2">
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full bg-[#010F1C] hover:bg-slate-900 text-white font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center transition-colors shadow-sm">
                Proceed to Checkout
              </Link>
              <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors">
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Navbar = dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
});

export default Navbar;