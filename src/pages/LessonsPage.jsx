import React from 'react';
import { Link } from 'react-router-dom';
import { LESSONS_CATALOG } from '../data/mockData';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Volume2,
  HardDrive
} from 'lucide-react';

export default function LessonsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <BookOpen className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Lesson Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {LESSONS_CATALOG.length} Standard Lessons
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            FLN-aligned bilingual pedagogical lesson plans with audio explanations and local contextual examples.
          </p>
        </div>

        <Link
          to="/lesson-generator"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>AI Lesson Generator</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LESSONS_CATALOG.map((lesson) => (
          <div
            key={lesson.id}
            className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {lesson.grade} • {lesson.subject}
                </span>
                <span className="font-mono text-[11px] text-navy-400">{lesson.flnCode}</span>
              </div>

              <h3 className="text-base font-bold text-navy-950 dark:text-white leading-snug">
                {lesson.title}
              </h3>

              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed line-clamp-2">
                {lesson.learningOutcome}
              </p>

              <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200/80 dark:border-darkborder text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
                  Mother Tongue Context:
                </span>
                <p className="text-brand-800 dark:text-brand-300 font-semibold line-clamp-1">
                  {lesson.motherTongueExplanationSanthali}
                </p>
                <p className="text-[11px] text-navy-600 dark:text-navy-400 italic truncate">
                  Local: {lesson.localExample}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-navy-500 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-navy-400" />
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-brand-600" />
                  {lesson.audioDuration}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <HardDrive className="w-3.5 h-3.5" />
                  Offline Ready
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-100 dark:border-darkborder/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                AI Verified
              </span>

              <Link
                to={`/lessons/${lesson.id}`}
                className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950 hover:bg-brand-100 text-brand-700 dark:text-brand-300 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>View Full Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
