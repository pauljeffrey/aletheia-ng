import Link from "next/link";
import { features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { SectionHeader } from "@/components/ui/SectionHeader";

function ServiceCard({
  title,
  description,
  areas,
  icon: Icon,
}: (typeof features)[number]) {
  return (
    <article className="bg-gradient-card backdrop-blur-sm p-8 rounded-2xl border border-primary-green/30 h-full">
      <div className="flex items-center justify-center w-14 h-14 mb-6 bg-gradient-to-br from-primary-green/20 to-primary-blue/20 rounded-2xl border border-primary-green/30">
        <Icon className="w-7 h-7 text-primary-green" />
      </div>
      <h3 className="mb-3 text-xl font-bold gradient-text">{title}</h3>
      <p className="mb-5 text-text-light leading-relaxed text-sm md:text-base">{description}</p>
      <ul className="space-y-2">
        {areas.map((area) => (
          <li key={area} className="flex items-center text-text-light text-sm">
            <span className="w-1.5 h-1.5 mr-2.5 bg-primary-green rounded-full shrink-0" />
            {area}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  return (
    <>
      <Header />
      <section className="py-16 md:py-24 bg-bg-dark">
        <div className="container">
          <SectionHeader
            title="Our Services"
            description="AI-powered automation, consultancy, and tailored solutions — from strategy and governance to deployment and scale."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {features.map((feature) => (
              <ServiceCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="text-center mt-14">
            <p className="text-text-light mb-6 max-w-xl mx-auto">
              Tell us about your use case — we&apos;ll help you assess readiness, design architecture, and ship responsibly.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
