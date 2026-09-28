"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, MessageSquare, PanelLeftClose, Search, SquarePen, Trash2 } from "lucide-react";
import { SITE_LOGO, SITE_LOGO_ALT } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ChatSession } from "./types";

interface SidebarProps {
  sessions: ChatSession[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  onOpenGuide: () => void;
}

const DAY = 86_400_000;

function groupLabel(ts: number): string {
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  if (ts >= startOfToday) return "Today";
  if (ts >= startOfToday - DAY) return "Yesterday";
  if (ts >= startOfToday - 7 * DAY) return "Previous 7 days";
  if (ts >= startOfToday - 30 * DAY) return "Previous 30 days";
  return "Older";
}

export function Sidebar({ sessions, activeId, onSelect, onNew, onDelete, onClose, onOpenGuide }: SidebarProps) {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = [...sessions]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((s) => !q || s.title.toLowerCase().includes(q));
    const out: { label: string; items: ChatSession[] }[] = [];
    for (const s of filtered) {
      const label = groupLabel(s.updatedAt);
      const bucket = out.find((g) => g.label === label);
      if (bucket) bucket.items.push(s);
      else out.push({ label, items: [s] });
    }
    return out;
  }, [sessions, query]);

  return (
    <div className="flex h-full w-[272px] flex-col bg-bg-dark-secondary border-r border-border-subtle">
      <div className="flex items-center justify-between px-3 h-14 shrink-0">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity pl-1" aria-label="Aletheia home">
          <Image src={SITE_LOGO} alt={SITE_LOGO_ALT} width={140} height={40} className="h-7 w-auto object-contain" />
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-text-medium hover:text-text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close sidebar"
          title="Close sidebar"
        >
          <PanelLeftClose className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="px-3 space-y-1 shrink-0">
        <button
          onClick={onNew}
          className="group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-glow border border-border-subtle bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary-green/40 transition-all"
        >
          <SquarePen className="h-4 w-4 text-accent-green" />
          New chat
          <kbd className="ml-auto hidden md:inline font-mono text-[10px] text-text-medium border border-border-subtle rounded px-1.5 py-0.5">
            ⇧⌘O
          </kbd>
        </button>
        <label className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text-medium focus-within:bg-white/[0.04] transition-colors">
          <Search className="h-4 w-4 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full bg-transparent outline-none placeholder:text-text-medium text-text-glow"
          />
        </label>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin">
        {groups.length === 0 && (
          <p className="px-3 py-6 text-xs text-text-medium leading-relaxed">
            {query ? "No chats match your search." : "Your conversations will appear here."}
          </p>
        )}
        {groups.map((group) => (
          <div key={group.label}>
            <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-medium">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((s) => (
                <li key={s.id}>
                  <div
                    className={cn(
                      "group relative flex items-center rounded-lg transition-colors",
                      s.id === activeId ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                    )}
                  >
                    {s.id === activeId && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-gradient-to-b from-primary-green to-primary-blue" />
                    )}
                    <button
                      onClick={() => onSelect(s.id)}
                      className={cn(
                        "flex-1 min-w-0 flex items-center gap-2.5 px-3 py-2 text-left text-sm",
                        s.id === activeId ? "text-text-white" : "text-text-light"
                      )}
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      <span className="truncate">{s.title}</span>
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="mr-1.5 p-1.5 rounded-md text-text-medium hover:text-red-400 hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      aria-label={`Delete chat ${s.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-border-subtle p-3 space-y-0.5">
        <button
          onClick={onOpenGuide}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-light hover:text-text-white hover:bg-white/[0.04] transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          How to use SabiYarn
        </button>
        <Link
          href="/"
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-light hover:text-text-white hover:bg-white/[0.04] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Aletheia
        </Link>
      </div>
    </div>
  );
}
