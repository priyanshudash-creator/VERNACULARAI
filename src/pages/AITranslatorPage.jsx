import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Languages,
  Mic,
  Volume2,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Download,
  Trash2,
  Clock,
  BookOpen
} from 'lucide-react';

export default function AITranslatorPage() {
  const [sourceLang, setSourceLang] = useState('hindi');
  const [targetLang, setTargetLang] = useState('santhali');
  const [sourceText, setSourceText] = useState('बच्चों, किताब खोलिए और पृष्ठ संख्या दस पर जाइए।');
  const [translatedText, setTranslatedText] = useState('ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱯᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱮᱞ ᱑᱐ ᱨᱮ ᱥᱮᱱᱚᱜ ᱯᱮ᱾');
  const [transliteration, setTransliteration] = useState('Gidra ko, puthi jhij pe ar sakam el 10 re senog pe.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' or 'voice'

  const [history, setHistory] = useState([
    {
      id: 1,
      source: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
      target: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱒᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾",
      lang: "Santhali",
      time: "10 mins ago"
    },
    {
      id: 2,
      source: "यदि आपके पास 5 आम हैं और 2 आम अपने मित्र को दे दिए, तो कितने बचे?",
      target: "ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?",
      lang: "Santhali",
      time: "25 mins ago"
    }
  ]);

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);

    setTimeout(() => {
      setIsTranslating(false);
      if (sourceText.includes('किताब') || sourceText.includes('पृष्ठ')) {
        setTranslatedText('ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱯᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱮᱞ ᱑᱐ ᱨᱮ ᱥᱮᱱᱚᱜ ᱯᱮ᱾');
        setTransliteration('Gidra ko, puthi jhij pe ar sakam el 10 re senog pe.');
      } else if (sourceText.includes('गिनती') || sourceText.includes('संख्या')) {
        setTranslatedText('ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾');
        setTransliteration('Gidra ko, teheñ do abo lekha bon chedo\'a.');
      } else {
        setTranslatedText('ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱱᱚᱣᱟ ᱠᱟᱛᱷᱟ ᱫᱚᱦᱚᱭ ᱯᱮ ᱟᱨ ᱪᱮᱫᱚᱜ ᱯᱮ᱾');
        setTransliteration('Gidra ko, nowa katha dohoy pe ar chedog pe.');
      }

      setHistory(prev => [
        {
          id: Date.now(),
          source: sourceText,
          target: translatedText,
          lang: targetLang.toUpperCase(),
          time: 'Just now'
        },
        ...prev
      ]);
    }, 700);
  };

  const handleSwap = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakTarget = () => {
    speechSynthesizer.speak(transliteration, {
      lang: 'hi-IN'
    });
  };

  const handleSpeakSource = () => {
    speechSynthesizer.speak(sourceText, {
      lang: 'hi-IN'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Languages className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Vernacular Translator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Offline Neural MT
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            High-accuracy translation between Hindi (Medium of Instruction) and Santhali, Ho, or Mundari.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('text')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'text'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300'
            }`}
          >
            Text Workspace
          </button>
          <button
            onClick={() => setMode('voice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'voice'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300'
            }`}
          >
            Voice Workspace
          </button>
        </div>
      </div>

      {/* Two-Column Translation Workspace (Section 32) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Source Language (Hindi) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                Source:
              </span>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white"
              >
                <option value="hindi">Hindi (हिन्दी)</option>
                <option value="santhali">Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                <option value="ho">Ho (ᱦᱳ)</option>
                <option value="mundari">Mundari (ᱢᱩᱱᱰᱟᱨᱤ)</option>
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-1.5 rounded-lg text-navy-400 hover:text-navy-700 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-800"
              title="Swap Languages"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={6}
            placeholder="Type or paste Hindi classroom sentence here..."
            className="w-full p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder text-navy-950 dark:text-white text-base font-medium leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakSource}
                className="p-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100"
                title="Speak Source"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  speechSynthesizer.playAcousticChime(600, 0.2);
                  setSourceText("बच्चों, किताब खोलिए और पृष्ठ संख्या दस पर जाइए।");
                }}
                className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40"
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isTranslating ? "Translating..." : "Translate"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Target Language (Santhali) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                Target:
              </span>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-300"
              >
                <option value="santhali">Santhali ( Ol Chiki )</option>
                <option value="ho">Ho ( Warang Chiti )</option>
                <option value="mundari">Mundari ( Bani Hisir )</option>
                <option value="hindi">Hindi ( Devanagari )</option>
              </select>
            </div>

            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ Edge AI: 94% Match
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 min-h-[160px] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block mb-1">
                Native Script (Ol Chiki):
              </span>
              <p className="text-lg font-bold text-navy-950 dark:text-white leading-relaxed">
                {translatedText}
              </p>
            </div>

            <div className="pt-2 border-t border-brand-200/50 dark:border-brand-800/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 block mb-0.5">
                Phonetic Transliteration:
              </span>
              <p className="text-xs text-brand-900 dark:text-brand-200 italic font-medium">
                "{transliteration}"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakTarget}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Audio</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100"
                title="Copy text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="px-4 py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{saved ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Translation History (Section 32) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            Recent Classroom Translations
          </h3>
          <span className="text-xs text-navy-400">Offline History Cache</span>
        </div>

        <div className="divide-y divide-navy-100 dark:divide-darkborder/50">
          {history.map((h) => (
            <div key={h.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-navy-900 dark:text-white">
                  {h.source}
                </p>
                <p className="text-xs text-brand-700 dark:text-brand-300">
                  {h.target}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 text-[11px] text-navy-400">
                <span className="px-2 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 font-semibold">
                  {h.lang}
                </span>
                <span>{h.time}</span>
                <button
                  onClick={() => {
                    setSourceText(h.source);
                    setTranslatedText(h.target);
                  }}
                  className="px-2 py-1 text-brand-600 font-bold hover:underline"
                >
                  Load
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
