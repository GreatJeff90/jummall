'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, ShoppingBag, FileText, Star, 
  RotateCcw, MapPin, Settings, UserPlus, LogOut 
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

  return (
    <aside className="w-full md:w-80 bg-white border border-slate-100 rounded-sm overflow-hidden self-start">
      {/* User Info Header */}
      <div className="p-6 border-b border-slate-50 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full bg-[#149fcd] flex items-center justify-center text-white font-bold text-xl overflow-hidden">
           <span className="z-10">N</span>
           {/* If user has image: <Image src="/user.jpg" fill className="object-cover" /> */}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Neel Ade</h3>
          <p className="text-[11px] text-slate-400">neelorneels@gmail.com</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-3.5 text-[13px] font-medium transition-all ${
                isActive 
                ? 'bg-[#149fcd] text-white' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#149fcd]'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              {item.name}
            </Link>
          );
        })}
        
        <button className="w-full flex items-center gap-4 px-6 py-3.5 text-[13px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all mt-4 border-t border-slate-50">
          <LogOut size={18} className="text-slate-400" />
          Logout
        </button>
      </nav>
    </aside>
  );
}