import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DAILY_TEACHING_PLAN_DEFAULT } from '../data/mockData';
import { useOffline } from '../context/OfflineContext';
import {
  CalendarDays,
  Clock,
  Radio,
  FileSpreadsheet,
  Download,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Languages,
  Play
} from 'lucide-react';

export default function DailyPlanPage() {
  const navigate = useNavigate();
  const { saveLessonOffline } = useOffline();

  const [plan, setPlan] = useState(DAILY_TEACHING_PLAN_DEFAULT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const [config, setConfig] = useState({
    grade: "Grade 2",
    subject: "Mathematics",
    timeAvailable: "45 Minutes",
    topic: "Numbers 1 to 20 & Ten-Grouping",
    targetLanguage: "Santhali"
  });

  const handleRegenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setPlan({
        ...plan,
        grade: config.grade,
        subject: config.subject,
        topic: config.topic,
        targetLanguage: config.targetLanguage,
        availableTime: config.timeAvailable
      });
    }, 1200);
  };

  const handleSaveOffline = () => {
    saveLessonOffline({
      id: `daily-plan-${Date.now()}`,
      title: plan.topic,
      grade: plan.grade,
      subject: plan.subject,
      duration: plan.availableTime,
      teacherExplanationHindi: "45-Minute Daily Schedule with Vernacular Bridge"
    });
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
              <CalendarDays className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Daily Teaching Plan
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 10 & 43
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Automated pedagogical period pacing integrating Hindi instruction with mother-tongue activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/classroom')}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Start Lesson in Classroom</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Daily plan saved to Offline Teaching Schedule!</span>
        </div>
      )}

      {/* Plan Parameters Form */}
      <form onSubmit={handleRegenerate} className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
          Plan Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Grade</label>
            <select
              value={config.grade}
              onChange={(e) => setConfig({ ...config, grade: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Subject</label>
            <select
              value={config.subject}
              onChange={(e) => setConfig({ ...config, subject: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Environmental Studies">Environmental Studies</option>
              <option value="Language (Hindi)">Language (Hindi)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Available Period Time</label>
            <select
              value={config.timeAvailable}
              onChange={(e) => setConfig({ ...config, timeAvailable: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="30 Minutes">30 Minutes</option>
              <option value="45 Minutes">45 Minutes (Standard)</option>
              <option value="60 Minutes">60 Minutes</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Mother Tongue</label>
            <select
              value={config.targetLanguage}
              onChange={(e) => setConfig({ ...config, targetLanguage: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Santhali">Santhali</option>
              <option value="Ho">Ho</option>
              <option value="Mundari">Mundari</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 text-navy-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>{isGenerating ? "Recalculating Schedule..." : "Recalculate AI Schedule"}</span>
        </button>
      </form>

      {/* Structured 45-Minute Daily Schedule (Section 10 & 43) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 dark:border-darkborder pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {plan.grade} • {plan.subject}
            </span>
            <h2 className="text-xl font-extrabold text-navy-950 dark:text-white mt-1">
              {plan.topic}
            </h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Target Outcome: {plan.learningOutcome}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveOffline}
              className="px-3.5 py-2 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Offline</span>
            </button>

            <button
              onClick={() => navigate('/worksheets')}
              className="px-3.5 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-brand-600" />
              <span>Generate Worksheet</span>
            </button>
          </div>
        </div>

        {/* Schedule Timeline Slots */}
        <div className="space-y-4">
          {plan.schedule.map((slot, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-darkborder font-mono text-xs font-extrabold text-brand-600 whitespace-nowrap">
                  {slot.time}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-navy-950 dark:text-white">
                      {slot.activity}
                    </h3>
                    <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      {slot.type}
                    </span>
                  </div>

                  <p className="text-xs text-navy-700 dark:text-navy-200 leading-snug">
                    {slot.detailsHindi}
                  </p>
                  <p className="text-[11px] text-brand-800 dark:text-brand-300 font-medium">
                    {slot.detailsSanthali}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[11px] font-semibold text-navy-400">
                  {slot.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
