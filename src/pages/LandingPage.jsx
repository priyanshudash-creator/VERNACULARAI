import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Mic,
  Volume2,
  Sparkles,
  ArrowRight,
  BookOpen,
  WifiOff,
  BarChart3,
  CheckCircle2,
  Languages,
  ShieldCheck,
  Lightbulb,
  Radio,
  FileSpreadsheet,
  Users,
  Compass,
  Play
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isPlayingHeroVoice, setIsPlayingHeroVoice] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');

  const playDemoSentence = () => {
    if (isPlayingHeroVoice) {
      speechSynthesizer.stop();
      setIsPlayingHeroVoice(false);
    } else {
      setIsPlayingHeroVoice(true);
      speechSynthesizer.speak("बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।", {
        lang: 'hi-IN',
        onEnd: () => setIsPlayingHeroVoice(false)
      });
    }
  };

  const featureCards = [
    {
      title: "Real-Time Classroom Speech",
      desc: "Live two-way voice translation between Hindi-medium teachers and Santhali, Ho, or Mundari primary students.",
      icon: Radio,
      badge: "Hero Feature",
      link: "/classroom",
      gradient: "from-emerald-500/10 to-brand-500/10"
    },
    {
      title: "Offline-First Edge AI",
      desc: "Compact quantized translation and speech models running locally on low-cost classroom Android tablets without internet.",
      icon: WifiOff,
      badge: "No Internet Needed",
      link: "/offline",
      gradient: "from-blue-500/10 to-indigo-500/10"
    },
    {
      title: "AI Learning Gap Detection",
      desc: "Automatically diagnoses foundational numeracy & literacy (FLN) bottlenecks and generates vernacular remedial activities.",
      icon: BarChart3,
      badge: "FLN Diagnostic",
      link: "/learning-gaps",
      gradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      title: "Culturally Grounded Stories",
      desc: "Generates localized tribal folklore and village market examples in Santhali and Hindi to anchor abstract concepts.",
      icon: Compass,
      badge: "Local Context",
      link: "/ai-stories",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "AI Daily Teaching Plans",
      desc: "Time-slotted 45-minute lesson schedules blending Hindi concepts with mother-tongue explanations and local counters.",
      icon: BookOpen,
      badge: "Pedagogy 2.0",
      link: "/daily-plan",
      gradient: "from-teal-500/10 to-emerald-500/10"
    },
    {
      title: "Bilingual Printable Worksheets",
      desc: "Print-ready A4 worksheets with Ol Chiki and Devanagari text, counting pictures, and FLN assessment checklists.",
      icon: FileSpreadsheet,
      badge: "A4 Print Ready",
      link: "/worksheets",
      gradient: "from-rose-500/10 to-red-500/10"
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* SIH 2026 Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-300 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
            <span>Smart India Hackathon 2026 • Problem Statement ID: 26042</span>
          </div>

          {/* Main Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 dark:text-white leading-[1.15]">
            Teach in Hindi. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500">
              Learn in Your Mother Tongue.
            </span>
          </h1>

          {/* Secondary Tagline & Description */}
          <p className="text-base sm:text-lg text-navy-600 dark:text-navy-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered multilingual education designed for every classroom. Empowering Hindi-medium teachers with real-time speech translation, vernacular pedagogy, and offline-first classroom technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/classroom"
              className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-700/25 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Launch Live Classroom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-darkcard hover:bg-navy-50 dark:hover:bg-navy-800 text-navy-900 dark:text-white font-semibold text-sm border border-navy-200 dark:border-darkborder shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore Teacher Dashboard</span>
            </Link>
          </div>

          {/* Language badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-navy-400 dark:text-navy-500 font-medium">Supported Languages:</span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder font-semibold text-navy-800 dark:text-navy-200">
              🇮🇳 Hindi (हिन्दी)
            </span>
            <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-300 dark:border-brand-800 font-semibold text-brand-700 dark:text-brand-300">
              🌿 Santhali (ᱥᱟᱱᱛᱟᱲᱤ)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 font-semibold text-amber-800 dark:text-amber-300">
              🌾 Ho (ᱦᱳ)
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 font-semibold text-purple-800 dark:text-purple-300">
              🍃 Mundari (ᱢᱩᱱᱰᱟᱨᱤ)
            </span>
          </div>
        </div>

        {/* Hero Interactive Visualization Card */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-navy-800 dark:text-white uppercase tracking-wider">
                Live Classroom Speech Pipeline Demonstration
              </span>
            </div>
            <div className="text-xs font-mono text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2.5 py-1 rounded-lg border border-brand-200 dark:border-brand-800">
              AI Latency: 1.6s • Offline Ready
            </div>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Step 1: Teacher Hindi */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-brand-600" />
                  Teacher (Hindi Speech)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-navy-200 dark:bg-navy-800 font-semibold text-navy-700 dark:text-navy-300">
                  Devanagari
                </span>
              </div>

              <p className="text-sm font-semibold text-navy-900 dark:text-white leading-relaxed">
                "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।"
              </p>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={playDemoSentence}
                  className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingHeroVoice ? 'Stop' : 'Listen Hindi'}</span>
                </button>
                <span className="text-[11px] text-navy-500 dark:text-navy-400">
                  Grade 2 Math • Sunita Kumari
                </span>
              </div>
            </div>

            {/* Step 2: Center AI Bridge */}
            <div className="p-3 text-center space-y-2 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-700/20">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-[10px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider">
                VernacularAI Engine
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                LO-M201 Detected
              </div>
            </div>

            {/* Step 3: Student Santhali */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-brand-600" />
                  Student (Santhali Audio & Ol Chiki)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-200 dark:bg-brand-900 font-bold text-brand-800 dark:text-brand-200">
                  Ol Chiki Script
                </span>
              </div>

              <p className="text-sm font-semibold text-brand-950 dark:text-white leading-relaxed">
                ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱒᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾
              </p>

              <p className="text-[11px] text-brand-700 dark:text-brand-300 italic">
                "Gidra ko, teheñ do abo 1 khon 20 habić lekha bon chedo'a."
              </p>

              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    speechSynthesizer.speak("Gidra ko, teheñ do abo 1 khon 20 habić lekha bon chedo'a.", { lang: 'hi-IN' });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Santhali Audio</span>
                </button>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                  ✓ 94% Confidence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Problem & Solution (Section 19: Why VernacularAI) */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              The Classroom Reality in Tribal India
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
              Why Hindi-Medium Primary Teachers Struggle in Tribal Schools
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              In states like Jharkhand, Odisha, and West Bengal, teachers are posted in primary schools where instruction is prescribed in Hindi, but children enter Grade 1 speaking only <strong>Santhali, Ho, or Mundari</strong>.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Children nod politely, cannot follow abstract Hindi terminology, and fall behind in foundational literacy and numeracy (FLN). Teachers lack bilingual textbooks, phonetic dictionaries, and speech aids.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-amber-400">7.6M+</div>
                <div className="text-xs text-slate-300">Santhali Speakers in India</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-xs text-slate-300">Offline Classroom Ready</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              How VernacularAI Bridges The Divide
            </h3>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Mother Tongue-Based Pedagogy:</strong> Explains math and science using local tribal folklore, weekly Haat market situations, and physical counters.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Instant Voice-to-Voice:</strong> Teachers speak Hindi naturally; students hear crystal-clear Santhali audio without internet delays.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Automatic Learning Gap Detection:</strong> Identifies which children stumble on teen numbers (11-20) or reading speed, and auto-generates remedial plans.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Edge AI Offline Deployment:</strong> Runs on rural school tablets without needing fiber broadband or mobile towers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
            Built for Real Rural Primary Classrooms
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300">
            A comprehensive suite empowering teachers, supporting students, and satisfying monitoring officers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.link}
                className="group p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder hover:border-brand-500/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-navy-600 dark:text-navy-300 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-100 dark:border-darkborder/50 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Process Pipeline Section (Section 20: How It Works) */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase">
              End-to-End Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
              From Teacher's Hindi Speech to Mother Tongue Learning
            </h2>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300">
              Six synchronized AI stages executing under 1.8 seconds on low-spec edge tablets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: "01", title: "Teacher Speaks", desc: "Hindi microphone capture in noisy rural classrooms", color: "border-blue-500" },
              { step: "02", title: "Speech-to-Text", desc: "Acoustic Hindi ASR with dialect tolerance", color: "border-indigo-500" },
              { step: "03", title: "Context & NLP", desc: "Extracts pedagogical intent & Grade 2 FLN codes", color: "border-purple-500" },
              { step: "04", title: "Translation", desc: "Hindi ↔ Santhali / Ho neural machine translation", color: "border-brand-500" },
              { step: "05", title: "TTS Engine", desc: "Synthesizes native tonal rhythm and phonemes", color: "border-amber-500" },
              { step: "06", title: "Student Hears", desc: "Bilingual audio playback & student response", color: "border-emerald-500" }
            ].map((s, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-navy-50/70 dark:bg-navy-950/50 border-t-4 ${s.color} border border-navy-200 dark:border-darkborder space-y-2`}
              >
                <div className="font-mono text-xs font-extrabold text-brand-600 dark:text-brand-400">
                  {s.step}
                </div>
                <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                  {s.title}
                </h4>
                <p className="text-[11px] text-navy-500 dark:text-navy-400 leading-tight">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View In-Depth Technical Architecture & Edge Model Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-navy-950 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience VernacularAI in Action?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step into the shoes of primary school teacher Sunita Kumari at Government Primary School, Dumka.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-sm shadow-lg transition-transform hover:scale-105"
            >
              Start Demonstration
            </Link>
            <Link
              to="/classroom"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Try Live Classroom Mode
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
