import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import OfflineStatusBadge from './OfflineStatusBadge';
import ThemeToggle from './ThemeToggle';
import NotificationsModal from './NotificationsModal';
import {
  Menu,
  Search,
  Radio,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronDown,
  X
} from 'lucide-react';

export default function Navbar({ onMenuClick, activeLanguage, onLanguageChange, onOpenCopilot }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/curriculum?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="h-16 bg-white dark:bg-darkcard border-b border-navy-200 dark:border-darkborder sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-3 shadow-xs">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-64 lg:w-80">
          <Search className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons, topics, students..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-800 dark:text-navy-100 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 md:hidden rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Hero Quick Action */}
        <Link
          to="/classroom"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Live Classroom</span>
        </Link>

        {/* Copilot Launcher */}
        <button
          onClick={onOpenCopilot}
          className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
          title="Open AI Teacher Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Copilot</span>
        </button>

        {/* Language Selector */}
        <LanguageSelector
          selectedLangId={activeLanguage}
          onSelect={onLanguageChange}
        />

        {/* Offline Badge */}
        <OfflineStatusBadge showDetails={false} />

        {/* Notifications */}
        <NotificationsModal />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-navy-100 dark:hover:bg-darkcard border border-transparent hover:border-navy-200 dark:hover:border-darkborder transition-colors"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"}
              alt={user?.name || "Teacher"}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-brand-500"
            />
            <ChevronDown className="w-3 h-3 text-navy-400 hidden sm:inline" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-navy-100 dark:border-darkborder">
                <p className="text-xs font-bold text-navy-900 dark:text-white truncate">
                  {user?.name || "Sunita Kumari"}
                </p>
                <p className="text-[11px] text-navy-500 dark:text-navy-400 truncate">
                  {user?.school || "GPS Kendua"}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2 text-xs flex items-center gap-2 text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800"
                >
                  <User className="w-3.5 h-3.5 text-navy-400" />
                  Teacher Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2 text-xs flex items-center gap-2 text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800"
                >
                  <Settings className="w-3.5 h-3.5 text-navy-400" />
                  School Settings
                </Link>
              </div>

              <div className="pt-1 border-t border-navy-100 dark:border-darkborder">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-16 bg-white dark:bg-darkcard border-b border-navy-200 dark:border-darkborder p-3 z-30 md:hidden animate-in slide-in-from-top-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-navy-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons, topics, students..."
              className="w-full pl-9 pr-9 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-800 dark:text-navy-100"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 p-1 text-navy-400 hover:text-navy-700"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
