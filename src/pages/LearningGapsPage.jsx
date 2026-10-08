import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEARNING_GAPS_DATA } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  TrendingDown,
  Sparkles,
  AlertTriangle,
  Users,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Radio,
  FileSpreadsheet,
  Download,
  BookOpen
} from 'lucide-react';

export default function LearningGapsPage() {
  const navigate = useNavigate();
  const [selectedGap, setSelectedGap] = useState(LEARNING_GAPS_DATA.summary[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [remedialPlan, setRemedialPlan] = useState(LEARNING_GAPS_DATA.sampleRemedialPlan);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleGenerateRemedial = (gap) => {
    setSelectedGap(gap);
    setIsGenerating(true);
    setRemedialPlan(null);

    setTimeout(() => {
      setIsGenerating(false);
      setRemedialPlan({
        targetTopic: gap.topic,
        grade: "Grade 2",
        targetLanguage: "Santhali",
        recommendedActivity: gap.topic.includes('Reading')
          ? "Bilingual Visual Picture Match (Chitar-Arang Jodao)"
          : gap.topic.includes('Addition')
          ? "Two-Basket Pebble Transfer Game (Baria Tukri Dhiri Mesa)"
          : "Seed Counting & Village Market Bundle (Gela / ᱑᱐ ᱨᱮᱱᱟᱜ ᱵᱤᱸᱰᱟᱹ)",
        difficultyLevel: "FLN Foundation Step 1",
        motherTongueExplanation: "ᱢᱤᱫ ᱜᱮᱞ ᱢᱤᱫ (11), ᱢᱤᱫ ᱜᱮᱞ ᱵᱟᱨ (12) — ᱑᱐ ᱨᱮᱱᱟᱜ ᱢᱤᱫ ᱵᱤᱸᱰᱟᱹ ᱟᱨ ᱢᱤᱫᱴᱟᱹᱝ ᱥᱟᱨᱮᱡ ᱡᱟᱝ᱾ (१० का एक बंडल और १ खुला बीज = ११)",
        practiceQuestions: [
          { qHindi: "10 और 3 मिलकर कितने होते हैं?", qSanthali: "᱑᱐ ᱟᱨ ᱓ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ?", ans: "13 (ᱜᱮᱞ ᱯᱮ)" },
          { qHindi: "चित्र में 15 पत्तियां गिनिए।", qSanthali: "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱑᱕ ᱜᱚᱴᱟᱝ ᱥᱟᱠᱟᱢ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾", ans: "15 (ᱜᱮᱞ ᱢᱚᱬᱮ)" }
        ]
      });
    }, 1200);
  };

  const handlePlayAudio = () => {
    if (remedialPlan) {
      speechSynthesizer.speak(remedialPlan.motherTongueExplanation, { lang: 'hi-IN' });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-600">
              <TrendingDown className="w-5 h-5 text-rose-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Learning Gap Detection
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
              Section 9 & 42
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Automatically identify weak foundational competencies and generate vernacular remedial action plans.
          </p>
        </div>

        <button
          onClick={() => handleGenerateRemedial(selectedGap)}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generate Remedial Plan</span>
        </button>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Remedial plan saved into Offline Teaching Library!</span>
        </div>
      )}

      {/* Main Grid: Identified Gaps vs Remedial Plan Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Identified Class Gaps */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Class Learning Gaps Diagnostic
            </h3>
            <span className="text-xs text-navy-400">28 Grade 2 Students</span>
          </div>

          <div className="space-y-4">
            {LEARNING_GAPS_DATA.summary.map((gap, idx) => {
              const isSelected = selectedGap.topic === gap.topic;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 ring-1 ring-brand-500/50 shadow-sm'
                      : 'bg-navy-50/60 dark:bg-navy-950/40 border-navy-200 dark:border-darkborder hover:border-brand-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                        {gap.topic}
                      </h4>
                      <span className="text-[10px] text-navy-400 font-semibold">{gap.subject}</span>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-extrabold ${
                        gap.percentage > 30 ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        {gap.percentage}% need support
                      </span>
                      <div className="text-[10px] text-navy-400 font-medium">
                        ({gap.studentsNeedingSupportCount} of 28 students)
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-navy-200 dark:bg-navy-800 h-2 rounded-full overflow-hidden my-2">
                    <div
                      className={`h-full rounded-full ${
                        gap.percentage > 30 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${gap.percentage}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-snug">
                    <strong>Root Cause:</strong> {gap.rootCause}
                  </p>

                  <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-navy-500 truncate">
                      Focus: {gap.students.slice(0, 3).join(', ')}...
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateRemedial(gap);
                      }}
                      className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1"
                    >
                      Remediate →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Remedial Plan (Section 9 & 42) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Generated AI Remedial Action Plan
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              Mother-Tongue FLN
            </span>
          </div>

          {isGenerating ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-brand-600 animate-spin" />
              <p className="text-xs font-semibold text-navy-700 dark:text-navy-300">
                Formulating personalized remedial activity in Santhali for {selectedGap.studentsNeedingSupportCount} students...
              </p>
            </div>
          ) : remedialPlan ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  Target Competency & Students:
                </span>
                <div className="text-sm font-bold text-navy-950 dark:text-white">
                  {remedialPlan.targetTopic} ({remedialPlan.grade})
                </div>
                <p className="text-xs text-navy-600 dark:text-navy-300">
                  Assigned to: <strong>{selectedGap.students.join(', ')}</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block">
                  Recommended Pedagogical Activity:
                </span>
                <p className="text-xs font-semibold text-brand-950 dark:text-white leading-relaxed">
                  {remedialPlan.recommendedActivity}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-200 dark:bg-brand-900 text-brand-900 dark:text-brand-200">
                  Level: {remedialPlan.difficultyLevel}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
                    Mother Tongue Explanation (Santhali):
                  </span>
                  <button
                    onClick={handlePlayAudio}
                    className="p-1 rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950"
                    title="Play Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-bold text-navy-900 dark:text-white leading-relaxed">
                  {remedialPlan.motherTongueExplanation}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-navy-500 tracking-wider block">
                  Target Practice Questions:
                </span>
                {remedialPlan.practiceQuestions.map((pq, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-xs">
                    <div className="font-semibold text-navy-900 dark:text-white">{pq.qHindi}</div>
                    <div className="text-[11px] text-brand-700 dark:text-brand-300 font-medium">{pq.qSanthali}</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold mt-1">Ans: {pq.ans}</div>
                  </div>
                ))}
              </div>

              {/* Remedial Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate('/classroom')}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Start in Classroom</span>
                </button>

                <button
                  onClick={() => navigate('/worksheets')}
                  className="px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 font-semibold text-xs flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Make Worksheet</span>
                </button>

                <button
                  onClick={() => {
                    setSavedAlert(true);
                    setTimeout(() => setSavedAlert(false), 2500);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 text-xs font-semibold"
                >
                  Save Offline
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
