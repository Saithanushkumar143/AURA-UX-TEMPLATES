"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Check, 
  Layers, 
  Code2, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star, 
  Building2, 
  Send, 
  ArrowLeft,
  Sparkles,
  Award,
  ChevronRight
} from "lucide-react";

export default function CorporateAgencyTemplate() {
  const [projectBudget, setProjectBudget] = useState("$10k - $25k");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner & Quick Hub Return */}
      <div className="bg-indigo-950/80 border-b border-indigo-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-indigo-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Aura UX Hub
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">Folder: <code className="text-indigo-400 font-mono">/templates/business/corporate-agency</code></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono text-[10px] border border-indigo-500/30">
            BUSINESS TEMPLATE
          </span>
        </div>
      </div>

      {/* Agency Navigation */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">APEX<span className="text-indigo-500">.AGENCY</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#estimate" className="hover:text-white transition-colors">Cost Estimator</a>
          </nav>

          <a
            href="#estimate"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/25"
          >
            Get a Proposal
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Award-Winning Digital Product & Design Studio</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
            We engineer digital products that scale to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">millions.</span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Apex Agency partners with world-class brands and high-growth startups to design, build, and scale exceptional digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Explore Selected Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#estimate"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Estimate Project Cost</span>
            </a>
          </div>

          {/* Social Proof Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-zinc-800/80">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">99.4%</p>
              <p className="text-xs text-zinc-500">Client Satisfaction</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">$140M+</p>
              <p className="text-xs text-zinc-500">Client Revenue Generated</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">250+</p>
              <p className="text-xs text-zinc-500">Projects Shipped</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">18</p>
              <p className="text-xs text-zinc-500">Global Design Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Tailored solutions for modern enterprises</h2>
            <p className="text-zinc-400 text-sm">From concept to production-ready software, we handle end-to-end execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/50 transition-all group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Product & UI/UX Design</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Design systems, user research, wireframing, and pixel-perfect high-fidelity web & mobile application interfaces.
              </p>
              <ul className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Multi-brand Design Systems</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Interactive Prototypes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Usability Testing</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/50 transition-all group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Full-Stack Engineering</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Modern Next.js, React, Node, GraphQL, and cloud architectures built for speed, resilience, and scale.
              </p>
              <ul className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Next.js & React Architectures</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Microservices & APIs</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> CI/CD & Automated QA</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/50 transition-all group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Growth & CRO Strategy</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Conversion rate optimization, data analytics pipelines, and A/B experimentation to maximize user lifetime value.
              </p>
              <ul className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-teal-400" /> Funnel Optimization</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-teal-400" /> SEO & Performance Audits</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-teal-400" /> Data & Product Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Case Studies */}
      <section id="work" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">Featured Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Proven results for market leaders</h2>
          </div>
          <span className="text-xs text-zinc-400">Showing 3 of 42 Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-8 space-y-6 hover:border-zinc-700 transition-all">
            <div className="h-64 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-blue-900/40 p-6 flex flex-col justify-between border border-indigo-500/20">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-950/80 text-indigo-300 w-fit">
                FinTech Platform
              </span>
              <div>
                <h4 className="text-2xl font-bold text-white">NovaPay Global</h4>
                <p className="text-xs text-zinc-300">Next-gen borderless multi-currency banking app</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>+240% User Onboarding Velocity</span>
              <span className="font-semibold text-indigo-400 flex items-center gap-1">Read Case Study <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-8 space-y-6 hover:border-zinc-700 transition-all">
            <div className="h-64 rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/40 p-6 flex flex-col justify-between border border-purple-500/20">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-950/80 text-purple-300 w-fit">
                Enterprise AI
              </span>
              <div>
                <h4 className="text-2xl font-bold text-white">Synthetix Cloud</h4>
                <p className="text-xs text-zinc-300">Enterprise generative intelligence dashboard</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>4.9/5 Rating &bull; 1.2M Daily Events</span>
              <span className="font-semibold text-purple-400 flex items-center gap-1">Read Case Study <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Estimator */}
      <section id="estimate" className="py-24 bg-zinc-900/40 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-8 shadow-2xl">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Instant Project Estimator</h3>
              <p className="text-zinc-400 text-sm">Select your requirements to receive a fast scoping estimate.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["<$10k", "$10k - $25k", "$25k - $50k", "$50k+"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setProjectBudget(b)}
                      className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                        projectBudget === b
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                  <Award className="w-8 h-8 mx-auto text-emerald-400" />
                  <h4 className="font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs text-zinc-300">Our senior partner will review your scoping parameters within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Brief summary of what you are building..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Request Custom Proposal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Agency Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Apex Agency Pro &bull; An Aura UX Business Template.</p>
        <Link href="/" className="text-indigo-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
