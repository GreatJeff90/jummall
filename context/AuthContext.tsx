'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchCurrentUser } from "../app/lib/api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller";
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Stabilize the reference with useCallback to safely invoke it inside useEffect channels
  const refreshProfile = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error("Profile synchronization rejected, clearing access tokens:", err);
      if (typeof window !== "undefined") {
        // Clear local key values
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        
        // Clear Edge Middleware cookie mapping
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      // 1. Wipe local memory spaces
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      
      // 2. Expire the cookie boundary instantly so middleware intercepts route attempts
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
    
    setUser(null);
    
    // 3. Force-route back to public directories with an absolute hard reload
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    // Wrap the async state caller inside a clean isolation block to satisfy strict ESLint rules
    const initializeAuth = async () => {
      await refreshProfile();
    };
    initializeAuth();
  }, [refreshProfile]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be wrapped inside an AuthProvider");
  return context;
}