"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const STEPS: { title: string; body: string[] }[] = [
  {
    title: "Pick a model",
    body: ["Use the model menu at the top. Finetuned models are locked to the task they were trained for."],
  },
  {
    title: "Write text or start from a suggestion",
    body: ["Type your own text, or click one of the suggestion cards on a new chat to load a sample with the right task."],
  },
  {
    title: "Choose a task",
    body: [
      "Set the task chip under the message box when using your own text — it wraps your input in the format the model expects.",
      "For translation, diacritization and cleaning, pick a language: the target language for translation, the input language otherwise.",
    ],
  },
  {
    title: "Translation tips",
    body: [
      "English as the target language gives the best results.",
      "Inter-language translation works too, e.g. Yoruba → Igbo.",
      "Use full sentences rather than single words.",
    ],
  },
  {
    title: "Reading the output",
    body: [
      "These are small models: they do best on text generation and translation. Regenerate if a result isn’t right.",
      "Read the whole output — the model sometimes keeps generating after giving the correct answer.",
    ],
  },
  {
    title: "Tuning",
    body: ["Open Run settings (sliders icon, top right) to adjust generation parameters. The defaults are usually enough."],
  },
];

export function GuideDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-bg-card shadow-glow-lg scrollbar-thin"
          >
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-card/95 backdrop-blur">
              <div>
                <h2 id="guide-title" className="text-lg font-semibold text-text-white">How to use SabiYarn</h2>
                <p className="text-xs text-text-medium mt-0.5">A quick guide to getting good results.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-text-medium hover:text-text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Close guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ol className="p-6 grid gap-3 sm:grid-cols-2">
              {STEPS.map((step, i) => (
                <li key={step.title} className="rounded-xl border border-border-subtle bg-bg-dark/40 p-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="grid place-items-center h-6 w-6 rounded-md bg-primary-green/15 font-mono text-[11px] text-accent-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-medium text-text-white">{step.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {step.body.map((line) => (
                      <li key={line} className="text-[13px] leading-relaxed text-text-light">
                        {line}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
