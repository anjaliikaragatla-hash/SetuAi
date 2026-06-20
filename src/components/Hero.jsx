import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { InteractiveChat } from "./InteractiveChat";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 via-stone-50/50 to-white">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-200/20 blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-200/20 blur-[120px] animate-pulse-slow-reverse -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-amber-100/30 blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Headlines & Action Buttons */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Banner/Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/60 border border-amber-200 text-amber-900 text-xs font-semibold shadow-sm tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-spin-slow" />
              <span>{t("hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              {t("hero.titlePart1")}
              <span className="block bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent mt-2">
                {t("hero.titlePart2")}
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold px-7 py-4 rounded-full shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:scale-98 transition-all duration-200"
              >
                <span>{t("hero.btnPrimary")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-white border border-stone-200 text-slate-700 font-semibold px-7 py-4 rounded-full hover:bg-stone-50 hover:border-slate-300 hover:-translate-y-0.5 active:scale-98 transition-all duration-200 shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>{t("hero.btnSecondary")}</span>
              </a>
            </div>

            {/* Trust Micro-note */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 max-w-md">
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-xs">🌾</span>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs">📚</span>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs">👵</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t("language") === "hi" 
                  ? "ग्राम पंचायतों, स्वयं सहायता समूहों और स्वयंसेवकों द्वारा विश्वसनीय।" 
                  : "Trusted by gram panchayats, self-help groups, and rural volunteers."}
              </p>
            </div>
          </div>

          {/* Right Side: Vector Illustration & Interactive Simulator Stack */}
          <div className="lg:col-span-6 relative flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center gap-6 w-full">
            {/* The Custom Vector Illustration */}
            <div className="w-full max-w-[340px] md:max-w-[300px] xl:max-w-[320px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 p-2 bg-white transition-all duration-300 hover:shadow-2xl">
              <img 
                src="/hero_illustration.png" 
                alt="SetuAI illustration showing Indian family interacting with a smartphone AI assistant" 
                className="w-full rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Floating Live AI Chat Simulator */}
            <div className="w-full max-w-sm shrink-0 relative">
              {/* Glow Behind Chat */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl -z-10" />
              <InteractiveChat />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
