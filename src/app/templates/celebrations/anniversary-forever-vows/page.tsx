"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Award, RefreshCw, CheckCircle2, PartyPopper } from "lucide-react";

const ALBUM_POLAROIDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    caption: "Our First Sunset 🌅",
    tilt: "-rotate-3",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    caption: "Hand In Hand 🤝",
    tilt: "rotate-2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    caption: "Unforgettable Moments ✨",
    tilt: "-rotate-2",
  },
];

export default function AnniversaryForeverVowsPage() {
  const [isRingBoxOpened, setIsRingBoxOpened] = useState(false);
  const [proposalAnswered, setProposalAnswered] = useState(false);

  const triggerFireworks = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#dcb166", "#ff5a8a", "#7a2538", "#ffffff", "#ffe08a"],
    });
  };

  const handleRingBoxClick = () => {
    setIsRingBoxOpened(true);
    triggerFireworks();
  };

  const handleAcceptProposal = () => {
    setProposalAnswered(true);
    triggerFireworks();
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#4a3540] font-sans relative overflow-x-hidden">
      {/* Ambient Radial Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-[#ffd6e8]/40 blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-[#dcb166]/20 blur-3xl" />
      </div>

      {/* Top Template Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#fffaf0]/90 backdrop-blur-md border-b border-[#dcb166]/40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs font-bold text-[#b98e3f] uppercase tracking-wider font-mono">
            Aura UX Template
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff5f1] border border-[#dcb166]/60 text-xs font-bold text-[#b98e3f]">
            <Sparkles className="w-3.5 h-3.5 text-[#dcb166]" />
            <span>Forever & Always Anniversary</span>
          </div>
          <button
            onClick={triggerFireworks}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#dcb166] to-[#7a2538] text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5 text-amber-200" />
            <span>Celebration Pop</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: POSTAL LOVE LETTER HERO */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center p-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#fffaf0] max-w-xl w-full p-8 sm:p-12 pl-14 sm:pl-20 shadow-2xl border border-[#dcb166]/30 -rotate-1 relative overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(180,140,100,0.12) 32px)",
          }}
        >
          {/* Red Margin Line */}
          <div className="absolute top-0 bottom-0 left-12 sm:left-14 w-0.5 bg-pink-400/40" />

          {/* Postal Stamps & Postmark Header */}
          <div className="absolute top-4 right-6 flex items-center gap-3">
            <div className="border-2 border-dashed border-[#7a2538] rounded-full p-2 w-20 h-20 flex flex-col items-center justify-center text-center text-[#7a2538] -rotate-12 bg-[#fffaf0]/90">
              <span className="text-[7px] font-mono uppercase tracking-widest font-bold">Postmark</span>
              <span className="text-xs font-serif font-extrabold my-0.5">FOREVER</span>
              <span className="text-[7px] font-mono">2026</span>
            </div>
            <div className="w-14 h-14 rounded bg-white p-1 shadow-md border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
                alt="Stamp"
                className="w-full h-full object-cover rounded-xs"
              />
            </div>
          </div>

          {/* Addressed To */}
          <div className="pt-6 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b98e3f] block">
              ✦ Sealed With Love ✦
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#5a3a4e] font-semibold mt-1">
              To: My Favorite Person 💕
            </h2>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#7a2538] leading-tight mb-6">
            What If We
            <br />
            Stay <em className="italic text-[#dcb166]">Forever?</em> 💍
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#4a3540] leading-relaxed font-light mb-8">
            Every day with you feels like a beautiful dream I never want to wake up from. From random coffee mornings to quiet midnight walks, choosing you has been the single best decision of my life.
          </p>

          <div className="text-right pt-4 border-t border-[#dcb166]/30">
            <p className="font-serif text-2xl font-bold italic text-[#7a2538]">— Yours Forever ✨</p>
            <span className="text-xs text-[#8b6f77]">Anniversary Edition</span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2: SAVE-THE-DATE INVITATION CARD */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 flex justify-center bg-[#fff5f1]/60">
        <div className="relative bg-[#fffaf0] p-8 sm:p-12 max-w-md w-full text-center shadow-2xl border-4 border-[#dcb166]/40 space-y-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#7a2538]">
            ✦ Special Announcement ✦
          </div>

          <p className="font-serif italic text-base text-[#8b6f77]">You are cordially invited to celebrate</p>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4a3540] leading-tight">
            Our Love Story
          </h2>

          <span className="font-serif text-4xl text-[#dcb166] italic block">&</span>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#7a2538] font-bold">
            Save The Date... Or Maybe Everyday 💍
          </h3>

          {/* Couple Photo Stamp */}
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-[#dcb166]">
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop"
              alt="Couple Stamp"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xs text-[#8b6f77] uppercase tracking-wider font-semibold">
            RSVP: 100% Yes · Forever & Always
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3: INTERACTIVE 3D VELVET RING BOX */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b98e3f]">
            💍 The Magic Box
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4a3540]">
            Open The Ring Box ✨
          </h2>
          <p className="text-xs sm:text-sm text-[#8b6f77]">Tap the velvet box below to open!</p>
        </div>

        {/* 3D Ring Box Container */}
        <div
          onClick={handleRingBoxClick}
          className="relative w-72 h-56 mx-auto cursor-pointer select-none group my-8"
          style={{ perspective: "1000px" }}
        >
          {/* Box Interior / Velvet Pillow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#b85b6f] to-[#7a2538] p-4 flex items-end justify-center shadow-2xl border border-amber-300/30 overflow-hidden">
            {/* Velvet Cushion */}
            <div className="w-full h-32 rounded-xl bg-gradient-to-b from-[#fffbf1] via-[#f0dcc0] to-[#dec4a0] shadow-inner flex items-center justify-center relative">
              {/* Ring Slot */}
              <div className="w-24 h-1.5 bg-[#5a1822] rounded-full absolute bottom-4 shadow-inner" />

              {/* Glowing Halo */}
              {isRingBoxOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  className="absolute w-28 h-28 rounded-full bg-amber-200/50 blur-md pointer-events-none"
                />
              )}

              {/* Sparkling Diamond Ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={isRingBoxOpened ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 0.4 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-7xl select-none filter drop-shadow-xl z-10"
              >
                💍
              </motion.div>
            </div>
          </div>

          {/* Lid (Swings Open 3D on Click) */}
          <motion.div
            animate={isRingBoxOpened ? { rotateX: -125 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#c26680] to-[#7a2538] border-2 border-amber-300/40 shadow-2xl flex items-center justify-center z-20 group-hover:brightness-105"
          >
            <div className="font-serif text-5xl italic text-[#dcb166] drop-shadow-md">
              A & S
            </div>
          </motion.div>
        </div>

        <p className="text-sm font-semibold text-[#7a2538]">
          {isRingBoxOpened ? "✨ Sparkling Diamond Ring Unveiled! ✨" : "Tap the box to open!"}
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 4: DRAFTED VOWS NOTEBOOK */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#f8f4fb] flex justify-center">
        <div className="relative bg-[#fdfbf6] p-8 sm:p-12 pl-16 sm:pl-20 max-w-xl w-full shadow-2xl border border-zinc-200 -rotate-1 space-y-6"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 35px, rgba(140,180,210,0.35) 36px)",
          }}
        >
          {/* Left Binder Holes */}
          <div className="absolute left-4 top-6 bottom-6 flex flex-col justify-between">
            {[1, 2, 3, 4, 5, 6].map((h) => (
              <div key={h} className="w-3.5 h-3.5 rounded-full bg-[#fffaf6] shadow-inner border border-zinc-300" />
            ))}
          </div>

          {/* Yellow Draft Tag */}
          <div className="absolute -top-4 right-6 bg-[#ffe08a] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#5a3a00] shadow-md rotate-3">
            Drafted Vows 📝
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#7a2538]">
            Our Lifetime Promises 💍
          </h2>

          <div className="space-y-4 font-serif text-base sm:text-lg text-[#4a3540] leading-loose">
            <p>✓ I promise to never eat the last slice of pizza without asking first.</p>
            <p>✓ I promise to hold your hand through every single high and low.</p>
            <p>✓ I promise to laugh at your silly jokes, even when I&apos;m tired.</p>
            <p>✓ I promise to love you more with every passing second of my life.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: FUTURE POLAROID ALBUM */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b98e3f]">
            📸 Future Album
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4a3540]">
            Milestones We Created 🎞️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ALBUM_POLAROIDS.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.04, rotate: 0 }}
              className={`bg-white p-3 pb-8 rounded-lg shadow-xl border border-zinc-200 relative ${p.tilt}`}
            >
              <div className="aspect-square bg-pink-50 rounded overflow-hidden">
                <img src={p.image} alt={p.caption} className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-serif text-sm font-bold text-[#4a3540] mt-3">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: PROPOSAL FINALE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 text-center max-w-xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b98e3f]">
          ✦ The Big Question ✦
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#7a2538] leading-tight">
          So... What If We Do This Forever? 💍
        </h2>

        {!proposalAnswered ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleAcceptProposal}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#dcb166] to-[#7a2538] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
            >
              YES! 💖
            </button>
            <button
              onClick={handleAcceptProposal}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#7a2538] to-[#c26680] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
            >
              A THOUSAND TIMES YES! 💍
            </button>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4 pt-4">
            <div className="text-6xl">🎉🥂💍</div>
            <h3 className="font-serif text-3xl font-bold text-[#7a2538]">
              Forever & Always Confirmed!
            </h3>
            <p className="text-sm text-[#8b6f77] font-semibold">
              Here&apos;s to a lifetime of love, laughter, and endless happiness together! 💕
            </p>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#7a2538] text-center text-white/70 text-xs space-y-2">
        <p className="font-serif text-base font-bold text-white">Forever & Always Anniversary · Aura UX Templates</p>
        <p className="text-[11px] text-white/50">Crafting digital experiences that feel as good as they look</p>
      </footer>
    </div>
  );
}
