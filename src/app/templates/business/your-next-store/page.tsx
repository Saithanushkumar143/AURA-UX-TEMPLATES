"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  ArrowLeft,
  Star,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  CreditCard,
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";
import confetti from "canvas-confetti";

/* ============================================================
   PRODUCT TYPES & CATALOG DATA
   ============================================================ */
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "apparel" | "tech" | "accessories" | "footwear";
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  imageUrl: string;
  tag?: string;
}

interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Architectural Tech Overshirt",
    price: 145,
    originalPrice: 180,
    category: "apparel",
    categoryLabel: "Apparel",
    rating: 4.9,
    reviewsCount: 84,
    description: "Water-repellent structured overshirt crafted from recycled Japanese ripstop nylon with hidden magnetic closures.",
    details: ["100% Recycled Japanese Ripstop", "Magnetic storm flap closures", "DWR water-resistant finish", "Internal passport pocket"],
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Slate Grey", hex: "#71717a" },
      { name: "Desert Sand", hex: "#d6c7b2" },
    ],
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    tag: "BESTSELLER",
  },
  {
    id: "p2",
    name: "Minimalist Ergonomic Commuter Pack",
    price: 195,
    category: "accessories",
    categoryLabel: "Accessories",
    rating: 4.8,
    reviewsCount: 128,
    description: "Weatherproof 22L everyday backpack with dedicated 16-inch laptop compartment and luggage pass-through.",
    details: ["Cordura 500D ballistic nylon", "Fidlock magnetic sternum buckle", "YKK AquaGuard zippers", "Orthopedic breathable back panel"],
    colors: [
      { name: "Matte Black", hex: "#09090b" },
      { name: "Olive Green", hex: "#3f4f3e" },
    ],
    sizes: ["One Size (22L)"],
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    tag: "NEW DROP",
  },
  {
    id: "p3",
    name: "Aura ANC Studio Headphones",
    price: 280,
    originalPrice: 320,
    category: "tech",
    categoryLabel: "Tech & Audio",
    rating: 5.0,
    reviewsCount: 215,
    description: "Lossless spatial audio headphones with 45-hour battery life and custom titanium acoustic drivers.",
    details: ["40mm custom titanium drivers", "Hybrid active noise cancellation", "Transparency mode with beamforming mics", "Aerospace aluminum hinges"],
    colors: [
      { name: "Space Grey", hex: "#27272a" },
      { name: "Silver Frost", hex: "#e4e4e7" },
    ],
    sizes: ["Standard"],
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    tag: "EDITOR'S CHOICE",
  },
  {
    id: "p4",
    name: "Apex Low-Top Leather Runner",
    price: 165,
    category: "footwear",
    categoryLabel: "Footwear",
    rating: 4.7,
    reviewsCount: 62,
    description: "Handcrafted Italian calfskin leather sneaker with ultra-cushioned Vibram rubber outsole for all-day comfort.",
    details: ["Full-grain Italian calfskin", "Vibram lightweight foam sole", "Memory foam anatomical footbed", "Reinforced heel counter"],
    colors: [
      { name: "Chalk White", hex: "#fafafa" },
      { name: "Triple Black", hex: "#18181b" },
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p5",
    name: "Modular Aluminum Cardholder & Key Clip",
    price: 65,
    originalPrice: 80,
    category: "accessories",
    categoryLabel: "Accessories",
    rating: 4.9,
    reviewsCount: 94,
    description: "RFID-blocking aircraft aluminum cardholder with quick-eject fan mechanism and cash strap.",
    details: ["Holds up to 12 cards + cash", "RFID/NFC signal blocking", "6061-T6 anodized aluminum", "Weight: only 58 grams"],
    colors: [
      { name: "Gunmetal", hex: "#3f3f46" },
      { name: "Matte Black", hex: "#18181b" },
      { name: "Burnt Orange", hex: "#c2410c" },
    ],
    sizes: ["Standard"],
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p6",
    name: "Heavyweight Boxy Fleece Hoodie",
    price: 110,
    category: "apparel",
    categoryLabel: "Apparel",
    rating: 4.8,
    reviewsCount: 145,
    description: "500 GSM organic French terry cotton hoodie with double-layered hood and relaxed drop-shoulder silhouette.",
    details: ["500 GSM 100% Organic Cotton", "Pre-shrunk vintage wash", "Seamless rib knit cuffs", "Zero synthetic blends"],
    colors: [
      { name: "Washed Charcoal", hex: "#27272a" },
      { name: "Natural Ecru", hex: "#f4ede4" },
      { name: "Sage Green", hex: "#627063" },
    ],
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    tag: "STAFF PICK",
  },
];

export default function YourNextStoreTemplate() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedColor: "Onyx Black",
      selectedSize: "M",
      quantity: 1,
    },
    {
      product: PRODUCTS[4],
      selectedColor: "Gunmetal",
      selectedSize: "Standard",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return cartSubtotal * discountApplied;
  }, [cartSubtotal, discountApplied]);

  const freeShippingThreshold = 200;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 15;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Actions
  const addToCart = (product: Product, color?: string, size?: string) => {
    const chosenColor = color || product.colors[0].name;
    const chosenSize = size || product.sizes[0];

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedColor === chosenColor && i.selectedSize === chosenSize
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, selectedColor: chosenColor, selectedSize: chosenSize, quantity: 1 }];
    });

    setIsCartOpen(true);
    setActiveProductModal(null);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const copy = [...prev];
      const newQty = copy[index].quantity + delta;
      if (newQty <= 0) {
        return copy.filter((_, i) => i !== index);
      }
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AURAUX20") {
      setDiscountApplied(0.2); // 20% discount
      confetti({ particleCount: 50, spread: 60 });
    } else {
      alert("Invalid code. Try 'AURAUX20' for 20% off!");
    }
  };

  const openProductModal = (product: Product) => {
    setActiveProductModal(product);
    setSelectedColor(product.colors[0].name);
    setSelectedSize(product.sizes[0]);
  };

  const triggerOrderSuccess = () => {
    setOrderComplete(true);
    setCart([]);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"],
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-center text-xs font-medium text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline flex items-center gap-1 font-semibold text-white/90">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Aura UX Hub
          </Link>
        </div>
        <span className="hidden sm:inline">
          🚀 Use code <strong className="underline font-mono bg-white/20 px-1.5 py-0.5 rounded">AURAUX20</strong> for 20% off all orders &bull; Free express shipping on orders $200+
        </span>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white/20 rounded-full font-bold">
          BUSINESS / E-COMMERCE
        </span>
      </div>

      {/* Main Storefront Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-black text-sm tracking-tighter shadow-md">
              YNS
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white block">
                YOUR NEXT <span className="text-blue-400">STORE</span>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search products, materials, tech gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Action Icons & Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-white text-blue-900 font-bold text-[10px] flex items-center justify-center">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Billboard */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 sm:p-14 flex flex-col justify-between min-h-[380px]">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Minimalist Capsule Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineered Essentials for the Modern Everyday.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Precision-tailored apparel, modular EDC carry gear, and acoustic audio products designed for seamless utility.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition-all shadow-lg flex items-center gap-2"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedCategory("apparel")}
                className="px-6 py-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-semibold text-xs transition-all"
              >
                Apparel Drop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills & Search */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 rounded-2xl border border-zinc-800 w-full sm:w-auto overflow-x-auto">
            {[
              { id: "all", label: "All Items" },
              { id: "apparel", label: "Apparel" },
              { id: "accessories", label: "Accessories & Carry" },
              { id: "tech", label: "Tech & Audio" },
              { id: "footwear", label: "Footwear" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            Showing {filteredProducts.length} Products
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-blue-950/20"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-4/3 w-full bg-zinc-950 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                  {product.tag && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-md">
                      {product.tag}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-zinc-950 shadow-md">
                      SAVE ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => openProductModal(product)}
                    className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Plus className="w-3.5 h-3.5" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Product Information */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="uppercase tracking-wider text-[10px] font-mono text-blue-400 font-semibold">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-zinc-500">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => openProductModal(product)}
                    className="font-bold text-white text-base hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Color swatches & Price footer */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-3.5 h-3.5 rounded-full border border-zinc-700 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through font-mono">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-base font-extrabold text-white font-mono">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantees Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Express Shipping</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Complimentary express shipping on all orders over $200.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Hassle-free return labels included with every order.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Lifetime Warranty</h4>
              <p className="text-xs text-zinc-400 mt-0.5">All hardware and stitching covered for lifetime durability.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Encrypted Checkout</h4>
              <p className="text-xs text-zinc-400 mt-0.5">256-bit bank grade encryption with Apple Pay & Stripe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SLIDE-OVER SHOPPING CART DRAWER
          ============================================================ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Cart Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-white text-base">Your Bag ({totalItemsCount})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300">
                    {cartSubtotal >= freeShippingThreshold
                      ? "🎉 You have unlocked Free Shipping!"
                      : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
                  </span>
                  <span className="text-blue-400 font-mono">
                    {Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 my-2">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto" />
                  <p className="text-zinc-400 text-sm">Your shopping bag is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-zinc-950 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {item.selectedColor} &bull; {item.selectedSize}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                          <button
                            onClick={() => updateQuantity(idx, -1)}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(idx, 1)}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold font-mono text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo (AURAUX20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 uppercase font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-zinc-200">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount (20%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono text-zinc-200">
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total Due</span>
                    <span className="font-mono text-blue-400">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Proceed to Checkout (${totalAmount.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          PRODUCT QUICK VIEW MODAL
          ============================================================ */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
            <button
              onClick={() => setActiveProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="aspect-square w-full bg-zinc-900">
              <img
                src={activeProductModal.imageUrl}
                alt={activeProductModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details Form */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
                  {activeProductModal.categoryLabel}
                </span>

                <h3 className="text-xl font-bold text-white">{activeProductModal.name}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold font-mono text-white">
                    ${activeProductModal.price}
                  </span>
                  {activeProductModal.originalPrice && (
                    <span className="text-sm line-through text-zinc-500 font-mono">
                      ${activeProductModal.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {activeProductModal.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300">
                    Color: <strong className="text-white">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {activeProductModal.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c.name ? "border-blue-500 scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300">
                    Size: <strong className="text-white">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProductModal.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedSize === s
                            ? "bg-white text-zinc-950 border-white font-bold"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => addToCart(activeProductModal, selectedColor, selectedSize)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag &bull; ${activeProductModal.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          CHECKOUT SIMULATOR MODAL
          ============================================================ */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderComplete(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Order <strong>#YNS-2026-9812</strong> has been placed. You will receive an instant tracking email when your package departs.
                </p>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderComplete(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerOrderSuccess();
                }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">Express Checkout</h3>
                  <p className="text-xs text-zinc-400">Total amount to charge: <strong className="text-blue-400 font-mono">${totalAmount.toFixed(2)}</strong></p>
                </div>

                <div className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Email for Order Receipt"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Delivery Street Address"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  />
                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                      <span>Simulated 1-Click Pay (Demo Mode)</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold">Encrypted</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Pay ${totalAmount.toFixed(2)} & Complete Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Storefront Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Your Next Store &bull; An Aura UX Business E-Commerce Template.</p>
        <Link href="/" className="text-blue-400 hover:underline">
          Return to Aura UX Template Hub
        </Link>
      </footer>
    </div>
  );
}
