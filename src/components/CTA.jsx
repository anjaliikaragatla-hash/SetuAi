import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MessageSquare, Leaf, ArrowRight } from "lucide-react";

export const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 section-muted relative overflow-hidden">
      {/* Warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-green-400/12 to-orange-400/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main CTA Card */}
        <div className="relative rounded-3xl overflow-hidden px-8 py-14 sm:px-16 sm:py-16 text-center"
          style={{
            background: "linear-gradient(145deg, #1a4731 0%, #1a5c3a 35%, #0f3a24 65%, #162e1d 100%)"
          }}
        >
          {/* Texture overlays */}
          <div className="absolute inset-0 opacity-10 pattern-grid" />
          <div className="absolute inset-0 opacity-5 pattern-dots" />

          {/* Decorative top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-green-400/15 blur-[60px] rounded-full" />

          {/* Saffron accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

          <div className="relative space-y-6 max-w-2xl mx-auto flex flex-col items-center">

            {/* Icon badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-green-300 text-xs font-bold">
              <Leaf className="w-4 h-4 fill-green-400/30 text-green-300" />
              <span>Digital Bharat · SetuAI</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {t("cta.title")}
            </h2>

            {/* Subtitle */}
            <p className="text-green-200 text-sm sm:text-base leading-relaxed max-w-lg">
              {t("cta.subtitle")}
            </p>

            {/* User type chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {["🌾 Farmers", "📚 Students", "👩 Women", "👵 Senior Citizens", "🏘️ Rural Communities"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs font-semibold text-green-200">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2 w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-9 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all text-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t("cta.btn")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-2xl transition-all text-sm"
              >
                <span>Try as Guest</span>
              </Link>
            </div>

            {/* Trust notes */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[11px] text-green-300 pt-2">
              <span>✓ 100% Free</span>
              <span>✓ No registration needed</span>
              <span>✓ Hindi & English support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
