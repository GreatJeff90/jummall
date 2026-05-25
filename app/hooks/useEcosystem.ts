'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { ProductAsset, CategoryItem, SavedBankAccountDetails } from "@/app/lib/api/auth";

// ==========================================
// 1. PRODUCTS & CATALOG HOOKS MATRIX
// ==========================================

export function useProducts(filters?: { category?: string; tag?: string }) {
  return useQuery<ProductAsset[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const response = await api.get("/products", { params: filters });
      return response.data?.items || response.data || [];
    },
  });
}

export function useCategories() {
  return useQuery<CategoryItem[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories", { params: { only_active: true } });
      return response.data?.items || [];
    },
  });
}

// ==========================================
// 2. ESCROW BASKET / CART ENGINE HOOKS
// ==========================================

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get("/cart");
      return response.data;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await api.post(`/cart/items`, { product_id: productId, quantity });
      return response.data;
    },
    // Instantly invalidate and broadcast cart states across all open tabs simultaneously
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ==========================================
// 3. MERCHANT OPERATIONS HOOKS MATRIX
// ==========================================

export function useMerchantOrders() {
  return useQuery({
    queryKey: ["merchant", "orders"],
    queryFn: async () => {
      const response = await api.get("/seller/orders");
      return response.data?.items || response.data || [];
    },
  });
}

export function usePayoutBank() {
  return useQuery({
    queryKey: ["payout", "bankAccount"],
    queryFn: async () => {
      const response = await api.get("/payouts/bank-account");
      return response.data;
    },
    retry: false, // Don't spam retries if vendor hasn't set up bank settings yet
  });
}

export function useCommitBankSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    // Fully type-safe payload bounds parameters eliminating explicit any linter checks
    mutationFn: async (bankPayload: SavedBankAccountDetails) => {
      const response = await api.post("/payouts/bank-account", bankPayload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payout", "bankAccount"] });
    },
  });
}

export function useRecentSearches(enabled: boolean) {
  return useQuery({
    queryKey: ["recentSearches"],
    queryFn: async () => {
      const response = await api.get("/search/recent"); // Or your exact historical endpoint match
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled, // Only runs query if user is logged in
  });
}