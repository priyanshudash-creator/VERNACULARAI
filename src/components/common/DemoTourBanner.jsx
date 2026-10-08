import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ChevronRight, CheckCircle2, ChevronDown, ChevronUp, Play, Award } from 'lucide-react';

export default function DemoTourBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const demoSteps = [
    { title: "1. Login / Portal", path: "/login", badge: "Auth" },
    { title: "2. Teacher Dashboard", path: "/dashboard", badge: "Command" },
    { title: "3. Live Classroom (Hero)", path: "/classroom", badge: "Live AI" },
    { title: "4. Two-Way Translator", path: "/translator", badge: "Translation" },
    { title: "5. AI Learning Gaps", path: "/learning-gaps", badge: "FLN Analysis" },
    { title: "6. AI Lesson Generator", path: "/lesson-generator", badge: "Pedagogy" },
    { title: "7. AI Local Stories", path: "/ai-stories", badge: "Context" },
    { title: "8. AI Worksheets", path: "/worksheets", badge: "Print A4" },
    { title: "9. Pronunciation Coach", path: "/pronunciation", badge: "Voice AI" },
    { title: "10. Daily Teaching Plan", path: "/daily-plan", badge: "Schedule" },
    { title: "11. Offline AI Center", path: "/offline", badge: "Edge AI" },
    { title: "12. Sync Center", path: "/sync", badge: "Cloud Sync" }
  ];

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-navy-950 via-brand-950 to-navy-900 border-b border-brand-500/30 text-white text-xs px-3 py-2 transition-all no-print select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40 flex-shrink-0">
            <Award className="w-3.5 h-3.5" />
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">SIH 2026 Evaluation Tour:</span>
            <span className="text-slate-300 hidden sm:inline">
              Problem 26042 • Mother Tongue-Based Vernacular Pedagogy
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-0.5">
            {demoSteps.slice(1, 7).map((step, idx) => {
              const isActive = location.pathname === step.path;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(step.path)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  {step.title.split('. ')[1]}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium text-[11px] flex items-center gap-1 border border-amber-500/40"
          >
            {isExpanded ? "Hide Steps" : "All 12 Demo Steps"}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white text-[11px] px-1 ml-1"
            title="Dismiss Tour Bar"
          >
            ✕
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-brand-800/60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5">
          {demoSteps.map((step, idx) => {
            const isActive = location.pathname === step.path;
            return (
              <button
                key={idx}
                onClick={() => {
                  navigate(step.path);
                  setIsExpanded(false);
                }}
                className={`p-2 rounded-lg text-left transition-all border ${
                  isActive
                    ? 'bg-brand-600/90 text-white border-brand-400 shadow-md ring-1 ring-white/20'
                    : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-amber-300 font-mono mb-0.5">
                  <span>STEP 0{idx + 1}</span>
                  <span className="px-1 py-0.2 rounded bg-black/40 text-[9px]">{step.badge}</span>
                </div>
                <div className="font-semibold text-xs leading-tight line-clamp-1">
                  {step.title.split('. ')[1]}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
