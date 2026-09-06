"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Monitor, Tablet, Smartphone, ExternalLink, Sparkles } from "lucide-react";

interface PreviewHeaderProps {
  title: string;
  category: string;
  templatePath: string;
  activeDevice?: "desktop" | "tablet" | "mobile";
  onDeviceChange?: (device: "desktop" | "tablet" | "mobile") => void;
}

export default function PreviewHeader({
  title,
  category,
  templatePath,
  activeDevice = "desktop",
  onDeviceChange,
}: PreviewHeaderProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#070709]/95 border-b border-amber-500/20 backdrop-blur-md px-4 py-2.5 flex items-center justify-between shadow-xl">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 text-amber-200 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <div className="relative w-4 h-4 rounded overflow-hidden">
            <Image src="/logo.png" alt="Logo" fill sizes="16px" className="object-cover" />
          </div>
          <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
          <span>Hub</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 border-l border-zinc-800 pl-3">
          <span className="text-xs font-bold text-white tracking-tight">{title}</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            {category}
          </span>
        </div>
      </div>

      {/* Center: Device Switcher (if onDeviceChange is provided) */}
      {onDeviceChange && (
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => onDeviceChange("desktop")}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs ${
              activeDevice === "desktop"
                ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => onDeviceChange("tablet")}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs ${
              activeDevice === "tablet"
                ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => onDeviceChange("mobile")}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs ${
              activeDevice === "mobile"
                ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={templatePath}
          target="_blank"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
        >
          <span>Open Direct</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </Link>
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black hover:opacity-95 shadow-md shadow-amber-500/20 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Use Template</span>
        </Link>
      </div>
    </div>
  );
}
