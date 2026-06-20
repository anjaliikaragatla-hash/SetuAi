// services/chatService.js
// All chat data operations. Replace localStorage calls with fetch() for real API.
// TO MIGRATE: swap each function body with an API call e.g. fetch('/api/conversations')

const STORAGE_KEY = "setuai_conversations";

export const chatService = {
  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  },

  getById: (id) => {
    const all = chatService.getAll();
    return all.find((c) => c.id === id) || null;
  },

  create: (title = "New Chat") => {
    const conv = {
      id: `conv-${Date.now()}`,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const all = chatService.getAll();
    all.unshift(conv);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return conv;
  },

  addMessage: (conversationId, message) => {
    const all = chatService.getAll();
    const idx = all.findIndex((c) => c.id === conversationId);
    if (idx === -1) return null;
    all[idx].messages.push(message);
    all[idx].updatedAt = new Date().toISOString();
    // Auto-title from first user message
    if (all[idx].messages.length === 1 && message.sender === "user") {
      all[idx].title = message.text.length > 40 ? message.text.slice(0, 40) + "…" : message.text;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  delete: (id) => {
    const all = chatService.getAll().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  seed: () => {
    // Pre-seed sample conversations for demo
    const samples = [
      { id: "conv-sample-1", title: "PM-KISAN Scheme", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(), messages: [{ id: "m1", sender: "user", text: "Tell me about PM-KISAN scheme", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() }] },
      { id: "conv-sample-2", title: "Scholarship Help", createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(), messages: [{ id: "m2", sender: "user", text: "What scholarships are available for students?", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() }] },
      { id: "conv-sample-3", title: "Ayushman Bharat", createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(), messages: [{ id: "m3", sender: "user", text: "How can I get free medical treatment?", timestamp: new Date(Date.now() - 86400000 * 4).toISOString() }] },
      { id: "conv-sample-4", title: "Pension Assistance", createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(), messages: [] },
      { id: "conv-sample-5", title: "Women's Welfare", createdAt: new Date(Date.now() - 86400000 * 6).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(), messages: [] },
      { id: "conv-sample-6", title: "Farming Support", createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(), messages: [] }
    ];
    if (chatService.getAll().length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    }
  }
};
