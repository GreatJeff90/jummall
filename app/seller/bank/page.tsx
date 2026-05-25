'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorBankView from "../../components/vendor/VendorBankView";

export default function SellerBankPage() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <VendorBankView />
      </div>
    </VendorLayout>
  );
}