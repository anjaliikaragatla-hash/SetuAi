import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, MessageSquare, Trash2, Settings, User, LogOut, X, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { chatService } from "../../services/chatService";

export const Sidebar = ({ activeId, onSelectChat, isOpen, onClose }) => {
  const { t } = useLanguage();
  const { logout, isGuest, user } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");

  // Seed sample conversations on load if empty, then fetch conversations
  useEffect(() => {
    chatService.seed();
    refreshChats();
  }, []);

  const refreshChats = () => {
    setConversations(chatService.getAll());
  };

  // Re-fetch when sidebar opens or activeId changes (so we see updated titles, etc.)
  useEffect(() => {
    refreshChats();
  }, [activeId, isOpen]);

  const handleNewChat = () => {
    const newConv = chatService.create(t("dashboard.newChatBtn"));
    refreshChats();
    onSelectChat(newConv.id);
    if (onClose) onClose();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm(t("dashboard.clearHistoryDesc"))) {
      chatService.delete(id);
      refreshChats();
      if (activeId === id) {
        // If we deleted the active chat, select the next available or null
        const remaining = chatService.getAll();
        if (remaining.length > 0) {
          onSelectChat(remaining[0].id);
        } else {
          onSelectChat(null);
        }
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm(t("dashboard.clearHistoryDesc"))) {
      chatService.clearAll();
      setConversations([]);
      onSelectChat(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800">
      {/* Header (Brand name on desktop, X button on mobile) */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg text-white">SetuAI</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Action Button: New Chat */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-semibold shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          {t("dashboard.newChatBtn")}
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 mb-4">
        <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-400 focus-within:border-slate-500 focus-within:text-slate-200 transition">
          <Search className="h-4 w-4 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("dashboard.searchChats")}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-200 placeholder-slate-500 focus:ring-0"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin">
        {filteredConversations.length === 0 ? (
          <p className="text-center text-xs text-slate-500 py-8 px-4">
            {t("dashboard.noChats")}
          </p>
        ) : (
          filteredConversations.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                onSelectChat(c.id);
                if (onClose) onClose();
              }}
              className={`group flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition ${
                activeId === c.id
                  ? "bg-slate-800 text-white border-l-4 border-emerald-500 pl-2"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <MessageSquare className={`h-4 w-4 flex-shrink-0 ${activeId === c.id ? "text-emerald-400" : "text-slate-500"}`} />
                <span className="text-xs font-medium truncate max-w-[150px] md:max-w-[170px]">
                  {c.title === "New Chat" || c.title === "नई बातचीत"
                    ? t("dashboard.newChatBtn")
                    : c.title}
                </span>
              </div>
              <button
                onClick={(e) => handleDelete(e, c.id)}
                className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-1 rounded transition flex-shrink-0 cursor-pointer"
                title="Delete Chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Bottom Actions Section */}
      <div className="p-4 border-t border-slate-800 space-y-1">
        {conversations.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            {t("dashboard.clearAllChats")}
          </button>
        )}

        <Link
          to="/profile"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl transition"
        >
          <User className="h-4 w-4" />
          {t("dashboard.profileLink")}
        </Link>

        <Link
          to="/settings"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl transition"
        >
          <Settings className="h-4 w-4" />
          {t("dashboard.settingsLink")}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-rose-500 hover:bg-rose-950/10 rounded-xl transition cursor-pointer text-left"
        >
          <LogOut className="h-4 w-4" />
          {t("dashboard.logoutLink")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer content */}
          <div className="relative w-64 max-w-xs h-full bg-slate-900 shadow-xl animate-slide-in-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
