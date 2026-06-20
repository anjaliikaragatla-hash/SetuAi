import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FileText, MessageSquare, Languages, Mic } from "lucide-react";

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: "schemes",
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: t("features.schemes.title"),
      desc: t("features.schemes.desc"),
      bgGradient: "from-orange-500/10 to-amber-500/10",
      borderColor: "hover:border-orange-300"
    },
    {
      id: "assistant",
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      title: t("features.assistant.title"),
      desc: t("features.assistant.desc"),
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "hover:border-emerald-300"
    },
    {
      id: "multilingual",
      icon: <Languages className="w-6 h-6 text-indigo-600" />,
      title: t("features.multilingual.title"),
      desc: t("features.multilingual.desc"),
      bgGradient: "from-indigo-500/10 to-violet-500/10",
      borderColor: "hover:border-indigo-300"
    },
    {
      id: "voice",
      icon: <Mic className="w-6 h-6 text-amber-600" />,
      title: t("features.voice.title"),
      desc: t("features.voice.desc"),
      bgGradient: "from-amber-500/10 to-yellow-500/10",
      borderColor: "hover:border-amber-300"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      {/* Background shape */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-50/40 blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full">
            {t("features.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("features.title")}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl p-8 bg-white border border-stone-150 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-default ${item.borderColor}`}
            >
              {/* Subtle hover background glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-stone-50 group-hover:bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-all duration-300 mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-emerald-950 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
