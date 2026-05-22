import { api } from "./client";

// =========================================================
// TYPE INTERFACES CONTRACT DEFINITIONS
// =========================================================

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller";
  password?: string; // Included password down into payload contract
}

export interface VerifyEmailPayload {
  email: string;
  code: string;    // Clean contract match mapping straight to backend 'code' property
  purpose: string; // Tells server specific intent behind token challenge check
}

export interface RequestPhoneOtpPayload {
  phone: string;
  email: string;   // Added email index so server matches token stubs correctly
}

export interface VerifyPhonePayload {
  phone: string;
  otp: string;     // Retained hook reference matching page view component fields
}

export interface LoginPayload {
  email: string; // Changed from username to email to match backend payload requirement
  password?: string;
}

// =========================================================
// FUNCTIONAL AUTHENTICATION FLOW ACTIONS
// =========================================================

/**
 * STEP 1: Initial Account Registration Request
 * @route POST /auth/signup
 * @returns 201 status code signaling a pending user identity verification stub
 */
export const registerAccount = async (payload: SignupPayload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

/**
 * STEP 2: Verify Email OTP Verification Box
 * @route POST /auth/verify-otp
 * @returns AuthResult (User database record structure data but no active session access tokens yet)
 */
export const verifyEmailOtp = async (payload: VerifyEmailPayload) => {
  const response = await api.post("/auth/verify-otp", payload);
  return response.data;
};

/**
 * STEP 3: Request SMS/WhatsApp Verification OTP Pin to Phone Link
 * @route POST /auth/phone/request-otp
 * @returns 200 status code signaling a pending phone verification gateway step status
 */
export const requestPhoneOtp = async (payload: RequestPhoneOtpPayload) => {
  const response = await api.post("/auth/phone/request-otp", payload); // Transmits both phone and email keys
  return response.data;
};

/**
 * STEP 4 & 5: Submit Phone OTP & Receive Access Tokens
 * @route POST /auth/phone/verify-otp
 * @returns Complete AuthResult (User data + short-lived Access/Refresh Session tokens payload)
 */
export const verifyPhoneOtp = async (payload: VerifyPhonePayload) => {
  const response = await api.post("/auth/phone/verify-otp", payload);
  
  // Destructure tokens securely from the underlying response structure to persist layout tracking sessions
  const data = response.data;
  if (data?.tokens) {
    const { access_token, refresh_token } = data.tokens;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }
  }
  
  return data;
};

/**
 * ACCOUNT SESSION LOGIN
 * @route POST /auth/login
 * @returns Complete AuthResult (User data + short-lived Access/Refresh Session tokens payload)
 */
export const loginAccount = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  
  const data = response.data;
  if (data?.tokens) {
    const { access_token, refresh_token } = data.tokens;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }
  }
  
  return data;
};

/**
 * FORGOT PASSWORD - Request Code
 * @route POST /auth/forgot-password
 */
export const forgotPasswordRequest = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

/**
 * RESET PASSWORD - Submit Code and New Credentials
 * @route POST /auth/reset-password
 */
export interface ResetPasswordPayload {
  email: string;
  code: string;
  new_password: string;
}

export const resetPasswordConfirm = async (payload: ResetPasswordPayload) => {
  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};

/**
 * GET PROTECTED PROFILE DATA
 * @route GET /auth/me
 * @returns 200 User Profile Object
 */
export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data; // Returns structural User details shape
};

// Add these model definitions to the bottom of src/lib/api/auth.ts
// =========================================================
// TYPE INTERFACES CONTRACT DEFINITIONS
// =========================================================

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  sku?: string;
  vendor_name?: string;
  price: number;
  quantity: number;
  total_price: number;
  image_url?: string;
}

export interface OrderDetailResponse {
  id: string;
  order_number: string;
  created_at: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "disputed";
  payment_method: string;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_status: string;
  total_amount: number;
  items: OrderItem[]; // Tied cleanly to the structured interface above, no more 'any' errors!
}

// =========================================================
// FUNCTIONAL AUTHENTICATION FLOW ACTIONS
// =========================================================

/**
 * FETCH LOGGED IN USER ORDERS LIST
 * @route GET /orders/mine
 */
export const fetchMyOrders = async (): Promise<OrderDetailResponse[]> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/orders/mine", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/**
 * FETCH SINGLE ORDER DETAILS
 * @route GET /orders/{order_id}
 */
export const fetchOrderDetails = async (orderId: string): Promise<OrderDetailResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export interface ReviewPayload {
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

/**
 * FETCH MY REVIEW FOR A SPECIFIC PRODUCT
 * @route GET /products/{product_id}/reviews/me
 */
export const fetchMyProductReview = async (productId: string): Promise<ReviewResponse | null> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  try {
    const response = await api.get(`/products/${productId}/reviews/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch {
    return null; // Return clean fallback if no review exists yet
  }
};

/**
 * SUBMIT OR UPDATE A PRODUCT REVIEW
 * @route POST /products/{product_id}/reviews
 */
export const upsertProductReview = async (productId: string, payload: ReviewPayload): Promise<ReviewResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post(`/products/${productId}/reviews`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export interface AddressItem {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  address: string;
  is_default: boolean;
}

export interface AddressPayload {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  address: string;
  is_default?: boolean;
}

/**
 * FETCH USER ADDRESSES
 * @route GET /addresses
 */
export const fetchMyAddresses = async (): Promise<AddressItem[]> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/addresses", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * CREATE NEW ADDRESS
 * @route POST /addresses
 */
export const createAddress = async (payload: AddressPayload): Promise<AddressItem> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post("/addresses", payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * UPDATE ADDRESS
 * @route PATCH /addresses/{address_id}
 */
export const updateAddressDetails = async (addressId: string, payload: AddressPayload): Promise<AddressItem> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.patch(`/addresses/${addressId}`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * DELETE ADDRESS
 * @route DELETE /addresses/{address_id}
 */
export const deleteAddressRecord = async (addressId: string): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.delete(`/addresses/${addressId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

/**
 * SET DEFAULT ADDRESS
 * @route POST /addresses/{address_id}/default
 */
export const setDefaultAddressRecord = async (addressId: string): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.post(`/addresses/${addressId}/default`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  dob?: string; // Optional Date of Birth
}

export interface ChangePasswordPayload {
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

/**
 * UPDATE ME (Profile Details)
 * @route PATCH /auth/me
 */
export const updateProfileInfo = async (payload: UpdateProfilePayload) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.patch("/auth/me", payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * CHANGE PASSWORD
 * @route POST /auth/change-password
 */
export const changeAccountPassword = async (payload: ChangePasswordPayload) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post("/auth/change-password", payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export interface CartItemBackend {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  total_price: number;
  image_url?: string;
  vendor_name?: string;
  color?: string | null;
  stock_status?: string;
}

export interface CartResponse {
  items: CartItemBackend[];
  subtotal: number;
  total: number;
}

/**
 * FETCH CURRENT USER CART
 * @route GET /cart
 */
export const fetchMyCart = async (): Promise<CartResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * UPDATE ITEM QUANTITY
 * @route PATCH /cart/items/{product_id}
 */
export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<CartResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.patch(`/cart/items/${productId}`, { quantity }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * REMOVE SINGLE ITEM FROM CART
 * @route DELETE /cart/items/{product_id}
 */
export const removeCartItem = async (productId: string): Promise<CartResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.delete(`/cart/items/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * CLEAR ENTIRE CART
 * @route DELETE /cart
 */
export const clearEntireCart = async (): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.delete("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export interface ProductItemBackend {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  image_url?: string;
  badges?: string[]; // Array collections for tags like ["New", "Sale", "Hot"]
  rating_average?: number;
  reviews_count?: number;
  is_verified_store?: boolean;
}

/**
 * LIST PUBLIC MARKETPLACE PRODUCTS
 * @route GET /products
 */
export const fetchPublicProducts = async (params?: { category?: string; tag?: string }): Promise<ProductItemBackend[]> => {
  const response = await api.get("/products", { params });
  return response.data;
};

/**
 * ADD PRODUCT ITEM TO CHECKOUT BASKET REGISTER
 * @route POST /cart/items
 */
export const addProductToCartAPI = async (productId: string, quantity: number = 1) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post("/cart/items", { product_id: productId, quantity }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export interface ProductItemBackend {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  image_url?: string;
  badges?: string[]; 
  rating_average?: number;
  reviews_count?: number;
  is_verified_store?: boolean;
  vendor_name?: string; // Add this line right here to satisfy the compiler!
}

export interface RecentSearchItem {
  id: string;
  query: string;
  created_at: string;
}

/**
 * FETCH RECENT SEARCH LOGS
 * @route GET /search/recent
 */
export const fetchRecentSearches = async (): Promise<RecentSearchItem[]> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/search/recent", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * LOG NEW RECENT SEARCH ENTRY
 * @route POST /search/recent
 */
export const logRecentSearch = async (query: string): Promise<RecentSearchItem> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post("/search/recent", { query }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * DELETE INDIVIDUAL RECENT QUERY KEY
 * @route DELETE /search/recent/{query}
 */
export const removeSingleSearchQuery = async (query: string): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.delete(`/search/recent/${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

/**
 * CLEAR ALL RECENT SEARCH ENTRIES
 * @route DELETE /search/recent
 */
export const clearAllRecentSearches = async (): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.delete("/search/recent", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export interface DailyChartPoint {
  name: string;
  revenue: number;
}

export interface SellerAnalyticsOverviewResponse {
  today_revenue: number;
  revenue_change_percentage: number;
  yesterday_revenue: number;
  total_orders_count: number;
  total_visitors_count: string; // e.g., "1.8K"
  conversion_rate: number;      // e.g., 3.4
  chart_trend_data: DailyChartPoint[];
}

/**
 * FETCH SELLER ANALYTICS DASHBOARD OVERVIEW
 * @route GET /seller/analytics/overview
 */
export const fetchSellerAnalyticsOverview = async (): Promise<SellerAnalyticsOverviewResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/seller/analytics/overview", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export interface VendorProfile {
  shop_name: string;
  shop_url: string;
  shop_phone: string;
  vendor_type: string;
  is_verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
  avatar_url?: string;
  vendor_profile?: VendorProfile; // Add this line right here to satisfy the type compiler!
}

export interface SellerRecentOrder {
  id: string;
  product_name: string;
  created_at_human: string; // e.g., "10 mins ago"
  price: number;
  status: string;           // e.g., "Paid" or "Preparing"
  fallback_initial: string; // e.g., "P" or "M"
}

export interface SellerDashboardTask {
  title: string;
  subtitle: string;
  type: "orders" | "chats";
}

export interface SellerAnalyticsOverviewResponse {
  today_revenue: number;
  revenue_change_percentage: number;
  yesterday_revenue: number;
  total_orders_count: number;
  total_visitors_count: string;
  conversion_rate: number;
  
  // Dynamic metrics properties to strip out the hardcoded layers
  unread_notifications_count: number;
  pending_orders_count: number;
  in_transit_orders_count: number;
  unread_chats_count: number;
  completed_orders_count: number;
  
  action_tasks: SellerDashboardTask[];
  recent_orders: SellerRecentOrder[];
}

export interface SellerOrderItemAPI {
  id: string;
  customerName: string;
  productName: string;
  itemCount: number;
  price: number;
  status: 'Awaiting payment' | 'Paid' | 'Preparing' | 'On the way' | 'Ready for handoff' | 'Completed' | 'Cancelled';
  img: string;
  isPOD?: boolean;
}

export interface SellerOrdersResponse {
  orders: SellerOrderItemAPI[];
  to_ship_count: number;
}

/**
 * FETCH REGISTERED SELLER ORDERS FROM ESCROW BACKEND
 * @route GET /seller/orders
 */
export const fetchSellerOrders = async (params?: { status?: string }): Promise<SellerOrdersResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/seller/orders", {
    params,
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export interface SellerProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold_count: number;
  image_url?: string;
  is_active: boolean;
}

export interface SellerCatalogMetricsResponse {
  products: SellerProductItem[];
  total_catalog_revenue: number;
  need_restock_count: number;
}

/**
 * LIST LOGGED MERCHANT INVENTORY
 * @route GET /products/mine
 */
export const fetchMySellerProducts = async (): Promise<SellerCatalogMetricsResponse> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.get("/products/mine", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * TOGGLE ACTIVE LISTING privilege STATUS
 * @route PATCH /products/{product_id}
 */
export const updateSellerProductStatus = async (productId: string, isActive: boolean): Promise<SellerProductItem> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.patch(`/products/${productId}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * DISMISS/DELETE SINGLE ENTRY 
 * @route DELETE /products/{product_id}
 */
export const deleteSellerProduct = async (productId: string): Promise<void> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  await api.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

/**
 * CREATE NEW PRODUCT LISTING ENVELOPE ENTRY
 * @route POST /products
 */

export const createSellerProductAPI = async (formData: FormData): Promise<Record<string, unknown>> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const response = await api.post("/products", formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data" // Necessary wrapper payload formatting for multi-media handling
    }
  });
  return response.data;
};