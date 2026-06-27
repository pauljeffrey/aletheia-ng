import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Aletheia Research Labs explores multilingual AI, African language models, healthcare AI, ethical AI, and business automation research.",
  path: "/research",
  keywords: [
    "AI research Nigeria",
    "African NLP",
    "healthcare AI research",
    "multilingual AI",
    "SabiYarn research",
  ],
});

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
