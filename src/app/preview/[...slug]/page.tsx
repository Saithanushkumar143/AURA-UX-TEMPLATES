"use client";

import { useState, use } from "react";
import PreviewHeader from "@/components/PreviewHeader";
import { TEMPLATES } from "@/data/templates";

interface PreviewPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  
  // Format slug e.g. ["business", "corporate-agency"] -> "/templates/business/corporate-agency"
  const templatePath = slug ? `/templates/${slug.join("/")}` : "/";
  const matchedTemplate = TEMPLATES.find((t) => t.path === templatePath);

  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const deviceWidthClass = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[90vh] my-6 rounded-2xl border-8 border-zinc-800 shadow-2xl overflow-hidden",
    mobile: "w-[390px] h-[844px] my-6 rounded-[40px] border-8 border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-zinc-700",
  }[device];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col overflow-hidden">
      {/* Top Preview Control Bar */}
      <PreviewHeader
        title={matchedTemplate?.title || "Live Template Preview"}
        category={matchedTemplate?.categoryLabel || "Template"}
        templatePath={templatePath}
        activeDevice={device}
        onDeviceChange={setDevice}
      />

      {/* Frame Container */}
      <div className="flex-1 bg-zinc-900/90 flex items-center justify-center p-0 md:p-4 overflow-auto">
        <div className={`transition-all duration-300 relative bg-zinc-950 ${deviceWidthClass}`}>
          <iframe
            src={templatePath}
            title={matchedTemplate?.title || "Template Preview"}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
