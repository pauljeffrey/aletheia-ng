import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aletheia Research Labs - our mission, vision, values, and commitment to creating innovative AI solutions for businesses, healthcare, and underserved communities.",
  openGraph: {
    title: "About Aletheia Research Labs",
    description: "Learn about Aletheia Research Labs - our mission, vision, values, and commitment to creating innovative AI solutions.",
    url: "https://www.aletheia.com.ng/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

