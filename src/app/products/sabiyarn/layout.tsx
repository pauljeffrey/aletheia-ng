import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "SabiYarn",
  description:
    "Try SabiYarn — Nigeria's foundational AI language model for Yoruba, Hausa, Igbo, Pidgin, and other Nigerian languages. Translation, sentiment analysis, and text generation.",
  path: "/products/sabiyarn",
  keywords: [
    "SabiYarn",
    "Nigerian language model",
    "Yoruba AI",
    "Hausa NLP",
    "Igbo translation",
    "African NLP",
  ],
  ogImage: "/sabiyarn_ai.png",
});

export default function SabiYarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
