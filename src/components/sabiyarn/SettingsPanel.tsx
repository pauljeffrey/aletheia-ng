"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SliderSpec } from "./models";

interface SettingsPanelProps<C extends { doSample: boolean }> {
  modelName: string;
  repo?: string;
  contextual: boolean;
  config: C;
  sliders: SliderSpec<Extract<keyof C, string>>[];
  onChange: (config: C) => void;
  onReset: () => void;
  onClose: () => void;
}

function Slider({
  spec,
  value,
  onChange,
}: {
  spec: SliderSpec<string>;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - spec.min) / (spec.max - spec.min)) * 100;
  const decimals = spec.step < 1 ? (spec.step < 0.1 ? 2 : 1) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-[13px] text-text-glow" title={spec.hint}>
          {spec.label}
        </label>
        <input
          type="number"
          value={value}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            if (Number.isFinite(n)) onChange(Math.min(spec.max, Math.max(spec.min, n)));
          }}
          className="w-16 rounded-md border border-border-subtle bg-bg-dark px-2 py-1 text-right font-mono text-xs text-text-white outline-none focus:border-primary-green/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          aria-label={`${spec.label} value`}
        />
      </div>
      <input
        type="range"
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={value}
        onChange={(e) => onChange(parseFloat(parseFloat(e.target.value).toFixed(decimals)))}
        className="range-neon w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
        aria-label={spec.label}
      />
      <p className="text-[11px] text-text-medium leading-snug">{spec.hint}</p>
    </div>
  );
}

export function SettingsPanel<C extends { doSample: boolean }>({
  modelName,
  repo,
  contextual,
  config,
  sliders,
  onChange,
  onReset,
  onClose,
}: SettingsPanelProps<C>) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const basic = sliders.filter((s) => !s.advanced);
  const advanced = sliders.filter((s) => s.advanced);
  const doSample = config.doSample;

  const set = (key: keyof C, value: number | boolean) => onChange({ ...config, [key]: value } as C);

  return (
    <div className="flex h-full w-[320px] flex-col bg-bg-dark-secondary border-l border-border-subtle">
      <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-border-subtle">
        <h2 className="text-sm font-semibold text-text-white">Run settings</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-text-medium hover:text-text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Reset to defaults"
            title="Reset to defaults"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-medium hover:text-text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scrollbar-thin">
        <div className="rounded-xl border border-border-subtle bg-bg-card/60 p-4 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-medium">Model</div>
          <div className="text-sm font-medium text-text-white">{modelName}</div>
          {repo && <div className="font-mono text-[11px] text-text-medium break-all">{repo}</div>}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-text-light">
            <span className={cn("h-1.5 w-1.5 rounded-full", contextual ? "bg-emerald-400" : "bg-amber-400")} />
            {contextual ? "Remembers conversation context" : "Stateless — each prompt is independent"}
          </div>
        </div>

        <div className="space-y-5">
          {basic.map((s) => (
            <Slider key={s.key} spec={s} value={config[s.key] as unknown as number} onChange={(v) => set(s.key, v)} />
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border-subtle px-4 py-3">
          <div>
            <div className="text-[13px] text-text-glow">Sampling</div>
            <div className="text-[11px] text-text-medium">Sample instead of greedy/beam decoding.</div>
          </div>
          <button
            role="switch"
            aria-checked={doSample}
            onClick={() => set("doSample", !doSample)}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              doSample ? "bg-primary-green" : "bg-white/[0.12]"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                doSample ? "translate-x-[22px]" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        {advanced.length > 0 && (
          <div>
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex w-full items-center justify-between text-[13px] font-medium text-text-light hover:text-text-white transition-colors"
            >
              Advanced
              <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} />
            </button>
            {showAdvanced && (
              <div className="mt-5 space-y-5">
                {advanced.map((s) => (
                  <Slider key={s.key} spec={s} value={config[s.key] as unknown as number} onChange={(v) => set(s.key, v)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
