"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons/ArrowRight";
import Logo from "@/assets/Aletheia.png";
import Image from "next/image";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { X } from "lucide-react";


const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/research", label: "Research" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 backdrop-blur-xl bg-bg-dark-secondary/95 border-b border-primary-green/20 z-50 glass-effect shadow-lg">
      <div className="flex justify-center items-center py-2.5 bg-gradient-hover text-white text-sm gap-3">
        <p className="text-white/95 hidden md:block md:max-w-md lg:max-w-3xl text-center">
          We envision a future where cutting-edge artificial intelligence and engineering transforms lives, empowers businesses, and drives sustainable development.
        </p>
        <div className="inline-flex gap-1 items-center hover:scale-105 transition-transform cursor-pointer">
          <p className="font-medium">Learn more</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <a href="/" className="hover:scale-105 transition-transform">
              <Image src={Logo} alt="Aletheia Logo" height={70} width={70} className="drop-shadow-sm rounded-full" />
            </a>
            <button
              className="md:hidden text-text-white hover:text-primary-green transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <nav className="hidden md:flex gap-8 text-text-light items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a href="/products/sabiyarn">
                <button className="btn btn-primary text-sm px-5 py-2.5">
                  Try Latest Model
                </button>
              </a>
            </nav>
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 w-full mt-4 shadow-xl border border-primary-green/30 rounded-2xl bg-bg-dark-secondary/95 backdrop-blur-xl overflow-hidden">
                <nav className="flex flex-col divide-y divide-primary-green/20 text-text-light">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="px-5 py-4 hover:bg-primary-green/10 hover:text-primary-green font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a href="/products/sabiyarn" onClick={closeMobileMenu} className="px-5 py-4">
                    <button className="btn btn-primary w-full">
                      Try Latest Model
                    </button>
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
