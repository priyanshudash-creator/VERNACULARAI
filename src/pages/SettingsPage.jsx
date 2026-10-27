import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useOffline } from '../context/OfflineContext';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import {
  Settings,
  User,
  School,
  Languages,
  Bell,
  Eye,
  HardDrive,
  RefreshCw,
  Accessibility,
  CheckCircle2,
  Save,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isOfflineModeActive, toggleOfflineMode } = useOffline();

  const [activeTab, setActiveTab] = useState('profile');
  const [savedAlert, setSavedAlert] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || "Sunita Kumari",
    email: user?.email || "sunita.kumari@jharkhand.edu.in",
    phone: user?.phone || "+91 98351 44210",
    school: user?.school || "Government Primary School, Kendua",
    cluster: user?.cluster || "Dumka Sadar Block",
    district: user?.district || "Dumka",
    grade: user?.grade || "Grade 2",
    primaryLanguage: user?.primaryLanguage || "Santhali"
  });

  // Accessibility flags (Section 53)
  const [a11y, setA11y] = useState({
    largeText: false,
    highContrast: false,
    voiceGuidance: true,
    simpleMode: false,
    keyboardNav: true,
    largeTouchTargets: true
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile(profileData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Teacher Profile', icon: User },
    { id: 'school', label: 'School & Grade', icon: School },
    { id: 'languages', label: 'Linguistic AI', icon: Languages },
    { id: 'appearance', label: 'Theme & Display', icon: Eye },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'offline', label: 'Offline Edge Engine', icon: HardDrive }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Settings className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              System Settings & Preferences
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 53
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Configure classroom environment, language parameters, and accessibility settings.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved to local storage!</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="p-3 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panels */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                Teacher Profile Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Role / Designation</label>
                  <input
                    type="text"
                    disabled
                    value="Primary School Teacher (FLN Incharge)"
                    className="w-full px-3 py-2 rounded-xl bg-navy-100 dark:bg-navy-900 border border-navy-200 dark:border-darkborder opacity-70"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'school' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                School Affiliation & Class Setup
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">School Name</label>
                  <input
                    type="text"
                    value={profileData.school}
                    onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Block / Cluster</label>
                  <input
                    type="text"
                    value={profileData.cluster}
                    onChange={(e) => setProfileData({ ...profileData, cluster: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">District</label>
                  <input
                    type="text"
                    value={profileData.district}
                    onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  />
                </div>

                <div>
                  <label className="font-semibold text-navy-700 dark:text-navy-300 block mb-1">Teaching Grade</label>
                  <select
                    value={profileData.grade}
                    onChange={(e) => setProfileData({ ...profileData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  >
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                Linguistic & AI Model Configurations
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
                  <div>
                    <div className="font-bold text-navy-900 dark:text-white">Primary Classroom Mother Tongue</div>
                    <div className="text-[11px] text-navy-500">Language for real-time speech translation</div>
                  </div>
                  <select
                    value={profileData.primaryLanguage}
                    onChange={(e) => setProfileData({ ...profileData, primaryLanguage: e.target.value })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder font-bold text-brand-600 text-xs"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.id} value={lang.name}>
                        {lang.name} ({lang.nativeName.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
                  <div>
                    <div className="font-bold text-navy-900 dark:text-white">Display Phonetic Roman Transliteration</div>
                    <div className="text-[11px] text-navy-500">Helps Hindi-medium teachers pronounce tribal words</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-brand-600 w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                Global Theme Selection (Light / Dark / System)
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Light Mode', icon: Sun },
                  { id: 'dark', label: 'Dark Mode', icon: Moon },
                  { id: 'system', label: 'System Theme', icon: Laptop }
                ].map((th) => {
                  const Icon = th.icon;
                  const isSelected = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-600 font-bold shadow-xs'
                          : 'border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 hover:bg-navy-50'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-amber-500" />
                      <span className="text-xs">{th.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                Classroom Accessibility Standards (Section 53)
              </h3>

              <div className="space-y-2.5">
                {[
                  { key: 'largeText', label: 'Large Text Mode', desc: 'Enlarges primary classroom text for distant tablet viewing' },
                  { key: 'highContrast', label: 'High Contrast Palette', desc: 'Increases contrast borders for outdoor or dim classroom lighting' },
                  { key: 'voiceGuidance', label: 'Acoustic Voice Guidance', desc: 'Plays chime cues before recording and after translation completion' },
                  { key: 'simpleMode', label: 'Simple Teacher Mode', desc: 'Hides advanced metadata to focus only on microphone and playback' },
                  { key: 'keyboardNav', label: 'Keyboard Navigation & Focus Rings', desc: 'Enables quick hotkeys for spacebar microphone recording' },
                  { key: 'largeTouchTargets', label: 'Large Touch Targets', desc: 'Expands button tap areas for low-cost Android tablets' }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
                  >
                    <div>
                      <div className="font-bold text-navy-900 dark:text-white">{item.label}</div>
                      <div className="text-[11px] text-navy-500">{item.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={a11y[item.key]}
                      onChange={(e) => setA11y({ ...a11y, [item.key]: e.target.checked })}
                      className="rounded text-brand-600 w-4 h-4 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'offline' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
                Offline AI Edge Model Settings
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">
                  Edge AI Quantization Mode: Int8 Lightweight Transformer
                </span>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  Models are stored locally in the tablet's browser CacheStorage and IndexedDB, allowing zero-latency translation even during power outages.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder">
                <div>
                  <div className="font-bold text-navy-900 dark:text-white">Offline AI Mode Force Override</div>
                  <div className="text-[11px] text-navy-500">Disable network calls completely and force offline speech engine</div>
                </div>
                <input
                  type="checkbox"
                  checked={isOfflineModeActive}
                  onChange={toggleOfflineMode}
                  className="rounded text-brand-600 w-4 h-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
