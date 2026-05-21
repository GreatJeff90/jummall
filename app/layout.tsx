import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ModalLayerController from "./components/modals/ModalLayerController";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className={`${montserrat.className} antialiased min-h-full flex flex-col`} suppressHydrationWarning>
        {/* CRITICAL: AuthProvider MUST be the outermost wrapper so Navbar can consume its hooks! */}
        <AuthProvider>
          
          {/* Now Navbar sits perfectly inside the context channel */}
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />

          <ModalLayerController />
        </AuthProvider>
      </body>
    </html>
  );
}