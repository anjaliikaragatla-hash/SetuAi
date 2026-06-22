import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useChat } from "../hooks/useChat";
import { Sidebar } from "../components/dashboard/Sidebar";
import { DashboardNavbar } from "../components/dashboard/DashboardNavbar";
import { ChatMessage } from "../components/chat/ChatMessage";
import { ChatInput } from "../components/chat/ChatInput";
import { SuggestionChips } from "../components/chat/SuggestionChips";
import { TypingIndicator } from "../components/chat/TypingIndicator";
import { chatService } from "../services/chatService";
import { Sparkles, MessageSquare, AlertCircle } from "lucide-react";

export const Dashboard = () => {
  const { isAuthenticated, user, isGuest, loading } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [activeChatId, setActiveChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiWarning, setApiWarning] = useState(false);
  const messagesEndRef = useRef(null);

  const { messages, isTyping, error, loadMessages, sendMessage } = useChat(activeChatId, language);

  useEffect(() => {
    const handleFallback = () => {
      setApiWarning(true);
      setTimeout(() => setApiWarning(false), 5000);
    };
    window.addEventListener("setuai_api_fallback", handleFallback);
    return () => window.removeEventListener("setuai_api_fallback", handleFallback);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Seed sample conversations on load and select the first one
  useEffect(() => {
    if (isAuthenticated) {
      chatService.seed();
      const chats = chatService.getAll();
      if (chats.length > 0) {
        setActiveChatId(chats[0].id);
      } else {
        // If somehow there are no chats, create a new default one
        const newChat = chatService.create(t("dashboard.newChatBtn"));
        setActiveChatId(newChat.id);
      }
    }
  }, [isAuthenticated]);

  // Sync messages when active chat changes
  useEffect(() => {
    if (activeChatId) {
      loadMessages(activeChatId);
    }
  }, [activeChatId, loadMessages]);

  // Scroll to bottom when messages or typing status changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!activeChatId) {
      // Create new conversation first if none active
      const newChat = chatService.create(text.slice(0, 30));
      setActiveChatId(newChat.id);
      sendMessage(text, newChat.id, language);
    } else {
      sendMessage(text, activeChatId, language);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 dark:border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading SetuAI...</p>
        </div>
      </div>
    );
  }

  const activeChat = activeChatId ? chatService.getById(activeChatId) : null;
  const userType = user ? user.type : "general";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-all duration-300">
      {/* Sidebar Panel */}
      <Sidebar
        activeId={activeChatId}
        onSelectChat={setActiveChatId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Workspace */}
      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        {/* Top Navbar */}
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable Message List / Welcome Screen */}
        <div className="flex-1 overflow-y-auto px-4 md:px-0 py-4 scrollbar-thin">
          {messages.length === 0 ? (
            /* Welcome / Initial Screen inside the chat pane */
            <div className="max-w-4xl mx-auto py-10 md:py-16 text-center space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500/10 to-teal-600/10 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-inner relative animate-pulse-slow">
                  <Sparkles className="w-10 h-10" />
                </div>
                
                <div className="space-y-2 px-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {t("dashboard.welcome")}, {user?.name || t("dashboard.guestUser")}!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                    {t("dashboard.welcomeDesc")}
                  </p>
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {t("dashboard.selectTopic")}
                </p>
                <SuggestionChips
                  language={language}
                  userType={userType}
                  onChipClick={handleSendMessage}
                />
              </div>
            </div>
          ) : (
            /* Active Message List */
            <div className="max-w-4xl mx-auto divide-y divide-slate-100/50 dark:divide-slate-800/30">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Typing Indicator */}
              {isTyping && <TypingIndicator />}

              {/* Error State */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl my-4 text-rose-700 dark:text-rose-400 text-sm max-w-4xl mx-auto">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              {/* Anchor for Auto-Scroll */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Box Area */}
        <div className="border-t border-slate-100/80 dark:border-slate-800/30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-4 py-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSend={handleSendMessage}
              isDisabled={isTyping}
            />
          </div>
        </div>
      </div>

      {/* Fallback Toast Warning */}
      {apiWarning && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-amber-600 dark:bg-amber-500 text-white text-xs px-5 py-3 rounded-2xl shadow-xl border border-amber-500 dark:border-amber-400 animate-bounce flex items-center gap-2.5">
          <AlertCircle className="h-5 w-5 text-white flex-shrink-0" />
          <span>{t("dashboard.apiFallbackWarning")}</span>
        </div>
      )}
    </div>
  );
};
