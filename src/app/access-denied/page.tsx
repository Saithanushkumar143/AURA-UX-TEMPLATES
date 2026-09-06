"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldAlert,
  Lock,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { TEMPLATES } from "@/data/templates";

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reason = searchParams.get("reason") || "unauthorized";
  const attempted = searchParams.get("attempted") || "";

  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [lastAllowedUrl, setLastAllowedUrl] = useState<string | null>(null);

  // Quick link generator state
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]?.id || "luxe-beauty");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Check if we have a last allowed URL stored in document.cookie
    if (typeof document !== "undefined") {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("aura_last_allowed_url="));
      if (match) {
        setLastAllowedUrl(decodeURIComponent(match.split("=")[1]));
      }
    }
  }, []);

  const handleAdminUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg("Please enter the admin passcode");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Admin passcode verified! Unlocking full access...");
        setTimeout(() => {
          if (attempted && attempted.startsWith("/")) {
            router.push(attempted);
          } else {
            router.push("/");
          }
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(data.error || "Incorrect passcode. Access denied.");
      }
    } catch {
      setErrorMsg("Connection error while validating passcode.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    setGenerating(true);
    try {
      const target = TEMPLATES.find((t) => t.id === selectedTemplate);
      const slug = target ? target.path.replace(/^\/templates\//, "") : selectedTemplate;
      const res = await fetch("/api/auth/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceSlug: slug }),
      });
      const data = await res.json();
      if (data.success && data.shareUrl) {
        setGeneratedLink(data.shareUrl);
      }
    } catch {
      setErrorMsg("Failed to generate share link");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getReasonDetails = () => {
    switch (reason) {
      case "tampered_url":
        return {
          title: "URL Modification Blocked",
          badge: "Single-Template Lockdown",
          desc: "You entered via a specific template link. Modifying the browser URL to view other templates or private pages without permission is blocked.",
        };
      case "invalid_or_altered_token":
        return {
          title: "URL Alteration Detected",
          badge: "Tamper Protection Triggered",
          desc: "You modified the URL to access a resource that does not match your signed access token. Each public link is cryptographically tied to its specific page.",
        };
      case "missing_token":
        return {
          title: "Missing Access Token",
          badge: "Token Required",
          desc: "This shared resource requires a valid cryptographic token. Please use the original shared link provided to you.",
        };
      case "admin_portal":
        return {
          title: "Admin Authorization Portal",
          badge: "Elevated Privileges",
          desc: "Enter your admin passcode below to manage, preview, and generate signed links for all templates.",
        };
      default:
        return {
          title: "Restricted Access",
          badge: "Permission Required",
          desc: "Direct navigation to this page is restricted. You must have an authorized share link or enter the Admin Passcode.",
        };
    }
  };

  const details = getReasonDetails();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">
        {/* Header Icon & Badges */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                {details.badge}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {details.title}
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <Lock className="w-3.5 h-3.5" /> Secure Guard
          </div>
        </div>

        {/* Explanation Box */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-4 mb-6 text-sm text-zinc-300">
          <p className="leading-relaxed">{details.desc}</p>
          {attempted && (
            <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Attempted Route:</span>
              <code className="px-2 py-0.5 rounded bg-zinc-900 text-purple-300 border border-zinc-700 font-mono text-[11px] truncate max-w-[320px]">
                {attempted}
              </code>
            </div>
          )}
        </div>

        {/* Action: Return to last allowed or catalog */}
        <div className="flex flex-wrap gap-2 mb-6">
          {lastAllowedUrl && (
            <Link
              href={lastAllowedUrl}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Authorized Page
            </Link>
          )}
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          >
            Browse Public Catalog
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-3 text-zinc-500 font-mono">
              Admin & Permission Unlock
            </span>
          </div>
        </div>

        {/* Admin Passcode Form */}
        <form onSubmit={handleAdminUnlock} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                Enter Admin Passcode
              </span>
              <span className="text-[11px] text-zinc-500">Default: <code className="text-purple-300 font-mono">AURA-2026-ADMIN</code></span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode to unlock all routes..."
                className="w-full px-4 py-2.5 bg-zinc-950/90 border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span>Validating Passcode...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Unlock Full Access
              </>
            )}
          </button>
        </form>

        {/* Quick Link Generator Tool for Demo / Testing */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
              Need to test a valid Signed URL?
            </h3>
            <span className="text-[10px] text-zinc-500">Instant Generator</span>
          </div>

          <div className="flex gap-2 mb-2">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-purple-500"
            >
              {TEMPLATES.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.title} ({tpl.id})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleGenerateLink}
              disabled={generating}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-xl transition border border-zinc-700"
            >
              {generating ? "Generating..." : "Generate Token"}
            </button>
          </div>

          {generatedLink && (
            <div className="mt-2 p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-purple-300 truncate">
                {generatedLink}
              </span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition"
                  title="Copy link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <Link
                  href={generatedLink}
                  className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-medium transition"
                >
                  Visit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Loading security module...</div>}>
      <AccessDeniedContent />
    </Suspense>
  );
}
