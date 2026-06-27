import { SITE_URL } from "@/lib/site";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aletheia Research Labs",
    alternateName: "Aletheia AI",
    url: SITE_URL,
    logo: `${SITE_URL}/Aletheia.png`,
    image: `${SITE_URL}/Aletheia.png`,
    description:
      "AI research and development company specializing in multilingual AI models, healthcare AI, robotics, and agentic systems.",
    foundingDate: "2024-08-15",
    founder: {
      "@type": "Person",
      name: "Dr. Jeffrey Otoibhi",
      url: `${SITE_URL}/jeffreyotoibhi`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "drjeffrey.paul@aletheia.com.ng",
      telephone: "+2349027728309",
      url: `${SITE_URL}/contact`,
    },
    sameAs: [
      "https://www.linkedin.com/in/jeffreyotoibhi/",
      "https://github.com/pauljeffrey",
      "https://twitter.com/Jeffreypaul_",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aletheia Research Labs",
    url: SITE_URL,
    description:
      "AI research and development company specializing in multilingual AI models, healthcare AI, and robotics.",
    publisher: {
      "@type": "Organization",
      name: "Aletheia Research Labs",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
