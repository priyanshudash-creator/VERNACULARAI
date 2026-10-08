import React, { useState } from 'react';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  CheckSquare,
  Plus,
  Trash2,
  Edit2,
  Volume2,
  Sparkles,
  CheckCircle2,
  Share2,
  Languages,
  BookOpen
} from 'lucide-react';

export default function AssessmentsPage() {
  const [assessmentTitle, setAssessmentTitle] = useState("Grade 2 Formative Oral Assessment: Numbers 1–20");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      qHindi: "1. 10 और 5 मिलकर कितने होते हैं?",
      qSanthali: "᱑᱐ ᱟᱨ ᱕ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ?",
      options: ["14 (ᱜᱮᱞ ᱯᱩᱱ)", "15 (ᱜᱮᱞ ᱢᱚᱬᱮ)", "16 (ᱜᱮᱞ ᱛᱩᱨᱩᱭ)"],
      correct: "15 (ᱜᱮᱞ ᱢᱚᱬᱮ)",
      type: "Oral Question"
    },
    {
      id: 2,
      qHindi: "2. चित्र में दिए गए 8 आमों को संथाली में क्या कहते हैं?",
      qSanthali: "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱘ ᱜᱚᱴᱟᱝ ᱩᱞ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ?",
      options: ["ᱮᱭᱟᱭ (7)", "ᱤᱨᱟᱹᱞ (8)", "ᱟᱨᱮ (9)"],
      correct: "ᱤᱨᱟᱹᱞ (8)",
      type: "Visual Counting"
    },
    {
      id: 3,
      qHindi: "3. यदि आपके पास 7 बेर हैं और 2 मित्र को दिए, कितने बचे?",
      qSanthali: "ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱗ ᱡᱟᱹᱱᱩᱢ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?",
      options: ["4", "5 (ᱢᱚᱬᱮ)", "6"],
      correct: "5 (ᱢᱚᱬᱮ)",
      type: "Story Problem"
    }
  ]);

  const [publishedAlert, setPublishedAlert] = useState(false);

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: Date.now(),
      qHindi: "4. संख्या 12 का संथाली नाम क्या है?",
      qSanthali: "ᱮᱞ ᱑᱒ ᱨᱮᱱᱟᱜ ᱥᱟᱱᱛᱟᱲᱤ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?",
      options: ["ᱜᱮᱞ ᱢᱤᱫ (11)", "ᱜᱮᱞ ᱵᱟᱨ (12)", "ᱜᱮᱞ ᱯᱮ (13)"],
      correct: "ᱜᱮᱞ ᱵᱟᱨ (12)",
      type: "Multiple Choice"
    };
    setQuestions([...questions, newQ]);
  };

  const handlePublish = () => {
    setPublishedAlert(true);
    setTimeout(() => setPublishedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <CheckSquare className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Assessment Builder & Formative Quizzes
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 38
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Create bilingual oral and written tests aligned with Grade 2 FLN learning outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-800 dark:text-navy-100 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-600" />
            <span>Add Question</span>
          </button>

          <button
            onClick={handlePublish}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Share2 className="w-4 h-4" />
            <span>Publish to 28 Students</span>
          </button>
        </div>
      </div>

      {publishedAlert && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Assessment published to Grade 2 Student Tablet Roster & Offline Sync Queue!</span>
        </div>
      )}

      {/* Assessment Settings Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <div>
          <label className="text-xs font-bold text-navy-600 dark:text-navy-300 uppercase tracking-wider block mb-1">
            Assessment Title
          </label>
          <input
            type="text"
            value={assessmentTitle}
            onChange={(e) => setAssessmentTitle(e.target.value)}
            className="w-full p-2.5 text-sm font-bold rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-navy-600 dark:text-navy-300">
          <span>Grade: <strong>Grade 2</strong></span>
          <span>•</span>
          <span>Target Mother Tongue: <strong>Santhali (Ol Chiki)</strong></span>
          <span>•</span>
          <span>LO Code: <strong>LO-M201 (Foundational Numeracy)</strong></span>
          <span>•</span>
          <span>Total Questions: <strong>{questions.length}</strong></span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                {q.type}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speechSynthesizer.speak(`${q.qHindi} ${q.qSanthali}`, { lang: 'hi-IN' })}
                  className="p-1.5 rounded-lg text-navy-500 hover:text-brand-600 hover:bg-navy-100"
                  title="Play audio prompt"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-navy-950 dark:text-white">
                {q.qHindi}
              </p>
              <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                {q.qSanthali}
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-navy-500 block mb-1">
                Options / Key:
              </span>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt, oidx) => (
                  <span
                    key={oidx}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                      opt === q.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                        : 'bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300 border-navy-200 dark:border-darkborder'
                    }`}
                  >
                    {opt} {opt === q.correct && '✓ Correct'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
