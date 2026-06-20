import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, User, Settings, LogOut, Globe, ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationDropdown } from "./NotificationDropdown";

export const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, isGuest, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications(language);
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside clicks
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = () => {
    if (isGuest || !user || !user.name) return "G";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getUserName = () => {
    if (isGuest) return t("dashboard.guestUser");
    return user?.name || "User";
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Side: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer lg:hidden transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-955 to-slate-800 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              SetuAI
            </span>
          </Link>
        </div>

        {/* Right Side: Language, Notification, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Selector */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{language === "en" ? "हिन्दी" : "English"}</span>
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <NotificationDropdown
                notifications={notifications}
                unreadCount={unreadCount}
                markAllRead={markAllRead}
                markRead={markRead}
                onClose={() => setNotifOpen(false)}
              />
            )}
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-full md:rounded-xl md:border md:border-slate-200 md:dark:border-slate-700/80 md:px-3 md:py-1.5 hover:bg-slate-50 dark:hover:bg-slate-850 transition cursor-pointer"
            >
              <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                {getInitials()}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[90px] truncate">
                {getUserName()}
              </span>
              <ChevronDown className="hidden md:block h-3.5 w-3.5 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 transform origin-top-right transition-all">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/40 md:hidden">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {getUserName()}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  {t("dashboard.profileLink")}
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  {t("dashboard.settingsLink")}
                </Link>

                <div className="h-px bg-slate-100 dark:bg-slate-700/40 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer text-left"
                >
                  <LogOut className="h-4 w-4" />
                  {t("dashboard.logoutLink")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
