import React from 'react';
import { Link } from 'react-router-dom';
import { useOffline } from '../../context/OfflineContext';
import { Wifi, WifiOff, HardDrive, RefreshCw } from 'lucide-react';

export default function OfflineStatusBadge({ showDetails = false }) {
  const { isOnline, isOfflineModeActive, isSyncing, syncQueue } = useOffline();

  return (
    <Link
      to="/offline"
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium transition-all bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
      title="Local Edge AI Models Ready (Works without active Internet)"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <span className="font-semibold flex items-center gap-1">
        {isOfflineModeActive ? (
          <>
            <WifiOff className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Offline AI Active</span>
          </>
        ) : isOnline ? (
          <>
            <HardDrive className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Offline AI Ready</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-amber-500" />
            <span>Working Offline</span>
          </>
        )}
      </span>

      {showDetails && (
        <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 border-l border-emerald-300 dark:border-emerald-700 pl-1.5">
          2.4 / 8 GB
        </span>
      )}

      {syncQueue.length > 0 && (
        <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-[10px] font-bold">
          {syncQueue.length} unsynced
        </span>
      )}
    </Link>
  );
}
