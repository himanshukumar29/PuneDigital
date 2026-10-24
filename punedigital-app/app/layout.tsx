import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PuneDigital | Ultra-Luxury Restaurant Websites & 0% Comm Direct Ordering",
  description: "Bespoke digital storefronts, QR table reservation suites, and 0% commission direct-ordering engines for Pune's finest dining destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#0c0c0e] text-[#f4f4f6] font-sans selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
