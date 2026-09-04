"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES } from "@/data/templates";
import { Briefcase, PartyPopper, LayoutGrid, Search, Sparkles, FolderGit2, Check, ArrowRight, ShieldCheck, Zap, Globe2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "business" | "celebrations">("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Aura UX Multi-Template Architecture</span>
              <span className="text-zinc-600">|</span>
              <span className="text-purple-400 font-semibold">1 Vercel Project</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              One Vercel Project. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Unlimited Website Templates.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Welcome to the Aura UX ecosystem. Organize, showcase, and deploy your complete collection of 
              <strong className="text-zinc-200 font-medium"> Business</strong> and 
              <strong className="text-zinc-200 font-medium"> Celebrations</strong> templates effortlessly under a single optimized codebase.
            </p>

            {/* Folder Highlight Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
              <div 
                onClick={() => setSelectedCategory("business")} 
                className={`cursor-pointer p-4 rounded-2xl border transition-all text-left group ${
                  selectedCategory === "business" 
                    ? "bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-950/40" 
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
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
                    ? "bg-pink-950/40 border-pink-500/50 shadow-lg shadow-pink-950/40" 
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
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
        <section id="templates-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-zinc-800/80">
            {/* Category Pills */}
            <div className="flex items-center p-1 bg-zinc-900/80 rounded-2xl border border-zinc-800 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                All ({TEMPLATES.length})
              </button>
              <button
                onClick={() => setSelectedCategory("business")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === "business"
                    ? "bg-indigo-600 text-white shadow-md"
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
                    ? "bg-rose-600 text-white shadow-md"
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
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
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
                className="text-xs text-purple-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* WHY SINGLE PROJECT ARCHITECTURE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                Developer & Deployment Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How this single Vercel deployment structure works
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By organizing all template code inside <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded">src/app/templates/business</code> and <code className="text-pink-300 bg-zinc-800 px-1.5 py-0.5 rounded">src/app/templates/celebrations</code>, Next.js generates static/SSR routes automatically for every subfolder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">1 Project in Vercel</h4>
                <p className="text-xs text-zinc-400">
                  You only need to connect 1 GitHub repo to Vercel. No need to manage 10+ separate projects.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Globe2 className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">Clean Subpaths</h4>
                <p className="text-xs text-zinc-400">
                  Each template has a dedicated URL like <span className="font-mono text-zinc-300">/templates/celebrations/wedding-elegance</span>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm">Zero Styling Clashes</h4>
                <p className="text-xs text-zinc-400">
                  Every template folder manages its own scoped components, layouts, and animations independently.
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
