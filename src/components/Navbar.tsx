"use client";

import Link from "next/link";
import { Sparkles, Briefcase, PartyPopper, LayoutGrid, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              AURA <span className="text-purple-400 font-extrabold">UX</span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-medium border border-purple-500/30">
                Multi-Template
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-full border border-zinc-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === "/"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All Templates
          </Link>
          <Link
            href="/templates/business"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/templates/business")
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Business
          </Link>
          <Link
            href="/templates/celebrations"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/templates/celebrations")
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <PartyPopper className="w-4 h-4" />
            Celebrations
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <span>Single Project Vercel Setup</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="#templates-grid"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Library
          </Link>
        </div>
      </div>
    </header>
  );
}
