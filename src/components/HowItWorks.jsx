import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MessageSquare, Cpu, CheckCircle, ArrowRight, ArrowDown } from "lucide-react";

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="w-8 h-8 text-orange-600" />,
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      color: "bg-orange-50 border-orange-100"
    },
    {
      number: "02",
      icon: <Cpu className="w-8 h-8 text-emerald-600 animate-pulse" />,
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      number: "03",
      icon: <CheckCircle className="w-8 h-8 text-amber-600" />,
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      color: "bg-amber-50 border-amber-100"
    }
  ];

  return (
    <section id="about" className="py-24 bg-stone-50/50 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-100/30 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-emerald-100/30 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full">
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Step Card */}
              <div className="w-full lg:w-1/3 flex flex-col items-center bg-white border border-stone-200/80 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md relative">
                
                {/* Number Badge */}
                <div className="absolute top-4 right-6 text-3xl font-extrabold text-slate-100 tracking-tight select-none">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 mb-6 shadow-inner ${step.color}`}>
                  {step.icon}
                </div>

                {/* Step Details */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed text-center max-w-xs">
                  {step.desc}
                </p>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-2 lg:py-0 lg:px-4 text-slate-300">
                  {/* Horizontal Arrow on Desktop */}
                  <ArrowRight className="hidden lg:block w-8 h-8 text-emerald-600 animate-pulse" />
                  {/* Vertical Arrow on Mobile */}
                  <ArrowDown className="lg:hidden w-6 h-6 text-emerald-600 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
