import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Aletheia Research Labs — our mission, vision, values, and work on multilingual AI, healthcare, and robotics for underserved communities.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

