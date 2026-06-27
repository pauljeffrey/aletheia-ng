import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "AI consulting, custom AI solutions, data analytics, robotics integration, and ethical AI implementation from Aletheia Research Labs.",
  path: "/services",
  keywords: [
    "AI consulting Nigeria",
    "custom AI solutions",
    "AI strategy",
    "AI governance",
    "business automation AI",
  ],
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
