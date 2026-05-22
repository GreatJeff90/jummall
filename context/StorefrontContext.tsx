'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchStorefrontHomeData, StorefrontHomeResponse } from "../app/lib/api/auth";

interface StorefrontContextType {
  data: StorefrontHomeResponse | null;
  loading: boolean;
  refreshHomeFeed: () => Promise<void>;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StorefrontHomeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchStorefrontHomeData({
        banner_limit: 6,
        category_limit: 10,
        product_limit: 15 // Sufficient headroom buffer to slice inside your components grid maps
      });
      setData(res);
    } catch (err) {
      console.error("Failed loading unified storefront layout bundle data:", err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    const initializeStorefrontState = async () => {
      await loadData();
    };
    initializeStorefrontState();
  }, []);

  return (
    <StorefrontContext.Provider value={{ data, loading, refreshHomeFeed: loadData }}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefrontData() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error("useStorefrontData must be executed inside a StorefrontProvider boundary wrapper.");
  return context;
}