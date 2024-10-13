import { Briefcase, Activity, Users, Cog } from 'lucide-react';

// Define the types for the features array and the FeatureCard props
interface Feature {
  title: string;
  description: string;
  areas: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: "Catalyzing Product Commercialization",
    description: "We excel in fusing our commercial life sciences knowledge with our grasp of healthcare markets and public health principles.",
    areas: ["Market strategy", "Regulatory Navigation", "Commercialization Excellence", "Strategic Partnerships"],
    icon: Briefcase,
  },
  {
    title: "Transforming Healthcare Delivery",
    description: "We empower public and non-profit health organizations to establish premier programs, expand capabilities, refine systems, and achieve transformative outcomes.",
    areas: ["Market Innovation", "Capacity Enhancement", "Data-driven Optimization", "Innovative Health Financing"],
    icon: Activity,
  },
  {
    title: "Advancing Public Affairs",
    description: "Our extensive network with policymakers and thought leaders enables us to forge pioneering partnerships that drive bold policy initiatives, secure funding, and shape the healthcare landscape.",
    areas: ["Inclusive Dialogue", "Strategy Advocacy", "Policy Influence", "Resource Mobilization"],
    icon: Users,
  },
  {
    title: "Enabling Health System",
    description: "We guide our partners in deploying avant-garde technologies and solutions that significantly broaden access to essential health products and services.",
    areas: ["Enhancing clinical research infrastructure", "Fostering local production ecosystems", "Optimizing supply chains and networks", "Pioneering digital health innovations"],
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

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, areas, icon: Icon }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <h3 className="mb-4 text-2xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
      {title}
    </h3>
    <p className="mb-6 text-[#010D3E] tracking-light">{description}</p>
    <div>
      <h4 className="mb-3 font-semibold text-blue-600">Focus Areas</h4>
      <ul className="space-y-2">
        {areas.map((area, index) => (
          <li key={index} className="flex items-center text-[#010D3E] tracking-light">
            <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
            {area}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Features: React.FC = () => (
  <div className="py-[72px]">
    <div className="container">
      <h2 className="section-title">
        Areas of Expertise
      </h2>
      <div className="max-w-xl mx-auto">
        <p className="section-description mt-5 mb-12">
          Our deep-rooted understanding of healthcare systems and markets equips us with a distinctive perspective that merges commercial acumen with public health insights. We tackle the intricate issues faced by healthcare entities and pioneers, crafting tailor-made solutions that honor the distinctiveness of each locale we serve.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </div>
);
