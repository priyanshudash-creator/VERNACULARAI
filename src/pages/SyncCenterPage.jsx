import React from 'react';
import { useOffline } from '../context/OfflineContext';
import {
  RefreshCw,
  CloudUpload,
  CloudDownload,
  CheckCircle2,
  AlertCircle,
  Wifi,
  HardDrive,
  Clock,
  Sparkles
} from 'lucide-react';

export default function SyncCenterPage() {
  const {
    isOnline,
    isSyncing,
    syncProgress,
    currentSyncTask,
    lastSyncTime,
    syncQueue,
    triggerSync
  } = useOffline();

  const handleStartSync = () => {
    triggerSync().catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <RefreshCw className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Cloud Synchronization Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 50
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Secure delta synchronization between offline classroom tablets and DIKSHA / SCERT cloud databases.
          </p>
        </div>

        <button
          onClick={handleStartSync}
          disabled={isSyncing || !isOnline}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
        </button>
      </div>

      {/* Sync Status Banner (Section 50) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
            <span className="text-xs text-navy-400 uppercase font-semibold">Connection Status</span>
            <div className="text-base font-extrabold text-navy-900 dark:text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`}></span>
              <span>{isOnline ? "🟢 Connected" : "🔴 Offline"}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
            <span className="text-xs text-navy-400 uppercase font-semibold">Last Cloud Sync</span>
            <div className="text-base font-extrabold text-navy-900 dark:text-white mt-1">
              {lastSyncTime}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
            <span className="text-xs text-navy-400 uppercase font-semibold">Pending Uploads</span>
            <div className="text-base font-extrabold text-amber-600 mt-1">
              {syncQueue.length > 0 ? "12 Records" : "0 Records"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
            <span className="text-xs text-navy-400 uppercase font-semibold">Pending Downloads</span>
            <div className="text-base font-extrabold text-blue-600 mt-1">
              {syncQueue.length > 0 ? "4 Updates" : "0 Updates"}
            </div>
          </div>
        </div>

        {/* Animated Sync Progress (Section 50) */}
        {isSyncing && (
          <div className="p-5 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-navy-900 dark:text-white">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-600 animate-spin" />
                <span>{currentSyncTask}</span>
              </span>
              <span className="font-mono text-brand-600">{syncProgress}%</span>
            </div>

            <div className="w-full bg-navy-200 dark:bg-navy-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sync Queue Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-navy-100 dark:border-darkborder pb-3">
          <h3 className="font-bold text-sm text-navy-950 dark:text-white">
            Classroom Sync Queue Breakdown
          </h3>
          <span className="text-xs text-navy-400">Delta Synchronization Protocol</span>
        </div>

        {syncQueue.length === 0 ? (
          <div className="py-8 text-center text-xs text-emerald-600 font-semibold space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <p>All student logs and curriculum packs are fully synchronized with the state cloud!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {syncQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950/50 border border-navy-200 dark:border-darkborder flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-navy-900 border border-navy-200">
                    {item.direction === 'Upload' ? (
                      <CloudUpload className="w-4 h-4 text-amber-600" />
                    ) : (
                      <CloudDownload className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 dark:text-white">{item.action}</h4>
                    <p className="text-[11px] text-navy-400">{item.recordsCount} items • {item.size} • {item.time}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
