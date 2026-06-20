import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MessageSquare, Cpu, CheckCircle, ArrowRight, ArrowDown } from "lucide-react";

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="w-9 h-9 text-orange-600" />,
      emoji: "💬",
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      bg: "bg-orange-50",
      border: "border-orange-200",
      numberColor: "text-orange-500",
      highlight: "border-l-orange-400"
    },
    {
      number: "02",
      icon: <Cpu className="w-9 h-9 text-green-700 animate-pulse" />,
      emoji: "🤖",
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      bg: "bg-green-50",
      border: "border-green-200",
      numberColor: "text-green-600",
      highlight: "border-l-green-500"
    },
    {
      number: "03",
      icon: <CheckCircle className="w-9 h-9 text-amber-600" />,
      emoji: "✅",
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      bg: "bg-amber-50",
      border: "border-amber-200",
      numberColor: "text-amber-500",
      highlight: "border-l-amber-400"
    }
  ];

  return (
    <section id="about" className="py-24 section-muted relative overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-100/35 blur-[110px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-100/30 blur-[110px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block text-xs font-bold text-green-700 tracking-widest uppercase bg-green-50 border border-green-200 px-4 py-1.5 rounded-full">
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Step Card */}
              <div className={`w-full lg:w-1/3 flex flex-col items-center bg-white border-2 ${step.border} rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden`}>

                {/* Large Number Watermark */}
                <div className={`absolute top-4 right-5 text-6xl font-black ${step.numberColor} opacity-15 select-none leading-none`}>
                  {step.number}
                </div>

                {/* Emoji */}
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.6}s` }}>
                  {step.emoji}
                </div>

                {/* Icon Container */}
                <div className={`w-18 h-18 rounded-2xl flex items-center justify-center border-2 ${step.border} ${step.bg} mb-5 shadow-inner`}>
                  {step.icon}
                </div>

                {/* Step Details */}
                <h3 className="text-lg font-bold text-stone-800 mb-3 text-center leading-tight">
                  {step.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed text-center max-w-xs">
                  {step.desc}
                </p>

                {/* Step Tag */}
                <div className={`mt-6 px-3.5 py-1.5 rounded-full text-xs font-bold ${step.bg} border ${step.border} ${step.numberColor}`}>
                  Step {step.number}
                </div>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-2 lg:py-0 lg:px-2 text-stone-300">
                  <ArrowRight className="hidden lg:block w-8 h-8 text-green-400" />
                  <ArrowDown className="lg:hidden w-6 h-6 text-green-400 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom insight bar */}
        <div className="mt-16 bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg shadow-green-700/20 pattern-grid">
          <p className="text-base sm:text-lg font-bold">
            🌾 Serving farmers, students, women, and senior citizens across 500+ districts
          </p>
          <p className="text-green-200 text-sm mt-1.5">Available in Hindi and English · 24/7 · Completely Free</p>
        </div>

      </div>
    </section>
  );
};
