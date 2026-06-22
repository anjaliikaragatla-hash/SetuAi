import React from "react";
import { MessageSquare, Search, Bell } from "lucide-react";

const iconMap = { chat: MessageSquare, search: Search, notifications: Bell };

export const EmptyState = ({ type = "chat", title, description, action }) => {
  const Icon = iconMap[type] || MessageSquare;
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-slate-800 flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-stone-400 dark:text-slate-500" />
      </div>
      <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      {description && <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
