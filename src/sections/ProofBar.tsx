const STATS = [
  { value: "7+", label: "Indigenous languages in SabiYarn" },
  { value: "48%", label: "Avg. benchmark gain vs GPT-4" },
  { value: "7+", label: "AI research projects led" },
  { value: "2024", label: "Founded" },
];

export function ProofBar() {
  return (
    <section className="py-10 sm:py-14 border-b border-border-subtle bg-bg-dark-secondary/80">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p className="text-2xl sm:text-3xl md:text-4xl font-display text-text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-text-medium mt-1.5 sm:mt-2 uppercase tracking-wider leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
