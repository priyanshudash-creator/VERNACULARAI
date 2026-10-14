import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CLASSROOM_PRESETS, SUPPORTED_LANGUAGES, getClassroomTranslation, getLanguageById } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import { useOffline } from '../context/OfflineContext';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  RotateCcw,
  Download,
  FileSpreadsheet,
  Compass,
  AlertTriangle,
  Lightbulb,
  Radio,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function RealTimeClassroomPage() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const activeLanguage = context?.activeLanguage || 'santhali';
  const { saveLessonOffline } = useOffline();

  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
  const activePreset = CLASSROOM_PRESETS[currentPresetIndex];

  const currentLangObj = getLanguageById(activeLanguage);
  const currentTranslation = getClassroomTranslation(activePreset, activeLanguage);

  // Speech & Translation State
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [teacherInputHindi, setTeacherInputHindi] = useState(activePreset.teacherHindi);
  const [translatedResult, setTranslatedResult] = useState({
    olChiki: currentTranslation.targetText,
    latin: currentTranslation.latin,
    outcome: activePreset.learningOutcome,
    processingTime: activePreset.processingTime
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [showStudentReply, setShowStudentReply] = useState(true);
  const [savedOfflineAlert, setSavedOfflineAlert] = useState(false);
  const [direction, setDirection] = useState('teacher-to-student'); // 'teacher-to-student' or 'student-to-teacher'

  // Update text when preset or language changes
  useEffect(() => {
    const trans = getClassroomTranslation(activePreset, activeLanguage);
    setTeacherInputHindi(activePreset.teacherHindi);
    setTranslatedResult({
      olChiki: trans.targetText,
      latin: trans.latin,
      outcome: activePreset.learningOutcome,
      processingTime: activePreset.processingTime
    });
  }, [currentPresetIndex, activeLanguage]);

  const handleStartRecording = () => {
    setIsRecording(true);
    speechSynthesizer.playAcousticChime(580, 0.2);

    setTimeout(() => {
      setIsRecording(false);
      runAIPipeline();
    }, 1500);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    runAIPipeline();
  };

  const runAIPipeline = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const trans = getClassroomTranslation(activePreset, activeLanguage);
      setTranslatedResult({
        olChiki: trans.targetText,
        latin: trans.latin,
        outcome: activePreset.learningOutcome,
        processingTime: activePreset.processingTime
      });

      // Auto-play audio once translation finishes
      playTargetAudio();
    }, 800);
  };

  const playTargetAudio = (rate = isSlowMode ? 0.7 : 0.88) => {
    if (isPlayingAudio) {
      speechSynthesizer.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speechSynthesizer.speak(translatedResult.latin || translatedResult.olChiki, {
      lang: currentLangObj?.voiceLangCode || 'hi-IN',
      rate: rate,
      onEnd: () => setIsPlayingAudio(false)
    });
  };

  const playStudentVoiceHindi = () => {
    speechSynthesizer.speak(activePreset.studentReplyHindi, {
      lang: 'hi-IN'
    });
  };

  const handleSaveToOffline = () => {
    saveLessonOffline({
      id: `lesson-cache-${Date.now()}`,
      title: `${activePreset.topic} - Classroom Recording`,
      subject: "Mathematics",
      grade: "Grade 2",
      language: "Santhali",
      learningOutcome: activePreset.learningOutcome,
      teacherExplanationHindi: teacherInputHindi,
      motherTongueExplanationSanthali: translatedResult.olChiki,
      localExample: activePreset.context
    });
    setSavedOfflineAlert(true);
    setTimeout(() => setSavedOfflineAlert(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header (Section 28) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-brand-500/20 text-brand-600 dark:text-brand-400">
              <Radio className="w-5 h-5 animate-pulse text-rose-500" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Live Classroom
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-navy-950">
              Grade 2
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {currentLangObj.name}
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Real-time acoustic speech recognition & mother tongue translation for rural classrooms.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>🟢 Offline AI Ready</span>
          </div>

          <button
            onClick={() => setDirection(d => d === 'teacher-to-student' ? 'student-to-teacher' : 'teacher-to-student')}
            className="px-3 py-1.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 hover:bg-navy-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-brand-600" />
            <span>Mode: {direction === 'teacher-to-student' ? 'Teacher → Student' : 'Student → Teacher'}</span>
          </button>
        </div>
      </div>

      {/* Classroom Scenarios Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-navy-400 font-semibold flex-shrink-0">Classroom Scenarios:</span>
        {CLASSROOM_PRESETS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setCurrentPresetIndex(idx)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all flex-shrink-0 flex items-center gap-1.5 border ${
              currentPresetIndex === idx
                ? 'bg-brand-600 text-white border-brand-500 shadow-sm font-semibold'
                : 'bg-white dark:bg-darkcard text-navy-700 dark:text-navy-300 border-navy-200 dark:border-darkborder hover:border-brand-500/50'
            }`}
          >
            <span>{p.topic}</span>
          </button>
        ))}
      </div>

      {/* Two-Column Live Panels (Section 28 & 30) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Teacher Panel — Hindi */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white uppercase tracking-wider">
                  Teacher — Hindi
                </h3>
              </div>
              <span className="text-[11px] font-mono text-navy-400">
                Medium of Instruction
              </span>
            </div>

            {/* Teacher Speech Input Box */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-navy-500 uppercase tracking-wider">
                Spoken Classroom Sentence
              </label>
              <textarea
                value={teacherInputHindi}
                onChange={(e) => setTeacherInputHindi(e.target.value)}
                rows={3}
                className="w-full p-3.5 text-sm sm:text-base font-medium rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed resize-none"
                placeholder="Click Microphone and speak in Hindi..."
              />
            </div>

            {/* Recording Animated Waveform (Section 28) */}
            {isRecording ? (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span>Listening Teacher Voice...</span>
                </div>
                <div className="flex items-center gap-1.5 h-7">
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-1"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-2"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-3"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-4"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-5"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-6"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-waveform-7"></div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950/40 text-[11px] text-navy-500 dark:text-navy-400 flex items-center justify-between">
                <span>Microphone status: Idle / Ready</span>
                <span className="font-mono">Noise suppression: Active</span>
              </div>
            )}
          </div>

          {/* Teacher Controls */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-700/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Mic className="w-4 h-4" />
                <span>Record Teacher Speech</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-5 py-3 rounded-2xl bg-navy-800 text-white font-bold text-xs flex items-center gap-2 animate-pulse"
              >
                <MicOff className="w-4 h-4" />
                <span>Stop & Translate</span>
              </button>
            )}

            <button
              onClick={runAIPipeline}
              disabled={isProcessing}
              className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Translate Now</span>
            </button>

            <button
              onClick={() => speechSynthesizer.speak(teacherInputHindi, { lang: 'hi-IN' })}
              className="p-3 rounded-2xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-darkcard"
              title="Test Hindi playback"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Student Panel — Santhali (Section 30) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white uppercase tracking-wider">
                  Student — {currentLangObj.name} ({currentLangObj.script})
                </h3>
              </div>
              <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
                Mother Tongue Output
              </span>
            </div>

            {/* Translation Text & Script Display */}
            <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block mb-1">
                  Ol Chiki Script:
                </span>
                <p className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white leading-relaxed">
                  {translatedResult.olChiki}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-200/60 dark:border-brand-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 block mb-0.5">
                  Roman Transliteration:
                </span>
                <p className="text-xs text-brand-900 dark:text-brand-200 italic font-medium">
                  "{translatedResult.latin}"
                </p>
              </div>
            </div>

            {/* Audio Player Controls */}
            <div className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playSanthaliAudio()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? "Stop Audio" : "🔊 Play Translation"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsSlowMode(!isSlowMode);
                    playTargetAudio(isSlowMode ? 0.88 : 0.65);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    isSlowMode
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100'
                  }`}
                  title="Slow audio for classroom pronunciation practice"
                >
                  {isSlowMode ? 'Slow 0.7x (Active)' : 'Slow Audio'}
                </button>
              </div>

              <button
                onClick={handleSaveToOffline}
                className="px-3 py-2 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Save this bilingual interaction offline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Offline</span>
              </button>
            </div>

            {savedOfflineAlert && (
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Saved to Tablet Offline Database for Classroom Reuse!</span>
              </div>
            )}
          </div>

          <div className="pt-2 text-[11px] text-navy-500 dark:text-navy-400 flex items-center justify-between border-t border-navy-100 dark:border-darkborder">
            <span>Latency: <strong>{translatedResult.processingTime}</strong></span>
            <span>Acoustic engine: <strong>Ol Chiki v2.4 (Offline)</strong></span>
          </div>
        </div>
      </div>

      {/* Two-Way Translation Student Response Card (Section 31) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600"></span>
            <h3 className="font-bold text-sm text-navy-950 dark:text-white">
              Student Response & Reverse Hindi Translation
            </h3>
            <span className="text-xs text-navy-500">({activePreset.studentName})</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            Two-Way Speech Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student Mother Tongue Audio */}
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              Student Speaks Santhali:
            </div>
            <p className="text-sm font-semibold text-navy-900 dark:text-white">
              {activePreset.studentReplySanthali}
            </p>
            <p className="text-xs text-purple-900 dark:text-purple-300 italic">
              "{activePreset.studentReplyLatin}"
            </p>
          </div>

          {/* Teacher Hears Hindi Translation */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Teacher Hears in Hindi:
              </div>
              <button
                onClick={playStudentVoiceHindi}
                className="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1 hover:bg-blue-500"
              >
                <Volume2 className="w-3 h-3" />
                <span>Listen</span>
              </button>
            </div>
            <p className="text-sm font-bold text-navy-950 dark:text-white">
              "{activePreset.studentReplyHindi}"
            </p>
            <p className="text-[11px] text-navy-600 dark:text-navy-300">
              AI Reverse Translation Confidence: <strong>96%</strong>
            </p>
          </div>
        </div>

        {/* AI Learning Outcome & Remedial Hint */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                AI Learning Outcome & Remedial Hint
              </span>
            </div>
            <p className="text-xs text-navy-800 dark:text-navy-200">
              <strong>Learning Outcome:</strong> {activePreset.learningOutcome}
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
              💡 {activePreset.remedialHint}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/learning-gaps')}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              Remedial Plan
            </button>
            <button
              onClick={() => navigate('/ai-stories')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold transition-all shadow-xs"
            >
              Generate Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
