import React, { useState, useRef, useEffect } from 'react';
import { Message, Hotel } from '../types';
import { MessageSquare, Send, Sparkles, X, User, Bot, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIChatConciergeProps {
  hotels: Hotel[];
}

export default function AIChatConcierge({ hotels }: AIChatConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "Bonjour! I am your Aura Haven AI Travel Advisor. I am fully integrated with our live resort inventory. Ask me to recommend a suite, draft a personalized holiday itinerary, or detail our custom spa amenities!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionPrompts = [
    "Recommend a luxury suite with a pool.",
    "Draft a 3-day itinerary for a romantic couple.",
    "What are the best amenities available?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call full-stack server-side Gemini proxy endpoint!
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          hotelsContext: hotels.map((h) => ({
            name: h.name,
            location: h.location,
            rating: h.rating,
            amenities: h.amenities,
            basePrice: h.basePrice,
            rooms: h.rooms.map((r) => ({
              number: r.number,
              type: r.type,
              price: r.price,
              isAvailable: r.isAvailable,
              maxGuests: r.maxGuests,
              amenities: r.amenities,
            })),
          })),
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'model',
        text: data.text || "I apologize, but I am experiencing temporary difficulties reaching our booking ledger. Please try again soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'model',
        text: "My apologies, the resort network seems slightly delayed. Please ensure the Gemini API Key is configured correctly in Secrets.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Trigger floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4.5 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-full shadow-lg shadow-amber-600/15 transition-all cursor-pointer border border-amber-500/25"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-display font-semibold tracking-wide pr-1">Concierge Advisor</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide drawer chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="glass-panel-dark border border-white/10 shadow-2xl rounded-3xl w-[360px] md:w-[400px] h-[520px] flex flex-col justify-between overflow-hidden"
          >
            {/* Widget Banner */}
            <div className="bg-amber-950/40 text-white p-4 flex items-center justify-between border-b border-white/5 relative">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
                  <Sparkles className="w-4.5 h-4.5 fill-amber-500/10 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold tracking-wide text-white">Aura Haven Concierge</h4>
                  <span className="text-[10px] text-amber-400 font-mono font-bold tracking-wider">POWERED BY GEMINI AI</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bubble logs body */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent">
              {messages.map((m) => {
                const isBot = m.role === 'model';
                return (
                  <div key={m.id} className={`flex items-start gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-md ${
                      isBot ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-600 text-white shadow-lg shadow-amber-600/15'
                    }`}>
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1 max-w-[78%]">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? 'bg-white/5 text-slate-100 border border-white/5 rounded-tl-none shadow-sm'
                          : 'bg-amber-600 text-white rounded-tr-none shadow-md shadow-amber-600/10'
                      }`}>
                        {m.text}
                      </div>
                      <span className={`text-[9px] text-slate-500 block font-mono ${isBot ? 'text-left' : 'text-right'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-sm">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="italic pl-1 text-slate-400">Consulting resort ledgers...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick action suggest prompts overlay */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-white/5 bg-[#131525]/40 space-y-2">
                <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  <HelpCircle className="w-3 h-3" />
                  Suggested Inquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {suggestionPrompts.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s)}
                      className="text-left w-full text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer truncate"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar Footer */}
            <div className="p-3 border-t border-white/5 bg-[#131525]/60 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask our concierge traveler assistant..."
                className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="p-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all cursor-pointer"
                title="Send Inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
