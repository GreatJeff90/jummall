'use client';

import React from "react";
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorChatsView from "../../components/vendor/VendorChatsView";

export default function SellerChatsPage() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <VendorChatsView />
      </div>
    </VendorLayout>
  );
}