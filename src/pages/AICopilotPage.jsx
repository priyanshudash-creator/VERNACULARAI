import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { speechSynthesizer } from '../utils/speechUtils';
import {
  Bot,
  Send,
  Volume2,
  Sparkles,
  FileSpreadsheet,
  Compass,
  Radio,
  FilePlus,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function AICopilotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste Sunita ji! 🙏 Welcome to your full-page **AI Teaching Copilot**.\n\nYou can ask pedagogical questions, translate complex math or EVS concepts into Santhali, or ask for local tribal analogies.",
      breakdown: null,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    "Explain subtraction to Grade 2 students",
    "Give local Dumka market example for counting 1-20",
    "Translate: 'Children, please open your books' to Santhali",
    "Create group activity for shapes and geometry",
    "How to help Rahul with teen numbers?"
  ];

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim() || isTyping) return;

    setMessages(prev => [...prev, {
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let breakdownData = {
        simpleExplanation: "Break the concept into concrete physical actions before teaching mathematical notation.",
        localExample: "Using weekly Haat (bazaar) exchanges or counting sal leaves / tamarind seeds.",
        motherTongue: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱢᱟᱬᱟᱝ ᱫᱚ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱟᱠᱚ ᱯᱮ ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱦᱤᱱᱫᱤ ᱛᱮ ᱥᱚᱫᱚᱨ ᱯᱮ᱾ (Explain in mother tongue first).",
        activity: "Pair and Share: Have children work in pairs of two with 10 seeds each to visualize combinations.",
        practiceQuestion: "What is 10 + 4 in Santhali? (Answer: ᱜᱮᱞ ᱯᱩᱱ / Gel Pone)"
      };

      if (query.toLowerCase().includes('subtraction') || query.toLowerCase().includes('घटाव')) {
        breakdownData = {
          simpleExplanation: "Explain subtraction as 'taking away' items from a basket. 5 items minus 2 leaves 3.",
          localExample: "Harvesting mangoes: If a basket has 5 mangoes and you gift 2 to a friend, 3 remain.",
          motherTongue: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱓ ᱜᱚᱴᱟᱝ ᱥᱟᱨᱮᱡ ᱮᱱᱟ᱾",
          activity: "Tamarind Seed Takeaway Game: Put 8 seeds in a circle, student removes 3 and counts rest.",
          practiceQuestion: "8 seeds - 3 seeds = ? (Answer: 5 seeds / ᱢᱚᱬᱮ ᱡᱟᱝ)"
        };
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Pedagogy recommendation for: "${query}":`,
        breakdown: breakdownData,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm flex-shrink-0">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Bot className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-navy-950 dark:text-white">
              AI Teacher Copilot (Pedagogy & Vernacular Assistant)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Section 7 & 46
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Dedicated FLN assistant trained on SCERT Jharkhand primary curriculum and tribal languages.
          </p>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="flex-1 bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-3xl shadow-sm flex flex-col overflow-hidden min-h-0">
        {/* Prompts chips */}
        <div className="p-3 bg-navy-50 dark:bg-navy-950/60 border-b border-navy-100 dark:border-darkborder flex gap-2 overflow-x-auto">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 border border-navy-200 dark:border-darkborder hover:border-brand-500 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs ${
                m.role === 'user'
                  ? 'bg-brand-600 text-white'
                  : 'bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder text-navy-900 dark:text-white'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>

                {m.breakdown && (
                  <div className="mt-3 pt-3 border-t border-navy-200 dark:border-darkborder space-y-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200">
                      <strong className="text-blue-800 dark:text-blue-300 block mb-0.5">Simple Explanation:</strong>
                      <span>{m.breakdown.simpleExplanation}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                      <strong className="text-amber-800 dark:text-amber-300 block mb-0.5">Local Contextual Example:</strong>
                      <span>{m.breakdown.localExample}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                      <strong className="text-emerald-800 dark:text-emerald-300 block mb-0.5">Mother Tongue Explanation:</strong>
                      <span className="font-semibold">{m.breakdown.motherTongue}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200">
                      <strong className="text-purple-800 dark:text-purple-300 block mb-0.5">Classroom Activity:</strong>
                      <span>{m.breakdown.activity}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                      <strong className="text-rose-800 dark:text-rose-300 block mb-0.5">Practice Question:</strong>
                      <span>{m.breakdown.practiceQuestion}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => speechSynthesizer.speak(`${m.breakdown.simpleExplanation} ${m.breakdown.localExample}`, { lang: 'hi-IN' })}
                        className="px-2.5 py-1 rounded-lg bg-navy-200 dark:bg-navy-800 hover:bg-navy-300 text-navy-800 dark:text-navy-200 font-medium flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>Play Audio</span>
                      </button>

                      <button
                        onClick={() => navigate('/classroom')}
                        className="px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium flex items-center gap-1"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Take to Classroom</span>
                      </button>

                      <button
                        onClick={() => navigate('/worksheets')}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Make Worksheet</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className="text-[10px] text-navy-400 mt-1">{m.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-navy-400">
              <Bot className="w-4 h-4 animate-spin text-brand-600" />
              <span>Synthesizing pedagogy & tribal context...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-navy-200 dark:border-darkborder bg-white dark:bg-darkcard flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot anything (e.g. explain in Santhali)..."
            className="flex-1 px-4 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-700/20"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
