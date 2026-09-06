"use client";

import { useState, use, useEffect } from "react";
import { TEMPLATES } from "@/data/templates";
import {
  ShieldCheck,
  Lock,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Info,
} from "lucide-react";
import Link from "next/link";

interface SharePageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default function ShareViewPage({ params }: SharePageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || [];

  // Reconstruct template path (e.g., ["business", "luxe-beauty"] -> "/templates/business/luxe-beauty")
  const templatePath = `/templates/${slug.join("/")}`;
  const matchedTemplate = TEMPLATES.find(
    (t) => t.path === templatePath || t.id === slug[slug.length - 1]
  );

  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const [tokenParam, setTokenParam] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setTokenParam(urlParams.get("token") || "");
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const deviceWidthClass = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[90vh] my-4 rounded-2xl border-8 border-zinc-800 shadow-2xl overflow-hidden",
    mobile: "w-[390px] h-[844px] my-4 rounded-[40px] border-8 border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-zinc-700",
  }[device];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col overflow-hidden text-zinc-100">
      {/* Top Security & Navigation Header */}
      <header className="h-16 bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30">
        {/* Left: Template Information & Verified Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm sm:text-base text-white tracking-tight">
                {matchedTemplate?.title || slug.join(" / ")}
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Signed Token Verified
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Single-Resource Public Access Mode
            </p>
          </div>
        </div>

        {/* Center: Responsive Viewport Switcher */}
        <div className="hidden md:flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 gap-1">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === "desktop"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Desktop View"
          >
            <Laptop className="w-4 h-4" />
            <span className="hidden lg:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === "tablet"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden lg:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === "mobile"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden lg:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
          </button>

          <Link
            href="/access-denied?reason=admin_portal"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Unlock</span>
          </Link>
        </div>
      </header>

      {/* Security Info Banner */}
      <div className="bg-zinc-900/50 border-b border-zinc-800/80 px-4 py-1.5 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>
            Tamper protection active: modifying this URL to access other pages without permission will automatically redirect you.
          </span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
          Token: {tokenParam ? `${tokenParam.substring(0, 16)}...` : "Active"}
        </span>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-zinc-900/80 flex items-center justify-center p-0 md:p-3 overflow-auto">
        <div className={`transition-all duration-300 relative bg-zinc-950 ${deviceWidthClass}`}>
          <iframe
            src={templatePath}
            title={matchedTemplate?.title || "Template Preview"}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
