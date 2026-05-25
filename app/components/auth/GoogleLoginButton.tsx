'use client';
import { useEffect, useCallback } from 'react';
import { api } from '@/app/lib/api/client';
import { useRouter } from 'next/navigation';

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    try {
      const { data } = await api.post('/auth/google', { 
        id_token: response.credential 
      });

      document.cookie = `access_token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax;`;
      router.push(data.user?.role === 'seller' ? '/seller/dashboard' : '/customer/overview');
    } catch {
      alert("Google login failed.");
    }
  }, [router]);

  useEffect(() => {
    // @ts-expect-error - Google GSI client is loaded globally
    window.google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });
    
    // @ts-expect-error - Google GSI client is loaded globally
    window.google?.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, [handleCredentialResponse]);

  return <div id="google-signin-btn" className="w-full flex justify-center" />;
}