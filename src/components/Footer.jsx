import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Leaf, Mail, PhoneCall, MapPin } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="text-stone-300 border-t border-stone-800"
      style={{ background: "linear-gradient(165deg, #122018 0%, #0d1a13 50%, #0a1510 100%)" }}
    >
      {/* Saffron top accent */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-green-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4 text-left">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-400 to-green-600 flex items-center justify-center shadow-lg">
                <Leaf className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Setu<span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">AI</span>
              </span>
            </a>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {t("footer.aboutDesc")}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 bg-green-900/50 border border-green-700/50 rounded-full text-xs font-bold text-green-300">🇮🇳 Made in India</span>
              <span className="px-3 py-1 bg-orange-900/50 border border-orange-700/50 rounded-full text-xs font-bold text-orange-300">🌾 For Farmers</span>
              <span className="px-3 py-1 bg-blue-900/50 border border-blue-700/50 rounded-full text-xs font-bold text-blue-300">🆓 100% Free</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: "Facebook", icon: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/> },
                { label: "Twitter", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-green-700 flex items-center justify-center transition-all duration-200 text-stone-400 hover:text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: t("nav.home"), href: "#home" },
                { label: t("nav.features"), href: "#features" },
                { label: t("nav.about"), href: "#about" },
                { label: "Login / Sign Up", href: "/login" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-green-400 hover:pl-1 transition-all duration-150 flex items-center gap-1.5">
                    <span className="text-green-700 text-xs">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("footer.contact")}
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-500 text-xs mb-0.5">Email Support</p>
                  <a href="mailto:support@setuai.org" className="hover:text-green-400 transition-colors">
                    support@setuai.org
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneCall className="w-4.5 h-4.5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-500 text-xs mb-0.5">Toll-Free Helpline</p>
                  <span>+91 1800 123 4567</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-500 text-xs mb-0.5">Serving</p>
                  <span>Pan India · All 28 States & 8 UTs</span>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs pt-3 border-t border-stone-800">
              <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
              <span className="text-stone-700">•</span>
              <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p className="text-center sm:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span>Built for the <strong className="text-stone-500">Digital India</strong> Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
