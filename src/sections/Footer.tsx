import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import { SITE_LOGO, SITE_LOGO_ALT } from "@/lib/site";
import { SOCIAL_LINKS } from "@/lib/social";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-dark-secondary py-10 sm:py-14">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex hover:opacity-90 transition-opacity">
              <Image
                src={SITE_LOGO}
                alt={SITE_LOGO_ALT}
                width={180}
                height={52}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-text-medium mt-4 leading-relaxed">
              Foundational AI for underrepresented languages. Research-grade engineering, built to ship.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-medium hover:text-text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 pt-8 border-t border-border-subtle">
          <p className="text-xs text-text-medium">&copy; {year} Aletheia Research Labs</p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-medium hover:text-text-white hover:border-border transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
