import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import Image from "next/image";
import { FaDownload, FaEnvelope, FaMobile, FaMapMarkerAlt } from "react-icons/fa";
import {
  DEFAULT_FOUNDER_TAB,
  FOUNDER_TABS,
  founderCard,
  founderProjectTag,
  founderSkillTag,
  founderTabClass,
} from "@/lib/founder-ui";
import { SOCIAL_LINKS } from "@/lib/social";

export default async function AboutFounder({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const activeTab = (searchParams?.tab as string) || DEFAULT_FOUNDER_TAB;

    return (
        <>
            <Header />
            <section className="py-10 sm:py-12 md:py-20 bg-bg-dark overflow-x-hidden">
                <div className="container max-w-5xl">
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-center mb-14 gap-8">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-glow border-2 border-border shrink-0">
                            <Image
                                src="/jeffrey.jpg"
                                alt="Dr. Jeffrey Otoibhi"
                                width={256}
                                height={256}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-white mb-2">Dr. Jeffrey Otoibhi</h1>
                            <h2 className="text-lg sm:text-xl md:text-2xl text-primary-green font-medium mb-4">Medical Doctor | AI Researcher & Engineer</h2>
                            <p className="text-text-light text-base sm:text-lg max-w-2xl mb-6">
                                I am a seasoned AI Expert and Medical Doctor with six years of experience in AI, ML and innovation. Led the development of Nigeria&apos;s first foundational decoder-only language model and contributed
                                to 7+ AI research projects. Passionate about leveraging AI and robotics to transform healthcare.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a href="/jeffrey_otoibhi_resume.pdf" download className="btn btn-primary gap-2">
                                    <FaDownload /> Download Resume
                                </a>
                                <a href="mailto:jeffreyotoibhi@gmail.com" className="btn border border-border-subtle text-text-white hover:border-primary-green/60 bg-bg-card gap-2">
                                    <FaEnvelope /> Contact Me
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
                        <div className={`${founderCard} p-4 flex items-center gap-3`}>
                            <FaEnvelope className="text-primary-green text-xl shrink-0" />
                            <div className="min-w-0">
                                <p className="text-sm text-text-medium">Email</p>
                                <a href="mailto:jeffreyotoibhi@gmail.com" className="text-text-white hover:text-primary-green text-sm break-all">jeffreyotoibhi@gmail.com</a>
                            </div>
                        </div>
                        <div className={`${founderCard} p-4 flex items-center gap-3`}>
                            <FaMapMarkerAlt className="text-primary-green text-xl shrink-0" />
                            <div>
                                <p className="text-sm text-text-medium">Location</p>
                                <p className="text-text-white">Lagos, Nigeria</p>
                            </div>
                        </div>
                        <div className={`${founderCard} p-4 flex items-center gap-3`}>
                            <FaMobile className="text-primary-green text-xl shrink-0" />
                            <div>
                                <p className="text-sm text-text-medium">Phone</p>
                                <a href="tel:+2349061554618" className="text-text-white hover:text-primary-green">+234 906 155 4618</a>
                            </div>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <div className="mb-14">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-white mb-6 border-b border-primary-green/30 pb-2">About Me</h2>
                        <div className="text-text-light space-y-4 leading-relaxed">
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

                    {/* Tabs Navigation */}
                    <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex flex-nowrap border-b border-border-subtle min-w-max sm:min-w-0">
                            {FOUNDER_TABS.map((tab) => (
                                <a
                                    key={tab.id}
                                    href={`?tab=${tab.id}`}
                                    className={founderTabClass(activeTab === tab.id)}
                                >
                                    {tab.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mb-16">
                        {/* Portfolio Tab */}
                        {activeTab === "portfolio" && (
                            <div>
                                <p className="text-text-medium text-sm italic mb-6">Live previews of selected projects — click &quot;Open&quot; to explore in full.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-lg flex flex-col">
                                        <div className="p-4 border-b border-border-subtle">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-text-white mb-0.5">Ottobiz</h3>
                                                    <p className="text-primary-green text-sm font-medium mb-2">Autonomous AI Business Operations Platform</p>
                                                    <p className="text-text-light text-sm leading-relaxed">
                                                        A fully autonomous AI commerce agent handling the entire business cycle — from product enquiry through purchase, payment, logistics, upselling, and complaint resolution. A tireless end-to-end partner that works 24/7.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://ottobiz.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary text-xs font-medium px-3 py-1.5 shrink-0 self-start sm:self-auto"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1 h-52 sm:h-64 md:h-[280px]">
                                            <iframe
                                                src="https://ottobiz.vercel.app/"
                                                className="w-full h-full border-0"
                                                title="Ottobiz – Autonomous AI Business Operations Platform"
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            />
                                            <div className="absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* STUD */}
                                    <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-lg flex flex-col">
                                        <div className="p-4 border-b border-border-subtle">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div className="min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                    <Image
                                                        src="/stud.png"
                                                        alt="STUD logo"
                                                        width={44}
                                                        height={44}
                                                        className="rounded-lg shrink-0 object-contain bg-bg-dark-secondary"
                                                    />
                                                    <h3 className="text-lg font-bold text-text-white">STUD</h3>
                                                </div>
                                                    <p className="text-primary-green text-sm font-medium mb-2">Master Medicine Through Adventure</p>
                                                    <p className="text-text-light text-sm leading-relaxed">
                                                        An immersive, gamified medical education platform where healthcare professionals embark on clinical adventures and advance their careers. Built for the next generation of doctors and clinicians.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://stud-eight-taupe.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary text-xs font-medium px-3 py-1.5 shrink-0 self-start sm:self-auto"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1 h-52 sm:h-64 md:h-[280px]">
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
                                    <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-lg flex flex-col">
                                        <div className="p-4 border-b border-border-subtle">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-text-white mb-0.5">SabiYarn-125M</h3>
                                                    <p className="text-primary-green text-sm font-medium mb-2">Nigeria&apos;s First Foundational AI Language Model</p>
                                                    <p className="text-text-light text-sm leading-relaxed">
                                                        A groundbreaking language model purpose-built for African languages — translation, sentiment analysis, topic classification, and text generation across 8 indigenous Nigerian languages including Yoruba, Hausa, Igbo, and Pidgin.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://www.aletheia.com.ng/products/sabiyarn"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary text-xs font-medium px-3 py-1.5 shrink-0 self-start sm:self-auto"
                                                >
                                                    Open ↗
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex-1 h-52 sm:h-64 md:h-[280px]">
                                            <iframe
                                                src="https://www.aletheia.com.ng/products/sabiyarn"
                                                className="w-full h-full border-0"
                                                title="SabiYarn-125M – Nigerian Foundational Language Model"
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            />
                                            <div className="absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* West African MT + RLHF */}
                                    <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-lg flex flex-col md:col-span-2">
                                        <div className="p-4 border-b border-border-subtle">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-text-white mb-0.5">West African MT + RLHF</h3>
                                                    <p className="text-primary-green text-sm font-medium mb-2">AfriCOMET-Guided Translation for Low-Resource Languages</p>
                                                    <p className="text-text-light text-sm leading-relaxed">
                                                        A distributed fine-tuning framework that applies RLHF with AfriCOMET as a reward model to improve machine translation for low-resource West African language pairs — Hausa, Igbo, Yoruba, Wolof, and more. Two-stage SFT → RLHF pipeline on Gemma 3 with multi-GPU DDP/FSDP support.
                                                    </p>
                                                </div>
                                                <a
                                                    href="https://github.com/pauljeffrey/westafrican-mt-rlhf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary text-xs font-medium px-3 py-1.5 shrink-0 self-start sm:self-auto"
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
                                                <p className="text-text-medium">westafrican-mt-rlhf/</p>
                                                <p className="pl-3 text-gray-400">├── src/ <span className="text-text-light">— SFT + RLHF training</span></p>
                                                <p className="pl-3 text-gray-400">├── scripts/ <span className="text-text-light">— train, eval, translate</span></p>
                                                <p className="pl-3 text-gray-400">└── app/ <span className="text-text-light">— live demo UI + API</span></p>
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

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">AISHA</h3>
                                            <p className="text-lg text-primary-green">AI Engineer</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Present</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Boosted LLM output quality by 20% while cutting prompt length by 88% through a clinical evaluation of 200+ user dialogues.</li>
                                        <li>Engineered an agentic data pipeline for real-time conversation analysis, enabling automated health insights and dynamic visualization.</li>
                                        <li>Led the development of an automated &quot;LLM-as-a-judge&quot; framework to evaluate safety, triage accuracy, empathy, and cultural alignment.</li>
                                        <li>Optimized system architecture to enhance functionality and healthcare assistant reliability.</li>
                                        <li>Integrated clinical data governance with AI engineering to ensure safe, high-quality, and validated triage protocols.</li>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Above Health</h3>
                                            <p className="text-lg text-primary-green">AI Engineer</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Present</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Designed and deployed a clinical AI system integrated with EHR via FHIR, featuring context-aware history and agentic appointment orchestration for a live healthcare environment.</li>
                                        <li>Developed automated evaluation frameworks (including LLM-as-a-judge) to mitigate hallucinations and ensure factual accuracy, prioritizing clinical safety at scale.</li>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Omali</h3>
                                            <p className="text-lg text-primary-green">Head of Artificial Intelligence</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Since January 2025</p>
                                    </div>
                                    <p className="text-text-light mb-4">Lagos, Nigeria</p>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Responsible for designing and evaluating an AI-powered dermatology diagnostic system tailored
to analyze skin images and handle workflows, providing:</li>
                                        <ul className="list-disc pl-6 text-text-light space-y-2">
                                            <li>Diagnosis of dermatological conditions and possible home remedies.</li>
                                            <li>Scheduling appointments and handling payment systems</li>
                                        </ul>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Aletheia Research Lab</h3>
                                            <p className="text-lg text-primary-green">Chief AI Scientist - SabiYarn-125M Foundational LM</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Since November 2023</p>
                                    </div>
                                    <p className="text-text-light mb-4">Lagos</p>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Led the development of Nigeria&apos;s first decoder-only foundational language model supporting multiple Nigerian languages (Train loss- 2.5, Val loss-2.86).</li>
                                        <li>Outperformed GPT-4 by 48% and LLaMA2-13B by 259% on average across Nigerian language benchmarks for downstream tasks.</li>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Sienna Analytics Consulting</h3>
                                            <p className="text-lg text-primary-green">AI Engineer, LLM & Generative AI</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">October 2023 - February 2024</p>
                                    </div>
                                    <p className="text-text-light mb-4">Lagos</p>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Designed, developed and deployed advanced AI chatbot systems seamlessly integrating them into the business applications for 4 clients.</li>
                                        <li>Employed strategic prompt engineering approaches improving AI responses (correctness and hallucinations) by 25%.</li>
                                        <li>Reduced AI application latency by 15% through optimized features.</li>
                                        <li>Provided technical support to over 20 client teams with a 95% resolution rate.</li>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Freelance</h3>
                                            <p className="text-lg text-primary-green">AI Engineer / Researcher</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Since September 2019 · Remote</p>
                                    </div>
                                    <ul className="list-disc pl-6 text-text-light space-y-3">
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

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Tunu AI</h3>
                                            <p className="text-lg text-primary-green">Principal Engineer</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Present</p>
                                    </div>
                                    <p className="text-text-light mb-4">Remote</p>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
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
                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-text-white mb-2">SabiYarn-125M</h3>
                                    <p className="text-text-light mb-4">Nigeria&apos;s first decoder-only foundational language model supporting multiple Nigerian languages.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>NLP</span>
                                        <span className={founderProjectTag}>Language Models</span>
                                        <span className={founderProjectTag}>PyTorch</span>
                                    </div>
                                </div>

                                <div className={`${founderCard} p-6 hover:border-border transition-colors`}>
                                    <h3 className="text-xl font-medium text-text-white mb-2">West African MT + RLHF</h3>
                                    <p className="text-text-medium mb-4">Distributed fine-tuning with AfriCOMET-guided RLHF for low-resource West African language pairs — open-sourced research pipeline.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>NLP</span>
                                        <span className={founderProjectTag}>RLHF</span>
                                        <span className={founderProjectTag}>PyTorch</span>
                                    </div>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Multi-Modal Clinical Depression Detection</h3>
                                    <p className="text-text-light mb-4">Detection using speech and text. Accuracy: 82%, Precision: 0.69, Recall: 0.7, F1-score: 0.63.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Healthcare</span>
                                        <span className={founderProjectTag}>NLP</span>
                                        <span className={founderProjectTag}>Audio Processing</span>
                                    </div>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-text-white mb-2">SignSynth: AI-Powered Sign Language Generator</h3>
                                    <p className="text-text-light mb-4">Built a pose sequence generator, GAN and a U-Net-based model for translating pose vectors into sign language images. MAE: 0.04, SSIM: 0.9478.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Computer Vision</span>
                                        <span className={founderProjectTag}>GANs</span>
                                        <span className={founderProjectTag}>Accessibility</span>
                                    </div>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-text-white mb-2">ECG Anomaly Detection</h3>
                                    <p className="text-text-light mb-4">Using AutoEncoders. Val loss-0.03, test accuracy - 0.942, Precision - 0.99, Recall - 0.9.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Healthcare</span>
                                        <span className={founderProjectTag}>Signal Processing</span>
                                        <span className={founderProjectTag}>Deep Learning</span>
                                    </div>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Drug Information Retriever</h3>
                                    <p className="text-text-light mb-4">Developed an NER based system to extract drug names and properties from a database based on user&apos;s query in natural language. Precision-0.90, Recall- 0.88, F1 score - 0.89, Acc - 0.93.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Healthcare</span>
                                        <span className={founderProjectTag}>NLP</span>
                                        <span className={founderProjectTag}>Information Retrieval</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Research Tab */}
                        {activeTab === "research" && (
                            <div className="space-y-8">
                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Publications</h3>
                                    <ul className="list-disc pl-6 text-text-light space-y-4">
                                        <li>
                                            <p className="font-medium">
                                                <a href="https://aclanthology.org/2025.africanlp-1.14/#">
                                                SabiYarn-125M: Advancing Underrepresented Languages with Multitask NLP Pretraining
                                                </a>
                                                </p>
                                            <p>Otoibhi J., et al.</p>
                                            <p className="text-sm text-text-medium">Proceedings of the Sixth Workshop on AfricaNLP 2025 (pp. 95-107). Association for Computational Linguistics</p>
                                        </li>
                                        <li>
                                            <p className="font-medium">
                                                <a href="https://cdn.sanity.io/files/ectljjpl/production/d31b930a8c0420cec5c958336f34fce0c4de75e9.pdf">
                                                Bridging the Justice Gap (Policy Brief): Artificial Intelligence as a Tool for Judicial Efficiency in African Countries
                                                </a>
                                                </p>
                                            <p>Otoibhi J., </p>
                                            <p className="text-sm text-text-medium">AI Policy Lab Africa</p>
                                        </li>
                                        
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Research Contributions</h3>
                                    <ul className="list-disc pl-6 text-text-light space-y-4">
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

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Professional Affiliations</h3>
                                    <ul className="list-disc pl-6 text-text-light">
                                        <li>Masakhane member</li>
                                        {/* <li>Contributor to African NLP advancement</li> */}
                                        <li>DataFest Africa</li>
                                        <li>Igbo AI</li>
                                    </ul>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-text-white mb-2">Grants & Recognition</h3>
                                    <ul className="list-disc pl-6 text-text-light">
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
                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Alignment &amp; Safety</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>RLHF</span>
                                                <span className={founderSkillTag}>Explainable AI</span>
                                                <span className={founderSkillTag}>Adversarial Robustness</span>
                                            </div>
                                        </div>

                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Programming</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>Python</span>
                                                <span className={founderSkillTag}>JavaScript</span>
                                            </div>
                                        </div>

                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Libraries &amp; Frameworks</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>PyTorch</span>
                                                <span className={founderSkillTag}>TensorFlow</span>
                                                <span className={founderSkillTag}>PEFT</span>
                                                <span className={founderSkillTag}>Pydantic AI</span>
                                                <span className={founderSkillTag}>LangChain</span>
                                                <span className={founderSkillTag}>LangGraph</span>
                                                <span className={founderSkillTag}>DeepSpeed</span>
                                                <span className={founderSkillTag}>Transformers</span>
                                                <span className={founderSkillTag}>Accelerate</span>
                                                <span className={founderSkillTag}>NumPy</span>
                                                <span className={founderSkillTag}>SciPy</span>
                                                <span className={founderSkillTag}>Pandas</span>
                                                <span className={founderSkillTag}>Scikit-learn</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column */}
                                    <div className="space-y-6">
                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">MLOps</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>MLflow</span>
                                                <span className={founderSkillTag}>Docker</span>
                                                <span className={founderSkillTag}>Git</span>
                                                <span className={founderSkillTag}>AWS</span>
                                                <span className={founderSkillTag}>FastAPI</span>
                                            </div>
                                        </div>

                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Data Engineering</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>PySpark</span>
                                            </div>
                                        </div>

                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Databases &amp; Knowledge Systems</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>Redis</span>
                                                <span className={founderSkillTag}>MongoDB</span>
                                                <span className={founderSkillTag}>PostgreSQL</span>
                                                <span className={founderSkillTag}>SQL</span>
                                                <span className={founderSkillTag}>Knowledge Graph</span>
                                                <span className={founderSkillTag}>GraphRAG</span>
                                            </div>
                                        </div>

                                        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                            <h3 className="text-xl font-bold text-text-white mb-4">Domains</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={founderSkillTag}>Healthcare AI</span>
                                                <span className={founderSkillTag}>NLP</span>
                                                <span className={founderSkillTag}>Computer Vision</span>
                                                <span className={founderSkillTag}>Audio Processing</span>
                                                <span className={founderSkillTag}>Robotics</span>
                                                <span className={founderSkillTag}>English (Fluent)</span>
                                                <span className={founderSkillTag}>German (Basic)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Education Tab */}
                        {activeTab === "education" && (
                            <div className="space-y-8">
                                {/* <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">Arizona State University</h3>
                                            <p className="text-lg text-primary-green">Master&apos;s in Robotics and Autonomous Systems</p>
                                            <p className="text-text-light">Focus on Biomedical Engineering</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">Current</p>
                                    </div>
                                </div> */}

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-white">College of Medicine, University Of Lagos</h3>
                                            <p className="text-lg text-primary-green">MBBS (Bachelor of Medicine, Bachelor of Surgery)</p>
                                        </div>
                                        <p className="text-text-light mt-2 md:mt-0">November 2011 - July 2018</p>
                                    </div>
                                    <p className="text-text-light">Nigeria</p>
                                </div>

                                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-text-white mb-4">Certifications</h3>
                                    <ul className="list-disc pl-6 text-text-light space-y-2">
                                        <li>Deep Learning Specialization (Andrew Ng)</li>
                                        <li>Google TensorFlow Developer (Google ML 2022 Cohort)</li>
                                    </ul>
                                </div>
                            </div>
                        )}


                        {/* Blogs Tab */}
                        {activeTab === "blog" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`${founderCard} p-6 hover:border-border transition-shadow`}>
                                    <h3 className="text-xl font-bold text-text-white mb-2">
                                        <a href="https://pauljeffrey.github.io/post/rope/" className="hover:text-primary-green transition-colors">
                                            Demystifying Rope Embeddings: A Comprehensive Guide
                                        </a>
                                    </h3>
                                    <p className="text-text-light mb-4">In this article, we explore rope embeddings in depth and compare them with positional and trainable embeddings.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Positional Embeddings</span>
                                        <span className={founderProjectTag}>Transformers</span>
                                        <span className={founderProjectTag}>PyTorch</span>
                                    </div>
                                </div>

                                <div className={`${founderCard} p-6 hover:border-border transition-shadow`}>
                                    <h3 className="text-xl font-bold text-text-white mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/">
                                            Unraveling the Secrets of Raw Text (Part 3)
                                        </a>
                                        </h3>
                                    <p className="text-text-light mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Neural Networks</span>
                                        <span className={founderProjectTag}>Natural Language Processing</span>
                                        <span className={founderProjectTag}>Word Capitalization</span>
                                    </div>
                                </div>

                                <div className={`${founderCard} p-6 hover:border-border transition-shadow`}>
                                    <h3 className="text-xl font-bold text-text-white mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/" className="hover:text-primary-green transition-colors">
                                            Unraveling the Secrets of Raw Text (Part 2)
                                        </a>
                                        </h3>
                                    <p className="text-text-light mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Neural Networks</span>
                                        <span className={founderProjectTag}>Natural Language Processing</span>
                                        <span className={founderProjectTag}>Sentence Segmentation</span>
                                    </div>
                                </div>

                                <div className={`${founderCard} p-6 hover:border-border transition-shadow`}>
                                    <h3 className="text-xl font-bold text-text-white mb-2">
                                        <a href="https://pauljeffrey.github.io/post/true-casing/" className="hover:text-primary-green transition-colors">
                                            Unraveling the Secrets of Raw Text (Part 1)
                                        </a>
                                        </h3>
                                    <p className="text-text-light mb-4"> A Journey Through Word, Sentence Segmentation and Capitalization with Python </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={founderProjectTag}>Neural Networks</span>
                                        <span className={founderProjectTag}>Natural Language Processing</span>
                                        <span className={founderProjectTag}>Word Segmentation</span>
                                    </div>
                                </div>
                                
                            </div>
                        )}

                    </div>

                    <div className="mb-14">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-white mb-6 border-b border-primary-green/30 pb-2">My Philosophy</h2>
                        <div className={`${founderCard} p-8 border-l-4 border-l-primary-green`}>
                            <p className="text-text-light text-lg italic leading-relaxed">
                                &quot;I believe AI has the power to revolutionize healthcare and society. My goal is to build AI systems that enhance 
                                patient treatment, monitoring, and rehabilitation—and I won&apos;t stop until this vision is realized. The integration of AI, 
                                robotics, and nanotechnology represents the next frontier in medicine, and I am committed to being at the forefront of this transformation.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="mb-14">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-white mb-6 border-b border-primary-green/30 pb-2">Personal Interests</h2>
                        <div className="flex flex-wrap gap-3">
                            {["Robotics", "Healthcare", "Cryptocurrency", "Finance", "Basketball", "Economics", "Chess", "Fitness"].map((interest) => (
                                <span key={interest} className={`${founderCard} px-4 py-2 text-text-light text-sm`}>
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-text-white mb-6 border-b border-primary-green/30 pb-2">Get in Touch</h2>
                        <p className="text-text-light mb-6">
                            I&apos;m always open to collaboration, research opportunities, and discussions about AI, healthcare, and technology. 
                            Whether you have a project in mind or just want to connect, feel free to reach out!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="mailto:jeffreyotoibhi@gmail.com" className="btn btn-primary gap-2">
                                <FaEnvelope /> Email Me
                            </a>
                            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn border border-border-subtle text-text-white hover:border-primary-green/60 bg-bg-card gap-2"
                                >
                                    <Icon /> {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}