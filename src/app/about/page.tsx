import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { founderCard } from "@/lib/founder-ui";

const About = () => {
  return (
    <>
      <Header />
      <section className="py-16 md:py-24 bg-bg-dark">
        <div className="container max-w-5xl">
          <SectionHeader
            title="About Aletheia Research Labs"
            description="Pioneering AI & Robotics solutions that bridge technological gaps and empower underserved communities."
            className="mb-16"
          />

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Story</h3>
            <div className="text-text-light space-y-4 leading-relaxed">
              <p>
                Founded on August 15th, 2024, Aletheia Research Labs emerged from a profound recognition of the technological disparities affecting underserved communities. Our name, derived from the Greek concept of &quot;truth&quot; and &quot;disclosure,&quot; reflects our commitment to revealing and addressing real-world challenges through artificial intelligence and robotics.
              </p>
              <p>
                What began as a vision to democratize access to cutting-edge AI has evolved into a mission-driven organization dedicated to developing solutions that respect cultural nuances, address local challenges, and create meaningful impact where technology access has traditionally been limited.
              </p>
              <p>
                Our flagship project, SabiYarn-125M—Nigeria&apos;s first foundational language model supporting seven indigenous languages—exemplifies our approach to creating technology that honors and preserves cultural identity while solving practical problems.
              </p>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Mission</h3>
            <div className="text-text-light space-y-4 leading-relaxed">
              <p>
                At Aletheia Research Labs, we are committed to developing artificial intelligence &amp; robotics solutions that address critical challenges in healthcare, education, business, finance and information access particularly for underserved communities. We believe that AI, robotics and emergent technologies should serve humanity in all its diversity, not just privileged segments of society.
              </p>
              <p>
                Through rigorous research, ethical development practices, and deep community engagement, we create systems that are cost-effective, culturally relevant, accessible, and impactful. Our work spans, but is not limited to language models, business and healthcare applications, and educational tools designed to bridge technological divides.
              </p>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Vision</h3>
            <div className="text-text-light space-y-4 leading-relaxed">
              <p>
                We envision a world where artificial intelligence is truly inclusive, accessible, and tailored to diverse cultures and contexts. Where technological advancements reach every corner of society, empowering communities to solve their unique challenges.
              </p>
              <p>
                Aletheia Research Labs strives to be at the forefront of this transformation, creating AI solutions that respect cultural nuances, address local needs, and contribute to a more equitable technological landscape.
              </p>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Inclusivity", text: "We aim to design AI systems that work for diverse populations, languages, and contexts, ensuring no community is left behind." },
                { title: "Innovation", text: "We push the boundaries of what's possible, developing novel approaches to solve complex challenges." },
                { title: "Integrity", text: "We uphold the highest ethical standards in our research and development, prioritizing transparency and accountability." },
                { title: "Impact", text: "We measure our success by the tangible difference our solutions make in people's lives and communities." },
              ].map(({ title, text }) => (
                <div key={title} className={`${founderCard} p-6`}>
                  <h4 className="text-lg font-medium text-primary-green mb-2">{title}</h4>
                  <p className="text-text-light text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Approach</h3>
            <div className="text-text-light space-y-4 leading-relaxed">
              <p>
                Aletheia Research Labs combines rigorous technical expertise with deep cultural understanding. We believe that effective AI solutions must be grounded in the realities of the communities they serve.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Extensive engagement to understand specific needs and challenges</li>
                <li>Collaborative research with local experts and institutions</li>
                <li>Ethical data collection and curation that respects privacy and cultural sensitivities</li>
                <li>Rigorous testing in real-world contexts</li>
                <li>Continuous refinement based on user feedback</li>
              </ul>
              <p>This approach ensures our solutions are not only technically sound but appropriate and practically useful.</p>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Founder</h3>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-48 h-48 rounded-full flex-shrink-0 border border-primary-green/30 overflow-hidden shadow-glow">
                <Image src="/jeffrey.jpg" alt="Dr. Jeffrey Otoibhi" width={192} height={192} className="w-full h-full object-cover" />
              </div>
              <div className="text-text-light space-y-4 leading-relaxed">
                <h4 className="text-xl font-medium text-primary-green">Dr. Jeffrey Otoibhi</h4>
                <p>
                  Dr. Jeffrey Otoibhi is a medical doctor and AI expert with a unique vision for healthcare transformation through technology. His dual expertise in clinical medicine and artificial intelligence provides Aletheia Research Labs with a distinctive perspective on developing solutions that address real healthcare challenges.
                </p>
                <p>
                  As a practicing physician, Dr. Otoibhi has witnessed firsthand the healthcare disparities affecting underserved communities. This experience has fueled his passion for creating AI-driven solutions that enhance diagnostics, improve patient management, and increase healthcare accessibility.
                </p>
                <p>
                  His notable achievements include leading the development of SabiYarn-125M, Nigeria&apos;s first foundational language model supporting seven indigenous languages, and creating various AI healthcare applications. He currently heads the data science team for 3 different organizations, bringing his expertise to multiple domains simultaneously.
                </p>
                <p>
                  Dr. Otoibhi is currently pursuing a Master&apos;s degree in Robotics and Autonomous Systems with a focus on biomedical engineering at Arizona State University, further expanding his expertise at the intersection of healthcare and cutting-edge technology.
                </p>
                <Link href="/jeffreyotoibhi" className="inline-block text-primary-green hover:text-cyan font-medium">
                  Learn more about Dr. Jeffrey Otoibhi →
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-6 text-text-white border-b border-border-subtle pb-2">Our Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "SabiYarn-125M", text: "Nigeria's first decoder-only foundational language model supporting seven indigenous languages, enabling natural language processing for Yoruba, Hausa, Igbo, Pidgin, and other Nigerian languages." },
                { title: "STUD", text: "A gamified medical education platform — clinical adventures that help the next generation of clinicians master medicine through interactive, scenario-based learning." },
                { title: "Ottobiz", text: "An AI-enhanced market platform that automates key aspects of the sales cycle, from advertising and product inquiry to payment verification and logistics. Built in partnership with Datached." },
              ].map(({ title, text }) => (
                <div key={title} className={`${founderCard} p-6 ${title === "Ottobiz" ? "md:col-span-2" : ""}`}>
                  <h4 className="text-lg font-medium text-primary-green mb-2">{title}</h4>
                  <p className="text-text-light text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-text-white">Join Our Mission</h3>
            <p className="text-text-light mb-6 max-w-2xl mx-auto">
              We believe in the power of collaboration to create meaningful change. Whether you&apos;re a researcher, developer, healthcare professional, or community advocate, reach out about partnerships and research collaborations.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
