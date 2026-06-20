import React, { useState } from "react";
import { Sparkles, User, FileText, CheckCircle, Gift, Info, Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const ChatMessage = ({ message }) => {
  const { t } = useLanguage();
  const { sender, text, type, greeting, cards, followUp, timestamp } = message;
  const isUser = sender === "user";
  const [toastMessage, setToastMessage] = useState("");

  const handleActionClick = (e, actionType) => {
    e.preventDefault();
    setToastMessage(t("dashboard.voiceComingSoon").replace("Voice assistant", actionType));
    setTimeout(() => setToastMessage(""), 3000);
  };

  const formatMessageText = (txt) => {
    if (!txt) return null;
    return txt.split("\n").map((line, i) => {
      // Parse bold text **like this**
      const parts = [];
      let temp = line;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      let lastIndex = 0;
      while ((match = regex.exec(temp)) !== null) {
        if (match.index > lastIndex) {
          parts.push(temp.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900 dark:text-emerald-400">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < temp.length) {
        parts.push(temp.substring(lastIndex));
      }

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanedLine = isBullet ? (line.trim().startsWith("•") ? line.trim().substring(1).trim() : line.trim().substring(1).trim()) : line;

      if (isBullet) {
        return (
          <li key={i} className="ml-5 list-disc my-1 text-slate-700 dark:text-slate-300">
            {parts.length > 0 ? parts : cleanedLine}
          </li>
        );
      }
      return (
        <p key={i} className="mb-2 last:mb-0 leading-relaxed text-slate-700 dark:text-slate-300">
          {parts.length > 0 ? parts : cleanedLine}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex w-full items-start gap-4 py-6 px-4 md:px-6 transition-all duration-300 ${
        isUser
          ? "bg-slate-50/50 dark:bg-slate-900/10"
          : "bg-white dark:bg-slate-900/30 border-y border-slate-100/50 dark:border-slate-800/30"
      } animate-message-in`}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <User className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Header (Sender & Time) */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {isUser ? t("dashboard.profile") : "SetuAI"}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Message body */}
        <div className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed">
          {isUser ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : type === "scheme_card" ? (
            <div className="space-y-6">
              {greeting && <p className="mb-4">{greeting}</p>}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                {cards &&
                  cards.map((card) => (
                    <div
                      key={card.id}
                      className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      {/* Top Header Section of Card */}
                      <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent dark:from-emerald-950/10 dark:via-teal-950/10">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {card.schemeName}
                          </h4>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
                            Scheme
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      {/* Detail points */}
                      <div className="p-5 flex-1 space-y-4 text-sm">
                        {/* Eligibility */}
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="block font-semibold text-slate-800 dark:text-slate-200">
                              {t("dashboard.eligibility")}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 text-xs">
                              {card.eligibility}
                            </span>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="flex items-start gap-3">
                          <Gift className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="block font-semibold text-slate-800 dark:text-slate-200">
                              {t("dashboard.benefits")}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 text-xs">
                              {card.benefits}
                            </span>
                          </div>
                        </div>

                        {/* Required Documents */}
                        {card.documents && card.documents.length > 0 && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="block font-semibold text-slate-800 dark:text-slate-200">
                                {t("dashboard.documents")}
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {card.documents.map((doc, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded"
                                  >
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
                        <button
                          onClick={(e) => handleActionClick(e, t("dashboard.applyNow"))}
                          className="flex-1 py-2 px-3 text-center bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-sm cursor-pointer"
                        >
                          {t("dashboard.applyNow")}
                        </button>
                        <button
                          onClick={(e) => handleActionClick(e, t("dashboard.learnMore"))}
                          className="flex-1 py-2 px-3 text-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                        >
                          {t("dashboard.learnMore")}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {followUp && <p className="mt-4 italic">{followUp}</p>}
            </div>
          ) : (
            <div className="space-y-1">{formatMessageText(text)}</div>
          )}
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-800 animate-bounce flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
