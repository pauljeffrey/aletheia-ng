import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}
