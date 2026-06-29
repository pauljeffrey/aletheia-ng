import { twMerge } from "tailwind-merge";

export const FOUNDER_TABS = [
  { id: "portfolio", label: "Portfolio" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "blog", label: "Blog" },
] as const;

export type FounderTabId = (typeof FOUNDER_TABS)[number]["id"];

export const DEFAULT_FOUNDER_TAB: FounderTabId = "portfolio";

export function founderTabClass(isActive: boolean) {
  return twMerge(
    "px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
    isActive
      ? "text-text-white border-b-2 border-primary-green"
      : "text-text-medium hover:text-text-light border-b-2 border-transparent"
  );
}

export const founderCard =
  "bg-bg-card border border-border-subtle rounded-xl shadow-sm";

export const founderSkillTag =
  "px-3 py-1 rounded-md text-sm bg-white/[0.04] text-text-light border border-border-subtle";

export const founderProjectTag =
  "bg-white/[0.04] text-text-light text-xs px-2 py-1 rounded border border-border-subtle";
