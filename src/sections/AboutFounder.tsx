import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { FaDownload, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaMobile, FaMapMarkerAlt } from "react-icons/fa";
// FaGlobe
// Default active tab for server rendering
const defaultTab = "experience";

// Define this as an async component
export default async function AboutFounder({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    // Get the active tab from URL query parameters, defaulting to "experience"
    // Since searchParams is a dynamic API, we need to handle it appropriately
    const activeTab = searchParams?.tab || defaultTab;

    return (
        <>
            <Header />
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto max-w-5xl px-4">
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
                            {/* Replace with your actual image */}
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                JO
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Dr. Jeffrey Otoibhi</h1>
                            <h2 className="text-xl md:text-2xl text-blue-600 font-medium mb-4">Medical Doctor | AI Researcher & Engineer</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mb-6">
                                I am a seasoned AI Expert and Medical Doctor with six years of experience in AI, ML and innovation. Led the development of Nigeria's first foundational decoder-only language model and contributed
                                to 7+ AI research projects. Passionate about leveraging AI and robotics to transform healthcare.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a 
                                    href="/jeffrey_otoibhi_resume.pdf" 
                                    download 
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <FaDownload /> Download Resume
                                </a>
                                <a 
                                    href="mailto:jeffreyotoibhi@gmail.com" 
                                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                                >
                                    <FaEnvelope /> Contact Me
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                            <FaEnvelope className="text-blue-600 text-xl" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href="mailto:jeffreyotoibhi@gmail.com" className="text-gray-800 hover:text-blue-600">jeffreyotoibhi@gmail.com</a>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                            <FaMapMarkerAlt className="text-blue-600 text-xl" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-gray-800">Lagos, Nigeria</p>
                            </div>
                        </div>
                        {/* <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                            <FaGlobe className="text-blue-600 text-xl" />
                            <div>
                                <p className="text-sm text-gray-500">Website</p>
                                <a href="https://www.aletheia.com.ng/jeffreyotoibhi" className="text-gray-800 hover:text-blue-600">aletheia.com.ng/jeffreyotoibhi</a>
                            </div>
                        </div> */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                            <FaMobile className="text-blue-600 text-xl" />
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <a href="tel:+2349061554618" className="text-gray-800 hover:text-blue-600">+234 906 155 4618</a>
                            </div>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">About Me</h2>
                        <div className="text-gray-600 space-y-4">
                            <p>
                                I am a Medical Doctor and AI Expert with a passion for merging 
                                the worlds of healthcare and artificial intelligence. With a robust 6-year track record, I have delivered 
                                innovative AI solutions across various domains, including audio processing, computer vision, and natural language processing.
                            </p>
                            <p>
                                As the lead Engineer and Researcher behind <span className="font-semibold">SabiYarn</span>, Nigeria's first LLM capable of text generation 
                                in multiple Nigerian languages, I am committed to pushing the boundaries of AI for meaningful societal impact.
                            </p>
                            {/* <p>
                                Currently, I am pursuing a Master's degree in Robotics and Autonomous Systems with a focus on biomedical engineering at Arizona State University, 
                                further expanding my expertise at the intersection of healthcare and cutting-edge technology.
                            </p> */}
                            <p>
                                My  technical proficiency in <span className="font-semibold">end-to-end LLM development, including RLHF</span>, allows me to identify challenges and develop trustworthy, compliant technological solutions. 
                                I am particularly focused on creating robust, scalable, and ethically-responsible AI that transforms healthcare delivery 
                                and preserves cultural diversity through language technology.
                            </p>
                            <p>
                                My long-term vision lies in the integration of AI, robotics, and nanotechnology to transform healthcare delivery globally.
                            </p>
                        </div>
                    </div>

                    {/* Tabs Navigation - Converted to links */}
                    <div className="mb-8">
                        <div className="flex flex-wrap border-b">
                            <a 
                                href="?tab=experience" 
                                className={`px-4 py-2 font-medium ${activeTab === "experience" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Experience
                            </a>
                            <a 
                                href="?tab=projects" 
                                className={`px-4 py-2 font-medium ${activeTab === "projects" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Projects
                            </a>
                            <a 
                                href="?tab=research" 
                                className={`px-4 py-2 font-medium ${activeTab === "research" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Research
                            </a>
                            <a 
                                href="?tab=skills" 
                                className={`px-4 py-2 font-medium ${activeTab === "skills" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Skills
                            </a>
                            <a 
                                href="?tab=education" 
                                className={`px-4 py-2 font-medium ${activeTab === "education" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Education
                            </a>
                            <a 
                                href="?tab=blog" 
                                className={`px-4 py-2 font-medium ${activeTab === "experience" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Blog
                            </a>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mb-16">
                        {/* Experience Tab */}
                        {activeTab === "experience" && (
                            <div className="space-y-8">
                                {/* <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Coptic Multi-specialist Hospital</h3>
                                            <p className="text-lg text-blue-600">General Physician</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Since April 2024</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Victoria Island, Lagos</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Provided comprehensive medical care, including emergency management, patient consultations, and surgical procedures.</li>
                                        <li>Collaborated with interdisciplinary teams to optimize patient care pathways.</li>
                                    </ul>
                                </div> */}

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Omali</h3>
                                            <p className="text-lg text-blue-600">Head of Artificial Intelligence</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Since January 2025</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Lagos, Nigeria</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Responsible for designing and evaluating an AI-powered dermatology diagnostic system tailored
to analyze skin images and handle workflows, providing:</li>
                                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                            <li>Diagnosis of dermatological conditions and possible home remedies.</li>
                                            <li>Scheduling appointments and handling payment systems</li>
                                        </ul>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Aletheia Research Lab</h3>
                                            <p className="text-lg text-blue-600">Chief AI Scientist - SabiYarn-125M Foundational LM</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Since November 2023</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Lagos</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Led the development of Nigeria's first decoder-only foundational language model supporting multiple Nigerian languages (Train loss- 2.5, Val loss-2.86).</li>
                                        <li>Outperformed GPT-4 by 48% and LLaMA2-13B by 259% on average across Nigerian language benchmarks for downstream tasks.</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Sienna Analytics Consulting</h3>
                                            <p className="text-lg text-blue-600">AI Engineer, LLM & Generative AI</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">October 2023 - February 2024</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Lagos</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Designed, developed and deployed advanced AI chatbot systems seamlessly integrating them into the business applications for 4 clients.</li>
                                        <li>Employed strategic prompt engineering approaches improving AI responses (correctness and hallucinations) by 25%.</li>
                                        <li>Reduced AI application latency by 15% through optimized features.</li>
                                        <li>Provided technical support to over 20 client teams with a 95% resolution rate.</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Freelance</h3>
                                            <p className="text-lg text-blue-600">AI Engineer/Researcher</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Since September 2019</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Remote</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li><strong>AI Mental Health Support Companion:</strong> Developed, deployed an AI chatbot companion with context-aware interactions, robust dialogue management, documentation systems and progress tracking.</li>
                                        <li><strong>RAG-Powered Customer Support Chatbot:</strong> An Information Retrieval enhanced GPT4All-based chatbot. Enhanced response relevance and accuracy by 30%, resolved 10% of inquiries in real-time.</li>
                                        <li><strong>AI-Driven Traffic and Accident Event Analysis Engine:</strong> Using ResNet-based video segmentation, CNN-LSTM, VideoViT, and LLMs for accident classification, weather analysis, and narrative generation. Accuracy - 71%.</li>
                                        <li><strong>Brazilian Appliance Repair Recommendation System:</strong> Created an API-based ML system for appliance repair recommendations, reducing human support needs and improving first-time fix rates.</li>
                                        <li><strong>Neuronal Responses Prediction to Excitable Images (Macaque v4):</strong> Developed a custom model (CNN core + attention readout) to predict neuronal responses in macaque V4 visual areas. Correlation score -0.27.</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Tunu AI</h3>
                                            <p className="text-lg text-blue-600">Principal Engineer</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Present</p>
                                    </div>
                                    <p className="text-gray-600 mb-4">Remote</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Leading the development of an AI-powered mental health support platform.</li>
                                        <li>Designing and implementing advanced dialogue systems for therapeutic interactions.</li>
                                        <li>Developing monitoring and progress tracking features for mental health support.</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Projects Tab */}
                        {activeTab === "projects" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">SabiYarn-125M</h3>
                                    <p className="text-gray-600 mb-4">Nigeria's first decoder-only foundational language model supporting multiple Nigerian languages.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Language Models</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">PyTorch</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">MediVault AI</h3>
                                    <p className="text-gray-600 mb-4">An AI-enhanced robotic system to digitize paper-based medical health records using SOTA OCR technology.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Robotics</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">OCR</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Modal Clinical Depression Detection</h3>
                                    <p className="text-gray-600 mb-4">Detection using speech and text. Accuracy: 82%, Precision: 0.69, Recall: 0.7, F1-score: 0.63.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Audio Processing</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">SignSynth: AI-Powered Sign Language Generator</h3>
                                    <p className="text-gray-600 mb-4">Built a pose sequence generator, GAN and a U-Net-based model for translating pose vectors into sign language images. MAE: 0.04, SSIM: 0.9478.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Computer Vision</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">GANs</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Accessibility</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">ECG Anomaly Detection</h3>
                                    <p className="text-gray-600 mb-4">Using AutoEncoders. Val loss-0.03, test accuracy - 0.942, Precision - 0.99, Recall - 0.9.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Signal Processing</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Deep Learning</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Drug Information Retriever</h3>
                                    <p className="text-gray-600 mb-4">Developed an NER based system to extract drug names and properties from a database based on user's query in natural language. Precision-0.90, Recall- 0.88, F1 score - 0.89, Acc - 0.93.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Information Retrieval</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Research Tab */}
                        {activeTab === "research" && (
                            <div className="space-y-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Publications</h3>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-4">
                                        <li>
                                            <p className="font-medium">
                                                <a href="https://aclanthology.org/2025.africanlp-1.14/#">
                                                SabiYarn-125M: Advancing Underrepresented Languages with Multitask NLP Pretraining
                                                </a>
                                                </p>
                                            <p>Otoibhi J., et al.</p>
                                            <p className="text-sm text-gray-500">Proceedings of the Sixth Workshop on AfricaNLP 2025 (pp. 95-107). Association for Computational Linguistics</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">
                                                <a href="https://cdn.sanity.io/files/ectljjpl/production/d31b930a8c0420cec5c958336f34fce0c4de75e9.pdf">
                                                Bridging the Justice Gap (Policy Brief): Artificial Intelligence as a Tool for Judicial Efficiency in African Countries
                                                </a>
                                                </p>
                                            <p>Otoibhi J., </p>
                                            <p className="text-sm text-gray-500">AI Policy Lab Africa</p>
                                        </li>
                                        
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Research Contributions</h3>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-4">
                                        <li>
                                            <p className="font-medium">PEPLER with reparameterization for explainable recommendations</p>
                                            <p>Integration of reparameterization to PEPLER's implementation (DIV-3.55, FCR-0.11, BLEU-4 0.8197)</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">Automatic Post-Edit (APE) Translator with Online Adaptation</p>
                                            <p>Designed and trained APE model. BLEU-4 -0.43, TER-0.66.</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">Adapting Large Language Models for Collaborative Semantic Recommendations</p>
                                            <p>Modified original implementation to support unique user index generation.</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">JHU++ Image Crowd Counting (open source implementation)</p>
                                            <p>Implemented a confidence-guided deep residual crowd counting model using PyTorch.</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">Evaluating Bias in Large Language Models For African Languages</p>
                                            <p>Language bias in LLMs, comparing metrics between African, English and European texts.</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Affiliations</h3>
                                    <ul className="list-disc pl-6 text-gray-600">
                                        <li>Masakhane member</li>
                                        {/* <li>Contributor to African NLP advancement</li> */}
                                        <li>DataFest Africa</li>
                                        <li>Igbo AI</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Grants & Recognition</h3>
                                    <ul className="list-disc pl-6 text-gray-600">
                                        <li>ML Collective Compute Grant - Awarded for SabiYarn-125M development</li>
                                        <li>Guest speaker at DataFest Africa 2024 on "Transforming Patient Care through Innovation, Ethics, Challenges and Future Prospects"</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Skills Tab */}
                        {activeTab === "skills" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Skills</h3>
                                    
                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-700 mb-2">Programming Languages</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Python</span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">C++</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-700 mb-2">Libraries & Frameworks</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">PyTorch</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">TensorFlow</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">NumPy</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Jax</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Scikit-learn</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">OpenCV</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-700 mb-2">Tools & Platforms</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">MLflow</span>
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Docker</span>
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Git</span>
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">AWS</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-2">Data Engineering</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">PySpark</span>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Hadoop</span>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">MongoDB</span>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">PostgreSQL</span>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Redis</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Areas of Expertise</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">AI & Machine Learning</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">AI Research</span>
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Explainable AI</span>
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">AI Safety</span>
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">RLHF</span>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">Healthcare & Medicine</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Medical Diagnostics</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Patient Care</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Biomedical Engineering</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Healthcare Innovation</span>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">Specialized AI Applications</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">NLP</span>
                                                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Computer Vision</span>
                                                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Audio Processing</span>
                                                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Robotics</span>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">Languages</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">English (Fluent)</span>
                                                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">German (Basic)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Education Tab */}
                        {activeTab === "education" && (
                            <div className="space-y-8">
                                {/* <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Arizona State University</h3>
                                            <p className="text-lg text-blue-600">Master's in Robotics and Autonomous Systems</p>
                                            <p className="text-gray-600">Focus on Biomedical Engineering</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Current</p>
                                    </div>
                                </div> */}

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">College of Medicine, University Of Lagos</h3>
                                            <p className="text-lg text-blue-600">MBBS (Bachelor of Medicine, Bachelor of Surgery)</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">November 2011 - July 2018</p>
                                    </div>
                                    <p className="text-gray-600">Nigeria</p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications</h3>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Deep Learning Specialization (Andrew Ng)</li>
                                        <li>Google TensorFlow Developer (Google ML 2022 Cohort)</li>
                                    </ul>
                                </div>
                            </div>
                        )}


                        {/* Blogs Tab */}
                        {activeTab === "blog" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        <a href="https://pauljeffrey.github.io/post/rope/">
                                            Demystifying Rope Embeddings: A Comprehensive Guide
                                        </a>
                                        </h3>
                                    <p className="text-gray-600 mb-4"> In this article, we will explore rope embeddings in depth, understand their purpose, and compare them with positional and trainable embeddings.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Positional Embeddings</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Transformers</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">PyTorch</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        <a href="https://pauljeffrey.github.io/post/rope/">
                                            Demystifying Rope Embeddings: A Comprehensive Guide
                                        </a>
                                        </h3>
                                    <p className="text-gray-600 mb-4"> In this article, we will explore rope embeddings in depth, understand their purpose, and compare them with positional and trainable embeddings.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Positional Embeddings</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Transformers</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">PyTorch</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/">
                                            Unraveling the Secrets of Raw Text (Part 3)
                                        </a>
                                        </h3>
                                    <p className="text-gray-600 mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Neural Networks</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Natural Language Processing</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Word Capitalization</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/">
                                            Unraveling the Secrets of Raw Text (Part 2)
                                        </a>
                                        </h3>
                                    <p className="text-gray-600 mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Neural Networks</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Natural Language Processing</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Sentence Segmentation</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/">
                                            Unraveling the Secrets of Raw Text (Part 1)
                                        </a>
                                        </h3>
                                    <p className="text-gray-600 mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Neural Networks</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Natural Language Processing</span>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Word Segmentation</span>
                                    </div>
                                </div>
                                
                            </div>
                        )}

                    </div>

                    {/* Philosophy Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Philosophy</h2>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-100">
                            <p className="text-gray-700 text-lg italic">
                                "I believe AI has the power to revolutionize healthcare and society. My goal is to build AI systems that enhance 
                                patient treatment, monitoring, and rehabilitation—and I won't stop until this vision is realized. The integration of AI, 
                                robotics, and nanotechnology represents the next frontier in medicine, and I am committed to being at the forefront of this transformation."
                            </p>
                        </div>
                    </div>

                    {/* Personal Interests */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Interests</h2>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Robotics</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Healthcare</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Cryptocurrency</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Finance</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Basketball</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Economics</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Chess</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-gray-800 font-medium">Fitness</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            I'm always open to collaboration, research opportunities, and discussions about AI, healthcare, and technology. 
                            Whether you have a project in mind or just want to connect, feel free to reach out!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                            <a 
                                href="mailto:jeffreyotoibhi@gmail.com" 
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <FaEnvelope /> Email Me
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/jeffreyotoibhi/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a 
                                href="https://github.com/pauljeffrey" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <FaGithub /> GitHub
                            </a>
                            <a 
                                href="https://twitter.com/Jeffreypaul_" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <FaTwitter /> Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}