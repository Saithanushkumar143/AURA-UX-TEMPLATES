"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Gift, Tag, Check, RefreshCw, ChevronRight, PartyPopper } from "lucide-react";

interface Coupon {
  id: number;
  title: string;
  desc: string;
  stamp: string;
  icon: string;
  bgColor: string;
  redeemed: boolean;
}

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 1,
    title: "1x Free Coffee & Gossip Session ☕",
    desc: "Redeemable anytime you need a warm latte and a 2-hour vent session.",
    stamp: "UNLIMITED REFills",
    icon: "☕",
    bgColor: "bg-pink-100 border-pink-300 text-pink-900",
    redeemed: false,
  },
  {
    id: 2,
    title: "1x Movie & Snack Picker 🍿",
    desc: "You get full control over the TV remote & popcorn seasoning. Zero complaints allowed!",
    stamp: "VIP PASS",
    icon: "🍿",
    bgColor: "bg-[#fff1c7] border-amber-300 text-amber-900",
    redeemed: false,
  },
  {
    id: 3,
    title: "1x Midnight Pizza Delivery 🍕",
    desc: "12 AM hunger strike? Tap redeem and hot gourmet pizza will arrive at your doorstep.",
    stamp: "FREE DELIVERY",
    icon: "🍕",
    bgColor: "bg-emerald-100 border-emerald-300 text-emerald-900",
    redeemed: false,
  },
  {
    id: 4,
    title: "1x Weekend Road Trip Adventure 🚗",
    desc: "Pack your bag! We're driving to the beach or mountains for an epic weekend getaway.",
    stamp: "ALL EXPENSES PAID",
    icon: "🚗",
    bgColor: "bg-purple-100 border-purple-300 text-purple-900",
    redeemed: false,
  },
];

const POLAROIDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
    caption: "Birthday Magic 🎂",
    rotation: "-rotate-6",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
    caption: "Celebration Confetti 🎉",
    rotation: "rotate-4",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?q=80&w=800&auto=format&fit=crop",
    caption: "Laughter & Sunsets 🌅",
    rotation: "-rotate-3",
  },
];

export default function BirthdaySurpriseBoxPage() {
  const [activeScene, setActiveScene] = useState(1);
  const [isLidOpened, setIsLidOpened] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const triggerConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff8fb5", "#ff5a8a", "#ffe08a", "#b79dfe", "#6fcfa5"],
    });
  };

  const handleOpenBox = () => {
    setIsLidOpened(true);
    triggerConfetti();
    setTimeout(() => {
      setActiveScene(2);
    }, 1200);
  };

  const handleRedeemCoupon = (id: number) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
    triggerConfetti();
  };

  const handleRestart = () => {
    setActiveScene(1);
    setIsLidOpened(false);
    setCoupons(INITIAL_COUPONS);
  };

  return (
    <div className="min-h-screen bg-[#fff8fb] text-[#5a3a4e] font-sans relative overflow-x-hidden">
      {/* Ambient Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[8%] w-72 h-72 rounded-full bg-[#ffe5f0]/60 blur-3xl" />
        <div className="absolute top-[20%] right-[8%] w-80 h-80 rounded-full bg-[#fff1c7]/60 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-96 h-96 rounded-full bg-[#e8deff]/60 blur-3xl" />
      </div>

      {/* Floating Decor Items */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 opacity-30 select-none">
        <span className="absolute top-12 left-8 text-4xl animate-[bounce_4s_easeInOut_infinite]">🎀</span>
        <span className="absolute top-28 right-12 text-3xl animate-pulse">✨</span>
        <span className="absolute top-1/2 left-6 text-4xl animate-[spin_20s_linear_infinite]">🌸</span>
        <span className="absolute bottom-24 right-10 text-4xl animate-bounce">🎁</span>
        <span className="absolute bottom-12 left-16 text-3xl">💖</span>
      </div>

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#fff8fb]/80 backdrop-blur-md border-b border-pink-200/50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider font-mono">
            Aura UX Template
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 border border-pink-300/60 text-xs font-extrabold text-pink-600">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>Interactive Unboxing Surprise</span>
          </div>
          <button
            onClick={triggerConfetti}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Sparkles</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Scene Container */}
      <main className="relative z-20 min-h-[85vh] flex items-center justify-center p-4 py-12">
        <AnimatePresence mode="wait">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 1: WRAPPED GIFT BOX */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-xl w-full space-y-6"
            >
              <span className="text-pink-500 font-extrabold text-lg sm:text-xl">
                psstttt ~ 🤫
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 leading-tight">
                A Tiny Surprise<br />For You 🎁
              </h1>
              <p className="text-purple-700 text-sm sm:text-base font-semibold">
                (don&apos;t ask why, just tap to open it.)
              </p>

              {/* 3D CSS Gift Box */}
              <div
                onClick={handleOpenBox}
                className="relative w-64 h-64 mx-auto cursor-pointer group my-8 select-none"
              >
                {/* Gift Base Box */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-44 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-xl border-b-4 border-pink-700 overflow-hidden">
                  {/* Vertical Ribbon */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-amber-200 to-amber-400" />
                  {/* Horizontal Ribbon */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-amber-200 to-amber-400" />
                </div>

                {/* Gift Lid & Bow (Lifts on Open) */}
                <motion.div
                  animate={
                    isLidOpened
                      ? { y: -180, rotate: -25, opacity: 0 }
                      : { y: [0, -4, 0] }
                  }
                  transition={
                    isLidOpened
                      ? { duration: 0.9, ease: "easeOut" }
                      : { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }
                  className="absolute top-10 left-1/2 -translate-x-1/2 w-60 z-10"
                >
                  {/* Lid */}
                  <div className="w-60 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg relative border-b-2 border-pink-700">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-amber-200 to-amber-400" />
                  </div>
                  {/* Bow */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-20 h-8 flex justify-center items-center">
                    <div className="w-9 h-7 bg-amber-300 rounded-full rotate-[-20deg] shadow-sm" />
                    <div className="w-9 h-7 bg-amber-300 rounded-full rotate-[20deg] shadow-sm -ml-2" />
                    <div className="absolute w-6 h-6 rounded-full bg-amber-400 shadow-sm" />
                  </div>
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-pink-400/20 blur-xl group-hover:bg-pink-400/40 transition-all pointer-events-none" />
              </div>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-extrabold text-pink-500 animate-pulse">
                  Tap the box ↑
                </p>
                <p className="text-xs font-bold text-purple-400">
                  (it&apos;s gonna explode in cuteness)
                </p>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 2: HANGING GIFT TAG */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-lg w-full space-y-6"
            >
              <span className="text-pink-400 text-sm font-bold uppercase tracking-widest">
                first... read the tag ✦
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-pink-500">
                Look — there&apos;s a tag 🏷️
              </h2>

              {/* Hanging Tag */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-14 bg-purple-400 rounded" />
                <motion.div
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="bg-[#fffaf0] p-6 sm:p-8 rounded-2xl border-2 border-dashed border-pink-300 shadow-xl relative max-w-sm w-full text-left space-y-4"
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-400 bg-white absolute top-4 left-4" />
                  
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block text-center border-b border-dashed border-pink-200 pb-2">
                    ✦ Handle With Care ✦
                  </span>

                  <div className="space-y-1">
                    <span className="text-xs text-purple-500 font-semibold block">Contains:</span>
                    <p className="text-xl sm:text-2xl font-extrabold text-pink-600 leading-tight">
                      One tiny piece of my heart 💕
                    </p>
                  </div>

                  <div className="border-t border-dashed border-pink-200 pt-2 space-y-1">
                    <span className="text-xs text-purple-500 font-semibold block">Warning:</span>
                    <p className="text-lg font-bold text-purple-700 leading-tight">
                      May cause too much smiling 🥹
                    </p>
                  </div>

                  <p className="text-xs text-purple-600 italic text-center pt-2">
                    &ldquo;open with extra love okay 🤭&rdquo;
                  </p>
                </motion.div>
              </div>

              <button
                onClick={() => setActiveScene(3)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <span>Okay, Open It</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 3: LIFT THE LID */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-lg w-full space-y-6"
            >
              <div className="w-48 h-48 mx-auto rounded-full bg-[#ffe5f0] border-4 border-white shadow-xl overflow-hidden p-2 flex items-center justify-center">
                <img
                  src="https://media.tenor.com/QNrJ7dG-ZUkAAAAi/bubu-dudu.gif"
                  alt="Curious"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-500">
                  Unwrapping Magic... ✨
                </h2>
                <p className="text-sm sm:text-base text-purple-700 font-semibold max-w-xs mx-auto">
                  Inside this box are redeemable Golden Love Coupons and memories curated just for you!
                </p>
              </div>

              <button
                onClick={() => setActiveScene(4)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <span>Explore What&apos;s Inside 🎁</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 4: NOTEPAD LOVE COUPONS */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl w-full space-y-6 text-center"
            >
              {/* Notepad Container */}
              <div className="bg-white rounded-2xl shadow-2xl border border-pink-200 p-6 sm:p-8 relative overflow-hidden text-left">
                {/* Clip at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-400 rounded-b-lg shadow-md flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber-300 border border-amber-500" />
                </div>

                {/* Left Margin Line */}
                <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-pink-300/40" />

                <div className="pt-4 pb-4 border-b-2 border-dashed border-pink-200 text-center pl-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-500">
                    Birthday Love Coupons 🎟️
                  </h2>
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    ✦ Redeemable Anytime · No Expiry ✦
                  </p>
                </div>

                <div className="py-4 space-y-4 pl-6">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 ${coupon.bgColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{coupon.icon}</span>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                            {coupon.title}
                          </h3>
                          <p className="text-xs opacity-80 mt-0.5">{coupon.desc}</p>
                        </div>
                      </div>

                      {coupon.redeemed ? (
                        <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" /> REDEEMED
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRedeemCoupon(coupon.id)}
                          className="px-3 py-1.5 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                        >
                          Redeem ✨
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveScene(5)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <span>View Memory Moments 📸</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 5: POLAROID STACK */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 5 && (
            <motion.div
              key="scene5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl w-full space-y-6 text-center"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
                  📸 Moments We Cherish
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-pink-500">
                  Taped Polaroid Gallery 🎞️
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
                {POLAROIDS.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className={`bg-white p-3 pb-8 rounded-lg shadow-xl border border-pink-100 relative ${p.rotation}`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/80 border border-black/5 shadow-xs" />
                    <div className="aspect-square bg-pink-50 rounded overflow-hidden">
                      <img src={p.image} alt={p.caption} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-bold text-xs text-[#5a3a4e] mt-3">
                      {p.caption}
                    </p>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setActiveScene(6)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <span>Final Birthday Wish Card 💌</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 6: WISH CARD FINALE */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeScene === 6 && (
            <motion.div
              key="scene6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full text-center space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 border-4 border-pink-300 shadow-2xl space-y-4 relative">
                <div className="w-12 h-12 rounded-full bg-amber-300 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-md -mt-12 border-2 border-white">
                  ✦
                </div>

                <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400 block">
                  💌 A Tiny Wish Card
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-500">
                  Happy Birthday Sarah! 🎂✨
                </h2>

                <p className="text-sm sm:text-base text-purple-800 font-medium leading-relaxed">
                  May your day be filled with endless smiles, sweet surprises, good food, and all the love in the universe. You deserve the absolute best today and every day! 💕
                </p>

                <div className="pt-4">
                  <button
                    onClick={triggerConfetti}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <PartyPopper className="w-4 h-4" />
                    <span>Blow Birthday Confetti Again</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-pink-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Replay Unboxing Surprise
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Stepper Progress Dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 shadow-md flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <button
            key={s}
            onClick={() => setActiveScene(s)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeScene === s
                ? "bg-pink-500 w-6 shadow-xs"
                : activeScene > s
                ? "bg-pink-300"
                : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
