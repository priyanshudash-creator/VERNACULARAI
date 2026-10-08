import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { TEACHER_PROFILE, LEARNING_GAPS_DATA, DAILY_TEACHING_PLAN_DEFAULT } from '../data/mockData';
import {
  Radio,
  Languages,
  Sparkles,
  FileSpreadsheet,
  Layers,
  CalendarDays,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  HardDrive,
  Volume2,
  RefreshCw,
  Clock,
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { isOfflineModeActive } = useOffline();
  const navigate = useNavigate();

  const [adapterState, setAdapterState] = useState({
    actionDone: null,
    loading: false
  });

  const handleAdapterAction = (actionType) => {
    setAdapterState({ actionDone: null, loading: true });
    setTimeout(() => {
      setAdapterState({ actionDone: actionType, loading: false });
    }, 1000);
  };

  const statCards = [
    {
      title: "Enrolled Students",
      value: "28",
      subtitle: "Grade 2 • 91.4% Attendance",
      trend: "+2 this term",
      icon: Users,
      color: "from-blue-600 to-indigo-600",
      link: "/students"
    },
    {
      title: "Lessons Completed",
      value: "18 / 20",
      subtitle: "NIPUN FLN Numeracy Track",
      trend: "90% target met",
      icon: BookOpen,
      color: "from-emerald-600 to-brand-700",
      link: "/lessons"
    },
    {
      title: "Class Average Score",
      value: "82%",
      subtitle: "Formative & Oral Quizzes",
      trend: "+8% vs last month",
      icon: Award,
      color: "from-amber-600 to-orange-600",
      link: "/analytics"
    },
    {
      title: "Translation Sessions",
      value: "146",
      subtitle: "Hindi ↔ Santhali Live Speech",
      trend: "1.6s avg response",
      icon: Languages,
      color: "from-purple-600 to-indigo-700",
      link: "/translator"
    }
  ];

  const quickActions = [
    {
      title: "Start Live Classroom",
      desc: "Real-time bilingual microphone translation with Santhali audio",
      icon: Radio,
      badge: "Hero Feature",
      highlight: true,
      link: "/classroom",
      bgClass: "bg-gradient-to-br from-brand-700 to-emerald-900 text-white"
    },
    {
      title: "Two-Way AI Translator",
      desc: "Instant text & voice conversion between Hindi and tribal dialects",
      icon: Languages,
      badge: "Speech AI",
      link: "/translator",
      bgClass: "bg-white dark:bg-darkcard text-navy-900 dark:text-white"
    },
    {
      title: "Generate AI Lesson",
      desc: "Create NIPUN Bharat FLN lesson plans with local tribal examples",
      icon: Sparkles,
      badge: "Pedagogy",
      link: "/lesson-generator",
      bgClass: "bg-white dark:bg-darkcard text-navy-900 dark:text-white"
    },
    {
      title: "Create Bilingual Worksheet",
      desc: "A4 printable counting exercises with Ol Chiki & Devanagari",
      icon: FileSpreadsheet,
      badge: "Print Ready",
      link: "/worksheets",
      bgClass: "bg-white dark:bg-darkcard text-navy-900 dark:text-white"
    },
    {
      title: "Interactive Flashcards",
      desc: "Visual bilingual cards for numbers, animals, and flora",
      icon: Layers,
      badge: "Visual Aid",
      link: "/flashcards",
      bgClass: "bg-white dark:bg-darkcard text-navy-900 dark:text-white"
    },
    {
      title: "AI Daily Teaching Plan",
      desc: "45-minute scheduled agenda integrating mother-tongue activities",
      icon: CalendarDays,
      badge: "Structured",
      link: "/daily-plan",
      bgClass: "bg-white dark:bg-darkcard text-navy-900 dark:text-white"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Teacher Welcome Banner (Section 25) */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-850 to-navy-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-brand-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/40">
                Government Primary School, Kendua
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 flex items-center gap-1 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>🟢 Offline AI Ready</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good Morning, {user?.name || "Sunita Kumari"} 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Dumka Sadar Block, Jharkhand • Classroom Language: <strong>Santhali ( Ol Chiki )</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Today's Lesson: <strong>Numbers 1–20</strong></span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-300" />
                <span>Enrolled: <strong>28 Students (Grade 2)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2.5 flex-shrink-0">
            <Link
              to="/classroom"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-xs shadow-lg transition-all hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Radio className="w-4 h-4 text-navy-950 animate-pulse" />
              <span>Launch Live Classroom</span>
            </Link>

            <Link
              to="/daily-plan"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5 justify-center"
            >
              <CalendarDays className="w-3.5 h-3.5 text-slate-300" />
              <span>View Today's 45-Min Plan</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards (Section 26) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-navy-500 dark:text-navy-400">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-xs group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-2xl font-extrabold text-navy-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] text-navy-500 dark:text-navy-400 mt-0.5 truncate">
                  {stat.subtitle}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-navy-100 dark:border-darkborder/50 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
                <span className="text-navy-400 group-hover:text-brand-600 transition-colors">
                  Details →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* NEW FEATURE CARD: AI Learning-Level Adapter (Section 4) */}
      <div className="rounded-3xl bg-white dark:bg-darkcard border-2 border-brand-500/40 dark:border-brand-500/30 shadow-md p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
                AI Learning Recommendation
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200">
                  Adaptive Pedagogy
                </span>
              </h3>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 max-w-3xl">
              <p className="text-xs text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                💬 <strong>Rahul Soren</strong> scored <strong>45%</strong> in Teen Number Recognition (11–20).
                <br />
                <em>"Rahul is struggling with number recognition above 10. Try visual counting activities with 1–10 tamarind seeds before moving to 1–20."</em>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => handleAdapterAction('easier_activity')}
              disabled={adapterState.loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white shadow-xs transition-colors"
            >
              {adapterState.loading && adapterState.actionDone === null ? 'Adapting...' : 'Generate Easier Activity'}
            </button>

            <button
              onClick={() => handleAdapterAction('practice')}
              disabled={adapterState.loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 text-navy-800 dark:text-navy-100 transition-colors"
            >
              Generate Practice
            </button>

            <button
              onClick={() => handleAdapterAction('explain_again')}
              disabled={adapterState.loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-50 transition-colors"
            >
              Explain Again
            </button>
          </div>
        </div>

        {adapterState.actionDone && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {adapterState.actionDone === 'easier_activity' && "Simplified 1-to-10 Seed Counter Activity Created for Rahul!"}
                {adapterState.actionDone === 'practice' && "5 Remedial Santhali Counting Cards Added to Queue!"}
                {adapterState.actionDone === 'explain_again' && "Mother Tongue Voice Explanation Ready in Classroom Mode!"}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
              Difficulty level stepped down from <em>Intermediate</em> to <em>Concrete Hands-On (FLN Step 1)</em>.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions (Section 27) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">
            Quick Actions
          </h2>
          <span className="text-xs text-navy-500">Fast Classroom Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((qa, idx) => {
            const Icon = qa.icon;
            return (
              <Link
                key={idx}
                to={qa.link}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md ${
                  qa.highlight
                    ? 'border-brand-500/50 hover:border-brand-400'
                    : 'border-navy-200 dark:border-darkborder hover:border-brand-500/40'
                } ${qa.bgClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${
                      qa.highlight
                        ? 'bg-white/20 text-amber-300'
                        : 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                    } group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      qa.highlight
                        ? 'bg-amber-400 text-navy-950'
                        : 'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300'
                    }`}>
                      {qa.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm leading-snug">
                      {qa.title}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      qa.highlight ? 'text-slate-200' : 'text-navy-500 dark:text-navy-400'
                    }`}>
                      {qa.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Learning Gaps Preview & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Learning Gaps Preview (Section 9) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">
                  Class Learning Gaps
                </h3>
                <p className="text-[11px] text-navy-500">Diagnosed across 28 Grade 2 students</p>
              </div>
            </div>

            <Link
              to="/learning-gaps"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Full Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {LEARNING_GAPS_DATA.summary.map((gap, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-navy-800 dark:text-navy-200">
                    {gap.topic}
                  </span>
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    {gap.percentage}% need support
                  </span>
                </div>
                <div className="w-full bg-navy-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      gap.percentage > 30 ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${gap.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/learning-gaps"
              className="w-full py-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Remedial Plan for Number Recognition</span>
            </Link>
          </div>
        </div>

        {/* Right: Daily Teaching Plan Agenda (Section 10) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">
                  Today's Teaching Plan
                </h3>
                <p className="text-[11px] text-navy-500">09:00 AM – 09:45 AM • Math (Grade 2)</p>
              </div>
            </div>

            <Link
              to="/daily-plan"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Edit Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {DAILY_TEACHING_PLAN_DEFAULT.schedule.slice(0, 4).map((slot, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950/40 border border-navy-200/80 dark:border-darkborder flex items-start gap-3"
              >
                <span className="font-mono text-[11px] font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap mt-0.5">
                  {slot.time.split(' – ')[0]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-navy-900 dark:text-white truncate">
                      {slot.activity}
                    </h4>
                    <span className="text-[10px] text-navy-400">{slot.duration}</span>
                  </div>
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 truncate mt-0.5">
                    {slot.detailsHindi}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <Link
              to="/classroom"
              className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Start 09:00 Lesson</span>
            </Link>
            <Link
              to="/worksheets"
              className="px-4 py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 font-semibold text-xs transition-colors hover:bg-navy-200"
            >
              Worksheets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
