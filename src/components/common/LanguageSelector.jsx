import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSelector({ selectedLangId = 'santhali', onSelect }) {
  const [selected, setSelected] = useState(selectedLangId);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setSelected(selectedLangId);
  }, [selectedLangId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selected) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (langId) => {
    setSelected(langId);
    setIsOpen(false);
    if (onSelect) onSelect(langId);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-navy-200 dark:border-darkborder bg-white dark:bg-darkcard text-navy-800 dark:text-navy-100 hover:border-brand-500/50 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
        <span className="font-semibold text-navy-900 dark:text-white">{currentLang.name}</span>
        <span className="hidden sm:inline text-navy-400 dark:text-navy-500 text-[11px]">({currentLang.nativeName.split(' ')[0]})</span>
        <ChevronDown className="w-3 h-3 text-navy-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy-400 dark:text-navy-500 border-b border-navy-100 dark:border-darkborder/50">
            Classroom Mother Tongue
          </div>
          {SUPPORTED_LANGUAGES.filter(l => l.id !== 'hindi').map((lang) => {
            const isSelected = selected === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                className={`w-full px-3 py-2 text-left flex items-start justify-between transition-colors ${
                  isSelected
                    ? 'bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'hover:bg-navy-50 dark:hover:bg-navy-800/40 text-navy-800 dark:text-navy-200'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {lang.name}
                    <span className="text-[10px] font-normal text-navy-500 dark:text-navy-400">
                      • {lang.nativeName}
                    </span>
                  </div>
                  <div className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5">
                    Script: {lang.script} • {lang.status}
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
