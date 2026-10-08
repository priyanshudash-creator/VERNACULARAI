import React from 'react';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  BookMarked,
  Languages,
  CheckCircle2,
  Clock,
  Volume2,
  HardDrive,
  ShieldCheck,
  Globe,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function LanguageLibraryPage() {
  const handlePlaySample = (phrase) => {
    speechSynthesizer.speak(phrase, { lang: 'hi-IN' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <BookMarked className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Tribal Language Library & Smart AI Confidence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 11 & 51
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Acoustic vocabulary corpora, native scripts (Ol Chiki, Warang Chiti, Bani Hisir), and prototype AI model readiness indicators.
          </p>
        </div>

        <div className="text-xs font-medium text-navy-500 bg-navy-50 dark:bg-navy-950 p-2.5 rounded-xl border border-navy-200 dark:border-darkborder">
          Status: <strong>4 Linguistic Models Quantized for Offline Edge</strong>
        </div>
      </div>

      {/* Language Cards Grid (Section 51) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <div
            key={lang.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                      {lang.name}
                    </h2>
                    <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">
                      ({lang.nativeName})
                    </span>
                  </div>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Script: <strong>{lang.script}</strong> • {lang.region}
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  lang.status === 'Available' || lang.status === 'Core Language'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {lang.status}
                </span>
              </div>

              {/* Statistics Matrix (Section 51) */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200/60 dark:border-darkborder">
                  <div className="text-xs text-navy-400 font-semibold uppercase">Vocabulary</div>
                  <div className="text-base font-extrabold text-navy-950 dark:text-white mt-0.5">{lang.vocabularyCount}</div>
                </div>

                <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200/60 dark:border-darkborder">
                  <div className="text-xs text-navy-400 font-semibold uppercase">Audio Files</div>
                  <div className="text-base font-extrabold text-navy-950 dark:text-white mt-0.5">{lang.audioCount}</div>
                </div>

                <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200/60 dark:border-darkborder">
                  <div className="text-xs text-navy-400 font-semibold uppercase">Lessons</div>
                  <div className="text-base font-extrabold text-navy-950 dark:text-white mt-0.5">{lang.lessonsCount}</div>
                </div>
              </div>

              {/* Smart AI Confidence Capability Indicators (Section 11) */}
              <div className="space-y-2 p-4 rounded-2xl bg-navy-50/70 dark:bg-navy-950/40 border border-navy-200/80 dark:border-darkborder">
                <div className="flex items-center justify-between text-xs font-bold text-navy-900 dark:text-white pb-1">
                  <span>Smart AI Model Capabilities</span>
                  <span className="font-mono text-brand-600">Confidence: {lang.capabilities.confidenceScore}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder">
                    <span className="text-navy-600 dark:text-navy-300">Text Translation</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ {lang.capabilities.textTranslation.label}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder">
                    <span className="text-navy-600 dark:text-navy-300">Speech Recognition</span>
                    <span className={`font-bold ${lang.capabilities.speechRecognition.status === 'ready' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {lang.capabilities.speechRecognition.status === 'ready' ? '✓' : '◐'} {lang.capabilities.speechRecognition.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder">
                    <span className="text-navy-600 dark:text-navy-300">Text-to-Speech</span>
                    <span className={`font-bold ${lang.capabilities.textToSpeech.status === 'ready' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {lang.capabilities.textToSpeech.status === 'ready' ? '✓' : '◐'} {lang.capabilities.textToSpeech.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder">
                    <span className="text-navy-600 dark:text-navy-300">Offline Edge Pack</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Installed</span>
                  </div>
                </div>
              </div>

              {/* Sample Spoken Sentence with Audio Button */}
              <div className="p-3.5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block">
                  Classroom Audio Demo Sample:
                </span>
                <p className="font-bold text-navy-950 dark:text-white">
                  {lang.samplePhraseTarget}
                </p>
                <p className="text-brand-700 dark:text-brand-300 italic text-[11px]">
                  "{lang.transliteration}"
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-navy-100 dark:border-darkborder/50 flex items-center justify-between">
              <button
                onClick={() => handlePlaySample(lang.transliteration)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Test Audio</span>
              </button>

              <span className="text-[11px] text-navy-400">
                SCERT Jharkhand Certified Corpus
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
