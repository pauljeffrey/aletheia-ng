import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { COMPANY_EMAIL } from "@/lib/social";

export default function Contact() {
  return (
    <>
      <Header />
      <section className="py-16 md:py-24 bg-bg-dark">
        <div className="container max-w-3xl">
          <SectionHeader
            title="Contact Us"
            description="Have questions or want to collaborate? Reach out — we respond to partnerships, demos, and research inquiries."
            className="mb-6"
          />
          <div className="text-center text-text-light space-y-2 mb-2">
            <p>
              <strong className="text-text-white">Email:</strong>{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary-green hover:text-cyan transition-colors">
                {COMPANY_EMAIL}
              </a>
            </p>
            <p>
              <strong className="text-text-white">Phone:</strong> +234 902 772 8309
            </p>
          </div>
          <ContactForm />
          <p className="text-center text-text-medium text-sm mt-8">
            For Dr. Jeffrey Otoibhi&apos;s personal profile, visit{" "}
            <Link href="/jeffreyotoibhi" className="text-primary-green hover:text-cyan">
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
