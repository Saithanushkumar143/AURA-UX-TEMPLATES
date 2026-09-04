"use client";

import React, { ComponentPropsWithoutRef, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Star,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Users,
  Check,
  X,
  ChevronRight,
  Flame,
  Award,
  Utensils,
  Wine,
  Coffee,
  Heart,
  Eye,
  ShieldCheck,
  ArrowRight,
  Send,
  SlidersHorizontal,
} from "lucide-react";

/* =========================================================================
   1. MARQUEE COMPONENT (Provided UI)
   ========================================================================= */
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  autoFill?: boolean;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  ariaRole?: string;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={cn(
        "group flex overflow-hidden p-2 [--duration:38s] [--gap:1.25rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
    >
      {useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                key={i}
                className={cn(
                  !vertical ? "flex-row [gap:var(--gap)]" : "flex-col [gap:var(--gap)]",
                  "flex shrink-0 justify-around",
                  !vertical && "animate-marquee flex-row",
                  vertical && "animate-marquee-vertical flex-col",
                  pauseOnHover && "group-hover:[animation-play-state:paused]",
                  reverse && "[animation-direction:reverse]",
                )}
              >
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, pauseOnHover, reverse],
      )}
    </div>
  );
}

/* =========================================================================
   2. 3D COVERFLOW CAROUSEL COMPONENT (Provided UI)
   ========================================================================= */
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

interface CarouselItem {
  id?: string;
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
  price?: string;
  pairing?: string;
  calories?: string;
}

interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

const defaultDishes: CarouselItem[] = [
  {
    id: "dish-1",
    tag: "#Signature",
    titleLine1: "BUTTER CHICKEN",
    titleLine2: "– DELHI HERITAGE",
    desc: "Velvety roasted tomato and fenugreek gravy with tender charred chicken steeped in churned butter",
    img: "https://cdn.21st.dev/assets/mirror/84/84cb320f9692895054c9e1774ca48848f1c9c62ccba43ad8ad0b186460bb3751.jpg",
    ctaText: "Order Dish",
    ctaUrl: "#menu",
    price: "$42",
    pairing: "2019 Domaine Leflaive Puligny-Montrachet",
  },
  {
    id: "dish-2",
    tag: "#ChefSpecial",
    titleLine1: "TANDOORI CHOPS",
    titleLine2: "– SMOKED SPICE",
    desc: "Grass-fed lamb chops charred in live charcoal tandoor with Kashmiri saffron & royal mace glaze",
    img: "https://cdn.21st.dev/assets/mirror/a4/a4712dee84e12432f1d3a1a3234914c0281c9bb12692e4bc8da5eaa4355bec33.jpg",
    ctaText: "Order Dish",
    ctaUrl: "#menu",
    price: "$58",
    pairing: "2018 Château Pontet-Canet Pauillac",
  },
  {
    id: "dish-3",
    tag: "#Vegetarian",
    titleLine1: "PANEER TIKKA",
    titleLine2: "– CLAY ROASTED",
    desc: "Artisan cottage cheese marinated in spiced hung yogurt, charred bell peppers & organic saffron dust",
    img: "https://cdn.21st.dev/assets/mirror/56/56a6950cf4a436af231cf7cd707189e121e65934066f851c744bdab0cfee64d4.jpg",
    ctaText: "Order Dish",
    ctaUrl: "#menu",
    price: "$36",
    pairing: "2021 Dr. Loosen Erdener Treppchen Riesling",
  },
  {
    id: "dish-4",
    tag: "#CoastalCatch",
    titleLine1: "MALABAR PRAWNS",
    titleLine2: "– COCONUT GRAVY",
    desc: "Jumbo wild tiger prawns simmered in fragrant crushed curry leaves, kokum pods, and fresh coconut cream",
    img: "https://cdn.21st.dev/assets/mirror/a3/a32877b070c563bbbcf54b6104761b1516814625209c806ee8b60f8a69598cd1.jpg",
    ctaText: "Order Dish",
    ctaUrl: "#menu",
    price: "$52",
    pairing: "2022 Cloudy Bay Te Koko Sauvignon Blanc",
  },
  {
    id: "dish-5",
    tag: "#ArtisanBake",
    titleLine1: "TRUFFLE NAAN",
    titleLine2: "– CHARCOAL OVEN",
    desc: "Crispy puffed leavened bread brushed with farm ghee, roasted garlic, and shaved black Perigord winter truffle",
    img: "https://cdn.21st.dev/assets/mirror/5c/5c1b6f03cc2ace649f9025f304ca4fdce74cd413504e65a00ef3f68152e8ed92.jpg",
    ctaText: "Order Dish",
    ctaUrl: "#menu",
    price: "$24",
    pairing: "NV Billecart-Salmon Brut Rosé Champagne",
  },
];

function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{
        backgroundColor: "#0c0a09",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={items[currentIndex]?.img}
          alt="ambience background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.22) blur(32px)",
            transform: "scale(1.15)",
            transition: "opacity 1000ms ease, filter 1000ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #c5a880)" }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c5a880",
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #c5a880, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = "translateX(285px) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = "translateX(510px) scale(0.68) rotateY(-38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform = "translateX(-285px) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = "translateX(-510px) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "500px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.9)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h2>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "34px",
                        height: "2px",
                        backgroundColor: "#c5a880",
                        borderRadius: "2px",
                        margin: "5px auto 4px",
                        boxShadow: "0 0 8px rgba(197,168,128,0.7)",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: "0 0 10px",
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 18px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                        color: "#110d0c",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(197,168,128,0.3)",
                        cursor: "pointer",
                        transition: "transform 200ms ease, box-shadow 200ms ease",
                      }}
                    >
                      <span>{item.ctaText || "View Menu"}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous dish"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next dish"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(197,168,128,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. MENU DATA & TASTING COURSES
   ========================================================================= */
interface MenuItem {
  name: string;
  category: "starters" | "mains" | "tandoor" | "desserts" | "cocktails";
  price: string;
  description: string;
  spiciness: number;
  diet: "Veg" | "Non-Veg" | "Vegan";
  badge?: string;
}

const FULL_MENU: MenuItem[] = [
  {
    name: "Old Delhi Butter Chicken",
    category: "mains",
    price: "$42",
    description: "Charcoal roasted free-range chicken steeped in strained San Marzano tomato & fenugreek silk gravy.",
    spiciness: 2,
    diet: "Non-Veg",
    badge: "House Signature",
  },
  {
    name: "Smoked Kashmiri Lamb Chops",
    category: "tandoor",
    price: "$58",
    description: "48-hour spiced marinade, clay tandoor charred, saffron glaze, raw papaya chutney.",
    spiciness: 3,
    diet: "Non-Veg",
    badge: "Chef's Cut",
  },
  {
    name: "Saffron Paneer Tikka Barrels",
    category: "tandoor",
    price: "$36",
    description: "House-crafted buffalo milk paneer, bell pepper confetti, spiced hung curd, crushed coriander seed.",
    spiciness: 2,
    diet: "Veg",
    badge: "Vegetarian Gold",
  },
  {
    name: "Wild Malabar Coconut Tiger Prawns",
    category: "mains",
    price: "$52",
    description: "Jumbo ocean tiger prawns, cold-pressed coconut milk, dried kokum, stone-ground mustard seeds.",
    spiciness: 2,
    diet: "Non-Veg",
    badge: "Coastal Classic",
  },
  {
    name: "Black Winter Truffle Ghee Naan",
    category: "tandoor",
    price: "$24",
    description: "Puffed tandoor leavened sourdough bread, A2 cultured ghee, sea salt flakes, freshly shaved Périgord truffle.",
    spiciness: 0,
    diet: "Veg",
  },
  {
    name: "Avadh Dum Nalli Biryani",
    category: "mains",
    price: "$48",
    description: "Slow sealed brass handi biryani, aged Himalayan basmati rice, tender lamb shank, rose petal saffron aroma.",
    spiciness: 2,
    diet: "Non-Veg",
    badge: "Royal Dum Feast",
  },
  {
    name: "Crispy Samosa Cone Chaat",
    category: "starters",
    price: "$22",
    description: "Micro-herb pastry cones, spiced edamame & potato hash, tamarind reduction, pomegranate pearls.",
    spiciness: 1,
    diet: "Veg",
  },
  {
    name: "Charred Scallop Moilee",
    category: "starters",
    price: "$28",
    description: "Pan-seared Hokkaido sea scallops, turmeric coconut broth, mustard seed caviar, curry oil.",
    spiciness: 1,
    diet: "Non-Veg",
  },
  {
    name: "Royal Cardamom Pistachio Kulfi",
    category: "desserts",
    price: "$20",
    description: "Slow-reduced churned jersey milk, roasted Iranian green pistachio, edible 24k gold leaf, rose syrup.",
    spiciness: 0,
    diet: "Veg",
    badge: "Golden Dessert",
  },
  {
    name: "Smoked Cardamom Old Fashioned",
    category: "cocktails",
    price: "$26",
    description: "Bourbon infused with green cardamom pods, jaggery syrup, charred cinnamon smoke, angostura bitters.",
    spiciness: 0,
    diet: "Vegan",
    badge: "Signature Alchemy",
  },
];

const CRITIC_REVIEWS = [
  {
    critic: "MICHELIN GUIDE 2026",
    quote: "“A breathtaking revelation of Indian gastronomy where live wood-fire smoke meets royal Awadhi precision.”",
    rating: "★★ Three Stars",
    author: "Inspector Report",
  },
  {
    critic: "THE NEW YORK TIMES",
    quote: "“The Black Truffle Naan and Smoked Lamb Chops redefine modern fine dining in America. Simply sensational.”",
    rating: "★★★★ Critic's Pick",
    author: "Pete Wells",
  },
  {
    critic: "WORLD'S 50 BEST",
    quote: "“A masterclass in centuries-old tandoor mastery harmonized with contemporary sommelier vintages.”",
    rating: "#18 Global Rank",
    author: "Academy Jury",
  },
  {
    critic: "FORBES LUXURY",
    quote: "“The Chef’s Saffron Table is perhaps the most sought-after culinary reservation in the country.”",
    rating: "Five-Star Award",
    author: "Culinary Digest",
  },
];

/* =========================================================================
   4. MAIN RESTAURANT TEMPLATE PAGE
   ========================================================================= */
export default function HeritageDiningTemplate() {
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>("all");
  const [selectedDishModal, setSelectedDishModal] = useState<CarouselItem | null>(null);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reserveSuccess, setReserveSuccess] = useState(false);

  // Reservation Form State
  const [reserveData, setReserveData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "2026-09-12",
    time: "19:30",
    guests: "2 Guests",
    seating: "Main Dining Room",
    notes: "Celebrating anniversary",
  });

  const filteredMenu = useMemo(() => {
    if (activeMenuCategory === "all") return FULL_MENU;
    return FULL_MENU.filter((item) => item.category === activeMenuCategory);
  }, [activeMenuCategory]);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveSuccess(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#c5a880", "#e8d5b5", "#a48256", "#f4efe6"],
    });
  };

  const handleOpenDishBooking = (dish: CarouselItem) => {
    setSelectedDishModal(dish);
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-zinc-100 font-sans selection:bg-[#c5a880] selection:text-zinc-950">
      {/* Top Banner Mentioning Aura UX Template Only */}
      <div className="bg-gradient-to-r from-[#171311] via-[#241c18] to-[#171311] border-b border-[#c5a880]/30 py-2 px-4 text-center text-xs text-[#c5a880] font-mono tracking-widest uppercase flex items-center justify-center font-bold">
        AURA UX TEMPLATE
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-xl border-b border-[#c5a880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a880] flex items-center justify-center bg-gradient-to-br from-[#1c1613] to-[#0c0a09] shadow-lg shadow-[#c5a880]/10">
              <span className="font-serif font-bold text-lg text-[#c5a880]">Z</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white block leading-none">
                ZAFRAN
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a880] uppercase block mt-0.5">
                Heritage Dining &bull; Michelin Atelier
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase font-semibold tracking-widest text-zinc-300">
            <a href="#experience" className="hover:text-[#c5a880] transition-colors">Philosophy</a>
            <a href="#signature-dishes" className="hover:text-[#c5a880] transition-colors">Best Sellers</a>
            <a href="#menu" className="hover:text-[#c5a880] transition-colors">À La Carte</a>
            <a href="#tasting" className="hover:text-[#c5a880] transition-colors">Tasting Menu</a>
            <a href="#critics" className="hover:text-[#c5a880] transition-colors">Accolades</a>
            <a href="#location" className="hover:text-[#c5a880] transition-colors">Hours</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsReserveOpen(true);
                setReserveSuccess(false);
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a880] via-[#d4b993] to-[#a48256] text-[#0c0a09] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#c5a880]/20 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        {/* Background Ambience & Lighting */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80"
            alt="Zafran dining ambience"
            className="w-full h-full object-cover brightness-[0.22] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/80 via-transparent to-[#0c0a09]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#c5a880]/10 blur-[140px] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1613] border border-[#c5a880]/40 text-[#c5a880] text-xs font-mono uppercase tracking-widest shadow-inner">
            <Flame className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Awadhi Fire &bull; Live Charcoal Tandoor &bull; Saffron Atelier</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
            A Symphony of Fire, Smoke <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e8d5b5] via-[#c5a880] to-[#a48256]">
              & Royal Heritage Spices.
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Rooted in 300 years of Awadhi royal culinary tradition. Charred in 800°F live clay ovens, slow-steeped in cold-pressed oils and precious Kashmir saffron.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#signature-dishes"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c5a880] to-[#a48256] text-[#0c0a09] font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#c5a880]/25 hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span>Explore Signature Dishes</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setIsReserveOpen(true);
                setReserveSuccess(false);
              }}
              className="px-7 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-[#c5a880]/40 text-zinc-100 font-semibold text-xs uppercase tracking-widest transition-all"
            >
              Book Tasting Experience
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-zinc-800/80">
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">800°F</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Charcoal Tandoor</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">36-Hour</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Slow Dum Simmer</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">100%</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Organic Spices</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">★★</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Michelin Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COVERFLOW DISHES SECTION (INTEGRATING PROVIDED COMPONENT)
          ===================================================================== */}
      <div id="signature-dishes" className="relative">
        <CoverFlowCarousel
          items={defaultDishes}
          sectionLabel="CHEF'S SIGNATURE CREATIONS"
          autoplay={true}
          autoplayDelay={4500}
          onCtaClick={handleOpenDishBooking}
        />
      </div>

      {/* =====================================================================
          INFINITE CRITICS & ACCREDITATIONS MARQUEE (INTEGRATING PROVIDED MARQUEE)
          ===================================================================== */}
      <section id="critics" className="py-14 bg-[#110d0b] border-y border-[#c5a880]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
            Praise & Global Acclaim
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">What the Critics Say</h2>
        </div>

        {/* Marquee Row 1 */}
        <Marquee pauseOnHover={true} repeat={4} className="py-2">
          {CRITIC_REVIEWS.map((review, i) => (
            <div
              key={i}
              className="w-[380px] bg-[#1a1411] border border-[#c5a880]/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold font-mono text-[#c5a880] uppercase tracking-wider">
                  {review.critic}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#c5a880]/15 text-[#e8d5b5]">
                  {review.rating}
                </span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed line-clamp-3 mb-4">
                {review.quote}
              </p>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                — {review.author}
              </div>
            </div>
          ))}
        </Marquee>

        {/* Marquee Row 2 (Reversed) */}
        <Marquee pauseOnHover={true} reverse={true} repeat={4} className="py-2 mt-2">
          {[
            "✦ 2026 Wine Spectator Grand Award Winner",
            "✦ Hand-picked saffron from Pampore, Kashmir",
            "✦ Wild-caught sustainable coastal seafood",
            "✦ Artisan tandoor crafted from Jaipur red clay",
            "✦ Sommelier cellars with 1,200 curated vintage labels",
            "✦ Relais & Châteaux Culinary Member",
          ].map((feat, idx) => (
            <div
              key={idx}
              className="px-6 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-[#c5a880] tracking-wider whitespace-nowrap flex items-center gap-2"
            >
              <span>{feat}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Culinary Heritage & Philosophy */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#c5a880]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80"
              alt="Chef cooking in clay tandoor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0c0a09]/90 border border-[#c5a880]/30 backdrop-blur-md">
              <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest">
                Executive Chef & Purveyor
              </span>
              <h4 className="text-base font-serif font-bold text-white">Master Chef Kabir Al-Zafran</h4>
              <p className="text-xs text-zinc-400 mt-1">
                4th generation Awadhi royal court chef preserving forgotten spices and artisanal hand-pounding methods.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Philosophy of Slow Gastronomy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Where Ancient Fire Meets Modern Perfection.
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              Every dish at Zafran tells a three-century-old story of the royal Nawabs. Our charcoal ovens are constructed from seasoned Jaipur red clay and river silt, baking bread and meats at intense heat while locking in moisture.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: "Kashmir Saffron Harvest", desc: "Grade-1 Mongra saffron hand-picked from the mountain valleys of Pampore." },
                { title: "Brass Dum Pots (Handi)", desc: "Sealed with dough and slow-simmered over gentle embers for up to 36 hours." },
                { title: "Artisan Wood Coal", desc: "Seasoned neem and babool wood impart signature fragrant smokiness." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#14100e] border border-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* À La Carte Menu Showcase */}
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono text-[#c5a880] uppercase tracking-widest">
            Handcrafted Menu
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            À La Carte Selections
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Carefully curated seasonal creations served with warm puffed breads, house-churned butter, and fragrant basmati.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Items" },
              { id: "starters", label: "Starters & Chaat" },
              { id: "tandoor", label: "Charcoal Tandoor" },
              { id: "mains", label: "Royal Curries & Dum" },
              { id: "desserts", label: "Desserts" },
              { id: "cocktails", label: "Alchemy Cocktails" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveMenuCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeMenuCategory === cat.id
                    ? "bg-[#c5a880] text-[#0c0a09] shadow-md shadow-[#c5a880]/30 font-bold"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#14100e] border border-zinc-800/90 hover:border-[#c5a880]/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-serif font-bold text-white group-hover:text-[#c5a880] transition-colors">
                        {item.name}
                      </h4>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        item.diet === "Veg" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                      }`}>
                        {item.diet}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider block mt-0.5">
                        ✦ {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-serif text-lg font-bold text-[#c5a880]">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-400/80">
                  {Array.from({ length: item.spiciness }).map((_, i) => (
                    <Flame key={i} className="w-3.5 h-3.5 fill-current text-rose-500" />
                  ))}
                  {item.spiciness === 0 && (
                    <span className="text-[10px] text-zinc-500 font-mono">Mild Delicate</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setIsReserveOpen(true);
                    setReserveData((prev) => ({ ...prev, notes: `Interested in ordering ${item.name}` }));
                  }}
                  className="text-[11px] font-semibold text-[#c5a880] hover:underline flex items-center gap-1"
                >
                  Reserve Table for This <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Royal Tasting Menu Section */}
      <section id="tasting" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1411] via-[#140f0d] to-[#0c0a09] border border-[#c5a880]/40 p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
              Exclusive 7-Course Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              The Grand Royal Tasting Degustation
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              An intimate multi-course culinary theater curated personally by Executive Chef Kabir. Includes rare vintage sommelier wine or artisanal spiced tea pairings.
            </p>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-3xl font-bold text-[#c5a880]">$195</span>
              <span className="text-xs text-zinc-400 font-mono">per guest &bull; Optional Wine Pairing +$95</span>
            </div>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsReserveOpen(true);
                  setReserveData((prev) => ({ ...prev, seating: "Chef's Saffron Counter (Tasting Menu)" }));
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c5a880] to-[#a48256] text-[#0c0a09] font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#c5a880]/30 hover:scale-105 transition-all"
              >
                Reserve Tasting Degustation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hours, Location & Private Events */}
      <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location */}
          <div className="p-6 rounded-3xl bg-[#14100e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white text-base">Sanctuary & Location</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              442 Heritage Boulevard, Michelin Row <br />
              Manhattan, New York, NY 10022
            </p>
            <span className="text-[11px] text-[#c5a880] font-mono block pt-1">
              Valet Parking Available
            </span>
          </div>

          {/* Dining Hours */}
          <div className="p-6 rounded-3xl bg-[#14100e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white text-base">Hours of Service</h4>
            <div className="text-xs text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Tue – Thu Dinner:</span>
                <span className="text-zinc-200 font-mono">5:30 PM – 10:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri – Sat Gala:</span>
                <span className="text-zinc-200 font-mono">5:00 PM – 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday Tasting:</span>
                <span className="text-zinc-200 font-mono">4:30 PM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Concierge */}
          <div className="p-6 rounded-3xl bg-[#14100e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white text-base">Private Dining Concierge</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Direct desk for private buyouts, wine cellar masterclasses, and executive galas.
            </p>
            <span className="text-xs font-mono font-bold text-[#c5a880] block pt-1">
              +1 (212) 840-7799
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE RESERVATION MODAL
          ===================================================================== */}
      {isReserveOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#171311] border border-[#c5a880]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsReserveOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {reserveSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center mx-auto border border-[#c5a880]/40">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Table Confirmed, Welcome to Zafran.
                </h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  We look forward to hosting you for an unforgettable evening. A confirmation SMS and digital calendar invitation have been sent to <strong>{reserveData.email || reserveData.phone}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#c5a880] text-left space-y-1">
                  <div><strong>Date & Time:</strong> {reserveData.date} at {reserveData.time}</div>
                  <div><strong>Party Size:</strong> {reserveData.guests} ({reserveData.seating})</div>
                  <div><strong>Booking Ref:</strong> ZFR-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>
                <button
                  onClick={() => setIsReserveOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#c5a880] text-[#0c0a09] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Close & Return to Menu
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880]">
                    Table Reservation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Book Your Culinary Evening
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={reserveData.date}
                      onChange={(e) => setReserveData({ ...reserveData, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Time Slot</label>
                    <select
                      value={reserveData.time}
                      onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="17:30">5:30 PM (Early Twilight)</option>
                      <option value="18:30">6:30 PM (Dinner Service)</option>
                      <option value="19:30">7:30 PM (Prime Evening)</option>
                      <option value="20:30">8:30 PM (Prime Evening)</option>
                      <option value="21:30">9:30 PM (Late Night Tandoor)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Party Size</label>
                    <select
                      value={reserveData.guests}
                      onChange={(e) => setReserveData({ ...reserveData, guests: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="1 Guest">1 Guest (Bar Counter)</option>
                      <option value="2 Guests">2 Guests (Intimate Table)</option>
                      <option value="4 Guests">4 Guests (Dining Room)</option>
                      <option value="6 Guests">6 Guests (Booth Table)</option>
                      <option value="8+ Guests">8+ Guests (Chef Table)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Seating Area</label>
                    <select
                      value={reserveData.seating}
                      onChange={(e) => setReserveData({ ...reserveData, seating: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="Main Dining Room">Main Dining Room</option>
                      <option value="Velvet Saffron Booth">Velvet Saffron Booth</option>
                      <option value="Chef's Tandoor Counter">Chef's Tandoor Counter</option>
                      <option value="Wine Cellar Alcove">Wine Cellar Alcove</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander Wright"
                      value={reserveData.name}
                      onChange={(e) => setReserveData({ ...reserveData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Email or Phone</label>
                    <input
                      type="text"
                      required
                      placeholder="alexander@luxury.com or +1 555-0192"
                      value={reserveData.email}
                      onChange={(e) => setReserveData({ ...reserveData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#c5a880] via-[#d4b993] to-[#a48256] text-[#0c0a09] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#c5a880]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#c5a880]/20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Zafran Heritage Dining &bull; Michelin Atelier</p>
        <span className="text-[#c5a880] font-mono text-[11px] font-bold">Aura UX Template</span>
      </footer>
    </div>
  );
}
