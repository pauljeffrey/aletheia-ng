import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

const HIGHLIGHTS = [
  {
    title: "SabiYarn-125M",
    description:
      "Nigeria's first decoder-only foundational language model — translation, sentiment, and generation across seven indigenous languages.",
    href: "/products/sabiyarn",
    image: "/sabiyarn_ai.png",
    span: "lg:col-span-2",
  },
  {
    title: "West African MT + RLHF",
    description:
      "Distributed fine-tuning with AfriCOMET-guided RLHF for low-resource language pairs — research open-sourced on GitHub.",
    href: "/jeffreyotoibhi?tab=portfolio",
    span: "lg:col-span-1",
  },
  {
    title: "Healthcare & Research",
    description:
      "Clinical AI, multimodal diagnostics, AfricaNLP publications, and ethical AI governance — peer-reviewed and production-focused.",
    href: "/research",
    span: "lg:col-span-3",
  },
];

export function Highlights() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-bg-dark border-t border-border-subtle">
      <div className="container">
        <SectionHeader
          title="What we build"
          description="Flagship products and research lines where deep technical work meets real-world deployment."
          className="mb-10 sm:mb-14"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group surface-card p-5 sm:p-6 md:p-8 hover:border-border transition-all duration-200 overflow-hidden relative min-h-[180px] sm:min-h-[200px] flex flex-col justify-end ${item.span}`}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt=""
                  width={400}
                  height={300}
                  className="absolute top-0 right-0 w-36 md:w-44 opacity-[0.12] group-hover:opacity-[0.18] transition-opacity object-cover rounded-lg"
                />
              )}
              <h3 className="text-lg md:text-xl font-medium text-text-white group-hover:text-primary-green transition-colors">
                {item.title}
              </h3>
              <p className="text-text-medium mt-2 text-sm leading-relaxed max-w-xl">
                {item.description}
              </p>
              <span className="text-text-light text-xs font-medium mt-4 inline-flex items-center gap-1 uppercase tracking-wider">
                Explore <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
