import React, { useState } from 'react';
import { useOffline } from '../context/OfflineContext';
import {
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle2,
  Download,
  Trash2,
  RefreshCw,
  Layers,
  Database,
  Radio,
  FileSpreadsheet,
  Users
} from 'lucide-react';

export default function OfflineCenterPage() {
  const {
    isOnline,
    isOfflineModeActive,
    toggleNetworkSimulation,
    toggleOfflineMode,
    models,
    savedOfflineLessons,
    savedOfflineWorksheets
  } = useOffline();

  const [clearedAlert, setClearedAlert] = useState(false);
  const [downloadingPack, setDownloadingPack] = useState(false);

  const handleDownloadNewPack = () => {
    setDownloadingPack(true);
    setTimeout(() => {
      setDownloadingPack(false);
    }, 1500);
  };

  const handleClearCache = () => {
    setClearedAlert(true);
    setTimeout(() => setClearedAlert(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <HardDrive className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Offline AI Center & Edge Models
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Section 48 & 49
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Teaching without continuous internet. Quantized on-device AI for rural low-connectivity primary schools.
          </p>
        </div>

        {/* Network Simulator Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleNetworkSimulation}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950 border-rose-300 text-rose-800 dark:text-rose-300 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-rose-600" />}
            <span>Network: {isOnline ? "Online (Simulated)" : "Offline Mode (Testing)"}</span>
          </button>
        </div>
      </div>

      {clearedAlert && (
        <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>Temporary cache purged. Core offline AI models remain intact!</span>
        </div>
      )}

      {/* Storage & Operational Status Banner (Section 48) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-850 to-navy-950 text-white shadow-xl space-y-6 border border-brand-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Edge AI Runtime Status
            </span>
            <h2 className="text-2xl font-black flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <span>🟢 Offline Mode Active</span>
            </h2>
            <p className="text-xs text-slate-300">
              Classroom speech recognition, translation, and worksheets operate 100% locally.
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-white">2.4 GB / 8.0 GB</div>
            <div className="text-xs text-slate-300">Tablet Local Storage Used (30%)</div>
          </div>
        </div>

        {/* Storage Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full rounded-full" style={{ width: '30%' }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>Installed Edge Models: 1.8 GB</span>
            <span>Offline Curricula & Audio: 0.6 GB</span>
            <span>Free Space: 5.6 GB</span>
          </div>
        </div>

        {/* Fast Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <button
            onClick={handleDownloadNewPack}
            disabled={downloadingPack}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingPack ? "Downloading Pack..." : "Download Language Pack"}</span>
          </button>

          <button
            onClick={() => handleClearCache()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>

      {/* Installed AI Models List (Section 48) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
          <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-600" />
            Installed Edge Models & Language Packs
          </h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            ✓ 5 Models Active
          </span>
        </div>

        <div className="divide-y divide-navy-100 dark:divide-darkborder/50">
          {models.map((mod, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                    {mod.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                    {mod.type}
                  </span>
                </div>
                <p className="text-[11px] text-navy-500 dark:text-navy-400 pl-6">
                  {mod.details}
                </p>
              </div>

              <div className="flex items-center gap-3 pl-6 sm:pl-0 flex-shrink-0 text-xs">
                <span className="font-mono text-navy-500 font-bold">{mod.size}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {mod.status}
                </span>
                <span className="text-[11px] text-navy-400">{mod.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Storage Content Inventory (Section 49) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-600" />
          Offline-First Local Storage Inventory (IndexedDB)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder space-y-1">
            <span className="text-navy-400 font-medium">Cached Lessons</span>
            <div className="text-xl font-extrabold text-navy-900 dark:text-white">{savedOfflineLessons.length} Plans</div>
            <span className="text-[10px] text-emerald-600 font-bold">Ready for classroom</span>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder space-y-1">
            <span className="text-navy-400 font-medium">Worksheets</span>
            <div className="text-xl font-extrabold text-navy-900 dark:text-white">{savedOfflineWorksheets.length} Sheets</div>
            <span className="text-[10px] text-emerald-600 font-bold">Printable offline</span>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder space-y-1">
            <span className="text-navy-400 font-medium">Student Records</span>
            <div className="text-xl font-extrabold text-navy-900 dark:text-white">28 Students</div>
            <span className="text-[10px] text-emerald-600 font-bold">Local assessment cache</span>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder space-y-1">
            <span className="text-navy-400 font-medium">Translation Logs</span>
            <div className="text-xl font-extrabold text-navy-900 dark:text-white">146 Sessions</div>
            <span className="text-[10px] text-emerald-600 font-bold">Cached audio waveforms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
