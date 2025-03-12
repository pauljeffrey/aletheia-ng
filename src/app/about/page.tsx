// import { Footer } from "@/sections/Footer";
// import { Header } from "@/sections/Header";

// const About = () => {
//     return (
//         <>
//         <Header />
//         <section className="py-16">
//         <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-bold text-gray-800">About Aletheia AI</h2>
//             <p className="mt-4 text-gray-600">
//             Aletheia AI is dedicated to solving real-world challenges with artificial intelligence. 
//             We develop innovative AI solutions that empower businesses, governments, and communities.
//             </p>
//             <h3 className="text-2xl font-semibold mt-6 text-gray-800">Our Vision</h3>
//             <p className="mt-4 text-gray-600">We envision AI that is inclusive, accessible, and tailored to diverse cultures.</p>
//         </div>
//         </section>
//         <Footer />
//         </>
//     );
// };
  
// export default About;
  
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const About = () => {
    return (
        <>
            <Header />
            <section className="py-16">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-4xl font-bold text-gray-800">About Aletheia AI</h2>
                    <p className="mt-4 text-gray-600">
                        Aletheia AI was founded on <strong>August 15, 2024</strong> by Dr. Otoibhi Jeffrey to bridge the gap between artificial intelligence and real-world impact. 
                        Our mission is to research, develop, and deploy cutting-edge AI solutions that address critical challenges in healthcare, business, and underserved communities.
                    </p>
                    
                    <h3 className="text-2xl font-semibold mt-8 text-gray-800">Our Vision</h3>
                    <p className="mt-4 text-gray-600">
                        We envision a world where AI is inclusive, accessible, and tailored to diverse cultures and industries. Our goal is to ensure AI serves humanity equitably, 
                        empowering governments, businesses, and individuals to make better decisions through data-driven insights.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 text-gray-800">Our Focus Areas</h3>
                    <ul className="mt-4 text-gray-600 text-left mx-auto max-w-2xl">
                        <li>✅ Healthcare AI – Developing intelligent systems for disease diagnosis, medical automation, and healthcare accessibility.</li>
                        <li>✅ Natural Language Processing (NLP) – Building multilingual AI models that understand and process underrepresented languages, such as Nigerian and African dialects.</li>
                        <li>✅ Computer Vision & Robotics – Innovating in biomedical engineering, assistive robotics, and autonomous healthcare systems.</li>
                        <li>✅ AI for Business & Automation – Crafting AI-driven business intelligence tools, automation pipelines, and analytics solutions.</li>
                        <li>✅ Ethical AI & Bias Mitigation – Ensuring fairness and accountability in AI by developing techniques to detect and eliminate bias in machine learning models.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 text-gray-800">Founder</h3>
                    <div className="mt-4">
                        <img src="../assets/jeffrey.jpg" alt="Dr. Otoibhi Jeffrey" className="mx-auto w-32 h-32 rounded-full border-4 border-gray-300" />
                        <p className="mt-4 text-gray-600">
                            <strong>Dr. Otoibhi Jeffrey</strong> is a medical doctor, AI engineer, and researcher with expertise spanning computer vision, NLP, and biomedical AI.
                            He is the founder of Aletheia Research Labs and the lead architect behind SabiYarn-125M, Nigeria’s first multilingual foundational AI model.
                            Passionate about advancing AI for healthcare and underserved communities, Jeffrey’s work has been instrumental in developing ethically aligned AI innovations. 
                        </p>
                        <a 
                            href="http://www.aletheia.com.ng/jeffreyotoibhi" 
                            className="mt-4 inline-block text-blue-600 hover:underline"
                        >
                            Learn more about Dr. Jeffrey →
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default About;
