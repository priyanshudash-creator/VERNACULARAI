import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import HowItWorksPage from './pages/HowItWorksPage';

// Protected Pages
import DashboardPage from './pages/DashboardPage';
import RealTimeClassroomPage from './pages/RealTimeClassroomPage';
import AITranslatorPage from './pages/AITranslatorPage';
import CurriculumHubPage from './pages/CurriculumHubPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import LessonGeneratorPage from './pages/LessonGeneratorPage';
import WorksheetsPage from './pages/WorksheetsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import AssessmentsPage from './pages/AssessmentsPage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailPage from './pages/StudentDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LanguageLibraryPage from './pages/LanguageLibraryPage';
import OfflineCenterPage from './pages/OfflineCenterPage';
import SyncCenterPage from './pages/SyncCenterPage';
import AICopilotPage from './pages/AICopilotPage';
import AIStoriesPage from './pages/AIStoriesPage';
import PronunciationCoachPage from './pages/PronunciationCoachPage';
import LearningGapsPage from './pages/LearningGapsPage';
import DailyPlanPage from './pages/DailyPlanPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      {/* Public Routes wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Route>

      {/* Protected Routes wrapped in AppLayout and ProtectedRoute */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/classroom" element={<RealTimeClassroomPage />} />
        <Route path="/translator" element={<AITranslatorPage />} />
        <Route path="/curriculum" element={<CurriculumHubPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage />} />
        <Route path="/lesson-generator" element={<LessonGeneratorPage />} />
        <Route path="/worksheets" element={<WorksheetsPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/languages" element={<LanguageLibraryPage />} />
        <Route path="/offline" element={<OfflineCenterPage />} />
        <Route path="/sync" element={<SyncCenterPage />} />
        <Route path="/ai-copilot" element={<AICopilotPage />} />
        <Route path="/ai-stories" element={<AIStoriesPage />} />
        <Route path="/pronunciation" element={<PronunciationCoachPage />} />
        <Route path="/learning-gaps" element={<LearningGapsPage />} />
        <Route path="/daily-plan" element={<DailyPlanPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
