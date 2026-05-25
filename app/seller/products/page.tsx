'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorProductsView from "../../components/vendor/VendorProductsView";

export default function SellerProductsPage() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <VendorProductsView />
      </div>
    </VendorLayout>
  );
}