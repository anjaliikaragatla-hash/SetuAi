import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Eye, EyeOff, Leaf, ArrowLeft, Loader2 } from "lucide-react";

export const Login = () => {
  const { t } = useLanguage();
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestSubmitting, setIsGuestSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = t("auth.validation.required");
    } else {
      // Very basic validation (either contains '@' or is 10 digits)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
      const cleaned = phoneOrEmail.replace(/\s+/g, "");
      if (!emailRegex.test(cleaned) && !phoneRegex.test(cleaned)) {
        newErrors.phoneOrEmail = t("auth.validation.phoneOrEmailInvalid");
      }
    }

    if (!password) {
      newErrors.password = t("auth.validation.required");
    } else if (password.length < 6) {
      newErrors.password = t("auth.validation.passwordMin");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(phoneOrEmail, password);
      navigate("/dashboard");
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestLogin = async () => {
    setAuthError("");
    setIsGuestSubmitting(true);
    try {
      await loginAsGuest();
      navigate("/dashboard");
    } catch (err) {
      setAuthError("Failed to continue as guest. Please try again.");
    } finally {
      setIsGuestSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-12 overflow-hidden hero-bg">
      {/* Background Glow Gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-green-200/20 blur-[90px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-200/15 blur-[110px] animate-pulse-slow-reverse -z-10" />

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t("nav.home")}</span>
      </Link>

      <div className="w-full max-w-md bg-white border-2 border-stone-200 rounded-3xl p-8 sm:p-10 shadow-2xl glass-panel relative">

        {/* Saffron accent top */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-green-600" />
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-green-600 shadow-lg shadow-green-600/20 mb-2">
            <Leaf className="w-7 h-7 text-white fill-white/25" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t("auth.loginTitle")}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            {t("auth.loginSubtitle")}
          </p>
        </div>

        {/* Global Error message */}
        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
            {authError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile/Email Field */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="phoneOrEmail" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t("auth.phoneOrEmail")}
            </label>
            <input
              id="phoneOrEmail"
              type="text"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              placeholder="e.g. 9876543210 or name@example.com"
              className={`w-full px-4.5 py-3.5 rounded-2xl border text-sm bg-stone-50/60 outline-none transition-all ${
                errors.phoneOrEmail 
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
              }`}
            />
            {errors.phoneOrEmail && (
              <span className="text-[11px] text-red-500 font-medium block pl-1">
                {errors.phoneOrEmail}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t("auth.password")}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={`w-full pl-4.5 pr-11 py-3.5 rounded-2xl border text-sm bg-stone-50/60 outline-none transition-all ${
                  errors.password 
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                    : "border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
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
              <span className="text-[11px] text-red-500 font-medium block pl-1">
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs font-medium pt-1">
            <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-stone-300 text-green-700 focus:ring-green-500 cursor-pointer accent-green-700"
              />
              <span>{t("auth.rememberMe")}</span>
            </label>
            <a href="#" className="text-green-700 hover:text-green-800 transition-colors font-semibold">
              {t("auth.forgotPassword")}
            </a>
          </div>

          {/* Form Actions */}
          <div className="space-y-3 pt-3">
            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGuestSubmitting}
              className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-700/20 hover:shadow-green-700/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : null}
              <span>{t("auth.loginBtn")}</span>
            </button>

            {/* Guest Login Button */}
            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isSubmitting || isGuestSubmitting}
              className="w-full bg-stone-50 border-2 border-stone-200 text-stone-700 font-semibold py-4 rounded-2xl hover:bg-stone-100 hover:border-stone-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isGuestSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
              ) : null}
              <span>{t("auth.guestBtn")}</span>
            </button>
          </div>
        </form>

        {/* Bottom Redirect */}
        <div className="mt-8 text-center text-xs font-medium text-stone-500 border-t border-stone-100 pt-6">
          <span>{t("auth.noAccount")}{" "}</span>
          <Link to="/signup" className="text-green-700 hover:text-green-800 hover:underline transition-colors font-bold">
            {t("auth.createAccount")}
          </Link>
        </div>

      </div>
    </div>
  );
};
