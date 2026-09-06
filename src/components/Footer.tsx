import Link from "next/link";
import Image from "next/image";
import { Briefcase, PartyPopper, Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-[#070709] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30 bg-black shadow-md shadow-amber-500/20">
                <Image
                  src="/logo.png"
                  alt="AURA UX Gold Logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg tracking-wider font-serif">
                <span className="gold-gradient-text">AURA UX</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Unified multi-website template ecosystem. Deploy unlimited high-performance Business & Celebrations websites within a single Vercel project deployment.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/80">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>1 Project &bull; Zero Server Friction &bull; Instant Routing</span>
            </div>
          </div>

          {/* Business Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              Business Folders
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates/business/luxe-beauty" className="hover:text-amber-300 transition-colors">
                  Luxe Beauty & Bridal
                </Link>
              </li>
              <li>
                <Link href="/templates/business/heritage-dining" className="hover:text-amber-300 transition-colors">
                  Zafran Heritage Dining
                </Link>
              </li>
              <li>
                <Link href="/templates/business/your-next-store" className="hover:text-amber-300 transition-colors">
                  YourNextStore Commerce
                </Link>
              </li>
              <li>
                <Link href="/templates/business/corporate-agency" className="hover:text-amber-300 transition-colors">
                  Apex Agency Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Celebrations Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
              Celebration Folders
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates/celebrations/cinematic-birthday" className="hover:text-amber-300 transition-colors">
                  Cinematic Birthday Film
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/birthday-lux-celebration" className="hover:text-amber-300 transition-colors">
                  Aura Luxe Birthday Gala
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/anniversary-forever-vows" className="hover:text-amber-300 transition-colors">
                  Forever & Always Anniversary
                </Link>
              </li>
              <li>
                <Link href="/templates/celebrations/love-note-wifey" className="hover:text-amber-300 transition-colors">
                  Hi Wifey & Love Note
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} AURA UX Templates. Designed for single-project Vercel deployments.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-300/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ready for Vercel Deploy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
