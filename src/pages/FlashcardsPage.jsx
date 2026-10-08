import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  Download,
  RotateCw,
  CheckCircle2
} from 'lucide-react';

export default function FlashcardsPage() {
  const [cards, setCards] = useState(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handlePlayAudio = () => {
    speechSynthesizer.speak(`${currentCard.wordHindi}. Santhali: ${currentCard.wordSanthali}`, {
      lang: 'hi-IN'
    });
  };

  const handleSave = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const handleGenerateNew = () => {
    const newCard = {
      id: `f-${Date.now()}`,
      count: 4,
      symbol: "🌺 🌺 🌺 🌺",
      numberHindi: "४",
      numberEnglish: "4",
      numberOlChiki: "᱔",
      wordHindi: "चार",
      wordSanthali: "ᱯᱩᱱ (Pone)",
      category: "Flowers",
      illustration: "Four red hibiscus flowers",
      context: "Sarhul floral festival decoration"
    };
    setCards([newCard, ...cards]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Layers className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Bilingual Flashcard Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 37
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Interactive visual counters with Ol Chiki script, Devanagari numerals, and acoustic pronunciation.
          </p>
        </div>

        <button
          onClick={handleGenerateNew}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generate New Card</span>
        </button>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Flashcard saved to offline classroom memory!</span>
        </div>
      )}

      {/* Main Flashcard Container */}
      <div className="relative max-w-lg mx-auto">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`cursor-pointer min-h-[380px] p-8 rounded-3xl bg-white dark:bg-darkcard border-2 border-brand-500/40 shadow-2xl flex flex-col items-center justify-between transition-all duration-300 hover:shadow-brand-500/10 text-center select-none ${
            isFlipped ? 'bg-brand-50/50 dark:bg-navy-900/60' : ''
          }`}
        >
          {/* Top category & flip indicator */}
          <div className="w-full flex items-center justify-between text-xs text-navy-400">
            <span className="px-2.5 py-0.5 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 font-semibold text-[11px]">
              {currentCard.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 font-semibold">
              <RotateCw className="w-3.5 h-3.5" />
              Click card to flip
            </span>
          </div>

          {!isFlipped ? (
            /* Front side */
            <div className="space-y-6 my-auto">
              <div className="text-4xl sm:text-5xl tracking-widest py-3">
                {currentCard.symbol}
              </div>

              <div className="space-y-1">
                <div className="text-5xl font-black text-navy-950 dark:text-white">
                  {currentCard.numberEnglish}
                </div>
                <div className="text-xl font-bold text-brand-600 dark:text-brand-400 font-mono">
                  Devanagari: {currentCard.numberHindi} • Ol Chiki: {currentCard.numberOlChiki}
                </div>
              </div>
            </div>
          ) : (
            /* Back side: Bilingual translation & audio guide */
            <div className="space-y-4 my-auto w-full">
              <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-brand-300 dark:border-brand-800 shadow-sm space-y-2">
                <div className="text-xs text-navy-400 font-semibold uppercase">Hindi Word:</div>
                <div className="text-2xl font-bold text-navy-950 dark:text-white">
                  {currentCard.wordHindi}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-300 dark:border-brand-700 shadow-sm space-y-2">
                <div className="text-xs text-brand-700 dark:text-brand-300 font-semibold uppercase">Santhali Word (Ol Chiki):</div>
                <div className="text-2xl font-black text-brand-950 dark:text-white">
                  {currentCard.wordSanthali}
                </div>
              </div>

              <div className="text-xs text-navy-600 dark:text-navy-400 italic">
                Context: {currentCard.context}
              </div>
            </div>
          )}

          {/* Bottom Card Counter */}
          <div className="w-full text-xs font-mono text-navy-400">
            Card {currentIndex + 1} of {cards.length}
          </div>
        </div>

        {/* Controls: Prev, Next, Audio, Save (Section 37) */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder text-navy-800 dark:text-navy-100 hover:bg-navy-100 shadow-xs transition-colors"
            title="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayAudio}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play Audio</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-3 rounded-2xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder text-navy-800 dark:text-navy-100 hover:bg-navy-100 shadow-xs transition-colors"
            title="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
