import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NewsletterModal from "./components/modals/NewLetterModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      {/* Adding suppressHydrationWarning here prevents extension-based errors 
          (like Grammarly or DarkReader) from breaking the React hydration process.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        {/* Persistent Header */}
        <Navbar />
        
        {/* Page Content - flex-grow ensures the footer stays at the bottom */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Persistent Footer */}
        <Footer />

        {/* This modal will trigger automatically based on the logic in its component */}
        <NewsletterModal />
      </body>
    </html>
  );
}