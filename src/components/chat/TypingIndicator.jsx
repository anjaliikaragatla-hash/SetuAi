import React from "react";

export const TypingIndicator = () => (
  <div className="flex gap-3 max-w-[80%] mr-auto items-end animate-message-in">
    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
      S
    </div>
    <div className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl rounded-bl-none px-5 py-3.5 shadow-sm flex items-center gap-1.5">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
    </div>
  </div>
);
