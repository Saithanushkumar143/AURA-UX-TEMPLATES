"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  Heart,
  Sparkles,
  Camera,
  Mail,
  RotateCcw,
  Volume2,
  VolumeX,
  Send,
  PartyPopper,
  X,
  Calendar,
  Eye,
  ChevronDown,
  Quote
} from "lucide-react";
import confetti from "canvas-confetti";
import "./birthday.css";

/* ============================================================
   TYPES & MOCK DATA FOR MEMORY GALLERY & LETTER
   ============================================================ */
interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  rotation: string;
  tag: string;
  imageUrl: string;
}

const MEMORIES: MemoryPhoto[] = [
  {
    id: "1",
    title: "Golden Hour Glow",
    date: "Summer 2025",
    location: "Sunset Cliffs, San Diego",
    caption: "The golden light that made time feel infinite and warm.",
    rotation: "-rotate-2",
    tag: "Adventures",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Late Night Laughter",
    date: "Autumn 2025",
    location: "Rooftop Bistro",
    caption: "Unfiltered smiles, inside jokes, and midnight dessert runs.",
    rotation: "rotate-3",
    tag: "Celebration",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Coffee & Dreams",
    date: "Winter 2025",
    location: "Old Town Bakery",
    caption: "Talking about our biggest dreams over warm vanilla lattes.",
    rotation: "-rotate-3",
    tag: "Everyday Magic",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "The Coastal Roadtrip",
    date: "Spring 2026",
    location: "Pacific Highway 1",
    caption: "Windows down, singing at the top of our lungs with the sea breeze.",
    rotation: "rotate-2",
    tag: "Travel",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Birthday Midnight Surprise",
    date: "Special Moment",
    location: "Secret Lounge",
    caption: "When the lights went off and the sparkler candles ignited!",
    rotation: "-rotate-1",
    tag: "Milestone",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Starlit Festival",
    date: "Midsummer",
    location: "Lantern Valley",
    caption: "Surrounded by fairy lights and the people who make life brighter.",
    rotation: "rotate-2",
    tag: "Memories",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
  },
];

interface GuestWish {
  id: string;
  name: string;
  message: string;
  time: string;
  heartColor: string;
}

export default function CinematicBirthdayTemplate() {
  const [isMuted, setIsMuted] = useState(false);
  const [filmSettled, setFilmSettled] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  // Wishes state
  const [wishes, setWishes] = useState<GuestWish[]>([
    {
      id: "w1",
      name: "Sophia & Liam",
      message: "Happy Birthday! May this year bring you boundless joy, breathtaking adventures, and all the love in the universe! ✨",
      time: "Just now",
      heartColor: "text-rose-500",
    },
    {
      id: "w2",
      name: "Marcus K.",
      message: "To the person who illuminates every room they walk into — here is to the most incredible chapter ahead! 🥂",
      time: "2 hours ago",
      heartColor: "text-amber-500",
    },
    {
      id: "w3",
      name: "Aria Chen",
      message: "Happy birthday dearest! Thank you for always bringing warmth and kindness into our lives. Bloom brightly! 🌸",
      time: "Yesterday",
      heartColor: "text-pink-500",
    },
  ]);
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  // Canvas and Film Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const hintRef = useRef<HTMLParagraphElement | null>(null);
  const motesRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetHeartRef = useRef<HTMLSpanElement | null>(null);
  const archeryRef = useRef<HTMLDivElement | null>(null);
  const bowRef = useRef<SVGSVGElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const strLRef = useRef<SVGLineElement | null>(null);
  const strRRef = useRef<SVGLineElement | null>(null);
  const servingRef = useRef<SVGCircleElement | null>(null);
  const aimRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<SVGCircleElement | null>(null);

  const floodRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<HTMLDivElement | null>(null);
  const fgridRef = useRef<HTMLDivElement | null>(null);
  const kEyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const kSubRef = useRef<HTMLParagraphElement | null>(null);
  const barTopRef = useRef<HTMLDivElement | null>(null);
  const barBotRef = useRef<HTMLDivElement | null>(null);
  const ulineRef = useRef<SVGPathElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const wishElRef = useRef<HTMLDivElement | null>(null);

  const wLine1Ref = useRef<HTMLSpanElement | null>(null);
  const wLine2Ref = useRef<HTMLSpanElement | null>(null);

  // Audio tone generator
  const playChime = (frequency = 528, type: OscillatorType = "sine", duration = 1.2) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  };

  // Master Engine Implementation
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let treeRAF = 0;
    let played = false;
    let drawing = false;
    let startPX = 0;
    let startPY = 0;
    let startDraw = 0;
    let curDraw = 0;
    let maxDraw = 120;
    let pullUX = 0;
    let pullUY = 1;
    let arrowBaseX = 0;
    let arrowBaseY = 0;
    let svgScale = 1;
    const REST_NOCK = 96;
    const nockProxy = { val: REST_NOCK };
    let beatTL: gsap.core.Timeline | null = null;
    let filmTL: gsap.core.Timeline | null = null;

    const BLOSSOM = [
      { c0: "#ffe1ec", c1: "#ff80aa" },
      { c0: "#ffd0e0", c1: "#f4577f" },
      { c0: "#ffc4d2", c1: "#e23b67" },
      { c0: "#ffd9c4", c1: "#ff8a5b" },
      { c0: "#ffeec2", c1: "#f6b13e" },
      { c0: "#ffd2e6", c1: "#e84d9a" },
    ];

    const T = {
      trunkStart: 0.1,
      branchSpan: 1.8,
      bloomT0: 1.25,
      bloomSpan: 2.0,
      petalT0: 2.45,
      noteStart: 0.45,
      done: 4.6,
    };

    const SS = 168;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(a: T[]): T => a[(Math.random() * a.length) | 0];
    const clampVal = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const lerpVal = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    function shade(hex: string, amt: number) {
      const n = parseInt(hex.slice(1), 16);
      const r = clampVal((n >> 16) + amt, 0, 255);
      const g = clampVal(((n >> 8) & 255) + amt, 0, 255);
      const b = clampVal((n & 255) + amt, 0, 255);
      return `rgb(${r | 0},${g | 0},${b | 0})`;
    }

    function heartShape(c: CanvasRenderingContext2D, x: number, top: number, w: number, h: number) {
      c.beginPath();
      c.moveTo(x, top + h * 0.28);
      c.bezierCurveTo(x, top, x - w * 0.5, top, x - w * 0.5, top + h * 0.28);
      c.bezierCurveTo(x - w * 0.5, top + h * 0.6, x - w * 0.16, top + h * 0.8, x, top + h);
      c.bezierCurveTo(x + w * 0.16, top + h * 0.8, x + w * 0.5, top + h * 0.6, x + w * 0.5, top + h * 0.28);
      c.bezierCurveTo(x + w * 0.5, top, x, top, x, top + h * 0.28);
      c.closePath();
    }

    function makeBlossom({ c0, c1 }: { c0: string; c1: string }, soft: boolean) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = SS;
      const c = cv.getContext("2d");
      if (!c) return cv;
      const w = SS * 0.62;
      const h = SS * 0.58;
      const x = SS / 2;
      const top = SS * 0.17;

      c.save();
      c.shadowColor = "rgba(150,38,72,0.32)";
      c.shadowBlur = SS * 0.085;
      c.shadowOffsetY = SS * 0.05;
      c.fillStyle = c1;
      heartShape(c, x, top, w, h);
      c.fill();
      c.restore();

      const g = c.createRadialGradient(x - w * 0.2, top + h * 0.2, h * 0.04, x, top + h * 0.42, h * 0.92);
      g.addColorStop(0, c0);
      g.addColorStop(0.55, c1);
      g.addColorStop(1, shade(c1, -26));
      heartShape(c, x, top, w, h);
      c.fillStyle = g;
      c.fill();

      c.save();
      heartShape(c, x, top, w, h);
      c.clip();
      const g2 = c.createLinearGradient(0, top, 0, top + h);
      g2.addColorStop(0, "rgba(255,255,255,0)");
      g2.addColorStop(0.65, "rgba(110,16,46,0)");
      g2.addColorStop(1, "rgba(110,16,46,0.26)");
      c.fillStyle = g2;
      c.fillRect(0, 0, SS, SS);
      c.globalAlpha = 0.55;
      c.fillStyle = "#ffffff";
      c.beginPath();
      c.ellipse(x - w * 0.15, top + h * 0.24, w * 0.17, h * 0.11, -0.5, 0, Math.PI * 2);
      c.fill();
      c.restore();

      if (!soft) return cv;

      const cv2 = document.createElement("canvas");
      cv2.width = cv2.height = SS;
      const c2 = cv2.getContext("2d");
      if (!c2) return cv;
      c2.filter = "blur(2.6px)";
      c2.drawImage(cv, 0, 0);
      c2.filter = "none";
      c2.globalCompositeOperation = "source-atop";
      c2.globalAlpha = 0.42;
      c2.fillStyle = "#fff3ea";
      c2.fillRect(0, 0, SS, SS);
      return cv2;
    }

    function makeBokeh(rgb: string) {
      const S = 128;
      const cv = document.createElement("canvas");
      cv.width = cv.height = S;
      const c = cv.getContext("2d");
      if (!c) return cv;
      const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, `rgba(${rgb},0.9)`);
      g.addColorStop(0.45, `rgba(${rgb},0.22)`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      c.fillStyle = g;
      c.fillRect(0, 0, S, S);
      return cv;
    }

    function makeSparkle() {
      const S = 64;
      const cv = document.createElement("canvas");
      cv.width = cv.height = S;
      const c = cv.getContext("2d");
      if (!c) return cv;
      const m = S / 2;
      const g = c.createRadialGradient(m, m, 0, m, m, m);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.25, "rgba(255,236,200,0.5)");
      g.addColorStop(1, "rgba(255,236,200,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(m, m, m, 0, 6.2832);
      c.fill();
      c.fillStyle = "rgba(255,255,255,0.95)";
      c.translate(m, m);
      for (let k = 0; k < 2; k++) {
        c.beginPath();
        c.moveTo(0, -m);
        c.quadraticCurveTo(0, 0, m, 0);
        c.quadraticCurveTo(0, 0, 0, m);
        c.quadraticCurveTo(0, 0, -m, 0);
        c.quadraticCurveTo(0, 0, 0, -m);
        c.fill();
        c.rotate(Math.PI / 4);
        c.scale(0.5, 0.5);
      }
      return cv;
    }

    let SPR: { crisp: HTMLCanvasElement[]; soft: HTMLCanvasElement[] } = { crisp: [], soft: [] };
    let BOKEH: HTMLCanvasElement[] = [];
    let SPARKLE: HTMLCanvasElement | null = null;

    function buildSprites() {
      SPR = {
        crisp: BLOSSOM.map((b) => makeBlossom(b, false)),
        soft: BLOSSOM.map((b) => makeBlossom(b, true)),
      };
      BOKEH = [makeBokeh("255,224,188"), makeBokeh("255,196,214"), makeBokeh("255,238,210")];
      SPARKLE = makeSparkle();
    }

    function drawSprite(sprite: HTMLCanvasElement, x: number, y: number, size: number, rot: number, alpha: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      if (rot) ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, -size * 0.5, -size * 0.47, size, size);
      ctx.restore();
    }

    let heartPoly: [number, number][] = [];
    function buildHeartPoly() {
      const raw: [number, number][] = [];
      let minX = 1e9,
        maxX = -1e9,
        minY = 1e9,
        maxY = -1e9;
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        raw.push([x, y]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
      const midX = (minX + maxX) / 2;
      const midY = (minY + maxY) / 2;
      const hw = (maxX - minX) / 2;
      const hh = (maxY - minY) / 2;
      heartPoly = raw.map(([x, y]) => [(x - midX) / hw, (y - midY) / hh]);
    }

    function pointInPoly(x: number, y: number) {
      let inside = false;
      const p = heartPoly;
      for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
        const xi = p[i][0],
          yi = p[i][1],
          xj = p[j][0],
          yj = p[j][1];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    }

    let W = 0,
      H = 0,
      dpr = 1;
    let cx = 0,
      cy = 0,
      rx = 0,
      ry = 0,
      groundY = 0;
    interface Branch {
      x1: number;
      y1: number;
      cx: number;
      cy: number;
      x2: number;
      y2: number;
      w0: number;
      w1: number;
      t0: number;
      dur: number;
      depth: number;
      grad: CanvasGradient;
    }
    interface BlossomHeart {
      x: number;
      y: number;
      idx: number;
      soft: boolean;
      box: number;
      rot: number;
      sway: number;
      t0: number;
    }
    interface Petal {
      x: number;
      y: number;
      vy: number;
      vx: number;
      sway: number;
      phase: number;
      box: number;
      idx: number;
      rot: number;
      vrot: number;
      age: number;
      land: number;
    }
    interface RestedPetal {
      x: number;
      y: number;
      box: number;
      idx: number;
      rot: number;
      a: number;
    }
    interface Orb {
      x: number;
      y: number;
      r: number;
      vy: number;
      drift: number;
      phase: number;
      alpha: number;
      sprite: HTMLCanvasElement;
    }
    interface Floater {
      x: number;
      y: number;
      depth: number;
      idx: number;
      box: number;
      vy: number;
      sway: number;
      phase: number;
      rot: number;
      vrot: number;
      baseA: number;
      soft: boolean;
    }
    interface Twinkle {
      x: number;
      y: number;
      size: number;
      age: number;
      life: number;
      rot: number;
    }

    let branches: Branch[] = [];
    let hearts: BlossomHeart[] = [];
    let petals: Petal[] = [];
    let rested: RestedPetal[] = [];
    let orbs: Orb[] = [];
    let floaters: Floater[] = [];
    let twinkles: Twinkle[] = [];
    let bgGrad: CanvasGradient | null = null;
    let glowGrad: CanvasGradient | null = null;
    let groundGrad: CanvasGradient | null = null;

    const quad = (b: Branch, t: number) => {
      const m = 1 - t,
        a = m * m,
        k = 2 * m * t,
        d = t * t;
      return { x: a * b.x1 + k * b.cx + d * b.x2, y: a * b.y1 + k * b.cy + d * b.y2 };
    };

    function barkGrad(x1: number, y1: number, x2: number, y2: number, depth: number) {
      if (!ctx) return "" as unknown as CanvasGradient;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `hsl(348 26% ${26 + depth * 3}%)`);
      g.addColorStop(1, `hsl(346 24% ${40 + depth * 5}%)`);
      return g;
    }

    function buildScene() {
      branches = [];
      hearts = [];
      petals = [];
      rested = [];
      twinkles = [];
      orbs = [];
      floaters = [];
      buildHeartPoly();

      const wide = W / H > 1.2;
      cx = W * (wide ? 0.57 : 0.5);
      cy = H * (wide ? 0.37 : 0.38);
      ry = Math.min(H * (wide ? 0.33 : 0.33), W * 0.34);
      rx = ry * 1.16;
      groundY = H * 0.93;

      if (!ctx) return;
      bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, "#fff3e9");
      bgGrad.addColorStop(0.46, "#ffe7d6");
      bgGrad.addColorStop(0.78, "#fcd9c4");
      bgGrad.addColorStop(1, "#f3c4b5");
      glowGrad = ctx.createRadialGradient(cx, cy, ry * 0.1, cx, cy, ry * 1.55);
      glowGrad.addColorStop(0, "rgba(255,219,170,0.6)");
      glowGrad.addColorStop(0.5, "rgba(255,170,150,0.2)");
      glowGrad.addColorStop(1, "rgba(255,170,150,0)");
      groundGrad = ctx.createRadialGradient(cx, H * 1.02, ry * 0.2, cx, H * 1.02, ry * 1.6);
      groundGrad.addColorStop(0, "rgba(255,205,165,0.5)");
      groundGrad.addColorStop(1, "rgba(255,205,165,0)");

      for (let i = 0; i < 11; i++) {
        orbs.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(W * 0.05, W * 0.17),
          vy: rand(-6, -16),
          drift: rand(-0.3, 0.3),
          phase: rand(0, 6.28),
          alpha: rand(0.05, 0.13),
          sprite: pick(BOKEH),
        });
      }

      const FN = wide ? 18 : 15;
      for (let i = 0; i < FN; i++) {
        const depth = Math.random();
        floaters.push({
          x: rand(0, W),
          y: rand(-H * 0.1, H * 1.1),
          depth,
          idx: (Math.random() * BLOSSOM.length) | 0,
          box: lerpVal(Math.min(W, H) * 0.025, Math.min(W, H) * 0.075, depth),
          vy: lerpVal(7, 20, depth),
          sway: rand(8, 22),
          phase: rand(0, 6.28),
          rot: rand(-0.4, 0.4),
          vrot: rand(-0.5, 0.5),
          baseA: lerpVal(0.16, 0.5, depth),
          soft: depth < 0.45,
        });
      }

      const baseX = cx;
      const baseY = H * 1.0;
      const trunkTopY = cy + ry * 0.62;
      const trunkW = Math.max(9, W * 0.024);
      const limbLen = ry * 0.6;
      const insidePx = (x: number, y: number, m = 0.9) => pointInPoly((x - cx) / (rx * m), (cy - y) / (ry * m));

      function addBranch(x: number, y: number, ang: number, len: number, w0: number, depth: number, t0: number) {
        let ex = x + Math.cos(ang) * len,
          ey = y + Math.sin(ang) * len,
          clipped = false;
        if (!insidePx(ex, ey)) {
          let lo = 0,
            hi = 1;
          for (let k = 0; k < 12; k++) {
            const mid = (lo + hi) / 2;
            insidePx(x + Math.cos(ang) * len * mid, y + Math.sin(ang) * len * mid) ? (lo = mid) : (hi = mid);
          }
          ex = x + Math.cos(ang) * len * lo;
          ey = y + Math.sin(ang) * len * lo;
          clipped = true;
        }
        const mx = (x + ex) / 2,
          my = (y + ey) / 2,
          perp = ang + Math.PI / 2,
          bend = rand(-1, 1) * len * 0.12,
          w1 = w0 * 0.66;
        branches.push({
          x1: x,
          y1: y,
          cx: mx + Math.cos(perp) * bend,
          cy: my + Math.sin(perp) * bend,
          x2: ex,
          y2: ey,
          w0,
          w1,
          t0,
          dur: Math.max(0.14, 0.32 - depth * 0.03),
          depth,
          grad: barkGrad(x, y, ex, ey, depth),
        });
        return { ex, ey, w1, clipped };
      }

      function grow(x: number, y: number, ang: number, len: number, w: number, depth: number, t0: number) {
        const r = addBranch(x, y, ang, len, w, depth, t0);
        if (r.clipped || depth >= 6 || len < ry * 0.06) return;
        const childT0 = t0 + (0.32 - depth * 0.03) * 0.6;
        const n = Math.random() < 0.55 ? 2 : 3;
        for (let i = 0; i < n; i++) {
          const spread = 0.6 * (i - (n - 1) / 2) + rand(-0.22, 0.22),
            lift = -0.06 + rand(-0.05, 0.05);
          grow(r.ex, r.ey, ang + spread + lift, len * rand(0.74, 0.84), r.w1, depth + 1, childT0 + i * 0.03);
        }
      }

      addBranch(baseX, baseY, -Math.PI / 2, baseY - trunkTopY, trunkW, 0, T.trunkStart);
      branches[0].dur = 0.55;
      const limbT0 = T.trunkStart + 0.36,
        L = 3;
      for (let i = 0; i < L; i++) {
        const ang = -Math.PI / 2 + 0.62 * (i - (L - 1) / 2) + rand(-0.12, 0.12);
        grow(baseX, trunkTopY, ang, limbLen, trunkW * 0.7, 1, limbT0 + i * 0.05);
      }
      const maxT0 = branches.reduce((m, b) => Math.max(m, b.t0 + b.dur), 0);
      const sc = (T.branchSpan - T.trunkStart) / (maxT0 - T.trunkStart);
      for (const b of branches) b.t0 = T.trunkStart + (b.t0 - T.trunkStart) * sc;

      const COUNT = Math.round(clampVal((rx * ry) / 56, 250, 440));
      const baseBox = clampVal(Math.min(W, H) * 0.115, 30, 74);
      let guard = 0;
      while (hearts.length < COUNT && guard < COUNT * 50) {
        guard++;
        const u = rand(-1.06, 1.06),
          v = rand(-1.06, 1.06);
        if (!pointInPoly(u, v)) continue;
        const x = cx + u * rx,
          y = cy - v * ry;
        const d = clamp01(Math.hypot(u, v + 1) / 2.4);
        const t0 = T.bloomT0 + d * (T.bloomSpan * 0.82) + rand(0, T.bloomSpan * 0.18);
        const soft = Math.random() < 0.42;
        hearts.push({
          x,
          y,
          idx: (Math.random() * BLOSSOM.length) | 0,
          soft,
          box: baseBox * (soft ? rand(0.6, 0.85) : rand(0.78, 1.12)),
          rot: rand(-0.55, 0.55),
          sway: rand(0, 6.28),
          t0,
        });
      }
      hearts.sort((a, b) => (a.soft === b.soft ? a.y - b.y : a.soft ? -1 : 1));
    }

    function drawBackground() {
      if (!ctx || !bgGrad || !groundGrad) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    function drawGodRays(t: number, intensity: number) {
      if (!ctx || intensity <= 0) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const ox = cx,
        oy = cy - ry * 0.35,
        R = Math.hypot(W, H) * 1.1;
      const rays = 9,
        sweep = Math.sin(t * 0.07) * 0.18;
      for (let i = 0; i < rays; i++) {
        const a = -Math.PI / 2 + sweep + (i - (rays - 1) / 2) * 0.2;
        const hw = 0.035 + 0.02 * (0.5 + 0.5 * Math.sin(t * 0.5 + i * 1.7));
        const a1 = a - hw,
          a2 = a + hw;
        const g = ctx.createLinearGradient(ox, oy, ox + Math.cos(a) * R, oy + Math.sin(a) * R);
        g.addColorStop(0, `rgba(255,232,190,${0.1 * intensity})`);
        g.addColorStop(0.5, `rgba(255,214,170,${0.05 * intensity})`);
        g.addColorStop(1, "rgba(255,214,170,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox + Math.cos(a1) * R, oy + Math.sin(a1) * R);
        ctx.lineTo(ox + Math.cos(a2) * R, oy + Math.sin(a2) * R);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    function drawGlow(t: number) {
      if (!ctx || !glowGrad) return;
      const gi = clamp01((t - T.bloomT0) / (T.bloomSpan * 0.9));
      if (gi <= 0) return;
      ctx.save();
      ctx.globalAlpha = gi;
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    function drawBokeh(t: number, dt: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        o.y += o.vy * dt;
        o.x += Math.sin(t * 0.3 + o.phase) * o.drift;
        if (o.y < -o.r) {
          o.y = H + o.r;
          o.x = rand(0, W);
        }
        ctx.globalAlpha = o.alpha;
        ctx.drawImage(o.sprite, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
      }
      ctx.restore();
    }

    function drawFloaters(t: number, dt: number, front: boolean) {
      const appear = clamp01((t - 0.2) / 1.4);
      if (appear <= 0) return;
      for (const f of floaters) {
        if (f.depth >= 0.6 !== front) continue;
        f.y -= f.vy * dt;
        f.x += Math.sin(t * 0.5 + f.phase) * f.sway * dt;
        f.rot += f.vrot * dt;
        if (f.y < -f.box) {
          f.y = H + f.box;
          f.x = rand(0, W);
        }
        drawSprite((f.soft ? SPR.soft : SPR.crisp)[f.idx], f.x, f.y, f.box, f.rot, f.baseA * appear);
      }
    }

    function drawBranches(t: number) {
      if (!ctx) return;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const b of branches) {
        const f = clamp01((t - b.t0) / b.dur);
        if (f <= 0) continue;
        const e = easeOutCubic(f);
        ctx.strokeStyle = b.grad;
        const steps = 12,
          last = Math.max(1, Math.ceil(steps * e));
        let prev = quad(b, 0);
        for (let i = 1; i <= last; i++) {
          const tt = Math.min(e, i / steps),
            p = quad(b, tt);
          ctx.lineWidth = lerpVal(b.w0, b.w1, tt);
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          prev = p;
        }
      }
    }

    function drawHearts(t: number) {
      const breathe = 1 + Math.sin(t * 0.8) * 0.012;
      for (const h of hearts) {
        const p = clamp01((t - h.t0) / 0.6);
        if (p <= 0) continue;
        const scale = Math.max(0, easeOutBack(p));
        let alpha = clamp01(p * 1.7);
        if (h.soft) alpha *= 0.8;
        const settled = clamp01((t - h.t0 - 0.6) / 0.7);
        const sway = settled * Math.sin(t * 1.5 + h.sway) * (h.box * 0.05);
        const rise = (1 - easeOutCubic(p)) * h.box * 0.45;
        const hx = cx + (h.x - cx) * breathe + sway;
        const hy = cy + (h.y - cy) * breathe - rise;
        drawSprite((h.soft ? SPR.soft : SPR.crisp)[h.idx], hx, hy, h.box * scale, h.rot + sway * 0.012, alpha);
      }
    }

    function updateTwinkles(t: number, dt: number) {
      if (!ctx || !SPARKLE) return;
      const active = t > T.bloomT0 + T.bloomSpan * 0.45;
      if (active && twinkles.length < 9 && Math.random() < 0.5) {
        const h = hearts[(Math.random() * hearts.length) | 0];
        if (h)
          twinkles.push({
            x: h.x,
            y: h.y,
            size: rand(0.6, 1.3) * (Math.min(W, H) * 0.05),
            age: 0,
            life: rand(0.7, 1.2),
            rot: rand(0, 6.28),
          });
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = twinkles.length - 1; i >= 0; i--) {
        const s = twinkles[i];
        s.age += dt;
        const k = s.age / s.life;
        if (k >= 1) {
          twinkles.splice(i, 1);
          continue;
        }
        const a = Math.sin(k * Math.PI);
        drawSprite(SPARKLE, s.x, s.y, s.size * (0.6 + 0.4 * a), s.rot + k * 1.2, a);
      }
      ctx.restore();
    }

    function spawnPetal() {
      const h = hearts[(Math.random() * hearts.length) | 0];
      if (!h) return;
      petals.push({
        x: h.x + rand(-8, 8),
        y: h.y + rand(-8, 8),
        vy: rand(14, 30),
        vx: rand(-8, 8),
        sway: rand(0.6, 1.4),
        phase: rand(0, 6.28),
        box: h.box * rand(0.34, 0.6),
        idx: h.idx,
        rot: rand(0, 6.28),
        vrot: rand(-1.4, 1.4),
        age: 0,
        land: groundY + rand(-6, H * 0.05),
      });
    }

    function drawPetals(t: number, dt: number) {
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.age += dt;
        p.vy += 8 * dt;
        p.x += (p.vx + Math.sin(t * p.sway + p.phase) * 16) * dt;
        p.y += p.vy * dt;
        p.rot += p.vrot * dt;
        if (p.y >= p.land) {
          rested.push({
            x: clampVal(p.x, 6, W - 6),
            y: p.land,
            box: p.box,
            idx: p.idx,
            rot: p.rot,
            a: rand(0.7, 0.95),
          });
          if (rested.length > 90) rested.shift();
          petals.splice(i, 1);
          continue;
        }
        const a = p.age < 0.3 ? p.age / 0.3 : 1;
        drawSprite(SPR.crisp[p.idx], p.x, p.y, p.box, p.rot, a);
      }
    }

    function drawRested() {
      for (const r of rested) drawSprite(SPR.crisp[r.idx], r.x, r.y, r.box, r.rot, r.a);
    }

    let treeStartT = 0,
      treeLastT = 0,
      lastPetal = 0;

    function treeFrame(now: number) {
      if (!treeStartT) {
        treeStartT = now;
        treeLastT = now;
      }
      const t = (now - treeStartT) / 1000;
      const dt = Math.min(0.05, (now - treeLastT) / 1000);
      treeLastT = now;

      const rays = clamp01((t - T.bloomT0) / T.bloomSpan);

      drawBackground();
      drawGodRays(t, rays);
      drawGlow(t);
      drawBokeh(t, dt);
      drawFloaters(t, dt, false);
      drawBranches(t);
      drawHearts(t);
      updateTwinkles(t, dt);
      if (t > T.petalT0 && now - lastPetal > 150) {
        spawnPetal();
        spawnPetal();
        lastPetal = now;
      }
      drawPetals(t, dt);
      drawRested();
      drawFloaters(t, dt, true);

      if (wishElRef.current) {
        wishElRef.current.classList.toggle("is-in", t >= T.noteStart);
      }

      if (t >= T.done && !filmSettled) {
        setFilmSettled(true);
      }

      treeRAF = requestAnimationFrame(treeFrame);
    }

    function treeStart() {
      treeStartT = 0;
      treeLastT = 0;
      lastPetal = 0;
      buildScene();
      if (!treeRAF) treeRAF = requestAnimationFrame(treeFrame);
    }

    function treeStop() {
      if (treeRAF) {
        cancelAnimationFrame(treeRAF);
        treeRAF = 0;
      }
      if (ctx) ctx.clearRect(0, 0, W, H);
    }

    // Split words for 3D kinetic typography
    function splitWordIntoSpans(el: HTMLElement) {
      const chars = [...el.textContent!];
      el.textContent = "";
      return chars.map((c) => {
        const s = document.createElement("span");
        s.className = "hl__ch";
        s.textContent = c === " " ? " " : c;
        el.appendChild(s);
        return s;
      });
    }

    let kChars: HTMLSpanElement[] = [];
    let line1Chars: HTMLSpanElement[] = [];
    let line2Chars: HTMLSpanElement[] = [];

    if (wLine1Ref.current && wLine2Ref.current) {
      line1Chars = splitWordIntoSpans(wLine1Ref.current);
      line2Chars = splitWordIntoSpans(wLine2Ref.current);
      kChars = [...line1Chars, ...line2Chars];
    }

    function buildMotes() {
      if (!motesRef.current) return;
      motesRef.current.innerHTML = "";
      for (let i = 0; i < 12; i++) {
        const m = document.createElement("span");
        m.className = "mote";
        const s = rand(4, 12);
        m.style.width = m.style.height = `${s}px`;
        m.style.left = `${rand(4, 96)}%`;
        m.style.top = `${rand(10, 96)}%`;
        motesRef.current.appendChild(m);
        gsap.set(m, { opacity: rand(0.25, 0.7) });
        gsap.to(m, {
          y: -rand(40, 140),
          x: rand(-30, 30),
          duration: rand(7, 14),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: -rand(0, 8),
        });
        gsap.to(m, { opacity: rand(0.1, 0.5), duration: rand(2.5, 5), repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    }

    function applyNock() {
      const y = nockProxy.val;
      strLRef.current?.setAttribute("y2", String(y));
      strRRef.current?.setAttribute("y2", String(y));
      servingRef.current?.setAttribute("cy", String(y));
    }

    function refreshRig() {
      if (!archeryRef.current || !bowRef.current || !servingRef.current || !arrowRef.current) return;
      const gripX = W * 0.24,
        gripY = H * 0.76;
      const heartX = W * 0.5,
        heartY = H * 0.33;
      const aimRad = Math.atan2(heartX - gripX, gripY - heartY);
      pullUX = -Math.sin(aimRad);
      pullUY = Math.cos(aimRad);

      nockProxy.val = REST_NOCK;
      applyNock();
      gsap.set(archeryRef.current, { rotation: 0, scale: 1, x: 0, y: 0 });
      archeryRef.current.style.left = "0px";
      archeryRef.current.style.top = "0px";
      gsap.set(arrowRef.current, { x: 0, y: 0 });

      const aR = archeryRef.current.getBoundingClientRect();
      const bR = bowRef.current.getBoundingClientRect();
      const sR = servingRef.current.getBoundingClientRect();
      const rR = arrowRef.current.getBoundingClientRect();
      svgScale = bR.width / 460;
      const gripLX = bR.left - aR.left + 0.5 * bR.width;
      const gripLY = bR.top - aR.top + (240 / 300) * bR.height;
      const nockLX = sR.left - aR.left + 0.5 * sR.width;
      const nockLY = sR.top - aR.top + 0.5 * sR.height;
      arrowBaseX = nockLX - (rR.left - aR.left + 0.5 * rR.width);
      arrowBaseY = nockLY - (rR.top - aR.top + (205 / 220) * rR.height);

      archeryRef.current.style.left = gripX - gripLX + "px";
      archeryRef.current.style.top = gripY - gripLY + "px";
      gsap.set(archeryRef.current, {
        transformOrigin: `${gripLX}px ${gripLY}px`,
        rotation: (aimRad * 180) / Math.PI,
      });
      gsap.set(arrowRef.current, { x: arrowBaseX, y: arrowBaseY });
      maxDraw = Math.min(bR.height * 0.72, H * 0.16, 132);
      curDraw = 0;
    }

    function setDraw(d: number) {
      curDraw = clampVal(d, 0, maxDraw);
      if (arrowRef.current) gsap.set(arrowRef.current, { x: arrowBaseX, y: arrowBaseY + curDraw });
      nockProxy.val = REST_NOCK + curDraw / svgScale;
      applyNock();
      if (aimRef.current) gsap.set(aimRef.current, { opacity: 0.55 * (curDraw / maxDraw) });
    }

    function startBeat() {
      if (!targetHeartRef.current || !targetRef.current) return;
      const heartGlow = targetRef.current.querySelector(".heart__glow");
      gsap.set(targetHeartRef.current, { scale: 1 });
      if (heartGlow) gsap.set(heartGlow, { scale: 1, opacity: 0.7 });
      beatTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      beatTL
        .to(targetHeartRef.current, { scale: 1.07, duration: 0.13, ease: "power2.out" }, 0)
        .to(heartGlow, { scale: 1.15, opacity: 0.9, duration: 0.13, ease: "power2.out" }, 0)
        .to(targetHeartRef.current, { scale: 1.0, duration: 0.2, ease: "power2.in" }, 0.13)
        .to(targetHeartRef.current, { scale: 1.05, duration: 0.12, ease: "power2.out" }, 0.3)
        .to(targetHeartRef.current, { scale: 1.0, duration: 0.5, ease: "power2.inOut" }, 0.42)
        .to(heartGlow, { scale: 1.0, opacity: 0.7, duration: 0.7, ease: "power2.inOut" }, 0.3);
    }

    function stopBeat() {
      if (beatTL) {
        beatTL.kill();
        beatTL = null;
      }
      if (targetHeartRef.current) gsap.set(targetHeartRef.current, { scale: 1 });
    }

    function miniHeartSVG(fill: string) {
      return `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 20C5.5 15 1.5 11.4 1.5 6.9 1.5 3.6 4 1.5 7 1.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.5 2.1 5.5 5.4C23.5 11.4 19.5 15 12 20Z" fill="${fill}"/></svg>`;
    }

    function burstHearts() {
      if (!targetRef.current || !heroRef.current) return;
      playChime(660, "triangle", 0.8);
      const r = targetRef.current.getBoundingClientRect();
      const hr = heroRef.current.getBoundingClientRect();
      const ox = r.left - hr.left + r.width / 2;
      const oy = r.top - hr.top + r.height * 0.42;
      const cols = ["#ff6f97", "#ffb14e", "#ff8fae", "#ffd36a", "#e23b67"];
      const frag = document.createDocumentFragment();
      const nodes: { el: HTMLElement; heart: boolean }[] = [];
      for (let i = 0; i < 14; i++) {
        const heart = i < 9;
        const el = document.createElement("span");
        el.className = "burst";
        const s = heart ? rand(12, 22) : rand(4, 8);
        el.style.cssText = `position:absolute;left:${ox}px;top:${oy}px;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;pointer-events:none;z-index:4;`;
        if (heart) el.innerHTML = miniHeartSVG(pick(cols));
        else {
          el.style.borderRadius = "50%";
          el.style.background = "radial-gradient(circle,#fff,rgba(255,210,150,0) 70%)";
        }
        frag.appendChild(el);
        nodes.push({ el, heart });
      }
      heroRef.current.appendChild(frag);
      nodes.forEach(({ el, heart }) => {
        const ang = rand(-Math.PI, 0);
        const dist = rand(heart ? 70 : 40, heart ? 190 : 120);
        gsap.to(el, {
          x: Math.cos(ang) * dist,
          y: Math.sin(ang) * dist - rand(10, 50),
          rotation: rand(-120, 120),
          scale: heart ? rand(0.7, 1.2) : rand(0.4, 1),
          duration: rand(0.7, 1.15),
          ease: "power2.out",
        });
        gsap.to(el, {
          opacity: 0,
          duration: 0.5,
          delay: rand(0.35, 0.6),
          ease: "power1.in",
          onComplete: () => el.remove(),
        });
      });
    }

    function shotGeom() {
      if (!tipRef.current || !targetRef.current) {
        return {
          arrowStartY: arrowBaseY + curDraw,
          arrowFlyY: arrowBaseY + curDraw - 400,
          drawnNock: REST_NOCK + curDraw / svgScale,
          fallPx: 120,
          fx: 0,
          fy: 0,
          floodScale: 15,
          bloomScale: 20,
        };
      }
      const tipR = tipRef.current.getBoundingClientRect();
      const tRect = targetRef.current.getBoundingClientRect();
      const tipX = tipR.left + tipR.width / 2,
        tipY = tipR.top + tipR.height / 2;
      const tcx = tRect.left + tRect.width / 2,
        tcy = tRect.top + tRect.height / 2;
      const flightDist = Math.hypot(tcx - tipX, tcy - tipY);
      const fallPx = Math.min(H * 0.26, H - tcy - tRect.height * 0.4);
      const impactX = tcx,
        impactY = tcy + fallPx;
      const distC = Math.hypot(Math.max(impactX, W - impactX), Math.max(impactY, H - impactY));
      const reach = Math.hypot(W / 2, H / 2);
      return {
        arrowStartY: arrowBaseY + curDraw,
        arrowFlyY: arrowBaseY + curDraw - flightDist,
        drawnNock: REST_NOCK + curDraw / svgScale,
        fallPx,
        fx: impactX - W / 2,
        fy: impactY - H / 2,
        floodScale: (distC * 1.12) / 70,
        bloomScale: (reach * 1.2) / 30,
      };
    }

    function buildFilm(m: ReturnType<typeof shotGeom>) {
      const t = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (fieldRef.current) gsap.set(fieldRef.current, { autoAlpha: 0 });
          treeStart();
          if (bloomRef.current) gsap.to(bloomRef.current, { autoAlpha: 0, duration: 1.15, ease: "power2.out" });
        },
      });

      // reset
      t.set(targetRef.current, { y: 0, scaleX: 1, scaleY: 1, opacity: 1 })
        .set(arrowRef.current, { opacity: 1, x: arrowBaseX, y: m.arrowStartY, scaleY: 1 })
        .set([floodRef.current, bloomRef.current], { autoAlpha: 0, scale: 0.001, x: 0, y: 0 })
        .set(floodRef.current, { x: m.fx, y: m.fy })
        .set(fieldRef.current, { autoAlpha: 0 })
        .set(".blob", { opacity: 0 })
        .set(cameraRef.current, { scale: 1, yPercent: 0 })
        .set(fgridRef.current, { xPercent: 0, yPercent: 0 })
        .set(barTopRef.current, { yPercent: -100 })
        .set(barBotRef.current, { yPercent: 100 })
        .set(kEyebrowRef.current, { opacity: 0, y: 12 })
        .set(kSubRef.current, { opacity: 0, y: 12 })
        .set(kChars, { transformPerspective: 620, transformOrigin: "50% 100%", yPercent: 135, rotationX: -82 });

      // arrow release
      t.fromTo(
        nockProxy,
        { val: m.drawnNock },
        { val: REST_NOCK, duration: 0.5, ease: "elastic.out(1,0.34)", onUpdate: applyNock },
        0
      )
        .to(arrowRef.current, { y: m.arrowFlyY, duration: 0.26, ease: "power2.in" }, 0)
        .to(arrowRef.current, { scaleY: 1.16, duration: 0.14, ease: "power2.in" }, 0)
        .to(arrowRef.current, { scaleY: 1.0, duration: 0.1, ease: "power1.out" }, 0.16)
        .to(aimRef.current, { opacity: 0, duration: 0.18 }, 0)
        .to([eyebrowRef.current, hintRef.current], { opacity: 0, duration: 0.2, ease: "power1.out" }, 0);

      // arrow impact
      t.add(burstHearts, 0.26)
        .to(targetRef.current, { x: 7, y: -9, duration: 0.06, ease: "power2.out" }, 0.26)
        .to(targetRef.current, { x: 0, y: 0, duration: 0.32, ease: "power2.out" }, 0.32)
        .to(targetRef.current, { scale: 1.14, duration: 0.06, ease: "power2.out" }, 0.26)
        .to(targetRef.current, { scale: 1.0, duration: 0.26, ease: "power2.inOut" }, 0.32)
        .to(arrowRef.current, { rotation: "+=4", duration: 0.05, yoyo: true, repeat: 4, ease: "sine.inOut" }, 0.27)
        .set(arrowRef.current, { rotation: 0 }, 0.52)
        .to(arrowRef.current, { opacity: 0, duration: 0.16, ease: "power1.out" }, 0.56);

      // fall & burst
      t.to(targetRef.current, { y: m.fallPx, scaleX: 0.84, scaleY: 1.3, duration: 0.34, ease: "power1.in" }, 0.64)
        .to(targetRef.current, { scaleX: 1.4, scaleY: 0.6, duration: 0.07, ease: "power2.out" }, 0.98)
        .set(floodRef.current, { autoAlpha: 1 }, 1.0)
        .fromTo(floodRef.current, { scale: 0.02 }, { scale: m.floodScale, duration: 0.34, ease: "power2.in" }, 1.0)
        .to(targetRef.current, { opacity: 0, duration: 0.12, ease: "power1.out" }, 1.06);

      // reveal field
      t.set(fieldRef.current, { autoAlpha: 1 }, 1.32)
        .set(heroRef.current, { autoAlpha: 0 }, 1.33)
        .to(".blob", { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.34)
        .set(floodRef.current, { autoAlpha: 0 }, 1.36);

      // camera push
      t.fromTo(cameraRef.current, { scale: 1.0, yPercent: 0 }, { scale: 1.07, yPercent: -1.3, duration: 2.6, ease: "none" }, 1.38)
        .fromTo(fgridRef.current, { xPercent: 0, yPercent: 0 }, { xPercent: -1.5, yPercent: -1.0, duration: 2.6, ease: "none" }, 1.38);

      // cinema bars
      t.to(barTopRef.current, { yPercent: 0, duration: 0.6, ease: "power2.out" }, 1.5)
        .to(barBotRef.current, { yPercent: 0, duration: 0.6, ease: "power2.out" }, 1.5);

      // kinetic typography
      t.to(kEyebrowRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 1.54)
        .to(line1Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: "power3.out", stagger: 0.033 }, 1.68)
        .to(line2Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: "power3.out", stagger: 0.033 }, 2.06)
        .to(kSubRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 2.74);

      // bloom handoff
      t.to(barTopRef.current, { yPercent: -100, duration: 0.5, ease: "power2.in" }, 3.32)
        .to(barBotRef.current, { yPercent: 100, duration: 0.5, ease: "power2.in" }, 3.32)
        .set(bloomRef.current, { autoAlpha: 1 }, 3.42)
        .fromTo(bloomRef.current, { scale: 0.02 }, { scale: m.bloomScale, duration: 0.58, ease: "power2.in" }, 3.42);

      return t;
    }

    function fire() {
      if (played) return;
      played = true;
      drawing = false;
      stopBeat();
      playChime(440, "sine", 1.2);
      filmTL = buildFilm(shotGeom());
      filmTL.play(0);
    }

    function springBack() {
      const from = curDraw;
      gsap.to(
        { d: from },
        {
          d: 0,
          duration: 0.55,
          ease: "elastic.out(1,0.4)",
          onUpdate() {
            setDraw(this.targets()[0].d);
          },
        }
      );
    }

    const archeryEl = archeryRef.current;
    if (archeryEl) {
      const onPointerDown = (e: PointerEvent) => {
        if (played) return;
        drawing = true;
        try {
          archeryEl.setPointerCapture(e.pointerId);
        } catch {
          // pointer capture
        }
        startPX = e.clientX;
        startPY = e.clientY;
        startDraw = curDraw;
        e.preventDefault();
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!drawing) return;
        const proj = (e.clientX - startPX) * pullUX + (e.clientY - startPY) * pullUY;
        setDraw(startDraw + proj);
      };

      const onPointerUp = () => {
        if (!drawing) return;
        drawing = false;
        if (curDraw > maxDraw * 0.26) fire();
        else springBack();
      };

      archeryEl.addEventListener("pointerdown", onPointerDown);
      archeryEl.addEventListener("pointermove", onPointerMove);
      archeryEl.addEventListener("pointerup", onPointerUp);
      archeryEl.addEventListener("pointercancel", onPointerUp);
    }

    function enter() {
      if (!heroRef.current || !eyebrowRef.current || !hintRef.current || !targetRef.current || !archeryRef.current)
        return;
      gsap.set(heroRef.current, { autoAlpha: 1 });
      refreshRig();
      setDraw(0);
      gsap.set([eyebrowRef.current, hintRef.current], { opacity: 0, y: 14 });
      gsap.set(targetRef.current, { opacity: 0, y: 10, scaleX: 0.9, scaleY: 0.9 });
      gsap.set(archeryRef.current, { opacity: 0, scale: 0.85 });
      const heartGlow = targetRef.current.querySelector(".heart__glow");
      if (heartGlow) gsap.set(heartGlow, { opacity: 0, scale: 1 });
      if (arrowRef.current) gsap.set(arrowRef.current, { opacity: 1 });

      const tl = gsap.timeline({ onComplete: startBeat });
      tl.to(targetRef.current, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "power3.out" }, 0.1)
        .to(heartGlow, { opacity: 0.7, duration: 0.8, ease: "power2.out" }, 0.2)
        .to(archeryRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0.28)
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4)
        .to(hintRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.7);
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSprites();
      buildScene();
      refreshRig();
      setDraw(0);
    }

    resize();
    buildMotes();
    enter();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      treeStop();
      stopBeat();
      if (filmTL) filmTL.kill();
    };
  }, []);

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;
    const newWish: GuestWish = {
      id: String(Date.now()),
      name: senderName,
      message: senderMessage,
      time: "Just now",
      heartColor: "text-rose-500",
    };
    setWishes([newWish, ...wishes]);
    setSenderName("");
    setSenderMessage("");
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff7f9c", "#ffcf6a", "#a80f43"],
    });
  };

  return (
    <div className="cinematic-root relative min-h-screen bg-[#12060c] text-[#fff6ee] overflow-x-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Floating Audio Toggle in corner */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playChime(880, "sine", 0.5);
          }}
          className="p-2 rounded-full bg-zinc-950/70 border border-rose-950/80 text-rose-300 hover:text-white hover:bg-zinc-900 backdrop-blur-md transition-colors shadow-lg"
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ============================================================
          SECTION 1: THE 4-ACT CINEMATIC FILM (100vh Hero)
          ============================================================ */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <main className="scene">
          {/* Act 4: The Canvas Tree */}
          <canvas ref={canvasRef} id="tree" className="tree" role="img" aria-label="A blossom tree blooms into a heart"></canvas>

          {/* Act 1: The Invitation Hero */}
          <section ref={heroRef} className="hero" id="hero">
            <div className="hero__bg" aria-hidden="true"></div>
            <div ref={motesRef} className="hero__motes" id="motes" aria-hidden="true"></div>

            <p ref={eyebrowRef} className="hero__eyebrow" id="eyebrow">
              a little something, for you
            </p>

            {/* Target Heart */}
            <div className="targetWrap" aria-hidden="true">
              <div ref={targetRef} className="target" id="target">
                <span className="heart__glow" aria-hidden="true"></span>
                <span ref={targetHeartRef} className="target__heart" id="targetHeart">
                  <svg className="heart__svg" viewBox="0 0 100 92" aria-hidden="true">
                    <defs>
                      <radialGradient id="hg" cx="38%" cy="30%" r="80%">
                        <stop offset="0%" stopColor="#ffd9e4" />
                        <stop offset="42%" stopColor="#ff6f97" />
                        <stop offset="82%" stopColor="#d81e57" />
                        <stop offset="100%" stopColor="#9d0f3e" />
                      </radialGradient>
                      <linearGradient id="hsheen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,.85)" />
                        <stop offset="34%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z"
                      fill="url(#hg)"
                    />
                    <path
                      d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z"
                      fill="url(#hsheen)"
                      opacity=".7"
                    />
                    <ellipse cx="34" cy="30" rx="8.5" ry="5.4" fill="#fff" opacity=".72" style={{ mixBlendMode: "screen" }} />
                  </svg>
                </span>
              </div>
            </div>

            {/* Recurve Archery Rig */}
            <div ref={archeryRef} className="archery" id="archery" role="button" tabIndex={0} aria-label="Draw bow and release">
              <div ref={aimRef} className="aim" id="aim" aria-hidden="true"></div>

              <svg ref={bowRef} className="bow" id="bow" viewBox="0 0 460 300" aria-hidden="true">
                <defs>
                  <linearGradient id="limb" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#4a2a1a" />
                    <stop offset=".18" stopColor="#6b3f24" />
                    <stop offset=".5" stopColor="#8a5127" />
                    <stop offset=".82" stopColor="#6b3f24" />
                    <stop offset="1" stopColor="#4a2a1a" />
                  </linearGradient>
                  <linearGradient id="limbHi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(255,214,160,.8)" />
                    <stop offset="1" stopColor="rgba(255,214,160,0)" />
                  </linearGradient>
                  <linearGradient id="grip" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#2a1a10" />
                    <stop offset=".5" stopColor="#5a3822" />
                    <stop offset="1" stopColor="#2a1a10" />
                  </linearGradient>
                </defs>
                <path
                  className="bow__limb"
                  d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96"
                  fill="none"
                  stroke="url(#limb)"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
                <path
                  className="bow__limbHi"
                  d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96"
                  fill="none"
                  stroke="url(#limbHi)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity=".7"
                />
                <path d="M34 96 C 22 82, 26 70, 40 66" fill="none" stroke="url(#limb)" strokeWidth="8" strokeLinecap="round" />
                <path d="M426 96 C 438 82, 434 70, 420 66" fill="none" stroke="url(#limb)" strokeWidth="8" strokeLinecap="round" />
                <rect x="216" y="206" width="28" height="70" rx="9" fill="url(#grip)" />
                <path d="M219 220h22 M219 236h22 M219 252h22" stroke="rgba(0,0,0,.35)" strokeWidth="2" />
                <line ref={strLRef} className="bow__str" id="strL" x1="40" y1="70" x2="230" y2="96" stroke="#9a8068" strokeWidth="2.2" strokeLinecap="round" />
                <line ref={strRRef} className="bow__str" id="strR" x1="420" y1="70" x2="230" y2="96" stroke="#9a8068" strokeWidth="2.2" strokeLinecap="round" />
                <circle ref={servingRef} className="bow__serving" id="serving" cx="230" cy="96" r="4.5" fill="#6f5137" />
              </svg>

              {/* Cupid's Winged Arrow */}
              <svg ref={arrowRef} className="arrow" id="arrow" viewBox="0 0 64 220" aria-hidden="true">
                <defs>
                  <linearGradient id="shaft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#4a2c14" />
                    <stop offset=".5" stopColor="#8a5a2c" />
                    <stop offset="1" stopColor="#3e2410" />
                  </linearGradient>
                  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffe38c" />
                    <stop offset=".45" stopColor="#f4a626" />
                    <stop offset="1" stopColor="#a85f0e" />
                  </linearGradient>
                  <linearGradient id="feath" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff7f9c" />
                    <stop offset=".5" stopColor="#e6396a" />
                    <stop offset="1" stopColor="#a8154a" />
                  </linearGradient>
                  <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffe0c4" />
                  </linearGradient>
                </defs>
                <rect x="29.4" y="30" width="5.2" height="168" rx="2.6" fill="url(#shaft)" />
                <g className="arrow__wings">
                  <path className="wingL" d="M31 30 C 10 16, 2 20, 4 34 C 12 30, 20 32, 31 40 Z" fill="url(#wing)" stroke="rgba(196,132,58,.72)" strokeWidth="1.2" />
                  <path className="wingR" d="M33 30 C 54 16, 62 20, 60 34 C 52 30, 44 32, 33 40 Z" fill="url(#wing)" stroke="rgba(196,132,58,.72)" strokeWidth="1.2" />
                </g>
                <path className="arrow__head" d="M32 12 C 30 7, 22 6.5, 21.5 13 C 21 18, 27 22, 32 27 C 37 22, 43 18, 42.5 13 C 42 6.5, 34 7, 32 12 Z" fill="url(#gold)" stroke="#a5701a" strokeWidth=".8" />
                <ellipse cx="27" cy="13" rx="2.6" ry="1.7" fill="#fff" opacity=".8" style={{ mixBlendMode: "screen" }} />
                <g className="arrow__fletch">
                  <path d="M32 150 C 16 156, 10 178, 15 200 C 24 194, 30 184, 32 176 Z" fill="url(#feath)" />
                  <path d="M32 150 C 48 156, 54 178, 49 200 C 40 194, 34 184, 32 176 Z" fill="url(#feath)" opacity=".92" />
                  <path d="M28 160l4 3 M26 170l6 3 M25 180l7 3" stroke="rgba(130,12,48,.45)" strokeWidth="1" />
                  <path d="M36 160l-4 3 M38 170l-6 3 M39 180l-7 3" stroke="rgba(130,12,48,.45)" strokeWidth="1" />
                </g>
                <path d="M29 200 L32 205 L35 200" fill="none" stroke="#c9a25a" strokeWidth="2" strokeLinecap="round" />
                <circle ref={tipRef} id="tip" cx="32" cy="9" r="0.6" fill="none" />
              </svg>
            </div>

            <p ref={hintRef} className="hero__hint" id="hint">
              pull &amp; release
            </p>
          </section>

          {/* Act 2: Flood */}
          <div ref={floodRef} className="flood" id="flood" aria-hidden="true"></div>

          {/* Act 3: Field & Kinetic Typography */}
          <div ref={fieldRef} className="field" id="field" aria-hidden="true">
            <div className="blob blob--1"></div>
            <div className="blob blob--2"></div>
            <div className="blob blob--3"></div>
            <div ref={fgridRef} className="fgrid" id="fgrid"></div>
            <div className="fvignette"></div>

            <div ref={cameraRef} className="camera" id="camera">
              <p ref={kEyebrowRef} className="kEyebrow" id="kEyebrow">
                make a wish&hellip;
              </p>
              <h2 className="headline" id="headline">
                <span className="hl__line">
                  <span className="mask">
                    <span ref={wLine1Ref} className="hl__word" id="wLine1">
                      Happy
                    </span>
                  </span>
                </span>
                <span className="hl__line">
                  <span className="mask">
                    <span ref={wLine2Ref} className="hl__word" id="wLine2">
                      Birthday
                    </span>
                  </span>
                </span>
              </h2>
              <svg className="uline" id="uline" viewBox="0 0 300 26" fill="none" aria-hidden="true">
                <path
                  ref={ulineRef}
                  className="uline__path"
                  d="M8 16C56 7 132 4 178 6c30 1 78 5 114 12-40 3-108 4-176 3"
                  stroke="currentColor"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p ref={kSubRef} className="kSub" id="kSub">
                to someone worth celebrating
              </p>
            </div>

            <div ref={barTopRef} className="bar bar--top" id="barTop"></div>
            <div ref={barBotRef} className="bar bar--bot" id="barBot"></div>
          </div>

          {/* Gold Bloom Handoff */}
          <div ref={bloomRef} className="bloom" id="bloom" aria-hidden="true"></div>

          {/* Act 4: Hand-lettered Wish Overlay */}
          <div ref={wishElRef} className="wish" id="wish" aria-hidden="true">
            <p className="wish__eyebrow" id="wEyebrow">
              and&hellip; make it count
            </p>
            <div className="wish__heroWrap">
              <h1 className="wish__hero" id="wHero">
                Happy Birthday
              </h1>
            </div>
            <span className="wish__rule" id="wRule"></span>
            <p className="wish__sub" id="wSub">
              here&rsquo;s to a year that blooms
            </p>
          </div>

          {/* Film Lens Grade */}
          <div className="grade" aria-hidden="true">
            <div className="grade__vignette"></div>
            <div className="grade__grain"></div>
          </div>
        </main>

        {/* Pulsating Scroll Down Indicator */}
        <a
          href="#letter-section"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 text-xs font-serif italic text-rose-300/80 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="tracking-widest uppercase text-[10px] font-sans font-semibold">
            Scroll to reveal letter & memories
          </span>
          <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce group-hover:translate-y-1 transition-transform" />
        </a>
      </section>

      {/* ============================================================
          SECTION 2: WAX-SEALED BIRTHDAY LOVE LETTER
          ============================================================ */}
      <section id="letter-section" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="relative bg-[#fff8f0] text-zinc-900 rounded-3xl p-8 sm:p-14 shadow-2xl border border-amber-200/80 space-y-8">
          {/* Wax Seal Ribbon Header */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-700 text-amber-100 flex items-center justify-center font-serif text-lg font-black shadow-lg border-2 border-rose-800">
                ♥
              </div>
              <div>
                <span className="font-serif italic font-bold text-rose-950 text-base block">
                  A Heartfelt Birthday Tribute
                </span>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                  Official Seal &bull; Commemorative Edition
                </span>
              </div>
            </div>
            <Quote className="w-8 h-8 text-amber-300" />
          </div>

          {/* Letter Body */}
          <div className="space-y-6 font-serif leading-relaxed text-zinc-800">
            <p className="text-2xl sm:text-3xl italic font-bold text-rose-950">
              Dearest Birthday Star,
            </p>
            <p className="text-base sm:text-lg">
              Today the world celebrates you — your kindness, your unwavering light, your contagious laughter, and every quiet way you make the lives around you so much richer.
            </p>
            <p className="text-base sm:text-lg">
              As another magnificent year turns its pages, may you continue to chase the horizons that excite you, embrace moments of pure spontaneous joy, and know that you are deeply cherished beyond measure.
            </p>
            <p className="text-lg sm:text-xl italic text-rose-900 font-semibold pl-4 border-l-2 border-rose-400">
              &ldquo;Here&rsquo;s to days overflowing with laughter, a heart forever in bloom, and dreams that unfold into golden reality.&rdquo;
            </p>

            <div className="pt-8 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-sans">With Endless Love & Admiration,</p>
                <p className="font-serif italic text-2xl sm:text-3xl font-bold text-rose-950">Your Favorite Humans</p>
              </div>
              <button
                onClick={() => {
                  confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ["#fda4af", "#f43f5e", "#fef08a", "#e0e7ff"],
                  });
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-rose-950/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <PartyPopper className="w-4 h-4" /> Send Celebration Confetti
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: CHERISHED MEMORIES & POLAROID PHOTO GRID
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-serif uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Cherished Chapters
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif italic text-rose-100">
            Moments in Golden Light
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 max-w-lg mx-auto font-light leading-relaxed">
            A celebration of smiles, milestones, and every laugh shared along the way. Click any photo to zoom in.
          </p>
        </div>

        {/* Vintage Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {MEMORIES.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group cursor-pointer bg-[#fffaf5] text-zinc-900 p-4 pb-6 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-rose-950/60 ${photo.rotation}`}
            >
              {/* Washi Tape Strip */}
              <div className="w-28 h-6 mx-auto -mt-6 mb-3 bg-amber-100/70 border border-amber-200/60 rotate-1 shadow-sm backdrop-blur-xs flex items-center justify-center">
                <span className="text-[9px] font-mono text-amber-900/70 font-semibold uppercase">{photo.tag}</span>
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded bg-zinc-100 mb-4">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs">
                  <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> View Memory</span>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="space-y-1 text-center">
                <h3 className="font-serif italic font-bold text-lg text-zinc-900">
                  {photo.title}
                </h3>
                <p className="text-xs text-zinc-600 font-sans line-clamp-2">
                  {photo.caption}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-200">
                  <span>{photo.location}</span>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Photo Zoom View */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-[#fffaf5] text-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-zinc-100 shadow-inner">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold">
                  {selectedPhoto.tag} &bull; {selectedPhoto.date}
                </span>
                <h3 className="text-2xl font-serif italic font-bold text-zinc-900">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed font-serif">
                  {selectedPhoto.caption}
                </p>
                <p className="text-xs text-zinc-400 flex items-center gap-1 pt-2">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" /> Location: {selectedPhoto.location}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================
          SECTION 4: BIRTHDAY GUESTBOOK & WISHES WALL
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-rose-950 space-y-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-3xl font-serif italic text-rose-100 font-bold">
                Birthday Guestbook Wall
              </h3>
              <p className="text-xs text-zinc-400">Leave a heartfelt note or birthday wish!</p>
            </div>
            <span className="text-xs font-mono text-rose-400 font-semibold">{wishes.length} Wishes Posted</span>
          </div>

          {/* Leave a Wish Form */}
          <form onSubmit={submitWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
              <input
                type="text"
                placeholder="Your relationship (e.g. Best Friend, Sister)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
            <textarea
              rows={3}
              required
              placeholder="Write your birthday wish or cherished memory..."
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2 hover:opacity-95"
            >
              <Send className="w-3.5 h-3.5" /> Post Birthday Wish
            </button>
          </form>

          {/* Wishes Feed */}
          <div className="space-y-4 pt-4">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif italic font-bold text-rose-200 text-base flex items-center gap-1.5">
                    <Heart className={`w-3.5 h-3.5 fill-current ${w.heartColor}`} /> {w.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{w.time}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-serif">
                  {w.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom Replay Button */}
      <div className="replay-bar">
        <button onClick={handleReset} className="replay-btn flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Film</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-rose-950/80 py-10 px-6 max-w-6xl mx-auto text-center text-xs text-rose-300/60">
        <p>&copy; {new Date().getFullYear()} Happy Birthday Cinematic Film &bull; Made with love and heartfelt wishes.</p>
      </footer>
    </div>
  );
}
