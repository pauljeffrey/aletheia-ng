import Image from "next/image";
import Logo from "@/assets/Aletheia.png";

export const Footer = () => {
  return (
    <footer className="bg-gradient-hover text-white text-sm py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="container relative z-10">
        <div className="inline-flex mb-6">
          <a href="/" className="hover:scale-110 transition-transform">
            <Image src={Logo} height={70} width={70} alt="Aletheia logo" className="drop-shadow-lg rounded-full" />
          </a>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 mt-6">
          <a href="/about" className="hover:text-cyan hover:scale-105 transition-all duration-200 font-medium">About</a>
          <a href="/products" className="hover:text-cyan hover:scale-105 transition-all duration-200 font-medium">Products</a>
          <a href="/research" className="hover:text-cyan hover:scale-105 transition-all duration-200 font-medium">Research</a>
          <a href="/services" className="hover:text-cyan hover:scale-105 transition-all duration-200 font-medium">Services</a>
          <a href="/contact" className="hover:text-cyan hover:scale-105 transition-all duration-200 font-medium">Contact</a>
        </nav>
        <p className="mt-8 text-white/90">
          &copy; 2025 Aletheia Research Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
