"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Plus, X, Loader2, MessageSquare } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: Date;
}

interface CapableModel {
  id: string;
  name: string;
}

const CAPABLE_MODELS: CapableModel[] = [
  // Placeholder for future models
  // { id: "sabiyarn-it", name: "SabiYarn IT" },
  // { id: "sabiyarn-chat", name: "SabiYarn Chat" },
];

export function CapableModelsTab() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sessions, activeSessionId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSessionId]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputText("");
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      const remainingSessions = sessions.filter((s) => s.id !== sessionId);
      setActiveSessionId(remainingSessions.length > 0 ? remainingSessions[0].id : null);
    }
  };

  const getActiveSession = (): ChatSession | undefined => {
    return sessions.find((s) => s.id === activeSessionId);
  };

  const handleSend = async () => {
    if (!selectedModel || !inputText.trim()) {
      alert("Please select a model and enter a message");
      return;
    }

    if (!activeSessionId) {
      createNewSession();
      // Wait for session to be created
      setTimeout(() => handleSendMessage(), 100);
      return;
    }

    handleSendMessage();
  };

  const handleSendMessage = async () => {
    const session = getActiveSession();
    if (!session || !inputText.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    // Add user message to session
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, userMessage] }
          : s
      )
    );

    setInputText("");
    setIsLoading(true);

    try {
      const updatedSession = sessions.find((s) => s.id === activeSessionId);
      const chatHistory = [...(updatedSession?.messages || []), userMessage].map(
        (msg) => ({
          role: msg.role,
          content: msg.content,
        })
      );

      const response = await fetch("/api/models/capable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: chatHistory,
          sessionId: activeSessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || "Failed to generate response");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.output || "No response generated",
        timestamp: new Date(),
      };

      // Update session name if this is the first message
      const isFirstMessage = session.messages.length === 0;
      let sessionName = session.name;
      if (isFirstMessage && data.sessionName) {
        sessionName = data.sessionName;
      }

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                name: sessionName,
                messages: [...s.messages, userMessage, assistantMessage],
              }
            : s
        )
      );
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: error instanceof Error
          ? `Sorry, there was an error: ${error.message}. Please try again.`
          : "Sorry, there was an error generating a response. Please try again.",
        timestamp: new Date(),
      };
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, userMessage, errorMessage] }
            : s
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const activeSession = getActiveSession();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 border-r border-primary-green/30 bg-bg-card flex flex-col">
        <div className="p-5 border-b border-primary-green/30">
          <button
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-hover text-white rounded-xl hover:shadow-glow transition-all font-semibold hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="p-5 border-b border-primary-green/30">
          <label className="block text-sm font-semibold text-primary-green mb-2">
            Select Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50 text-sm"
          >
            <option value="">Select a model...</option>
            {CAPABLE_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
            {CAPABLE_MODELS.length === 0 && (
              <option value="" disabled>
                Models coming soon...
              </option>
            )}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  activeSessionId === session.id
                    ? "bg-gradient-hover text-white shadow-glow"
                    : "hover:bg-bg-dark-secondary text-text-light hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate font-medium">{session.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  className={`opacity-0 group-hover:opacity-100 transition-all hover:scale-110 ${
                    activeSessionId === session.id ? "text-white" : "text-text-medium"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-bg-dark">
        {!activeSession ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-lg">
              <Bot className="w-20 h-20 text-primary-green mx-auto mb-6 opacity-60 animate-pulse-slow" />
              <h3 className="text-2xl font-bold gradient-text mb-3">
                Start a New Conversation
              </h3>
              <p className="text-text-light text-lg mb-8">
                Select a model and create a new chat session to begin interacting with our newer, more capable AI models.
              </p>
              <button
                onClick={createNewSession}
                className="btn btn-primary"
              >
                New Chat
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {activeSession.messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-lg">
                    <Bot className="w-20 h-20 text-primary-green mx-auto mb-6 opacity-60 animate-pulse-slow" />
                    <h3 className="text-2xl font-bold gradient-text mb-3">
                      {activeSession.name}
                    </h3>
                    <p className="text-text-light text-lg">
                      Start a conversation by typing a message below.
                    </p>
                  </div>
                </div>
              )}

              {activeSession.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-scale-in`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-full bg-gradient-hover flex items-center justify-center flex-shrink-0 shadow-glow">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-xl px-5 py-3 shadow-lg ${
                      message.role === "user"
                        ? "bg-gradient-hover text-white"
                        : "bg-bg-card text-text-white border border-primary-green/30"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center flex-shrink-0 shadow-glow">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-hover flex items-center justify-center shadow-glow">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-bg-card rounded-xl px-5 py-3 border border-primary-green/30 shadow-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-green" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-primary-green/30 p-5 bg-bg-card backdrop-blur-sm">
              <div className="max-w-5xl mx-auto">
                <div className="flex gap-3">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Message..."
                    className="flex-1 px-5 py-3 border border-primary-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green resize-none bg-bg-dark-secondary text-text-white shadow-sm hover:border-primary-green/50 transition-all"
                    rows={1}
                    style={{ minHeight: "52px", maxHeight: "200px" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !selectedModel || !inputText.trim()}
                    className="px-8 py-3 bg-gradient-hover text-white rounded-xl hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold hover:scale-105 active:scale-95"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-text-light mt-3 text-center">
                  Newer, more capable models can remember conversation context. These models will be available in the next 3 months.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

