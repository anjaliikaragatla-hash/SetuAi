import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, AlertCircle, Info } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const ChatInput = ({ onSend, isDisabled }) => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    // Auto-grow textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!text.trim() || isDisabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 pb-6">
      {/* Toast Alert */}
      {toast && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-800 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 dark:border-slate-700/80 flex items-center gap-2 transition-all duration-300">
          <Info className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/80 dark:focus-within:border-emerald-500/80 transition-all duration-300"
      >
        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => triggerToast(t("dashboard.attachmentDisabled"))}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition cursor-pointer"
          title="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("chat.placeholder")}
          disabled={isDisabled}
          className="flex-1 bg-transparent border-0 outline-none resize-none py-2.5 px-3 text-slate-800 dark:text-slate-100 text-sm focus:ring-0 placeholder-slate-400 max-h-40 min-h-[40px] leading-normal"
        />

        {/* Voice Assistant Button */}
        <button
          type="button"
          onClick={() => triggerToast(t("dashboard.voiceComingSoon"))}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition cursor-pointer"
          title="Voice search"
        >
          <Mic className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || isDisabled}
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 ${
            text.trim() && !isDisabled
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20 hover:scale-105 cursor-pointer"
              : "bg-slate-100 dark:bg-slate-700/50 text-slate-300 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
