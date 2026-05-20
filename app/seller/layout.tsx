    'use client';

import React from "react";

export default function SellerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans antialiased text-[#010F1C]">
      {/* This is an isolated, pristine layout wrapper built exclusively for seller routes.
        By placing this layout inside 'app/seller/', it shields all nested dashboards 
        from public storefront elements (like global shop navbars and footers). 
        
        On mobile viewports, global headers/footers are blocked inherently because 
        they aren't imported here, satisfying your interface architecture restrictions.
      */}
      <div className="w-full relative">
        {children}
      </div>
    </div>
  );
}