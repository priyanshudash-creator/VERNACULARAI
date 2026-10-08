import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { speechSynthesizer } from '../../utils/speechUtils';
import {
  Sparkles,
  X,
  Send,
  Volume2,
  FilePlus,
  Compass,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Bot,
  User,
  Lightbulb,
  Maximize2
} from 'lucide-react';

export default function AICopilotDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste Sunita ji! 🙏 I am your **VernacularAI Teaching Copilot** for Grade 2.
How can I assist your classroom today?`,
      breakdown: null,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: "Explain Subtraction to Grade 2", text: "Explain subtraction to Grade 2 students using local Santhali examples." },
    { label: "Village Market Example", text: "Give a local tribal village market example for number counting 1-20." },
    { label: "Create Group Activity", text: "Create an active classroom group game for learning shapes and counting." },
    { label: "Remedial Plan for Rahul", text: "Suggest an easy remedial activity for Rahul who struggles with numbers 11-20." },
    { label: "Translate to Santhali", text: "Translate: 'Children, please open page 10 of your math book' into Santhali." }
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = {};

      if (query.toLowerCase().includes('subtraction') || query.toLowerCase().includes('घटाव')) {
        aiResponse = {
          role: 'assistant',
          content: "Here is a structured pedagogy breakdown for explaining subtraction to Grade 2:",
          breakdown: {
            simpleExplanation: "Subtraction is simply 'taking away' items from a group. When we have 5 fruits and give 2 to a friend, 3 remain.",
            localExample: "Using forest fruits: If you gather 5 mahua flowers and a bird takes 2, count the remaining flowers together.",
            motherTongue: "ᱥᱟᱱᱛᱟᱲᱤ (Santhali): ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱓ ᱜᱚᱴᱟᱝ ᱥᱟᱨᱮᱡ ᱮᱱᱟ᱾",
            activity: "Tamarind Seed Takeaway Game: Put 10 seeds in a small clay cup. Have the child physically remove 3 seeds and count the rest.",
            practiceQuestion: "Practice Question: 8 tamarind seeds - 3 seeds = ? (Answer: 5 seeds)"
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (query.toLowerCase().includes('market') || query.toLowerCase().includes('बाजार') || query.toLowerCase().includes('हाट')) {
        aiResponse = {
          role: 'assistant',
          content: "Here is a culturally rooted Dumka Haat counting context for Grade 2:",
          breakdown: {
            simpleExplanation: "In the weekly Haat, vendors stack items in small heaps of 5 or 10. We use this to teach grouping.",
            localExample: "Stacking guavas or tamarind bundles into tens: 10 + 2 = 12 (Gel Bar).",
            motherTongue: "ᱥᱟᱱᱛᱟᱲᱤ (Santhali): ᱦᱟᱴ ᱨᱮ ᱑᱐ ᱨᱮᱱᱟᱜ ᱵᱤᱸᱰᱟᱹ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾",
            activity: "Classroom Mock Bazaar: Give students paper tokens to buy paper mangoes priced from ₹1 to ₹10.",
            practiceQuestion: "What is 10 plus 4 in the Santhali numbering system? (Answer: Gel Pone)"
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        aiResponse = {
          role: 'assistant',
          content: `Pedagogy recommendation for: "${query}":`,
          breakdown: {
            simpleExplanation: "Connect the abstract concept with physical items the students touch daily in Dumka.",
            localExample: "Use sal leaves, pebbles, and local stories to bridge the mother-tongue conceptual bridge.",
            motherTongue: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱟᱠᱚ ᱯᱮ᱾ (Teach first in mother tongue before writing in Hindi).",
            activity: "Peer-sharing circle: Have stronger students like Asha guide developing peers like Rahul.",
            practiceQuestion: "Check understanding: Ask 2 oral questions in Santhali before formal written evaluation."
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSpeak = (text, idx) => {
    if (speakingIdx === idx) {
      speechSynthesizer.stop();
      setSpeakingIdx(null);
    } else {
      setSpeakingIdx(idx);
      speechSynthesizer.speak(text, {
        lang: 'hi-IN',
        onEnd: () => setSpeakingIdx(null)
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-darkcard h-full shadow-2xl flex flex-col border-l border-navy-200 dark:border-darkborder animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-navy-200 dark:border-darkborder bg-gradient-to-r from-brand-900 via-navy-900 to-navy-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">AI Teacher Copilot</h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400 text-navy-950">
                  Pedagogy 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-300">FLN & Multilingual Lesson Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-navy-50 dark:bg-navy-950/50 border-b border-navy-100 dark:border-darkborder/50 flex gap-1.5 overflow-x-auto py-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.text)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 border border-navy-200 dark:border-darkborder hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat message thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                msg.role === 'user'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-navy-50 dark:bg-navy-900/60 border border-navy-200 dark:border-darkborder text-navy-800 dark:text-navy-100'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {/* Pedagogy Breakdown Structured Card */}
                {msg.breakdown && (
                  <div className="mt-3 pt-3 border-t border-navy-200 dark:border-darkborder/80 space-y-2.5 text-[11px]">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
                      <span className="font-bold text-blue-800 dark:text-blue-300 block mb-0.5">
                        1. Simple Explanation:
                      </span>
                      <p className="text-navy-700 dark:text-navy-200">{msg.breakdown.simpleExplanation}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                      <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                        2. Local Contextual Example:
                      </span>
                      <p className="text-navy-700 dark:text-navy-200">{msg.breakdown.localExample}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                        3. Mother Tongue Explanation:
                      </span>
                      <p className="text-navy-700 dark:text-navy-200 font-medium">{msg.breakdown.motherTongue}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                      <span className="font-bold text-purple-800 dark:text-purple-300 block mb-0.5">
                        4. Classroom Activity:
                      </span>
                      <p className="text-navy-700 dark:text-navy-200">{msg.breakdown.activity}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
                      <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">
                        5. Practice Question:
                      </span>
                      <p className="text-navy-700 dark:text-navy-200">{msg.breakdown.practiceQuestion}</p>
                    </div>

                    {/* Fast actions on result */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSpeak(
                          `${msg.breakdown.simpleExplanation}. ${msg.breakdown.localExample}`,
                          idx
                        )}
                        className="px-2.5 py-1 rounded-lg bg-navy-200 dark:bg-navy-800 hover:bg-navy-300 text-navy-800 dark:text-navy-200 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-brand-600" />
                        {speakingIdx === idx ? 'Stop Audio' : 'Speak Explanation'}
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          navigate('/lesson-generator');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 hover:bg-brand-200 font-medium flex items-center gap-1 transition-colors"
                      >
                        <FilePlus className="w-3.5 h-3.5" />
                        Convert to Lesson
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          navigate('/worksheets');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 hover:bg-amber-200 font-medium flex items-center gap-1 transition-colors"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        Make Worksheet
                      </button>
                    </div>
                  </div>
                )}

                <div className={`text-[10px] mt-1.5 flex items-center gap-1 ${
                  msg.role === 'user' ? 'text-brand-200 justify-end' : 'text-navy-400'
                }`}>
                  <span>{msg.time}</span>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-navy-800 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-navy-500 dark:text-navy-400">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-navy-100 dark:bg-navy-900 border border-navy-200 dark:border-darkborder flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-200"></span>
                <span className="ml-1 text-[11px] font-medium text-navy-600 dark:text-navy-300">
                  Synthesizing pedagogy & tribal context...
                </span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input box */}
        <div className="p-3 border-t border-navy-200 dark:border-darkborder bg-white dark:bg-darkcard">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot anything (e.g. explain in Santhali)..."
              className="flex-1 px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white shadow-md shadow-brand-700/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-navy-400 mt-2">
            VernacularAI Edge Assistant • SCERT & NIPUN Bharat Pedagogical Framework
          </p>
        </div>
      </div>
    </div>
  );
}
