import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffline } from '../context/OfflineContext';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import AIContentCheckModal from '../components/common/AIContentCheckModal';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Volume2,
  Download,
  FileSpreadsheet,
  Compass,
  Radio,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function LessonGeneratorPage() {
  const navigate = useNavigate();
  const { saveLessonOffline } = useOffline();

  const [formData, setFormData] = useState({
    grade: "Grade 2",
    subject: "Mathematics",
    topic: "Numbers 1–20",
    learningOutcome: "Student can identify, count and sequence numbers from 1 to 20 using local objects.",
    targetLanguage: "Santhali",
    difficulty: "Beginner"
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedLesson, setGeneratedLesson] = useState(null);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const generationSteps = [
    "Analyzing SCERT Jharkhand Curriculum standards...",
    "Retrieving local tribal pedagogical contexts (Dumka Haat)...",
    "Generating bilingual explanations in Hindi & Santhali (Ol Chiki)...",
    "Synthesizing classroom hands-on counters and games...",
    "Validating with NIPUN Bharat Foundational Numeracy checks..."
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(1);
    setGeneratedLesson(null);

    setTimeout(() => setGenerationStep(2), 500);
    setTimeout(() => setGenerationStep(3), 1100);
    setTimeout(() => setGenerationStep(4), 1700);
    setTimeout(() => setGenerationStep(5), 2300);

    setTimeout(() => {
      setIsGenerating(false);
      const newLesson = {
        id: `ai-gen-${Date.now()}`,
        title: `${formData.topic}: Localized Vernacular Pedagogy`,
        subject: formData.subject,
        grade: formData.grade,
        language: formData.targetLanguage,
        difficulty: formData.difficulty,
        duration: "45 mins",
        learningOutcome: formData.learningOutcome,
        flnCode: "FLN-NUM-G2-01",
        teacherExplanationHindi: "बच्चों, जब हम 10 से आगे बढ़ते हैं, तो 10 में 1 मिलाने पर 11 बनता है। इसे दस और एक कहते हैं।",
        motherTongueExplanationSanthali: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱚᱠᱷᱚᱱ ᱟᱵᱚ ᱑᱐ ᱠᱷᱚᱱ ᱞᱟᱦᱟ ᱵᱚᱱ ᱥᱮᱱᱚᱜᱼᱟ, ᱑᱐ ᱥᱟᱶ ᱑ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱑᱑ (ᱜᱮᱞ ᱢᱤᱫ) ᱦᱩᱭᱩᱜᱼᱟ᱾",
        latinTransliteration: "Gidra ko, jokhon abo 10 khon laha bon senog'a, 10 saw mid mesa lekhan 11 (Gel Mid) huyug'a.",
        localExample: "दुमका के साप्ताहिक हाट में महुआ या जामुन के 10-10 के बंडल बनाकर गिनना।",
        classroomActivity: "टिका-टिका गिनो खेल: 5-5 बच्चों का समूह बनाकर 20 इमली के बीजों को गिनना और संथाली में नाम बोलना।",
        practiceQuestions: [
          { q: "10 और 4 मिलकर कितने होते हैं?", options: ["13", "14 (ᱜᱮᱞ ᱯᱩᱱ)", "15"], ans: "14" },
          { q: "Santhali में '20' को क्या कहते हैं?", options: ["ᱠᱩᱲᱤ / ᱤᱥᱤ", "ᱜᱮᱞ", "ᱯᱮ"], ans: "ᱠᱩᱲᱤ / ᱤᱥᱤ" }
        ]
      };
      setGeneratedLesson(newLesson);
    }, 2800);
  };

  const handleSaveOffline = () => {
    if (!generatedLesson) return;
    saveLessonOffline(generatedLesson);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Vernacular Lesson Generator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 34 & 35
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Generate culturally contextualized, FLN-aligned primary lessons with bilingual explanations.
          </p>
        </div>
      </div>

      {/* Generator Inputs Form (Section 34) */}
      <form onSubmit={handleGenerate} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-6">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-3">
          Lesson Parameters & Learning Outcomes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              Grade Level
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Environmental Studies">Environmental Studies</option>
              <option value="Language (Hindi)">Language (Hindi)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              Classroom Mother Tongue
            </label>
            <select
              value={formData.targetLanguage}
              onChange={(e) => setFormData({ ...formData, targetLanguage: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.name}>
                  {lang.name} ({lang.nativeName.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              Topic / Theme
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g. Numbers 1–20 / Addition / Shapes"
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              Pedagogical Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            >
              <option value="Beginner">Beginner (Concrete / Visual)</option>
              <option value="Intermediate">Intermediate (Symbolic)</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-3">
            <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
              NIPUN Bharat Learning Outcome Target
            </label>
            <textarea
              rows={2}
              value={formData.learningOutcome}
              onChange={(e) => setFormData({ ...formData, learningOutcome: e.target.value })}
              placeholder="Target competence the child must achieve..."
              className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-700 to-emerald-800 hover:from-brand-500 hover:to-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-brand-700/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isGenerating ? "Synthesizing Vernacular Pedagogy..." : "Generate AI Lesson"}</span>
        </button>
      </form>

      {/* Realistic AI Generation Progress Pipeline (Section 34) */}
      {isGenerating && (
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-brand-500/40 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping"></span>
              <span className="text-xs font-bold text-navy-900 dark:text-white">
                AI Generation in Progress
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-brand-600">
              Step {generationStep} of 5
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            <span className="font-semibold">{generationSteps[generationStep - 1]}</span>
          </div>

          <div className="w-full bg-navy-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(generationStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Resulting Generated Lesson (Section 35) */}
      {generatedLesson && !isGenerating && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border-2 border-brand-500/50 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 dark:border-darkborder pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {generatedLesson.grade} • {generatedLesson.subject}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {generatedLesson.language}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  ✓ AI Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                {generatedLesson.title}
              </h2>
            </div>

            {/* Quick Actions Bar on Generated Lesson */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => speechSynthesizer.speak(generatedLesson.teacherExplanationHindi, { lang: 'hi-IN' })}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Audio</span>
              </button>

              <button
                onClick={() => setShowCheckModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 font-bold text-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI Content Check</span>
              </button>

              <button
                onClick={handleSaveOffline}
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Offline</span>
              </button>
            </div>
          </div>

          {savedAlert && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved to Offline Database!</span>
            </div>
          )}

          {/* Bilingual Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
                Teacher Explanation (Hindi):
              </span>
              <p className="text-sm font-semibold text-navy-900 dark:text-white leading-relaxed">
                "{generatedLesson.teacherExplanationHindi}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block">
                Mother Tongue Explanation (Santhali Ol Chiki):
              </span>
              <p className="text-base font-bold text-brand-950 dark:text-white leading-relaxed">
                "{generatedLesson.motherTongueExplanationSanthali}"
              </p>
              <p className="text-xs text-brand-700 dark:text-brand-300 italic">
                "{generatedLesson.latinTransliteration}"
              </p>
            </div>
          </div>

          {/* Local Example & Hands-on Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                Culturally Grounded Example:
              </span>
              <p className="text-xs font-semibold text-amber-950 dark:text-amber-200">
                {generatedLesson.localExample}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block">
                Hands-on Classroom Activity:
              </span>
              <p className="text-xs font-semibold text-purple-950 dark:text-purple-200">
                {generatedLesson.classroomActivity}
              </p>
            </div>
          </div>

          {/* Practice Questions */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider block">
              Formative Practice Check:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generatedLesson.practiceQuestions.map((pq, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder text-xs">
                  <div className="font-bold text-navy-900 dark:text-white">{pq.q}</div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-1">
                    Correct: {pq.ans}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downstream Actions: Classroom, Worksheet, Story */}
          <div className="pt-4 border-t border-navy-100 dark:border-darkborder flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/classroom')}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Teach in Live Classroom</span>
            </button>

            <button
              onClick={() => navigate('/worksheets')}
              className="px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 hover:bg-navy-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-brand-600" />
              <span>Generate Worksheet</span>
            </button>

            <button
              onClick={() => navigate('/ai-stories')}
              className="px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 hover:bg-navy-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-purple-600" />
              <span>Generate Local Story</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Quality Check Modal */}
      <AIContentCheckModal
        isOpen={showCheckModal}
        onClose={() => setShowCheckModal(false)}
        contentTitle={generatedLesson?.title || "Numbers 1-20 Lesson"}
      />
    </div>
  );
}
