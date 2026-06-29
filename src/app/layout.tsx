import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { StructuredData } from "@/components/StructuredData";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI, Data Analytics & Robotics Solutions`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI research Nigeria",
    "Aletheia Research Labs",
    "artificial intelligence",
    "data analytics",
    "robotics",
    "multilingual AI",
    "Nigerian languages",
    "SabiYarn",
    "healthcare AI",
    "African NLP",
    "machine learning",
    "AI governance",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | AI, Data Analytics & Robotics Solutions`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | AI, Data Analytics & Robotics Solutions`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    creator: "@Jeffreypaul_",
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
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: SITE_LOGO, type: "image/png", sizes: "any" },
    ],
    apple: "/apple-icon.png",
    shortcut: SITE_LOGO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={twMerge(dmSans.variable, instrumentSerif.variable, "font-sans antialiased bg-bg-dark")}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
