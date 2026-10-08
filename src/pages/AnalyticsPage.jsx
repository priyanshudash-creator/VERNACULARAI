import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Languages,
  Award,
  AlertTriangle,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  // Weekly Learning Progress Line Data
  const progressData = [
    { week: 'Week 1', score: 68, attendance: 88 },
    { week: 'Week 2', score: 72, attendance: 90 },
    { week: 'Week 3', score: 76, attendance: 89 },
    { week: 'Week 4', score: 79, attendance: 92 },
    { week: 'Week 5', score: 82, attendance: 94 }
  ];

  // Topic Average Score Bar Data
  const topicScoreData = [
    { topic: 'Counting 1-20', score: 84 },
    { topic: 'Shapes & Art', score: 91 },
    { topic: 'Storytelling', score: 88 },
    { topic: 'Addition', score: 71 },
    { topic: 'Reading Hindi', score: 65 }
  ];

  // Language Usage Donut Data (Section 41)
  const languageData = [
    { name: 'Santhali', value: 64, color: '#059669' },
    { name: 'Hindi', value: 21, color: '#3B82F6' },
    { name: 'Ho', value: 10, color: '#F59E0B' },
    { name: 'Mundari', value: 5, color: '#8B5CF6' }
  ];

  // Daily Translation Sessions
  const dailySessionsData = [
    { day: 'Mon', sessions: 28 },
    { day: 'Tue', sessions: 34 },
    { day: 'Wed', sessions: 31 },
    { day: 'Thu', sessions: 38 },
    { day: 'Fri', sessions: 42 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <BarChart3 className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Classroom Learning Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              Grade 2 • 28 Students
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Real-time monitoring of FLN outcomes, bilingual speech interaction, and remedial performance.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          📈 NIPUN Benchmark Progress: +14%
        </div>
      </div>

      {/* Row 1: Learning Progress & Average Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Progress Trend */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-600" />
              Learning Progress & Attendance Trend
            </h3>
            <span className="text-xs text-navy-400">Past 5 Weeks</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Class Score (%)"
                  stroke="#059669"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  name="Attendance (%)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average Score by Topic */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Average Competency by Subject Topic
            </h3>
            <span className="text-xs text-navy-400">FLN Target: 75%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicScoreData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="topic" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" name="Score (%)" fill="#047857" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Language Usage Donut & Daily Sessions Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Language Usage (Section 41) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Languages className="w-4 h-4 text-purple-600" />
              Classroom Language Usage Distribution
            </h3>
            <span className="text-xs text-navy-400">Speech Sessions</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-navy-100 dark:border-darkborder">
            <div>
              <div className="font-bold text-emerald-600">Santhali 64%</div>
              <div className="text-[10px] text-navy-400">Primary Mother Tongue</div>
            </div>
            <div>
              <div className="font-bold text-blue-600">Hindi 21%</div>
              <div className="text-[10px] text-navy-400">Teacher Instruction</div>
            </div>
            <div>
              <div className="font-bold text-amber-600">Ho 10%</div>
              <div className="text-[10px] text-navy-400">Kolhan Students</div>
            </div>
            <div>
              <div className="font-bold text-purple-600">Mundari 5%</div>
              <div className="text-[10px] text-navy-400">Tribal Dialect</div>
            </div>
          </div>
        </div>

        {/* Chart 4: Daily Translation Sessions & Difficult Topics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              Weekly Live Translation Sessions
            </h3>
            <span className="text-xs font-mono font-bold text-brand-600">146 Total</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySessionsData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="sessions" name="Sessions" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Difficult Topics (Section 41) */}
          <div className="pt-2 border-t border-navy-100 dark:border-darkborder space-y-2">
            <span className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider block">
              Top 3 Most Difficult Topics Identified by AI:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-800 dark:text-rose-300 font-bold">
                1. Single-Digit Addition
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 font-bold">
                2. Devanagari Reading
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 text-orange-800 dark:text-orange-300 font-bold">
                3. Number Recognition
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
