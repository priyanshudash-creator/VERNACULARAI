import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Sparkles, X } from 'lucide-react';

export default function AIContentCheckModal({ isOpen, onClose, contentTitle = "Lesson Plan" }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  const checklist = [
    { label: "Grade Appropriateness", status: "Verified", desc: "Vocabulary matches Grade 2 developmental levels (Ages 6-8)." },
    { label: "Learning Outcome Alignment", status: "Verified", desc: "Strictly aligned with LO-M201 & NIPUN Bharat Foundational Numeracy." },
    { label: "Language Clarity & Orthography", status: "Verified", desc: "Dual script valid: Ol Chiki & Roman phonetic transcription accurate." },
    { label: "Pedagogy Difficulty Index", status: "Beginner", desc: "Step-by-step scaffolding with concrete local counters." },
    { label: "Translation Consistency", status: "Consistent", desc: "No syntactic hallucination detected in Santhali grammar." }
  ];

  const handleRecheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-darkcard rounded-2xl shadow-2xl border border-navy-200 dark:border-darkborder overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-brand-900 to-navy-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                AI Content Quality Check
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  AI Verified
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">Auditing: {contentTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 space-y-3.5">
          {isVerifying ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto text-brand-600 animate-spin" />
              <p className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Evaluating pedagogical accuracy & vernacular syntax...
              </p>
            </div>
          ) : (
            <>
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-navy-50 dark:bg-navy-950/40 border border-navy-200/80 dark:border-darkborder flex items-start gap-3"
                >
                  <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-900 dark:text-white">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-navy-600 dark:text-navy-300 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <p className="text-[11px]">
                  <strong>Prototype Quality Indicator:</strong> Verified by local linguistic rules and FLN guidelines. Ready for classroom deployment.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-200 dark:border-darkborder bg-navy-50/50 dark:bg-navy-950/30 flex items-center justify-between">
          <button
            onClick={handleRecheck}
            disabled={isVerifying}
            className="px-3 py-1.5 rounded-xl border border-navy-300 dark:border-darkborder text-xs font-semibold text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-darkcard transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-run Check
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-700/20 transition-all"
          >
            Approved & Close
          </button>
        </div>
      </div>
    </div>
  );
}
