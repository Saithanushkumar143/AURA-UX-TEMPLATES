"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, Heart, Send, Award, PartyPopper, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ChatMsg {
  id: number;
  sender: "me" | "bestie";
  text: string;
  time: string;
}

const INITIAL_CHAT: ChatMsg[] = [
  { id: 1, sender: "bestie", text: "are you awake??? i have emergency gossip 🚨", time: "2:44 AM" },
  { id: 2, sender: "me", text: "i was literally asleep but IM AWAKE NOW WHAT HAPPENED 😂", time: "2:45 AM" },
  { id: 3, sender: "bestie", text: "okay so remember that guy from coffee shop...", time: "2:46 AM" },
  { id: 4, sender: "me", text: "the one who ordered oat milk latte with 5 pumps of vanilla?! 🥛", time: "2:47 AM" },
  { id: 5, sender: "bestie", text: "YES. HE JUST LIKED MY INSTA POST FROM 2019 💀💀💀", time: "2:48 AM" },
];

const BESTIE_REASONS = [
  {
    num: "01",
    emoji: "🌙",
    title: "Replies at 3 AM",
    meta: "Even when literally falling asleep mid-text. Absolute legend behavior.",
    bgColor: "bg-amber-100 border-amber-200 text-amber-900",
    tapeColor: "bg-yellow-200/80",
    tilt: "-rotate-3",
  },
  {
    num: "02",
    emoji: "😂",
    title: "Laughs at my bad jokes",
    meta: "Or laughs AT me. Honestly impossible to tell, but I'll gladly take both.",
    bgColor: "bg-rose-100 border-rose-200 text-rose-900",
    tapeColor: "bg-rose-200/80",
    tilt: "rotate-2",
  },
  {
    num: "03",
    emoji: "🦄",
    title: "Being weird with me",
    meta: "Zero judgment, just matching louder and weirder energy every single day.",
    bgColor: "bg-emerald-100 border-emerald-200 text-emerald-900",
    tapeColor: "bg-emerald-200/80",
    tilt: "-rotate-2",
  },
  {
    num: "04",
    emoji: "🎤",
    title: "Hyping me up",
    meta: "Whenever I forget how amazing I am, you bring out the entire megaphone.",
    bgColor: "bg-purple-100 border-purple-200 text-purple-900",
    tapeColor: "bg-purple-200/80",
    tilt: "rotate-3",
  },
  {
    num: "05",
    emoji: "🍟",
    title: "Stealing my french fries",
    meta: "Never asked, never apologized. Truly iconic behavior honestly.",
    bgColor: "bg-orange-100 border-orange-200 text-orange-900",
    tapeColor: "bg-orange-200/80",
    tilt: "-rotate-3",
  },
  {
    num: "06",
    emoji: "💛",
    title: "Just being you",
    meta: "The world is 1000x brighter, sweeter, and funnier with you in it.",
    bgColor: "bg-blue-100 border-blue-200 text-blue-900",
    tapeColor: "bg-blue-200/80",
    tilt: "rotate-2",
  },
];

const POLAROIDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    caption: "Unfiltered Chaos ✨",
    tape: "bg-yellow-300/70 -rotate-12",
    tilt: "-rotate-3",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    caption: "Best Trip Ever 🚗",
    tape: "bg-rose-300/70 rotate-6",
    tilt: "rotate-2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
    caption: "Late Night Diner 🍟",
    tape: "bg-emerald-300/70 -rotate-6",
    tilt: "-rotate-2",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    caption: "Golden Hour Glow 🌅",
    tape: "bg-purple-300/70 rotate-12",
    tilt: "rotate-3",
  },
];

export default function BirthdayBestieScrapbookPage() {
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(INITIAL_CHAT);
  const [customReply, setCustomReply] = useState("");

  const triggerLoveShower = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#ff8c61", "#ffc857", "#c8b6ff", "#ff8fb5", "#74c69d"],
    });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReply.trim()) return;

    const newMsg: ChatMsg = {
      id: Date.now(),
      sender: "me",
      text: customReply,
      time: "Just Now",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setCustomReply("");

    // Auto bestie response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bestie",
          text: "HAHAHA YOU ARE TOO FUNNY 😭❤️ Happy Birthday Bestie!! 🎉",
          time: "Just Now",
        },
      ]);
      triggerLoveShower();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fffef7] text-[#3f2e2e] font-sans relative overflow-x-hidden">
      {/* Notebook Ruled Lines Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,200,87,0.15) 39px, rgba(255,200,87,0.15) 40px)",
        }}
      />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#fffef7]/90 backdrop-blur-md border-b border-[#f1e2c7] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/templates/celebrations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7b5e5e] hover:text-[#3f2e2e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Celebrations
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff7e2] border border-[#ffc857]/50 text-xs font-bold text-[#e26a3d]">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8c61]" />
            <span>Bestie Scrapbook Edition</span>
          </div>
          <button
            onClick={triggerLoveShower}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ffc857] to-[#ff8c61] text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Love Shower</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-20 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e2] border-2 border-dashed border-[#ffc857] text-xs font-bold uppercase tracking-widest text-[#3f2e2e]">
            <span>✦</span> A Thank-You Note · Don&apos;t Be Weird <span>✦</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-[#e26a3d]">okay so... 🫶</p>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            Thanks for being my
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c61] via-[#e26a3d] to-[#9f86eb]">
              closest friend
            </span>{" "}
            <span className="inline-block animate-bounce">💛</span>
          </h1>

          {/* Cute GIF Illustration */}
          <div className="py-4 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl bg-[#fff7e2] overflow-hidden flex items-center justify-center p-2">
                <img
                  src="https://media1.tenor.com/m/KUGbLzdDd9YAAAAC/bubu-dudu.gif"
                  alt="Bestie Hug"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -top-2 -right-2 text-3xl animate-spin">🌼</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#7b5e5e] max-w-md mx-auto leading-relaxed">
            I made this whole little website just to say it.
            <br />
            Cringe? Maybe. Earned? <em className="font-bold underline text-[#e26a3d]">Obviously.</em>
          </p>

          <div className="pt-2 text-xs font-semibold text-[#7b5e5e] flex flex-col items-center gap-1">
            <span>scroll down, you absolute legend</span>
            <span className="text-lg animate-bounce">↓</span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STICKY NOTE INTRO */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-8 px-4 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0 }}
          className="relative max-w-md w-full bg-gradient-to-b from-[#fff1b5] to-[#ffe08a] p-6 pb-8 rounded shadow-lg border border-[#e8a93c]/30 -rotate-2"
        >
          {/* Tape strip on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/80 border border-amber-900/10 shadow-sm -rotate-3" />
          
          <span className="text-xs font-extrabold uppercase text-[#e26a3d] block mb-1">heads up ~</span>
          <p className="text-lg sm:text-xl font-bold leading-relaxed text-[#3f2e2e]">
            This is gonna get a <em className="underline text-[#e26a3d]">little</em> mushy. You signed up for it the day you texted me first. 😌
          </p>
          <span className="text-xs font-semibold text-[#7b5e5e] block mt-3 text-right">— Management</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* EXHIBIT A: REASONS BENTO BOARD */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e26a3d]">
            — Exhibit A —
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3f2e2e]">
            A (Very Partial) List Of Reasons
          </h2>
          <p className="text-sm text-[#7b5e5e]">Things I would be completely miserable without</p>
        </div>

        {/* Bento Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {BESTIE_REASONS.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              className={`relative p-6 rounded-lg shadow-md border ${item.bgColor} ${item.tilt} transition-all cursor-default`}
            >
              {/* Tape */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 ${item.tapeColor} border border-black/5 shadow-xs`} />
              
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
                {item.meta}
              </p>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold opacity-30">
                NO. {item.num}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* POLAROID MEMORY WALL */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#fff7e2]/60 relative">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e26a3d]">
              📸 Photo Scrapbook
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3f2e2e]">
              Unfiltered Memory Wall 🎞️
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POLAROIDS.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                className={`bg-white p-3 pb-8 rounded shadow-lg border border-[#f1e2c7] relative ${p.tilt}`}
              >
                <div className={`absolute -top-3 ${p.tape} w-16 h-5 border border-black/5 shadow-xs z-10`} />
                <div className="aspect-square bg-[#fff7e2] rounded overflow-hidden">
                  <img src={p.image} alt={p.caption} className="w-full h-full object-cover" />
                </div>
                <p className="text-center font-bold text-xs sm:text-sm text-[#3f2e2e] mt-3">
                  {p.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* INSIDE JOKES & CHAT STREAM */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e26a3d]">
            💬 3 AM Chat Stream
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3f2e2e]">
            Our Inside-Joke Receipts 📱
          </h2>
        </div>

        {/* iMessage Style Window */}
        <div className="bg-white rounded-3xl border-2 border-[#f1e2c7] shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#fff7e2] to-[#ffe9b5] px-4 py-3 border-b-2 border-[#f1e2c7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff8c61]" />
              <span className="font-bold text-sm text-[#3f2e2e]">Bestie 💕</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              ● Online
            </span>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto bg-[#fffef7]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm font-semibold shadow-xs ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-[#ece3ff] to-[#d6c4ff] text-[#3f2e2e] rounded-br-none"
                      : "bg-gradient-to-r from-[#fff7e2] to-[#ffe9b5] text-[#3f2e2e] rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#7b5e5e] px-1 mt-0.5 opacity-60">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendChat} className="p-3 bg-[#fff7e2] border-t border-[#f1e2c7] flex gap-2">
            <input
              type="text"
              placeholder="Type a funny reply to bestie..."
              value={customReply}
              onChange={(e) => setCustomReply(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full text-xs bg-white border border-[#f1e2c7] text-[#3f2e2e] placeholder-zinc-400 focus:outline-none focus:border-[#ff8c61]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff8c61] to-[#e26a3d] text-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CERTIFICATE OF BESTIE-NESS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-b from-[#fffef7] to-[#fff7e2] border-4 double border-[#ffc857] p-8 sm:p-12 rounded-2xl shadow-xl relative">
          {/* Gold Wax Seal Badge */}
          <div className="absolute -top-8 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#ffd06a] to-[#e26a3d] text-white flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider text-center p-2 shadow-lg border-2 border-dashed border-white -rotate-12">
            <Award className="w-6 h-6 mb-0.5" />
            <span>Official Bestie Seal</span>
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#e26a3d]">
            ✦ Certificate of Excellence ✦
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3f2e2e] mt-2 mb-4">
            Bestie Of The Year
          </h2>

          <p className="text-sm sm:text-base text-[#7b5e5e] leading-relaxed max-w-md mx-auto font-medium">
            This certifies that <strong className="text-[#e26a3d] font-bold">Sarah</strong> has officially completed another spectacular year of being an absolute legend, irreplaceable confidante, and lifelong best friend.
          </p>

          <div className="w-48 h-0.5 bg-[#3f2e2e]/20 mx-auto my-6" />

          <div className="flex justify-between items-center text-xs font-bold text-[#7b5e5e] max-w-sm mx-auto">
            <div>
              <p className="font-serif italic text-lg text-[#e26a3d]">Alex ♡</p>
              <p className="text-[10px] uppercase">Awarded By</p>
            </div>
            <div>
              <p className="font-mono">FOREVER & ALWAYS</p>
              <p className="text-[10px] uppercase">Validity</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HANDWRITTEN LETTER FINALE & LOVE SHOWER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#fffef7] to-[#fff7e2] text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3f2e2e]">
            Happy Birthday Bestie! 🎉
          </h2>

          <p className="text-sm sm:text-base text-[#7b5e5e] leading-relaxed font-medium">
            No matter how old we get or how crazy life gets, I am so deeply grateful to walk through it all with you. Here&apos;s to another year of non-stop memories!
          </p>

          <button
            onClick={triggerLoveShower}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#ffc857] via-[#ff8c61] to-[#e26a3d] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Shower Sarah With Birthday Love</span>
            <Heart className="w-4 h-4 fill-white" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#3f2e2e] text-center text-white/60 text-xs space-y-2">
        <p className="font-bold text-white text-sm">Thanks Bestie 💛 · Aura UX Templates</p>
        <p className="text-[11px] text-white/40">Crafting digital experiences that feel as good as they look</p>
      </footer>
    </div>
  );
}
