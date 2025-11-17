import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Aletheia Research Labs' innovative AI products including SabiYarn multilingual language models and Ottobiz AI-enhanced market platform.",
  openGraph: {
    title: "Our Products | Aletheia Research Labs",
    description: "Explore our innovative AI solutions including SabiYarn multilingual language models and Ottobiz AI-enhanced market platform.",
    url: "https://www.aletheia.com.ng/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

