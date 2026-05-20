'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";

export default function SellerDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F6F7F9]">
      {/* The VendorLayout mounts the horizontalLeft Sidebar container 
        and swaps the child views internally based on active selection tabs.
      */}
      <VendorLayout />
    </main>
  );
}