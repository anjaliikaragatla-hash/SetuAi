import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
    <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
      <AlertCircle className="w-7 h-7 text-red-500" />
    </div>
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Oops!</p>
    <p className="text-xs text-slate-400 dark:text-slate-500 mb-5 max-w-xs">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    )}
  </div>
);
