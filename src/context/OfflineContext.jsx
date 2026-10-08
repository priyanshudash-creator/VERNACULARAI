import React, { createContext, useContext, useState, useEffect } from 'react';
import { OFFLINE_MODELS, SYNC_QUEUE, LESSONS_CATALOG, WORKSHEETS_DATA } from '../data/mockData';

const OfflineContext = createContext();

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(() => {
    return navigator.onLine !== undefined ? navigator.onLine : true;
  });

  const [isOfflineModeActive, setIsOfflineModeActive] = useState(false);
  const [models, setModels] = useState(OFFLINE_MODELS);
  const [syncQueue, setSyncQueue] = useState(SYNC_QUEUE);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [currentSyncTask, setCurrentSyncTask] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState('Today, 10:42 AM');
  
  const [savedOfflineLessons, setSavedOfflineLessons] = useState(() => {
    const saved = localStorage.getItem('vernacular_offline_lessons');
    return saved ? JSON.parse(saved) : LESSONS_CATALOG;
  });

  const [savedOfflineWorksheets, setSavedOfflineWorksheets] = useState(() => {
    const saved = localStorage.getItem('vernacular_offline_worksheets');
    return saved ? JSON.parse(saved) : WORKSHEETS_DATA;
  });

  // Track browser online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleNetworkSimulation = () => {
    setIsOnline(prev => !prev);
  };

  const toggleOfflineMode = () => {
    setIsOfflineModeActive(prev => !prev);
  };

  const saveLessonOffline = (lesson) => {
    setSavedOfflineLessons(prev => {
      const exists = prev.some(l => l.id === lesson.id);
      const next = exists ? prev : [lesson, ...prev];
      localStorage.setItem('vernacular_offline_lessons', JSON.stringify(next));
      return next;
    });
  };

  const saveWorksheetOffline = (worksheet) => {
    setSavedOfflineWorksheets(prev => {
      const exists = prev.some(w => w.id === worksheet.id);
      const next = exists ? prev : [worksheet, ...prev];
      localStorage.setItem('vernacular_offline_worksheets', JSON.stringify(next));
      return next;
    });
  };

  const triggerSync = () => {
    if (isSyncing || !isOnline) return Promise.reject(new Error("Cannot sync while offline"));

    setIsSyncing(true);
    setSyncProgress(10);
    setCurrentSyncTask('Verifying local database checksums...');

    return new Promise((resolve) => {
      setTimeout(() => {
        setSyncProgress(35);
        setCurrentSyncTask('Uploading student assessment batch (28 records)...');
      }, 700);

      setTimeout(() => {
        setSyncProgress(68);
        setCurrentSyncTask('Syncing classroom audio logs with cloud analytics...');
      }, 1500);

      setTimeout(() => {
        setSyncProgress(90);
        setCurrentSyncTask('Fetching SCERT Jharkhand curriculum updates...');
      }, 2300);

      setTimeout(() => {
        setSyncProgress(100);
        setCurrentSyncTask('Synchronization Complete!');
        setIsSyncing(false);
        setSyncQueue([]);
        const now = new Date();
        const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        setLastSyncTime(timeStr);
        resolve({ success: true, timestamp: timeStr });
      }, 3000);
    });
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      isOfflineModeActive,
      toggleNetworkSimulation,
      toggleOfflineMode,
      models,
      syncQueue,
      isSyncing,
      syncProgress,
      currentSyncTask,
      lastSyncTime,
      savedOfflineLessons,
      savedOfflineWorksheets,
      saveLessonOffline,
      saveWorksheetOffline,
      triggerSync
    }}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  return context;
}
