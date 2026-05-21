'use client';

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// --- Token Persistence Helpers ---
const getAccessToken = (): string | null => typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
const getRefreshToken = (): string | null => typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
};

const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', localStorage.getItem('access_token') || '');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// --- In-Flight Refresh Queue Tracking Elements ---
let isRefreshing = false;
let failedRequestQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void; // Fixed: Changed from 'any' to 'unknown' to solve Line 29 error
}> = [];

const processQueue = (error: unknown | null, token: string | null = null): void => { // Fixed: Changed from 'any' to 'unknown | null' to solve Line 32 error
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
export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jummall-api-1010705002271.europe-west2.run.app', //
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json', //
  },
});

// ==========================================
// REQUEST INTERCEPTOR: OUTBOUND AUTH WRAPPING
// ==========================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`; //
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
  async (error: unknown) => { // Fixed: Explicitly typed as 'unknown' instead of implicitly inheriting 'any'
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401 && !originalRequest._retry) { //
      
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`; //
            }
            return api(originalRequest);
          })
          .catch((err: unknown) => Promise.reject(err)); // Fixed: Changed interceptor map loop parameter from implicit 'any' to 'unknown'
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== 'undefined') window.location.href = '/login'; //
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { access_token, refresh_token } = refreshResponse.data.tokens; //

        setTokens(access_token, refresh_token); //

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`; //
        }

        processQueue(null, access_token);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError: unknown) { // Fixed: Changed from 'any' to 'unknown' to solve Line 141 error
        processQueue(refreshError, null);
        isRefreshing = false;
        clearTokens();
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login'; //
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);