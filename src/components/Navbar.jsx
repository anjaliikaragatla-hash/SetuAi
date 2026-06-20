import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, Globe, Sparkles } from "lucide-react";

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
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

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "glass-nav shadow-sm py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white fill-white/10" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent flex items-center">
              Setu<span className="bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent font-extrabold">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Buttons (Language and CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-slate-700 text-sm font-medium transition-all active:scale-95 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{language === "en" ? "Hindi (हिंदी)" : "English"}</span>
            </button>

            {/* Get Started Button */}
            <a
              href="#home"
              className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-emerald-600/10 active:scale-98 transition-all hover:-translate-y-0.5"
            >
              {t("nav.getStarted")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full border border-stone-200 text-slate-700 active:scale-95"
            >
              <Globe className="w-4.5 h-4.5 text-emerald-600" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-stone-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full bg-white border-b border-stone-200/80 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-stone-50 transition-all"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 border-t border-stone-100 px-4">
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="w-full text-center block bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium py-3 rounded-xl hover:shadow-lg transition-all active:scale-98"
            >
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
