import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Ottobiz",
  description:
    "Ottobiz is an agentic AI commerce platform that automates product enquiry, purchase, payment verification, logistics, and customer support.",
  path: "/products/ottobiz",
  keywords: [
    "Ottobiz",
    "AI commerce",
    "agentic AI",
    "business automation Nigeria",
    "AI sales platform",
  ],
  ogImage: "/ottobiz.png",
});

export default function OttobizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
