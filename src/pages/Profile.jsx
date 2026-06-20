import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { profileService } from "../services/profileService";
import { DashboardNavbar } from "../components/dashboard/DashboardNavbar";
import { ArrowLeft, User, Phone, Mail, CheckCircle, Sprout, GraduationCap, Heart, Calendar, HelpCircle, Save, X } from "lucide-react";

export const Profile = () => {
  const { user, isGuest, isAuthenticated, loading, updateUser } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "general",
    language: "en",
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Load profile data into form state
  useEffect(() => {
    if (isAuthenticated) {
      const activeUser = profileService.get() || {};
      setFormData({
        name: activeUser.name || "",
        phone: activeUser.phone || "",
        email: activeUser.email || "",
        type: activeUser.type || "general",
        language: activeUser.language || language || "en",
      });
    }
  }, [isAuthenticated, language]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = t("auth.validation.required");
    } else if (formData.name.trim().length < 3) {
      errs.name = t("auth.validation.fullNameMin");
    }

    if (!formData.phone.trim()) {
      errs.phone = t("auth.validation.required");
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = t("auth.validation.phoneInvalid");
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = t("auth.validation.phoneOrEmailInvalid");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Update in localStorage via service & update Auth Context
    profileService.update(formData);
    updateUser(formData);
    
    // Sync app language context
    setLanguage(formData.language);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const roleCards = [
    { id: "farmer", label: t("auth.userTypes.farmer"), desc: language === "hi" ? "कृषि योजनाएं और फसल सहायता" : "Farming schemes & crop aid", icon: <Sprout className="h-5 w-5 text-amber-600" /> },
    { id: "student", label: t("auth.userTypes.student"), desc: language === "hi" ? "छात्रवृत्ति और शिक्षा सहायता" : "Scholarships & education aid", icon: <GraduationCap className="h-5 w-5 text-blue-600" /> },
    { id: "woman", label: t("auth.userTypes.woman"), desc: language === "hi" ? "महिला सशक्तिकरण और कल्याण" : "Women empowerment & welfare", icon: <Heart className="h-5 w-5 text-rose-600" /> },
    { id: "senior", label: t("auth.userTypes.senior"), desc: language === "hi" ? "वरिष्ठ नागरिक पेंशन और सहायता" : "Senior pension & health benefits", icon: <Calendar className="h-5 w-5 text-indigo-600" /> },
    { id: "general", label: t("auth.userTypes.general"), desc: language === "hi" ? "सामान्य नागरिक योजनाएं" : "General public services", icon: <HelpCircle className="h-5 w-5 text-slate-600" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-all duration-300">
      <DashboardNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6 text-left">
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
            {t("dashboard.profileTitle")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("dashboard.profileSubtitle")}
          </p>
        </div>

        {/* Edit Form Card */}
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          
          {/* Main Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("auth.fullName")} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === "hi" ? "अपना नाम दर्ज करें" : "Enter your full name"}
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border text-sm text-slate-800 dark:text-slate-100 placeholder-slate-450 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    errors.name ? "border-rose-350 dark:border-rose-900/60" : "border-slate-200 dark:border-slate-700/80"
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.name}</p>}
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("auth.phoneOrEmail").split(" ")[0]} (Mobile) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210"
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border text-sm text-slate-800 dark:text-slate-100 placeholder-slate-450 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    errors.phone ? "border-rose-350 dark:border-rose-900/60" : "border-slate-200 dark:border-slate-700/80"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.phone}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {language === "hi" ? "ईमेल पता" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@setuai.org"
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border text-sm text-slate-800 dark:text-slate-100 placeholder-slate-450 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    errors.email ? "border-rose-350 dark:border-rose-900/60" : "border-slate-200 dark:border-slate-700/80"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.email}</p>}
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("auth.preferredLanguage")}
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-between p-3 rounded-2xl border text-sm font-semibold cursor-pointer transition ${
                  formData.language === "en"
                    ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10 text-slate-900 dark:text-white"
                    : "border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                }`}>
                  <span>English</span>
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={formData.language === "en"}
                    onChange={() => setFormData({ ...formData, language: "en" })}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                </label>
                <label className={`flex-1 flex items-center justify-between p-3 rounded-2xl border text-sm font-semibold cursor-pointer transition ${
                  formData.language === "hi"
                    ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10 text-slate-900 dark:text-white"
                    : "border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                }`}>
                  <span>हिन्दी</span>
                  <input
                    type="radio"
                    name="language"
                    value="hi"
                    checked={formData.language === "hi"}
                    onChange={() => setFormData({ ...formData, language: "hi" })}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* User Type / Role Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {t("auth.userType")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {roleCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setFormData({ ...formData, type: card.id })}
                  className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-28 hover:shadow-sm transition-all duration-300 ${
                    formData.type === card.id
                      ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                      {card.icon}
                    </div>
                    {formData.type === card.id && (
                      <span className="h-4.5 w-4.5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {card.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
            >
              {t("dashboard.cancel")}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/10 hover:shadow-lg transition cursor-pointer"
            >
              <Save className="h-4 w-4" />
              {t("dashboard.saveChanges")}
            </button>
          </div>

        </form>
      </main>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-5 py-3 rounded-2xl shadow-xl border border-slate-800 animate-bounce flex items-center gap-2.5">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span>{t("dashboard.profileUpdated")}</span>
        </div>
      )}
    </div>
  );
};
