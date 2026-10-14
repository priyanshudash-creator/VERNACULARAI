import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSelector({ selectedLangId = 'odia', onSelect }) {
  const [selected, setSelected] = useState(selectedLangId);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    setSearchQuery('');
    if (onSelect) onSelect(langId);
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.script.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-navy-200 dark:border-darkborder bg-white dark:bg-darkcard text-navy-800 dark:text-navy-100 hover:border-brand-500/50 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
      >
        <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
        <span className="font-semibold text-navy-900 dark:text-white">{currentLang.name}</span>
        <span className="hidden sm:inline text-navy-400 dark:text-navy-500 text-[11px]">({currentLang.nativeName.split(' ')[0]})</span>
        <ChevronDown className="w-3 h-3 text-navy-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 flex items-center justify-between border-b border-navy-100 dark:border-darkborder/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Mother Tongue (26 Languages)
            </span>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              All 26 Ready
            </span>
          </div>

          {/* Quick Search */}
          <div className="p-2 border-b border-navy-100 dark:border-darkborder/50">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Odia, Santhali, Hindi..."
              className="w-full px-2.5 py-1 text-xs rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white placeholder:text-navy-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-navy-50 dark:divide-navy-900">
            {filteredLanguages.map((lang) => {
              const isSelected = selected === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleSelect(lang.id)}
                  className={`w-full px-3 py-2 text-left flex items-start justify-between transition-colors ${
                    isSelected
                      ? 'bg-brand-50/80 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-semibold'
                      : 'hover:bg-navy-50 dark:hover:bg-navy-800/40 text-navy-800 dark:text-navy-200'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold flex items-center gap-1.5 truncate">
                      {lang.name}
                      <span className="text-[10px] font-normal text-navy-500 dark:text-navy-400">
                        • {lang.nativeName}
                      </span>
                      {lang.id === 'odia' && (
                        <span className="px-1 py-0.2 text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5 truncate">
                      {lang.script} • {lang.region.split(',')[0]}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
            {filteredLanguages.length === 0 && (
              <div className="p-4 text-center text-xs text-navy-400">
                No languages match "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
