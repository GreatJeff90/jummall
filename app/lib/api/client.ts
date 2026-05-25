'use client';

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// --- Token Persistence Helpers ---
const getAccessToken = (): string | null => typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
const getRefreshToken = (): string | null => typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Synergize authorization tokens straight down into Edge Cookies for route security
    document.cookie = `access_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure' : ''}`;
  }
};

const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Cleanly delete the active Edge cookie block
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  }
};

// --- In-Flight Refresh Queue Tracking Elements ---
let isRefreshing = false;
let failedRequestQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown | null, token: string | null = null): void => {
  failedRequestQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedRequestQueue = [];
};

// ==========================================
// AXIOS CLIENT INSTANCE INITIALIZATION
// ==========================================
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Enforce strict configuration environment variable check boundaries
if (!baseURL) {
  throw new Error(
    "\n=========================================================\n" +
    "CRITICAL INSTANCE INITIALIZATION ERROR:\n" +
    "NEXT_PUBLIC_API_BASE_URL is missing inside your environment context.\n" +
    "Please populate your .env.local variables to start local staging channels.\n" +
    "=========================================================\n"
  );
}

export const api: AxiosInstance = axios.create({
  baseURL: baseURL.trim(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// REQUEST INTERCEPTOR: OUTBOUND AUTH WRAPPING
// ==========================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// ==========================================
// RESPONSE INTERCEPTOR: RECOVERY / 401 PIPELINE
// ==========================================
api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err: unknown) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        // Deconstruct refreshed dynamic tokens payload safely
        const { access_token, refresh_token } = refreshResponse.data.tokens || refreshResponse.data;

        setTokens(access_token, refresh_token);

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        processQueue(null, access_token);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);
        isRefreshing = false;
        clearTokens();
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);