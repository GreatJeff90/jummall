import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner"; // Added sonner import
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ModalLayerController from "./components/modals/ModalLayerController";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./providers/QueryProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Jummall E-commerce Marketplace",
  description: "One store, endless possibilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Identity Services Script */}
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${montserrat.className} antialiased min-h-full flex flex-col`} suppressHydrationWarning>
        
        {/* TanStack Query caching and retry engine context layer wraps the entire application ecosystem */}
        <QueryProvider>
          {/* CRITICAL: AuthProvider MUST be the outermost context wrapper so Navbar can consume its hooks! */}
          <AuthProvider>
            
            {/* Now Navbar sits perfectly inside the context channel */}
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />

            <ModalLayerController />
            
            {/* Added Toast global provider - richColors enables your brand's color themes */}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </QueryProvider>

      </body>
    </html>
  );
}