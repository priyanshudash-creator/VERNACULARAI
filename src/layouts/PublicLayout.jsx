import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Logo from '../components/common/Logo';
import ThemeToggle from '../components/common/ThemeToggle';
import DemoTourBanner from '../components/common/DemoTourBanner';
import { Globe, ArrowRight, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1220] flex flex-col text-navy-900 dark:text-[#F8FAFC]">
      {/* Public Navbar */}
      <nav className="border-b border-navy-200 dark:border-darkborder bg-white/90 dark:bg-darkcard/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Logo size="md" showTagline={true} to="/" />

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-navy-700 dark:text-navy-200">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Overview
          </Link>
          <Link to="/how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            How It Works
          </Link>
          <Link to="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/classroom" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 text-brand-600 dark:text-brand-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Classroom
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-700/20 transition-all flex items-center gap-1.5"
          >
            <span>Teacher Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Main Public Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="border-t border-navy-200 dark:border-darkborder bg-white dark:bg-navy-950/80 py-10 px-4 sm:px-8 text-xs text-navy-600 dark:text-navy-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Logo size="sm" showTagline={false} to="/" />
            <p className="text-navy-600 dark:text-navy-300 leading-relaxed text-[11px]">
              AI-Powered Vernacular Pedagogy and Real-Time Translation Tool for Mother Tongue-Based Primary Education.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[10px] font-semibold">
              <Globe className="w-3.5 h-3.5 text-brand-600" />
              26 Vernacular & Regional Languages Supported
            </div>
          </div>

          <div>
            <h5 className="font-bold text-navy-900 dark:text-white mb-2.5 uppercase tracking-wider text-[11px]">
              Supported Languages (26)
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Odia (ଓଡ଼ିଆ) — Core Language</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Hindi (हिन्दी) — Medium of Instruction</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Santhali (ᱥᱟᱱᱛᱟᱲᱤ) — Ol Chiki & Devanagari</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Ho, Mundari, Bengali, Telugu & 20 More</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-navy-900 dark:text-white mb-2.5 uppercase tracking-wider text-[11px]">
              Core Modules
            </h5>
            <ul className="space-y-1 text-[11px]">
              <li><Link to="/classroom" className="hover:text-brand-600">Real-Time Classroom Speech</Link></li>
              <li><Link to="/translator" className="hover:text-brand-600">Two-Way AI Translator</Link></li>
              <li><Link to="/learning-gaps" className="hover:text-brand-600">Learning Gap Detection (FLN)</Link></li>
              <li><Link to="/lesson-generator" className="hover:text-brand-600">AI Lesson & Story Generator</Link></li>
              <li><Link to="/offline" className="hover:text-brand-600">Offline-First AI Engine</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-navy-900 dark:text-white mb-2.5 uppercase tracking-wider text-[11px]">
              National Alignment
            </h5>
            <p className="text-[11px] leading-relaxed text-navy-600 dark:text-navy-300 mb-2">
              Designed in alignment with <strong>NEP 2020</strong> mother tongue education recommendations and <strong>NIPUN Bharat FLN</strong> targets for regional and tribal classrooms.
            </p>
            <p className="text-[10px] text-navy-400">
              © 2026 VernacularAI. Mother Tongue-Based Primary Education Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
