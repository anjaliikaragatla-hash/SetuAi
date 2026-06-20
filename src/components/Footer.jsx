import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, Mail, PhoneCall } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          {/* Brand and Description (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center shadow-md shadow-amber-500/10">
                <Sparkles className="w-4 h-4 text-white fill-white/10" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                Setu<span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent font-extrabold">AI</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t("footer.aboutDesc")}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Youtube">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column (3 cols) */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("language") === "hi" ? "त्वरित लिंक" : "Quick Links"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors">{t("nav.home")}</a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">{t("nav.features")}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">{t("nav.about")}</a>
              </li>
            </ul>
          </div>

          {/* Guidelines Column (4 cols) */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              {t("footer.contact")}
            </h4>
            
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-emerald-500" />
                <a href="mailto:support@setuai.org" className="hover:text-emerald-400 transition-colors">support@setuai.org</a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4.5 h-4.5 text-emerald-500" />
                <span className="hover:text-emerald-400 transition-colors">+91 1800 123 4567 (Toll Free)</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs pt-2 border-t border-slate-800">
              <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
              <span className="text-slate-700">•</span>
              <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            {t("footer.copyright")}
          </p>
          <p className="text-center sm:text-right flex items-center gap-1">
            <span>🇮🇳</span> Built for the Digital India Initiative
          </p>
        </div>

      </div>
    </footer>
  );
};
