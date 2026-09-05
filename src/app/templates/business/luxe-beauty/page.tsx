"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
  Heart,
  MessageCircle,
  ShieldCheck,
  Award,
  Crown,
  Camera,
  Layers,
  Sparkle,
  X,
  Menu,
  Send,
  Eye,
  Check
} from "lucide-react";

// ============================================================================
// 1. BRAND & CUSTOMIZATION CONFIGURATION (LUXURY LIGHT PALETTE)
// ============================================================================
const BRAND = {
  name: "LUXE BEAUTY",
  monogram: "LB",
  tagline: "Beauty, Crafted Around You",
  subTagline: "Haute Couture Makeup Artistry & Bespoke Bridal Aesthetics",
  artistName: "Sophia Williams",
  artistTitle: "Celebrity & Master Bridal Makeup Artist",
  phone: "+91 98765 43210",
  email: "hello@luxebeauty.com",
  instagram: "@luxebeautystudio",
  instagramUrl: "https://instagram.com",
  location: "Bespoke Studio & Worldwide Travel Available",
  city: "Mumbai & New Delhi, India",
  experienceYears: "8+",
  clientsCount: "850+",
  rating: "4.98",
  whatsappUrl: "https://wa.me/919876543210",
};

const SERVICES = [
  {
    id: "bridal-couture",
    number: "01",
    name: "Couture Bridal Artistry",
    tagline: "The pinnacle of bridal elegance for your once-in-a-lifetime moment",
    description:
      "A complete bespoke bridal transformation featuring luxury skin prep, HD airbrush techniques, custom eye sculpting, precision lash application, and 18-hour stay proofing.",
    price: "From ₹35,000 / $450",
    duration: "3.5 Hours",
    category: "Bridal",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Signature High-Definition Airbrush Finish",
      "Full Luxury Skin Prep & Hydra-Glow Facial Mask",
      "Bespoke Hair Styling & Veil Placement",
      "Complete Emergency Touchup Kit Provided",
    ],
  },
  {
    id: "red-carpet-glam",
    number: "02",
    name: "Red Carpet & Gala Glam",
    tagline: "Camera-ready, high-drama beauty sculpted for the spotlight",
    description:
      "Luminous, photogenic makeup designed to withstand flashing strobes and 4K cinema lenses. Balanced contouring, glass skin finish, and statement lips.",
    price: "From ₹18,000 / $220",
    duration: "2 Hours",
    category: "Glam",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
    features: [
      "4K Camera-Tested Diffused Finish",
      "Dimensional Strobing & Collarbone Glow",
      "Custom Individual Mink-Style Lashes",
      "Long-Wear Smudge-Proof Lip Seal",
    ],
  },
  {
    id: "engagement-reception",
    number: "03",
    name: "Engagement & Sangeet",
    tagline: "Playful romance meets contemporary high-fashion shimmer",
    description:
      "Tailored looks for pre-wedding galas, cocktail nights, and sangeet celebrations. Infused with soft jewel tones, radiant complexion, and dance-proof durability.",
    price: "From ₹22,000 / $280",
    duration: "2.5 Hours",
    category: "Bridal",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Sweat-Resistant Setting Technology",
      "Shimmer Foil & Pigment Placement",
      "Modern Textured Hair Updo / Waves",
      "Jewelry & Dupatta Pinning Included",
    ],
  },
  {
    id: "editorial-photoshoot",
    number: "04",
    name: "Editorial & Campaign",
    tagline: "Avant-garde concept artistry for magazines, lookbooks, and film",
    description:
      "Conceptual, trendsetting beauty designed in collaboration with creative directors and photographers. Micro-detail precision and innovative textures.",
    price: "From ₹40,000 / Day",
    duration: "Full Day Shoot",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    features: [
      "On-Set Touchups & Multi-Look Changes",
      "Editorial Texture Mastery (Gloss, Matte, Metal)",
      "Collaborative Moodboard Development",
      "High-Fashion Lighting Optimization",
    ],
  },
  {
    id: "soft-natural-glam",
    number: "05",
    name: "Dewy Minimalist Glam",
    tagline: "Effortless, fresh-faced glow that enhances your innate beauty",
    description:
      "For intimate celebrations, daytime events, or clients who adore a 'second skin' breathable aesthetic with illuminated cheeks, feathered brows, and sheer glossy lips.",
    price: "From ₹14,000 / $180",
    duration: "1.5 Hours",
    category: "Natural",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Ultra-Hydrating Botanical Base Prep",
      "Feather-Stroke Brow Architecture",
      "Soft Monochromatic Tint Pairing",
      "Natural Silk Lash Enhancements",
    ],
  },
  {
    id: "private-masterclass",
    number: "06",
    name: "VIP 1-on-1 Masterclass",
    tagline: "Master your signature beauty rituals with Sophia Williams",
    description:
      "Exclusive private coaching session covering personal face shape analysis, shade matching, vanity curation, brush mastery, and day-to-night look transformations.",
    price: "From ₹25,000 / Session",
    duration: "4 Hours",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Full Audit of Your Current Makeup Kit",
      "Curated Luxury Product Shopping Guide",
      "Step-by-Step Hands-On Application",
      "Complimentary Luxe Brush Set Gift",
    ],
  },
];

const PORTFOLIO_ITEMS = [
  {
    id: "look-1",
    title: "Royal Crimson Bridal Glow",
    category: "Bridal",
    subtitle: "Heritage Traditional Veil",
    image:
      "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=1000&auto=format&fit=crop",
    accent: "Rose Gold & Ruby",
    likes: 342,
  },
  {
    id: "look-2",
    title: "Vogue Paris Velvet Bronze",
    category: "Editorial",
    subtitle: "High-Fashion Monochromatic",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    accent: "Smoked Bronze",
    likes: 512,
  },
  {
    id: "look-3",
    title: "Sunset Champagne Shimmer",
    category: "Glam",
    subtitle: "Cocktail Evening Radiance",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    accent: "24K Champagne",
    likes: 420,
  },
  {
    id: "look-4",
    title: "Glass Skin Riviera Glow",
    category: "Natural",
    subtitle: "Sun-Kissed Daytime Fresh",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
    accent: "Dewy Peach",
    likes: 289,
  },
  {
    id: "look-5",
    title: "Emerald Sangeet Drama",
    category: "Party",
    subtitle: "Graphic Wing & Crystal Gem",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop",
    accent: "Smoky Emerald",
    likes: 670,
  },
  {
    id: "look-6",
    title: "Ivory Veil Destination Bride",
    category: "Bridal",
    subtitle: "Lake Como Ceremony Look",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop",
    accent: "Nude Pearl",
    likes: 810,
  },
  {
    id: "look-7",
    title: "Cyber Chrome Editorial",
    category: "Editorial",
    subtitle: "Futuristic Glass Sheen",
    image:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
    accent: "Metallic Platinum",
    likes: 415,
  },
  {
    id: "look-8",
    title: "Midnight Velvet Glam",
    category: "Glam",
    subtitle: "Oscars Afterparty Style",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    accent: "Deep Mulberry",
    likes: 532,
  },
];

// Sticky 3-Column Editorial Archive Images (Curated Haute Beauty & Bridal Artistry)
const STICKY_SHOWCASE = {
  leftColumn: [
    {
      url: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=1000&auto=format&fit=crop",
      title: "Royal Crimson Heritage Veil",
      tag: "Bridal Couture",
    },
    {
      url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop",
      title: "Red Carpet Smoked Bronze",
      tag: "Celebrity Glam",
    },
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
      title: "Sunset Champagne Shimmer",
      tag: "Sangeet Radiance",
    },
    {
      url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
      title: "Graphic Wing & Precision Lashes",
      tag: "Editorial Technique",
    },
    {
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      title: "Skin-First Dewy Luminescence",
      tag: "Clean Minimalist",
    },
  ],
  centerSticky: [
    {
      url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1200&auto=format&fit=crop",
      title: "The Signature Sophia Bride",
      tag: "Haute Masterpiece",
    },
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      title: "Vogue Paris Campaign Look",
      tag: "Fashion Editorial",
    },
    {
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
      title: "Gala Velvet Strobe Radiance",
      tag: "Exclusive Glamour",
    },
  ],
  rightColumn: [
    {
      url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop",
      title: "Hydra-Spa Botanical Skin Prep",
      tag: "Pre-Makeup Prep",
    },
    {
      url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1000&auto=format&fit=crop",
      title: "Haute Mineral Powder Finish",
      tag: "Artisanal Kit",
    },
    {
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
      title: "Romantic Rose Petal Velvet Lip",
      tag: "Bridal Romance",
    },
    {
      url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
      title: "24K Gold Shimmer Pigment",
      tag: "Shimmer Mastery",
    },
    {
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop",
      title: "Emerald Jewel Statement Eye",
      tag: "Avant-Garde",
    },
  ],
};

const WHY_CHOOSE_US = [
  {
    id: "feature-1",
    title: "Bespoke Facial Architecture",
    description:
      "We do not believe in copy-paste trends. Every contour, shade, and texture is custom-blended to your bone structure, skin undertone, and lighting environment.",
    icon: Sparkles,
  },
  {
    id: "feature-2",
    title: "100% Ultra-Luxury Kit",
    description:
      "Exclusively using world-renowned artistry brands: Charlotte Tilbury, Tom Ford, Dior Backstage, Pat McGrath Labs, NARS, and Chanel Beauté.",
    icon: Crown,
  },
  {
    id: "feature-3",
    title: "Cinema-Grade 4K Durability",
    description:
      "Layered micro-setting techniques ensure your makeup remains completely sweat-resistant, tear-proof, and flawless across 18+ hours of celebration.",
    icon: ShieldCheck,
  },
  {
    id: "feature-4",
    title: "Stress-Free VIP Experience",
    description:
      "Calm, punctual, and attentive luxury service in our private studio or on-location at your luxury suite anywhere in the world.",
    icon: Award,
  },
];

const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Aanya Singhania",
    occasion: "Royal Udaipur Palace Bride",
    date: "November 2024",
    quote:
      "Sophia made me feel like royalty on my wedding day. In 40°C heat during the pheras, my makeup stayed radiant, untouched, and utterly weightless. The compliments haven't stopped!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "t-2",
    name: "Meera Kapoor",
    occasion: "Met Gala Red Carpet & Afterparty",
    date: "October 2024",
    quote:
      "Her eye for detail is unmatched. She understands how camera flash and harsh ambient lighting affect complexion. I have never seen my skin look this ethereal in raw unedited photos.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "t-3",
    name: "Dr. Natasha Patel",
    occasion: "Reception & Engagement Gala",
    date: "December 2024",
    quote:
      "From the initial bridal trial to the final veil pinning, Sophia's warmth, punctuality, and artistic genius gave me total peace of mind. Truly the highest standard in the industry.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Private Consultation",
    subtitle: "Decoding Your Vision",
    description:
      "We discuss your outfit swatches, jewelry tones, venue lighting, skin sensitivities, and moodboards to build your custom aesthetic blueprint.",
  },
  {
    step: "02",
    title: "Skin & Palette Trial",
    subtitle: "Precision Engineering",
    description:
      "We formulate custom foundation blends, test longevity primers, and sculpt two trial looks so you step into your big day with absolute confidence.",
  },
  {
    step: "03",
    title: "The Transformation",
    subtitle: "Bespoke Artistry in Motion",
    description:
      "On event day, enjoy a serene luxury experience with chilled facial rollers, deep hydra-prep, flawless airbrushing, lash architecture, and veil drape.",
  },
  {
    step: "04",
    title: "Your Spotlight Moment",
    subtitle: "Unforgettable Radiance",
    description:
      "Step out with 18-hour stay power, equipped with your custom Luxe Touchup Kit and the confidence of looking mesmerizing from every camera angle.",
  },
];

const PACKAGES = [
  {
    id: "essential",
    name: "Signature Occasion",
    subtitle: "For Bridesmaids, Cocktails & Red Carpet Galas",
    price: "₹18,000",
    dollar: "$220",
    highlight: false,
    badge: "Most Requested for Galas",
    features: [
      "Custom HD Luxury Skin Prep & Base",
      "Signature Eye Sculpt & Shimmer",
      "Premium Mink-Style Feather Lashes",
      "Hair Styling (Textured Waves / Sleek Updo)",
      "Basic Touchup Kit (Lip Sample + Blotting Papers)",
    ],
  },
  {
    id: "signature",
    name: "The Royal Bridal Suite",
    subtitle: "Our Award-Winning Full Wedding Day Experience",
    price: "₹38,000",
    dollar: "$460",
    highlight: true,
    badge: "Sophia's Signature Choice",
    features: [
      "Signature High-Definition Airbrush Artistry",
      "Hydra-Glow Pre-Makeup Spa Mask & Eye De-Puff",
      "Bridal Hair Styling & Ornate Jewelry / Veil Pinning",
      "Luxe 3D Silk Lashes & Custom Lip Mix Formulation",
      "Draping Assistance for Saree / Lehengas",
      "Deluxe VIP Touchup Pouch & Setting Mist",
    ],
  },
  {
    id: "couture",
    name: "Grand Royal Trouseau (2-Day)",
    subtitle: "Sangeet / Engagement + Full Wedding Ceremony",
    price: "₹68,000",
    dollar: "$820",
    highlight: false,
    badge: "Complete Wedding Package",
    features: [
      "Two Distinct Signature Transformations (Sangeet + Wedding)",
      "Complimentary Pre-Wedding Studio Trial Session",
      "Dedicated Artist & Senior Hair Stylist on Location",
      "Full Body Shimmer, Collarbone Glow & Neck Blending",
      "Emergency On-Site Touchup Support through Pheras",
      "Groom Quick Grooming / Anti-Shine Prep Included",
    ],
  },
];

const INSTAGRAM_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop",
    likes: "2.4k",
    comments: "84",
    tag: "#SophiaBride",
  },
  {
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    likes: "1.9k",
    comments: "52",
    tag: "#RedCarpetGlow",
  },
  {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    likes: "3.1k",
    comments: "116",
    tag: "#ChampagneShimmer",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    likes: "4.5k",
    comments: "209",
    tag: "#VogueBeauty",
  },
  {
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
    likes: "1.8k",
    comments: "43",
    tag: "#CleanGirlAesthetic",
  },
  {
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
    likes: "2.8k",
    comments: "98",
    tag: "#MasterclassVIP",
  },
];

const TRUST_STATS = [
  { value: "850+", label: "Celebrated Brides", sub: "Worldwide Portfolio" },
  { value: "8+ Yrs", label: "Mastery Experience", sub: "Editorial & Cinema" },
  { value: "100%", label: "Ultra-Luxury Kit", sub: "Dior, Charlotte, Tom Ford" },
  { value: "4.98★", label: "Client Satisfaction", sub: "Over 500+ Reviews" },
];

// ============================================================================
// 2. REUSABLE INLINE 3D COSMETIC DECORATIVE COMPONENTS (LIGHT THEME)
// ============================================================================

/** 3D Floating Lipstick with realistic cut tip and rose-gold metallic casing */
function FloatingLipstick({
  className = "",
  size = 1,
  rotation = 25,
}: {
  className?: string;
  size?: number;
  rotation?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `scale(${size}) rotate(${rotation}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-900/15 blur-md rounded-full" />
      <div className="relative w-8 h-12 mx-auto overflow-hidden rounded-t-full bg-gradient-to-r from-[#9e1b27] via-[#dc2626] to-[#88131d] shadow-inner">
        <div className="absolute top-0 right-1 w-2.5 h-10 bg-white/50 blur-[1px] rotate-12" />
        <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="relative w-9 h-5 mx-auto -mt-1 bg-gradient-to-r from-[#b38728] via-[#fbf5b7] via-[#d4af37] to-[#aa771c] shadow-sm border-y border-amber-300/40">
        <div className="absolute top-0 left-2 w-1.5 h-full bg-white/70 blur-[0.5px]" />
      </div>
      <div className="relative w-10 h-2 mx-auto bg-gradient-to-r from-[#8a6519] via-[#d4af37] to-[#6e4e0f] ring-1 ring-amber-400/40" />
      <div className="relative w-10 h-16 mx-auto rounded-b-md bg-gradient-to-r from-[#f7f0e6] via-[#fffdfa] to-[#ede3d5] shadow-xl border-t border-amber-400/50 overflow-hidden ring-1 ring-black/5">
        <div className="absolute top-0 left-2 w-1.5 h-full bg-white/80 blur-[0.5px]" />
        <div className="absolute top-0 right-2 w-0.5 h-full bg-amber-400/30" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7px] tracking-widest text-[#967022] font-serif font-bold uppercase">
          LUXE
        </div>
      </div>
    </div>
  );
}

/** 3D Floating Makeup Brush */
function FloatingBrush({
  className = "",
  size = 1,
  rotation = -35,
}: {
  className?: string;
  size?: number;
  rotation?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `scale(${size}) rotate(${rotation}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-10 h-16 mx-auto rounded-t-full bg-gradient-to-b from-[#faeada] via-[#b88c78] to-[#3a2720] shadow-md overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-6 bg-[#fff5ec] rounded-t-full blur-[1px] opacity-95" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
      </div>
      <div className="relative w-8 h-10 mx-auto -mt-1 bg-gradient-to-r from-[#99732b] via-[#ffe394] via-[#e6be53] to-[#7a5818] shadow-sm border-y border-amber-200/60">
        <div className="absolute left-2 top-0 w-1 h-full bg-white/80 blur-[0.5px]" />
        <div className="absolute bottom-1 w-full h-[1px] bg-amber-900/30" />
      </div>
      <div className="relative w-5 h-28 mx-auto -mt-0.5 rounded-b-full bg-gradient-to-r from-[#fbf8f2] via-[#ffffff] to-[#ede4d6] shadow-xl overflow-hidden ring-1 ring-black/5">
        <div className="absolute left-1 top-0 w-0.5 h-full bg-white/80" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[5px] text-[#9c7423] tracking-widest uppercase font-serif font-bold">
          PRO
        </div>
      </div>
    </div>
  );
}

/** 3D Floating Compact Powder Case */
function FloatingCompact({
  className = "",
  size = 1,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `scale(${size})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f7efe3] to-[#ebdcc8] p-1.5 shadow-xl border border-amber-400/50 relative ring-1 ring-black/5"
        style={{
          transform: "rotateX(55deg) translateY(-10px)",
          transformOrigin: "bottom center",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-sky-100/40 via-white/95 to-amber-50/50 border border-amber-200/60 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/90 blur-sm rounded-full" />
          <span className="text-[7px] text-[#8c671e] font-serif tracking-widest font-bold">
            LB
          </span>
        </div>
      </div>
      <div className="w-8 h-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 mx-auto -my-1 rounded-sm shadow-sm z-10 relative" />
      <div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f7efe3] to-[#ebdcc8] p-2.5 shadow-2xl border border-amber-400/60 relative ring-1 ring-black/5"
        style={{ transform: "rotateX(30deg)" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#e5caa8] via-[#f8e6d5] to-[#dbc1a0] shadow-inner border border-amber-900/15 relative overflow-hidden flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-amber-800/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#8a5d24]/50" />
          </div>
          <div className="absolute top-1 left-2 w-8 h-4 bg-white/60 rounded-full blur-[1px] rotate-45" />
        </div>
      </div>
    </div>
  );
}

/** 3D Champagne Glass Sphere / Pearl */
function FloatingSphere({
  className = "",
  size = 60,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 1), rgba(250, 235, 204, 0.8) 35%, rgba(224, 195, 149, 0.6) 70%, rgba(168, 128, 77, 0.4) 100%)",
        boxShadow:
          "0 15px 35px -5px rgba(184, 138, 42, 0.25), inset 0 -6px 12px rgba(138, 93, 36, 0.2), inset 0 8px 15px rgba(255,255,255,0.9)",
      }}
    >
      <div className="absolute top-2 left-3 w-1/3 h-1/4 bg-white rounded-full blur-[1px] opacity-95 rotate-[-20deg]" />
      <div className="absolute bottom-2 right-3 w-1/4 h-1/4 bg-amber-200/50 rounded-full blur-md" />
    </div>
  );
}

/** 3D Rotating Gold Orbit Ring */
function GoldRing({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none rounded-full border-2 border-transparent ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(45deg, rgba(212,175,55,0.3), rgba(255,245,190,0.95), rgba(184,134,11,0.4)) border-box",
        WebkitMask:
          "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        boxShadow: "0 0 25px rgba(212, 175, 55, 0.35)",
      }}
    />
  );
}

// ============================================================================
// 3. MAIN COMPONENT EXPORT
// ============================================================================
export default function LuxeBeautyTemplate() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<null | {
    title: string;
    category: string;
    subtitle: string;
    image: string;
  }>(null);

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(SERVICES[0].name);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0].name,
    date: "",
    notes: "",
  });

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();

  const [mouseHero, setMouseHero] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouseHero({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredPortfolio = useMemo(() => {
    if (activeFilter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: SERVICES[0].name,
        date: "",
        notes: "",
      });
    }, 2500);
  };

  const openBookingWithService = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    setBookingModalOpen(true);
  };

  const heroBrushY = useTransform(scrollYProgress, [0, 0.3], [0, 450]);
  const heroBrushRotate = useTransform(scrollYProgress, [0, 0.3], [-25, 45]);
  const heroSphereY = useTransform(scrollYProgress, [0, 0.4], [0, 600]);
  const heroLipstickY = useTransform(scrollYProgress, [0, 0.5], [0, 800]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf7f2] text-[#1b1614] selection:bg-[#d4af37] selection:text-white font-sans relative"
    >
      {/* ====================================================================
          CUSTOM LUXURY CURSOR
      ==================================================================== */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-600/50 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${
            cursorHovered ? 2 : 1
          })`,
          backgroundColor: cursorHovered
            ? "rgba(212, 175, 55, 0.18)"
            : "transparent",
          backdropFilter: cursorHovered ? "blur(2px)" : "none",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#b88a2a]" />
        {cursorText && (
          <span className="absolute text-[8px] font-bold text-amber-900 uppercase tracking-widest">
            {cursorText}
          </span>
        )}
      </div>

      {/* ====================================================================
          INITIAL CINEMATIC LOADER
      ==================================================================== */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[10000] bg-[#faf7f2] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-amber-400/60 flex items-center justify-center bg-gradient-to-tr from-amber-100 to-white shadow-md">
                <Crown className="w-7 h-7 text-[#b88a2a]" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif tracking-[0.3em] text-[#1b1614] font-light">
                {BRAND.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.4em] text-[#9c7423] mt-2 font-medium">
                Haute Artistry
              </p>

              <div className="w-48 h-[2px] bg-amber-200/50 mx-auto mt-6 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#b88a2a] to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          BACKGROUND AMBIENCE
      ==================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-400/10 blur-[130px]" />
        <div className="absolute top-[35%] -left-40 w-[550px] h-[550px] rounded-full bg-rose-300/10 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-amber-300/10 blur-[150px]" />
      </div>

      {/* ====================================================================
          NAVIGATION BAR
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#faf7f2]/90 border-b border-[#e8decb] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <div className="w-10 h-10 rounded-full border border-amber-400/60 bg-gradient-to-br from-amber-100 to-white flex items-center justify-center text-[#967022] font-serif font-bold text-sm tracking-wider group-hover:border-amber-500 transition-colors shadow-sm">
              {BRAND.monogram}
            </div>
            <div>
              <span className="block font-serif text-lg tracking-[0.2em] font-medium text-[#1b1614] group-hover:text-[#967022] transition-colors">
                {BRAND.name}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8e8278]">
                {BRAND.artistName}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[#635850] font-medium">
            <a href="#about" className="hover:text-[#b88a2a] transition-colors relative py-1">
              The Artist
            </a>
            <a href="#services" className="hover:text-[#b88a2a] transition-colors relative py-1">
              Artistry Services
            </a>
            <a href="#portfolio" className="hover:text-[#b88a2a] transition-colors relative py-1">
              Portfolio
            </a>
            <a href="#editorial-archive" className="hover:text-[#b88a2a] transition-colors relative py-1">
              Editorial Archive
            </a>
            <a href="#packages" className="hover:text-[#b88a2a] transition-colors relative py-1">
              Pricing & Suites
            </a>
            <a href="#process" className="hover:text-[#b88a2a] transition-colors relative py-1">
              The Journey
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openBookingWithService(SERVICES[0].name)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase overflow-hidden group bg-gradient-to-r from-[#b88a2a] via-[#d4af37] to-[#c59b3f] text-white shadow-[0_4px_15px_rgba(184,138,42,0.3)] hover:shadow-[0_6px_25px_rgba(184,138,42,0.45)] transition-all transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Book Appointment
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#e8decb] text-[#1b1614] hover:border-[#b88a2a] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#faf7f2] border-b border-[#e8decb] px-6 py-8 shadow-xl"
            >
              <div className="flex flex-col gap-6 text-sm uppercase tracking-widest font-medium">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  The Artist
                </a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  Artistry Services
                </a>
                <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  Portfolio Looks
                </a>
                <a href="#editorial-archive" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  Editorial Archive
                </a>
                <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  Pricing & Suites
                </a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#635850] hover:text-[#b88a2a]">
                  Direct Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 pt-20">
        {/* ====================================================================
            SECTION 2: HERO SECTION
        ==================================================================== */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 overflow-hidden py-16"
        >
          <motion.div
            style={{ y: heroBrushY, rotate: heroBrushRotate }}
            className="absolute top-20 right-10 md:right-[38%] z-30 hidden sm:block drop-shadow-lg"
          >
            <FloatingBrush size={1.15} />
          </motion.div>

          <motion.div
            style={{ y: heroSphereY }}
            className="absolute top-1/3 left-8 md:left-24 z-20 hidden md:block drop-shadow-md"
          >
            <FloatingSphere size={75} />
          </motion.div>

          <motion.div
            style={{ y: heroLipstickY }}
            className="absolute bottom-20 right-16 z-20 hidden lg:block drop-shadow-xl"
          >
            <FloatingLipstick size={1.1} rotation={30} />
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/60 text-[#967022] text-xs tracking-widest uppercase font-semibold"
              >
                <Crown className="w-3.5 h-3.5 text-[#b88a2a]" />
                <span>Bespoke Bridal & Celebrity Artistry</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-serif font-light leading-[1.1] tracking-tight text-[#1b1614]"
              >
                Your Beauty.
                <br />
                <span className="italic font-normal bg-gradient-to-r from-[#967022] via-[#b06c64] to-[#c59b3f] bg-clip-text text-transparent">
                  Elevated to Art.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-[#635850] max-w-xl font-light leading-relaxed"
              >
                Luxury makeup experiences meticulously crafted around your unique bone
                structure, skin tone, and unforgettable moments. 18-hour radiant wear
                curated with the world&apos;s most coveted beauty houses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={() => openBookingWithService(SERVICES[0].name)}
                  className="px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-[#b88a2a] via-[#d4af37] to-[#c59b3f] text-white shadow-[0_6px_25px_rgba(184,138,42,0.35)] hover:shadow-[0_8px_30px_rgba(184,138,42,0.5)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
                >
                  <span>Reserve Your Date</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#portfolio"
                  className="px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase text-[#1b1614] border border-[#e8decb] bg-white/80 hover:border-[#b88a2a] hover:bg-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Looks</span>
                  <ArrowUpRight className="w-4 h-4 text-[#b88a2a]" />
                </a>
              </motion.div>

              <div className="flex items-center gap-6 pt-6 border-t border-[#e8decb] text-xs text-[#635850]">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Bride"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
                    alt="Bride"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                    alt="Bride"
                  />
                </div>
                <div>
                  <div className="flex items-center text-[#b88a2a] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#b88a2a]" />
                    ))}
                    <span className="ml-1 text-[#1b1614] font-semibold">4.98 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#8e8278]">
                    Trusted by 850+ discerning brides & celebrities
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                style={{
                  transform: `rotateY(${mouseHero.x * 12}deg) rotateX(${
                    -mouseHero.y * 12
                  }deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-[420px] aspect-[4/5] transition-transform duration-200 ease-out"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-300/20 via-rose-300/20 to-transparent blur-xl" />

                <div className="relative w-full h-full rounded-3xl p-3 bg-white/90 border border-amber-200 shadow-2xl backdrop-blur-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop"
                    alt="Haute Makeup Artistry"
                    className="w-full h-full object-cover rounded-2xl filter brightness-100 contrast-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/75 via-transparent to-transparent rounded-2xl" />

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 text-left shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] tracking-widest text-[#967022] uppercase font-bold block">
                          Featured Creation
                        </span>
                        <h4 className="text-sm font-serif text-[#1b1614] font-medium">
                          Haute Crimson Bridal Glow
                        </h4>
                      </div>
                      <Sparkles className="w-4 h-4 text-[#b88a2a]" />
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 z-30">
                  <GoldRing size={90} />
                </div>

                <div className="absolute -bottom-10 -left-10 z-30 hidden sm:block drop-shadow-xl">
                  <FloatingCompact size={0.9} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3: TRUST & SOCIAL PROOF STRIP
        ==================================================================== */}
        <section className="relative py-12 border-y border-[#e8decb] bg-[#f4eee3] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#b88a2a] to-transparent"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#e0d4c3]">
              {TRUST_STATS.map((stat, idx) => (
                <div key={idx} className="pt-4 md:pt-0 px-4 space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8c671e] via-[#b88a2a] to-[#a3751a]">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#1b1614] font-bold">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#8e8278]">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#e0d4c3] flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[#8e8278] text-xs uppercase tracking-[0.3em] font-serif">
              <span>Charlotte Tilbury</span>
              <span>•</span>
              <span>Dior Backstage</span>
              <span>•</span>
              <span>Tom Ford Beauty</span>
              <span>•</span>
              <span>Pat McGrath Labs</span>
              <span>•</span>
              <span>NARS Cosmetics</span>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4: ABOUT THE ARTIST
        ==================================================================== */}
        <section id="about" className="relative py-28 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative group mx-auto max-w-[400px]">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-300/30 via-rose-300/30 to-amber-200/20 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

                <div
                  className="relative rounded-2xl overflow-hidden border border-amber-200 p-2.5 bg-white shadow-2xl transform lg:-rotate-2 group-hover:rotate-0 transition-transform duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop"
                    alt={BRAND.artistName}
                    className="w-full aspect-[3/4] object-cover rounded-xl filter brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/80 via-transparent to-transparent rounded-xl" />

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-amber-200 font-bold block">
                      Master Artist & Founder
                    </span>
                    <h3 className="text-2xl font-serif text-white">{BRAND.artistName}</h3>
                    <p className="text-xs text-zinc-200 mt-1">{BRAND.location}</p>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 z-20 drop-shadow-xl">
                  <FloatingBrush size={1} rotation={15} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300/60 text-[#b06c64] text-xs tracking-widest uppercase font-semibold">
                <Sparkle className="w-3.5 h-3.5" />
                <span>The Artistry Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight text-[#1b1614]">
                Beauty Is Personal.
                <br />
                <span className="italic text-[#967022]">So Is My Art.</span>
              </h2>

              <p className="text-[#635850] leading-relaxed font-light text-base sm:text-lg">
                &ldquo;I believe high makeup artistry is not about masking who you are; it is
                about illuminating your most breathtaking, confident self. Every bride, model,
                and client carries a distinct essence that demands bespoke balance.&rdquo;
              </p>

              <p className="text-[#8e8278] text-sm leading-relaxed">
                Trained in London and Paris with over 8 years of editorial, cinematic, and
                grand destination wedding experience, Sophia Williams blends classic couture
                techniques with modern glass-skin luminescence.
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-[#e8decb]">
                <div>
                  <div className="font-serif italic text-2xl text-[#967022] tracking-wider font-semibold">
                    Sophia Williams
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#8e8278] mt-0.5">
                    Lead Makeup Specialist & Creative Director
                  </div>
                </div>

                <button
                  onClick={() => openBookingWithService("Consultation")}
                  className="px-6 py-2.5 rounded-full border border-[#b88a2a] text-xs uppercase tracking-widest text-[#967022] font-semibold hover:bg-amber-100/60 transition-colors"
                >
                  Meet The Artist
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 5: BESPOKE SERVICES
        ==================================================================== */}
        <section id="services" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-[#f4eee3]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
                <Crown className="w-3.5 h-3.5" />
                <span>Our Signature Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                Bespoke Beauty Services
              </h2>
              <p className="text-[#635850] text-sm sm:text-base">
                Each service is tailored with custom shade formulations, precision skin
                preparation, and long-wear stay proofing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="group relative rounded-2xl bg-white transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl border border-[#e8decb]"
                >
                  <div className="h-full rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10px] uppercase tracking-widest text-[#967022] font-bold">
                        {service.category}
                      </div>
                      <div className="absolute bottom-3 right-3 text-xs font-semibold text-white bg-[#b88a2a] px-3 py-1 rounded-full shadow-sm">
                        {service.price}
                      </div>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif text-[#967022] font-bold tracking-widest">
                          {service.number}
                        </span>
                        <span className="text-[11px] text-[#8e8278] flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-[#8e8278]" />
                          {service.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#1b1614] group-hover:text-[#967022] transition-colors">
                        {service.name}
                      </h3>

                      <p className="text-xs text-[#635850] leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-1.5 pt-3 border-t border-[#f0e6d8]">
                        {service.features.map((feat, fidx) => (
                          <li
                            key={fidx}
                            className="text-[11px] text-[#4d443e] flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#b88a2a] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-4">
                      <button
                        onClick={() => openBookingWithService(service.name)}
                        className="w-full py-3 rounded-xl border border-[#d8cbbb] group-hover:border-[#b88a2a] group-hover:bg-[#b88a2a] text-xs uppercase tracking-widest text-[#1b1614] group-hover:text-white font-semibold transition-all flex items-center justify-center gap-2 bg-[#faf7f2]"
                      >
                        <span>Reserve Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 6: FEATURED LOOKS / PORTFOLIO
        ==================================================================== */}
        <section id="portfolio" className="relative py-28 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
                  <Camera className="w-3.5 h-3.5" />
                  <span>The Visual Gallery</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                  Signature Transformations
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "Bridal", "Glam", "Editorial", "Natural", "Party"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                      activeFilter === tab
                        ? "bg-[#b88a2a] text-white font-semibold shadow-md"
                        : "bg-white text-[#635850] hover:text-[#1b1614] hover:bg-amber-50 border border-[#e8decb]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredPortfolio.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-[#e8decb] hover:border-[#b88a2a] transition-all duration-300 aspect-[3/4] cursor-pointer shadow-md hover:shadow-xl"
                    onClick={() => setLightboxImage(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/90 via-[#1b1614]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10px] uppercase tracking-widest text-[#967022] font-bold">
                      {item.category}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 space-y-1 text-white">
                      <div className="text-[10px] uppercase tracking-widest text-amber-200">
                        {item.subtitle}
                      </div>
                      <h4 className="text-base font-serif text-white leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between pt-2 text-[11px] text-zinc-300 border-t border-white/20">
                        <span>{item.accent}</span>
                        <div className="flex items-center gap-1 text-rose-300">
                          <Heart className="w-3 h-3 fill-rose-300" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="text-center pt-8">
              <button
                onClick={() => openBookingWithService("Full Portfolio Consultation")}
                className="px-8 py-3.5 rounded-full border border-[#b88a2a] text-xs uppercase tracking-widest text-[#967022] font-semibold hover:bg-amber-100/60 transition-colors inline-flex items-center gap-2 bg-white shadow-sm"
              >
                <span>Request Private Lookbook PDF</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 7: STICKY CSS EDITORIAL ARCHIVE
            (Pure CSS Sticky Feature with Sticky Header & Center 3-Row Pinning)
        ==================================================================== */}
        <section id="editorial-archive" className="relative w-full">
          {/* Top Sticky Intro Screen */}
          <div className="wrapper relative">
            <section className="text-[#1b1614] h-screen w-full bg-[#f4eee3] grid place-content-center sticky top-0 border-b border-[#e8decb] z-0">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e8decb45_1px,transparent_1px),linear-gradient(to_bottom,#e8decb45_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

              <div className="relative z-10 text-center px-8 max-w-5xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Editorial Archive</span>
                </div>
                <h1 className="2xl:text-7xl text-4xl sm:text-6xl font-serif font-light text-[#1b1614] text-center tracking-tight leading-[120%]">
                  Curated Visual Poetry
                  <br />
                  <span className="italic bg-gradient-to-r from-[#967022] via-[#b06c64] to-[#c59b3f] bg-clip-text text-transparent font-normal">
                    In Every Masterful Brushstroke
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl block mt-4 text-[#635850] font-sans font-light tracking-wide">
                    Scroll down to explore haute couture bridal & editorial archives 👇
                  </span>
                </h1>
              </div>
            </section>
          </div>

          {/* Sticky 3-Column Image Showcase */}
          <section className="text-[#1b1614] w-full bg-[#faf7f2] relative z-10 border-t border-[#e8decb]">
            <div className="grid grid-cols-12 gap-3 max-w-[1600px] mx-auto p-3 sm:p-4">
              {/* Left Scrolling Column (5 Images) */}
              <div className="grid gap-3 col-span-12 md:col-span-4">
                {STICKY_SHOWCASE.leftColumn.map((img, idx) => (
                  <figure key={idx} className="w-full relative group overflow-hidden rounded-md border border-[#e8decb] bg-white shadow-sm">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="transition-all duration-300 w-full h-96 sm:h-[420px] align-bottom object-cover rounded-md group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-md" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-widest text-amber-200 block font-semibold">
                        {img.tag}
                      </span>
                      <h4 className="text-sm font-serif text-white">{img.title}</h4>
                    </div>
                  </figure>
                ))}
              </div>

              {/* Center Sticky Column (3 Rows Pinned to 100vh) */}
              <div className="sticky top-0 h-screen w-full col-span-12 md:col-span-4 gap-3 grid grid-rows-3 py-3">
                {STICKY_SHOWCASE.centerSticky.map((img, idx) => (
                  <figure key={idx} className="w-full h-full relative group overflow-hidden rounded-md border-2 border-[#b88a2a] bg-white shadow-xl">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="transition-all duration-300 h-full w-full align-bottom object-cover rounded-md group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-md" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-amber-200 block font-bold">
                          ★ {img.tag}
                        </span>
                        <h4 className="text-sm font-serif text-white font-medium">{img.title}</h4>
                      </div>
                      <Crown className="w-4 h-4 text-amber-300" />
                    </div>
                  </figure>
                ))}
              </div>

              {/* Right Scrolling Column (5 Images) */}
              <div className="grid gap-3 col-span-12 md:col-span-4">
                {STICKY_SHOWCASE.rightColumn.map((img, idx) => (
                  <figure key={idx} className="w-full relative group overflow-hidden rounded-md border border-[#e8decb] bg-white shadow-sm">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="transition-all duration-300 w-full h-96 sm:h-[420px] align-bottom object-cover rounded-md group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1614]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-md" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-widest text-amber-200 block font-semibold">
                        {img.tag}
                      </span>
                      <h4 className="text-sm font-serif text-white">{img.title}</h4>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* Sticky Showcase Footer Typography Banner */}
          <footer className="group bg-[#f4eee3] overflow-hidden pt-12 border-t border-[#e8decb]">
            <h1 className="text-[16vw] translate-y-16 leading-[100%] uppercase font-serif font-semibold text-center bg-gradient-to-r from-[#967022]/40 via-[#1b1614]/20 to-[#967022]/40 bg-clip-text text-transparent transition-all ease-linear select-none">
              EDITORIAL LUXE
            </h1>
            <div className="bg-[#faf7f2] h-32 relative z-10 grid place-content-center text-sm font-serif tracking-widest uppercase font-semibold text-[#8e8278] rounded-tr-[80px] rounded-tl-[80px] border-t border-[#e8decb]">
              <span>Haute Couture Artistry • Sophia Williams</span>
            </div>
          </footer>
        </section>

        {/* ====================================================================
            SECTION 8: WHY DISCERNING CLIENTS CHOOSE US
        ==================================================================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The Gold Standard</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                Why Brides & Celebrities Trust Sophia
              </h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              {WHY_CHOOSE_US.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="relative p-7 rounded-2xl bg-white border border-[#e8decb] hover:border-[#b88a2a] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#967022]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif text-[#1b1614]">{feat.title}</h3>
                    <p className="text-xs text-[#635850] leading-relaxed font-light">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 9: 3D STACKED TESTIMONIAL CAROUSEL
        ==================================================================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 bg-[#f4eee3]">
          <div className="max-w-5xl mx-auto space-y-12 text-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-[#b06c64] text-xs tracking-widest uppercase font-semibold">
                <Heart className="w-3.5 h-3.5" />
                <span>Client Love Stories</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                Words from Our Brides
              </h2>
            </div>

            <div className="relative min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-3xl rounded-3xl bg-white border border-[#e8decb] p-8 sm:p-12 shadow-2xl relative text-center"
                >
                  <div className="text-6xl sm:text-8xl font-serif text-amber-200/50 absolute top-4 left-6 select-none">
                    &ldquo;
                  </div>

                  <div className="flex justify-center text-[#b88a2a] gap-1 mb-6">
                    {[...Array(TESTIMONIALS[testimonialIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#b88a2a]" />
                    ))}
                  </div>

                  <p className="text-base sm:text-xl text-[#2a2421] font-light font-serif leading-relaxed italic relative z-10 max-w-2xl mx-auto">
                    &ldquo;{TESTIMONIALS[testimonialIdx].quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <img
                      src={TESTIMONIALS[testimonialIdx].avatar}
                      alt={TESTIMONIALS[testimonialIdx].name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#b88a2a]"
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-[#1b1614]">
                        {TESTIMONIALS[testimonialIdx].name}
                      </h4>
                      <p className="text-xs text-[#967022] font-medium">
                        {TESTIMONIALS[testimonialIdx].occasion}
                      </p>
                      <p className="text-[10px] text-[#8e8278]">
                        {TESTIMONIALS[testimonialIdx].date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                  )
                }
                className="p-3 rounded-full border border-[#d8cbbb] hover:border-[#b88a2a] hover:bg-white text-[#1b1614] transition-all bg-white/70 shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIdx(idx)}
                    className={`h-2 rounded-full transition-all ${
                      testimonialIdx === idx ? "w-8 bg-[#b88a2a]" : "w-2 bg-amber-200"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-3 rounded-full border border-[#d8cbbb] hover:border-[#b88a2a] hover:bg-white text-[#1b1614] transition-all bg-white/70 shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 10: THE ARTISTRY JOURNEY (4-STEP PROCESS)
        ==================================================================== */}
        <section id="process" className="relative py-28 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Seamless Experience</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                The 4-Step Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {PROCESS_STEPS.map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-8 rounded-2xl bg-white border border-[#e8decb] hover:border-[#b88a2a] transition-all duration-300 group space-y-4 shadow-md hover:shadow-xl"
                >
                  <div className="text-4xl font-serif font-light text-amber-300 group-hover:text-[#967022] transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1b1614]">{item.title}</h3>
                    <div className="text-xs uppercase tracking-widest text-[#967022] font-semibold mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-[#635850] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 11: PRICING & BESPOKE PACKAGES
        ==================================================================== */}
        <section id="packages" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-[#f4eee3]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
                <Crown className="w-3.5 h-3.5" />
                <span>Investment & Inclusions</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1b1614]">
                Luxury Service Suites
              </h2>
              <p className="text-[#635850] text-sm">
                Transparent luxury pricing. Custom destination packages available for worldwide
                ceremonies upon request.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 shadow-lg ${
                    pkg.highlight
                      ? "bg-white border-2 border-[#b88a2a] shadow-[0_10px_40px_rgba(184,138,42,0.25)] lg:-translate-y-4"
                      : "bg-[#faf7f2] border border-[#e8decb] hover:border-[#b88a2a]"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#b88a2a] to-[#d4af37] text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#967022] font-bold">
                        {pkg.badge}
                      </div>
                      <h3 className="text-2xl font-serif text-[#1b1614] mt-1">{pkg.name}</h3>
                      <p className="text-xs text-[#635850] mt-1">{pkg.subtitle}</p>
                    </div>

                    <div className="pt-4 border-t border-[#e8decb]">
                      <div className="text-3xl sm:text-4xl font-serif text-[#1b1614]">
                        {pkg.price}
                        <span className="text-xs font-sans text-[#8e8278] ml-2 font-normal">
                          / {pkg.dollar}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      {pkg.features.map((feat, fidx) => (
                        <li
                          key={fidx}
                          className="text-xs text-[#4d443e] flex items-start gap-2.5"
                        >
                          <Check className="w-4 h-4 text-[#b88a2a] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-6">
                    <button
                      onClick={() => openBookingWithService(pkg.name)}
                      className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                        pkg.highlight
                          ? "bg-gradient-to-r from-[#b88a2a] via-[#d4af37] to-[#c59b3f] text-white shadow-[0_4px_20px_rgba(184,138,42,0.35)] hover:shadow-[0_6px_30px_rgba(184,138,42,0.5)]"
                          : "border border-[#d8cbbb] text-[#1b1614] hover:border-[#b88a2a] hover:bg-white bg-white"
                      }`}
                    >
                      Book This Suite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 12: INSTAGRAM & SOCIAL EDITORIAL GALLERY
        ==================================================================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#967022] font-semibold mb-1">
                  <Instagram className="w-4 h-4" />
                  <span>Follow Our Daily Glamour</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#1b1614]">
                  {BRAND.instagram}
                </h2>
              </div>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full border border-[#b88a2a] text-xs uppercase tracking-widest text-[#967022] font-semibold hover:bg-amber-100/60 transition-all flex items-center gap-2 bg-white shadow-sm"
              >
                <span>Follow On Instagram</span>
                <ArrowUpRight className="w-4 h-4 text-[#b88a2a]" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {INSTAGRAM_POSTS.map((post, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden aspect-square border border-[#e8decb] bg-white shadow-sm"
                >
                  <img
                    src={post.image}
                    alt="Instagram Look"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#1b1614]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 p-2 text-center">
                    <Instagram className="w-5 h-5 text-amber-200" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold">
                      {post.likes} Likes
                    </span>
                    <span className="text-[9px] text-zinc-200">{post.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 13: FINAL CONVERGENCE BOOKING CTA & CONTACT
        ==================================================================== */}
        <section id="contact" className="relative py-32 px-6 sm:px-10 lg:px-16 overflow-hidden bg-gradient-to-b from-[#faf7f2] via-[#f4eee3] to-[#faf7f2]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-amber-300/15 blur-[160px]" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-[#967022] text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Dates Available for 2025–2026</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#1b1614] leading-tight">
              Your Next Look
              <br />
              <span className="italic bg-gradient-to-r from-[#967022] via-[#b06c64] to-[#c59b3f] bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h2>

            <p className="text-[#635850] text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              Whether you are walking down the aisle in Udaipur, attending a Paris gala, or
              booking an intimate private session, let us design your beauty moment.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openBookingWithService(SERVICES[0].name)}
                className="px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-[#b88a2a] via-[#d4af37] to-[#c59b3f] text-white shadow-[0_6px_25px_rgba(184,138,42,0.35)] hover:shadow-[0_8px_30px_rgba(184,138,42,0.5)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase text-emerald-900 border border-emerald-500/40 bg-emerald-50/80 hover:bg-emerald-100 transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Instant Chat</span>
              </a>
            </div>

            <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#e8decb] text-xs text-[#635850]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#967022] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8e8278] block">
                    Phone & WhatsApp
                  </span>
                  <span className="text-[#1b1614] font-medium">{BRAND.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#967022] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8e8278] block">
                    Direct Email
                  </span>
                  <span className="text-[#1b1614] font-medium">{BRAND.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#967022] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8e8278] block">
                    Studio & Travel
                  </span>
                  <span className="text-[#1b1614] font-medium">{BRAND.city}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          SECTION 14: LUXURY LIGHT FOOTER
      ==================================================================== */}
      <footer className="relative bg-[#f0e8dc] border-t border-[#e8decb] pt-16 pb-12 px-6 sm:px-10 lg:px-16 text-[#635850] text-xs">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-amber-400 bg-white flex items-center justify-center text-[#967022] font-serif font-bold text-xs shadow-sm">
                  {BRAND.monogram}
                </div>
                <span className="font-serif text-lg tracking-widest text-[#1b1614] font-semibold">
                  {BRAND.name}
                </span>
              </div>
              <p className="text-[#635850] text-xs max-w-sm leading-relaxed">
                {BRAND.tagline}. High-fashion bridal, editorial, and red-carpet beauty designed
                to make every singular moment unforgettable.
              </p>
            </div>

            <div className="md:col-span-2 space-y-3 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#1b1614] font-bold block">
                Artistry
              </span>
              <ul className="space-y-2 text-[#635850]">
                <li>
                  <a href="#about" className="hover:text-[#967022]">
                    The Artist
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#967022]">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#967022]">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#editorial-archive" className="hover:text-[#967022]">
                    Archive
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#1b1614] font-bold block">
                Suites
              </span>
              <ul className="space-y-2 text-[#635850]">
                <li>
                  <a href="#packages" className="hover:text-[#967022]">
                    Bridal Suite
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-[#967022]">
                    Occasion Glam
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-[#967022]">
                    Trouseau
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[#967022]">
                    Process
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#1b1614] font-bold block">
                Studio & Enquiries
              </span>
              <p className="text-[#2a2421] font-medium">{BRAND.location}</p>
              <p className="text-[#635850]">{BRAND.phone} • {BRAND.email}</p>
              <div className="pt-2">
                <span className="text-[10px] text-[#967022] font-semibold block">
                  Worldwide Destination Travel Accepted
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#dfd4c5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8e8278]">
            <p>© {new Date().getFullYear()} {BRAND.name} by {BRAND.artistName}. All rights reserved.</p>
            <p className="text-[#8e8278]">
              Crafted in Warm Ivory & Gold with CSS Sticky & Framer Motion
            </p>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          INTERACTIVE LIGHTBOX MODAL FOR PORTFOLIO
      ==================================================================== */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-[#e8decb] shadow-2xl grid grid-cols-1 md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:col-span-7 h-80 sm:h-[500px]">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left bg-[#faf7f2]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#967022] font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300">
                      {lightboxImage.category}
                    </span>
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="p-1 rounded-full text-[#8e8278] hover:text-[#1b1614]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif text-[#1b1614]">{lightboxImage.title}</h3>
                  <p className="text-xs text-[#635850]">{lightboxImage.subtitle}</p>

                  <div className="pt-4 border-t border-[#e8decb] space-y-2 text-xs text-[#4d443e]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#b88a2a]" />
                      <span>Custom Mineral HD Formula</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#b88a2a]" />
                      <span>18-Hour Anti-Crease Setting</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setLightboxImage(null);
                      openBookingWithService(lightboxImage.title);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#b88a2a] to-[#d4af37] text-white font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
                  >
                    Request This Style
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          INTERACTIVE BOOKING MODAL
      ==================================================================== */}
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9995] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative max-w-lg w-full bg-[#faf7f2] rounded-3xl p-6 sm:p-8 border border-[#e8decb] shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-[#8e8278] hover:text-[#1b1614] border border-[#e8decb] bg-white"
              >
                <X className="w-4 h-4" />
              </button>

              {bookingSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-400 text-[#967022] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#1b1614]">
                    Reservation Request Received
                  </h3>
                  <p className="text-xs text-[#635850] max-w-sm mx-auto">
                    Sophia&apos;s concierge will reach out within 24 hours via WhatsApp &
                    email with date availability and bridal dossier.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#967022] font-bold mb-1">
                      <Crown className="w-3.5 h-3.5" />
                      <span>Bespoke Appointment</span>
                    </div>
                    <h3 className="text-2xl font-serif text-[#1b1614]">Reserve Your Look</h3>
                    <p className="text-xs text-[#635850]">
                      Share your event details to check Sophia&apos;s calendar availability.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] placeholder-[#a69c92] text-xs focus:outline-none focus:border-[#b88a2a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] placeholder-[#a69c92] text-xs focus:outline-none focus:border-[#b88a2a]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] placeholder-[#a69c92] text-xs focus:outline-none focus:border-[#b88a2a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                          Service Category
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({ ...formData, service: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] text-xs focus:outline-none focus:border-[#b88a2a]"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                          <option value="Destination Bridal Suite">
                            Destination Bridal Suite
                          </option>
                          <option value="Private 1-on-1 Masterclass">
                            Private 1-on-1 Masterclass
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] placeholder-[#a69c92] text-xs focus:outline-none focus:border-[#b88a2a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#4d443e] font-semibold block mb-1">
                        Event Venue / Special Requests (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Udaipur palace wedding, requires dupatta drape assistance..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-white border border-[#d8cbbb] text-[#1b1614] placeholder-[#a69c92] text-xs focus:outline-none focus:border-[#b88a2a]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b88a2a] via-[#d4af37] to-[#c59b3f] text-white font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-[0_4px_20px_rgba(184,138,42,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reservation Inquiry</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
