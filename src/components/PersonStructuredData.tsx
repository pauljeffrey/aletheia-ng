import { SITE_URL } from "@/lib/site";

export function PersonStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Jeffrey Otoibhi",
    jobTitle: "Medical Doctor | AI Researcher & Engineer",
    url: `${SITE_URL}/jeffreyotoibhi`,
    image: `${SITE_URL}/jeffrey.jpg`,
    email: "mailto:jeffreyotoibhi@gmail.com",
    telephone: "+2349061554618",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    worksFor: {
      "@type": "Organization",
      name: "Aletheia Research Labs",
      url: SITE_URL,
    },
    sameAs: [
      "https://www.linkedin.com/in/jeffreyotoibhi/",
      "https://github.com/pauljeffrey",
      "https://twitter.com/Jeffreypaul_",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Healthcare AI",
      "Natural Language Processing",
      "Robotics",
      "RLHF",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
