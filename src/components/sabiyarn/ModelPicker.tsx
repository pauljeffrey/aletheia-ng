"use client";

import { Check, ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODELS, getModel, type ModelInfo } from "./models";
import { MenuItem, MenuLabel, Popover } from "./Popover";

const GROUPS: ModelInfo["group"][] = ["Pretrained", "Finetuned", "Chat"];

export function ModelPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const current = getModel(value);

  return (
    <Popover
      className="w-[min(22rem,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto"
      trigger={({ open, toggle }) => (
        <button
          onClick={toggle}
          aria-expanded={open}
          className={cn(
            "flex items-center gap-2 rounded-xl px-3 py-2 text-[15px] font-medium text-text-white transition-colors",
            open ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
          )}
        >
          <span className="truncate max-w-[46vw] md:max-w-none">{current.name}</span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-accent-green/90 border border-primary-green/30 bg-primary-green/10 rounded-md px-1.5 py-0.5">
            {current.group}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-text-medium transition-transform", open && "rotate-180")} />
        </button>
      )}
    >
      {(close) =>
        GROUPS.map((group) => {
          const items = MODELS.filter((m) => m.group === group);
          return (
            <div key={group}>
              <MenuLabel>{group === "Chat" ? "Chat models · coming soon" : `${group} models`}</MenuLabel>
              {items.map((m) => (
                <MenuItem
                  key={m.id}
                  selected={m.id === value}
                  disabled={!m.available}
                  onClick={() => {
                    onChange(m.id);
                    close();
                  }}
                  className="items-start py-2.5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-white">{m.name}</span>
                      {!m.available && <Lock className="h-3 w-3 text-text-medium" />}
                    </div>
                    <p className="text-xs text-text-medium mt-0.5 leading-snug">{m.description}</p>
                  </div>
                  {m.id === value && <Check className="h-4 w-4 mt-0.5 text-accent-green shrink-0" />}
                </MenuItem>
              ))}
            </div>
          );
        })
      }
    </Popover>
  );
}
