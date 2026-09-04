"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Play,
  Pause,
  X,
  PartyPopper,
  Flame,
  CheckCircle2,
  XCircle,
  Ticket,
  Award,
  ChevronRight,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Sarah's all-time favorite feel-good movie?",
    options: ["The Notebook", "Titanic", "La La Land", "Interstellar"],
    correctIndex: 2,
    explanation: "Spot on! La La Land's soundtrack is constantly playing on loop! 🎷🎶",
  },
  {
    id: 2,
    question: "Which dream destination is at the top of Sarah's bucket list?",
    options: ["Paris, France", "Tokyo, Japan", "New York, USA", "Santorini, Greece"],
    correctIndex: 3,
    explanation: "Yes! White domes and Aegean sunsets are calling her name! 🌅🇬🇷",
  },
  {
    id: 3,
    question: "What is Sarah's undeniable midnight comfort food?",
    options: ["Gourmet Pizza", "Spicy Ramen", "Fresh Sushi", "Chipotle Tacos"],
    correctIndex: 0,
    explanation: "Correct! Extra cheese and fresh basil every single time! 🍕🧀",
  },
  {
    id: 4,
    question: "What is Sarah's secret superpower talent?",
    options: ["Canvas Painting", "Operatic Singing", "Salsa Dancing", "Speed Coding"],
    correctIndex: 0,
    explanation: "Absolutely! Her acrylic landscapes belong in an art gallery! 🎨✨",
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    caption: "Golden Hour Vibes",
    tag: "Travel",
    rotation: "-rotate-2",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    caption: "Always Smiling",
    tag: "Candids",
    rotation: "rotate-2 mt-4",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    caption: "Summer Getaway '23",
    tag: "Vacation",
    rotation: "-rotate-1",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    caption: "Celebration Night",
    tag: "Party",
    rotation: "rotate-3 mt-2",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    caption: "Coffee & Good Conversations",
    tag: "Candids",
    rotation: "rotate-1 md:col-span-2",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    caption: "Unforgettable Moments",
    tag: "Travel",
    rotation: "-rotate-2 mt-3",
  },
];

const TIMELINE_EVENTS = [
  {
    year: "2019",
    title: "The First Hello ☕",
    description: "A chance meeting over warm lattes that sparked an unbreakable bond of laughter, late-night talks, and endless shared secrets.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: "2021",
    title: "Graduation Victory 🎓",
    description: "Cheering at the top of our lungs as you walked across that stage! Proof that hard work, passion, and brilliance always win.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: "2023",
    title: "The Coastal Road Trip 🏖️",
    description: "3 days, infinite playlists, wrong turns that led to secret beaches, and watching the sunset together over the ocean.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: "Today",
    title: "Your Extraordinary Milestone 🥂🎂",
    description: "Celebrating the radiant, inspiring, and beautiful soul you are. Here's to stepping into your boldest, happiest chapter yet!",
  },
];

export default function BirthdayLuxCelebrationPage() {
  // Candle state
  const [candlesLit, setCandlesLit] = useState(true);
  const [blownCount, setBlownCount] = useState(0);

  // Typewriter Letter state
  const letterFullText =
    "Dearest Sarah — where do I even begin? Every single moment spent with you has been a treasure I hold close to my heart. Watching you grow, shine, and overcome every obstacle with grace has been pure inspiration. You make every room warmer just by stepping into it. Today, the world celebrates YOU! May your year ahead be overflowing with boundless joy, dream adventures, and magical surprises.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Audio / Voice note player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Polaroid Modal
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Grand Reveal State
  const [isSurpriseRevealed, setIsSurpriseRevealed] = useState(false);

  // Trigger Confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f9a0b0", "#c9a0c8", "#fde8ef", "#ffd700", "#ff6b8b"],
    });
  };

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= letterFullText.length) {
        setDisplayedText(letterFullText.slice(0, index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Audio Equalizer Simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  // Blow out candles handler
  const handleBlowCandles = () => {
    setCandlesLit(false);
    setBlownCount((prev) => prev + 1);
    triggerConfetti();
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
  };

  // Quiz Option Click
  const handleSelectOption = (index: number) => {
    if (answerSubmitted) return;
    setSelectedOption(index);
    setAnswerSubmitted(true);
    if (index === QUIZ_QUESTIONS[currentQIndex].correctIndex) {
      setScore((prev) => prev + 1);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setAnswerSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] text-[#2a1f2e] font-sans relative overflow-x-hidden selection:bg-[#f9a0b0]/30">
      {/* Background Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Animated Balloons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[4%] text-5xl opacity-40 select-none"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[18%] right-[6%] text-4xl opacity-35 select-none"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] left-[5%] text-4xl opacity-30 select-none"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [0, -28, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[35%] right-[5%] text-5xl opacity-25 select-none"
        >
          🌸
        </motion.div>
      </div>

      {/* Top Template Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#fdf8f3]/80 backdrop-blur-md border-b border-[#c9a0c8]/20 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs font-bold text-[#c9a0c8] uppercase tracking-wider font-mono">
            Aura UX Template
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fde8ef] border border-[#f9a0b0]/40 text-xs font-semibold text-[#c9a0c8]">
            <Sparkles className="w-3.5 h-3.5 text-[#f9a0b0]" />
            <span>Aura Luxe Birthday Experience</span>
          </div>
          <button
            onClick={triggerConfetti}
            className="px-3.5 py-1.5 rounded-full bg-[#2a1f2e] text-white text-xs font-medium hover:bg-[#c9a0c8] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PartyPopper className="w-3.5 h-3.5 text-pink-300" />
            <span>Confetti Pop</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 text-center overflow-hidden bg-radial-gradient">
        {/* Soft Ambient Radial Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#f9a0b0]/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#c9a0c8]/25 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          {/* Top Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#c9a0c8]/40 shadow-sm text-xs font-medium tracking-widest text-[#c9a0c8] uppercase"
          >
            <span>🎂</span>
            <span>It&apos;s Your Special Day</span>
            <span>🎂</span>
          </motion.div>

          {/* Birthday Cake & Candles */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative py-4"
          >
            {/* Flames row */}
            <div className="flex justify-center items-center gap-3 mb-2 min-h-[32px]">
              {[1, 2, 3, 4, 5].map((candleIndex) => (
                <div key={candleIndex} className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ repeat: Infinity, duration: 0.6 + candleIndex * 0.1 }}
                        className="text-lg filter drop-shadow-[0_0_8px_rgba(255,180,50,0.8)]"
                      >
                        🕯️
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 0.6, y: -10 }}
                        className="text-xs text-zinc-400 font-mono"
                      >
                        💨
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bouncing Cake */}
            <div className="text-7xl sm:text-8xl select-none animate-[bounce_3s_easeInOut_infinite]">
              🎂
            </div>
          </motion.div>

          {/* Headline Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#2a1f2e] leading-none"
          >
            Happy <em className="italic text-[#c9a0c8]">Birthday,</em>
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2a1f2e] via-[#c9a0c8] to-[#f9a0b0]">
              Sarah
            </span>{" "}
            🥳
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-[#8a7a8d] max-w-lg mx-auto font-light leading-relaxed"
          >
            🎉 Today the whole world pauses for a beautiful moment — just to celebrate the extraordinary, radiant, and irreplaceable soul you are. 🎊
          </motion.p>

          {/* Candle Blow Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2a1f2e] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#c9a0c8] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#2a1f2e]/10"
              >
                <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                Make a Wish & Blow Candles 🌬️
              </button>
            ) : (
              <button
                onClick={handleRelightCandles}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fde8ef] border border-[#f9a0b0]/50 text-[#2a1f2e] text-xs font-semibold uppercase hover:bg-[#f9a0b0]/20 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#f9a0b0]" />
                Relight Candles ✨ (Blown {blownCount}x)
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Decorative Bunting Banner */}
      <div className="flex justify-center gap-2 py-4 overflow-hidden max-w-xl mx-auto opacity-80">
        {["🎂", "🎈", "🎁", "🥳", "🎉", "🎊", "🍰", "🎈", "🎂", "🎁"].map((emoji, idx) => (
          <div
            key={idx}
            className="w-9 h-11 rounded-b-xl bg-[#fde8ef] border border-[#f9a0b0]/30 flex items-center justify-center text-sm shadow-sm animate-[bounce_2.5s_easeInOut_infinite]"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HEARTFELT LETTER & VOICE NOTE SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#fde8ef]/60 relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a0c8]">
              💌 A Birthday Message
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2a1f2e] font-light">
              Words From The <em className="italic text-[#c9a0c8]">Heart</em> 💝
            </h2>
          </div>

          {/* Letter Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#f9a0b0]/10 border border-[#f9a0b0]/20 relative overflow-hidden">
            <div className="absolute top-4 left-6 text-9xl font-serif text-[#c9a0c8]/10 pointer-events-none select-none">
              “
            </div>

            {/* Typewriter text */}
            <p className="font-serif text-xl sm:text-2xl text-[#2a1f2e] leading-relaxed font-light min-h-[160px] relative z-10">
              {displayedText}
              {!isTypingComplete && <span className="inline-block w-0.5 h-6 bg-[#c9a0c8] animate-pulse ml-1" />}
            </p>

            {/* Letter Footer */}
            <div className="mt-8 pt-6 border-t border-[#c9a0c8]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8a7a8d]">With all my love,</p>
                <p className="font-serif text-2xl italic text-[#c9a0c8] font-medium">— Alex ✨</p>
              </div>

              {/* Voice Note Pill Player */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-full sm:w-auto inline-flex items-center gap-4 px-5 py-3 rounded-full bg-[#fdf8f3] border border-[#c9a0c8]/40 hover:bg-[#ede8f9] transition-all shadow-sm group"
              >
                <div className="w-9 h-9 rounded-full bg-[#2a1f2e] text-white flex items-center justify-center group-hover:bg-[#c9a0c8] transition-colors">
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-[#8a7a8d]">
                    Voice Note · {isPlayingAudio ? `${audioProgress}%` : "0:15"}
                  </div>
                  {/* Equalizer Bar Animation */}
                  <div className="flex items-center gap-1 h-4 mt-1">
                    {[12, 18, 8, 22, 14, 20, 10, 16].map((height, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-[#c9a0c8] rounded-full transition-all"
                        style={{
                          height: isPlayingAudio ? `${Math.max(4, (height + audioProgress) % 22)}px` : "4px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* POLAROID MEMORY LANE GALLERY */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a0c8]">
            📸 Birthday Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2a1f2e] font-light">
            A Walk Down <em className="italic text-[#c9a0c8]">Memory Lane</em> 🎞️
          </h2>
          <p className="text-xs sm:text-sm text-[#8a7a8d]">Tap any polaroid photo to enlarge & view details</p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`bg-white p-3 pb-8 rounded-lg shadow-md border border-[#c9a0c8]/20 cursor-pointer transition-all ${photo.rotation}`}
            >
              <div className="relative aspect-square rounded overflow-hidden bg-[#fde8ef]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover filter contrast-[1.02]"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-medium">
                  {photo.tag}
                </span>
              </div>
              <p className="text-center font-sans text-xs text-[#8a7a8d] mt-3 font-medium">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#2a1f2e]/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-6 rounded-2xl max-w-lg w-full relative shadow-2xl space-y-3"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-zinc-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-[360px] object-cover rounded-xl"
              />
              <div className="text-center space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#fde8ef] text-[#c9a0c8] text-[10px] font-semibold uppercase">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-serif text-xl font-light text-[#2a1f2e]">{selectedPhoto.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* OUR STORY TIMELINE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#ede8f9]/50 relative">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a0c8]">
              🎗️ Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2a1f2e] font-light">
              Life&apos;s Greatest <em className="italic text-[#c9a0c8]">Chapters</em> 📖
            </h2>
          </div>

          <div className="relative pl-8 space-y-10 border-l-2 border-[#c9a0c8]/40">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#c9a0c8] group-hover:bg-[#c9a0c8] group-hover:scale-125 transition-all shadow-sm" />
                <span className="text-xs font-semibold text-[#c9a0c8] uppercase tracking-wider">
                  {event.year}
                </span>
                <h3 className="font-serif text-2xl text-[#2a1f2e] font-normal mt-0.5">
                  {event.title}
                </h3>
                <p className="text-sm text-[#8a7a8d] leading-relaxed mt-1 font-light">
                  {event.description}
                </p>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-48 h-32 object-cover rounded-xl mt-3 shadow-md border border-white"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE BIRTHDAY TRIVIA QUIZ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a0c8]">
            🧁 Birthday Quiz
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2a1f2e] font-light">
            How Well Do You <em className="italic text-[#c9a0c8]">Know Sarah?</em> 🤔
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-[#c9a0c8]/30 shadow-xl overflow-hidden">
          {/* Header Progress Bar */}
          <div className="bg-[#fde8ef] px-6 py-4 flex items-center justify-between border-b border-[#f9a0b0]/20">
            <div className="text-xs font-medium text-[#8a7a8d]">
              Question <span className="text-[#2a1f2e] font-semibold">{currentQIndex + 1}</span> of {QUIZ_QUESTIONS.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-serif font-semibold text-[#2a1f2e]">
              <Award className="w-4 h-4 text-[#c9a0c8]" />
              <span>Score: {score}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            {!quizFinished ? (
              <>
                <h3 className="font-serif text-2xl text-[#2a1f2e] font-light leading-snug">
                  {QUIZ_QUESTIONS[currentQIndex].question}
                </h3>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentQIndex].options.map((option, optIdx) => {
                    const isCorrect = optIdx === QUIZ_QUESTIONS[currentQIndex].correctIndex;
                    const isSelected = selectedOption === optIdx;

                    let btnStyle = "bg-[#fdf8f3] border-[#c9a0c8]/30 hover:border-[#c9a0c8] text-[#2a1f2e]";
                    if (answerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-medium";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={answerSubmitted}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-semibold opacity-70">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                        {answerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {answerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>

                {answerSubmitted && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <p className="text-xs sm:text-sm p-3 rounded-lg bg-[#ede8f9] text-[#2a1f2e] border border-[#c9a0c8]/30 font-medium">
                      {QUIZ_QUESTIONS[currentQIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3.5 rounded-xl bg-[#2a1f2e] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a0c8] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{currentQIndex === QUIZ_QUESTIONS.length - 1 ? "See Final Score ✨" : "Next Question"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="text-6xl">
                  {score === 4 ? "🎉" : score >= 2 ? "🥳" : "😅"}
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-3xl text-[#2a1f2e]">
                    {score === 4
                      ? "Perfect Score! Inseparable Besties!"
                      : score >= 2
                      ? "Great Job! You Know Sarah Well!"
                      : "Getting Closer! Time for Another Coffee Chat!"}
                  </h3>
                  <p className="text-4xl font-serif font-bold text-[#c9a0c8]">
                    {score} / {QUIZ_QUESTIONS.length} Correct
                  </p>
                </div>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-full bg-[#2a1f2e] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a0c8] transition-colors"
                >
                  Try Quiz Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* GRAND SURPRISE REVEAL SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#ede8f9] text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a0c8]">
            🎁 The Grand Finale
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2a1f2e] font-light">
            One Last <em className="italic text-[#c9a0c8]">Surprise</em> 🎊
          </h2>
          <p className="text-sm text-[#8a7a8d] max-w-md mx-auto">
            We saved the absolute best birthday gift for last. Tap below to reveal!
          </p>

          {!isSurpriseRevealed ? (
            <button
              onClick={() => {
                setIsSurpriseRevealed(true);
                triggerConfetti();
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#c9a0c8] bg-white text-[#2a1f2e] font-medium text-xs sm:text-sm uppercase tracking-widest hover:bg-[#fde8ef] transition-all transform hover:scale-105 shadow-lg shadow-[#c9a0c8]/20"
            >
              <span>🎂</span>
              <span>Reveal The Birthday Surprise</span>
              <span>🎂</span>
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c9a0c8]/40 space-y-6 text-left"
            >
              <div className="relative rounded-2xl overflow-hidden h-64 bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop"
                  alt="Concert Tickets"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-widest">
                    <Ticket className="w-4 h-4" /> VIP Pass Confirmed
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light">The Eras Concert Tour — Front Row VIP</h3>
                  <p className="text-xs text-zinc-300">Live at Wembley Stadium · All Expenses Paid!</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="font-serif text-lg italic text-[#8a7a8d]">
                  &ldquo;You always said this was your ultimate dream concert. Well... dream no more! Pack your bags!&rdquo; 🎟️✨
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-[#fde8ef] text-[#2a1f2e] text-xs font-semibold">
                  🎁 Gift Claimed by Sarah · Happy Birthday!
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#2a1f2e] text-center text-white/60 space-y-3 text-xs border-t border-white/10">
        <div className="text-2xl">🎂🎈🎉</div>
        <p className="font-serif text-lg text-white font-light">Happy Birthday Sarah ♡</p>
        <p className="text-[11px] text-white/40">Crafted with Aura UX Templates · Crafting digital experiences that feel as good as they look</p>
      </footer>
    </div>
  );
}
