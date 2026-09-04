"use client";

import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleUserRound,
  Eye,
  Heart,
  Instagram,
  Mail,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

type ProductCategory = 'Relax' | 'Lifestyle';
type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceLabel?: string;
  art: 'sunglasses' | 'tote' | 'shoes' | 'shirt' | 'bottle' | 'bloom';
  tone: string;
  accent: string;
  detail: string;
};
type CartLine = { product: Product; quantity: number };

const products: Product[] = [
  {
    id: 'horizon-gaze',
    name: 'Horizon Gaze Sunglasses',
    category: 'Relax',
    price: 61.5,
    art: 'sunglasses',
    tone: '#d5e1da',
    accent: '#d26949',
    detail: 'A warm, easy frame for long afternoons and longer horizons.',
  },
  {
    id: 'sunbeam-tote',
    name: 'Sunbeam Tote',
    category: 'Lifestyle',
    price: 121.77,
    art: 'tote',
    tone: '#ead2b5',
    accent: '#c66e43',
    detail: 'Room for the things that make an ordinary day feel considered.',
  },
  {
    id: 'shadow-stride',
    name: 'Shadow Stride Shoes',
    category: 'Lifestyle',
    price: 147.6,
    art: 'shoes',
    tone: '#cdd6df',
    accent: '#263a4a',
    detail: 'Quietly technical, comfortably unhurried. Made to go further.',
  },
  {
    id: 'zebra-blend',
    name: 'Zebra Blend T-Shirt',
    category: 'Lifestyle',
    price: 55.35,
    priceLabel: '$55.35 – $61.50',
    art: 'shirt',
    tone: '#e0d7cf',
    accent: '#343732',
    detail: 'A soft, graphic everyday layer with an unexpected point of view.',
  },
  {
    id: 'aqua-stride',
    name: 'Aqua Stride Bottle',
    category: 'Relax',
    price: 121.77,
    art: 'bottle',
    tone: '#c9dfdf',
    accent: '#287d82',
    detail: 'A cool sip, wherever the day happens to take you.',
  },
  {
    id: 'ocean-bloom',
    name: 'Ocean Bloom',
    category: 'Relax',
    price: 553.5,
    art: 'bloom',
    tone: '#d2d6e0',
    accent: '#364e69',
    detail: 'A sculptural piece inspired by salt air, soft light, and open water.',
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

function ProductArt({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const common = {
    viewBox: '0 0 500 560',
    role: 'img',
    'aria-label': `${product.name} product illustration`,
    className: large ? 'product-art product-art-large' : 'product-art',
  };
  if (product.art === 'sunglasses') {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="glass" x1="0" x2="1">
            <stop offset="0" stopColor="#435c66" />
            <stop offset=".55" stopColor="#1b2c33" />
            <stop offset="1" stopColor="#789398" />
          </linearGradient>
          <radialGradient id="sun" cx=".35" cy=".2" r=".7">
            <stop stopColor="#f8eed8" />
            <stop offset="1" stopColor="#e5c49d" />
          </radialGradient>
        </defs>
        <rect width="500" height="560" fill={product.tone} />
        <circle cx="95" cy="96" r="116" fill="url(#sun)" opacity=".72" />
        <path d="M40 435c92-46 157-65 248-64 77 1 130 15 205 58" fill="none" stroke="#fff8e9" strokeWidth="2" opacity=".55" />
        <path d="M93 260c30-44 88-53 132-13l-7 67c-27 35-84 34-113 5l-12-59Z" fill="url(#glass)" stroke="#17272c" strokeWidth="11" />
        <path d="M275 247c38-38 100-28 132 17l-5 63c-31 31-87 28-112-5l-15-75Z" fill="url(#glass)" stroke="#17272c" strokeWidth="11" />
        <path d="M217 257c18-20 38-21 59-1" fill="none" stroke="#17272c" strokeWidth="11" strokeLinecap="round" />
        <path d="M88 252 43 228M405 260l44-28" fill="none" stroke="#17272c" strokeWidth="11" strokeLinecap="round" />
        <path d="m105 289 116 6m61-2 105-6" stroke="#a2c2c1" strokeWidth="2" opacity=".65" />
        <text x="42" y="505" fill="#294048" fontSize="10" letterSpacing="3">YNS / SUN SERIES</text>
      </svg>
    );
  }
  if (product.art === 'tote') {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="canvas" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f2c99d" />
            <stop offset="1" stopColor="#b85f3e" />
          </linearGradient>
        </defs>
        <rect width="500" height="560" fill={product.tone} />
        <path d="M0 105c89-43 154-40 248-17 94 22 163 22 252-20v492H0V105Z" fill="#e6b57e" opacity=".35" />
        <path d="M103 190h292l-21 280H124L103 190Z" fill="url(#canvas)" />
        <path d="M160 202v-62c0-72 178-72 178 0v62" fill="none" stroke="#814d3d" strokeWidth="18" strokeLinecap="round" />
        <path d="M137 239h224M138 399h222" stroke="#f5d8ae" strokeWidth="3" opacity=".56" />
        <path d="M228 284h47v66h-47z" fill="#e6ad78" opacity=".6" />
        <path d="M238 296h27" stroke="#8e4f3d" strokeWidth="3" />
        <text x="172" y="437" fill="#6a4039" fontSize="13" letterSpacing="4">SUNBEAM</text>
        <circle cx="65" cy="72" r="21" fill="#f1ddbd" opacity=".8" />
      </svg>
    );
  }
  if (product.art === 'shoes') {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="shoe" x1=".1" x2=".9" y1=".2" y2=".9">
            <stop stopColor="#536a7a" />
            <stop offset="1" stopColor="#1e2e3d" />
          </linearGradient>
        </defs>
        <rect width="500" height="560" fill={product.tone} />
        <path d="M43 445c87-18 178-11 263 15 57 18 108 17 166-10" fill="none" stroke="#f5f6f0" strokeWidth="2" opacity=".8" />
        <path d="M66 377c66-9 94-33 124-97l64 45c-10 50 24 75 109 78 43 2 59 20 52 43-72 31-261 20-347-8-17-14-18-43-2-61Z" fill="url(#shoe)" />
        <path d="m190 281 67 44 39-8 29 37-93 4-64-48Z" fill="#9db2bd" opacity=".75" />
        <path d="M207 290 182 379m50-65-30 74m60-61-30 67" stroke="#dce4e4" strokeWidth="7" strokeLinecap="round" />
        <path d="M61 430c98 33 264 42 354 11" fill="none" stroke="#f0e6d5" strokeWidth="11" strokeLinecap="round" />
        <path d="M356 220c-20-40-14-85 18-113" fill="none" stroke="#314858" strokeWidth="12" strokeLinecap="round" />
        <text x="42" y="90" fill="#354c5c" fontSize="11" letterSpacing="4">STRIDE / 02</text>
      </svg>
    );
  }
  if (product.art === 'shirt') {
    return (
      <svg {...common}>
        <rect width="500" height="560" fill={product.tone} />
        <path d="M0 450c103-32 154-9 244 15 104 28 171 5 256-30v125H0Z" fill="#c6baae" opacity=".5" />
        <path d="m171 156 76 36 83-38 72 74-47 51-36-32v180H180V247l-40 31-54-50 85-72Z" fill="#f0eadf" stroke="#686860" strokeWidth="4" />
        <path d="M220 176c13 30 65 33 82-1" fill="none" stroke="#686860" strokeWidth="4" />
        <path d="M180 239c72 37 129 43 191 9" fill="none" stroke="#373d3b" strokeWidth="13" strokeDasharray="8 14" opacity=".9" />
        <path d="M186 292c64 26 135 26 179 3m-179 48c59 22 116 25 179 5" fill="none" stroke="#373d3b" strokeWidth="10" strokeDasharray="4 13" opacity=".8" />
        <text x="210" y="465" fill="#4a504b" fontSize="12" letterSpacing="4">YNS / BLEND</text>
      </svg>
    );
  }
  if (product.art === 'bottle') {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="water" x1="0" x2="1">
            <stop stopColor="#6fc4c4" />
            <stop offset=".5" stopColor="#d8f1e8" />
            <stop offset="1" stopColor="#26898c" />
          </linearGradient>
        </defs>
        <rect width="500" height="560" fill={product.tone} />
        <circle cx="415" cy="110" r="83" fill="#eff5e4" opacity=".7" />
        <path d="M89 478c91-26 194-26 322 0" fill="none" stroke="#eff8eb" strokeWidth="3" />
        <path d="M194 139h110v47c0 19 29 40 29 74v162c0 52-25 76-84 76s-85-24-85-76V260c0-34 30-55 30-74v-47Z" fill="url(#water)" stroke="#1d747b" strokeWidth="7" />
        <path d="M208 135h83V90c0-18-9-28-21-28h-41c-12 0-21 10-21 28v45Z" fill="#246d73" />
        <path d="M204 201h95" stroke="#f1f5e8" strokeWidth="4" opacity=".8" />
        <path d="M200 373c47 16 81 15 129-1" fill="none" stroke="#e3fbec" strokeWidth="3" opacity=".8" />
        <text x="218" y="313" fill="#f3fff5" fontSize="16" letterSpacing="3" transform="rotate(-90 218 313)">AQUA</text>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <defs>
        <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#aab7c6" />
          <stop offset="1" stopColor="#304d67" />
        </linearGradient>
      </defs>
      <rect width="500" height="560" fill={product.tone} />
      <path d="M0 430c104-43 184-23 261 12 89 40 154 3 239-25v143H0Z" fill="#bac5d0" opacity=".7" />
      <path d="M117 405c38-105 75-180 128-254 18-25 45-20 43 12-5 70-12 129 22 176 32-68 57-106 101-138 24-17 40 1 22 27-52 75-82 124-95 190-68 27-150 23-221-13Z" fill="url(#ocean)" />
      <path d="M237 171c-10-56 15-91 43-116m-2 172c33-54 65-67 96-82m-112 104c-24-43-49-59-73-67" fill="none" stroke="#edf1ec" strokeWidth="7" strokeLinecap="round" opacity=".86" />
      <circle cx="383" cy="107" r="29" fill="#f4ead5" opacity=".7" />
      <text x="42" y="83" fill="#38546c" fontSize="11" letterSpacing="4">OCEAN / BLOOM</text>
    </svg>
  );
}

export default function YNSEditorialStoreTemplate() {
  const [collection, setCollection] = useState<'All' | ProductCategory>('All');
  const [sort, setSort] = useState('featured');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState('');

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCollection = collection === 'All' || product.category === collection;
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase().trim());
      return matchesCollection && matchesSearch;
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [collection, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setDrawerOpen(true);
    setQuickView(null);
    announce(`${product.name} added to bag`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.product.id === id ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    );
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletter.trim()) return;
    setSubscribed(true);
    setNewsletter('');
  };

  return (
    <div className="storefront">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f5f3ef; color: #25302c; font-family: 'DM Sans', 'Trebuchet MS', sans-serif; }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
        .storefront { min-height: 100dvh; overflow: hidden; background: #f5f3ef; color: #25302c; }
        .announcement { min-height: 34px; display: flex; align-items: center; justify-content: center; padding: 8px 20px; background: #25302c; color: #e8eadf; font: 10px/1.2 'Space Mono', monospace; letter-spacing: .14em; text-transform: uppercase; text-align: center; }
        .nav-wrap { position: relative; z-index: 10; border-bottom: 1px solid rgba(37,48,44,.13); background: rgba(245,243,239,.9); backdrop-filter: blur(14px); }
        .nav { max-width: 1380px; margin: 0 auto; min-height: 78px; display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 0 42px; }
        .brand { display: inline-flex; align-items: center; gap: 11px; color: #25302c; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
        .brand-mark { width: 31px; height: 31px; display: grid; place-items: center; border: 1px solid #25302c; border-radius: 50%; font: 11px 'Instrument Serif', Georgia, serif; letter-spacing: 0; }
        .nav-links { display: flex; align-items: center; gap: 34px; margin-left: 42px; }
        .nav-link { border: 0; padding: 8px 0; color: #66706a; background: transparent; font-size: 12px; letter-spacing: .06em; text-decoration: none; transition: color .2s ease; }
        .nav-link:hover, .nav-link:focus-visible { color: #c35d3d; outline: none; }
        .nav-actions { display: flex; align-items: center; gap: 7px; }
        .icon-button { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid transparent; border-radius: 50%; background: transparent; color: #25302c; transition: background .2s ease, border-color .2s ease, transform .2s ease; }
        .icon-button:hover, .icon-button:focus-visible { border-color: rgba(37,48,44,.18); background: #e8e9df; outline: none; transform: translateY(-1px); }
        .bag-button { position: relative; }
        .bag-count { position: absolute; right: 1px; top: 0px; min-width: 16px; height: 16px; display: grid; place-items: center; border-radius: 99px; background: #c35d3d; color: #fff9ef; font: 9px 'Space Mono', monospace; }
        .search-field { width: 0; opacity: 0; overflow: hidden; transition: width .3s ease, opacity .2s ease; }
        .search-field.is-open { width: 185px; opacity: 1; }
        .search-field input { width: 100%; padding: 9px 0; border: 0; border-bottom: 1px solid #25302c; outline: 0; background: transparent; color: #25302c; font-size: 12px; }
        .mobile-menu-button { display: none; }
        .hero { max-width: 1380px; margin: 0 auto; padding: 66px 42px 76px; display: grid; grid-template-columns: minmax(0, .94fr) minmax(390px, 1.06fr); gap: 66px; align-items: center; }
        .eyebrow { display: flex; align-items: center; gap: 12px; color: #c35d3d; font: 10px 'Space Mono', monospace; letter-spacing: .18em; text-transform: uppercase; }
        .eyebrow::before { content: ''; width: 35px; height: 1px; background: #c35d3d; }
        .hero h1 { max-width: 620px; margin: 27px 0 21px; color: #25302c; font: 400 clamp(58px, 7vw, 108px)/.91 'Instrument Serif', Georgia, serif; letter-spacing: -.04em; }
        .hero h1 em { color: #c35d3d; }
        .hero-copy { max-width: 430px; margin: 0 0 31px; color: #66706a; font-size: 15px; line-height: 1.7; }
        .hero-actions { display: flex; align-items: center; gap: 20px; }
        .button-primary { display: inline-flex; align-items: center; gap: 13px; border: 0; padding: 15px 20px; background: #25302c; color: #f5f3ef; font-size: 12px; font-weight: 600; letter-spacing: .04em; transition: background .2s ease, transform .2s ease; }
        .button-primary:hover, .button-primary:focus-visible { background: #c35d3d; outline: none; transform: translateY(-2px); }
        .text-link { display: inline-flex; align-items: center; gap: 8px; border: 0; padding: 10px 0; background: transparent; color: #25302c; font-size: 12px; font-weight: 600; }
        .text-link svg { transition: transform .2s ease; }
        .text-link:hover svg { transform: translateX(4px); }
        .hero-meta { display: flex; gap: 35px; margin-top: 52px; padding-top: 17px; border-top: 1px solid rgba(37,48,44,.16); }
        .meta-number { display: block; margin-bottom: 5px; color: #25302c; font: 25px 'Instrument Serif', Georgia, serif; }
        .meta-label { color: #7c837d; font: 9px 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; }
        .hero-art { min-height: 543px; position: relative; display: grid; place-items: center; background: #d4d9cf; overflow: hidden; }
        .hero-art::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(105deg, transparent 0 42px, rgba(255,255,255,.18) 43px, transparent 44px); opacity: .65; }
        .hero-art::after { content: ''; position: absolute; width: 67%; height: 67%; border: 1px solid rgba(37,48,44,.27); border-radius: 50%; transform: rotate(-17deg); }
        .hero-art-copy { position: absolute; z-index: 2; top: 26px; left: 27px; color: #31443e; font: 10px 'Space Mono', monospace; letter-spacing: .14em; }
        .hero-art-side { position: absolute; z-index: 2; right: 25px; bottom: 26px; writing-mode: vertical-rl; color: #53625a; font: 9px 'Space Mono', monospace; letter-spacing: .18em; }
        .hero-sculpture { position: relative; z-index: 1; width: 54%; height: 51%; border-radius: 48% 52% 45% 55%; background: linear-gradient(135deg, #f4d8a9 3%, #dc8a5a 44%, #3e6c67 45%, #b7d0c0 72%, #374844 73%); box-shadow: 24px 28px 0 rgba(56,79,70,.2), -22px -19px 0 rgba(241,219,177,.35); transform: rotate(-18deg); }
        .hero-sculpture::before { content: ''; position: absolute; width: 120px; height: 120px; right: -37px; top: 24px; border-radius: 50%; border: 12px solid #c35d3d; background: #f5e8cb; }
        .hero-sculpture::after { content: ''; position: absolute; left: -52px; bottom: 14px; width: 130px; height: 28px; border-radius: 50%; background: #324f5b; transform: rotate(11deg); }
        .section { max-width: 1380px; margin: 0 auto; padding: 53px 42px 100px; }
        .section-header { display: flex; align-items: end; justify-content: space-between; gap: 25px; margin-bottom: 29px; }
        .section-title { margin: 0; color: #25302c; font: 400 49px/.94 'Instrument Serif', Georgia, serif; letter-spacing: -.035em; }
        .section-intro { max-width: 275px; margin: 0; color: #7b827c; font-size: 12px; line-height: 1.65; }
        .shop-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 23px; padding: 11px 0; border-top: 1px solid rgba(37,48,44,.15); border-bottom: 1px solid rgba(37,48,44,.15); }
        .collection-tabs { display: flex; align-items: center; gap: 7px; }
        .filter-tab { border: 1px solid transparent; padding: 9px 14px; background: transparent; color: #7c837d; font: 10px 'Space Mono', monospace; letter-spacing: .05em; text-transform: uppercase; transition: color .2s ease, background .2s ease; }
        .filter-tab:hover { color: #25302c; }
        .filter-tab.active { background: #25302c; color: #f5f3ef; }
        .toolbar-right { display: flex; align-items: center; gap: 13px; }
        .result-count { color: #8c928d; font: 10px 'Space Mono', monospace; }
        .sort-wrap { position: relative; display: flex; align-items: center; gap: 7px; color: #66706a; }
        .sort-wrap select { appearance: none; border: 0; padding: 7px 23px 7px 2px; outline: 0; background: transparent; color: #25302c; font-size: 11px; cursor: pointer; }
        .sort-wrap svg { position: absolute; right: 0; pointer-events: none; }
        .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 43px 20px; }
        .product-card { min-width: 0; }
        .product-visual { position: relative; aspect-ratio: .93 / 1; overflow: hidden; background: #dde1d7; }
        .product-visual .product-art { width: 100%; height: 100%; display: block; transition: transform .55s cubic-bezier(.2,.7,.2,1); }
        .product-card:hover .product-visual .product-art { transform: scale(1.045); }
        .product-card:focus-within .product-visual { outline: 2px solid #c35d3d; outline-offset: 3px; }
        .product-actions { position: absolute; inset: 14px 14px auto; display: flex; justify-content: space-between; align-items: flex-start; }
        .product-tag { padding: 7px 9px; background: rgba(245,243,239,.84); color: #52605a; font: 9px 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; backdrop-filter: blur(5px); }
        .favorite { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid rgba(37,48,44,.2); border-radius: 50%; background: rgba(245,243,239,.77); color: #25302c; transition: color .2s ease, background .2s ease, transform .2s ease; }
        .favorite:hover, .favorite.is-favorite { background: #c35d3d; color: #fff8eb; transform: scale(1.05); }
        .quick-view { position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 8px; border: 0; padding: 11px 13px; background: #25302c; color: #f8f6ed; font-size: 10px; font-weight: 600; opacity: 0; transform: translateY(9px); transition: opacity .25s ease, transform .25s ease, background .2s ease; }
        .product-card:hover .quick-view, .product-card:focus-within .quick-view { opacity: 1; transform: translateY(0); }
        .quick-view:hover { background: #c35d3d; }
        .product-info { display: flex; align-items: flex-start; justify-content: space-between; gap: 15px; padding-top: 14px; }
        .product-name { margin: 0 0 6px; color: #25302c; font-size: 13px; font-weight: 600; }
        .product-category { color: #89908a; font: 9px 'Space Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
        .product-price { flex-shrink: 0; color: #53605a; font: 11px 'Space Mono', monospace; }
        .empty-products { grid-column: 1 / -1; padding: 85px 25px; border: 1px dashed #bdc3bb; text-align: center; }
        .empty-products h3 { margin: 14px 0 7px; font: 400 34px 'Instrument Serif', Georgia, serif; }
        .empty-products p { margin: 0; color: #7c837d; font-size: 12px; }
        .story-band { max-width: 1380px; margin: 4px auto 0; padding: 0 42px 106px; }
        .story-inner { min-height: 405px; display: grid; grid-template-columns: .72fr 1.28fr; background: #d6dfd7; }
        .story-copy { display: flex; flex-direction: column; justify-content: center; padding: 57px; }
        .story-copy .eyebrow { color: #49645a; }
        .story-copy .eyebrow::before { background: #49645a; }
        .story-copy h2 { max-width: 360px; margin: 23px 0 16px; font: 400 54px/.9 'Instrument Serif', Georgia, serif; letter-spacing: -.04em; }
        .story-copy p { max-width: 295px; margin: 0 0 23px; color: #65746b; font-size: 12px; line-height: 1.7; }
        .story-art { position: relative; overflow: hidden; min-height: 405px; background: #a5bbb0; }
        .story-art::before { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, #a5bbb0 0%, transparent 25%), repeating-linear-gradient(60deg, transparent 0 25px, rgba(236,238,220,.17) 26px 27px); }
        .story-sun { position: absolute; width: 170px; height: 170px; top: 46px; left: 19%; border-radius: 50%; background: #f3d39d; }
        .story-wave { position: absolute; width: 76%; height: 170px; right: -7%; bottom: 32px; border-radius: 50%; background: #4c7b7b; transform: rotate(-9deg); box-shadow: -42px 26px 0 #6f978c, -85px 53px 0 #c4d3bf; }
        .story-orbit { position: absolute; width: 280px; height: 450px; left: 37%; top: -33px; border: 1px solid rgba(255,248,219,.68); border-radius: 50%; transform: rotate(34deg); }
        .newsletter { padding: 82px 42px 86px; background: #25302c; color: #f4f0e6; }
        .newsletter-inner { max-width: 1055px; margin: 0 auto; display: grid; grid-template-columns: 1fr .72fr; align-items: end; gap: 80px; }
        .newsletter .eyebrow { color: #e4a07b; }
        .newsletter .eyebrow::before { background: #e4a07b; }
        .newsletter h2 { margin: 20px 0 0; font: 400 56px/.93 'Instrument Serif', Georgia, serif; letter-spacing: -.04em; }
        .newsletter-copy { color: #aab3a9; font-size: 12px; line-height: 1.65; }
        .newsletter-form { display: flex; align-items: center; margin-top: 21px; border-bottom: 1px solid #7c8a80; }
        .newsletter-form input { flex: 1; min-width: 0; border: 0; padding: 13px 3px; outline: 0; background: transparent; color: #f4f0e6; font-size: 12px; }
        .newsletter-form input::placeholder { color: #849087; }
        .newsletter-form button { width: 38px; height: 38px; display: grid; place-items: center; border: 0; background: transparent; color: #e4a07b; }
        .newsletter-success { display: flex; align-items: center; gap: 9px; padding: 17px 0 12px; color: #c9dfc4; font-size: 12px; }
        .footer { max-width: 1380px; margin: 0 auto; padding: 25px 42px; display: flex; align-items: center; justify-content: space-between; gap: 24px; color: #7c837d; font: 9px 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; }
        .footer-links { display: flex; align-items: center; gap: 21px; }
        .footer a { color: inherit; text-decoration: none; }
        .footer a:hover { color: #c35d3d; }
        .overlay { position: fixed; z-index: 30; inset: 0; background: rgba(33,42,38,.42); animation: fade-in .2s ease; }
        .drawer { position: fixed; z-index: 31; right: 0; top: 0; bottom: 0; width: min(430px, 100%); display: flex; flex-direction: column; background: #f7f5ef; box-shadow: -14px 0 40px rgba(29,43,36,.12); animation: slide-in .32s cubic-bezier(.2,.75,.2,1); }
        .drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 26px 28px 22px; border-bottom: 1px solid rgba(37,48,44,.14); }
        .drawer-header h2 { margin: 0; font: 400 32px 'Instrument Serif', Georgia, serif; }
        .drawer-body { flex: 1; overflow-y: auto; padding: 13px 28px; }
        .cart-line { display: grid; grid-template-columns: 87px 1fr; gap: 15px; padding: 17px 0; border-bottom: 1px solid rgba(37,48,44,.12); }
        .cart-art { width: 87px; height: 100px; overflow: hidden; }
        .cart-art svg { width: 100%; height: 100%; }
        .cart-line-info { display: flex; flex-direction: column; min-width: 0; }
        .cart-line-top { display: flex; justify-content: space-between; gap: 7px; }
        .cart-line-name { margin: 0; color: #25302c; font-size: 12px; font-weight: 600; line-height: 1.35; }
        .cart-line-price { color: #637069; font: 10px 'Space Mono', monospace; white-space: nowrap; }
        .cart-line-category { margin-top: 4px; color: #8a918a; font: 9px 'Space Mono', monospace; text-transform: uppercase; }
        .quantity { display: inline-flex; align-items: center; gap: 12px; width: fit-content; margin-top: auto; border: 1px solid #cad0c8; }
        .quantity button { width: 25px; height: 25px; display: grid; place-items: center; border: 0; background: transparent; color: #25302c; }
        .quantity button:hover { color: #c35d3d; }
        .quantity span { min-width: 11px; text-align: center; color: #59635d; font: 10px 'Space Mono', monospace; }
        .drawer-empty { height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 30px; text-align: center; }
        .drawer-empty h3 { margin: 17px 0 7px; font: 400 31px 'Instrument Serif', Georgia, serif; }
        .drawer-empty p { max-width: 240px; margin: 0 0 22px; color: #7d867e; font-size: 12px; line-height: 1.6; }
        .drawer-footer { padding: 20px 28px 29px; border-top: 1px solid rgba(37,48,44,.14); }
        .subtotal { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; color: #657069; font-size: 12px; }
        .subtotal strong { color: #25302c; font: 15px 'Space Mono', monospace; }
        .checkout { width: 100%; justify-content: center; }
        .modal-wrap { position: fixed; z-index: 32; inset: 0; display: grid; place-items: center; padding: 22px; }
        .quick-modal { width: min(740px, 100%); max-height: calc(100dvh - 44px); display: grid; grid-template-columns: .92fr 1.08fr; overflow: auto; background: #f7f5ef; box-shadow: 0 24px 70px rgba(29,43,36,.25); animation: rise-in .27s ease; }
        .modal-art { min-height: 480px; }
        .modal-art svg { width: 100%; height: 100%; display: block; }
        .modal-copy { position: relative; display: flex; flex-direction: column; justify-content: center; padding: 45px; }
        .modal-close { position: absolute; right: 17px; top: 16px; }
        .modal-copy .product-category { display: block; margin-bottom: 14px; }
        .modal-copy h2 { margin: 0 0 13px; font: 400 43px/.95 'Instrument Serif', Georgia, serif; letter-spacing: -.03em; }
        .modal-copy .modal-price { margin: 0 0 24px; color: #53605a; font: 12px 'Space Mono', monospace; }
        .modal-copy p { margin: 0 0 30px; color: #727b74; font-size: 13px; line-height: 1.7; }
        .modal-note { display: flex; align-items: center; gap: 8px; margin-top: 17px; color: #808a81; font-size: 10px; }
        .toast { position: fixed; z-index: 50; right: 24px; bottom: 24px; display: flex; align-items: center; gap: 9px; padding: 13px 17px; background: #25302c; color: #f8f4e9; box-shadow: 0 10px 30px rgba(29,43,36,.22); font-size: 12px; animation: toast-in .3s ease; }
        .toast svg { color: #e4a07b; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes rise-in { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes toast-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links { gap: 19px; margin-left: 0; }
          .hero { grid-template-columns: 1fr; gap: 45px; padding: 54px 24px 68px; }
          .hero h1 { max-width: 630px; font-size: clamp(62px, 12vw, 95px); }
          .hero-art { min-height: 460px; }
          .section, .story-band { padding-left: 24px; padding-right: 24px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 37px 17px; }
          .story-copy { padding: 42px; }
          .newsletter { padding-left: 24px; padding-right: 24px; }
          .newsletter-inner { gap: 35px; }
          .newsletter h2 { font-size: 48px; }
          .footer { padding-left: 24px; padding-right: 24px; }
        }
        @media (max-width: 620px) {
          .announcement { font-size: 8px; letter-spacing: .1em; }
          .nav { min-height: 68px; padding: 0 18px; }
          .brand { font-size: 11px; }
          .nav-links { position: absolute; left: 0; right: 0; top: 68px; display: none; flex-direction: column; align-items: flex-start; gap: 0; padding: 11px 19px 17px; border-bottom: 1px solid rgba(37,48,44,.13); background: #f5f3ef; }
          .nav-links.is-open { display: flex; }
          .nav-link { width: 100%; padding: 12px 0; }
          .mobile-menu-button { display: grid; }
          .search-field.is-open { position: absolute; left: 18px; right: 18px; top: 70px; width: auto; padding: 11px 0; background: #f5f3ef; }
          .hero { padding: 48px 18px 60px; gap: 38px; }
          .hero h1 { margin-top: 22px; font-size: clamp(57px, 17vw, 78px); }
          .hero-copy { font-size: 14px; }
          .hero-meta { gap: 23px; margin-top: 38px; }
          .hero-art { min-height: 370px; }
          .section { padding: 43px 18px 76px; }
          .section-header { display: block; margin-bottom: 25px; }
          .section-title { font-size: 43px; margin-bottom: 14px; }
          .shop-toolbar { align-items: flex-start; flex-direction: column; gap: 12px; padding: 14px 0; }
          .toolbar-right { width: 100%; justify-content: space-between; }
          .filter-tab { padding: 8px 10px; font-size: 9px; }
          .product-grid { grid-template-columns: 1fr 1fr; gap: 30px 10px; }
          .product-info { display: block; padding-top: 10px; }
          .product-price { display: block; margin-top: 7px; font-size: 10px; }
          .product-name { font-size: 11px; }
          .product-category { font-size: 8px; }
          .product-actions { inset: 9px 9px auto; }
          .product-tag { padding: 5px 6px; font-size: 7px; }
          .favorite { width: 29px; height: 29px; }
          .quick-view { right: 9px; bottom: 9px; padding: 9px; font-size: 9px; }
          .quick-view span { display: none; }
          .story-band { padding: 0 18px 76px; }
          .story-inner { display: block; }
          .story-copy { min-height: 305px; padding: 37px 28px; }
          .story-copy h2 { font-size: 46px; }
          .story-art { min-height: 280px; }
          .newsletter { padding: 66px 18px 68px; }
          .newsletter-inner { display: block; }
          .newsletter h2 { margin-bottom: 32px; font-size: 48px; }
          .footer { align-items: flex-start; flex-direction: column; padding: 24px 18px; }
          .modal-wrap { padding: 12px; }
          .quick-modal { display: block; max-height: calc(100dvh - 24px); }
          .modal-art { height: 330px; min-height: 0; }
          .modal-copy { padding: 28px 25px 30px; }
          .modal-copy h2 { font-size: 36px; }
          .drawer-header { padding-left: 20px; padding-right: 20px; }
          .drawer-body { padding-left: 20px; padding-right: 20px; }
          .drawer-footer { padding-left: 20px; padding-right: 20px; }
          .toast { right: 15px; bottom: 15px; left: 15px; justify-content: center; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="announcement">AURA UX TEMPLATE</div>

      <header className="nav-wrap">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" data-testid="link-brand">
            <span className="brand-mark">Y</span>
            <span>YNS Demo</span>
          </a>
          <div className={`nav-links ${mobileNav ? 'is-open' : ''}`}>
            <a className="nav-link" href="#shop" data-testid="link-shop" onClick={() => setMobileNav(false)}>Shop</a>
            <a className="nav-link" href="#story" data-testid="link-story" onClick={() => setMobileNav(false)}>Our edit</a>
            <a className="nav-link" href="#newsletter" data-testid="link-notes" onClick={() => setMobileNav(false)}>Notes</a>
          </div>
          <div className="nav-actions">
            <div className={`search-field ${searchOpen ? 'is-open' : ''}`}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the edit"
                aria-label="Search products"
                data-testid="input-search"
              />
            </div>
            <button className="icon-button" onClick={() => setSearchOpen((open) => !open)} aria-label="Search" data-testid="button-search">
              <Search size={17} strokeWidth={1.7} />
            </button>
            <button className="icon-button desktop-only" aria-label="Account" data-testid="button-account" onClick={() => announce('Account space coming soon')}>
              <CircleUserRound size={17} strokeWidth={1.7} />
            </button>
            <button className="icon-button bag-button" onClick={() => setDrawerOpen(true)} aria-label={`Shopping bag, ${cartCount} items`} data-testid="button-cart">
              <ShoppingBag size={17} strokeWidth={1.7} />
              {cartCount > 0 && <span className="bag-count">{cartCount}</span>}
            </button>
            <button className="icon-button mobile-menu-button" onClick={() => setMobileNav((open) => !open)} aria-label="Menu" data-testid="button-menu">
              {mobileNav ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <div className="eyebrow">An independent shop, online</div>
            <h1>Launch your store <em>in minutes.</em></h1>
            <p className="hero-copy">Stripe-native. Built for the agentic future. A carefully edited storefront for the people making things worth keeping.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#shop" data-testid="link-shop-hero">Explore the edit <ArrowRight size={15} /></a>
              <a className="text-link" href="#story" data-testid="link-learn-more">The YNS way <ArrowUpRight size={14} /></a>
            </div>
            <div className="hero-meta">
              <div><span className="meta-number">06</span><span className="meta-label">Objects in the edit</span></div>
              <div><span className="meta-number">02</span><span className="meta-label">Small collections</span></div>
              <div><span className="meta-number">24/7</span><span className="meta-label">Good taste online</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract YNS Demo editorial artwork">
            <span className="hero-art-copy">YNS DEMO / VOL. 01</span>
            <span className="hero-art-side">A QUIETER KIND OF COMMERCE</span>
            <div className="hero-sculpture" />
          </div>
        </section>

        <section className="section" id="shop">
          <div className="section-header">
            <div>
              <div className="eyebrow">The current edit</div>
              <h2 className="section-title">Good things,<br /><em>well chosen.</em></h2>
            </div>
            <p className="section-intro">A small collection of useful, beautiful objects. No noise, no endless scrolling — just the pieces that stayed with us.</p>
          </div>
          <div className="shop-toolbar">
            <div className="collection-tabs" aria-label="Product collections">
              {(['All', 'Relax', 'Lifestyle'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`filter-tab ${collection === tab ? 'active' : ''}`}
                  onClick={() => setCollection(tab)}
                  data-testid={`button-filter-${tab.toLowerCase()}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <span className="result-count">{visibleProducts.length} objects</span>
              <div className="sort-wrap">
                <SlidersHorizontal size={13} />
                <label htmlFor="sort-products" className="sr-only">Sort products</label>
                <select id="sort-products" value={sort} onChange={(event) => setSort(event.target.value)} data-testid="select-sort">
                  <option value="featured">Sort products</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <ChevronDown size={13} />
              </div>
            </div>
          </div>
          <div className="product-grid">
            {visibleProducts.length > 0 ? visibleProducts.map((product) => (
              <article className="product-card" key={product.id} data-testid={`card-product-${product.id}`}>
                <div className="product-visual">
                  <ProductArt product={product} />
                  <div className="product-actions">
                    <span className="product-tag">{product.category}</span>
                    <button
                      className={`favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${favorites.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.id) ? 'from' : 'to'} favorites`}
                      data-testid={`button-favorite-${product.id}`}
                    >
                      <Heart size={15} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <button className="quick-view" onClick={() => setQuickView(product)} data-testid={`button-quick-view-${product.id}`}>
                    <Eye size={14} /><span>Quick view</span>
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-category">{product.category} collection</span>
                  </div>
                  <span className="product-price">{product.priceLabel ?? money(product.price)}</span>
                </div>
              </article>
            )) : (
              <div className="empty-products">
                <Search size={21} strokeWidth={1.4} />
                <h3>Nothing found in this edit.</h3>
                <p>Try another search or return to the full collection.</p>
                <button className="text-link" onClick={() => { setQuery(''); setCollection('All'); }} data-testid="button-reset-filters">Reset filters <ArrowRight size={14} /></button>
              </div>
            )}
          </div>
        </section>

        <section className="story-band" id="story">
          <div className="story-inner">
            <div className="story-copy">
              <div className="eyebrow">Our edit / 01</div>
              <h2>Made for the in-between.</h2>
              <p>For early trains, late swims, borrowed books, and the beautiful middle of a day. We look for the objects that make room for living.</p>
              <a className="text-link" href="#newsletter" data-testid="link-read-notes">Read our notes <ArrowRight size={14} /></a>
            </div>
            <div className="story-art" aria-label="Abstract ocean-inspired artwork">
              <div className="story-sun" />
              <div className="story-orbit" />
              <div className="story-wave" />
            </div>
          </div>
        </section>

        <section className="newsletter" id="newsletter">
          <div className="newsletter-inner">
            <div>
              <div className="eyebrow">The YNS letter</div>
              <h2>A little more good<br />in your inbox.</h2>
            </div>
            <div>
              <p className="newsletter-copy">New objects, quiet recommendations, and notes from the people making this corner of the internet.</p>
              {subscribed ? (
                <div className="newsletter-success"><Check size={16} /> You’re on the list. See you soon.</div>
              ) : (
                <form className="newsletter-form" onSubmit={submitNewsletter}>
                  <Mail size={15} color="#849087" />
                  <input type="email" required value={newsletter} onChange={(event) => setNewsletter(event.target.value)} placeholder="Your email address" aria-label="Email address" data-testid="input-newsletter" />
                  <button type="submit" aria-label="Subscribe to newsletter" data-testid="button-newsletter"><ArrowRight size={17} /></button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2025 YNS Demo / An independent shop</span>
        <div className="footer-links">
          <a href="#top" data-testid="link-privacy">Privacy</a>
          <a href="#top" data-testid="link-contact">Contact</a>
          <a href="#top" aria-label="YNS Demo on Instagram" data-testid="link-instagram"><Instagram size={14} /></a>
        </div>
      </footer>

      {drawerOpen && (
        <>
          <div className="overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside className="drawer" aria-label="Shopping bag">
            <div className="drawer-header">
              <h2>Your bag <span style={{ color: '#8a918a', fontSize: 16 }}>({cartCount})</span></h2>
              <button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close shopping bag" data-testid="button-close-cart"><X size={18} /></button>
            </div>
            <div className="drawer-body">
              {cart.length > 0 ? cart.map((line) => (
                <div className="cart-line" key={line.product.id} data-testid={`cart-line-${line.product.id}`}>
                  <div className="cart-art"><ProductArt product={line.product} /></div>
                  <div className="cart-line-info">
                    <div className="cart-line-top"><h3 className="cart-line-name">{line.product.name}</h3><span className="cart-line-price">{money(line.product.price * line.quantity)}</span></div>
                    <span className="cart-line-category">{line.product.category}</span>
                    <div className="quantity">
                      <button onClick={() => updateQuantity(line.product.id, -1)} aria-label={`Decrease ${line.product.name} quantity`} data-testid={`button-decrease-${line.product.id}`}><Minus size={12} /></button>
                      <span data-testid={`text-quantity-${line.product.id}`}>{line.quantity}</span>
                      <button onClick={() => updateQuantity(line.product.id, 1)} aria-label={`Increase ${line.product.name} quantity`} data-testid={`button-increase-${line.product.id}`}><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="drawer-empty">
                  <ShoppingBag size={27} strokeWidth={1.2} />
                  <h3>Your bag is quiet.</h3>
                  <p>There are lovely things waiting in the edit. Take a look around.</p>
                  <button className="button-primary" onClick={() => { setDrawerOpen(false); document.getElementById('shop')?.scrollIntoView(); }} data-testid="button-continue-shopping">Continue shopping <ArrowRight size={14} /></button>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="subtotal"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div>
                <button className="button-primary checkout" onClick={() => announce('Checkout is ready for your next step')} data-testid="button-checkout">Continue to checkout <ArrowRight size={14} /></button>
              </div>
            )}
          </aside>
        </>
      )}

      {quickView && (
        <>
          <div className="overlay" onClick={() => setQuickView(null)} aria-hidden="true" />
          <div className="modal-wrap" role="dialog" aria-modal="true" aria-label={`Quick view: ${quickView.name}`}>
            <div className="quick-modal">
              <div className="modal-art"><ProductArt product={quickView} large /></div>
              <div className="modal-copy">
                <button className="icon-button modal-close" onClick={() => setQuickView(null)} aria-label="Close quick view" data-testid="button-close-quick-view"><X size={18} /></button>
                <span className="product-category">{quickView.category} collection</span>
                <h2>{quickView.name}</h2>
                <p className="modal-price">{quickView.priceLabel ?? money(quickView.price)}</p>
                <p>{quickView.detail}</p>
                <button className="button-primary" onClick={() => addToCart(quickView)} data-testid={`button-add-to-bag-${quickView.id}`}>Add to bag <ArrowRight size={14} /></button>
                <div className="modal-note"><Sparkles size={13} /> Selected for slower, better days.</div>
              </div>
            </div>
          </div>
        </>
      )}

      {notice && <div className="toast" role="status" data-testid="status-notice"><Check size={15} /> {notice}</div>}
    </div>
  );
}
