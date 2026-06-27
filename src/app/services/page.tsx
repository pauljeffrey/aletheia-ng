import { FeatureCard, features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Services = () => {
  return (
    <>
    <Header />
    <section className="py-16 bg-bg-dark">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold gradient-text">Our Services</h1>
          <p className="mt-4 text-text-light">
            We provide AI-powered automation, consultancy, and tailored AI solutions for various industries.
          </p>
        </div>
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

