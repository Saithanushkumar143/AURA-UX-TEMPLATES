"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Gift,
  Check,
  Send,
  Music,
  Camera
} from "lucide-react";
import confetti from "canvas-confetti";

export default function WeddingEleganceTemplate() {
  const [rsvpSent, setRsvpSent] = useState(false);
  const [attendance, setAttendance] = useState<"attending" | "regret">("attending");
  const [guestCount, setGuestCount] = useState("1");

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 124,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#fda4af", "#f43f5e", "#fef08a", "#e0e7ff"],
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0c0f] text-rose-50 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Banner & Quick Hub Return */}
      <div className="bg-rose-950/80 border-b border-rose-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-rose-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Aura UX Hub
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">Folder: <code className="text-rose-400 font-mono">/templates/celebrations/wedding-elegance</code></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-mono text-[10px] border border-rose-500/30">
            CELEBRATIONS TEMPLATE
          </span>
        </div>
      </div>

      {/* Romantic Navigation */}
      <header className="sticky top-0 z-40 bg-[#0f0c0f]/90 backdrop-blur-md border-b border-rose-950/80">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30" />
            <span className="font-serif italic text-xl font-bold tracking-wider text-rose-100">
              Elena & Alexander
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-rose-200/80">
            <a href="#story" className="hover:text-rose-400 transition-colors">Our Story</a>
            <a href="#details" className="hover:text-rose-400 transition-colors">Event Details</a>
            <a href="#gallery" className="hover:text-rose-400 transition-colors">Gallery</a>
            <a href="#rsvp" className="hover:text-rose-400 transition-colors">RSVP</a>
          </nav>

          <button
            onClick={triggerConfetti}
            className="px-4 py-2 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-rose-900/40 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>We Are Getting Married</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif italic text-5xl sm:text-8xl text-rose-100 tracking-wide">
            Elena & Alexander
          </h1>
          <p className="font-sans uppercase tracking-[0.3em] text-xs sm:text-sm text-rose-300/80">
            Saturday, November 14, 2026 &bull; Lake Como, Italy
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="max-w-xl mx-auto pt-6">
          <div className="grid grid-cols-4 gap-3 sm:gap-4 p-6 rounded-3xl bg-rose-950/30 border border-rose-900/40 backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-rose-100">{timeLeft.days}</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-300/70">Days</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-rose-100">{timeLeft.hours}</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-300/70">Hours</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-rose-100">{timeLeft.minutes}</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-300/70">Minutes</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-rose-400">{timeLeft.seconds}</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-300/70">Seconds</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="#rsvp"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-xl shadow-rose-950/50"
          >
            RSVP Your Attendance
          </a>
        </div>
      </section>

      {/* Event Details */}
      <section id="details" className="py-20 bg-rose-950/20 border-y border-rose-950/60">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-rose-400">The Celebration</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-rose-100">Where & When</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-rose-950/40 border border-rose-900/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-rose-100">Ceremony</h3>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                4:00 PM &bull; Grand Rose Garden <br />
                Villa del Balbianello, Lake Como
              </p>
              <span className="inline-block text-[11px] text-rose-400 font-mono">Formal Black Tie</span>
            </div>

            <div className="p-8 rounded-3xl bg-rose-950/40 border border-rose-900/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-rose-100">Cocktail & Dinner</h3>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                6:30 PM &bull; Lakeside Pavilion <br />
                Four-Course Italian Gala Banquet
              </p>
              <span className="inline-block text-[11px] text-rose-400 font-mono">Live Jazz & Champagne</span>
            </div>

            <div className="p-8 rounded-3xl bg-rose-950/40 border border-rose-900/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-rose-100">Afterparty</h3>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                10:00 PM till Late &bull; The Cellar <br />
                Fireworks, DJ & Midnight Bites
              </p>
              <span className="inline-block text-[11px] text-rose-400 font-mono">Dancing Shoes Recommended</span>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-6 max-w-2xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-rose-950/40 border border-rose-900/60 backdrop-blur-lg space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-serif text-rose-100">Kindly RSVP</h3>
            <p className="text-xs uppercase tracking-widest text-rose-300/70">Please reply before October 1st, 2026</p>
          </div>

          {rsvpSent ? (
            <div className="p-6 rounded-2xl bg-rose-900/40 border border-rose-500/40 text-center space-y-3">
              <Heart className="w-8 h-8 mx-auto text-rose-400 fill-rose-400 animate-bounce" />
              <h4 className="font-serif text-xl text-white">Thank You for Your Response!</h4>
              <p className="text-xs text-rose-200">We cannot wait to celebrate our special day with you in Italy.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpSent(true);
                triggerConfetti();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("attending")}
                  className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    attendance === "attending"
                      ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-950"
                      : "bg-rose-950/40 border-rose-900/50 text-rose-300"
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("regret")}
                  className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    attendance === "regret"
                      ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-950"
                      : "bg-rose-950/40 border-rose-900/50 text-rose-300"
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="Full Name(s) of Guest(s)"
                className="w-full bg-[#161016] border border-rose-900/60 rounded-xl px-4 py-3 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-rose-400"
              />

              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-[#161016] border border-rose-900/60 rounded-xl px-4 py-3 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-rose-400"
              />

              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-[#161016] border border-rose-900/60 rounded-xl px-4 py-3 text-xs text-rose-100 focus:outline-none focus:border-rose-400"
              >
                <option value="1">Attending: 1 Person</option>
                <option value="2">Attending: 2 People</option>
                <option value="3">Attending: 3 People (Family)</option>
              </select>

              <textarea
                rows={2}
                placeholder="Dietary requirements or a message to the couple..."
                className="w-full bg-[#161016] border border-rose-900/60 rounded-xl px-4 py-3 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-rose-400"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Send RSVP Response
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wedding Footer */}
      <footer className="border-t border-rose-950 py-10 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/60 gap-4">
        <p>&copy; {new Date().getFullYear()} Elena & Alexander Wedding &bull; An Aura UX Celebrations Template.</p>
        <Link href="/" className="text-rose-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
