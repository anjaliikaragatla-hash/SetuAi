import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FileText, MessageSquare, Heart, Sprout, Sparkles, Globe, LogOut, User, MessageCircle } from "lucide-react";

export const Dashboard = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, user, isGuest, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get user name and details
  const userName = user ? user.name : (language === "hi" ? "अतिथि" : "Guest");
  const userRole = user ? user.type : "general";

  // Role labels
  const getRoleLabel = (role) => {
    switch (role) {
      case "farmer": return t("auth.userTypes.farmer");
      case "student": return t("auth.userTypes.student");
      case "woman": return t("auth.userTypes.woman");
      case "senior": return t("auth.userTypes.senior");
      default: return t("auth.userTypes.general");
    }
  };

  const actionCards = [
    { title: t("dashboard.schemes"), desc: language === "hi" ? "पात्रता और योजना विवरण" : "Eligibility & details", icon: <FileText className="w-6 h-6 text-orange-600" />, color: "border-orange-100 bg-orange-50/20" },
    { title: t("dashboard.assistant"), desc: language === "hi" ? "एआई से तुरंत पूछें" : "Ask AI instantly", icon: <MessageSquare className="w-6 h-6 text-emerald-600" />, color: "border-emerald-100 bg-emerald-50/20" },
    { title: t("dashboard.healthcare"), desc: language === "hi" ? "मुफ़्त बीमा और केंद्र" : "Free cover & stores", icon: <Heart className="w-6 h-6 text-red-600" />, color: "border-red-100 bg-red-50/20" },
    { title: t("dashboard.farming"), desc: language === "hi" ? "फसल बीमा और सहायता" : "Crop insurance & aid", icon: <Sprout className="w-6 h-6 text-amber-600" />, color: "border-amber-100 bg-amber-50/20" }
  ];

  return (
    <div className="min-h-screen bg-stone-50/30 flex flex-col antialiased">
      {/* Dashboard Custom Navbar */}
      <header className="glass-nav sticky top-0 left-0 w-full z-40 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4.5 h-4.5 text-white fill-white/10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Setu<span className="text-emerald-600 font-extrabold">AI</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/10 text-slate-700 text-sm font-medium transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </button>

            {/* Profile Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full border border-stone-250 bg-white hover:border-emerald-500 transition-all flex items-center justify-center shadow-sm cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-stone-200 bg-white shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{userName}</p>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mt-1">
                      {getRoleLabel(userRole)}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4.5 h-4.5 text-red-500" />
                    <span>{language === "hi" ? "लॉगआउट करें" : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10" />
          
          <div className="relative space-y-2">
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              {getRoleLabel(userRole)} {t("dashboard.profile")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t("dashboard.welcome")}, {userName}!
            </h1>
            <p className="text-emerald-50 text-sm max-w-md">
              {language === "hi"
                ? "आपका डैशबोर्ड तैयार है। विभिन्न योजनाओं को खोजने के लिए त्वरित कार्यों का उपयोग करें।"
                : "Your personalized dashboard is ready. Use quick actions to discover services tailored for you."}
            </p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {t("dashboard.actionsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionCards.map((card, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:shadow-md cursor-pointer hover:border-emerald-300 ${card.color}`}
              >
                <div className="p-3 bg-white rounded-xl shadow-sm border border-stone-100 shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center AI Chat Coming Next block */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm space-y-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Chatbot Illustration Container */}
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 animate-bounce-slow relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
              <MessageCircle className="w-10 h-10 fill-emerald-600/10 text-emerald-600" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 tracking-wider bg-emerald-50 px-3 py-1 rounded-full uppercase">
                {t("dashboard.chatComing")}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {language === "hi" ? "व्यक्तिगत एआई सहायक जल्द ही आ रहा है!" : "Personalized AI Chat Coming Next!"}
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                {language === "hi"
                  ? "हम आपके प्रोफ़ाइल के अनुसार योजनाओं पर बातचीत करने और दस्तावेज़ों को अपलोड करने की क्षमता तैयार कर रहे हैं।"
                  : "We are preparing a fully interactive conversational experience customized for your profile with document upload support."}
              </p>
            </div>
          </div>

          {/* Disabled chat input bar */}
          <div className="flex items-center gap-2 p-3 bg-stone-100/50 rounded-2xl max-w-lg mx-auto opacity-70 border border-stone-200/50">
            <div className="flex-1 pl-3 text-slate-400 text-sm text-left select-none">
              {t("dashboard.chatPlaceholder")}
            </div>
            <button
              disabled={true}
              className="bg-stone-300 text-stone-500 px-4.5 py-2 rounded-xl text-xs font-bold cursor-not-allowed uppercase tracking-wider"
            >
              {language === "hi" ? "भेजें" : "Send"}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
