import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
    { id: 'system', label: 'System Theme', icon: Laptop }
  ];

  const currentIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Laptop;
  const CurrentIconComponent = currentIcon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-darkcard border border-navy-200 dark:border-darkborder transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
        title="Toggle Appearance Theme"
        aria-label="Theme selector"
      >
        <CurrentIconComponent className="w-4 h-4 text-amber-500 dark:text-amber-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500 border-b border-navy-100 dark:border-darkborder/50">
            Appearance
          </div>
          {themes.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors ${
                  isSelected
                    ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/60 dark:bg-brand-950/40'
                    : 'text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
