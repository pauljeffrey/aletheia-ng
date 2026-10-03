"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, CircleHelp, PanelLeftOpen, SlidersHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CAPABLE_SLIDERS,
  DEFAULT_CAPABLE_CONFIG,
  DEFAULT_MODEL_ID,
  DEFAULT_TASK_MODEL_ID,
  CHAT_SUGGESTIONS,
  DEFAULT_PRETRAINED_CONFIG,
  DEFAULT_TASK,
  LANGUAGES,
  PRETRAINED_SLIDERS,
  SUGGESTIONS,
  effectiveTask,
  getBehavior,
  getModel,
  taskNeedsLanguage,
  wrapInput,
  type CapableConfig,
  type PretrainedConfig,
  type Suggestion,
} from "./models";
import { uid, type ChatMessage, type ChatSession } from "./types";
import { Sidebar } from "./Sidebar";
import { ModelPicker } from "./ModelPicker";
import { Composer } from "./Composer";
import { MessageView, ThinkingIndicator } from "./MessageView";
import { SettingsPanel } from "./SettingsPanel";
import { GuideDialog } from "./GuideDialog";
import { readEventStream } from "./stream";

const SESSIONS_KEY = "sabiyarn.sessions.v1";
// v3: chat model default and top-k/nucleus sampling defaults
const PREFS_KEY = "sabiyarn.prefs.v3";

interface Prefs {
  modelId: string;
  pretrained: PretrainedConfig;
  capable: CapableConfig;
}

const readStorage = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable */
  }
};

const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

function IconButton({
  label,
  onClick,
  active,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "p-2 rounded-lg transition-colors",
        active ? "text-text-white bg-white/[0.08]" : "text-text-medium hover:text-text-white hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function ChatWorkspace() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
  const [task, setTask] = useState(DEFAULT_TASK);
  const [language, setLanguage] = useState<string | null>(null);
  const [directionId, setDirectionId] = useState("");
  const [pretrainedConfig, setPretrainedConfig] = useState(DEFAULT_PRETRAINED_CONFIG);
  const [capableConfig, setCapableConfig] = useState(DEFAULT_CAPABLE_CONFIG);

  const [input, setInput] = useState("");
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const [animateId, setAnimateId] = useState<string | null>(null);
  const [streamingId, setStreamingId] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  const model = getModel(modelId);
  const behavior = getBehavior(modelId);
  const appliedTask = effectiveTask(modelId, task);
  const activeSession = sessions.find((s) => s.id === activeId) ?? null;
  const busy = pendingSessionId !== null;
  const showThread = !!activeSession && (activeSession.messages.length > 0 || pendingSessionId === activeSession.id);

  // ---- persistence ------------------------------------------------------
  useEffect(() => {
    const storedSessions = readStorage<ChatSession[]>(SESSIONS_KEY);
    if (Array.isArray(storedSessions)) setSessions(storedSessions);
    const prefs = readStorage<Partial<Prefs>>(PREFS_KEY);
    if (prefs?.modelId && getModel(prefs.modelId).id === prefs.modelId && getModel(prefs.modelId).available) {
      setModelId(prefs.modelId);
    }
    if (prefs?.pretrained) setPretrainedConfig({ ...DEFAULT_PRETRAINED_CONFIG, ...prefs.pretrained });
    if (prefs?.capable) setCapableConfig({ ...DEFAULT_CAPABLE_CONFIG, ...prefs.capable });
    setSidebarOpen(isDesktop());
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Skip writes on every streamed token; the finished message is saved once streaming ends.
    if (hydrated && !streamingId) writeStorage(SESSIONS_KEY, sessions);
  }, [sessions, hydrated, streamingId]);

  useEffect(() => {
    if (hydrated) writeStorage(PREFS_KEY, { modelId, pretrained: pretrainedConfig, capable: capableConfig });
  }, [modelId, pretrainedConfig, capableConfig, hydrated]);

  // ---- scrolling --------------------------------------------------------
  const scrollToBottom = useCallback((smooth = false) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useLayoutEffect(() => {
    stickRef.current = true;
    setAtBottom(true);
    scrollToBottom();
  }, [activeId, scrollToBottom]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const ro = new ResizeObserver(() => {
      if (stickRef.current) scrollToBottom();
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [showThread, scrollToBottom]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    stickRef.current = near;
    setAtBottom(near);
  };

  // ---- session helpers --------------------------------------------------
  const newChat = useCallback(() => {
    setActiveId(null);
    setInput("");
    setMobileNavOpen(false);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        newChat();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [newChat]);

  const appendMessage = (sessionId: string, message: ChatMessage, title?: string) =>
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, title: title ?? s.title, messages: [...s.messages, message], updatedAt: Date.now() }
          : s
      )
    );

  const updateMessage = (sessionId: string, messageId: string, patch: Partial<ChatMessage>) =>
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, messages: s.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m)) }
          : s
      )
    );

  const deleteSession = (id: string) => {
    if (pendingSessionId === id) abortRef.current?.abort();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const selectSession = (id: string) => {
    setActiveId(id);
    setMobileNavOpen(false);
  };

  const toggleSidebar = () => (isDesktop() ? setSidebarOpen((v) => !v) : setMobileNavOpen((v) => !v));

  // ---- generation -------------------------------------------------------
  const runGeneration = async (sessionId: string, history: ChatMessage[], userMsg: ChatMessage, isFirst: boolean) => {
    const target = getModel(userMsg.modelId ?? modelId);
    const controller = new AbortController();
    abortRef.current = controller;
    setPendingSessionId(sessionId);
    const started = performance.now();

    try {
      const res =
        target.family === "capable"
          ? await fetch("/api/models/capable", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
              body: JSON.stringify({
                model: target.id,
                messages: history.filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
                sessionId,
                config: capableConfig,
                stream: true,
              }),
            })
          : await fetch("/api/models/pretrained", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
              body: JSON.stringify({
                model: target.id,
                prompt: userMsg.prompt ?? userMsg.content,
                config: { ...pretrainedConfig, earlyStopping: true, eosTokenId: 32 },
                stream: true,
              }),
            });

      if (res.ok && res.body && res.headers.get("content-type")?.includes("text/event-stream")) {
        await streamReply(res.body, sessionId, userMsg, target.id, started);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.details || data.error || `Request failed (${res.status})`);

      const reply: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: data.output || "No response generated",
        createdAt: Date.now(),
        modelId: target.id,
        task: userMsg.task,
        latencyMs: Math.round(performance.now() - started),
      };
      setAnimateId(reply.id);
      appendMessage(sessionId, reply, isFirst && data.sessionName && data.sessionName !== "New Chat" ? data.sessionName : undefined);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      appendMessage(sessionId, {
        id: uid(),
        role: "assistant",
        content: `Something went wrong: ${(error as Error).message}. Please try again.`,
        createdAt: Date.now(),
        modelId: target.id,
        error: true,
      });
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setPendingSessionId(null);
    }
  };

  /** Renders tokens as they arrive, batching state updates to one per animation frame. */
  const streamReply = async (
    body: ReadableStream<Uint8Array>,
    sessionId: string,
    userMsg: ChatMessage,
    targetId: string,
    started: number
  ) => {
    const replyId = uid();
    let text = "";
    let created = false;
    let frame = 0;

    const flush = () => {
      frame = 0;
      if (!created) {
        if (!text) return;
        created = true;
        setStreamingId(replyId);
        appendMessage(sessionId, {
          id: replyId,
          role: "assistant",
          content: text,
          createdAt: Date.now(),
          modelId: targetId,
          task: userMsg.task,
        });
      } else {
        updateMessage(sessionId, replyId, { content: text });
      }
    };

    try {
      await readEventStream(body, (event) => {
        if (event.type === "error") throw new Error(event.message);
        if (event.type === "delta") text += event.text;
        if (event.type === "done" && event.output) text = event.output;
        if (!frame) frame = requestAnimationFrame(flush);
      });
      if (!text) text = "No response generated";
    } finally {
      // Keep whatever arrived, including partial output after Stop or a dropped connection.
      cancelAnimationFrame(frame);
      flush();
      if (created) updateMessage(sessionId, replyId, { latencyMs: Math.round(performance.now() - started) });
      setStreamingId(null);
    }
  };

  const needsLanguage = behavior.showLanguageSelector && taskNeedsLanguage(appliedTask);
  const blockReason = !model.available
    ? `${model.name} isn’t available yet.`
    : needsLanguage && !language
    ? `Choose a language for ${appliedTask.toLowerCase()}.`
    : null;

  const taskLabel = () => {
    if (behavior.rawInput) return undefined;
    const direction = behavior.translationDirections?.find((d) => d.id === directionId) ?? behavior.translationDirections?.[0];
    if (direction) return `Translation ${direction.label}`;
    if (needsLanguage && language) return `${appliedTask} · ${language}`;
    return appliedTask;
  };

  const submit = () => {
    const text = input.trim();
    if (!text || busy || blockReason) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: Date.now(),
      modelId,
      task: taskLabel(),
      prompt: model.family === "pretrained" ? wrapInput(text, modelId, task, language, directionId) : undefined,
    };

    let sessionId = activeSession?.id;
    let history: ChatMessage[];
    const isFirst = !activeSession || activeSession.messages.length === 0;

    if (!sessionId) {
      const now = Date.now();
      const session: ChatSession = {
        id: uid(),
        title: text.length > 48 ? `${text.slice(0, 48).trimEnd()}…` : text,
        messages: [userMsg],
        createdAt: now,
        updatedAt: now,
      };
      sessionId = session.id;
      history = [userMsg];
      setSessions((prev) => [session, ...prev]);
      setActiveId(session.id);
    } else {
      history = [...activeSession!.messages, userMsg];
      appendMessage(sessionId, userMsg);
    }

    setInput("");
    stickRef.current = true;
    runGeneration(sessionId, history, userMsg, isFirst);
  };

  const regenerate = (assistantId: string) => {
    if (!activeSession || busy) return;
    const idx = activeSession.messages.findIndex((m) => m.id === assistantId);
    const userMsg = activeSession.messages[idx - 1];
    if (idx < 1 || userMsg?.role !== "user") return;
    const history = activeSession.messages.slice(0, idx);
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSession.id ? { ...s, messages: history, updatedAt: Date.now() } : s))
    );
    stickRef.current = true;
    runGeneration(activeSession.id, history, userMsg, false);
  };

  const applySuggestion = (s: Suggestion) => {
    if (s.task) {
      const b = getBehavior(modelId);
      if (!b.showTaskSelector && effectiveTask(modelId, s.task) !== s.task) changeModel(DEFAULT_TASK_MODEL_ID);
      setTask(s.task);
    }
    if (s.language) setLanguage(s.language);
    setInput(s.text);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const changeModel = (id: string) => {
    setModelId(id);
    setDirectionId(getBehavior(id).translationDirections?.[0]?.id ?? "");
  };

  // ---- render -----------------------------------------------------------
  const composer = (
    <Composer
      textareaRef={textareaRef}
      value={input}
      onChange={setInput}
      onSubmit={submit}
      onStop={() => abortRef.current?.abort()}
      busy={busy}
      modelId={modelId}
      task={task}
      onTaskChange={setTask}
      language={language}
      onLanguageChange={setLanguage}
      directionId={directionId}
      onDirectionChange={setDirectionId}
      blockReason={blockReason}
      placeholder={`Message ${model.name}…`}
    />
  );

  const footnote = (
    <p className={cn("text-center text-[11px] mt-2.5 px-2", blockReason && input.trim() ? "text-amber-300/90" : "text-text-medium")}>
      {blockReason && input.trim()
        ? blockReason
        : model.family === "pretrained"
        ? "Pretrained models don’t remember context — each message is processed on its own. SabiYarn can make mistakes."
        : "SabiYarn can make mistakes. Check important information."}
    </p>
  );

  const sidebar = (
    <Sidebar
      sessions={sessions}
      activeId={activeId}
      onSelect={selectSession}
      onNew={newChat}
      onDelete={deleteSession}
      onClose={() => (isDesktop() ? setSidebarOpen(false) : setMobileNavOpen(false))}
      onOpenGuide={() => {
        setMobileNavOpen(false);
        setGuideOpen(true);
      }}
    />
  );

  const settings =
    model.family === "capable" ? (
      <SettingsPanel
        modelName={model.name}
        repo={model.repo}
        contextual
        config={capableConfig}
        sliders={CAPABLE_SLIDERS}
        onChange={setCapableConfig}
        onReset={() => setCapableConfig(DEFAULT_CAPABLE_CONFIG)}
        onClose={() => setSettingsOpen(false)}
      />
    ) : (
      <SettingsPanel
        modelName={model.name}
        repo={model.repo}
        contextual={false}
        config={pretrainedConfig}
        sliders={PRETRAINED_SLIDERS}
        onChange={setPretrainedConfig}
        onReset={() => setPretrainedConfig(DEFAULT_PRETRAINED_CONFIG)}
        onClose={() => setSettingsOpen(false)}
      />
    );

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-bg-dark text-text-white">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:block shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
          sidebarOpen ? "w-[272px]" : "w-0"
        )}
      >
        {sidebar}
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-[60]">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 max-w-[85vw]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {sidebar}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="relative flex-1 min-w-0 flex flex-col">
        <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] max-w-full rounded-full bg-primary-green/[0.12] blur-[120px]"
          aria-hidden
        />

        {/* Top bar */}
        <header className="relative z-20 flex items-center gap-1 h-14 px-2 sm:px-3 shrink-0">
          <IconButton label="Open sidebar" onClick={toggleSidebar} className={cn(sidebarOpen && "md:hidden")}>
            <PanelLeftOpen className="h-[18px] w-[18px]" />
          </IconButton>
          <IconButton label="New chat" onClick={newChat} className={cn(sidebarOpen && "md:hidden")}>
            <SquarePen className="h-[18px] w-[18px]" />
          </IconButton>
          <ModelPicker value={modelId} onChange={changeModel} />
          <div className="ml-auto flex items-center gap-1">
            <IconButton label="How to use" onClick={() => setGuideOpen(true)}>
              <CircleHelp className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton label="Run settings" onClick={() => setSettingsOpen((v) => !v)} active={settingsOpen}>
              <SlidersHorizontal className="h-[18px] w-[18px]" />
            </IconButton>
          </div>
        </header>

        {showThread ? (
          <>
            <div ref={scrollRef} onScroll={onScroll} className="relative z-10 flex-1 overflow-y-auto scrollbar-thin">
              <div ref={contentRef} className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-6 pb-10 space-y-8">
                {activeSession!.messages.map((m, i, arr) => (
                  <MessageView
                    key={m.id}
                    message={m}
                    animate={m.id === animateId}
                    streaming={m.id === streamingId}
                    onAnimationDone={() => setAnimateId(null)}
                    onRegenerate={
                      m.role === "assistant" && i === arr.length - 1 && !busy ? () => regenerate(m.id) : undefined
                    }
                  />
                ))}
                {pendingSessionId === activeSession!.id && !streamingId && <ThinkingIndicator modelName={model.name} />}
              </div>
            </div>

            <div className="relative z-10 shrink-0 px-3 sm:px-6 pb-3 sm:pb-4">
              <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-bg-dark to-transparent" />
              <AnimatePresence>
                {!atBottom && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    onClick={() => scrollToBottom(true)}
                    aria-label="Scroll to bottom"
                    className="absolute left-1/2 -top-12 -translate-x-1/2 grid place-items-center h-8 w-8 rounded-full border border-border bg-bg-card text-text-light hover:text-text-white shadow-elevated"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
              <div className="mx-auto w-full max-w-3xl">
                {composer}
                {footnote}
              </div>
            </div>
          </>
        ) : (
          <div className="relative z-10 flex-1 overflow-y-auto scrollbar-thin">
            <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-4 sm:px-6 py-10">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-8"
              >
                <div className="relative mx-auto mb-6 h-14 w-14">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-green to-primary-blue blur-xl opacity-60 animate-pulse" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-green to-primary-blue ring-1 ring-white/20">
                    <span className="font-display text-2xl text-white">S</span>
                  </div>
                </div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-text-medium">
                  SabiYarn · Nigerian language models
                </div>
                <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-text-white">
                  How far? <span className="bg-gradient-to-r from-accent-green via-accent-blue to-cyan bg-clip-text text-transparent">What shall we build?</span>
                </h1>
              </motion.div>

              {composer}
              {footnote}

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {(model.family === "capable" ? CHAT_SUGGESTIONS : SUGGESTIONS).map((s, i) => (
                  <motion.button
                    key={s.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    onClick={() => applySuggestion(s)}
                    className="group text-left rounded-2xl border border-border-subtle bg-bg-card/50 px-4 py-3 hover:border-primary-green/40 hover:bg-bg-card transition-colors"
                  >
                    <div className="text-sm font-medium text-text-glow group-hover:text-text-white">{s.title}</div>
                    <div className="text-xs text-text-medium truncate mt-0.5">{s.subtitle}</div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-medium/80">
                {LANGUAGES.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Settings: inline panel on large screens, drawer below */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
          settingsOpen ? "w-[320px]" : "w-0"
        )}
      >
        {settings}
      </aside>
      <AnimatePresence>
        {settingsOpen && (
          <div className="lg:hidden fixed inset-0 z-[60]">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 right-0 max-w-[90vw]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {settings}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
