"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, Heart, RefreshCw, CheckCircle2, PartyPopper } from "lucide-react";
import Link from "next/link";

interface ReasonCardItem {
  id: number;
  num: string;
  frontColor: string;
  frontEmoji: string;
  title: string;
  desc: string;
  image: string;
  tapeColor: string;
  tilt: string;
}

const REASONS_LIST: ReasonCardItem[] = [
  {
    id: 1,
    num: "1",
    frontColor: "from-pink-300 to-rose-400 text-white",
    frontEmoji: "💕",
    title: "Your Laugh",
    desc: "It is literally the instant cure to a bad day. Like a whole warm pharmacy of pure joy.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-pink-200/80",
    tilt: "-rotate-2",
  },
  {
    id: 2,
    num: "2",
    frontColor: "from-purple-300 to-indigo-400 text-white",
    frontEmoji: "🦋",
    title: "Your Warm Hugs",
    desc: "They make time stop a little. It's kinda magic... don't tell anyone!",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-purple-200/80",
    tilt: "rotate-3",
  },
  {
    id: 3,
    num: "3",
    frontColor: "from-amber-300 to-yellow-400 text-amber-950",
    frontEmoji: "⭐",
    title: "Tiny Details",
    desc: "You remember things I said weeks ago. Are you writing a secret book about me??",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-amber-200/80",
    tilt: "-rotate-3",
  },
  {
    id: 4,
    num: "4",
    frontColor: "from-emerald-300 to-teal-400 text-white",
    frontEmoji: "🌸",
    title: "How You Care",
    desc: "You check up on me when I'm quiet. You notice before I even say a single word.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-emerald-200/80",
    tilt: "rotate-2",
  },
  {
    id: 5,
    num: "5",
    frontColor: "from-orange-300 to-rose-400 text-white",
    frontEmoji: "🥐",
    title: "Food Adventures",
    desc: "Trying new cafes with you makes every meal taste 100x better.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-orange-200/80",
    tilt: "-rotate-2",
  },
  {
    id: 6,
    num: "6",
    frontColor: "from-blue-300 to-indigo-400 text-white",
    frontEmoji: "🌙",
    title: "3 AM Conversations",
    desc: "Talking about life, dreams, and silly thoughts until the sun starts coming up.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-blue-200/80",
    tilt: "rotate-3",
  },
  {
    id: 7,
    num: "7",
    frontColor: "from-rose-300 to-pink-500 text-white",
    frontEmoji: "💖",
    title: "My Safe Haven",
    desc: "Being around you feels like home, no matter where in the world we are.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-rose-200/80",
    tilt: "-rotate-1",
  },
  {
    id: 8,
    num: "8",
    frontColor: "from-fuchsia-300 to-purple-400 text-white",
    frontEmoji: "✨",
    title: "You Make Me Better",
    desc: "Your kindness and gentle heart inspire me to be a better person every day.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-fuchsia-200/80",
    tilt: "rotate-2",
  },
  {
    id: 9,
    num: "9",
    frontColor: "from-red-400 to-pink-600 text-white",
    frontEmoji: "💍",
    title: "Forever Yours",
    desc: "Choosing you today, tomorrow, and every single day for the rest of my life.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    tapeColor: "bg-[#ffd06a]/80",
    tilt: "-rotate-2",
  },
];

const CYCLING_MESSAGES = [
  "Love you to the moon & back! 🌙✨",
  "You are my favorite person in the universe! 🥺💖",
  "Forever and ever, no matter what! ♾️💕",
  "Best thing that ever happened to me! 🌸✨",
  "I am so deeply in love with you! 💍💓",
];

export default function ReasonsLoveJarPage() {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff8fb5", "#9d8de4", "#ffb088", "#ffd06a", "#6fcf97"],
    });
  };

  const handleCardClick = (id: number) => {
    if (!flippedIds.includes(id)) {
      setFlippedIds((prev) => [...prev, id]);
      triggerConfetti();
    } else {
      setFlippedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleHeartTap = () => {
    setMessageIndex((prev) => (prev + 1) % CYCLING_MESSAGES.length);
    triggerConfetti();
  };

  const progressPercent = Math.round((flippedIds.length / REASONS_LIST.length) * 100);

  return (
    <div className="min-h-screen bg-[#fffaf6] text-[#3a2138] font-sans relative overflow-x-hidden">
      {/* Radial Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[6%] w-96 h-96 rounded-full bg-[#ffe5ec]/70 blur-3xl" />
        <div className="absolute top-[25%] right-[6%] w-[420px] h-[420px] rounded-full bg-[#efe7ff]/70 blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#fff1dc]/60 blur-3xl" />
      </div>

      {/* Top Template Navigation */}
      <header className="sticky top-0 z-40 bg-[#fffaf6]/90 backdrop-blur-md border-b border-[#ffd3da] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/templates/celebrations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6e5a6e] hover:text-[#3a2138] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Celebrations
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe5ec] border border-[#ff5a8a]/30 text-xs font-bold text-[#ff5a8a]">
            <Heart className="w-3.5 h-3.5 fill-[#ff5a8a]" />
            <span>Reasons Love Jar Edition</span>
          </div>
          <button
            onClick={triggerConfetti}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff5a8a] to-[#9d8de4] text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Love Pop</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-12 px-4 text-center max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#ff8fa3] to-[#ff5a8a] text-white text-xs font-bold uppercase tracking-widest shadow-md">
            a list. for u. only u.
          </span>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a8a] via-[#9d8de4] to-[#ffb088]">
              Reasons
            </span>
            <br />
            Why I Love <em className="italic text-[#ff5a8a]">You</em> 💖
          </h1>

          <div className="py-2">
            <img
              src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop"
              alt="Love Bear"
              className="w-44 h-44 object-cover rounded-full mx-auto shadow-xl border-4 border-white animate-[bounce_3.5s_easeInOut_infinite]"
            />
          </div>

          <p className="text-base sm:text-lg text-[#6e5a6e] max-w-md mx-auto leading-relaxed">
            I sat down. I counted. It took a while.
            <br />
            <strong className="text-[#ff5a8a]">There&apos;s like a million reasons okay,</strong> here are some 🥹
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STICKY HEART-JAR PROGRESS COUNTER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="sticky top-14 z-30 max-w-md mx-auto px-4 mb-8">
        <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-full border-2 border-[#ffd3da] shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl relative">
              <Heart className="w-8 h-8 text-pink-200 fill-pink-100" />
              <Heart
                className="w-8 h-8 text-[#ff5a8a] fill-[#ff5a8a] absolute inset-0 transition-all duration-500"
                style={{ clipPath: `inset(${100 - progressPercent}% 0 0 0)` }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c94977] block">
                Reasons Unlocked
              </span>
              <span className="text-sm font-extrabold text-[#3a2138]">
                <strong className="text-[#ff5a8a] text-lg">{flippedIds.length}</strong> / {REASONS_LIST.length}{" "}
                <span className="text-xs text-[#6e5a6e] font-normal">(and infinite)</span>
              </span>
            </div>
          </div>

          <div className="w-20 h-2.5 rounded-full bg-pink-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff8fa3] to-[#ff5a8a] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE 3D REASONS FLIP GRID */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-8 px-4 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9d8de4]">
            ~ How This Works ~
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3a2138]">
            Tap Each Card Slowly. 🥺
          </h2>
          <p className="text-xs sm:text-sm text-[#6e5a6e]">Don&apos;t rush... and please don&apos;t pretend you aren&apos;t smiling!</p>
        </div>

        {/* 3D Flip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {REASONS_LIST.map((card) => {
            const isFlipped = flippedIds.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`relative aspect-[1/1.05] cursor-pointer transition-transform duration-500 select-none ${card.tilt}`}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT FACE */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.frontColor} border-4 border-white shadow-xl p-6 flex flex-col items-center justify-center text-center space-y-2`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="absolute top-3 right-4 text-xl">{card.frontEmoji}</span>
                    <span className="font-serif text-6xl font-bold drop-shadow-sm">{card.num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                      Tap Me ✨
                    </span>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white border-4 border-white shadow-xl p-4 text-center flex flex-col justify-between items-center text-[#3a2138]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {/* Tape */}
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 ${card.tapeColor} border border-black/5 shadow-xs`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5a8a] pt-1">
                      № 0{card.num}
                    </span>

                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-16 h-16 object-cover rounded-full shadow-sm border border-pink-200"
                    />

                    <div>
                      <h3 className="font-extrabold text-base text-[#ff5a8a]">{card.title}</h3>
                      <p className="text-xs text-[#6e5a6e] font-medium leading-tight mt-1 px-1">
                        {card.desc}
                      </p>
                    </div>

                    <span className="text-[9px] font-bold text-[#9d8de4] uppercase tracking-wider">
                      Unlocked 💕
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HEART-TAP FINALE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 text-center max-w-xl mx-auto space-y-6">
        <span className="px-4 py-1 rounded-full bg-[#efe7ff] text-[#9d8de4] text-xs font-bold uppercase tracking-widest">
          ✦ One Last Thing ✦
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3a2138]">
          Tap The Heart 💖
        </h2>

        {/* Pulsing Interactive Heart */}
        <div className="py-4">
          <button
            onClick={handleHeartTap}
            className="text-8xl sm:text-9xl select-none inline-block hover:scale-110 active:scale-95 transition-transform animate-[bounce_2s_easeInOut_infinite] filter drop-shadow-xl cursor-pointer"
          >
            💖
          </button>
        </div>

        {/* Cycling Love Message */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#ffd3da] shadow-lg max-w-md mx-auto">
          <p className="text-lg sm:text-xl font-bold text-[#ff5a8a]">
            {CYCLING_MESSAGES[messageIndex]}
          </p>
          <span className="text-xs text-[#6e5a6e] block mt-2">
            (Tap the heart again for another message!)
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#3a2138] text-center text-white/60 text-xs space-y-2">
        <p className="font-bold text-white text-sm">Reasons Why I Love You · Aura UX Templates</p>
        <p className="text-[11px] text-white/40">Crafting digital experiences that feel as good as they look</p>
      </footer>
    </div>
  );
}
