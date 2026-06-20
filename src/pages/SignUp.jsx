import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Eye, EyeOff, Sparkles, ArrowLeft, Loader2, Sprout, GraduationCap, Heart, Users, Smile } from "lucide-react";

export const SignUp = () => {
  const { t, language, setLanguage } = useLanguage();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [preferredLanguage, setPreferredLanguage] = useState(language);
  const [userType, setUserType] = useState("general");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLangChange = (langCode) => {
    setPreferredLanguage(langCode);
    setLanguage(langCode); // Change UI language immediately
  };

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = t("auth.validation.required");
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = t("auth.validation.fullNameMin");
    }

    if (!phone.trim()) {
      newErrors.phone = t("auth.validation.required");
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
        newErrors.phone = t("auth.validation.phoneInvalid");
      }
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = t("auth.validation.phoneOrEmailInvalid");
      }
    }

    if (!password) {
      newErrors.password = t("auth.validation.required");
    } else if (password.length < 6) {
      newErrors.password = t("auth.validation.passwordMin");
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordsMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const userData = {
      name: fullName,
      phone,
      email: email || null,
      password,
      language: preferredLanguage,
      type: userType
    };

    try {
      await signUp(userData);
      navigate("/dashboard");
    } catch (err) {
      console.error("SignUp error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userRoles = [
    { id: "farmer", label: t("auth.userTypes.farmer"), icon: <Sprout className="w-5 h-5" /> },
    { id: "student", label: t("auth.userTypes.student"), icon: <GraduationCap className="w-5 h-5" /> },
    { id: "woman", label: t("auth.userTypes.woman"), icon: <Heart className="w-5 h-5" /> },
    { id: "senior", label: t("auth.userTypes.senior"), icon: <Smile className="w-5 h-5" /> },
    { id: "general", label: t("auth.userTypes.general"), icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-stone-50 via-stone-50/50 to-white px-4 py-16 overflow-hidden">
      {/* Glow Spots */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-orange-150/15 blur-[120px] -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-150/15 blur-[120px] -z-10" />

      {/* Home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t("nav.home")}</span>
      </Link>

      <div className="w-full max-w-lg bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl glass-panel relative my-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 shadow-md shadow-amber-500/10 mb-1">
            <Sparkles className="w-6 h-6 text-white fill-white/10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("auth.signUpTitle")}
          </h2>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="fullName" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t("auth.fullName")} *
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className={`w-full px-4.5 py-3 rounded-2xl border text-sm bg-stone-50/50 outline-none transition-all ${
                errors.fullName ? "border-red-400 focus:border-red-500" : "border-stone-250 focus:border-emerald-500 focus:bg-white"
              }`}
            />
            {errors.fullName && (
              <span className="text-[11px] text-red-500 font-medium block pl-1">{errors.fullName}</span>
            )}
          </div>

          {/* Grid fields: Mobile and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {t("auth.phoneOrEmail").split(" ")[0]} *
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className={`w-full px-4.5 py-3 rounded-2xl border text-sm bg-stone-50/50 outline-none transition-all ${
                  errors.phone ? "border-red-400 focus:border-red-500" : "border-stone-250 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.phone && (
                <span className="text-[11px] text-red-500 font-medium block pl-1">{errors.phone}</span>
              )}
            </div>

            {/* Email (Optional) */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {t("auth.phoneOrEmail").split(" ")[3]} ({t("auth.phoneOrEmail").includes("Email") ? "Optional" : "वैकल्पिक"})
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className={`w-full px-4.5 py-3 rounded-2xl border text-sm bg-stone-50/50 outline-none transition-all ${
                  errors.email ? "border-red-400 focus:border-red-500" : "border-stone-250 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.email && (
                <span className="text-[11px] text-red-500 font-medium block pl-1">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Grid fields: Password and Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {t("auth.password")} *
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className={`w-full pl-4.5 pr-11 py-3 rounded-2xl border text-sm bg-stone-50/50 outline-none transition-all ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-stone-250 focus:border-emerald-500 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[11px] text-red-500 font-medium block pl-1">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {t("auth.confirmPassword")} *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className={`w-full pl-4.5 pr-11 py-3 rounded-2xl border text-sm bg-stone-50/50 outline-none transition-all ${
                    errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-stone-250 focus:border-emerald-500 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[11px] text-red-500 font-medium block pl-1">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Preferred Language Radio Cards */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              {t("auth.preferredLanguage")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleLangChange("en")}
                className={`py-3 px-4.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  preferredLanguage === "en"
                    ? "border-emerald-600 bg-emerald-50/30 text-emerald-800 ring-2 ring-emerald-600/10"
                    : "border-stone-200 hover:border-stone-350 bg-stone-50/50 text-slate-700"
                }`}
              >
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => handleLangChange("hi")}
                className={`py-3 px-4.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  preferredLanguage === "hi"
                    ? "border-emerald-600 bg-emerald-50/30 text-emerald-800 ring-2 ring-emerald-600/10"
                    : "border-stone-200 hover:border-stone-350 bg-stone-50/50 text-slate-700"
                }`}
              >
                <span>हिन्दी</span>
              </button>
            </div>
          </div>

          {/* User Type selector Cards */}
          <div className="space-y-2.5 text-left">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              {t("auth.userType")}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setUserType(role.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all text-xs font-semibold cursor-pointer active:scale-95 ${
                    userType === role.id
                      ? "border-emerald-600 bg-emerald-50/30 text-emerald-800 ring-2 ring-emerald-600/10"
                      : "border-stone-200 hover:border-stone-300 bg-stone-50/50 text-slate-600"
                  }`}
                >
                  <div className={`p-2 rounded-xl border ${
                    userType === role.id ? "bg-white border-emerald-300 text-emerald-700" : "bg-white border-stone-150 text-slate-500"
                  }`}>
                    {role.icon}
                  </div>
                  <span>{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-600/10 hover:-translate-y-0.5 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none pt-4 cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : null}
            <span>{t("auth.signUpBtn")}</span>
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-8 text-center text-xs font-medium text-slate-500 border-t border-stone-100 pt-6">
          <span>{t("auth.alreadyAccount")}{" "}</span>
          <Link to="/login" className="text-emerald-700 hover:text-emerald-800 hover:underline transition-colors font-bold">
            {t("nav.login")}
          </Link>
        </div>

      </div>
    </div>
  );
};
