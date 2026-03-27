import React, { useState, useRef, useEffect } from 'react';
import { Message, FAQItem } from '../types';
import { ChatMessage } from './ChatMessage';
import { getChatResponse } from '../services/gemini';
import { Send, X, MessageCircle, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_FAQS: FAQItem[] = [
  { question: "How do I reset my password?", answer: "Go to settings > security and click 'Reset Password'." },
  { question: "What are your support hours?", answer: "We are available 24/7 via chat and email." },
  { question: "Do you offer a free trial?", answer: "Yes, we offer a 14-day free trial for all new users." },
  { question: "How can I upgrade my plan?", answer: "Visit the billing section in your dashboard to see plan options." },
];

export function FAQChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm your FAQ assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredFAQs = INITIAL_FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getChatResponse(text, history);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleFAQClick = (faq: FAQItem) => {
    handleSend(faq.question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-[380px] h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Support Assistant</h3>
                  <p className="text-[10px] opacity-80">Online • Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50/50"
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none border border-gray-200">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick FAQs / Suggestions */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Search size={12} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="text-xs w-full outline-none text-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredFAQs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleFAQClick(faq)}
                      className="text-[11px] bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-blue-200"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="text-blue-600 disabled:text-gray-400 hover:scale-110 transition-transform"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[9px] text-center text-gray-400 mt-2">
                Powered by Gemini AI • AI can make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <ChevronDown size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
}
