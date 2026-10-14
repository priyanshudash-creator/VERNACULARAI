import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Cpu,
  Brain,
  Languages,
  Volume2,
  HardDrive,
  RefreshCw,
  ArrowDown,
  ArrowRight,
  Database,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Radio
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Teacher Voice Capture",
      desc: "Teacher speaks instructions in standard Hindi through a tablet microphone in a noisy primary school setting.",
      icon: Mic,
      tag: "Audio In"
    },
    {
      num: "02",
      title: "Speech Recognition (ASR)",
      desc: "Quantized acoustic model processes speech signals locally, generating timestamped Hindi Devanagari text.",
      icon: Cpu,
      tag: "On-Device ASR"
    },
    {
      num: "03",
      title: "Context & NLP Engine",
      desc: "Extracts sentence meaning, entity references, and matches foundational educational intent against state curriculum.",
      icon: Brain,
      tag: "Hindi NLP"
    },
    {
      num: "04",
      title: "Learning Outcome Detection",
      desc: "Maps the sentence to NIPUN Bharat FLN competency codes (e.g. LO-M201 for numbers 1 to 20).",
      icon: ShieldCheck,
      tag: "Pedagogy 2.0"
    },
    {
      num: "05",
      title: "Vernacular Translation",
      desc: "Translates Hindi syntax into target tribal grammar (Santhali, Ho, Mundari) while preserving cultural context.",
      icon: Languages,
      tag: "Neural MT"
    },
    {
      num: "06",
      title: "Acoustic Speech Synthesis",
      desc: "Synthesizes native tonal cadence and dialect phonemes for authentic Ol Chiki speech playback in under 1.8s.",
      icon: Volume2,
      tag: "TTS Audio Out"
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
          System Architecture & Data Flow
        </h1>

        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
          How VernacularAI bridges the teacher-student language gap through edge-optimized speech intelligence, mother-tongue pedagogy, and offline synchronization.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/classroom"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2"
          >
            <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Test Live Pipeline</span>
          </Link>
          <Link
            to="/offline"
            className="px-5 py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 text-navy-900 dark:text-white font-semibold text-xs"
          >
            View Edge Models
          </Link>
        </div>
      </div>

      {/* Process Visualization (Section 20 & 54) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-8">
        <div className="border-b border-navy-100 dark:border-darkborder pb-4">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-600" />
            Interactive 6-Stage Classroom Processing Pipeline
          </h2>
          <p className="text-xs text-navy-500">
            Executes on low-cost tablet hardware with an average processing latency of 1.6 to 1.8 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-50/70 dark:bg-navy-950/40 border border-navy-200 dark:border-darkborder space-y-3 relative group hover:border-brand-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-brand-600">
                    STAGE {st.num}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-200 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                    {st.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-navy-950 dark:text-white">
                    {st.title}
                  </h3>
                </div>

                <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline AI Layer & Edge Storage (Section 54) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-navy-950 text-white border border-brand-500/30 shadow-xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">
              Edge Offline Execution Layer
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Zero reliance on continuous cloud connectivity during daily classroom hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-bold text-emerald-400 block">1. Local Speech Engine</span>
            <p className="text-slate-300 leading-relaxed">
              Whisper/Wav2Vec2 quantized on-device acoustic model trained on rural Indian dialect variations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-bold text-amber-400 block">2. Neural Translation Engine</span>
            <p className="text-slate-300 leading-relaxed">
              Transformer model fine-tuned on SCERT Jharkhand FLN curriculum and tribal language dictionaries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-bold text-blue-400 block">3. Local Database & Sync Manager</span>
            <p className="text-slate-300 leading-relaxed">
              IndexedDB local storage caching assessments, worksheets, and translation logs for delta synchronization.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Data Flow Pipeline (Section 55) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-6">
        <div className="border-b border-navy-100 dark:border-darkborder pb-4">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">
            Complete End-to-End Data Flow Architecture (Section 55)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs space-y-1">
            <span className="font-bold text-blue-800 dark:text-blue-300 uppercase block">1. Input</span>
            <p className="font-semibold text-navy-900 dark:text-white">Hindi Voice / Text</p>
            <span className="text-[10px] text-navy-500">Teacher Spoken Prompt</span>
          </div>

          <div className="text-navy-400 font-bold hidden md:block">→</div>

          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs space-y-1">
            <span className="font-bold text-brand-800 dark:text-brand-300 uppercase block">2. Edge Processing</span>
            <p className="font-semibold text-navy-900 dark:text-white">ASR • NLP • FLN • MT</p>
            <span className="text-[10px] text-navy-500">Quantized On-Device</span>
          </div>

          <div className="text-navy-400 font-bold hidden md:block">→</div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 uppercase block">3. Output</span>
            <p className="font-semibold text-navy-900 dark:text-white">Santhali Audio & Text</p>
            <span className="text-[10px] text-navy-500">Worksheet / Flashcard</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-navy-100 dark:border-darkborder text-xs text-navy-500">
          <span>Aligned with National Education Policy (NEP 2020) & NIPUN Bharat Guidelines</span>
          <Link to="/classroom" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
            <span>Experience in Live Classroom</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
