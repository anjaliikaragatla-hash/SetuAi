import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, MessageSquare } from "lucide-react";

export const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-stone-50/50 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-400/10 to-emerald-400/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden px-8 py-12 sm:px-16 sm:py-16 bg-gradient-to-tr from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/25 shadow-2xl text-center">
          {/* Animated Background Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative space-y-6 max-w-2xl mx-auto flex flex-col items-center">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-emerald-400/20 text-emerald-400 animate-pulse" />
              <span>SetuAI Beta</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {t("cta.title")}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t("cta.subtitle")}
            </p>

            {/* CTA Button */}
            <div className="pt-4 w-full sm:w-auto">
              <a
                href="#home"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-orange-500/20 active:scale-98 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 fill-white/10" />
                <span>{t("cta.btn")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
