import React, { useState } from 'react';
import { PRONUNCIATION_WORDS } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  VolumeX,
  Volume1
} from 'lucide-react';

export default function PronunciationCoachPage() {
  const [words, setWords] = useState(PRONUNCIATION_WORDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const currentWord = words[currentIndex] || words[0];

  const handleStartSpeaking = () => {
    setIsRecording(true);
    setShowResult(false);
    speechSynthesizer.playAcousticChime(640, 0.2);

    setTimeout(() => {
      setIsRecording(false);
      setIsAnalyzing(true);

      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
      }, 1200);
    }, 2000);
  };

  const handlePlayCorrect = () => {
    speechSynthesizer.speak(currentWord.transliteration, {
      lang: 'hi-IN',
      rate: 0.8
    });
  };

  const handleNextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setShowResult(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Mic className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Pronunciation & Speaking Coach
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 6 & 45
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Acoustic phonetic speech coach assisting tribal primary students with Hindi and mother-tongue phonemes.
          </p>
        </div>

        <div className="text-xs font-bold font-mono text-navy-500">
          Word {currentIndex + 1} of {words.length}
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-darkcard border-2 border-brand-500/40 shadow-xl text-center space-y-8 relative overflow-hidden">
        {/* Target Spoken Word Banner */}
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 uppercase tracking-wider">
            Target Word (Hindi & Santhali)
          </span>

          <div className="space-y-1">
            <h2 className="text-4xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight">
              {currentWord.wordHindi}
            </h2>
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              Santhali: {currentWord.wordSanthali} ({currentWord.transliteration})
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-xs text-navy-600 dark:text-navy-400 font-mono">
            Phonetic guide: <strong>/{currentWord.phoneticGuide}/</strong> • Meaning: {currentWord.meaning}
          </div>
        </div>

        {/* Microphone Recording Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {isRecording ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl animate-pulse">
                <Mic className="w-10 h-10 animate-bounce" />
              </div>
              <div className="flex items-center gap-1.5 h-6">
                <div className="w-1.5 bg-rose-500 rounded-full animate-waveform-1"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-waveform-2"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-waveform-3"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-waveform-4"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-waveform-5"></div>
              </div>
              <span className="text-xs font-bold text-rose-600 animate-pulse">
                Listening student speech... Speak now!
              </span>
            </div>
          ) : isAnalyzing ? (
            <div className="py-6 flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-brand-600 animate-spin" />
              <span className="text-xs font-semibold text-navy-600 dark:text-navy-400">
                AI Acoustic Engine analyzing phoneme boundaries...
              </span>
            </div>
          ) : (
            <button
              onClick={handleStartSpeaking}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white flex items-center justify-center shadow-xl shadow-brand-700/30 transition-all hover:scale-105 active:scale-95 group"
            >
              <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {!isRecording && !isAnalyzing && (
            <span className="text-xs font-semibold text-navy-500">
              Click the microphone and pronounce the word
            </span>
          )}
        </div>

        {/* AI Feedback Analysis Result Card (Section 6 & 45) */}
        {showResult && !isRecording && !isAnalyzing && (
          <div className="p-6 rounded-3xl bg-brand-50/70 dark:bg-brand-950/40 border-2 border-brand-300 dark:border-brand-800 text-left space-y-4 animate-in zoom-in-95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-200/80 dark:border-brand-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-600 text-white font-black text-sm">
                  {currentWord.simulatedScore}%
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                    Pronunciation Score: {currentWord.simulatedScore}%
                  </h4>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    ✓ Clear Acoustic Articulation
                  </span>
                </div>
              </div>

              {/* Sub metrics */}
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-navy-700 dark:text-navy-300">
                  Accuracy: <strong>{currentWord.points.accuracy}%</strong>
                </span>
                <span className="font-semibold text-navy-700 dark:text-navy-300">
                  Fluency: <strong>{currentWord.points.fluency}%</strong>
                </span>
              </div>
            </div>

            {/* AI Feedback quote */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-darkcard border border-brand-200 dark:border-darkborder text-xs text-navy-800 dark:text-navy-200 font-medium leading-relaxed">
              💬 <strong>AI Coach Feedback:</strong> "{currentWord.feedback}"
            </div>

            {/* Buttons (Section 6 & 45) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartSpeaking}
                className="px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 text-navy-800 dark:text-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <button
                onClick={handlePlayCorrect}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Correct Pronunciation</span>
              </button>

              <button
                onClick={handleNextWord}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-700/20 transition-all hover:scale-105"
              >
                <span>Next Word</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
