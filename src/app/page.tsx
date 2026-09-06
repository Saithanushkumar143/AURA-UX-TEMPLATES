"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES } from "@/data/templates";
import Image from "next/image";
import {
  Briefcase,
  PartyPopper,
  LayoutGrid,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Copy,
  Check,
  Lock,
  Link2,
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "business" | "celebrations">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedBatch, setCopiedBatch] = useState(false);
  const [copiedBase, setCopiedBase] = useState(false);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesCat = selectedCategory === "all" || t.category === selectedCategory;
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const businessCount = TEMPLATES.filter((t) => t.category === "business").length;
  const celebrationsCount = TEMPLATES.filter((t) => t.category === "celebrations").length;

  const handleCopyBaseUrl = () => {
    navigator.clipboard.writeText("https://aurauxtemplates.vercel.app");
    setCopiedBase(true);
    setTimeout(() => setCopiedBase(false), 2000);
  };

  const handleCopyAllLinks = () => {
    const list = TEMPLATES.map(
      (t) => `• ${t.title} (${t.category.toUpperCase()}): https://aurauxtemplates.vercel.app${t.path}`
    ).join("\n");
    navigator.clipboard.writeText(list);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] selection:bg-[#d4af37] selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* HERO / GOLD ADMIN CONTROL BANNER */}
        <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Gold & Warm Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[320px] h-[320px] bg-yellow-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            {/* 3D Gold Logo Showcase */}
            <div className="flex justify-center mb-2">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/30 border border-amber-500/40 bg-black p-1 group hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Aura UX Logo"
                    fill
                    sizes="112px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Admin Authenticated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs text-zinc-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold tracking-wide">Admin Authorized Session</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">URL Tamper Guard Active</span>
            </div>

            {/* Headline with Gold Gradient */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Aura UX Master <br />
              <span className="gold-gradient-text">
                Analog Panel of Templates
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Central control hub for your multi-template system deployed at{" "}
              <button
                onClick={handleCopyBaseUrl}
                className="text-amber-300 hover:text-amber-200 underline font-mono text-sm inline-flex items-center gap-1 font-semibold"
                title="Click to copy"
              >
                <span>https://aurauxtemplates.vercel.app</span>
                {copiedBase ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              . Copy direct template links to use inside your other website smoothly.
            </p>

            {/* Quick Integration & Share Tools Bar */}
            <div className="p-4 rounded-2xl bg-zinc-900/70 border border-amber-500/25 backdrop-blur-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-lg shadow-black/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">External Website Link Hub</h4>
                  <p className="text-[11px] text-zinc-400">
                    Direct template URLs bypass lock screen; root and tampered URLs remain admin-locked.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyAllLinks}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa771c] hover:opacity-95 text-black font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  {copiedBatch ? <Check className="w-3.5 h-3.5 text-black font-bold" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                  <span>{copiedBatch ? "Copied All 14 Links!" : "Copy All Template Links"}</span>
                </button>
              </div>
            </div>

            {/* Folder Highlight Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
              <div
                onClick={() => setSelectedCategory("business")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all text-left group ${
                  selectedCategory === "business"
                    ? "bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/40"
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    /templates/business
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm">1. Business Folder</h3>
                <p className="text-xs text-zinc-400 mt-1">{businessCount} Ready-to-use Corporate & SaaS Templates</p>
              </div>

              <div
                onClick={() => setSelectedCategory("celebrations")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all text-left group ${
                  selectedCategory === "celebrations"
                    ? "bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/40"
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    /templates/celebrations
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm">2. Celebrations Folder</h3>
                <p className="text-xs text-zinc-400 mt-1">{celebrationsCount} Luxury Weddings, Parties & Gala Templates</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEMPLATE FILTER & CATALOG SECTION */}
        <section id="templates-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-zinc-800/80">
            {/* Category Pills */}
            <div className="flex items-center p-1 bg-zinc-900/80 rounded-2xl border border-amber-500/20 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                All Templates ({TEMPLATES.length})
              </button>
              <button
                onClick={() => setSelectedCategory("business")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === "business"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Business ({businessCount})
              </button>
              <button
                onClick={() => setSelectedCategory("celebrations")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === "celebrations"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <PartyPopper className="w-4 h-4" />
                Celebrations ({celebrationsCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search templates, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-amber-500/20 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-zinc-400">No templates found matching your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-amber-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* SECURITY & DEPLOYMENT ARCHITECTURE DETAILS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl bg-zinc-900/40 border border-amber-500/20 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Security & Multi-Site Integration Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                How external users and admin protection work together
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                External visitors clicking links from your other website directly reach individual template paths (like <code className="text-amber-300 bg-zinc-800 px-1.5 py-0.5 rounded">https://aurauxtemplates.vercel.app/templates/business/luxe-beauty</code>) with zero friction. If anyone attempts to navigate to the master domain, browse the analog panel, or tamper with the URL, the Edge Middleware automatically enforces Admin Passcode Authorization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/20 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">URL Tamper Shield</h4>
                <p className="text-xs text-zinc-400">
                  Any attempt to manipulate URL paths, inspect non-public directories, or access unlisted routes is blocked by the Passcode Gate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/20 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Globe2 className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">External Website Ready</h4>
                <p className="text-xs text-zinc-400">
                  Seamlessly link from buttons and cards on your other website directly to the live templates without exposing admin controls.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/20 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">Master Passcode Auth</h4>
                <p className="text-xs text-zinc-400">
                  Configurable via <code className="text-zinc-300 font-mono">ADMIN_PASSCODE</code> environment variable on Vercel (default: <code className="text-amber-300 font-mono">aura2025</code>).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
