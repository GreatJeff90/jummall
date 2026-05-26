import { api } from "./client";
import axios from "axios";

// =========================================================
// TYPE INTERFACES CONTRACT DEFINITIONS
// =========================================================

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller";
  password?: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
  purpose: string;
}

export interface RequestPhoneOtpPayload {
  phone: string;
  email: string;
}

export interface VerifyPhonePayload {
  phone: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

// =========================================================
// FUNCTIONAL AUTHENTICATION FLOW ACTIONS
// =========================================================

export const registerAccount = async (payload: SignupPayload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const verifyEmailOtp = async (payload: VerifyEmailPayload) => {
  const response = await api.post("/auth/verify-otp", payload);
  return response.data;
};

export const requestPhoneOtp = async (payload: RequestPhoneOtpPayload) => {
  const response = await api.post("/auth/phone/request-otp", payload);
  return response.data;
};

export const verifyPhoneOtp = async (payload: VerifyPhonePayload) => {
  const response = await api.post("/auth/phone/verify-otp", payload);
  
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
  return response.data;
};

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
  items: OrderItem[];
}

// =========================================================
// FUNCTIONAL AUTHENTICATION FLOW ACTIONS
// =========================================================

/**
 * FETCH LOGGED IN USER ORDERS LIST
 * @route GET /orders/mine
 */
export const fetchMyOrders = async (): Promise<OrderDetailResponse[]> => {
  const response = await api.get("/orders/mine");
  return response.data;
};

/**
 * FETCH SINGLE ORDER DETAILS
 * @route GET /orders/{order_id}
 */
export const fetchOrderDetails = async (orderId: string): Promise<OrderDetailResponse> => {
  const response = await api.get(`/orders/${orderId}`);
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
  try {
    const response = await api.get(`/products/${productId}/reviews/me`);
    return response.data;
  } catch {
    return null;
  }
};
/**
 * SUBMIT OR UPDATE A PRODUCT REVIEW
 * @route POST /products/{product_id}/reviews
 */
export const upsertProductReview = async (productId: string, payload: ReviewPayload): Promise<ReviewResponse> => {
  const response = await api.post(`/products/${productId}/reviews`, payload);
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
  const response = await api.get("/addresses");
  return response.data;
};

/**
 * CREATE NEW ADDRESS
 * @route POST /addresses
 */
export const createAddress = async (payload: AddressPayload): Promise<AddressItem> => {
  const response = await api.post("/addresses", payload);
  return response.data;
};

/**
 * UPDATE ADDRESS
 * @route PATCH /addresses/{address_id}
 */
export const updateAddressDetails = async (addressId: string, payload: AddressPayload): Promise<AddressItem> => {
  const response = await api.patch(`/addresses/${addressId}`, payload);
  return response.data;
};

/**
 * DELETE ADDRESS
 * @route DELETE /addresses/{address_id}
 */
export const deleteAddressRecord = async (addressId: string): Promise<void> => {
  await api.delete(`/addresses/${addressId}`);
};

/**
 * SET DEFAULT ADDRESS
 * @route POST /addresses/{address_id}/default
 */
export const setDefaultAddressRecord = async (addressId: string): Promise<void> => {
  await api.post(`/addresses/${addressId}/default`);
};

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  dob?: string;
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
  const response = await api.patch("/auth/me", payload);
  return response.data;
};

/**
 * CHANGE PASSWORD
 * @route POST /auth/change-password
 */
export const changeAccountPassword = async (payload: ChangePasswordPayload) => {
  const response = await api.post("/auth/change-password", payload);
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
  const response = await api.get("/cart");
  return response.data;
};

/**
 * UPDATE ITEM QUANTITY
 * @route PATCH /cart/items/{product_id}
 */
export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<CartResponse> => {
  const response = await api.patch(`/cart/items/${productId}`, { quantity });
  return response.data;
};

/**
 * REMOVE SINGLE ITEM FROM CART
 * @route DELETE /cart/items/{product_id}
 */
export const removeCartItem = async (productId: string): Promise<CartResponse> => {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
};

/**
 * CLEAR ENTIRE CART
 * @route DELETE /cart
 */
export const clearEntireCart = async (): Promise<void> => {
  await api.delete("/cart");
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
}

/**
 * LIST PUBLIC MARKETPLACE PRODUCTS
 * @route GET /products
 */
export const fetchPublicProducts = async (params?: { 
  category?: string; 
  tag?: string; 
  state?: string 
}): Promise<ProductItemBackend[]> => {
  const response = await api.get("/products", { params });
  return response.data;
};

interface ProductFilters {
  category?: string;
  tag?: string;
  state?: string;
}
/**
 * ADD PRODUCT ITEM TO CHECKOUT BASKET REGISTER
 * @route POST /cart/items
 */
export const addProductToCartAPI = async (productId: string, quantity: number = 1) => {
  const response = await api.post("/cart/items", { product_id: productId, quantity });
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
  vendor_name?: string;
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
  const response = await api.get("/search/recent");
  return response.data;
};

/**
 * LOG NEW RECENT SEARCH ENTRY
 * @route POST /search/recent
 */
export const logRecentSearch = async (query: string): Promise<RecentSearchItem> => {
  const response = await api.post("/search/recent", { query });
  return response.data;
};

/**
 * DELETE INDIVIDUAL RECENT QUERY KEY
 * @route DELETE /search/recent/{query}
 */
export const removeSingleSearchQuery = async (query: string): Promise<void> => {
  await api.delete(`/search/recent/${encodeURIComponent(query)}`);
};

/**
 * CLEAR ALL RECENT SEARCH ENTRIES
 * @route DELETE /search/recent
 */
export const clearAllRecentSearches = async (): Promise<void> => {
  await api.delete("/search/recent");
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
  total_visitors_count: string;
  conversion_rate: number;
  chart_trend_data: DailyChartPoint[];
}

/**
 * FETCH SELLER ANALYTICS DASHBOARD OVERVIEW
 * @route GET /seller/analytics/overview
 */
export const fetchSellerAnalyticsOverview = async (): Promise<SellerAnalyticsOverviewResponse> => {
  const response = await api.get("/seller/analytics/overview");
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
  vendor_profile?: VendorProfile;
}

export interface SellerRecentOrder {
  id: string;
  product_name: string;
  created_at_human: string;
  price: number;
  status: string;
  fallback_initial: string;
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
  const response = await api.get("/seller/orders", { params });
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
  const response = await api.get("/products/mine");
  return response.data;
};

/**
 * TOGGLE ACTIVE LISTING privilege STATUS
 * @route PATCH /products/{product_id}
 */
export const updateSellerProductStatus = async (productId: string, isActive: boolean): Promise<SellerProductItem> => {
  const response = await api.patch(`/products/${productId}`, { is_active: isActive });
  return response.data;
};
/**
 * DISMISS/DELETE SINGLE ENTRY 
 * @route DELETE /products/{product_id}
 */
export const deleteSellerProduct = async (productId: string): Promise<void> => {
  await api.delete(`/products/${productId}`);
};

/**
 * CREATE NEW PRODUCT LISTING ENVELOPE ENTRY
 * @route POST /products
 */
export const createSellerProductAPI = async (formData: FormData): Promise<Record<string, unknown>> => {
  const response = await api.post("/products", formData, {
    headers: { 
      "Content-Type": "multipart/form-data" 
    }
  });
  return response.data;
};

export interface ChatMessageBackend {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at_human: string;
  is_read: boolean;
}

export interface ChatThreadBackend {
  id: string;
  partner_name: string;
  avatar_gradient_class?: string;
  initials_fallback?: string;
  last_message_content: string;
  updated_at_human: string;
  unread_messages_count: number;
  associated_order_id?: string;
  is_last_message_by_me: boolean;
}

/**
 * FETCH VENDOR MESSAGE THREAD GROUPS 
 * @route GET /chats
 */
export const fetchActiveChatThreadsAPI = async (params?: { filter?: string }): Promise<ChatThreadBackend[]> => {
  const response = await api.get("/chats", { params });
  return response.data;
};

/**
 * MARK AN ENTIRE SPECIFIC THREAD CONVERSATION AS READ
 * @route POST /chats/{chat_id}/read
 */
export const markThreadAsReadAPI = async (chatId: string): Promise<{ success: boolean }> => {
  const response = await api.post(`/chats/${chatId}/read`, {});
  return response.data;
};

export interface StoreMetricsAPI {
  total_products_count: number;
  active_products_count: number;
  total_sold_count: number;
  rating_average: number;
  reviews_count: number;
  profile_completion_percentage: number;
}

export interface MyStoreProfileResponse {
  id: string;
  shop_name: string;
  shop_url: string;
  shop_phone: string;
  location_text: string;
  is_verified: boolean;
  is_vacation_mode: boolean;
  metrics: StoreMetricsAPI;
}

/**
 * RETRIEVE AUTHENTICATED MERCHANT PROFILE DATA
 * @route GET /store/me
 */
export const fetchMyStoreProfileAPI = async (): Promise<MyStoreProfileResponse> => {
  const response = await api.get("/store/me");
  return response.data;
};

/**
 * UPDATE MERCHANT STORE PROPERTIES AND lifecycles
 * @route PATCH /store/me
 */
export const updateMyStoreProfileAPI = async (payload: { is_vacation_mode?: boolean; shop_name?: string }): Promise<MyStoreProfileResponse> => {
  const response = await api.patch("/store/me", payload);
  return response.data;
};
/**
 * FETCH COMPOSITE HOME LANDING PAGE PAYLOAD
 * @route GET /storefront/home
 */
export const fetchStorefrontHomeData = async (params?: {
  banner_limit?: number;
  category_limit?: number;
  product_limit?: number;
}): Promise<StorefrontHomeResponse> => {
  const response = await api.get("/storefront/home", { params });
  return response.data;
};

export interface DojahLaunchConfig {
  app_id: string;
  public_key: string;
  widget_id: string;
  reference_id: string;
  environment: string;
  user_data: Record<string, unknown>;
}

export interface VerificationStatusSummary {
  status: 'unverified' | 'pending' | 'verified' | 'failed' | 'manual_review';
  tier: number;
  failure_reason: string | null;
  attempt_count: number;
  submitted_at: string | null;
  verified_at: string | null;
}

/**
 * INITIALIZE DOJAH SDK VERIFICATION SESSION
 * @route POST /seller/verification/start
 */
export const startSellerVerificationAPI = async (payload: { first_name: string; middle_name: string; last_name: string }): Promise<DojahLaunchConfig> => {
  const response = await api.post("/seller/verification/start", payload);
  return response.data;
};

/**
 * SUBMIT DOJAH WIDGET RESPONSE CALLBACK SUMMARY LOG
 * @route POST /seller/verification/complete
 */
export const completeSellerVerificationAPI = async (payload: { 
  reference_id: string; 
  sdk_result: Record<string, unknown>; 
}): Promise<{ summary: VerificationStatusSummary }> => {
  const response = await api.post("/seller/verification/complete", payload);
  return response.data;
};

/**
 * GET DETAILED MERCHANT KYC RECORD STATUS
 * @route GET /seller/verification/status
 */
export const fetchSellerVerificationStatusAPI = async (): Promise<{ summary: VerificationStatusSummary }> => {
  const response = await api.get("/seller/verification/status");
  return response.data;
};

export interface AutoReplyRuleAPI {
  id: string;
  trigger_type: 'welcome' | 'away';
  message_content: string;
  is_enabled: boolean;
}

/**
 * LIST ALL ACTIVE AUTO REPLY RULES
 * @route GET /seller/auto-replies
 */
export const fetchAutoRepliesAPI = async (): Promise<AutoReplyRuleAPI[]> => {
  const response = await api.get("/seller/auto-replies");
  return response.data;
};

/**
 * CREATE A FRESH AUTO REPLY RULE INSTANCE
 * @route POST /seller/auto-replies
 */
export const createAutoReplyAPI = async (payload: { trigger_type: 'welcome' | 'away'; message_content: string; is_enabled: boolean }): Promise<AutoReplyRuleAPI> => {
  const response = await api.post("/seller/auto-replies", payload);
  return response.data;
};

/**
 * PATCH AN EXISTING DYNAMIC AUTO REPLY RULE MATCH 
 * @route PATCH /seller/auto-replies/{reply_id}
 */
export const updateAutoReplyAPI = async (replyId: string, payload: { message_content?: string; is_enabled?: boolean }): Promise<AutoReplyRuleAPI> => {
  const response = await api.patch(`/seller/auto-replies/${replyId}`, payload);
  return response.data;
};

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

/**
 * FETCH CURRENT AUTHENTICATED USER DATA
 * @route GET /auth/me
 */
export const fetchAuthMeAPI = async (): Promise<UserProfileResponse> => {
  const response = await api.get("/auth/me");
  return response.data;
};

/**
 * UPDATE AUTHENTICATED USER DATA
 * @route PATCH /auth/me
 */
export const updateAuthMeAPI = async (payload: { name: string }): Promise<UserProfileResponse> => {
  const response = await api.patch("/auth/me", payload);
  return response.data;
};

/**
 * CHANGE AUTHENTICATED USER PASSWORD
 * @route POST /auth/change-password
 */
export const changePasswordAPI = async (payload: Record<string, string>): Promise<{ success: boolean; message?: string }> => {
  const response = await api.post("/auth/change-password", payload);
  return response.data;
};

export interface NotificationItemAPI {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'chat' | 'system' | 'promotion';
  is_read: boolean;
  created_at_human: string;
}

export interface UnreadCountResponse {
  unread_count: number;
}

/**
 * FETCH ALL NOTIFICATIONS LOGS
 * @route GET /notifications
 */
export const fetchNotificationsAPI = async (): Promise<NotificationItemAPI[]> => {
  const response = await api.get("/notifications");
  return response.data;
};

/**
 * MARK ALL OR SPECIFIC NOTIFICATIONS AS READ
 * @route POST /notifications/read
 */
export const markNotificationsAsReadAPI = async (payload?: { notification_ids?: string[] }): Promise<{ success: boolean }> => {
  const response = await api.post("/notifications/read", payload || {});
  return response.data;
};

/**
 * FETCH GLOBAL REAL-TIME UNREAD COUNTS
 * @route GET /notifications/unread_count
 */
export const fetchNotificationUnreadCountAPI = async (): Promise<UnreadCountResponse> => {
  const response = await api.get("/notifications/unread_count");
  return response.data;
};

export interface CreateOrderPayload {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
  shipping_address: {
    first_name: string;
    last_name: string;
    address_line: string;
    city: string;
    state: string;
    phone: string;
    email: string;
  };
}

export interface OrderInstanceAPI {
  id: string;
  order_id: string;
  total_amount: number;
  status: string;
}

export interface PaystackInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

/**
 * CONSTRUCT NEW BACKEND MARKETPLACE ORDER
 * @route POST /orders
 */
export const createMarketplaceOrderAPI = async (payload: CreateOrderPayload): Promise<OrderInstanceAPI> => {
  const response = await api.post("/orders", payload);
  return response.data;
};

/**
 * INITIALIZE PAYSTACK TRANSACTION GATEWAY FOR ACTIVE ORDER
 * @route POST /orders/{order_id}/pay
 */
export const initializeOrderPaymentAPI = async (orderId: string): Promise<PaystackInitResponse> => {
  const response = await api.post(`/orders/${orderId}/pay`, {});
  return response.data;
};

export interface CartItemAPI {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
  vendor_name?: string;
}

export interface UserCartResponse {
  items: CartItemAPI[];
  subtotal: number;
}

/**
 * FETCH PENDING CART SELECTIONS FOR LOGGED-IN CUSTOMER
 * @route GET /cart/mine
 */
export const fetchMyCurrentCartAPI = async (): Promise<UserCartResponse> => {
  const response = await api.get("/cart/mine");
  return response.data;
};

export interface StorefrontBannerItem {
  _id: string;
  tagline: string;
  title: string;
  discount_text: string;
  price_label: string;
  image_key: string;
  image_url: string;
  sort_order: number;
}

export interface StorefrontCategoryItem {
  name: string;
  slug: string;
  product_count: number;
  active_product_count: number;
}

export interface StorefrontProductItem {
  _id: string;
  seller_id: string;
  name: string;
  description: string;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  price: number;
  compare_at_price: number;
  sku: string;
  stock: number;
  low_stock_threshold: number;
  tags: string[];
  images: Array<{
    object_name: string;
    url: string;
    is_main: boolean;
  }>;
  specs: Array<{
    key: string;
    value: string;
  }>;
  promotion?: {
    discount_percent: number;
    starts_at: string;
    ends_at: string;
    label: string;
  };
  has_variants: boolean;
  is_active: boolean;
  sold: number;
  rating: number;
  review_count: number;
  is_ad: boolean;
  seller_accepts_online: boolean;
  is_first_listing: boolean;
  created_at: string;
  updated_at: string;
}

export interface StorefrontHomeResponse {
  banners: StorefrontBannerItem[];
  categories: StorefrontCategoryItem[];
  trending: StorefrontProductItem[];
  new_arrivals: StorefrontProductItem[];
  on_sale: StorefrontProductItem[];
}

/**
 * FETCH PUBLIC STOREFRONT AGGREGATED LANDING FEED DATA
 * @route GET /storefront/home
 */
export const fetchStorefrontHomeAPI = async (): Promise<StorefrontHomeResponse> => {
  const response = await api.get("/storefront/home");
  return response.data;
};

export interface FavouriteProductAPI {
  _id: string;
  name: string;
  sku: string;
  price: number;
  images: Array<{ url: string; is_main: boolean }>;
  is_active: boolean;
  vendor_name?: string;
}

/**
 * LIST ALL ACTIVE FAVORITED ITEMS
 * @route GET /favourites
 */
export const fetchFavouritesAPI = async (): Promise<FavouriteProductAPI[]> => {
  const response = await api.get("/favourites");
  return response.data;
};

/**
 * REMOVE ITEM FROM FAVOURITES VIA PARAMS ID
 * @route DELETE /favourites/{product_id}
 */
export const removeFavouriteAPI = async (productId: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/favourites/${productId}`);
  return response.data;
};

export interface SignedUrlPayload {
  content_type: string;
  prefix: 'products' | 'avatars' | 'branding';
}

export interface SignedUrlResponse {
  upload_url: string;
  public_url: string;
  object_name: string;
  method: 'PUT';
  headers: {
    'Content-Type': string;
    'Cache-Control'?: string;
    [key: string]: string | undefined;
  };
  max_size_bytes: number;
}

export interface UploadedImageAsset {
  object_name: string;
  url: string;
  is_main: boolean;
}

/**
 * REQUEST SIGNED PUT TRANSACTION METRICS FROM SERVER
 * @route POST /products/upload-url
 */
export const requestSignedUploadUrlAPI = async (payload: SignedUrlPayload): Promise<SignedUrlResponse> => {
  const response = await api.post("/products/upload-url", payload);
  return response.data;
};

/**
 * COMPILATION DISPATCH PROMISE: upload raw binary stream straight to Google Cloud Storage
 */
export const uploadFileBinaryToGCS = async (uploadUrl: string, file: File, headers: Record<string, string>) => {
  await axios.put(uploadUrl, file, {
    headers: {
      ...headers,
    }
  });
};

export interface BankItemAPI {
  name: string;
  code: string;
}

export interface ResolveAccountPayload {
  account_number: string;
  bank_code: string;
}

export interface ResolveAccountResponse {
  account_number: string;
  account_name: string;
}

export interface SavedBankAccountDetails {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

/**
 * FETCH SUPPORTED PAYOUT BANKS LIST
 * @route GET /payouts/banks
 */
export const fetchPayoutBanksAPI = async (): Promise<BankItemAPI[]> => {
  const response = await api.get("/payouts/banks");
  return response.data;
};

/**
 * RUN PAYSTACK ACCOUNT RESOLUTION VALIDATION
 * @route POST /payouts/resolve
 */
export const resolveBankAccountAPI = async (payload: ResolveAccountPayload): Promise<ResolveAccountResponse> => {
  const response = await api.post("/payouts/resolve", payload);
  return response.data;
};

/**
 * FETCH MERCHANTS CURRENTLY SAVED SETTLEMENT BANK INFO
 * @route GET /payouts/bank-account
 */
export const fetchSavedBankAPI = async (): Promise<SavedBankAccountDetails | null> => {
  try {
    const response = await api.get("/payouts/bank-account");
    return response.data;
  } catch {
    return null;
  }
};

/**
 * SAVE/UPDATE FINAL VALIDATED SETTLEMENT BANK FOR PAYOUTS
 * @route POST /payouts/bank-account
 */
export const saveBankAccountAPI = async (payload: SavedBankAccountDetails): Promise<{ success: boolean }> => {
  const response = await api.post("/payouts/bank-account", payload);
  return response.data;
};

export interface CategoryItem {
  name: string;
  slug: string;
  product_count: number;
  active_product_count: number;
}

export interface CategoriesFetchResponse {
  items: CategoryItem[];
}

export interface ProductAsset {
  id: string;
  name: string;
  price: number;
  description: string;
  images: Array<{ url: string; is_main: boolean }>;
}

/**
 * FETCH ALL DYNAMIC CATEGORIES FROM BACKEND
 * @route GET /categories
 */
export const fetchCategoriesAPI = async (): Promise<CategoriesFetchResponse> => {
  const response = await api.get("/categories", {
    params: { only_active: true }
  });
  return response.data;
};

/**
 * FETCH CATALOG PRODUCTS FILTERED BY ACTIVE SLUG PARAMETER
 * @route GET /products?category=<slug>
 */
export const fetchProductsByCategoryAPI = async (categorySlug: string): Promise<ProductAsset[]> => {
  const response = await api.get("/products", {
    params: { category: categorySlug }
  });
  return response.data?.items || response.data || [];
};

export interface BankItemAPI {
  code: string;
  name: string;
}