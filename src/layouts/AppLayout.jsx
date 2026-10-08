import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import DemoTourBanner from '../components/common/DemoTourBanner';
import AICopilotDrawer from '../components/common/AICopilotDrawer';
import {
  Home,
  Radio,
  Languages,
  BookOpen,
  User,
  Sparkles
} from 'lucide-react';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('santhali');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1220] flex flex-col text-navy-900 dark:text-[#F8FAFC]">
      {/* Top SIH Hackathon Evaluation Walkthrough Banner */}
      <DemoTourBanner />

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}>
          {/* Top Navbar */}
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            activeLanguage={activeLanguage}
            onLanguageChange={setActiveLanguage}
            onOpenCopilot={() => setIsCopilotOpen(true)}
          />

          {/* Page Outlet */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
            <Outlet context={{ activeLanguage, setActiveLanguage }} />
          </main>
        </div>
      </div>

      {/* Floating AI Teacher Copilot Button */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 text-white font-semibold text-xs shadow-xl shadow-brand-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-brand-400/40 group no-print"
        aria-label="Open AI Copilot"
      >
        <span className="p-1 rounded-full bg-amber-400/20 text-amber-300 group-hover:rotate-12 transition-transform">
          <Sparkles className="w-4 h-4 text-amber-400" />
        </span>
        <span className="tracking-wide">AI Teacher Copilot</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>

      {/* Slide-out Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar (Section 57) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-t border-navy-200 dark:border-darkborder py-2 px-4 z-30 lg:hidden flex items-center justify-around no-print">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-navy-500 dark:text-navy-400'
            }`
          }
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/classroom"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium relative ${
              isActive ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-navy-500 dark:text-navy-400'
            }`
          }
        >
          <div className="relative">
            <Radio className="w-4 h-4 text-brand-600" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
          </div>
          <span>Classroom</span>
        </NavLink>

        <NavLink
          to="/translator"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-navy-500 dark:text-navy-400'
            }`
          }
        >
          <Languages className="w-4 h-4" />
          <span>Translate</span>
        </NavLink>

        <NavLink
          to="/lessons"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-navy-500 dark:text-navy-400'
            }`
          }
        >
          <BookOpen className="w-4 h-4" />
          <span>Lessons</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-navy-500 dark:text-navy-400'
            }`
          }
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
