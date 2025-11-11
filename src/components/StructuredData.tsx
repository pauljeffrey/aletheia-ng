"use client";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aletheia Research Labs",
    url: "https://www.aletheia.com.ng",
    logo: "https://www.aletheia.com.ng/Aletheia.png",
    description:
      "Leading AI research and development company specializing in multilingual AI models, data analytics, robotics, AI strategy, and AI governance.",
    foundingDate: "2024-08-15",
    founder: {
      "@type": "Person",
      name: "Dr. Jeffrey Otoibhi",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://www.aletheia.com.ng/contact",
    },
    sameAs: [
      // Add your social media links here when available
      // "https://twitter.com/AletheiaAI",
      // "https://www.linkedin.com/company/aletheia-research-labs",
      // "https://github.com/aletheia-ai",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aletheia Research Labs",
    url: "https://www.aletheia.com.ng",
    description:
      "Leading AI research and development company specializing in multilingual AI models, data analytics, robotics, AI strategy, and AI governance.",
    publisher: {
      "@type": "Organization",
      name: "Aletheia Research Labs",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

