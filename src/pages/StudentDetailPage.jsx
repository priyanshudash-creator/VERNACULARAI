import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { STUDENTS_DATA } from '../data/mockData';
import {
  User,
  ArrowLeft,
  Award,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  MapPin,
  Languages
} from 'lucide-react';

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = STUDENTS_DATA.find((s) => s.id === id) || STUDENTS_DATA[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 dark:text-navy-300 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Roster</span>
        </Link>

        <button
          onClick={() => navigate('/learning-gaps')}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Generate Remedial Plan</span>
        </button>
      </div>

      {/* Main Student Header Card (Section 40) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-3xl ${student.avatarColor} text-white text-2xl font-black flex items-center justify-center shadow-md`}>
              {student.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-navy-950 dark:text-white">
                  {student.name}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  student.progressStatus === 'Excellent'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {student.progressStatus}
                </span>
              </div>

              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                Roll No: <strong>{student.rollNo}</strong> • {student.grade} • Guardian: {student.parentName} ({student.village})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-center sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-navy-100">
            <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950">
              <div className="text-xs text-navy-400 uppercase font-semibold">Score</div>
              <div className="text-xl font-black text-navy-900 dark:text-white">{student.score}%</div>
            </div>
            <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950">
              <div className="text-xs text-navy-400 uppercase font-semibold">Attendance</div>
              <div className="text-xl font-black text-emerald-600">{student.attendance}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Breakdown: Strong vs Weak Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Mastered / Strong Areas</span>
          </div>

          <div className="space-y-2">
            {student.strongTopics.map((st, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center justify-between"
              >
                <span>{st}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  High Confidence
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics / Support Needed */}
        <div className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Learning Gaps (Needs Support)</span>
          </div>

          <div className="space-y-2">
            {student.weakTopics.map((wt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-rose-200 dark:border-rose-800/40 text-xs font-semibold text-rose-900 dark:text-rose-200 flex items-center justify-between"
              >
                <span>{wt}</span>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                  Remedial Priority
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Formative Assessments History */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-600" />
          Recent Quiz Results & Formative Assessments
        </h3>

        <div className="space-y-3">
          {student.recentAssessments.map((a, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-navy-900 dark:text-white">
                  {a.topic}
                </div>
                <div className="text-[11px] text-navy-400">Date: {a.date}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-32 bg-navy-200 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full"
                    style={{ width: `${a.score}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-navy-950 dark:text-white">
                  {a.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Remarks & Mother Tongue Pedagogy Notes */}
      <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
          Teacher Field Observation & Vernacular Note:
        </span>
        <p className="text-sm font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
          "{student.remarks}"
        </p>
      </div>
    </div>
  );
}
