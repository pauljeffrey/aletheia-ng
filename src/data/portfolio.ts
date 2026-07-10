export type PortfolioIframeItem = {
  kind: "iframe";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  iframeSrc: string;
  iframeTitle: string;
  logo?: { src: string; alt: string };
};

export type PortfolioGitHubItem = {
  kind: "github";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  terminal: {
    command: string;
    tree: string[];
  };
  tags: string[];
  linkLabel: string;
};

export type PortfolioItem = PortfolioIframeItem | PortfolioGitHubItem;

export const FOUNDER_PORTFOLIO: PortfolioItem[] = [
  {
    kind: "iframe",
    title: "Ottobiz",
    subtitle: "Autonomous AI Business Operations Platform",
    description:
      "A fully autonomous AI commerce agent handling the entire business cycle — from product enquiry through purchase, payment, logistics, upselling, and complaint resolution. A tireless end-to-end partner that works 24/7.",
    href: "https://ottobiz.vercel.app/",
    iframeSrc: "https://ottobiz.vercel.app/",
    iframeTitle: "Ottobiz – Autonomous AI Business Operations Platform",
  },
  {
    kind: "iframe",
    title: "STUD",
    subtitle: "Master Medicine Through Adventure",
    description:
      "An immersive, gamified medical education platform where healthcare professionals embark on clinical adventures and advance their careers. Built for the next generation of doctors and clinicians.",
    href: "https://stud-eight-taupe.vercel.app/",
    iframeSrc: "https://stud-eight-taupe.vercel.app/",
    iframeTitle: "STUD – Gamified Medical Education Platform",
    logo: { src: "/stud.png", alt: "STUD logo" },
  },
  {
    kind: "iframe",
    title: "SabiYarn-125M",
    subtitle: "Nigeria's First Foundational AI Language Model",
    description:
      "A groundbreaking language model purpose-built for African languages — translation, sentiment analysis, topic classification, and text generation across 8 indigenous Nigerian languages including Yoruba, Hausa, Igbo, and Pidgin.",
    href: "https://www.aletheia.com.ng/products/sabiyarn",
    iframeSrc: "https://www.aletheia.com.ng/products/sabiyarn",
    iframeTitle: "SabiYarn-125M – Nigerian Foundational Language Model",
  },
  {
    kind: "iframe",
    title: "Certifyr",
    subtitle: "Inclusive Alternative Credit Scoring",
    description:
      "An inclusive credit scoring platform for consumers and SMBs who are underbanked or have thin credit files. Reads everyday financial documents — utility bills, mobile money statements, informal business ledgers, telecom top-up logs — and produces an explainable credit score, loan limit, and interest rate.",
    href: "https://certifyr-vert.vercel.app/",
    iframeSrc: "https://certifyr-vert.vercel.app/",
    iframeTitle: "Certifyr – Inclusive Credit Scoring",
  },
  {
    kind: "iframe",
    title: "HERA",
    subtitle: "Healthcare Eligibility & Reasoning Agent",
    description:
      "Healthcare Eligibility & Reasoning Agent — synthetic clinical trial matching over generated patient trajectories and SOAP notes. Surfaces eligible trials with explainable reasoning for clinicians and research teams.",
    href: "https://hera-snowy.vercel.app/",
    iframeSrc: "https://hera-snowy.vercel.app/",
    iframeTitle: "HERA – Clinical Trial Matching",
  },
  {
    kind: "github",
    title: "West African MT + RLHF",
    subtitle: "AfriCOMET-Guided Translation for Low-Resource Languages",
    description:
      "A distributed fine-tuning framework that applies RLHF with AfriCOMET as a reward model to improve machine translation for low-resource West African language pairs — Hausa, Igbo, Yoruba, Wolof, and more. Two-stage SFT → RLHF pipeline on Gemma 3 with multi-GPU DDP/FSDP support.",
    href: "https://github.com/pauljeffrey/westafrican-mt-rlhf",
    terminal: {
      command: "$ git clone westafrican-mt-rlhf",
      tree: [
        "westafrican-mt-rlhf/",
        "├── src/ — SFT + RLHF training",
        "├── scripts/ — train, eval, translate",
        "└── app/ — live demo UI + API",
      ],
    },
    tags: ["RLHF", "AfriCOMET", "PyTorch", "DDP / FSDP"],
    linkLabel: "View repository on GitHub ↗",
  },
];
