"use client";

import { useState } from "react";
import { Share2, Copy, Check, ShieldCheck, X, Sparkles } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateSlug: string;
  templateTitle: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  templateSlug,
  templateTitle,
}: ShareModalProps) {
  const [tokenLink, setTokenLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const cleanSlug = templateSlug.replace(/^\/templates\//, "").replace(/^\/+|\/+$/g, "");
      const res = await fetch("/api/auth/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceSlug: cleanSlug }),
      });
      const data = await res.json();
      if (data.success && data.shareUrl) {
        setTokenLink(data.shareUrl);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  // Generate on first open if empty
  if (!tokenLink && !loading) {
    handleGenerate();
  }

  const handleCopy = () => {
    if (tokenLink) {
      navigator.clipboard.writeText(tokenLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-zinc-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Generate Signed Public Link</h2>
            <p className="text-xs text-zinc-400">Tamper-proof single-page access</p>
          </div>
        </div>

        <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-300 mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium">Resource:</span>
            <span className="font-semibold text-white">{templateTitle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium">Security Rule:</span>
            <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" /> URL Tamper Protected
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-xs font-semibold text-zinc-400">Signed Public URL</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-purple-300 truncate">
              {loading ? "Generating cryptographic signature..." : tokenLink || "Preparing link..."}
            </div>
            <button
              onClick={handleCopy}
              disabled={!tokenLink || loading}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <p className="text-[11px] text-zinc-500">
            Anyone with this link can view this template. If they edit the URL in the browser, they will be automatically redirected to the permission page.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition"
          >
            Close
          </button>
          {tokenLink && (
            <a
              href={tokenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Test Link
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
