"use client";

import Link from "next/link";
import { ShieldAlert, KeyRound, AlertOctagon } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden text-center selection:bg-purple-500 selection:text-white">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-8 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>URL Tamper Guard Triggered</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Access Restricted</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The route you attempted to access requires administrative authorization.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/admin/login"
            className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Enter Admin Passcode</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
