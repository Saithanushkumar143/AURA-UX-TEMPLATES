"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Briefcase,
  PartyPopper,
  LayoutGrid,
  ShieldCheck,
  LogOut,
  Copy,
  Check,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/admin-logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      setIsLoggingOut(false);
    }
  };

  const handleCopyBaseUrl = () => {
    navigator.clipboard.writeText("https://aurauxtemplates.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#070709]/85 backdrop-blur-xl shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* Brand Logo with 3D Gold Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/20 border border-amber-500/30 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 bg-black">
            <Image
              src="/logo.png"
              alt="AURA UX Gold Monogram Logo"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight flex items-center gap-1.5 font-serif">
              <span className="gold-gradient-text tracking-widest">AURA UX</span>
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono font-bold border border-amber-500/30 tracking-wider">
                Admin Panel
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-full border border-amber-500/20 shadow-inner">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              pathname === "/"
                ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold shadow-md shadow-amber-500/25"
                : "text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Analog Catalog
          </Link>
          <Link
            href="/templates/business/luxe-beauty"
            className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            Business Suite
          </Link>
          <Link
            href="/templates/celebrations/cinematic-birthday"
            className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5"
          >
            <PartyPopper className="w-4 h-4" />
            Celebrations Suite
          </Link>
        </nav>

        {/* Action Controls & Admin Status */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyBaseUrl}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-200/90 bg-zinc-900/90 hover:bg-amber-950/30 border border-amber-500/30 hover:border-amber-400/60 px-3 py-1.5 rounded-xl transition-all shadow-sm"
            title="Copy Base Production URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span className="font-mono">{copied ? "Copied URL!" : "aurauxtemplates.vercel.app"}</span>
          </button>

          {/* Security Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tamper Guard Active</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-red-500/20 hover:text-red-300 border border-zinc-800 hover:border-red-500/30 transition-all shadow-sm"
            title="Log out from Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? "Locking..." : "Admin Lock"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
