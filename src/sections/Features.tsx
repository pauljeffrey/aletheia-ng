import { Briefcase, Activity, Users, Cog } from 'lucide-react';

// Define the types for the features array and the FeatureCard props
interface Feature {
  title: string;
  description: string;
  areas: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const features: Feature[] = [
  {
    title: "Customized AI Solutions",
    description: "We craft tailored AI solutions that help organizations increase productivity, reduce costs, and unlock new opportunities across diverse industries.",
    areas: ["Multimodal AI Systems", "Cross-Industry Applications", "Business Intelligence Automation", "Robotics Integration"],
    icon: Briefcase,
  },
  {
    title: "Consulting Services",
    description: "We provide expert guidance to businesses, governments, and organizations in designing, implementing, and scaling AI strategies for measurable results.",
    areas: ["AI Readiness Assessment", "Scalable AI Frameworks", "Data-Driven Decision Support", "Ethical AI Implementation & Bias Evaluation"],
    icon: Activity,
  },
  {
    title: "Collaborative Problem-Solving",
    description: "We collaborate with governments, NGOs, and private organizations to address complex challenges and deliver transformative societal impact.",
    areas: ["Health care & Policy Solutions", "Business Process Optimization", "Sustainable Development"],
    icon: Users,
  },
  {
    title: "Future-Ready Products",
    description: "We are committed to innovating for tomorrow’s challenges, crafting AI products and systems that anticipate and address emerging trends and opportunities.",
    areas: ["Cryptomarket & Web3", "Speculative Innovation", "AI-Enhanced Robotics", "Research and Development"],
    icon: Cog,
  },
];

// Define the FeatureCard component's prop types
interface FeatureCardProps {
  title: string;
  description: string;
  areas: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, areas, icon: Icon }) => (
  <div className="bg-gradient-card backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-glow hover:scale-105 hover:-translate-y-2 border border-primary-green/30 group cursor-pointer">
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary-green/20 to-primary-blue/20 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-glow border border-primary-green/30">
      <Icon className="w-8 h-8 text-primary-green group-hover:text-cyan transition-colors duration-300" />
    </div>
    <h3 className="mb-4 text-2xl font-bold tracking-tighter gradient-text group-hover:scale-105 transition-transform">
      {title}
    </h3>
    <p className="mb-6 text-text-light leading-relaxed">{description}</p>
    <div>
      <h4 className="mb-3 font-semibold text-primary-green">Focus Areas</h4>
      <ul className="space-y-2.5">
        {areas.map((area, index) => (
          <li key={index} className="flex items-center text-text-light group-hover:text-text-white transition-colors">
            <div className="w-2 h-2 mr-3 bg-primary-green rounded-full animate-pulse-slow group-hover:bg-cyan transition-colors shadow-glow"></div>
            <span>{area}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Features: React.FC = () => (
  <div className="py-24 bg-bg-dark relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-neon pointer-events-none"></div>
    <div className="container relative z-10">
      <h2 className="section-title animate-fade-in">
        Areas of Expertise
      </h2>
      <div className="max-w-2xl mx-auto">
        <p className="section-description mt-5 mb-16 animate-slide-up">
        At Aletheia AI, we leverage cutting-edge artificial intelligence to solve complex challenges across industries, combining technical expertise with cultural and contextual understanding.
        Our work spans multilingual AI for diverse languages, transformative healthcare innovations, and intelligent business analytics and automation, delivering tailored, impactful solutions that empower organizations to thrive in a tech-driven world.
        With a focus on innovation, collaboration, and societal impact, we are shaping a smarter, more inclusive future.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {features.map((feature, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
