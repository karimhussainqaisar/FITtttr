import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, UserProfile } from '../types';
import { Send, Sparkles, Bot, User, BrainCircuit, MessageSquare, Flame } from 'lucide-react';

interface AICoachProps {
  profile: UserProfile;
}

export default function AICoach({ profile }: AICoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Greetings! I am your personal **FitLife AI Fitness Coach**. I have fully scanned your profile:\n\n* **Daily Target:** ${profile.calorieGoal} kcal (${profile.dietStyle.replace('_', ' ')} style)\n* **Target Weight Goal:** ${profile.targetWeight} kg (Current: ${profile.weight} kg)\n\nAsk me anything! I can generate personalized workout splits, suggest native recipes, or calculate exact metabolic adaptations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const quickQuestions = [
    "What should I eat today?",
    "Create a workout for me",
    "How can I lose belly fat?",
    "Suggest Pakistani healthy meals",
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `m-u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          profileContext: {
            age: profile.age,
            gender: profile.gender,
            height: profile.height,
            weight: profile.weight,
            targetWeight: profile.targetWeight,
            activityLevel: profile.activityLevel,
            dietStyle: profile.dietStyle,
            calorieGoal: profile.calorieGoal,
            proteinGoal: profile.proteinGoal,
            carbsGoal: profile.carbsGoal,
            fatGoal: profile.fatGoal
          }
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to reach coach backend');

      const aiMessage: Message = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Apologies, I encountered a temporary logic block. Please try prompting again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `m-err-${Date.now()}`,
        sender: 'ai',
        text: `**Coach System Alert:** ${err.message || 'The connection timed out. Please check your network or refresh the application.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai_coach_container" className="max-w-4xl mx-auto my-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Left panel: Context summaries & Tips */}
      <div className="md:col-span-1 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-850 shadow-sm space-y-4">
        <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-emerald-500" /> Coached Metrics
        </h4>

        <div className="space-y-3">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Active Profile Style</span>
            <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1 capitalize">{profile.dietStyle?.replace('_', ' ')} Planner</p>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Target Daily Threshold</span>
            <p className="font-bold text-emerald-500 mt-1">{profile.calorieGoal} kcal</p>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Biometric Deficit / Surplus</span>
            <p className="font-bold text-neutral-700 dark:text-neutral-300 mt-1">
              {profile.targetWeight < profile.weight ? 'Calorie Deficit Active (-500)' : profile.targetWeight > profile.weight ? 'Anabolic Surplus Active (+400)' : 'Sustained Maintenance'}
            </p>
          </div>
        </div>

        {/* Informative alert */}
        <div className="p-3.5 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 rounded-xl text-[10px] leading-relaxed font-semibold">
          AI Trainer utilizes full-text search and dynamic metabolic formula mappings to secure hyper-personalized diet schedules.
        </div>
      </div>

      {/* Right panel: Chat Frame */}
      <div className="md:col-span-2 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-neutral-150 dark:border-neutral-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100">Personal AI Coach</h4>
              <p className="text-[10px] text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Powered by Gemini-3.5-Flash
              </p>
            </div>
          </div>
        </div>

        {/* Chat Scrolling Pane */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-emerald-500'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed space-y-2 font-medium ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-white rounded-tr-none'
                  : 'bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200 rounded-tl-none'
              }`}>
                {msg.text.split('\n\n').map((para, pIdx) => {
                  // Basic formatting renderer for bolding, bullet points, headers inside chat bubble
                  if (para.trim().startsWith('*')) {
                    return (
                      <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                        {para.split('\n').map((li, lIdx) => (
                          <li key={lIdx}>{li.replace('*', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx}>
                      {para.split('**').map((chunk, cIdx) => (
                        cIdx % 2 === 1 ? <strong key={cIdx} className="font-extrabold">{chunk}</strong> : chunk
                      ))}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Loading bubble */}
          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-emerald-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-850 text-xs text-neutral-400 font-mono italic">
                FitLife coach is calculating diet plans...
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick query tags */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-neutral-100 dark:border-neutral-850/50">
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Suggested Queries:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, qIdx) => (
                <button
                  key={qIdx}
                  id={`btn_quick_query_${qIdx}`}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-neutral-150 dark:border-neutral-800 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-neutral-600 dark:text-neutral-400 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input panel */}
        <div className="p-4 border-t border-neutral-150 dark:border-neutral-850">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex gap-2"
          >
            <input
              id="input_ai_coach"
              type="text"
              placeholder="Ask me: Suggest high protein South Asian dinner ideas..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs focus:outline-none focus:border-emerald-500 text-neutral-800 dark:text-neutral-100 font-medium"
            />
            <button
              id="btn_send_ai_coach"
              type="submit"
              disabled={!inputValue.trim() || loading}
              className={`p-2.5 rounded-xl text-white font-bold transition flex items-center justify-center shrink-0 ${
                inputValue.trim() && !loading
                  ? 'bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-500/10'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
