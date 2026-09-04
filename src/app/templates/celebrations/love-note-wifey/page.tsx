"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, Heart, RefreshCw, CheckCircle2, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function LoveNoteWifeyPage() {
  const [currentScene, setCurrentScene] = useState(1);
  const totalScenes = 7;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#ff5a8a", "#ffb8d1", "#b79dfe", "#ffe08a", "#ff8fb5"],
    });
  };

  const handleNext = (nextStep: number) => {
    setCurrentScene(nextStep);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen bg-[#fff0f6] text-[#5a3a4e] font-sans relative overflow-x-hidden">
      {/* Background Radial Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-[#ffd6e8]/60 blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-[#e0c3fc]/50 blur-3xl" />
        <div className="absolute bottom-[10%] left-[40%] w-80 h-80 rounded-full bg-[#ffe5b4]/50 blur-3xl" />
      </div>

      {/* Doodle Floating Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-30 select-none">
        <span className="absolute top-10 left-8 text-4xl animate-[bounce_3.5s_easeInOut_infinite]">🌸</span>
        <span className="absolute top-24 right-12 text-3xl animate-pulse">✨</span>
        <span className="absolute top-1/2 left-6 text-4xl animate-[spin_25s_linear_infinite]">💕</span>
        <span className="absolute bottom-28 right-10 text-4xl animate-bounce">💖</span>
        <span className="absolute bottom-12 left-16 text-3xl">🎀</span>
      </div>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#fff0f6]/80 backdrop-blur-md border-b border-pink-200/60 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/templates/celebrations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Celebrations
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-xs font-bold text-pink-600">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Romantic Love Note Edition</span>
          </div>
          <button
            onClick={triggerConfetti}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Heart Pop</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Scene Stepper */}
      <main className="relative z-20 min-h-[85vh] flex items-center justify-center p-4 py-12">
        <AnimatePresence mode="wait">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 1: HII WIFEY */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-pink-500 shadow-[0_0_0_6px_#ffb8d1]" />
              <p className="text-pink-400 font-extrabold text-lg">psst...</p>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
                Hi wifey 💕
              </h1>

              <div className="py-2">
                <img
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop"
                  alt="Love Cute"
                  className="w-44 h-44 object-cover rounded-3xl mx-auto shadow-md border-4 border-white animate-[bounce_3s_easeInOut_infinite]"
                />
              </div>

              <p className="text-xl font-medium text-purple-800 leading-snug">
                got a sec?<br />made this just for you ~
              </p>

              <button
                onClick={() => handleNext(2)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-extrabold text-base shadow-[0_6px_0_#c94977] hover:translate-y-[-2px] active:translate-y-[4px] transition-all"
              >
                Open It 💌
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 2: YOU LOOK CUTE */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -3 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <p className="text-pink-400 font-extrabold text-lg">first thing first ~</p>

              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                alt="Cute Her"
                className="w-48 h-48 object-cover rounded-3xl mx-auto shadow-lg border-4 border-white rotate-2"
              />

              <h2 className="text-3xl font-extrabold text-pink-500 leading-tight">
                You look cute today.
              </h2>

              <p className="text-lg font-medium text-purple-800">
                (also yesterday. also tomorrow. yeah.)
              </p>

              <button
                onClick={() => handleNext(3)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 font-extrabold text-base shadow-[0_6px_0_#e8a93c] hover:translate-y-[-2px] active:translate-y-[4px] transition-all"
              >
                Aww, Next ☀️
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 3: MISSING YOU */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <img
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop"
                alt="Missing You"
                className="w-48 h-48 object-cover rounded-3xl mx-auto shadow-lg border-4 border-white animate-[bounce_4s_easeInOut_infinite]"
              />

              <h2 className="text-3xl font-extrabold text-pink-500 leading-tight">
                Missing you 🥺
              </h2>

              <p className="text-lg font-medium text-purple-800">
                even if i saw you<br />like 2 mins ago.
              </p>

              <button
                onClick={() => handleNext(4)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-300 to-purple-400 text-purple-950 font-extrabold text-base shadow-[0_6px_0_#8e7ad8] hover:translate-y-[-2px] active:translate-y-[4px] transition-all"
              >
                Same 💜
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 4: ARE YOU MINE */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <p className="text-pink-400 font-extrabold text-lg">quick question ~</p>

              <div className="w-24 h-24 rounded-full bg-pink-100 border-4 border-pink-300 text-5xl flex items-center justify-center mx-auto shadow-inner">
                🤔
              </div>

              <h2 className="text-3xl font-extrabold text-pink-500 leading-tight">
                Are you mine?
              </h2>

              <div className="space-y-2.5 pt-2">
                {["Yesss 💖", "Always 💜", "Forever 🥺", "Obviously 💍"].map((ans, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(5)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-extrabold text-sm shadow-md hover:scale-105 transition-transform"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 5: KISS */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 5 && (
            <motion.div
              key="scene5"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <p className="text-pink-400 font-extrabold text-lg">then take this ~</p>

              <div className="text-8xl select-none animate-bounce">
                💋
              </div>

              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                MUAH 💋
              </h2>

              <p className="text-lg font-medium text-purple-800">
                catch it before it<br />melts okay?
              </p>

              <button
                onClick={() => handleNext(6)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 font-extrabold text-base shadow-[0_6px_0_#e8a93c] hover:translate-y-[-2px] active:translate-y-[4px] transition-all"
              >
                Caught It 🫶
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 6: POLAROID FRAME */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 6 && (
            <motion.div
              key="scene6"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <p className="text-pink-400 font-extrabold text-lg">our little frame ~</p>

              <div className="bg-white p-3 pb-8 rounded-xl shadow-lg border border-pink-200 -rotate-2">
                <div className="aspect-square bg-pink-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop"
                    alt="Us Together"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-bold text-sm text-[#5a3a4e] mt-3">
                  us — always ~
                </p>
              </div>

              <h2 className="text-2xl font-extrabold text-pink-500">
                You + Me 🥹💕
              </h2>

              <p className="text-sm font-semibold text-purple-700">
                stay with me always okay?
              </p>

              <button
                onClick={() => handleNext(7)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-base shadow-[0_6px_0_#c94977] hover:translate-y-[-2px] active:translate-y-[4px] transition-all"
              >
                Okay 🥺
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* SCENE 7: HAPPY ENDING */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentScene === 7 && (
            <motion.div
              key="scene7"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[36px] border-4 border-pink-300 shadow-[0_0_0_6px_white,0_20px_50px_rgba(255,140,180,0.25)] p-8 sm:p-10 max-w-sm w-full text-center relative space-y-5"
            >
              <p className="text-pink-400 font-extrabold text-lg">yayyy ~ 🎀</p>

              <div className="text-7xl animate-bounce">
                🥳
              </div>

              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 leading-tight">
                That made me<br />so happy 🥹
              </h2>

              <p className="text-lg font-bold text-purple-800">
                love you sm wifey 💕
              </p>

              <button
                onClick={() => handleNext(1)}
                className="inline-flex items-center gap-2 text-xs font-bold text-pink-500 hover:underline pt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Card Again ↺
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Stepper Progress Dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 shadow-md flex items-center gap-2">
        {Array.from({ length: totalScenes }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentScene(idx + 1)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentScene === idx + 1
                ? "bg-pink-500 w-6 shadow-xs"
                : currentScene > idx + 1
                ? "bg-pink-300"
                : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
