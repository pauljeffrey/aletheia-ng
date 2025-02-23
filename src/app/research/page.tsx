import { Header } from "@/sections/Header";

const Research = () => {
  return (
    <>
    <Header />
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">AI Research</h2>
        <p className="mt-4 text-gray-600">
          Our research covers multimodal AI, ethical AI, and domain-specific AI for healthcare and business automation.
        </p>
        <h3 className="text-2xl font-semibold mt-6">Active Research Areas</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Multilingual AI & African Language Models</li>
          <li>Healthcare AI & Biomedical Devices</li>
          <li>AI-Powered Business Automation</li>
        </ul>
      </div>
    </section>
    </>
  );
};

export default Research;

