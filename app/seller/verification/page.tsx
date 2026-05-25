'use client';

import { useState } from "react";
import ConfirmLegalNameModal from "./components/ConfirmLegalNameModal";
import { api } from "@/app/lib/api/client";

// Define the shape of the data
interface LegalNameData {
  first_name: string;
  middle_name: string;
  last_name: string;
}

export default function VerificationPage() {
  const [showModal, setShowModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // Use the interface instead of 'any'
  const startVerification = async (names: LegalNameData) => {
    setIsStarting(true);
    try {
      await api.post('/seller/verification/start', names);
      setShowModal(false);
      // Proceed to initialize Dojah...
    } catch (err) {
      alert("Failed to start verification.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="...">Verify Account</button>
      
      {showModal && (
        <ConfirmLegalNameModal 
          initialName="Maazi Bola"
          isPending={isStarting}
          onConfirm={startVerification}
        />
      )}
    </div>
  );
}