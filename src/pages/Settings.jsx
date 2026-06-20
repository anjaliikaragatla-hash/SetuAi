import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { chatService } from "../services/chatService";
import { DashboardNavbar } from "../components/dashboard/DashboardNavbar";
import { ArrowLeft, Moon, Sun, Monitor, Bell, Trash2, LogOut, CheckCircle, AlertTriangle } from "lucide-react";

export const Settings = () => {
  const { logout } = useAuth();
  const { language, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem("setuai_push_enabled") !== "false";
  });
  const [showToast, setShowToast] = useState("");

  const handleNotificationToggle = () => {
    const val = !notificationsEnabled;
    setNotificationsEnabled(val);
    localStorage.setItem("setuai_push_enabled", String(val));
    triggerToast(language === "hi" ? "अधिसूचना प्राथमिकता सहेजी गई" : "Notification preference updated");
  };

  const handleClearHistory = () => {
    if (window.confirm(t("dashboard.clearHistoryDesc"))) {
      chatService.clearAll();
      triggerToast(language === "hi" ? "सभी बातचीत मिटा दी गई हैं" : "All chats deleted successfully");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 2000);
  };

  const themeOptions = [
    { id: "light", label: t("dashboard.themeLight"), icon: <Sun className="h-4 w-4" /> },
    { id: "dark", label: t("dashboard.themeDark"), icon: <Moon className="h-4 w-4" /> },
    { id: "system", label: t("dashboard.themeSystem"), icon: <Monitor className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-all duration-300">
      <DashboardNavbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 space-y-6 text-left">
        {/* Back Link */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}
        </button>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("dashboard.settingsTitle")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("dashboard.settingsSubtitle")}
          </p>
        </div>

        {/* Settings Panel Grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          
          {/* Appearance Theme */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {t("dashboard.themeLabel")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {themeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                    theme === opt.id
                      ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/15 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-650 dark:text-slate-400"
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800/80" />

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {t("dashboard.notificationsTitle")}
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400">
                {t("dashboard.notificationsLabel")}
              </p>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={handleNotificationToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
                notificationsEnabled ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800/80" />

          {/* Danger Zone */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              {t("dashboard.dangerZone")}
            </h3>
            
            <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-200/50 dark:border-rose-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-0.5 text-left">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t("dashboard.clearHistoryBtn")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("dashboard.clearHistoryDesc")}
                </p>
              </div>
              <button
                onClick={handleClearHistory}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-950/20 text-rose-650 dark:text-rose-400 text-xs font-bold transition cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                {t("dashboard.clearHistoryBtn")}
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800/80" />

          {/* Logout Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {language === "hi" ? "खाता क्रियाएं" : "Account Actions"}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {language === "hi" ? "अपने सत्र से लॉगआउट करें।" : "Sign out from your active session."}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-350 text-xs font-bold transition cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              {t("dashboard.logoutLink")}
            </button>
          </div>

        </div>
      </main>

      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-5 py-3 rounded-2xl shadow-xl border border-slate-800 animate-bounce flex items-center gap-2.5">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}
    </div>
  );
};
