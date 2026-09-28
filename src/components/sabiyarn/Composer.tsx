"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { ArrowUp, Check, ChevronDown, FileCode2, Globe, Languages, Lock, Square, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, TASKS, effectiveTask, getBehavior, taskNeedsLanguage } from "./models";
import { MenuItem, MenuLabel, Popover } from "./Popover";

interface ComposerProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  busy: boolean;
  modelId: string;
  task: string;
  onTaskChange: (t: string) => void;
  language: string | null;
  onLanguageChange: (l: string) => void;
  directionId: string;
  onDirectionChange: (d: string) => void;
  blockReason: string | null;
  placeholder?: string;
}

function Chip({
  icon,
  children,
  active,
  warn,
  locked,
  onClick,
}: {
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  warn?: boolean;
  locked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
        warn
          ? "border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/15"
          : locked
          ? "border-border-subtle bg-white/[0.02] text-text-medium cursor-default"
          : active
          ? "border-primary-green/40 bg-primary-green/15 text-text-white"
          : "border-border-subtle bg-white/[0.03] text-text-light hover:text-text-white hover:bg-white/[0.07]"
      )}
    >
      {icon}
      {children}
      {locked ? <Lock className="h-3 w-3 opacity-60" /> : <ChevronDown className="h-3 w-3 opacity-60" />}
    </button>
  );
}

export function Composer({
  textareaRef,
  value,
  onChange,
  onSubmit,
  onStop,
  busy,
  modelId,
  task,
  onTaskChange,
  language,
  onLanguageChange,
  directionId,
  onDirectionChange,
  blockReason,
  placeholder = "Message SabiYarn…",
}: ComposerProps) {
  const [focused, setFocused] = useState(false);
  const behavior = getBehavior(modelId);
  const applied = effectiveTask(modelId, task);
  const needsLanguage = behavior.showLanguageSelector && taskNeedsLanguage(applied);
  const canSend = !busy && !!value.trim() && !blockReason;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
    el.style.overflowY = el.scrollHeight > 240 ? "auto" : "hidden";
  }, [value, textareaRef]);

  const direction = behavior.translationDirections?.find((d) => d.id === directionId) ?? behavior.translationDirections?.[0];

  return (
    <div
      className={cn(
        "rounded-[26px] p-px transition-all duration-300",
        focused
          ? "bg-gradient-to-r from-primary-green/70 via-primary-blue/60 to-primary-green/70 shadow-[0_0_40px_-8px_rgba(99,102,241,0.45)]"
          : "bg-border shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]"
      )}
    >
      <div className="rounded-[25px] bg-bg-card/95 backdrop-blur-xl">
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (canSend) onSubmit();
            }
          }}
          placeholder={placeholder}
          aria-label="Message"
          className="block w-full resize-none bg-transparent px-5 pt-4 pb-2 text-[15px] leading-relaxed text-text-white placeholder:text-text-medium outline-none scrollbar-thin"
        />

        <div className="flex items-end gap-2 px-3 pb-3">
          <div className="flex flex-1 min-w-0 flex-wrap items-center gap-1.5">
            {behavior.showTaskSelector ? (
              <Popover
                side="top"
                className="w-64 max-h-80 overflow-y-auto"
                trigger={({ open, toggle }) => (
                  <Chip icon={<Wand2 className="h-3.5 w-3.5" />} active={open || task !== TASKS[0]} onClick={toggle}>
                    {task}
                  </Chip>
                )}
              >
                {(close) => (
                  <>
                    <MenuLabel>Task</MenuLabel>
                    {TASKS.map((t) => (
                      <MenuItem
                        key={t}
                        selected={t === task}
                        onClick={() => {
                          onTaskChange(t);
                          close();
                        }}
                      >
                        <span className="flex-1">{t}</span>
                        {t === task && <Check className="h-4 w-4 text-accent-green" />}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Popover>
            ) : behavior.rawInput ? (
              <Chip icon={<FileCode2 className="h-3.5 w-3.5" />} locked>
                Raw input
              </Chip>
            ) : applied ? (
              <Chip icon={<Wand2 className="h-3.5 w-3.5" />} locked>
                {applied}
              </Chip>
            ) : null}

            {needsLanguage && (
              <Popover
                side="top"
                className="w-52 max-h-80 overflow-y-auto"
                trigger={({ open, toggle }) => (
                  <Chip icon={<Globe className="h-3.5 w-3.5" />} active={open || !!language} warn={!language} onClick={toggle}>
                    {language ?? "Choose language"}
                  </Chip>
                )}
              >
                {(close) => (
                  <>
                    <MenuLabel>{applied === "Translation" ? "Target language" : "Input language"}</MenuLabel>
                    {LANGUAGES.map((l) => (
                      <MenuItem
                        key={l}
                        selected={l === language}
                        onClick={() => {
                          onLanguageChange(l);
                          close();
                        }}
                      >
                        <span className="flex-1">{l}</span>
                        {l === language && <Check className="h-4 w-4 text-accent-green" />}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Popover>
            )}

            {behavior.translationDirections && direction && (
              <Popover
                side="top"
                className="w-52"
                trigger={({ toggle }) => (
                  <Chip icon={<Languages className="h-3.5 w-3.5" />} active onClick={toggle}>
                    {direction.label}
                  </Chip>
                )}
              >
                {(close) => (
                  <>
                    <MenuLabel>Direction</MenuLabel>
                    {behavior.translationDirections!.map((d) => (
                      <MenuItem
                        key={d.id}
                        selected={d.id === direction.id}
                        onClick={() => {
                          onDirectionChange(d.id);
                          close();
                        }}
                      >
                        <span className="flex-1">{d.label}</span>
                        {d.id === direction.id && <Check className="h-4 w-4 text-accent-green" />}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Popover>
            )}
          </div>

          {busy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              title="Stop generating"
              className="shrink-0 grid place-items-center h-9 w-9 rounded-full bg-text-white text-bg-dark hover:opacity-90 transition-opacity"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSend}
              aria-label="Send message"
              title={blockReason ?? "Send (Enter)"}
              className={cn(
                "shrink-0 grid place-items-center h-9 w-9 rounded-full transition-all",
                canSend
                  ? "bg-gradient-to-br from-primary-green to-primary-blue text-white shadow-[0_0_20px_-4px_rgba(99,102,241,0.8)] hover:scale-105 active:scale-95"
                  : "bg-white/[0.08] text-text-medium cursor-not-allowed"
              )}
            >
              <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
