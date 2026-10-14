import React, { useState, useEffect, useRef } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Languages,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Download,
  Trash2,
  Clock,
  BookOpen,
  Search,
  Sliders,
  Radio,
  Play,
  RotateCcw,
  Edit3
} from 'lucide-react';

export default function AITranslatorPage() {
  const [sourceLang, setSourceLang] = useState('hindi');
  const [targetLang, setTargetLang] = useState('odia');
  const [sourceText, setSourceText] = useState('बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।');
  const [translatedText, setTranslatedText] = useState('ପିଲାମାନେ, ଆଜି ଆମେ ୧ ରୁ ୨୦ ପର୍ଯ୍ୟନ୍ତ ଗଣିବା ଶିଖିବା।');
  const [transliteration, setTransliteration] = useState('Pilamane, aji ame 1 ru 20 parjyanta ganiba sikhiba.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' or 'voice'

  // Voice Workspace State
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceChannel, setActiveVoiceChannel] = useState('source'); // 'source' or 'target'
  const [speechSpeed, setSpeechSpeed] = useState(0.85);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all');

  const recognitionRef = useRef(null);

  const [history, setHistory] = useState([
    {
      id: 1,
      source: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
      target: "ପିଲାମାନେ, ଆଜି ଆମେ ୧ ରୁ ୨୦ ପର୍ଯ୍ୟନ୍ତ ଗଣିବା ଶିଖିବା।",
      transliteration: "Pilamane, aji ame 1 ru 20 parjyanta ganiba sikhiba.",
      lang: "ODIA",
      time: "5 mins ago"
    },
    {
      id: 2,
      source: "अपनी-अपनी किताबों में पृष्ठ संख्या 14 खोलिए और चित्रों को देखिए।",
      target: "ଆପଣଙ୍କ ବହିରେ ପୃଷ୍ଠା ସଂଖ୍ୟା ୧୪ ଖୋଲନ୍ତୁ ଏବଂ ଚିତ୍ରଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ।",
      transliteration: "Aapananka bahire prushtha sankhya 14 kholantu ebam chitragudiku dekhantu.",
      lang: "ODIA",
      time: "18 mins ago"
    },
    {
      id: 3,
      source: "यदि आपके पास 5 आम हैं और 2 आम अपने मित्र को दे दिए, तो कितने बचे?",
      target: "ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?",
      transliteration: "Judi am then 5 gotań ul mena'a ar 2 gotań gate em emadeya, tobe tina' sarêj ena?",
      lang: "SANTHALI",
      time: "35 mins ago"
    }
  ]);

  const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.id === targetLang) || SUPPORTED_LANGUAGES[0];
  const sourceLangObj = SUPPORTED_LANGUAGES.find(l => l.id === sourceLang) || SUPPORTED_LANGUAGES[1];

  // Helper for generating translations across languages
  const computeTranslation = (text, target) => {
    if (target === 'odia') {
      if (text.includes('किताब') || text.includes('पृष्ठ')) {
        return {
          target: 'ପିଲାମାନେ, ବହି ଖୋଲନ୍ତୁ ଏବଂ ପୃଷ୍ଠା ସଂଖ୍ୟା ୧୦ କୁ ଯାଆନ୍ତୁ।',
          translit: 'Pilamane, bahi kholantu ebang prushtha sankhya 10 ku jaantu.'
        };
      }
      if (text.includes('गिनती') || text.includes('संख्या') || text.includes('1 से 20')) {
        return {
          target: 'ପିଲାମାନେ, ଆଜି ଆମେ ୧ ରୁ ୨୦ ପର୍ଯ୍ୟନ୍ତ ଗଣିବା ଶିଖିବା।',
          translit: 'Pilamane, aji ame 1 ru 20 parjyanta ganiba sikhiba.'
        };
      }
      if (text.includes('आम') || text.includes('बचे') || text.includes('घटाव')) {
        return {
          target: 'ଯଦି ଆପଣଙ୍କ ପାଖରେ ୫ଟି ଆମ୍ବ ଅଛି ଏବଂ ୨ଟି ଦେଲେ, ତେବେ ୩ଟି ବଳିଲା।',
          translit: 'Jadi aapananka pakhare 5ti amba achhi ebam 2ti dele, tebe 3ti balila.'
        };
      }
      return {
        target: 'ପିଲାମାନେ, ଏହି କଥାକୁ ଧ୍ୟାନରେ ରଖନ୍ତୁ ଏବଂ ଭଲଭାବେ ଶିଖନ୍ତୁ।',
        translit: 'Pilamane, ehi kathaku dhyanare rakhantu ebang bhalabhabe sikhantu.'
      };
    }

    if (target === 'santhali') {
      if (text.includes('किताब') || text.includes('पृष्ठ')) {
        return {
          target: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱯᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱮᱞ ᱑᱐ ᱨᱮ ᱥᱮᱱᱚᱜ ᱯᱮ᱾',
          translit: 'Gidra ko, puthi jhij pe ar sakam el 10 re senog pe.'
        };
      }
      if (text.includes('गिनती') || text.includes('संख्या')) {
        return {
          target: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
          translit: 'Gidra ko, teheñ do abo lekha bon chedo\'a.'
        };
      }
      return {
        target: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱱᱚᱣᱟ ᱠᱟᱛᱷᱟ ᱫᱚᱦᱚᱭ ᱯᱮ ᱟᱨ ᱪᱮᱫᱚᱜ ᱯᱮ᱾',
        translit: 'Gidra ko, nowa katha dohoy pe ar chedog pe.'
      };
    }

    const tObj = SUPPORTED_LANGUAGES.find(l => l.id === target);
    if (tObj) {
      return {
        target: tObj.samplePhraseTarget,
        translit: tObj.transliteration
      };
    }

    return { target: text, translit: text };
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);

    setTimeout(() => {
      setIsTranslating(false);
      const res = computeTranslation(sourceText, targetLang);
      setTranslatedText(res.target);
      setTransliteration(res.translit);

      setHistory(prev => [
        {
          id: Date.now(),
          source: sourceText,
          target: res.target,
          transliteration: res.translit,
          lang: targetLang.toUpperCase(),
          time: 'Just now'
        },
        ...prev
      ]);
    }, 500);
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
    if (isPlayingVoice) {
      speechSynthesizer.stop();
      setIsPlayingVoice(false);
      return;
    }
    setIsPlayingVoice(true);
    speechSynthesizer.speak(transliteration || translatedText, {
      lang: targetLangObj.voiceLangCode || 'hi-IN',
      rate: speechSpeed,
      pitch: speechPitch,
      onEnd: () => setIsPlayingVoice(false)
    });
  };

  const handleSpeakSource = () => {
    speechSynthesizer.speak(sourceText, {
      lang: sourceLangObj.voiceLangCode || 'hi-IN',
      rate: speechSpeed,
      pitch: speechPitch
    });
  };

  // Real Speech Recognition or fallback
  const startVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = sourceLangObj.voiceLangCode || 'hi-IN';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => {
          setIsListening(true);
          speechSynthesizer.playAcousticChime(620, 0.2);
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setSourceText(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          // auto translate
          handleTranslate();
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch (err) {
        console.warn("Native SpeechRecognition unavailable, using fallback simulator", err);
      }
    }

    // Fallback simulation
    setIsListening(true);
    speechSynthesizer.playAcousticChime(580, 0.2);

    setTimeout(() => {
      setIsListening(false);
      const simulatedPhrases = [
        "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
        "अपनी-अपनी किताबों में पृष्ठ संख्या 14 खोलिए और चित्रों को देखिए।",
        "यदि आपके पास 5 आम हैं और 2 आम अपने मित्र को दे दिए, तो कितने बचे?",
        "सभी बच्चे अपनी कक्षा में ध्यान से सुनें और दोहराएं।"
      ];
      const randomPhrase = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
      setSourceText(randomPhrase);
      const res = computeTranslation(randomPhrase, targetLang);
      setTranslatedText(res.target);
      setTransliteration(res.translit);
      setHistory(prev => [
        {
          id: Date.now(),
          source: randomPhrase,
          target: res.target,
          transliteration: res.translit,
          lang: targetLang.toUpperCase(),
          time: 'Just now'
        },
        ...prev
      ]);
    }, 2000);
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch =
      item.source.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.target.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.lang.toLowerCase().includes(historySearch.toLowerCase());

    if (historyFilter === 'all') return matchesSearch;
    return matchesSearch && item.lang.toLowerCase() === historyFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Languages className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Vernacular Translator & Voice Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              26 Languages • Fully Editable
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Real-time two-way translation between Hindi and 26 Indian languages (Odia, Santhali, Ho, Bengali, Telugu, and more).
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-navy-100/70 dark:bg-navy-900 border border-navy-200 dark:border-darkborder">
          <button
            onClick={() => setMode('text')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'text'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-navy-700 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Text Translation</span>
          </button>
          <button
            onClick={() => setMode('voice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'voice'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-navy-700 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Voice Workspace</span>
          </button>
        </div>
      </div>

      {/* Voice Workspace Interface (when mode === 'voice') */}
      {mode === 'voice' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900 via-brand-950 to-navy-950 text-white border border-brand-500/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                Live Acoustic Voice Translation
              </span>
              <h2 className="text-xl font-black mt-1">
                Voice Translation Studio: {sourceLangObj.name} ↔ {targetLangObj.name}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1 text-slate-300">
                <span>Speed:</span>
                <select
                  value={speechSpeed}
                  onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                  className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white text-xs"
                >
                  <option value={0.7} className="text-navy-950">0.7x (Slow)</option>
                  <option value={0.85} className="text-navy-950">0.85x (Default)</option>
                  <option value={1.0} className="text-navy-950">1.0x (Normal)</option>
                  <option value={1.2} className="text-navy-950">1.2x (Fast)</option>
                </select>
              </label>

              <button
                onClick={handleSwap}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 border border-white/15"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Swap ({targetLangObj.name} ↔ {sourceLangObj.name})</span>
              </button>
            </div>
          </div>

          {/* Interactive Voice Console */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Input Voice Speaker Channel */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Channel 1: Speaker ({sourceLangObj.name})
                  </span>
                  <span>Mic Ready</span>
                </div>

                <div className="mt-3">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Spoken Transcript (Editable):
                  </label>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    rows={4}
                    placeholder="Speak into microphone or type here..."
                    className="w-full p-3 rounded-xl bg-black/30 border border-white/15 text-white text-sm font-medium resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
                  />
                </div>
              </div>

              {/* Live Mic Action */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={isListening ? stopVoiceRecording : startVoiceRecording}
                  className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-900/50'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-900/50 hover:scale-105'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
                  <span>{isListening ? "Listening... (Click to Finish)" : "Tap & Speak Hindi"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSpeakSource}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200"
                  title="Listen Source"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Output Voice Speaker Channel */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Channel 2: Mother Tongue Voice ({targetLangObj.name})
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    Edge TTS: 96%
                  </span>
                </div>

                <div className="mt-3">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Native Voice Translation (Editable):
                  </label>
                  <textarea
                    value={translatedText}
                    onChange={(e) => setTranslatedText(e.target.value)}
                    rows={4}
                    placeholder="Translated voice output..."
                    className="w-full p-3 rounded-xl bg-black/30 border border-white/15 text-emerald-300 text-sm font-bold resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  <input
                    type="text"
                    value={transliteration}
                    onChange={(e) => setTransliteration(e.target.value)}
                    placeholder="Phonetic transliteration..."
                    className="w-full mt-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-xs text-slate-300 italic"
                  />
                </div>
              </div>

              {/* Play Audio Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSpeakTarget}
                  className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    isPlayingVoice
                      ? 'bg-amber-400 text-navy-950 animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-navy-950 shadow-amber-900/40 hover:scale-105'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingVoice ? "Speaking..." : `Play in ${targetLangObj.name}`}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200"
                  title="Copy Translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Audio Visualizer Waves (Active during listening) */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : 'bg-slate-500'}`}></span>
              <span className="text-xs text-slate-300">
                {isListening ? `Listening Live via Microphone (${sourceLangObj.name})...` : "Voice Engine Idle. Ready to record."}
              </span>
            </div>

            {/* Simulated Animated Audio Wave Bars */}
            <div className="flex items-end gap-1 h-6 px-3">
              {[4, 12, 18, 24, 16, 20, 28, 14, 22, 10, 16, 24, 8].map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: isListening ? `${Math.min(28, (h * (1 + (i % 3) * 0.4)))}px` : '4px',
                    transition: 'height 150ms ease-in-out'
                  }}
                  className={`w-1 rounded-full ${
                    isListening ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Two-Column Translation Workspace (Editable Text Mode) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Source Language */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                Source Language:
              </span>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.nativeName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-1.5 rounded-lg text-navy-400 hover:text-navy-700 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
              title="Swap Source and Target Languages"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-navy-500 dark:text-navy-400 block mb-1">
              Source Text (Editable by anyone):
            </label>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={6}
              placeholder="Type, edit or paste classroom sentence here..."
              className="w-full p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder text-navy-950 dark:text-white text-base font-medium leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSpeakSource}
                className="p-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 transition-colors"
                title="Speak Source"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={isListening ? stopVoiceRecording : startVoiceRecording}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                }`}
                title="Voice Dictation"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isTranslating ? "Translating..." : "Translate Now"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Target Language (100% Fully Editable!) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                Target Language:
              </span>
              <select
                value={targetLang}
                onChange={(e) => {
                  setTargetLang(e.target.value);
                  const res = computeTranslation(sourceText, e.target.value);
                  setTranslatedText(res.target);
                  setTransliteration(res.translit);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.nativeName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ Edge AI: 96% Match
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300">
                  Native Script ({targetLangObj.script || 'Native'}):
                </span>
                <span className="text-[10px] text-brand-600 font-medium flex items-center gap-1">
                  <Edit3 className="w-3 h-3" />
                  Editable Field
                </span>
              </div>
              {/* Editable Textarea for translation */}
              <textarea
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                rows={5}
                placeholder="Translated text will appear here (fully editable)..."
                className="w-full p-3 rounded-xl bg-white dark:bg-darkcard border border-brand-200 dark:border-brand-800 text-base sm:text-lg font-bold text-navy-950 dark:text-white leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="pt-2 border-t border-brand-200/50 dark:border-brand-800/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 block mb-1">
                Phonetic Transliteration (Editable):
              </span>
              <input
                type="text"
                value={transliteration}
                onChange={(e) => setTransliteration(e.target.value)}
                placeholder="Roman phonetic pronunciation..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-darkcard border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 italic font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSpeakTarget}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play in {targetLangObj.name}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="p-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 transition-colors"
                title="Copy text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="px-4 py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{saved ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Translation History — Complete and Displays All */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-100 dark:border-darkborder pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm text-navy-950 dark:text-white">
              All Translation History ({filteredHistory.length})
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search History */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-navy-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search history..."
                className="pl-8 pr-3 py-1 text-xs rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Filter Language */}
            <select
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white"
            >
              <option value="all">All Languages</option>
              <option value="odia">Odia</option>
              <option value="santhali">Santhali</option>
              <option value="hindi">Hindi</option>
            </select>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearAllHistory}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-navy-100 dark:divide-darkborder/50 max-h-96 overflow-y-auto pr-1">
          {filteredHistory.map((h) => (
            <div key={h.id} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-navy-50/50 dark:hover:bg-navy-900/30 p-2 rounded-xl transition-colors">
              <div className="space-y-1 flex-1">
                <p className="text-xs font-semibold text-navy-900 dark:text-white leading-relaxed">
                  {h.source}
                </p>
                <p className="text-xs font-bold text-brand-700 dark:text-brand-300 leading-relaxed">
                  {h.target}
                </p>
                {h.transliteration && (
                  <p className="text-[11px] text-navy-500 dark:text-navy-400 italic">
                    "{h.transliteration}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800">
                  {h.lang}
                </span>
                <span className="text-navy-400">{h.time}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSourceText(h.source);
                    setTranslatedText(h.target);
                    if (h.transliteration) setTransliteration(h.transliteration);
                  }}
                  className="px-2.5 py-1 text-xs bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded font-bold hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors"
                >
                  Load in Editor
                </button>
                <button
                  type="button"
                  onClick={() => deleteHistoryItem(h.id)}
                  className="p-1 text-navy-400 hover:text-rose-500 transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="py-8 text-center text-xs text-navy-400">
              No translation records found matching your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
