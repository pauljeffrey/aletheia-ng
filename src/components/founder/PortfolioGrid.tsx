import Image from "next/image";
import { FOUNDER_PORTFOLIO, type PortfolioItem } from "@/data/portfolio";

const PREVIEW_HEIGHT = "h-52 sm:h-64 md:h-[280px]";

function PortfolioCardHeader({
  item,
}: {
  item: PortfolioItem;
}) {
  return (
    <div className="p-4 border-b border-border-subtle">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0">
          {item.kind === "iframe" && item.logo ? (
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={item.logo.src}
                alt={item.logo.alt}
                width={44}
                height={44}
                className="rounded-lg shrink-0 object-contain bg-bg-dark-secondary"
              />
              <h3 className="text-lg font-bold text-text-white">{item.title}</h3>
            </div>
          ) : (
            <h3 className="text-lg font-bold text-text-white mb-0.5">{item.title}</h3>
          )}
          <p className="text-primary-green text-sm font-medium mb-2">{item.subtitle}</p>
          <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
        </div>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary text-xs font-medium px-3 py-1.5 shrink-0 self-start sm:self-auto"
        >
          Open ↗
        </a>
      </div>
    </div>
  );
}

function IframePreview({ item }: { item: Extract<PortfolioItem, { kind: "iframe" }> }) {
  return (
    <div className={`relative w-full flex-1 ${PREVIEW_HEIGHT}`}>
      <iframe
        src={item.iframeSrc}
        className="w-full h-full border-0"
        title={item.iframeTitle}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden />
    </div>
  );
}

function GitHubPreview({ item }: { item: Extract<PortfolioItem, { kind: "github" }> }) {
  return (
    <div
      className={`relative w-full flex-1 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between p-5 overflow-hidden ${PREVIEW_HEIGHT}`}
    >
      <div className="font-mono text-xs leading-relaxed text-gray-300">
        <p className="text-green-400 mb-2">{item.terminal.command}</p>
        {item.terminal.tree.map((line, index) => (
          <p key={line} className={index === 0 ? "text-text-medium" : "pl-3 text-gray-400"}>
            {line}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((tag) => (
          <span key={tag} className="bg-gray-700/80 text-green-300 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white font-medium"
      >
        {item.linkLabel}
      </a>
    </div>
  );
}

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {FOUNDER_PORTFOLIO.map((item) => (
        <div
          key={item.title}
          className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
          <PortfolioCardHeader item={item} />
          {item.kind === "iframe" ? <IframePreview item={item} /> : <GitHubPreview item={item} />}
        </div>
      ))}
    </div>
  );
}
