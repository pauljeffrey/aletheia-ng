import { Header } from "@/sections/Header";

const About = () => {
    return (
        <>
        <Header />
        <section className="py-16">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">About Aletheia AI</h2>
            <p className="mt-4 text-gray-600">
            Aletheia AI is dedicated to solving real-world challenges with artificial intelligence. 
            We develop innovative AI solutions that empower businesses, governments, and communities.
            </p>
            <h3 className="text-2xl font-semibold mt-6 text-gray-800">Our Vision</h3>
            <p className="mt-4 text-gray-600">We envision AI that is inclusive, accessible, and tailored to diverse cultures.</p>
        </div>
        </section>
        </>
    );
};
  
export default About;
  
