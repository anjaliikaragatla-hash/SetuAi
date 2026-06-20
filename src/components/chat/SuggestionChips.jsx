import React from "react";
import { getSuggestionChips } from "../../services/mockAI";

export const SuggestionChips = ({ language, userType, onChipClick }) => {
  const chips = getSuggestionChips(language, userType);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {chips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => onChipClick(chip.query)}
            className="flex items-center justify-start p-3 text-left bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl hover:border-emerald-500 hover:dark:border-emerald-500/80 hover:bg-emerald-50/50 hover:dark:bg-emerald-950/20 transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            <span className="group-hover:scale-110 transition-transform duration-300 select-none">
              {chip.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
