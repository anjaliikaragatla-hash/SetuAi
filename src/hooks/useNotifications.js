import { useState } from "react";

const MOCK_NOTIFICATIONS = {
  en: [
    { id: "n1", title: "New Scheme Available", desc: "PM-KISAN 15th installment released. Check eligibility.", icon: "🎉", read: false, time: "2 hours ago" },
    { id: "n2", title: "Profile Incomplete", desc: "Complete your profile to get personalized scheme recommendations.", icon: "👤", read: false, time: "1 day ago" },
    { id: "n3", title: "AI Assistant Updated", desc: "SetuAI now covers 50+ new government schemes.", icon: "✨", read: true, time: "3 days ago" }
  ],
  hi: [
    { id: "n1", title: "नई योजना उपलब्ध", desc: "पीएम-किसान 15वीं किस्त जारी। पात्रता जांचें।", icon: "🎉", read: false, time: "2 घंटे पहले" },
    { id: "n2", title: "प्रोफाइल अधूरी है", desc: "व्यक्तिगत योजना सिफारिशों के लिए अपनी प्रोफाइल पूरी करें।", icon: "👤", read: false, time: "1 दिन पहले" },
    { id: "n3", title: "एआई सहायक अपडेट", desc: "SetuAI अब 50+ नई सरकारी योजनाएं कवर करता है।", icon: "✨", read: true, time: "3 दिन पहले" }
  ]
};

export const useNotifications = (language = "en") => {
  const lang = language === "hi" ? "hi" : "en";
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS[lang]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return { notifications, unreadCount, markAllRead, markRead };
};
