// // import { Footer } from "@/sections/Footer";
// // import { Header } from "@/sections/Header";

// // const About = () => {
// //     return (
// //         <>
// //         <Header />
// //         <section className="py-16">
// //         <div className="container mx-auto text-center">
// //             <h2 className="text-4xl font-bold text-gray-800">About Aletheia AI</h2>
// //             <p className="mt-4 text-gray-600">
// //             Aletheia AI is dedicated to solving real-world challenges with artificial intelligence. 
// //             We develop innovative AI solutions that empower businesses, governments, and communities.
// //             </p>
// //             <h3 className="text-2xl font-semibold mt-6 text-gray-800">Our Vision</h3>
// //             <p className="mt-4 text-gray-600">We envision AI that is inclusive, accessible, and tailored to diverse cultures.</p>
// //         </div>
// //         </section>
// //         <Footer />
// //         </>
// //     );
// // };
  
// // export default About;
  
// import { Footer } from "@/sections/Footer";
// import { Header } from "@/sections/Header";

// const About = () => {
//     return (
//         <>
//             <Header />
//             <section className="py-16">
//                 <div className="container mx-auto text-center max-w-3xl">
//                     <h2 className="text-4xl font-bold text-gray-800">About Aletheia AI</h2>
//                     <p className="mt-4 text-gray-600">
//                         Aletheia AI was founded on <strong>August 15, 2024</strong> by Dr. Otoibhi Jeffrey to bridge the gap between artificial intelligence and real-world impact. 
//                         Our mission is to research, develop, and deploy cutting-edge AI solutions that address critical challenges in healthcare, business, and underserved communities.
//                     </p>
                    
//                     <h3 className="text-2xl font-semibold mt-8 text-gray-800">Our Vision</h3>
//                     <p className="mt-4 text-gray-600">
//                         We envision a world where AI is inclusive, accessible, and tailored to diverse cultures and industries. Our goal is to ensure AI serves humanity equitably, 
//                         empowering governments, businesses, and individuals to make better decisions through data-driven insights.
//                     </p>

//                     <h3 className="text-2xl font-semibold mt-8 text-gray-800">Our Focus Areas</h3>
//                     <ul className="mt-4 text-gray-600 text-left mx-auto max-w-2xl">
//                         <li>✅ Healthcare AI – Developing intelligent systems for disease diagnosis, medical automation, and healthcare accessibility.</li>
//                         <li>✅ Natural Language Processing (NLP) – Building multilingual AI models that understand and process underrepresented languages, such as Nigerian and African dialects.</li>
//                         <li>✅ Computer Vision & Robotics – Innovating in biomedical engineering, assistive robotics, and autonomous healthcare systems.</li>
//                         <li>✅ AI for Business & Automation – Crafting AI-driven business intelligence tools, automation pipelines, and analytics solutions.</li>
//                         <li>✅ Ethical AI & Bias Mitigation – Ensuring fairness and accountability in AI by developing techniques to detect and eliminate bias in machine learning models.</li>
//                     </ul>

//                     <h3 className="text-2xl font-semibold mt-8 text-gray-800">Founder</h3>
//                     <div className="mt-4">
//                         <img src="../assets/jeffrey.jpg" alt="Dr. Otoibhi Jeffrey" className="mx-auto w-32 h-32 rounded-full border-4 border-gray-300" />
//                         <p className="mt-4 text-gray-600">
//                             <strong>Dr. Otoibhi Jeffrey</strong> is a medical doctor, AI engineer, and researcher with expertise spanning computer vision, NLP, and biomedical AI.
//                             He is the founder of Aletheia Research Labs and the lead architect behind SabiYarn-125M, Nigeria’s first multilingual foundational AI model.
//                             Passionate about advancing AI for healthcare and underserved communities, Jeffrey’s work has been instrumental in developing ethically aligned AI innovations. 
//                         </p>
//                         <a 
//                             href="http://www.aletheia.com.ng/jeffreyotoibhi" 
//                             className="mt-4 inline-block text-blue-600 hover:underline"
//                         >
//                             Learn more about Dr. Jeffrey →
//                         </a>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default About;
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

// This is a single-line comment in JavaScript/React

/*
  This is a multi-line comment
  in JavaScript/React that can
  span multiple lines
*/

const About = () => {
    return (
        <>
        <Header />
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">About Aletheia AI</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Pioneering AI & Robotics solutions that bridge technological gaps and empower underserved communities.
                    </p>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Story</h3>
                    <p className="text-gray-600 mb-4">
                        Founded on August 15th, 2024, Aletheia AI emerged from a profound recognition of the technological disparities affecting underserved communities. Our name, derived from the Greek concept of "truth" and "disclosure," reflects our commitment to revealing and addressing real-world challenges through artificial intelligence and Robotics.
                    </p>
                    <p className="text-gray-600 mb-4">
                        What began as a vision to democratize access to cutting-edge AI has evolved into a mission-driven organization dedicated to developing solutions that respect cultural nuances, address local challenges, and create meaningful impact where technology access has traditionally been limited.
                    </p>
                    <p className="text-gray-600">
                        Our flagship project, SabiYarn-125M—Nigeria's first foundational language model supporting seven indigenous languages—exemplifies our approach to creating technology that honors and preserves cultural identity while solving practical problems.
                    </p>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Mission</h3>
                    <p className="text-gray-600 mb-4">
                        At Aletheia AI, we are committed to developing artificial intelligence & robotics solutions that address critical challenges in healthcare, education, business, finance and information access particularly for underserved communities. We believe that AI, Robotics and emergent technologies should serve humanity in all its diversity, not just privileged segments of society.
                    </p>
                    <p className="text-gray-600">
                        Through rigorous research, ethical development practices, and deep community engagement, we create systems that are cost-effective, culturally relevant, accessible, and impactful. Our work spans, but not limited to language models, business and healthcare applications, and educational tools designed to bridge technological divides.
                    </p>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Vision</h3>
                    <p className="text-gray-600 mb-4">
                        We envision a world where artificial intelligence is truly inclusive, accessible, and tailored to diverse cultures and contexts. Where technological advancements reach every corner of society, empowering communities to solve their unique challenges.
                    </p>
                    <p className="text-gray-600">
                        Aletheia AI strives to be at the forefront of this transformation, creating AI solutions that respect cultural nuances, address local needs, and contribute to a more equitable technological landscape.
                    </p>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Values</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Inclusivity</h4>
                            <p className="text-gray-600">We aim to design AI systems that work for diverse populations, languages, and contexts, ensuring no community is left behind.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Innovation</h4>
                            <p className="text-gray-600">We push the boundaries of what's possible, developing novel approaches to solve complex challenges.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Integrity</h4>
                            <p className="text-gray-600">We uphold the highest ethical standards in our research and development, prioritizing transparency and accountability.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Impact</h4>
                            <p className="text-gray-600">We measure our success by the tangible difference our solutions make in people's lives and communities.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Approach</h3>
                    <p className="text-gray-600 mb-4">
                        Aletheia AI combines rigorous technical expertise with deep cultural understanding. We believe that effective AI solutions must be grounded in the realities of the communities they serve.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Our development process involves:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                        <li>Extensive engagement to understand specific needs and challenges</li>
                        <li>Collaborative research with local experts and institutions</li>
                        <li>Ethical data collection and curation that respects privacy and cultural sensitivities</li>
                        <li>Rigorous testing in real-world contexts</li>
                        <li>Continuous refinement based on user feedback</li>
                    </ul>
                    <p className="text-gray-600">
                        This approach ensures our solutions are not only technically sound but appropriate and practically useful.
                    </p>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Founder</h3>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0">
                        <img src="/jeffrey.jpg" alt="Dr. Otoibhi Jeffrey" className="mx-auto w-32 h-32 rounded-full border-4 border-gray-300" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Dr. Jeffrey Otoibhi</h4>
                            <p className="text-gray-600 mb-4">
                                Dr. Jeffrey Otoibhi is a medical doctor and AI expert with a unique vision for healthcare transformation through technology. His dual expertise in clinical medicine and artificial intelligence provides Aletheia AI with a distinctive perspective on developing solutions that address real healthcare challenges.
                            </p>
                            <p className="text-gray-600 mb-4">
                                As a practicing physician, Dr. Otoibhi has witnessed firsthand the healthcare disparities affecting underserved communities. This experience has fueled his passion for creating AI-driven solutions that enhance diagnostics, improve patient management, and increase healthcare accessibility.
                            </p>
                            <p className="text-gray-600 mb-4">
                His notable achievements include leading the development of SabiYarn-125M, Nigeria's first foundational language model supporting seven indigenous languages, and creating various AI healthcare applications. He currently heads the data science team for 3 different organizations, bringing his expertise to multiple domains simultaneously.
            		    </p>
            		    <p className="text-gray-600 mb-4">
                Dr. Otoibhi is currently pursuing a Master's degree in Robotics and Autonomous Systems with a focus on biomedical engineering at Arizona State University, further expanding his expertise at the intersection of healthcare and cutting-edge technology.
            		    </p>
                            <p className="text-gray-600">
                                <a href="http://www.aletheia.com.ng/jeffreyotoibhi" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Learn more about Dr. Jeffrey Otoibhi →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Our Projects</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-medium text-gray-800 mb-2">SabiYarn-125M</h4>
                            <p className="text-gray-600">
                                Nigeria's first decoder-only foundational language model supporting seven indigenous languages, enabling natural language processing for Yoruba, Hausa, Igbo, Pidgin, and other Nigerian languages.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-medium text-gray-800 mb-2">MedVault AI</h4>
                            <p className="text-gray-600">
                                A robotic system designed to digitize paper-based medical records in Nigerian hospitals, addressing critical issues of data fragmentation and accessibility.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-medium text-gray-800 mb-2">Ottobiz</h4>
                            <p className="text-gray-600">
                                Ottobiz is an AI-enhanced market platform that automates key aspects of the sales cycle, from advertising, product inquiry to payment verification and logistics. It boosts efficiency, enhances customer experience, and drives revenue through intelligent automation and data insights. This is being built in partnership with Datached.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Join Our Mission</h3>
                    <p className="text-gray-600 mb-4">
                        We believe in the power of collaboration to create meaningful change. Whether you're a researcher, developer, healthcare professional, or community advocate, there are many ways to contribute to our mission.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Reach out to learn more about partnership opportunities, research collaborations, or how our solutions can benefit your community.
                    </p>
                    <div className="text-center">
                        <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
};
  
export default About;
