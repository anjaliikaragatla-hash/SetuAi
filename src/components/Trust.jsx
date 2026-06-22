import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, HeartHandshake, FileCheck } from "lucide-react";

export const Trust = () => {
  const { t } = useLanguage();

  const trustItems = [
    {
      id: "secure",
      icon: <ShieldCheck className="w-9 h-9 text-green-700" />,
      emoji: "🛡️",
      title: t("trust.secure.title"),
      desc: t("trust.secure.desc"),
      bg: "bg-green-50",
      border: "border-green-200",
      hoverBorder: "hover:border-green-400",
      tag: "Security"
    },
    {
      id: "free",
      icon: <HeartHandshake className="w-9 h-9 text-orange-600" />,
      emoji: "🤝",
      title: t("trust.free.title"),
      desc: t("trust.free.desc"),
      bg: "bg-orange-50",
      border: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      tag: "Welfare"
    },
    {
      id: "reliable",
      icon: <FileCheck className="w-9 h-9 text-blue-700" />,
      emoji: "📋",
      title: t("trust.reliable.title"),
      desc: t("trust.reliable.desc"),
      bg: "bg-blue-50",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      tag: "Accuracy"
    }
  ];

  const stats = [
    { value: "50K+", label: "Beneficiaries", emoji: "👨‍👩‍👧‍👦" },
    { value: "500+", label: "Schemes Covered", emoji: "📜" },
    { value: "22+", label: "Languages", emoji: "🌐" },
    { value: "99.5%", label: "Uptime", emoji: "⚡" },
  ];

  return (
    <section className="py-24 section-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-green-50/60 blur-[80px] -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-50/50 blur-[70px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs font-bold text-green-700 tracking-widest uppercase bg-green-50 border border-green-200 px-4 py-1.5 rounded-full">
            {t("trust.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t("trust.title")}
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
            {t("trust.subtitle")}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center bg-stone-50 border-2 border-stone-100 rounded-2xl py-5 px-4 hover:border-green-300 hover:bg-green-50/30 transition-all duration-200">
              <div className="text-3xl mb-1.5">{stat.emoji}</div>
              <p className="text-2xl font-extrabold text-green-700">{stat.value}</p>
              <p className="text-xs text-stone-500 font-semibold mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center p-8 rounded-3xl bg-white border-2 ${item.border} ${item.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center`}
            >
              {/* Emoji */}
              <div className="text-4xl mb-4">{item.emoji}</div>

              {/* Icon Container */}
              <div className={`w-18 h-18 rounded-2xl ${item.bg} flex items-center justify-center border-2 ${item.border} mb-5 shadow-inner`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-stone-800 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
                {item.desc}
              </p>

              {/* Tag */}
              <div className={`mt-5 px-3 py-1 rounded-full text-xs font-bold ${item.bg} border ${item.border}`}>
                {item.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial / Social Proof */}
        <div className="mt-16 rounded-3xl overflow-hidden border-2 border-stone-100">
          <div className="bg-gradient-to-r from-stone-50 to-green-50/30 px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-3xl border-2 border-orange-200 shadow">
                🌾
              </div>
              <p className="text-xs font-bold text-stone-700">Ramesh Kumar</p>
              <p className="text-[10px] text-stone-500">Farmer, Rajasthan</p>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-amber-400 text-base">★</span>
                ))}
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic font-medium">
                "SetuAI ने मुझे PM Kisan Samman Nidhi के बारे में बताया और आवेदन करने में मदद की। पहले मुझे पता ही नहीं था। अब मेरे खाते में सीधे पैसे आते हैं।"
              </p>
              <p className="text-green-700 text-xs font-bold mt-3">✓ Verified User</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
