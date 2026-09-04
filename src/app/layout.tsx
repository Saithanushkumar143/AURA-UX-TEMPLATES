import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA UX | Premium Website Templates Marketplace",
  description: "A comprehensive library of high-performance Business and Celebrations website templates deployed seamlessly in a single project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
