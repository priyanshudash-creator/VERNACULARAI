import React, { useState } from 'react';
import { LOCAL_STORIES, SUPPORTED_LANGUAGES } from '../data/mockData';
import { speechSynthesizer } from '../utils/speechUtils';
import { useOffline } from '../context/OfflineContext';
import {
  Compass,
  Sparkles,
  Volume2,
  Download,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Languages,
  RotateCcw
} from 'lucide-react';

export default function AIStoriesPage() {
  const { saveLessonOffline } = useOffline();
  const [stories, setStories] = useState(LOCAL_STORIES);
  const [selectedStory, setSelectedStory] = useState(LOCAL_STORIES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const [form, setForm] = useState({
    grade: "Grade 2",
    topic: "Numbers & Counting",
    language: "Santhali",
    context: "Village Haat (Market)",
    difficulty: "Beginner"
  });

  const handleGenerateStory = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const newStory = {
        id: `story-${Date.now()}`,
        title: `The Tamarind Tree Mystery (${form.context})`,
        topic: form.topic,
        grade: form.grade,
        language: form.language,
        context: form.context,
        difficulty: form.difficulty,
        summaryHindi: "सावन के महीने में गांव के बच्चे महुआ और इमली के 20 बीज इकट्ठे करते हैं और गिनना सीखते हैं।",
        storyHindi: `गांव के बाहर पुराने इमली के पेड़ के नीचे समीर और उसके दोस्त खेल रहे थे।
समीर ने कहा, "आओ देखते हैं किसके पास सबसे ज्यादा इमली के बीज हैं!"
सबने एक-एक कर गिने: एक, दो, तीन... पूरे पंद्रह!
समीर ने हँसते हुए संथाली में कहा, "ᱜᱮᱞ ᱢᱚᱬᱮ (१५)! मुझे १५ बीज मिले।"`,
        storySanthali: `ᱟᱹᱛᱩ ᱵᱟᱦᱨᱮ ᱢᱟᱨᱮ ᱛᱮᱛᱨᱮ ᱫᱟᱨᱮ ᱵᱩᱴᱟᱹ ᱨᱮ ᱥᱚᱢᱤᱨ ᱟᱨ ᱟᱡ ᱨᱤᱱ ᱜᱟᱛᱮ ᱠᱚ ᱠᱷᱮᱞᱚᱸᱰ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱥᱚᱢᱤᱨ ᱮ ᱢᱮᱱ ᱠᱮᱫᱟ, "ᱮᱞᱟ ᱵᱚ ᱧᱮᱞᱟ ᱚᱠᱚᱭ ᱴᱷᱮᱱ ᱡᱟᱹᱥᱛᱤ ᱡᱟᱝ ᱢᱮᱱᱟᱜᱼᱟ!"`,
        vocabulary: [
          { hindi: "इमली", santhali: "ᱛᱮᱛᱨᱮ (Tetre)", transliteration: "Tetre" },
          { hindi: "बीज", santhali: "ᱡᱟᱝ (Jang)", transliteration: "Jang" },
          { hindi: "पंद्रह (15)", santhali: "ᱜᱮᱞ ᱢᱚᱬᱮ (Gel More)", transliteration: "Gel More" }
        ],
        questions: [
          "बच्चे किस पेड़ के नीचे खेल रहे थे?",
          "समीर को कितने इमली के बीज मिले?"
        ],
        audioDuration: "2:10 min"
      };
      setStories([newStory, ...stories]);
      setSelectedStory(newStory);
    }, 1500);
  };

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      speechSynthesizer.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechSynthesizer.speak(selectedStory.storyHindi, {
        lang: 'hi-IN',
        onEnd: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleSaveOffline = () => {
    saveLessonOffline({
      id: selectedStory.id,
      title: selectedStory.title,
      subject: "Story & Literacy",
      grade: selectedStory.grade,
      language: selectedStory.language,
      teacherExplanationHindi: selectedStory.storyHindi,
      motherTongueExplanationSanthali: selectedStory.storySanthali
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-600">
              <Compass className="w-5 h-5 text-purple-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              AI Local Story Generator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 5 & 44
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Generate culturally rooted folktales in Santhali, Ho, and Hindi to teach foundational concepts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAudio}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? "Stop Narration" : "Play Story Audio"}</span>
          </button>

          <button
            onClick={handleSaveOffline}
            className="px-3.5 py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-navy-700 dark:text-navy-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Save Offline</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Local Story saved to Offline Library for classroom storytelling!</span>
        </div>
      )}

      {/* Story Inputs Form (Section 44) */}
      <form onSubmit={handleGenerateStory} className="p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-950 dark:text-white border-b border-navy-100 dark:border-darkborder pb-2.5">
          Story Context Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Grade</label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Target Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.name}>
                  {lang.name} ({lang.nativeName.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Educational Topic</label>
            <input
              type="text"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            />
          </div>

          <div>
            <label className="font-semibold text-navy-600 dark:text-navy-300 block mb-1">Local Tribal Setting</label>
            <input
              type="text"
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isGenerating ? "Weaving Local Cultural Story..." : "Generate Local Story"}</span>
        </button>
      </form>

      {/* Story Output Display (Section 5 & 44) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-md space-y-6">
        <div className="border-b border-navy-100 dark:border-darkborder pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
              {selectedStory.grade} • {selectedStory.language}
            </span>
            <span className="text-xs text-navy-400">Context: {selectedStory.context}</span>
          </div>
          <h2 className="text-2xl font-black text-navy-950 dark:text-white">
            {selectedStory.title}
          </h2>
          <p className="text-xs text-navy-500">{selectedStory.summaryHindi}</p>
        </div>

        {/* Dual Version: Hindi & Santhali Parallel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
              Hindi Story Version:
            </span>
            <p className="text-xs sm:text-sm font-medium text-navy-900 dark:text-white leading-relaxed whitespace-pre-line">
              {selectedStory.storyHindi}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block">
              Santhali Story Version (Ol Chiki):
            </span>
            <p className="text-sm sm:text-base font-bold text-brand-950 dark:text-white leading-relaxed whitespace-pre-line">
              {selectedStory.storySanthali}
            </p>
          </div>
        </div>

        {/* Local Vocabulary Matrix */}
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
            Key Local Vocabulary:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {selectedStory.vocabulary.map((v, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-darkcard border border-amber-200/60 shadow-2xs">
                <div className="font-bold text-navy-900 dark:text-white">{v.hindi}</div>
                <div className="text-brand-700 dark:text-brand-300 font-bold">{v.santhali}</div>
                <div className="text-[10px] text-navy-400 italic">"{v.transliteration}"</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehension Questions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            Classroom Discussion Questions:
          </h4>
          <ul className="space-y-1.5 text-xs text-navy-700 dark:text-navy-300 list-disc list-inside">
            {selectedStory.questions.map((q, idx) => (
              <li key={idx} className="leading-relaxed">{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
