"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ShieldAlert,
  Lock,
  KeyRound,
  ArrowRight,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTamper = searchParams.get("tamper") === "1";
  const targetPath = searchParams.get("target") || searchParams.get("from") || "/";

  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          if (targetPath && targetPath !== "/admin/login" && !targetPath.includes("tamper")) {
            router.push(targetPath);
          } else {
            router.push("/");
          }
          router.refresh();
        }, 600);
      } else {
        setError(data.message || "Invalid Admin Passcode. Access denied.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between relative overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Background ambient lighting in gold */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] bg-yellow-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full border-b border-amber-500/20 bg-[#070709]/80 backdrop-blur-md px-6 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30 bg-black">
            <Image
              src="/logo.png"
              alt="Aura UX Logo"
              fill
              sizes="32px"
              priority
              className="object-cover"
            />
          </div>
          <span className="font-bold text-base tracking-tight font-serif flex items-center gap-2">
            <span className="gold-gradient-text tracking-wider">AURA UX</span>
            <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-zinc-900 text-amber-300 font-mono border border-amber-500/30">
              Security Gate
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Tamper Guard: Active</span>
        </div>
      </header>

      {/* Main Lock Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-8">
        <div className="w-full max-w-md space-y-6">
          {/* Tamper Warning Banner if triggered */}
          {isTamper && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-200">URL Tampering / Unauthorized Route Detected</p>
                <p className="text-amber-300/80 leading-relaxed">
                  Admin Passcode Authorization is required to proceed.
                </p>
              </div>
            </div>
          )}

          {/* Card Frame */}
          <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6">
            <div className="text-center space-y-3">
              <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden border border-amber-500/40 shadow-xl shadow-amber-500/20 bg-black p-0.5 group">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="AURA UX Logo"
                    fill
                    sizes="80px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight font-serif">
                {isTamper ? "Admin Passcode Required" : "Admin Panel Authorization"}
              </h1>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Please enter the administrative passcode to continue.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Passcode verified! Unlocking...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200/90">
                  Administrative Passcode
                </label>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode"
                    autoFocus
                    required
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-10 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa771c] hover:opacity-95 text-black font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Unlock System</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full py-4 text-center text-xs text-zinc-600 relative z-10 border-t border-zinc-900">
        <span>Aura UX Security Protection</span>
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070709] flex items-center justify-center text-zinc-400">Loading Security Gate...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
