export const PUBLICATIONS = [
  {
    title: "SabiYarn-125M: Advancing Underrepresented Languages with Multitask NLP Pretraining",
    href: "https://aclanthology.org/2025.africanlp-1.14/",
    authors: "Otoibhi J., et al.",
    venue: "Proceedings of the Sixth Workshop on AfricaNLP 2025 (pp. 95-107). ACL",
  },
  {
    title:
      "Bridging the Justice Gap (Policy Brief): Artificial Intelligence as a Tool for Judicial Efficiency in African Countries",
    href: "https://cdn.sanity.io/files/ectljjpl/production/d31b930a8c0420cec5c958336f34fce0c4de75e9.pdf",
    authors: "Otoibhi J.",
    venue: "AI Policy Lab Africa",
  },
] as const;

export const RESEARCH_AREAS = [
  "Multilingual AI & African Language Models",
  "Healthcare AI & Biomedical Devices",
  "AI-Powered Business Automation",
  "Ethical AI & Bias Mitigation",
] as const;

export const RESEARCH_CONTRIBUTIONS = [
  {
    title: "PEPLER with reparameterization for explainable recommendations",
    detail: "Integration of reparameterization to PEPLER's implementation (DIV-3.55, FCR-0.11, BLEU-4 0.8197)",
  },
  {
    title: "Automatic Post-Edit (APE) Translator with Online Adaptation",
    detail: "Designed and trained APE model. BLEU-4 0.43, TER 0.66.",
  },
  {
    title: "Adapting Large Language Models for Collaborative Semantic Recommendations",
    detail: "Modified original implementation to support unique user index generation.",
  },
  {
    title: "JHU++ Image Crowd Counting (open source implementation)",
    detail: "Implemented a confidence-guided deep residual crowd counting model using PyTorch.",
  },
  {
    title: "Evaluating Bias in Large Language Models For African Languages",
    detail: "Language bias in LLMs, comparing metrics between African, English and European texts.",
  },
] as const;

export const AFFILIATIONS = ["Masakhane member", "DataFest Africa", "Igbo AI"] as const;

export const GRANTS = [
  "ML Collective Compute Grant — Awarded for SabiYarn-125M development",
  'Guest speaker at DataFest Africa 2024 on "Transforming Patient Care through Innovation, Ethics, Challenges and Future Prospects"',
] as const;
