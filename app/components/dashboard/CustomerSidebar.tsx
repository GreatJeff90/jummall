'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Image from 'next/image';
import { 
  LayoutGrid, ShoppingBag, FileText, Star, 
  RotateCcw, MapPin, Settings, UserPlus, LogOut, Menu, X
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: LayoutGrid, href: '/customer/overview' },
  { name: 'Orders', icon: ShoppingBag, href: '/customer/orders' },
  { name: 'Invoices', icon: FileText, href: '/customer/invoices' },
  { name: 'Reviews', icon: Star, href: '/customer/reviews' },
  { name: 'Order Return Requests', icon: RotateCcw, href: '/customer/returns' },
  { name: 'Addresses', icon: MapPin, href: '/customer/addresses' },
  { name: 'Account Settings', icon: Settings, href: '/customer/settings' },
  { name: 'Become Vendor', icon: UserPlus, href: '/customer/become-a-vendor' },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Find the active page name to display next to the avatar bubble on small viewports
  const activePage = menuItems.find(item => item.href === pathname);
  const currentTitle = activePage ? activePage.name : 'Account Dashboard';

  return (
    <div className="w-full md:w-80 shrink-0 z-30">
      
      {/* --- 📱 MOBILE VIEWPANEL HEADER --- */}
      <div className="flex md:hidden items-center justify-between bg-white border border-slate-100 rounded-sm p-4 shadow-sm mb-4">
        <div className="flex items-center gap-3 text-left">
          {/* Circular Blue Avatar Container */}
          <div className="relative w-11 h-11 rounded-full bg-[#149fcd] flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0 border border-slate-50 shadow-inner">
            {user?.avatar_url ? (
              <Image 
                src={user.avatar_url} 
                alt="Profile" 
                fill 
                sizes="44px"
                className="object-cover" 
              />
            ) : (
              <span className="z-10">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs leading-none mb-1">
              {user?.name || 'Great Pam'}
            </h4>
            <p className="text-[13px] text-slate-400 font-medium leading-none">
              {currentTitle}
            </p>
          </div>
        </div>

        {/* Minimal Bordered Hamburger Menu Toggle Button */}
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border border-slate-300 rounded-sm p-2 text-slate-500 hover:text-[#149fcd] hover:border-[#149fcd] transition-colors bg-white focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} className="stroke-[1.5]" />}
        </button>
      </div>

      {/* --- 💻 SIDEBAR FRAMEWAY CONTAINER --- */}
      <aside className={`
        w-full bg-white border border-slate-100 rounded-sm overflow-hidden md:self-start md:block transition-all duration-300
        ${isOpen ? 'block mb-6 shadow-md' : 'hidden md:block shadow-sm'}
      `}>
        
        {/* User Info Header Block */}
        <div className="hidden md:flex p-6 border-b border-slate-50 items-center gap-4 text-left bg-slate-50/20">
          <div className="relative w-12 h-12 rounded-full bg-[#149fcd] flex items-center justify-center text-white font-bold text-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
            {user?.avatar_url ? (
              <Image 
                src={user.avatar_url} 
                alt="Profile" 
                fill 
                sizes="48px"
                className="object-cover" 
              />
            ) : (
              <span className="z-10">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
              </span>
            )}
          </div>
          <div className="truncate flex-1">
            <h3 className="font-bold text-slate-800 text-sm truncate">
              {user?.name || 'Great Pam'}
            </h3>
            <p className="text-[11px] text-slate-400 truncate">
              {user?.email || 'greatjeff90@gmail.com'}
            </p>
          </div>
        </div>

        {/* Navigation Action Links Map */}
        <nav className="py-2 md:py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Explicit layout event collapse handles routing state shifts elegantly
                className={`flex items-center gap-4 px-6 py-3.5 text-[13px] font-medium transition-all text-left ${
                  isActive 
                  ? 'bg-[#149fcd] text-white font-semibold shadow-xs' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#149fcd]'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
          
          {/* Functional Endpoint Logout Handler Button */}
          <button 
            type="button"
            onClick={logout} 
            className="w-full flex items-center gap-4 px-6 py-3.5 text-[13px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all mt-2 border-t border-slate-50 text-left"
          >
            <LogOut size={18} className="text-slate-400" />
            Logout
          </button>
        </nav>
      </aside>
    </div>
  );
}