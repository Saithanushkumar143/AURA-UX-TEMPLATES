export interface TemplateItem {
  id: string;
  title: string;
  category: "business" | "celebrations";
  categoryLabel: string;
  description: string;
  features: string[];
  tags: string[];
  path: string;
  previewUrl: string;
  gradient: string;
  badgeColor: string;
  popular?: boolean;
  new?: boolean;
}

export const TEMPLATES: TemplateItem[] = [
  // --- BUSINESS TEMPLATES ---
  {
    id: "corporate-agency",
    title: "Apex Agency Pro",
    category: "business",
    categoryLabel: "Business & Corporate",
    description: "Ultra-modern agency portfolio with high-impact hero, interactive services showcase, client case studies, and quote request modal.",
    features: ["Interactive Service Grid", "Case Studies Carousel", "Client Testimonials", "Interactive Quote Estimator"],
    tags: ["Agency", "Corporate", "B2B", "Dark Modern"],
    path: "/templates/business/corporate-agency",
    previewUrl: "/preview/business/corporate-agency",
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    popular: true,
  },
  {
    id: "saas-startup",
    title: "CloudFlow SaaS",
    category: "business",
    categoryLabel: "Business & Tech",
    description: "Conversion-optimized SaaS landing page featuring dynamic pricing switchers, product tour tabs, metrics dashboard preview, and FAQ accordion.",
    features: ["Monthly/Annual Billing Toggle", "Product Mockup Viewers", "Feature Breakdown Tabs", "Integrations Grid"],
    tags: ["SaaS", "Startup", "Software", "Tech"],
    path: "/templates/business/saas-startup",
    previewUrl: "/preview/business/saas-startup",
    gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    new: true,
  },
  {
    id: "consulting-pro",
    title: "Vanguard Advisory",
    category: "business",
    categoryLabel: "Business & Consulting",
    description: "Authoritative management consulting & executive coaching website with booking scheduler, team expertise roster, and ROI calculator.",
    features: ["Appointment Booking", "Executive Team Roster", "Service Capabilities", "Insights / Articles"],
    tags: ["Consulting", "Finance", "Legal", "Executive"],
    path: "/templates/business/consulting-pro",
    previewUrl: "/preview/business/consulting-pro",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },

  // --- CELEBRATIONS TEMPLATES ---
  {
    id: "cinematic-birthday",
    title: "Cinematic Birthday Film & Letter",
    category: "celebrations",
    categoryLabel: "Celebrations & Cinematic",
    description: "Four-act cinematic birthday film with interactive Cupid bow & arrow, rose burst, kinetic 3D typography, blossoming heart canvas tree, vintage polaroid photo gallery, and wax-sealed love letter.",
    features: ["Interactive Bow & Arrow Physics", "Canvas 2D Blossoming Tree", "Vintage Polaroid Photo Grid", "Wax-Sealed Love Letter & Wishes Wall"],
    tags: ["Cinematic", "Birthday", "GSAP Animation", "Photo Grid", "Love Letter"],
    path: "/templates/celebrations/cinematic-birthday",
    previewUrl: "/preview/celebrations/cinematic-birthday",
    gradient: "from-rose-600 via-pink-600 to-amber-400",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    popular: true,
    new: true,
  },
  {
    id: "wedding-elegance",
    title: "Eternal Union Wedding",
    category: "celebrations",
    categoryLabel: "Celebrations & Weddings",
    description: "Luxury wedding invitation & portal with live countdown timer, interactive RSVP with dietary selection, couple story timeline, and confetti bursts.",
    features: ["Live Event Countdown", "Interactive RSVP System", "Love Story Timeline", "Photo Gallery & Registry"],
    tags: ["Wedding", "Invitation", "Romantic", "Luxury"],
    path: "/templates/celebrations/wedding-elegance",
    previewUrl: "/preview/celebrations/wedding-elegance",
    gradient: "from-rose-500 via-pink-500 to-amber-400",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  {
    id: "birthday-party",
    title: "GlowNight Birthday Bash",
    category: "celebrations",
    categoryLabel: "Celebrations & Parties",
    description: "High-energy birthday party invitation featuring neon visuals, party playlist player preview, interactive celebration sound/confetti, and location map.",
    features: ["Interactive Confetti Cannons", "Party Music Player", "Dress Code Guide", "VIP Pass RSVP"],
    tags: ["Birthday", "Nightclub", "Party", "Youthful"],
    path: "/templates/celebrations/birthday-party",
    previewUrl: "/preview/celebrations/birthday-party",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "anniversary-gala",
    title: "Golden Jubilee Gala",
    category: "celebrations",
    categoryLabel: "Celebrations & Milestones",
    description: "Sophisticated milestone anniversary & commemorative gala invitation with banquet menu selector, timeline memories, and guestbook.",
    features: ["Tribute Memories Showcase", "Banquet Menu Selection", "Reserved Seating Request", "Digital Guestbook"],
    tags: ["Anniversary", "Gala", "Milestone", "Formal"],
    path: "/templates/celebrations/anniversary-gala",
    previewUrl: "/preview/celebrations/anniversary-gala",
    gradient: "from-amber-600 via-yellow-500 to-amber-700",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
];
