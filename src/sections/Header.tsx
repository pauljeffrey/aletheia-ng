"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/Aletheia.png";
import Image from "next/image";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { X } from "lucide-react";
import { NAV_LINKS, isActivePath } from "@/lib/nav";
import { twMerge } from "tailwind-merge";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const linkClass = (href: string) =>
    twMerge(
      "text-sm font-medium transition-colors duration-200 py-1",
      isActivePath(pathname, href)
        ? "text-text-white"
        : "text-text-medium hover:text-text-light"
    );

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-[4.5rem] relative">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity min-w-0">
            <Image
              src={Logo}
              alt="Aletheia Research Labs"
              height={36}
              width={36}
              className="rounded-full shrink-0"
            />
            <span className="text-sm font-medium text-text-white tracking-tight truncate">
              Aletheia
            </span>
          </Link>

          <button
            className="md:hidden text-text-light hover:text-text-white transition-colors p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>

          <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <Link href="/products/sabiyarn" className="btn btn-primary whitespace-nowrap">
              Try SabiYarn
            </Link>
          </nav>

          {isMobileMenuOpen && (
            <>
              <div
                className="md:hidden fixed inset-0 top-14 sm:top-16 bg-black/50 z-40"
                onClick={closeMobileMenu}
                aria-hidden
              />
              <div className="md:hidden fixed top-14 sm:top-16 left-0 right-0 z-50 surface-card overflow-hidden shadow-elevated max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
                <nav className="flex flex-col py-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={twMerge("px-5 py-3.5", linkClass(link.href))}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="px-5 py-4 border-t border-border-subtle">
                    <Link href="/products/sabiyarn" onClick={closeMobileMenu} className="btn btn-primary w-full justify-center">
                      Try SabiYarn
                    </Link>
                  </div>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
