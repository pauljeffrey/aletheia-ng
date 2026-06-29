import Link from "next/link";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AFFILIATIONS,
  GRANTS,
  PUBLICATIONS,
  RESEARCH_AREAS,
  RESEARCH_CONTRIBUTIONS,
} from "@/data/research";
import { founderCard } from "@/lib/founder-ui";

export default function Research() {
  return (
    <>
      <Header />
      <section className="py-16 md:py-24 bg-bg-dark">
        <div className="container max-w-4xl">
          <SectionHeader
            title="AI Research"
            description="Our research spans multilingual AI, ethical AI, healthcare systems, and domain-specific automation — with publications and open contributions to the African NLP community."
            className="mb-14"
          />

          <div className={`${founderCard} p-6 md:p-8 mb-8`}>
            <h2 className="text-xl font-bold text-text-white mb-4">Active Research Areas</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {RESEARCH_AREAS.map((area) => (
                <li key={area} className="flex items-start gap-2 text-text-light text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green mt-2 shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${founderCard} p-6 md:p-8 mb-8`}>
            <h2 className="text-xl font-bold text-text-white mb-4">Publications</h2>
            <ul className="space-y-6">
              {PUBLICATIONS.map((pub) => (
                <li key={pub.href}>
                  <a href={pub.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-green hover:text-cyan transition-colors">
                    {pub.title}
                  </a>
                  <p className="text-text-light text-sm mt-1">{pub.authors}</p>
                  <p className="text-text-medium text-xs mt-1">{pub.venue}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${founderCard} p-6 md:p-8 mb-8`}>
            <h2 className="text-xl font-bold text-text-white mb-4">Research Contributions</h2>
            <ul className="space-y-4">
              {RESEARCH_CONTRIBUTIONS.map((item) => (
                <li key={item.title}>
                  <p className="font-medium text-text-white">{item.title}</p>
                  <p className="text-text-light text-sm mt-1">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className={`${founderCard} p-6`}>
              <h2 className="text-lg font-bold text-text-white mb-3">Affiliations</h2>
              <ul className="list-disc pl-5 text-text-light text-sm space-y-1">
                {AFFILIATIONS.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className={`${founderCard} p-6`}>
              <h2 className="text-lg font-bold text-text-white mb-3">Grants & Recognition</h2>
              <ul className="list-disc pl-5 text-text-light text-sm space-y-2">
                {GRANTS.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-text-light">
            Full research profile on the{" "}
            <Link href="/jeffreyotoibhi?tab=research" className="text-primary-green hover:text-cyan">
              founder page
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
