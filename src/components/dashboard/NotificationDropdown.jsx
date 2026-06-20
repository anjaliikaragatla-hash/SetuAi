import React from "react";
import { Check, Bell, BellOff } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const NotificationDropdown = ({ notifications, unreadCount, markAllRead, markRead, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-bold text-slate-800 dark:text-white text-sm">
            {t("dashboard.notificationsTitle")}
          </h3>
          {unreadCount > 0 && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <Check className="h-3 w-3" />
            {t("dashboard.markAllRead")}
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/40 scrollbar-thin">
        {notifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <BellOff className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-slate-400 dark:text-slate-500 text-xs">
              {t("dashboard.noNotifications")}
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markRead(n.id);
              }}
              className={`p-4 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition duration-200 cursor-pointer ${
                !n.read ? "bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01]" : ""
              }`}
            >
              <span className="text-xl select-none" role="img" aria-label="notification-icon">
                {n.icon}
              </span>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs text-slate-800 dark:text-slate-200 ${
                      !n.read ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {n.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {n.desc}
                </p>
              </div>
              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 self-center flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
