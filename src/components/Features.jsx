import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FileText, MessageSquare, Languages, Mic } from "lucide-react";

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: "schemes",
      icon: <FileText className="w-7 h-7 text-orange-600" />,
      emoji: "📋",
      title: t("features.schemes.title"),
      desc: t("features.schemes.desc"),
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      iconBg: "bg-orange-100",
      tagColor: "text-orange-700 bg-orange-50 border-orange-200"
    },
    {
      id: "assistant",
      icon: <MessageSquare className="w-7 h-7 text-green-700" />,
      emoji: "💬",
      title: t("features.assistant.title"),
      desc: t("features.assistant.desc"),
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-500",
      iconBg: "bg-green-100",
      tagColor: "text-green-700 bg-green-50 border-green-200"
    },
    {
      id: "multilingual",
      icon: <Languages className="w-7 h-7 text-blue-700" />,
      emoji: "🌐",
      title: t("features.multilingual.title"),
      desc: t("features.multilingual.desc"),
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      iconBg: "bg-blue-100",
      tagColor: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      id: "voice",
      icon: <Mic className="w-7 h-7 text-amber-700" />,
      emoji: "🎙️",
      title: t("features.voice.title"),
      desc: t("features.voice.desc"),
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      hoverBorder: "hover:border-amber-400",
      iconBg: "bg-amber-100",
      tagColor: "text-amber-700 bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section id="features" className="py-24 section-white relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-100/30 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-100/25 blur-[80px] -z-10" />
      <div className="absolute inset-0 pattern-dots opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs font-bold text-green-700 tracking-widest uppercase bg-green-50 border border-green-200 px-4 py-1.5 rounded-full">
            {t("features.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t("features.title")}
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl p-7 bg-white border-2 ${item.borderColor} ${item.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-default`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-5xl font-black text-stone-100 select-none leading-none">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-stone-800 mb-2.5 group-hover:text-green-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Bottom tag */}
              <div className={`mt-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.tagColor}`}>
                <span>{item.emoji}</span>
                <span>Feature {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
