// Inside app/seller/products/[id]/page.tsx

"use client";
import { useState } from "react";
import BoostProductModal from "./components/BoostProductModal";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isBoostOpen, setIsBoostOpen] = useState(false);

  return (
    <div>
      {/* ... your existing product details ... */}
      
      <button 
        onClick={() => setIsBoostOpen(true)}
        className="bg-[#149fcd] text-white px-6 py-2 rounded-sm font-bold uppercase text-xs"
      >
        Boost Product Visibility
      </button>

      {/* Render Modal conditionally */}
      {isBoostOpen && (
        <BoostProductModal 
          productId={params.id} 
          onClose={() => setIsBoostOpen(false)} 
        />
      )}
    </div>
  );
}