import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Research = () => {
  return (
    <>
    <Header />
    <section className="py-16 bg-bg-dark">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl font-bold gradient-text">AI Research</h1>
        <p className="mt-4 text-text-light">
          Our research covers multimodal AI, ethical AI, and domain-specific AI for healthcare and business automation.
        </p>
        <h2 className="text-2xl font-semibold mt-8 text-text-white">Active Research Areas</h2>
        <ul className="list-disc list-inside text-text-light mt-4 space-y-2 text-left max-w-xl mx-auto">
          <li>Multilingual AI & African Language Models</li>
          <li>Healthcare AI & Biomedical Devices</li>
          <li>AI-Powered Business Automation</li>
        </ul>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Research;

