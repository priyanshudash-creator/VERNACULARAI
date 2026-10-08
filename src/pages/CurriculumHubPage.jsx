import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LESSONS_CATALOG } from '../data/mockData';
import {
  BookOpen,
  Filter,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Languages,
  Plus
} from 'lucide-react';

export default function CurriculumHubPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const grades = ['All', 'Grade 1', 'Grade 2', 'Grade 3'];
  const subjects = ['All', 'Mathematics', 'Environmental Studies', 'Language (Hindi)'];
  const languages = ['All', 'Santhali', 'Ho', 'Mundari'];

  const curriculumModules = [
    {
      grade: "Grade 1",
      topics: [
        { name: "Numbers 1 to 10", outcome: "LO-M101: Count objects with physical pebbles", subject: "Mathematics" },
        { name: "Shapes Around Us", outcome: "LO-M103: Recognize circles, triangles in village houses", subject: "Mathematics" },
        { name: "Alphabet & Phonemes", outcome: "LO-L101: Connect sounds with symbols in mother tongue", subject: "Language (Hindi)" },
        { name: "Colors & Nature", outcome: "LO-E102: Identify primary colors from forest flowers", subject: "Environmental Studies" }
      ]
    },
    {
      grade: "Grade 2",
      topics: [
        { name: "Numbers 1 to 20 & Ten-Grouping", outcome: "LO-M201: Count and bundle objects up to 20", subject: "Mathematics", current: true },
        { name: "Simple Single-Digit Addition", outcome: "LO-M205: Combine groups of local counters up to 18", subject: "Mathematics" },
        { name: "Subtraction as Taking Away", outcome: "LO-M208: Basic takeaway with seeds and fruits", subject: "Mathematics" },
        { name: "Domestic & Wild Animals", outcome: "LO-E202: Distinguish home livestock from forest creatures", subject: "Environmental Studies" },
        { name: "Bilingual Oral Reading", outcome: "LO-L204: Read short simple sentences with picture cues", subject: "Language (Hindi)" }
      ]
    },
    {
      grade: "Grade 3",
      topics: [
        { name: "Numbers up to 100", outcome: "LO-M301: Place value and two-digit representation", subject: "Mathematics" },
        { name: "Repeated Addition (Multiplication)", outcome: "LO-M304: Grouping equal sets into tables", subject: "Mathematics" },
        { name: "Community Helpers in Village", outcome: "LO-E303: Roles of potter, weaver, and farmer", subject: "Environmental Studies" },
        { name: "Grammar: Naming Words", outcome: "LO-L302: Identify Sangya (noun) in mother tongue", subject: "Language (Hindi)" }
      ]
    }
  ];

  const filteredLessons = LESSONS_CATALOG.filter(l => {
    const matchGrade = selectedGrade === 'All' || l.grade === selectedGrade;
    const matchSubject = selectedSubject === 'All' || l.subject === selectedSubject;
    const matchLang = selectedLanguage === 'All' || l.language === selectedLanguage;
    const matchSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.topic?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSubject && matchLang && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <BookOpen className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Curriculum Hub & FLN Repository
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              NIPUN Bharat Aligned
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Competency-based primary pedagogy localized for Santhali, Ho, and Mundari tribal schools.
          </p>
        </div>

        <Link
          to="/lesson-generator"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generate New Lesson</span>
        </Link>
      </div>

      {/* Filters (Section 33) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy-700 dark:text-navy-300">
            <Filter className="w-4 h-4 text-navy-400" />
            <span>Filters:</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] text-navy-400">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] text-navy-400">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] text-navy-400">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic or FLN outcome..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl"
          />
        </div>
      </div>

      {/* Featured SCERT / NIPUN Modules by Grade (Section 33) */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-navy-950 dark:text-white">
          Jharkhand SCERT Foundational Learning Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curriculumModules.map((mod, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-2.5">
                  <h3 className="font-bold text-sm text-navy-950 dark:text-white">
                    {mod.grade} Competencies
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                    FLN Stage
                  </span>
                </div>

                <div className="space-y-2.5">
                  {mod.topics.map((top, tidx) => (
                    <div
                      key={tidx}
                      onClick={() => navigate('/lesson-generator')}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                        top.current
                          ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-300 dark:border-brand-800 ring-1 ring-brand-500/40'
                          : 'bg-navy-50/60 dark:bg-navy-950/40 border-navy-200/80 dark:border-darkborder hover:border-brand-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-navy-900 dark:text-white">
                        <span>{top.name}</span>
                        {top.current && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-navy-950">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 mt-1 leading-snug">
                        {top.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/lesson-generator"
                  className="w-full py-2 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 text-navy-800 dark:text-navy-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-600" />
                  <span>Generate Custom Lesson for {mod.grade}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Lesson Catalog Cards */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">
            Available Verified Bilingual Lessons ({filteredLessons.length})
          </h2>
          <Link to="/lessons" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            View All in Lesson Library →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder hover:border-brand-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    {lesson.grade} • {lesson.subject}
                  </span>
                  <span className="font-mono text-[11px] text-navy-400">{lesson.flnCode}</span>
                </div>

                <h3 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-brand-600 transition-colors leading-snug">
                  {lesson.title}
                </h3>

                <p className="text-xs text-navy-600 dark:text-navy-300 line-clamp-2 leading-relaxed">
                  {lesson.learningOutcome}
                </p>

                <div className="p-2.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200/80 dark:border-darkborder text-[11px] space-y-1">
                  <span className="font-semibold text-navy-500 block">Mother Tongue Link:</span>
                  <p className="text-brand-800 dark:text-brand-300 font-medium truncate">
                    {lesson.motherTongueExplanationSanthali}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-navy-100 dark:border-darkborder/50 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AI Verified
                </span>
                <span className="font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Open Lesson <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
