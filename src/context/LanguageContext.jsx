import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Support default language based on localStorage or fallback to English
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("setuai_lang");
    return saved === "en" || saved === "hi" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("setuai_lang", language);
    // Set document lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translate helper function lookup (e.g., "hero.titlePart1")
  const t = (keyPath) => {
    const keys = keyPath.split(".");
    let value = translations[language];
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Fallback to English if not found in Hindi
        let englishValue = translations["en"];
        for (const engKey of keys) {
          if (englishValue && englishValue[engKey] !== undefined) {
            englishValue = englishValue[engKey];
          } else {
            return keyPath;
          }
        }
        return englishValue;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
