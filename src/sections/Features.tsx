import Link from "next/link";
import { Briefcase, Activity, Users, Cog } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Feature {
  title: string;
  description: string;
  areas: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

export const features: Feature[] = [
  {
    title: "Customized AI Solutions",
    description:
      "Tailored AI that helps organizations increase productivity, reduce costs, and unlock new opportunities across industries.",
    areas: ["Multimodal AI Systems", "Cross-Industry Applications", "Business Intelligence Automation", "Robotics Integration"],
    icon: Briefcase,
    href: "/services",
  },
  {
    title: "Consulting Services",
    description:
      "Expert guidance for businesses and governments in designing, implementing, and scaling AI strategies for measurable results.",
    areas: ["AI Readiness Assessment", "Scalable AI Frameworks", "Data-Driven Decision Support", "Ethical AI & Bias Evaluation"],
    icon: Activity,
    href: "/services",
  },
  {
    title: "Collaborative Problem-Solving",
    description:
      "Partnerships with governments, NGOs, and organizations to address complex challenges and deliver transformative impact.",
    areas: ["Healthcare & Policy Solutions", "Business Process Optimization", "Sustainable Development"],
    icon: Users,
    href: "/contact",
  },
  {
    title: "Future-Ready Products",
    description:
      "AI products and systems that anticipate emerging trends — from language technology to robotics and research pipelines.",
    areas: ["Multilingual NLP", "AI-Enhanced Robotics", "Research & Development", "Agentic Systems"],
    icon: Cog,
    href: "/products",
  },
];

function FeatureCard({ title, description, areas, icon: Icon, href }: Feature) {
  return (
    <Link
      href={href}
      className="block surface-card p-6 sm:p-8 transition-all duration-200 hover:border-border group"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg border border-border-subtle bg-white/[0.03] group-hover:border-border transition-colors">
        <Icon className="w-5 h-5 text-primary-green" />
      </div>
      <h3 className="mb-3 text-lg font-medium tracking-tight text-text-white">{title}</h3>
      <p className="mb-5 text-text-medium leading-relaxed text-sm">{description}</p>
      <div>
        <h4 className="mb-2 font-medium text-text-light text-xs uppercase tracking-wider">Focus Areas</h4>
        <ul className="space-y-2">
          {areas.map((area) => (
            <li key={area} className="flex items-center text-text-medium text-sm">
              <span className="w-1 h-1 mr-2.5 bg-primary-green rounded-full shrink-0" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function Features() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-bg-dark border-t border-border-subtle">
      <div className="container">
        <SectionHeader
          title="Areas of Expertise"
          wide
          description="At Aletheia Research Labs, we leverage cutting-edge artificial intelligence to solve complex challenges across industries — combining technical expertise with cultural and contextual understanding. Our work spans multilingual AI for diverse languages, transformative healthcare innovations, and intelligent business analytics and automation, delivering tailored, impactful solutions that empower organizations to thrive in a tech-driven world. With a focus on innovation, collaboration, and societal impact, we are shaping a smarter, more inclusive future."
          className="mb-10 sm:mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
