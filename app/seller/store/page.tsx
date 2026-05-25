'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorStoreView from "../../components/vendor/VendorStoreView";

export default function SellerStorePage() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Pass an empty fallback array function if the inner view expects onNavigate */}
        <VendorStoreView onNavigate={() => {}} />
      </div>
    </VendorLayout>
  );
}