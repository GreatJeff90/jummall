'use client';

import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ModalLayerController from "./components/modals/ModalLayerController";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./providers/QueryProvider";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // --- DYNAMIC RUNTIME TITLE ENGINE MAPPINGS ---
  const getPageMeta = () => {
    switch (pathname) {
      case "/":
        return { title: "Jummall | Premium E-commerce Marketplace", desc: "One store, endless possibilities with secure escrow protection." };
      case "/login":
        return { title: "Secure Terminal Login | Jummall", desc: "Log into your customer overview or merchant portal safely." };
      case "/register":
        return { title: "Create Your Account | Jummall", desc: "Join Jummall today as a shopper or verification vendor." };
      case "/shop":
        return { title: "Browse Marketplace Catalog | Jummall", desc: "Explore top tier phones, laptops, and authentic smartwatches." };
      case "/blog":
        return { title: "Insights & Technical Blog | Jummall", desc: "Read recent field articles covering tech updates and modern systems." };
      case "/contact":
        return { title: "Customer Assistance & Support | Jummall", desc: "Reach out to the technical assistance team for direct terminal help." };
      case "/sell":
        return { title: "Merchant Dashboard Onboarding | Jummall", desc: "List your premium catalog inventories and scale your payouts." };
      default:
        // Handle nested paths dynamically (e.g., /customer/overview -> "Customer Overview")
        if (pathname?.startsWith("/customer")) {
          return { title: "Personal Terminal Overview | Jummall", desc: "Manage your active escrow acquisitions." };
        }
        if (pathname?.startsWith("/seller")) {
          return { title: "Merchant Operations Panel | Jummall", desc: "Monitor store revenue nodes and logistics status." };
        }
        return { title: "Jummall E-commerce Marketplace", desc: "One store, endless possibilities." };
    }
  };

  const currentMeta = getPageMeta();

  return (
    <html lang="en" className="h-full">
      <head>
        {/* Inject variables dynamically to allow pure engine visibility changes without static server dependencies */}
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.desc} />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${montserrat.className} antialiased min-h-full flex flex-col`} suppressHydrationWarning>
        
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            
            <main className="flex-grow">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            
            <Footer />
            <ModalLayerController />
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </QueryProvider>

      </body>
    </html>
  );
}