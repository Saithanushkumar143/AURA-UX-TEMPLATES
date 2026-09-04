"use client";

import { useState } from "react";
import {
  Briefcase,
  Award,
  Calendar,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle,
  PhoneCall
} from "lucide-react";

export default function ConsultingProTemplate() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-[#061011] text-zinc-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-teal-950/80 border-b border-teal-900/50 px-4 py-2 flex items-center justify-center text-xs">
        <span className="bg-teal-500/20 text-teal-300 px-3 py-0.5 rounded-full font-mono text-[10px] border border-teal-500/30 font-bold uppercase tracking-wider">
          AURA UX TEMPLATE
        </span>
      </div>

      {/* Advisory Header */}
      <header className="sticky top-0 z-40 bg-[#061011]/90 backdrop-blur-md border-b border-teal-950">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 text-zinc-950 flex items-center justify-center font-serif font-black text-xl">
              V
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-white">Vanguard <span className="text-teal-400">Advisory</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <a href="#expertise" className="hover:text-white">Practice Areas</a>
            <a href="#leadership" className="hover:text-white">Partners</a>
            <a href="#insights" className="hover:text-white">Insights</a>
          </nav>

          <a
            href="#booking"
            className="px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-teal-500/20"
          >
            Schedule Consultation
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
            Strategic Management & Capital Advisory
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white leading-tight">
            Guiding executive decisions through market complexity.
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            We provide institutional leaders, venture funds, and Fortune 500 boards with strategic clarity, risk mitigation, and M&A execution frameworks.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#booking"
              className="px-6 py-3.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Request Strategic Audit
            </a>
            <a
              href="#expertise"
              className="px-6 py-3.5 rounded-lg bg-zinc-900 border border-teal-900/50 text-teal-300 hover:text-white text-xs uppercase tracking-wider transition-all font-semibold"
            >
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="py-20 bg-zinc-950/60 border-y border-teal-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-white">Practice Areas</h2>
            <p className="text-xs text-zinc-400">Institutional advisory tailored for corporate transformation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#081618] border border-teal-900/40 space-y-4">
              <TrendingUp className="w-8 h-8 text-teal-400" />
              <h3 className="text-xl font-serif font-bold text-white">Mergers & Acquisitions</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Comprehensive buy-side/sell-side transaction support, post-merger integration, and valuation modeling.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#081618] border border-teal-900/40 space-y-4">
              <ShieldCheck className="w-8 h-8 text-teal-400" />
              <h3 className="text-xl font-serif font-bold text-white">Enterprise Governance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Board oversight optimization, regulatory compliance, and cross-border risk management protocols.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#081618] border border-teal-900/40 space-y-4">
              <Building className="w-8 h-8 text-teal-400" />
              <h3 className="text-xl font-serif font-bold text-white">Digital Transformation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Modernizing legacy operational infrastructure with automated intelligence and cloud platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <section id="booking" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#081618] border border-teal-900/60 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-white">Confidential Executive Briefing</h3>
            <p className="text-xs text-zinc-400">Connect directly with a Senior Partner to discuss confidential mandate requirements.</p>
          </div>

          {booked ? (
            <div className="p-6 rounded-2xl bg-teal-950/60 border border-teal-500/40 text-teal-300 text-center space-y-2">
              <CheckCircle className="w-8 h-8 mx-auto text-teal-400" />
              <h4 className="font-bold text-white">Briefing Requested</h4>
              <p className="text-xs text-zinc-300">Our Managing Director will reach out via secure channels shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name & Title"
                  className="w-full bg-zinc-950 border border-teal-900/60 rounded-lg px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-400"
                />
                <input
                  type="text"
                  required
                  placeholder="Organization / Company"
                  className="w-full bg-zinc-950 border border-teal-900/60 rounded-lg px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-400"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Direct Executive Email"
                className="w-full bg-zinc-950 border border-teal-900/60 rounded-lg px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-400"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-teal-950 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Vanguard Advisory</p>
        <span className="text-teal-400 font-mono text-[11px]">Aura UX Template</span>
      </footer>
    </div>
  );
}
