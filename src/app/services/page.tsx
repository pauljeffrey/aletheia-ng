import { Header } from "@/sections/Header";

const Services = () => {
  return (
    <>
    <Header />
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">AI Solutions & Services</h2>
        <p className="mt-4 text-gray-600">
          We provide AI-powered automation, consultancy, and tailored AI solutions for various industries.
        </p>
        <h3 className="text-2xl font-semibold mt-6">Our Services</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Custom AI Development</li>
          <li>AI Consulting & Strategy</li>
          <li>Automated Business Solutions</li>
        </ul>
      </div>
    </section>
    </>
  );
};

export default Services;

