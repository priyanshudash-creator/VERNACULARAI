import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', showTagline = false, to = '/dashboard' }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link to={to} className="flex items-center gap-2.5 group select-none">
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-brand-600 via-brand-700 to-navy-950 flex items-center justify-center shadow-md shadow-brand-900/20 group-hover:shadow-brand-600/30 transition-all duration-200 border border-brand-500/30`}>
        {/* Multilingual / AI / Book insignia */}
        <svg viewBox="0 0 32 32" fill="none" className="w-5/6 h-5/6 text-white" xmlns="http://www.w3.org/2000/svg">
          {/* Open Book Base */}
          <path d="M4 22C7 20 12 20 16 23C20 20 25 20 28 22V8C25 6 20 6 16 9C12 6 7 6 4 8V22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.08)"/>
          {/* Neural AI nodes & speech link */}
          <circle cx="16" cy="11" r="2" fill="#F59E0B" />
          <circle cx="10" cy="15" r="1.5" fill="#34D399" />
          <circle cx="22" cy="15" r="1.5" fill="#34D399" />
          <path d="M10 15L16 11L22 15" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
          {/* Vernacular speech arch */}
          <path d="M16 4C21 4 25 7 25 11" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="1.5 2" strokeLinecap="round" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-navy-900 dark:text-white ${textSizes[size]}`}>
            VERNACULAR<span className="text-brand-600 dark:text-brand-400">AI</span>
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded border border-brand-200 dark:border-brand-800 tracking-wide">
            SIH 2026
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-navy-500 dark:text-navy-400">
            Teach in Hindi. Learn in Your Mother Tongue.
          </span>
        )}
      </div>
    </Link>
  );
}
