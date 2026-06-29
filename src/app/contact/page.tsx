import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { COMPANY_EMAIL, COMPANY_PHONES } from "@/lib/social";

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;

  return (
    <>
      <Header />
      <section className="py-16 md:py-24 bg-bg-dark">
        <div className="container max-w-3xl">
          <SectionHeader
            title="Contact Us"
            description="Have questions or want to collaborate? Reach out — we respond to partnerships, demos, consulting, and research inquiries."
            className="mb-6"
          />
          <div className="text-center text-text-light space-y-2 mb-2">
            <p>
              <strong className="text-text-white">Email:</strong>{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary-green hover:text-accent-green transition-colors">
                {COMPANY_EMAIL}
              </a>
            </p>
            <p>
              <strong className="text-text-white">Phone:</strong>{" "}
              {COMPANY_PHONES.map((phone, index) => (
                <span key={phone.href}>
                  {index > 0 && " · "}
                  <a href={phone.href} className="text-primary-green hover:text-accent-green transition-colors">
                    {phone.display}
                  </a>
                  <span className="text-text-medium text-xs ml-1">({phone.label})</span>
                </span>
              ))}
            </p>
          </div>
          <ContactForm defaultInterest={interest} />
          <p className="text-center text-text-medium text-sm mt-8">
            For Dr. Jeffrey Otoibhi&apos;s personal profile, visit{" "}
            <Link href="/jeffreyotoibhi" className="text-primary-green hover:text-accent-green">
              /jeffreyotoibhi
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
