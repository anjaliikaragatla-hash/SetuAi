import { useState, useCallback, useRef } from "react";
import { getMockResponse } from "../services/mockAI";
import { chatService } from "../services/chatService";

export const useChat = (conversationId, language) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(false);

  const loadMessages = useCallback((convId) => {
    if (!convId) { setMessages([]); return; }
    const conv = chatService.getById(convId);
    setMessages(conv ? conv.messages : []);
  }, []);

  const sendMessage = useCallback(async (text, convId, currentLang) => {
    if (!text.trim() || isTyping) return;
    setError(null);
    abortRef.current = false;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    chatService.addMessage(convId, userMsg);
    setIsTyping(true);

    try {
      const response = await getMockResponse(text, currentLang);
      if (abortRef.current) return;

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        timestamp: new Date().toISOString(),
        ...response
      };

      setMessages((prev) => [...prev, aiMsg]);
      chatService.addMessage(convId, aiMsg);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
    } finally {
      if (!abortRef.current) setIsTyping(false);
    }
  }, [isTyping]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsTyping(false);
    abortRef.current = true;
  }, []);

  return { messages, isTyping, error, loadMessages, sendMessage, clearMessages };
};
