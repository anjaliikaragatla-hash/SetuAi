import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { InteractiveChat } from "./InteractiveChat";
import { ArrowRight, HelpCircle, Leaf, Star, Users, Shield } from "lucide-react";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden hero-bg"
    >
      {/* Background Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-[420px] h-[420px] rounded-full bg-green-300/15 blur-[120px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-300/12 blur-[140px] animate-pulse-slow-reverse -z-10" />
      <div className="absolute top-1/2 right-8 w-[280px] h-[280px] rounded-full bg-amber-200/10 blur-[80px] -z-10" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 pattern-dots opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left Side ── */}
          <div className="lg:col-span-6 space-y-7 text-left">

            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/80 text-green-800 text-xs font-bold shadow-sm tracking-wide">
              <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf className="w-3 h-3 text-white fill-white/20" />
              </div>
              <span>{t("hero.badge")}</span>
              <span className="ml-1 flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-stone-900 leading-[1.1] tracking-tight">
                {t("hero.titlePart1")}
                <span className="block mt-2 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-transparent leading-tight pb-1">
                  {t("hero.titlePart2")}
                </span>
              </h1>
              <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/login"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-700/20 hover:shadow-green-700/35 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 text-sm"
              >
                <span>{t("hero.btnPrimary")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2.5 bg-white border-2 border-stone-200 text-stone-700 font-bold px-7 py-[14px] rounded-2xl hover:bg-stone-50 hover:border-green-300 hover:text-green-800 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 shadow-sm text-sm"
              >
                <HelpCircle className="w-4 h-4 text-green-600" />
                <span>{t("hero.btnSecondary")}</span>
              </a>
            </div>

            {/* Trust Signals */}
            <div className="pt-6 border-t border-stone-200/70">
              <div className="flex flex-wrap items-center gap-5">
                {/* Avatar Cluster */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <span className="w-9 h-9 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-sm shadow-sm">🌾</span>
                    <span className="w-9 h-9 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-sm shadow-sm">📚</span>
                    <span className="w-9 h-9 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-sm shadow-sm">👵</span>
                    <span className="w-9 h-9 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-sm shadow-sm">👨‍🌾</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">50,000+ परिवार</p>
                    <p className="text-[10px] text-stone-500">trusted by rural India</p>
                  </div>
                </div>

                <div className="h-8 w-px bg-stone-200 hidden sm:block" />

                {/* Badges */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[11px] font-bold text-green-800">Govt. Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
                    <Users className="w-3.5 h-3.5 text-orange-600" />
                    <span className="text-[11px] font-bold text-orange-800">100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Side ── */}
          <div className="lg:col-span-6 relative flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center gap-6 w-full">

            {/* Hero Illustration */}
            <div className="w-full max-w-[340px] md:max-w-[300px] xl:max-w-[320px] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200/70 p-2.5 bg-white transition-all duration-300 hover:shadow-green-200/50 hover:-translate-y-1 animate-float">
              <img
                src="/hero_illustration.png"
                alt="SetuAI illustration showing Indian family interacting with a smartphone AI assistant"
                className="w-full rounded-2xl object-cover"
              />
              {/* Floating tag on image */}
              <div className="mt-2 mx-1 mb-1 flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-white font-bold text-xs">SetuAI Assistant</p>
                  <p className="text-green-100 text-[10px]">Always available · Free</p>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
              </div>
            </div>

            {/* Live AI Chat Simulator */}
            <div className="w-full max-w-sm shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/8 to-emerald-500/8 rounded-3xl blur-2xl -z-10" />
              <InteractiveChat />
            </div>
          </div>

        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 53.3C96 46.7 192 33.3 288 30C384 26.7 480 33.3 576 36.7C672 40 768 40 864 36.7C960 33.3 1056 26.7 1152 28.3C1248 30 1344 40 1392 45L1440 50V60H0Z" fill="white" fillOpacity="0.6"/>
        </svg>
      </div>
    </section>
  );
};
