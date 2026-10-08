import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';
import {
  LayoutDashboard,
  Radio,
  Languages,
  BookOpen,
  FileText,
  Sparkles,
  Layers,
  CheckSquare,
  Users,
  BarChart3,
  BookMarked,
  Bot,
  Compass,
  Mic,
  CalendarDays,
  HardDrive,
  RefreshCw,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  FileSpreadsheet
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = [
    {
      title: "Classroom & Pedagogy",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Live Classroom", path: "/classroom", icon: Radio, highlight: true, badge: "Hero" },
        { name: "AI Translator", path: "/translator", icon: Languages },
        { name: "Curriculum Hub", path: "/curriculum", icon: BookOpen },
        { name: "Daily Teaching Plan", path: "/daily-plan", icon: CalendarDays, badge: "AI" },
      ]
    },
    {
      title: "Content & Teaching Tools",
      items: [
        { name: "Lesson Generator", path: "/lesson-generator", icon: Sparkles, badge: "AI" },
        { name: "Lesson Library", path: "/lessons", icon: FileText },
        { name: "Bilingual Worksheets", path: "/worksheets", icon: FileSpreadsheet },
        { name: "Visual Flashcards", path: "/flashcards", icon: Layers },
        { name: "Local Story Generator", path: "/ai-stories", icon: Compass, badge: "New" },
      ]
    },
    {
      title: "Student Progress & Analytics",
      items: [
        { name: "Student Roster", path: "/students", icon: Users },
        { name: "Assessments", path: "/assessments", icon: CheckSquare },
        { name: "Learning Gap Detection", path: "/learning-gaps", icon: TrendingDown, badge: "Adaptive" },
        { name: "Speaking Coach", path: "/pronunciation", icon: Mic, badge: "Voice" },
        { name: "Analytics & Trends", path: "/analytics", icon: BarChart3 },
      ]
    },
    {
      title: "System & Offline AI",
      items: [
        { name: "AI Teacher Copilot", path: "/ai-copilot", icon: Bot, badge: "24/7" },
        { name: "Language Library", path: "/languages", icon: BookMarked },
        { name: "Offline AI Center", path: "/offline", icon: HardDrive, badge: "Edge" },
        { name: "Cloud Sync Center", path: "/sync", icon: RefreshCw },
        { name: "Architecture / Flow", path: "/how-it-works", icon: HelpCircle },
        { name: "Settings", path: "/settings", icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-navy-950 border-r border-navy-200 dark:border-darkborder transition-all duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-navy-200 dark:border-darkborder">
          {!isCollapsed ? (
            <Logo size="sm" showTagline={false} />
          ) : (
            <div className="mx-auto">
              <Logo size="sm" showTagline={false} />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-navy-400 hover:text-navy-700 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-darkcard transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sidx) => (
            <div key={sidx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-semibold'
                          : item.highlight
                          ? 'text-brand-700 dark:text-brand-300 bg-brand-50/70 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/40'
                          : 'text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-darkcard/80 hover:text-navy-950 dark:hover:text-white'
                      } ${isCollapsed ? 'justify-center' : ''}`
                    }
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      item.highlight ? 'text-brand-600 dark:text-brand-400' : ''
                    }`} />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.badge === 'Hero'
                          ? 'bg-amber-400 text-navy-950'
                          : item.badge === 'AI'
                          ? 'bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300'
                          : 'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {/* Collapsed tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-navy-900 text-white text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                        {item.name}
                        {item.badge && ` (${item.badge})`}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Teacher Profile Footer */}
        <div className="p-3 border-t border-navy-200 dark:border-darkborder bg-navy-50/50 dark:bg-darkcard/40">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"}
              alt={user?.name || "Teacher"}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/40"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-navy-900 dark:text-white truncate">
                  {user?.name || "Sunita Kumari"}
                </p>
                <p className="text-[10px] text-navy-500 dark:text-navy-400 truncate">
                  {user?.grade || "Grade 2"} • {user?.primaryLanguage || "Santhali"}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-navy-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
