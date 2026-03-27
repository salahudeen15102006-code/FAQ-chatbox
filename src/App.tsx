import { FAQChatbox } from './components/FAQChatbox';
import { HelpCircle, Book, MessageSquare, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">
              F
            </div>
            <span className="font-bold text-lg tracking-tight">FAQ Assistant</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Help your users <br />
            <span className="text-blue-600">instantly.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The intelligent FAQ chatbox that understands your business and provides 
            accurate answers to your customers 24/7.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
              Try it for free
            </button>
            <button className="w-full sm:w-auto bg-white border border-slate-200 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Conversations</h3>
            <p className="text-slate-500 leading-relaxed">
              Our chatbox uses Gemini AI to understand context and provide human-like 
              responses to complex queries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Book size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Base Integration</h3>
            <p className="text-slate-500 leading-relaxed">
              Easily sync your existing documentation and FAQs to keep the 
              assistant up to date with your latest info.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
            <p className="text-slate-500 leading-relaxed">
              Enterprise-grade security ensures your data and your users' 
              conversations are always protected.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <HelpCircle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Suggestions</h3>
            <p className="text-slate-500 leading-relaxed">
              Predictive suggestions help users find answers even before they 
              finish typing their question.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 FAQ Assistant. All rights reserved. Built with Gemini AI.
          </p>
        </div>
      </footer>

      {/* The Chatbox */}
      <FAQChatbox />
    </div>
  );
}
