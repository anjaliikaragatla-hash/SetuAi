import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Send, Mic, RefreshCw, User, Sparkles } from "lucide-react";

export const InteractiveChat = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedQueryKey, setSelectedQueryKey] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message when component mounts or language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: t("chat.welcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setSelectedQueryKey(null);
    setIsTyping(false);
    setIsListening(false);
  }, [language]);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulateAiResponse = (queryKey) => {
    if (isTyping || isListening) return;

    setSelectedQueryKey(queryKey);
    
    // Add user question
    const userMsgText = t(`chat.queries.${queryKey}.question`);
    const newUserMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    // AI thinking delay (1.5s)
    setTimeout(() => {
      setIsTyping(false);
      const answerText = t(`chat.queries.${queryKey}.answer`);
      
      const newAiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newAiMessage]);
    }, 1500);
  };

  const handleVoiceSimulate = () => {
    if (isTyping || isListening) return;
    setIsListening(true);

    // Simulate listening for 2 seconds
    setTimeout(() => {
      setIsListening(false);
      // Trigger farming scheme query as the voice input result
      simulateAiResponse("farming");
    }, 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: t("chat.welcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setSelectedQueryKey(null);
    setIsTyping(false);
    setIsListening(false);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-amber-200/50 shadow-2xl glass-panel flex flex-col h-[520px] transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-base leading-none">SetuAI Assistant</h4>
            <span className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
              {t("dashboard.onlineStatus")}
            </span>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="text-emerald-100 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-stone-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-semibold ${
              msg.sender === "user" 
                ? "bg-amber-100 border-amber-300 text-amber-800" 
                : "bg-emerald-100 border-emerald-300 text-emerald-800"
            }`}>
              {msg.sender === "user" ? <User className="w-4 h-4" /> : "S"}
            </div>

            {/* Bubble */}
            <div className="flex flex-col">
              <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm whitespace-pre-line leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-tr-none"
                  : "bg-white border border-stone-200 text-slate-800 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
              <span className={`text-[10px] text-slate-400 mt-1 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Listening Indicator overlay */}
        {isListening && (
          <div className="flex justify-center items-center py-6">
            <div className="flex flex-col items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 shadow-sm">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-amber-400/20 rounded-full animate-ping"></div>
                <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center relative">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <span className="text-xs font-medium text-amber-800">
                {t("dashboard.listeningSpeak")}
              </span>
            </div>
          </div>
        )}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-xs font-semibold">
              S
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1 shadow-sm">
              <span className="text-xs text-slate-500 mr-1.5">{t("chat.typing")}</span>
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Chips */}
      {messages.length === 1 && !isTyping && !isListening && (
        <div className="px-4 py-2 bg-stone-100/40 border-t border-stone-200/50">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {t("dashboard.selectQuickQuery")}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => simulateAiResponse("farming")}
              className="text-xs py-1.5 px-3 rounded-full bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-slate-700 font-medium transition-all shadow-sm flex items-center gap-1 active:scale-95"
            >
              {t("chat.queries.farming.chip")}
            </button>
            <button
              onClick={() => simulateAiResponse("healthcare")}
              className="text-xs py-1.5 px-3 rounded-full bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-slate-700 font-medium transition-all shadow-sm flex items-center gap-1 active:scale-95"
            >
              {t("chat.queries.healthcare.chip")}
            </button>
            <button
              onClick={() => simulateAiResponse("education")}
              className="text-xs py-1.5 px-3 rounded-full bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-slate-700 font-medium transition-all shadow-sm flex items-center gap-1 active:scale-95"
            >
              {t("chat.queries.education.chip")}
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="p-3.5 border-t border-stone-200/50 bg-white flex items-center gap-2">
        <button
          onClick={handleVoiceSimulate}
          disabled={isTyping || isListening}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-amber-100 hover:bg-amber-200 text-amber-700 active:scale-95"
          } disabled:opacity-50`}
          title="Simulate Voice Assistant"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder={t("chat.placeholder")}
          disabled={true} // Readonly mock for demo
          className="flex-1 bg-stone-100 border-none outline-none rounded-full px-4 py-2 text-sm text-slate-700 placeholder-slate-400 cursor-not-allowed"
        />

        <button
          disabled={true}
          className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
