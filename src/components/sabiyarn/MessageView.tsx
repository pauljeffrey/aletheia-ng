"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getModel } from "./models";
import type { ChatMessage } from "./types";

export function AssistantAvatar({ pulse }: { pulse?: boolean }) {
  return (
    <div className="relative shrink-0 mt-0.5">
      {pulse && <span className="absolute inset-0 rounded-lg bg-primary-green/60 blur-md animate-pulse" />}
      <div className="relative grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-primary-green to-primary-blue ring-1 ring-white/15">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
    </div>
  );
}

/** Reveals text progressively so non-streaming responses feel live. */
function useTypewriter(text: string, enabled: boolean, onDone?: () => void) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    let raf = 0;
    let shown = 0;
    const step = Math.max(1, Math.ceil(text.length / 90));
    const tick = () => {
      shown = Math.min(text.length, shown + step);
      setCount(shown);
      if (shown < text.length) raf = requestAnimationFrame(tick);
      else onDone?.();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled]);

  return text.slice(0, count);
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="p-1.5 rounded-md text-text-medium hover:text-text-white hover:bg-white/[0.06] transition-colors"
    >
      {children}
    </button>
  );
}

interface MessageViewProps {
  message: ChatMessage;
  animate?: boolean;
  onAnimationDone?: () => void;
  onRegenerate?: () => void;
}

export function MessageView({ message, animate, onAnimationDone, onRegenerate }: MessageViewProps) {
  const [copied, setCopied] = useState(false);
  const shown = useTypewriter(message.content, !!animate && message.role === "assistant", onAnimationDone);
  const typing = shown.length < message.content.length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="group flex flex-col items-end"
      >
        <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl rounded-br-lg bg-white/[0.07] border border-border-subtle px-4 py-2.5 text-[15px] leading-relaxed text-text-white whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {message.prompt && message.prompt !== message.content && (
            <span className="font-mono text-[10px] text-text-medium truncate max-w-[60vw]" title={message.prompt}>
              {message.prompt}
            </span>
          )}
          <IconButton label={copied ? "Copied" : "Copy"} onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </IconButton>
        </div>
      </motion.div>
    );
  }

  const model = message.modelId ? getModel(message.modelId) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group flex gap-4"
    >
      <AssistantAvatar />
      <div className="flex-1 min-w-0">
        {message.error ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/[0.07] px-4 py-3 text-sm text-red-200">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
            <span className="whitespace-pre-wrap">{message.content}</span>
          </div>
        ) : (
          <div className="text-[15px] leading-7 text-text-glow whitespace-pre-wrap break-words">
            {shown}
            {typing && <span className="inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-accent-green animate-pulse rounded-sm" />}
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-1 mt-2 -ml-1.5 transition-opacity",
            typing ? "opacity-0" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
          )}
        >
          {!message.error && (
            <IconButton label={copied ? "Copied" : "Copy"} onClick={copy}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </IconButton>
          )}
          {onRegenerate && (
            <IconButton label="Regenerate" onClick={onRegenerate}>
              <RotateCcw className="h-3.5 w-3.5" />
            </IconButton>
          )}
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-text-medium truncate">
            {[model?.name, message.task, message.latencyMs != null && `${(message.latencyMs / 1000).toFixed(1)}s`]
              .filter(Boolean)
              .join("  ·  ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ThinkingIndicator({ modelName }: { modelName: string }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
      <AssistantAvatar pulse />
      <div className="flex items-center gap-3 pt-1">
        <span className="text-shimmer text-[15px] font-medium">Generating with {modelName}</span>
        <span className="font-mono text-[11px] text-text-medium tabular-nums">{(elapsed / 1000).toFixed(1)}s</span>
      </div>
    </motion.div>
  );
}
