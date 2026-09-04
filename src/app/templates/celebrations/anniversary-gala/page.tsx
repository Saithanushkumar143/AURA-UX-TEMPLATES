"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Crown,
  Sparkles,
  Calendar,
  Utensils,
  Wine,
  CheckCircle,
  HeartHandshake
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AnniversaryGalaTemplate() {
  const [reserved, setReserved] = useState(false);
  const [menuChoice, setMenuChoice] = useState("filet");

  const fireGoldConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#d97706", "#fef3c7", "#ffffff"],
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0b06] text-amber-50 font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Banner & Quick Hub Return */}
      <div className="bg-amber-950/80 border-b border-amber-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-amber-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Aura UX Hub
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">Folder: <code className="text-amber-400 font-mono">/templates/celebrations/anniversary-gala</code></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono text-[10px] border border-amber-500/30">
            CELEBRATIONS TEMPLATE
          </span>
        </div>
      </div>

      {/* Gala Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d0b06]/90 backdrop-blur-md border-b border-amber-950">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Crown className="w-6 h-6 text-amber-400" />
            <span className="font-serif font-bold text-lg tracking-wider text-amber-100">
              GOLDEN JUBILEE GALA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-serif uppercase tracking-widest text-amber-200/70">
            <a href="#tribute" className="hover:text-amber-400">Tribute</a>
            <a href="#menu" className="hover:text-amber-400">Banquet</a>
            <a href="#table" className="hover:text-amber-400">Reservations</a>
          </nav>

          <button
            onClick={fireGoldConfetti}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Golden Toast</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
          50 Years of Love & Legacy &bull; 1976 – 2026
        </span>

        <h1 className="font-serif italic text-5xl sm:text-7xl font-bold text-amber-100 leading-tight">
          Arthur & Victoria Sterling
        </h1>

        <p className="text-amber-200/80 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          You are cordially invited to celebrate half a century of devotion, shared memories, and cherished family heritage at the Golden Jubilee Commemorative Banquet.
        </p>

        <div className="pt-6">
          <a
            href="#table"
            className="px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-950"
          >
            Confirm Table Reservation
          </a>
        </div>
      </section>

      {/* Banquet Menu */}
      <section id="menu" className="py-20 bg-amber-950/20 border-y border-amber-950">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif text-amber-100">Gala Dinner Menu</h2>
            <p className="text-xs uppercase tracking-widest text-amber-300/60">Crafted by Executive Chef Laurent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase">
                <Utensils className="w-4 h-4" /> Entrée Selection
              </div>
              <h4 className="font-serif font-bold text-white text-base">Prime Dry-Aged Filet Mignon</h4>
              <p className="text-xs text-amber-200/70">Served with truffle potato purée and vintage Barolo reduction.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase">
                <Wine className="w-4 h-4" /> Wine Pairing
              </div>
              <h4 className="font-serif font-bold text-white text-base">1976 Vintage Grand Cru Reserve</h4>
              <p className="text-xs text-amber-200/70">Commemorative anniversary vintage selected from the family cellar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table RSVP */}
      <section id="table" className="py-20 px-6 max-w-xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-amber-900/50 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-serif font-bold text-amber-100">Table Reservation</h3>
            <p className="text-xs text-amber-300/60">Grand Ballroom &bull; The Ritz Heritage</p>
          </div>

          {reserved ? (
            <div className="p-6 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-center space-y-2">
              <CheckCircle className="w-8 h-8 mx-auto text-amber-400" />
              <h4 className="font-serif font-bold text-white">Seat Confirmed</h4>
              <p className="text-xs text-amber-200">We look forward to honoring this golden milestone with you.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReserved(true);
                fireGoldConfetti();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                required
                placeholder="Guest Full Name"
                className="w-full bg-[#120f08] border border-amber-900/60 rounded-lg px-4 py-3 text-xs text-amber-100 placeholder-amber-400/30 focus:outline-none focus:border-amber-400"
              />
              <input
                type="email"
                required
                placeholder="Email Address for Formal Pass"
                className="w-full bg-[#120f08] border border-amber-900/60 rounded-lg px-4 py-3 text-xs text-amber-100 placeholder-amber-400/30 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-950"
              >
                Confirm Seating
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-950 py-10 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
        <p>&copy; {new Date().getFullYear()} Golden Jubilee Gala &bull; An Aura UX Celebrations Template.</p>
        <Link href="/" className="text-amber-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
