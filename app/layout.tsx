import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NewsletterModal from "./components/modals/NewLetterModal";

// Configuring Montserrat with the weights needed for the UI in image_3c8130.png
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // 500/600 is ideal for the nav text in image_3c8130.png
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
      <body
        className={`${montserrat.className} antialiased min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        {/* Persistent Header */}
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Persistent Footer */}
        <Footer />

        {/* This modal triggers automatically based on internal logic */}
        <NewsletterModal />
      </body>
    </html>
  );
}