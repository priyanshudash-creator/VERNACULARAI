import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LESSONS_CATALOG } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import { useOffline } from '../context/OfflineContext';
import AIContentCheckModal from '../components/common/AIContentCheckModal';
import {
  BookOpen,
  Volume2,
  Download,
  Languages,
  FileSpreadsheet,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export default function LessonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveLessonOffline } = useOffline();

  const lesson = LESSONS_CATALOG.find(l => l.id === id) || LESSONS_CATALOG[0];

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      speechSynthesizer.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechSynthesizer.speak(
        `${lesson.teacherExplanationHindi} ${lesson.localExample}`,
        {
          lang: 'hi-IN',
          onEnd: () => setIsPlayingAudio(false)
        }
      );
    }
  };

  const handleSaveOffline = () => {
    saveLessonOffline(lesson);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 dark:text-navy-300 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson Library</span>
        </Link>

        {/* Action Buttons (Section 35) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePlayAudio}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isPlayingAudio ? "Stop Audio" : "Play Audio"}</span>
          </button>

          <button
            onClick={() => setShowCheckModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Content Check</span>
          </button>

          <button
            onClick={handleSaveOffline}
            className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Offline</span>
          </button>

          <button
            onClick={() => navigate('/worksheets')}
            className="px-3 py-1.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-xs font-semibold hover:bg-navy-200 transition-colors flex items-center gap-1"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-brand-600" />
            <span>Worksheet</span>
          </button>

          <button
            onClick={() => navigate('/ai-stories')}
            className="px-3 py-1.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-xs font-semibold hover:bg-navy-200 transition-colors flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-purple-600" />
            <span>Local Story</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Saved into Offline IndexedDB Cache! Accessible in offline mode.</span>
        </div>
      )}

      {/* Lesson Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-100 dark:border-darkborder pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {lesson.grade} • {lesson.subject}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Language: {lesson.language}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-navy-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Duration: {lesson.duration}
            </span>
            <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">
              {lesson.flnCode}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white leading-tight">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-2 leading-relaxed">
            <strong>Target Learning Outcome:</strong> {lesson.learningOutcome}
          </p>
        </div>

        {/* Learning Objectives List */}
        <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200/80 dark:border-darkborder space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
            Specific Learning Objectives (NIPUN Bharat):
          </h4>
          <ul className="space-y-1.5 text-xs text-navy-700 dark:text-navy-300">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bilingual Pedagogy Section (Section 35) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teacher Explanation Hindi */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-2.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-navy-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Teacher Explanation (Hindi)
            </h3>
            <span className="text-[10px] text-navy-400 font-mono">Medium of Instruction</span>
          </div>
          <p className="text-sm font-semibold text-navy-900 dark:text-white leading-relaxed p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950/50">
            "{lesson.teacherExplanationHindi}"
          </p>
          <p className="text-xs text-navy-500 leading-relaxed">
            Spoken by the teacher in the classroom before introducing the mother-tongue bridge.
          </p>
        </div>

        {/* Mother Tongue Explanation Santhali */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-2.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Mother Tongue Explanation (Santhali)
            </h3>
            <span className="text-[10px] text-brand-600 font-bold bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
              Ol Chiki Script
            </span>
          </div>
          <p className="text-base font-bold text-brand-950 dark:text-white leading-relaxed p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
            "{lesson.motherTongueExplanationSanthali}"
          </p>
          <p className="text-xs text-brand-700 dark:text-brand-300 italic">
            Audio synthesized with natural rural dialect cadence.
          </p>
        </div>
      </div>

      {/* Context & Classroom Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            Local Contextual Example
          </h3>
          <p className="text-sm font-semibold text-amber-950 dark:text-amber-200 leading-relaxed">
            {lesson.localExample}
          </p>
          <p className="text-[11px] text-amber-800 dark:text-amber-400">
            Using relatable situations from Santhal Pargana tribal life prevents cognitive overload.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 shadow-xs space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            Hands-on Classroom Activity
          </h3>
          <p className="text-sm font-semibold text-purple-950 dark:text-purple-200 leading-relaxed">
            {lesson.classroomActivity}
          </p>
          <p className="text-[11px] text-purple-800 dark:text-purple-400">
            Encourages peer collaboration and tangible object interaction.
          </p>
        </div>
      </div>

      {/* Practice Questions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          Formative Practice Questions (Bilingual)
        </h3>

        <div className="space-y-3">
          {lesson.practiceQuestions.map((pq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder space-y-2"
            >
              <div className="text-xs font-bold text-navy-900 dark:text-white">
                {idx + 1}. {pq.q}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {pq.options.map((opt, oidx) => (
                  <span
                    key={oidx}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                      opt === pq.answer
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                        : 'bg-white dark:bg-navy-800 border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300'
                    }`}
                  >
                    {opt} {opt === pq.answer && '✓ (Correct)'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Content Quality Check Modal */}
      <AIContentCheckModal
        isOpen={showCheckModal}
        onClose={() => setShowCheckModal(false)}
        contentTitle={lesson.title}
      />
    </div>
  );
}
