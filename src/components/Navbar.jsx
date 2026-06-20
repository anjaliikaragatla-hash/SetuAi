import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Globe, Leaf, LogOut, LayoutDashboard } from "lucide-react";

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow and border on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const isLandingPage = location.pathname === "/";

  const navItems = [
    { name: t("nav.home"), href: isLandingPage ? "#home" : "/#home" },
    { name: t("nav.features"), href: isLandingPage ? "#features" : "/#features" },
    { name: t("nav.about"), href: isLandingPage ? "#about" : "/#about" },
    { name: t("nav.contact"), href: isLandingPage ? "#contact" : "/#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "glass-nav shadow-md py-3" 
        : "bg-transparent py-5"
    }`}>
      {/* Saffron-to-green accent line at top */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-green-600" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-400 to-green-600 flex items-center justify-center shadow-md shadow-green-600/15 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white fill-white/25" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-stone-900 flex items-center">
              Setu<span className="bg-gradient-to-r from-orange-600 to-green-700 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              isLandingPage ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-stone-600 hover:text-green-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-600 hover:after:w-full after:transition-all after:rounded-full"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold text-stone-600 hover:text-green-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-600 hover:after:w-full after:transition-all after:rounded-full"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right Side Buttons (Language and CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 hover:border-green-300 hover:bg-green-50/30 text-stone-700 text-sm font-semibold transition-all active:scale-95 cursor-pointer bg-white/60"
            >
              <Globe className="w-4 h-4 text-green-600" />
              <span>{language === "en" ? "English" : "हिंदी"}</span>
            </button>

            {/* Authenticated Actions vs Auth Actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-green-700 px-4 py-2 rounded-xl border border-stone-200 hover:border-green-300 transition-all active:scale-95 bg-white/60"
                >
                  <LayoutDashboard className="w-4 h-4 text-green-600" />
                  <span>{t("nav.dashboard")}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 px-4 py-2 rounded-xl border border-red-200 hover:border-red-300 hover:bg-red-50/20 transition-all active:scale-95 bg-white/60 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>{t("nav.logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-stone-600 hover:text-green-700 transition-colors px-3 py-2 cursor-pointer"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-green-700/15 hover:shadow-green-700/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  {t("nav.getStarted")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full border border-stone-200 hover:border-green-300 text-stone-700 active:scale-95 bg-white/80"
            >
              <Globe className="w-4.5 h-4.5 text-green-600" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-green-50 hover:border-green-200 transition-colors bg-white border border-stone-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full bg-white border-b border-stone-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        {/* Saffron-green accent */}
        <div className="h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-green-600" />
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            isLandingPage ? (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3.5 rounded-xl text-base font-semibold text-stone-700 hover:text-green-700 hover:bg-green-50/50 transition-all"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3.5 rounded-xl text-base font-semibold text-stone-700 hover:text-green-700 hover:bg-green-50/50 transition-all"
              >
                {item.name}
              </Link>
            )
          ))}
          
          <div className="pt-4 border-t border-stone-100 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-800 font-bold py-3.5 rounded-xl hover:bg-green-100 transition-all active:scale-[0.98]"
                >
                  <LayoutDashboard className="w-4.5 h-4.5 text-green-600" />
                  <span>{t("nav.dashboard")}</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full text-center flex items-center justify-center gap-2 border border-red-200 text-red-600 font-bold py-3.5 rounded-xl hover:bg-red-50 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5 text-red-500" />
                  <span>{t("nav.logout")}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-stone-50 border border-stone-200 text-stone-700 font-bold py-3.5 rounded-xl hover:bg-stone-100 transition-all active:scale-[0.98]"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:from-green-800 transition-all active:scale-[0.98]"
                >
                  {t("nav.getStarted")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
