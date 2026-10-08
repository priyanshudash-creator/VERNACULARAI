import React, { useState } from 'react';
import { WORKSHEETS_DATA } from '../data/mockData';
import { useOffline } from '../context/OfflineContext';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Sparkles,
  CheckCircle2,
  Volume2,
  Languages,
  BookOpen,
  Filter
} from 'lucide-react';

export default function WorksheetsPage() {
  const { saveWorksheetOffline } = useOffline();
  const [worksheet, setWorksheet] = useState(WORKSHEETS_DATA[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const [formConfig, setFormConfig] = useState({
    grade: "Grade 2",
    subject: "Mathematics",
    topic: "Numbers 1 to 20",
    language: "Santhali",
    difficulty: "FLN Foundation",
    questionsCount: 5,
    type: "Counting & Matching"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSaveOffline = () => {
    saveWorksheetOffline(worksheet);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleGenerateNew = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setWorksheet({
        ...worksheet,
        id: `ws-${Date.now()}`,
        topic: formConfig.topic,
        grade: formConfig.grade,
        languages: `Hindi & ${formConfig.language}`,
        lastGenerated: "Just now"
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header (No print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <FileSpreadsheet className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Bilingual Worksheet Generator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Printable A4 Ready
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Generate dual-script student practice worksheets formatted for rural primary school printing.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Print A4 Worksheet</span>
          </button>

          <button
            onClick={handleSaveOffline}
            className="px-3.5 py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Save Offline</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="no-print p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Worksheet Cached Locally! Ready for offline printing anytime.</span>
        </div>
      )}

      {/* Generator Configuration (No print) */}
      <form onSubmit={handleGenerateNew} className="no-print p-5 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white">
            Quick Worksheet Configuration
          </span>
          <span className="text-[11px] text-navy-400">Section 36</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-navy-600 dark:text-navy-300 block mb-1">
              Grade
            </label>
            <select
              value={formConfig.grade}
              onChange={(e) => setFormConfig({ ...formConfig, grade: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-navy-600 dark:text-navy-300 block mb-1">
              Mother Tongue
            </label>
            <select
              value={formConfig.language}
              onChange={(e) => setFormConfig({ ...formConfig, language: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Santhali">Santhali</option>
              <option value="Ho">Ho</option>
              <option value="Mundari">Mundari</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-navy-600 dark:text-navy-300 block mb-1">
              Topic
            </label>
            <input
              type="text"
              value={formConfig.topic}
              onChange={(e) => setFormConfig({ ...formConfig, topic: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-1.5 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? "Regenerating..." : "Regenerate Questions"}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Realistic A4 Printable Worksheet Preview (Section 36) */}
      <div className="bg-white text-navy-950 p-8 sm:p-12 rounded-3xl shadow-xl border border-navy-300 mx-auto max-w-4xl min-h-[1050px] flex flex-col justify-between font-sans print:p-0 print:border-none print:shadow-none print:rounded-none">
        <div className="space-y-6">
          {/* Institutional Header */}
          <div className="border-b-2 border-navy-900 pb-4 text-center space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-navy-600 uppercase">
              <span>Government of Jharkhand • Education Department</span>
              <span>NIPUN Bharat FLN Mission</span>
            </div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-navy-900">
              Government Primary School, Kendua (Dumka)
            </h2>
            <p className="text-xs font-bold text-brand-800">
              {worksheet.title} — {worksheet.grade}
            </p>
          </div>

          {/* Student Header Bar */}
          <div className="grid grid-cols-3 gap-4 border border-navy-400 p-2.5 text-xs font-semibold rounded-lg bg-navy-50/50">
            <div>Student Name: _____________________</div>
            <div>Roll No: _______</div>
            <div>Date: ____________</div>
          </div>

          {/* Instructions */}
          <div className="text-[11px] text-navy-700 italic border-l-2 border-brand-700 pl-3">
            <strong>Note for Student:</strong> Answer the questions in Hindi or Santhali. (ᱱᱚᱣᱟ ᱠᱩᱠᱞᱤ ᱠᱚ ᱞᱟᱹᱭ ᱯᱮ ᱟᱨ ᱚᱞ ᱯᱮ)
          </div>

          {/* Worksheet Items */}
          <div className="space-y-6 pt-2">
            {worksheet.items.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-navy-200 space-y-2 bg-white">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-navy-900">{item.promptHindi}</p>
                  <p className="text-xs font-semibold text-brand-800 font-sans">{item.promptSanthali}</p>
                </div>

                {item.visual && (
                  <div className="text-lg tracking-widest py-2 px-3 bg-navy-50 rounded-lg inline-block border border-navy-200">
                    {item.visual}
                  </div>
                )}

                {item.pairs && (
                  <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
                    <div className="space-y-1.5">
                      {item.pairs.map((p, pidx) => (
                        <div key={pidx} className="p-1.5 bg-navy-50 rounded border border-navy-200">
                          {p.left}  •  [   ]
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {item.pairs.map((p, pidx) => (
                        <div key={pidx} className="p-1.5 bg-brand-50/60 rounded border border-brand-200 text-brand-900 font-semibold">
                          ( )  {p.right}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.options && (
                  <div className="flex gap-4 pt-1">
                    {item.options.map((opt, oidx) => (
                      <span key={oidx} className="px-4 py-1 rounded border border-navy-300 text-xs font-bold">
                        ( ) {opt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Signature & Footer */}
        <div className="pt-8 border-t border-navy-300 flex items-center justify-between text-xs text-navy-600">
          <div>Teacher Evaluation: [ ⭐⭐⭐ Excellent / Needs Support ]</div>
          <div className="text-right">
            Teacher Signature: __________________
          </div>
        </div>
      </div>
    </div>
  );
}
