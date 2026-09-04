"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Layers,
  ArrowRight,
  Star,
  Users,
  Terminal,
  HelpCircle
} from "lucide-react";

export default function SaasStartupTemplate() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [activeTab, setActiveTab] = useState<"analytics" | "automation" | "security">("analytics");

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Banner & Quick Hub Return */}
      <div className="bg-purple-950/80 border-b border-purple-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-purple-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Aura UX Hub
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">Folder: <code className="text-purple-400 font-mono">/templates/business/saas-startup</code></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono text-[10px] border border-purple-500/30">
            BUSINESS TEMPLATE
          </span>
        </div>
      </div>

      {/* SaaS Navigation */}
      <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">Cloud<span className="text-purple-400">Flow</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#demo" className="hover:text-white">Platform</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#pricing" className="text-xs font-medium text-zinc-400 hover:text-white hidden sm:block">Sign in</a>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* SaaS Hero */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>CloudFlow 3.0 is live with AI Copiloting</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Supercharge your engineering workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">automated intelligence</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Unify CI/CD deployments, infrastructure monitoring, and real-time observability across multi-cloud environments in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-sm transition-all"
          >
            Live Product Demo
          </a>
        </div>

        {/* Product UI Mockup */}
        <div id="demo" className="pt-12 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 sm:p-5 shadow-2xl shadow-purple-950/30 relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-zinc-500 ml-2">cloudflow-dashboard.internal</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-400">99.99% Healthy</span>
                <span>Latency: 14ms</span>
              </div>
            </div>

            {/* Interactive Tab Switcher inside UI */}
            <div className="pt-4 flex gap-2 border-b border-zinc-800 pb-3">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "analytics" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Real-time Analytics
              </button>
              <button
                onClick={() => setActiveTab("automation")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "automation" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Pipeline Automation
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "security" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Zero-Trust Security
              </button>
            </div>

            <div className="p-6 text-left grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-500">API Requests (24h)</span>
                <p className="text-2xl font-bold text-white">42,891,200</p>
                <span className="text-xs text-emerald-400">&uarr; 18.2% vs last week</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-500">Build Speed</span>
                <p className="text-2xl font-bold text-white">1.42s</p>
                <span className="text-xs text-purple-400">Edge Cached</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-500">Cost Savings</span>
                <p className="text-2xl font-bold text-white">64%</p>
                <span className="text-xs text-emerald-400">Optimized Compute</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Predictable, transparent pricing</h2>
          <p className="text-sm text-zinc-400">Scale from early prototype to global infrastructure with zero surprise fees.</p>

          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                billingCycle === "monthly" ? "bg-purple-600 text-white font-semibold" : "text-zinc-400"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-purple-600 text-white font-semibold" : "text-zinc-400"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500 text-zinc-950 font-bold px-1.5 rounded">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <p className="text-xs text-zinc-400 mt-1">Ideal for indie hackers & prototypes</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{billingCycle === "annual" ? "$19" : "$24"}</span>
              <span className="text-xs text-zinc-400">/ month</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-all">
              Get Started
            </button>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Up to 5 team members</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 100k API calls / month</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Standard edge network</li>
            </ul>
          </div>

          {/* Pro (Highlighted) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/60 to-zinc-900/80 border-2 border-purple-500 space-y-6 relative shadow-2xl shadow-purple-950/50">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Scale Pro</h3>
              <p className="text-xs text-zinc-400 mt-1">For growing teams & high traffic apps</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{billingCycle === "annual" ? "$79" : "$99"}</span>
              <span className="text-xs text-zinc-400">/ month</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30">
              Start 14-Day Free Trial
            </button>
            <ul className="space-y-3 text-xs text-zinc-200">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited team members</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 5M API calls / month</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> AI Automated Copilot</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 24/7 Priority SLA support</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
              <p className="text-xs text-zinc-400 mt-1">Dedicated cloud & custom security</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$299</span>
              <span className="text-xs text-zinc-400">/ month</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-all">
              Contact Sales
            </button>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Custom dedicated cluster</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> SOC2 Type II & HIPAA compliance</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Dedicated Technical Account Manager</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SaaS Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} CloudFlow SaaS &bull; An Aura UX Business Template.</p>
        <Link href="/" className="text-purple-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
