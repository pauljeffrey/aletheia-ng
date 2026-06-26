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
                                I am a seasoned AI Expert and Medical Doctor with six years of experience in AI, ML and innovation. Led the development of Nigeria&apos;s first foundational decoder-only language model and contributed
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
                                As the lead Engineer and Researcher behind <span className="font-semibold">SabiYarn</span>, Nigeria&apos;s first LLM capable of text generation 
                                in multiple Nigerian languages, I am committed to pushing the boundaries of AI for meaningful societal impact.
                            </p>
                            {/* <p>
                                Currently, I am pursuing a Master&apos;s degree in Robotics and Autonomous Systems with a focus on biomedical engineering at Arizona State University, 
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
                                href="?tab=portfolio" 
                                className={`px-4 py-2 font-medium ${activeTab === "portfolio" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Portfolio
                            </a>
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
                                className={`px-4 py-2 font-medium ${activeTab === "blog" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            >
                                Blog
                            </a>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mb-16">
                        {/* Portfolio Tab */}
                        {activeTab === "portfolio" && (
                            <div>
                                <p className="text-gray-500 text-sm italic mb-6">Live previews of selected projects — click &quot;Open&quot; to explore in full.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Ottobiz */}
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-0.5">Ottobiz</h3>
                                                    <p className="text-blue-600 text-sm font-medium mb-2">Autonomous AI Business Operations Platform</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        A fully autonomous AI commerce agent handling the entire business cycle — from product enquiry through purchase, payment, logistics, upselling, and complaint resolution. A tireless end-to-end partner that works 24/7.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://ottobiz-hvbmsui8f-jeffreys-projects-d39f6687.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs font-medium"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1" style={{ height: "280px" }}>
                                            <iframe
                                                src="https://ottobiz-hvbmsui8f-jeffreys-projects-d39f6687.vercel.app/"
                                                className="w-full h-full border-0"
                                                title="Ottobiz – Autonomous AI Business Operations Platform"
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            />
                                            <div className="absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* STUD */}
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-0.5">STUD</h3>
                                                    <p className="text-blue-600 text-sm font-medium mb-2">Master Medicine Through Adventure</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        An immersive, gamified medical education platform where healthcare professionals embark on clinical adventures and advance their careers. Built for the next generation of doctors and clinicians.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://stud-eight-taupe.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs font-medium"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1" style={{ height: "280px" }}>
                                            <iframe
                                                src="https://stud-eight-taupe.vercel.app/"
                                                className="w-full h-full border-0"
                                                title="STUD – Gamified Medical Education Platform"
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            />
                                            <div className="absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* SabiYarn */}
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-0.5">SabiYarn</h3>
                                                    <p className="text-blue-600 text-sm font-medium mb-2">Nigeria&apos;s First Foundational AI Language Model</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        A groundbreaking language model purpose-built for African languages — translation, sentiment analysis, topic classification, and text generation across 8 indigenous Nigerian languages including Yoruba, Hausa, Igbo, and Pidgin.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://www.aletheia.com.ng/products/sabiyarn"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs font-medium"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1" style={{ height: "280px" }}>
                                            <iframe
                                                src="https://www.aletheia.com.ng/products/sabiyarn"
                                                className="w-full h-full border-0"
                                                title="SabiYarn – Nigerian Foundational Language Model"
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            />
                                            <div className="absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* West African MT + RLHF */}
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-0.5">West African MT + RLHF</h3>
                                                    <p className="text-blue-600 text-sm font-medium mb-2">AfriCOMET-Guided Translation for Low-Resource Languages</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        A distributed fine-tuning framework that applies RLHF with AfriCOMET as a reward model to improve machine translation for low-resource West African language pairs — Hausa, Igbo, Yoruba, Wolof, and more. Two-stage SFT → RLHF pipeline on Gemma 3 with multi-GPU DDP/FSDP support.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://github.com/pauljeffrey/westafrican-mt-rlhf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs font-medium"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div
                                            className="relative w-full flex-1 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between p-5 overflow-hidden"
                                            style={{ height: "280px" }}
                                        >
                                            <div className="font-mono text-xs leading-relaxed text-gray-300">
                                                <p className="text-green-400 mb-2">$ git clone westafrican-mt-rlhf</p>
                                                <p className="text-gray-500">westafrican-mt-rlhf/</p>
                                                <p className="pl-3 text-gray-400">├── src/ <span className="text-gray-600">— SFT + RLHF training</span></p>
                                                <p className="pl-3 text-gray-400">├── scripts/ <span className="text-gray-600">— train, eval, translate</span></p>
                                                <p className="pl-3 text-gray-400">└── app/ <span className="text-gray-600">— live demo UI + API</span></p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="bg-gray-700/80 text-green-300 text-xs px-2 py-1 rounded">RLHF</span>
                                                <span className="bg-gray-700/80 text-green-300 text-xs px-2 py-1 rounded">AfriCOMET</span>
                                                <span className="bg-gray-700/80 text-green-300 text-xs px-2 py-1 rounded">PyTorch</span>
                                                <span className="bg-gray-700/80 text-green-300 text-xs px-2 py-1 rounded">DDP / FSDP</span>
                                            </div>
                                            <a
                                                href="https://github.com/pauljeffrey/westafrican-mt-rlhf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white font-medium"
                                            >
                                                View repository on GitHub ↗
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Experience Tab */}
                        {activeTab === "experience" && (
                            <div className="space-y-8">

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">AISHA</h3>
                                            <p className="text-lg text-blue-600">AI Engineer</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Present</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Boosted LLM output quality by 20% while cutting prompt length by 88% through a clinical evaluation of 200+ user dialogues.</li>
                                        <li>Engineered an agentic data pipeline for real-time conversation analysis, enabling automated health insights and dynamic visualization.</li>
                                        <li>Led the development of an automated &quot;LLM-as-a-judge&quot; framework to evaluate safety, triage accuracy, empathy, and cultural alignment.</li>
                                        <li>Optimized system architecture to enhance functionality and healthcare assistant reliability.</li>
                                        <li>Integrated clinical data governance with AI engineering to ensure safe, high-quality, and validated triage protocols.</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Above Health</h3>
                                            <p className="text-lg text-blue-600">AI Engineer</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Present</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                        <li>Designed and deployed a clinical AI system integrated with EHR via FHIR, featuring context-aware history and agentic appointment orchestration for a live healthcare environment.</li>
                                        <li>Developed automated evaluation frameworks (including LLM-as-a-judge) to mitigate hallucinations and ensure factual accuracy, prioritizing clinical safety at scale.</li>
                                    </ul>
                                </div>

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
                                        <li>Led the development of Nigeria&apos;s first decoder-only foundational language model supporting multiple Nigerian languages (Train loss- 2.5, Val loss-2.86).</li>
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
                                            <p className="text-lg text-blue-600">AI Engineer / Researcher</p>
                                        </div>
                                        <p className="text-gray-600 mt-2 md:mt-0">Since September 2019 · Remote</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-3">
                                        <li>
                                            <strong>Distributed LLM Pre-training (Bittensor):</strong> Continuous pre-training of GPT-NeoX-20B and GPT-J-6B on the Bittensor dataset using DeepSpeed ZeRO-3 across multi-node GPU clusters. Achieved a final cross-entropy loss of 1.89 (6.62 PPL), boosting TAO token earnings by 15%.
                                        </li>
                                        <li>
                                            <strong>RAG-Powered Customer Support Chatbot:</strong> Designed and deployed high-throughput RAG systems using VectorDB and GPT4All, improving response accuracy by 30% and resolving 10% of inquiries in real-time.
                                        </li>
                                        <li>
                                            <strong>AI-Driven Traffic &amp; Accident Event Analysis Engine:</strong> Engineered a complex vision-language system (VideoViT, CNN-LSTM, Gemini 2.5 Pro, GPT-4o) for accident classification and narrative generation, improving baseline accuracy by over 20%.
                                        </li>
                                        <li>
                                            <strong>Multi-Modal Clinical Depression Detection (DAIC-WOZ):</strong> Prediction of clinical depression using speech and text. Accuracy: 82%, Precision: 0.69, Recall: 0.70, F1: 0.63.
                                        </li>
                                        <li>
                                            <strong>SignSynth: Speech-to-Sign Language Translator:</strong> Built a multi-modal pipeline using Transformers for pose generation and U-Nets for sign language image synthesis (SSIM: 0.9478, MAE: 0.04).
                                        </li>
                                        <li>
                                            <strong>Adversarial Network Packet Generation:</strong> Developed a novel LSTM-based model to generate 350,000 unique adversarial network packets (IP + TCP) for proactive security vulnerability testing.
                                        </li>
                                        <li>
                                            <strong>Automatic Post-Edit (APE) Translator with Real-time Adaptation:</strong> Designed a language translator with real-time adaptation, achieving BLEU-4: 0.43, TER: 0.66 for domain-specific text.
                                        </li>
                                        <li>
                                            <strong>BERT-Based Appliance Repair Assistant:</strong> Created and integrated a BERT-based system via a scalable REST API for appliance repair recommendations, reducing human support needs and improving first-time fix rates.
                                        </li>
                                        <li>
                                            <strong>Neuronal Response Prediction (Macaque V4):</strong> Designed a CNN Core + attention readout model for predicting neuronal responses to excitable images. Correlation score: 0.27.
                                        </li>
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
                                    <p className="text-gray-600 mb-4">Nigeria&apos;s first decoder-only foundational language model supporting multiple Nigerian languages.</p>
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
                                    <p className="text-gray-600 mb-4">Developed an NER based system to extract drug names and properties from a database based on user&apos;s query in natural language. Precision-0.90, Recall- 0.88, F1 score - 0.89, Acc - 0.93.</p>
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
                                            <p>Integration of reparameterization to PEPLER&apos;s implementation (DIV-3.55, FCR-0.11, BLEU-4 0.8197)</p>
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
                                        <li>Guest speaker at DataFest Africa 2024 on &quot;Transforming Patient Care through Innovation, Ethics, Challenges and Future Prospects&quot;</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Skills Tab */}
                        {activeTab === "skills" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left column */}
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Alignment &amp; Safety</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">RLHF</span>
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Explainable AI</span>
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Adversarial Robustness</span>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Programming</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Python</span>
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Libraries &amp; Frameworks</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">PyTorch</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">TensorFlow</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">PEFT</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Pydantic AI</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">LangChain</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">LangGraph</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">DeepSpeed</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Transformers</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Accelerate</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">NumPy</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SciPy</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Pandas</span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Scikit-learn</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column */}
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">MLOps</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">MLflow</span>
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Docker</span>
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Git</span>
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">AWS</span>
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">FastAPI</span>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Data Engineering</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">PySpark</span>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Databases &amp; Knowledge Systems</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Redis</span>
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">MongoDB</span>
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">PostgreSQL</span>
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">SQL</span>
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Knowledge Graph</span>
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">GraphRAG</span>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">Domains</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Healthcare AI</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">NLP</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Computer Vision</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Audio Processing</span>
                                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Robotics</span>
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
                                            <p className="text-lg text-blue-600">Master&apos;s in Robotics and Autonomous Systems</p>
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
                                &quot;I believe AI has the power to revolutionize healthcare and society. My goal is to build AI systems that enhance 
                                patient treatment, monitoring, and rehabilitation—and I won&apos;t stop until this vision is realized. The integration of AI, 
                                robotics, and nanotechnology represents the next frontier in medicine, and I am committed to being at the forefront of this transformation.&quot;
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
                            I&apos;m always open to collaboration, research opportunities, and discussions about AI, healthcare, and technology. 
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