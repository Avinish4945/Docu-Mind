import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Plus,
  Send,
  Paperclip,
  FileText,
  User,
  MoreHorizontal,
  Sparkles,
  Loader2,
} from "lucide-react";

import { axiosInstance } from "../../../../app/axios/AxiosInstance";

const Chat = () => {
  // ================================
  // CHAT STATE
  // ================================

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your document assistant. Ask me anything about your uploaded documents, deadlines, obligations, requirements, or any general question.",
      sources: [],
    },
  ]);

  // Backend ChatSession ID
  const [sessionId, setSessionId] = useState(null);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ================================
  // AUTO SCROLL
  // ================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ================================
  // ASK QUESTION
  // ================================

  const askQuestion = async (question) => {
    try {
      const response = await axiosInstance.post("/api/chat/ask", {
        question,
        sessionId,
      });

      return response.data;
    } catch (error) {
      console.error("Chat error:", error);

      throw error;
    }
  };

  // ================================
  // SEND MESSAGE
  // ================================

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // Clear input immediately
    setMessage("");

    // Add user message to UI
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
      sources: [],
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const data = await askQuestion(trimmedMessage);

      // Save backend session ID
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Add AI response
      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content:
          data.answer ||
          "I couldn't generate an answer.",
        sources: data.sources || [],
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (error) {
      const errorMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content:
          error?.response?.data?.message ||
          "Something went wrong while getting the answer. Please try again.",
        sources: [],
        error: true,
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {
      setLoading(false);
    }
  };

  // ================================
  // ENTER KEY
  // ================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ================================
  // NEW CHAT
  // ================================

  const handleNewChat = () => {
    setSessionId(null);

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Hello! I'm your document assistant. Ask me anything about your uploaded documents or ask a general question.",
        sources: [],
      },
    ]);

    setMessage("");
  };

  // ================================
  // CONVERSATIONS
  // ================================

  const conversations = [
    "Procurement deadline",
    "Document summary",
    "Compliance requirements",
    "Tender obligations",
  ];

  return (
    <div className="h-[calc(100vh-70px)] bg-slate-50 flex">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col">

        {/* Sidebar Header */}

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                AI Assistant
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Document conversations
              </p>
            </div>

            <button
              onClick={handleNewChat}
              className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              title="New chat"
            >
              <Plus size={18} />
            </button>

          </div>

          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Plus size={16} />
            New Conversation
          </button>

        </div>

        {/* Conversations */}

        <div className="flex-1 overflow-y-auto p-3">

          <p className="text-xs font-medium text-slate-400 uppercase px-2 mb-2">
            Recent conversations
          </p>

          <div className="space-y-1">

            {conversations.map((conversation, index) => (

              <button
                key={index}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm transition flex items-center gap-3 ${
                  index === 0
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >

                <FileText size={16} />

                <span className="truncate flex-1">
                  {conversation}
                </span>

                {index === 0 && (
                  <MoreHorizontal size={16} />
                )}

              </button>

            ))}

          </div>

        </div>

        {/* User */}

        <div className="p-4 border-t border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">

              <User
                size={17}
                className="text-indigo-600"
              />

            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-medium text-slate-800">
                User
              </p>

              <p className="text-xs text-slate-500 truncate">
                Document Assistant
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN CHAT
      ===================================================== */}

      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}

        <header className="h-[72px] bg-white border-b border-slate-200 px-7 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">

              <Bot
                size={21}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="font-semibold text-slate-900">
                Document AI Assistant
              </h1>

              <div className="flex items-center gap-2 mt-0.5">

                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                <span className="text-xs text-slate-500">
                  {loading
                    ? "Thinking..."
                    : "Ready to answer questions"}
                </span>

              </div>

            </div>

          </div>

          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <MoreHorizontal size={20} />
          </button>

        </header>

        {/* =====================================================
            MESSAGES
        ===================================================== */}

        <section className="flex-1 overflow-y-auto">

          <div className="max-w-4xl mx-auto px-6 py-8 space-y-7">

            {messages.map((msg) => {

              const isUser = msg.role === "user";

              return (

                <div
                  key={msg.id}
                  className={`flex gap-4 ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* AI Avatar */}

                  {!isUser && (

                    <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">

                      <Bot
                        size={18}
                        className="text-indigo-600"
                      />

                    </div>

                  )}

                  <div
                    className={`max-w-[75%] ${
                      isUser
                        ? "order-first"
                        : ""
                    }`}
                  >

                    {/* Message */}

                    <div
                      className={`px-5 py-3.5 rounded-2xl text-sm leading-6 whitespace-pre-wrap ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-br-md"
                          : msg.error
                          ? "bg-red-50 border border-red-200 text-red-700 rounded-bl-md"
                          : "bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Sources */}

                    {!isUser &&
                      msg.sources &&
                      msg.sources.length > 0 && (

                        <div className="mt-3">

                          <p className="text-xs font-medium text-slate-400 mb-2">
                            Sources
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {msg.sources.map(
                              (source, sourceIndex) => (

                                <div
                                  key={
                                    sourceIndex
                                  }
                                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-600"
                                >

                                  <FileText
                                    size={14}
                                    className="text-indigo-500"
                                  />

                                  {source.documentTitle ||
                                    source.originalName ||
                                    "Document"}

                                </div>

                              )
                            )}

                          </div>

                        </div>

                      )}

                  </div>

                  {/* User Avatar */}

                  {isUser && (

                    <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">

                      <User
                        size={18}
                        className="text-slate-600"
                      />

                    </div>

                  )}

                </div>

              );
            })}

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

              <div className="flex gap-4">

                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">

                  <Bot
                    size={18}
                    className="text-indigo-600"
                  />

                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-bl-md px-5 py-4">

                  <div className="flex items-center gap-2">

                    <Loader2
                      size={16}
                      className="animate-spin text-indigo-500"
                    />

                    <span className="text-sm text-slate-500">
                      Thinking...
                    </span>

                  </div>

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

        </section>

        {/* =====================================================
            INPUT
        ===================================================== */}

        <div className="bg-white border-t border-slate-200 p-5">

          <div className="max-w-4xl mx-auto">

            <div className="relative border border-slate-300 rounded-2xl bg-white shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition">

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={loading}
                rows={2}
                placeholder={
                  loading
                    ? "Waiting for response..."
                    : "Ask something about your documents..."
                }
                className="w-full resize-none outline-none px-5 pt-4 pb-12 text-sm text-slate-700 placeholder:text-slate-400 bg-transparent disabled:cursor-not-allowed"
              />

              {/* Attachment */}

              <div className="absolute bottom-3 left-3">

                <button
                  disabled={loading}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition disabled:opacity-40"
                  title="Attach document"
                >
                  <Paperclip size={18} />
                </button>

              </div>

              {/* Send */}

              <button
                onClick={handleSend}
                disabled={
                  !message.trim() ||
                  loading
                }
                className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >

                {loading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}

              </button>

            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">

              <Sparkles size={13} />

              <span>
                AI responses are generated from your document knowledge base
              </span>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Chat;