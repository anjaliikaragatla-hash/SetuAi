import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, HeartHandshake, FileCheck } from "lucide-react";

export const Trust = () => {
  const { t } = useLanguage();

  const trustItems = [
    {
      id: "secure",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: t("trust.secure.title"),
      desc: t("trust.secure.desc"),
      color: "from-emerald-500/5 to-teal-500/5"
    },
    {
      id: "free",
      icon: <HeartHandshake className="w-8 h-8 text-amber-600" />,
      title: t("trust.free.title"),
      desc: t("trust.free.desc"),
      color: "from-amber-500/5 to-orange-500/5"
    },
    {
      id: "reliable",
      icon: <FileCheck className="w-8 h-8 text-indigo-600" />,
      title: t("trust.reliable.title"),
      desc: t("trust.reliable.desc"),
      color: "from-indigo-500/5 to-violet-500/5"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full">
            {t("trust.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("trust.title")}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {t("trust.subtitle")}
          </p>
        </div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-8 rounded-3xl bg-stone-50/50 border border-stone-150 transition-all duration-300 hover:shadow-lg hover:border-emerald-200/50"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-stone-100 mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm text-center leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
