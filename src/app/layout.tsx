import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { StructuredData } from "@/components/StructuredData";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Aletheia Research Labs | AI, Data Analytics & Robotics Solutions",
    template: "%s | Aletheia Research Labs",
  },
  description: "Aletheia Research Labs is a leading AI research and development company specializing in multilingual AI models, data analytics, robotics, AI strategy, and AI governance. We create innovative AI solutions for businesses, healthcare, and underserved communities.",
  keywords: [
    "AI research",
    "artificial intelligence",
    "data analytics",
    "robotics",
    "AI models",
    "multilingual AI",
    "Nigerian languages",
    "SabiYarn",
    "AI strategy",
    "AI governance",
    "AI software development",
    "machine learning",
    "natural language processing",
    "healthcare AI",
    "business AI solutions",
  ],
  authors: [{ name: "Aletheia Research Labs" }],
  creator: "Aletheia Research Labs",
  publisher: "Aletheia Research Labs",
  metadataBase: new URL("https://www.aletheia.com.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aletheia.com.ng",
    siteName: "Aletheia Research Labs",
    title: "Aletheia Research Labs | AI, Data Analytics & Robotics Solutions",
    description: "Leading AI research and development company specializing in multilingual AI models, data analytics, robotics, AI strategy, and AI governance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aletheia Research Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aletheia Research Labs | AI, Data Analytics & Robotics Solutions",
    description: "Leading AI research and development company specializing in multilingual AI models, data analytics, robotics, AI strategy, and AI governance.",
    images: ["/og-image.png"],
    creator: "@AletheiaAI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you get them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={twMerge(dmSans.className, "antialiased bg-bg-dark")}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
