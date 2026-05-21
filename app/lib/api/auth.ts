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