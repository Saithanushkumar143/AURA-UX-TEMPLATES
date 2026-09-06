"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, CheckCircle2, Monitor, Smartphone, Copy, Check, ExternalLink, Code } from "lucide-react";
import { TemplateItem } from "@/data/templates";

interface TemplateCardProps {
  template: TemplateItem;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const isBusiness = template.category === "business";
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const productionDirectUrl = `https://aurauxtemplates.vercel.app${template.path}`;
  const productionPreviewUrl = `https://aurauxtemplates.vercel.app${template.previewUrl}`;
  const embedCode = `<iframe src="${productionDirectUrl}" width="100%" height="800" frameborder="0" allowfullscreen></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productionDirectUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/20 flex flex-col overflow-hidden">
      {/* Top Banner / Graphic Header */}
      <div className={`relative h-48 w-full bg-gradient-to-br ${template.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
        {/* Glow & Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${template.badgeColor}`}>
            {template.categoryLabel}
          </span>
          {template.popular && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-zinc-950 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" /> Popular
            </span>
          )}
          {template.new && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-zinc-950 shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* Title inside card preview */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {template.title}
          </h3>
          <p className="text-xs text-white/80 font-mono mt-1">
            Path: {template.path}
          </p>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs z-20">
          <Link
            href={template.path}
            className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
          >
            <Eye className="w-3.5 h-3.5" /> Full Page Demo
          </Link>
          <Link
            href={template.previewUrl}
            className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
          >
            <Monitor className="w-3.5 h-3.5" /> Device Preview
          </Link>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          <p className="text-sm text-zinc-400 leading-relaxed">
            {template.description}
          </p>

          {/* Features List */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Key Features</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {template.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-300">
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isBusiness ? "text-indigo-400" : "text-rose-400"}`} />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Website Integration Helper */}
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                External Website Link
              </span>
              <span className="text-[10px] text-purple-400 font-mono">aurauxtemplates.vercel.app</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                title="Copy Direct URL for your other website"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                <span>{copiedLink ? "Copied Direct URL!" : "Copy URL"}</span>
              </button>
              <button
                onClick={handleCopyEmbed}
                className="py-1.5 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                title="Copy iFrame Embed HTML"
              >
                {copiedEmbed ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3 text-zinc-400" />}
                <span>{copiedEmbed ? "Copied!" : "Embed"}</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {template.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
          <Link
            href={template.previewUrl}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Responsive View</span>
          </Link>

          <Link
            href={template.path}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 ${
              isBusiness
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/30"
                : "bg-rose-600 hover:bg-rose-500 shadow-sm shadow-rose-600/30"
            }`}
          >
            <span>Launch Live</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
