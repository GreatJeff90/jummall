import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ModalLayerController from "./components/modals/ModalLayerController";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./providers/QueryProvider";
import ErrorBoundary from "./components/error/ErrorBoundary"; // Import the boundary

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
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${montserrat.className} antialiased min-h-full flex flex-col`} suppressHydrationWarning>
        
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            
            {/* ErrorBoundary wraps the main page content only */}
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