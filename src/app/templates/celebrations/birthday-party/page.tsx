"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PartyPopper,
  Sparkles,
  Flame,
  Music,
  MapPin,
  Clock,
  Shirt,
  Send,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BirthdayPartyTemplate() {
  const [rsvpStatus, setRsvpStatus] = useState(false);

  const fireCannons = () => {
    // Left cannon
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
    });
    // Right cannon
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
    });
  };

  return (
    <div className="min-h-screen bg-[#080508] text-zinc-100 font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Banner & Quick Hub Return */}
      <div className="bg-pink-950/80 border-b border-pink-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-pink-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Aura UX Hub
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">Folder: <code className="text-pink-400 font-mono">/templates/celebrations/birthday-party</code></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-mono text-[10px] border border-pink-500/30">
            CELEBRATIONS TEMPLATE
          </span>
        </div>
      </div>

      {/* Party Navigation */}
      <header className="sticky top-0 z-40 bg-[#080508]/90 backdrop-blur-md border-b border-pink-950">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-pink-500 animate-pulse" />
            <span className="font-black text-lg tracking-tighter text-white uppercase">
              MARCUS <span className="text-pink-500">LEVEL 25</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fireCannons}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-600/30 flex items-center gap-1.5"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Fire Confetti</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL BIRTHDAY INVITATION & VIP PASS</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tight text-white">
            Glow Night <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-amber-400">
              Marcus is 25
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Get ready for an unforgettable night of high-voltage electronic music, neon drinks, and non-stop celebration!
          </p>
        </div>

        {/* Event Key Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-pink-900/40 space-y-1">
            <div className="flex items-center gap-1.5 text-pink-400 text-xs font-semibold">
              <Clock className="w-4 h-4" /> TIME & DATE
            </div>
            <p className="font-bold text-white text-sm">Oct 24, 2026 &bull; 9:00 PM</p>
            <span className="text-[11px] text-zinc-500">Doors open 8:30 PM</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-purple-900/40 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold">
              <MapPin className="w-4 h-4" /> LOCATION
            </div>
            <p className="font-bold text-white text-sm">Skyline Rooftop Lounge</p>
            <span className="text-[11px] text-zinc-500">742 Neon Blvd, Downtown</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-900/40 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Shirt className="w-4 h-4" /> DRESS CODE
            </div>
            <p className="font-bold text-white text-sm">Neon & All-Black Chic</p>
            <span className="text-[11px] text-zinc-500">Glow gear provided</span>
          </div>
        </div>
      </section>

      {/* Party RSVP */}
      <section className="py-16 px-6 max-w-xl mx-auto">
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-pink-900/50 space-y-6 shadow-2xl">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black uppercase text-white">Claim Your Guest Pass</h3>
            <p className="text-xs text-zinc-400">Strict guestlist at the door. Please confirm your entry.</p>
          </div>

          {rsvpStatus ? (
            <div className="p-6 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-center space-y-2">
              <PartyPopper className="w-8 h-8 mx-auto text-pink-400" />
              <h4 className="font-bold text-white">You Are on the Guestlist!</h4>
              <p className="text-xs text-pink-200">See you on the dance floor. Get ready for 25!</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpStatus(true);
                fireCannons();
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                placeholder="Your Full Name"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number (for SMS Pass)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-600/30"
              >
                Confirm VIP Entry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Marcus 25th Birthday &bull; An Aura UX Celebrations Template.</p>
        <Link href="/" className="text-pink-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
