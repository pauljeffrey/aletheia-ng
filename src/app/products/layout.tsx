import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "Explore Aletheia Research Labs products including SabiYarn multilingual language models and Ottobiz agentic AI commerce platform.",
  path: "/products",
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

