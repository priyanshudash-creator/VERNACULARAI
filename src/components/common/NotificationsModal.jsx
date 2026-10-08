import React, { useState, useRef, useEffect } from 'react';
import { NOTIFICATIONS_LIST } from '../../data/mockData';
import { Bell, CheckCheck, BookOpen, Download, AlertTriangle, Layers } from 'lucide-react';

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);
  const ref = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'curriculum': return <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />;
      case 'offline': return <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'storage': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-darkcard border border-navy-200 dark:border-darkborder transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-navy-100 dark:border-darkborder">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white">
                Notifications
              </h4>
              <p className="text-[11px] text-navy-500 dark:text-navy-400">Classroom updates & sync alerts</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-navy-100 dark:divide-darkborder/50">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${
                  item.read ? 'bg-transparent opacity-80' : 'bg-brand-50/40 dark:bg-brand-950/20'
                }`}
              >
                <div className="p-2 rounded-xl bg-navy-100 dark:bg-navy-800/80 flex-shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-navy-900 dark:text-white">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-navy-400 whitespace-nowrap ml-2">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-navy-100 dark:border-darkborder text-center">
            <span className="text-[10px] text-navy-400 dark:text-navy-500">
              Synced with SCERT Jharkhand & NIPUN Bharat Portal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
