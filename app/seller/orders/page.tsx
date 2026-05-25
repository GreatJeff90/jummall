'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorOrdersView from "../../components/vendor/VendorOrdersView";

export default function SellerOrdersPage() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <VendorOrdersView />
      </div>
    </VendorLayout>
  );
}