import Link from "next/link";
import { Sparkles, Briefcase, PartyPopper, ArrowUpRight, Github, Globe, Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                AURA <span className="text-purple-400">UX</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Unified multi-website template ecosystem. Deploy unlimited high-performance Business & Celebrations websites within a single Vercel project deployment.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>1 Project &bull; Zero Server Friction &bull; Instant Routing</span>
            </div>
          </div>

          {/* Business Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              Business Folders
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates/business/corporate-agency" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Apex Agency Pro
                </Link>
              </li>
              <li>
                <Link href="/templates/business/saas-startup" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  CloudFlow SaaS
                </Link>
              </li>
              <li>
                <Link href="/templates/business/consulting-pro" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Vanguard Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Celebrations Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
              <PartyPopper className="w-3.5 h-3.5 text-pink-400" />
              Celebration Folders
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates/celebrations/cinematic-birthday" className="hover:text-purple-400 transition-colors flex items-center gap-1 font-semibold text-rose-300">
                  <Sparkles className="w-3 h-3 text-rose-400" /> Cinematic Birthday Film
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/wedding-elegance" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Eternal Union Wedding
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/birthday-party" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  GlowNight Birthday Bash
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/anniversary-gala" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Golden Jubilee Gala
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} AURA UX Templates. Designed for single-project Vercel deployments.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Ready for Vercel Deploy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
