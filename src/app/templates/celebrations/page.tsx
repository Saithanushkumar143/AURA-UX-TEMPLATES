"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES } from "@/data/templates";
import { PartyPopper } from "lucide-react";

export default function CelebrationsTemplatesPage() {
  const celebrationsTemplates = TEMPLATES.filter((t) => t.category === "celebrations");

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="space-y-3 mb-10 pb-8 border-b border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-medium">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Folder 2: Celebrations Templates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Celebrations & Events Templates
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
            Luxury wedding invitations, energetic birthday parties, gala anniversaries, and personal event celebration websites with interactive RSVPs and live countdowns.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrationsTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
