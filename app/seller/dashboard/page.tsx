'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorDashboardView from "../../components/vendor/views/VendorDashboardView";

export default function SellerDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F6F7F9]">
      {/* Pass children cleanly into your workspace layout wrapper */}
      <VendorLayout>
        <div className="space-y-6">
          <VendorDashboardView />
        </div>
      </VendorLayout>
    </main>
  );
}