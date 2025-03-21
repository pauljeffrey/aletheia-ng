import { FeatureCard, features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Services = () => {
  return (
    <>
    <Header />
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="mt-4 text-gray-600">
          We provide AI-powered automation, consultancy, and tailored AI solutions for various industries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Services;

