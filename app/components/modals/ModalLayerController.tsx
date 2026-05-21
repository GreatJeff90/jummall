'use client';

import React from "react";
import { useAuth } from "@/context/AuthContext";
import NewsletterModal from "./NewLetterModal";

export default function ModalLayerController() {
  const { user, loading } = useAuth();

  // Don't render the modal while checking the authentication token
  if (loading) return null;

  // If a user account is actively logged in, hide the modal completely
  if (user) return null;

  // Render the modal for guest visitors only
  return <NewsletterModal />;
}