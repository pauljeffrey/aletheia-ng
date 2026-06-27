import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { PersonStructuredData } from "@/components/PersonStructuredData";

export const metadata: Metadata = createPageMetadata({
  title: "Dr. Jeffrey Otoibhi",
  description:
    "Dr. Jeffrey Otoibhi is a medical doctor and AI engineer. Lead architect of SabiYarn, Nigeria's first foundational language model. Portfolio, experience, research, and projects.",
  path: "/jeffreyotoibhi",
  keywords: [
    "Jeffrey Otoibhi",
    "AI engineer Nigeria",
    "medical doctor AI",
    "SabiYarn",
    "healthcare AI",
    "Nigerian language models",
    "RLHF",
    "machine learning researcher",
  ],
  ogImage: "/jeffrey.jpg",
});

export default function JeffreyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PersonStructuredData />
      {children}
    </>
  );
}
