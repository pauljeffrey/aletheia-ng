import { ArrowRight } from "@/components/icons/ArrowRight";
import Logo from "@/assets/Aletheia.png";
import Image from "next/image";
import { MenuIcon } from "@/components/icons/MenuIcon";


export const Header = () => {
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
          <div className="flex items-center justify-between">
            <a href="/" className="hover:scale-105 transition-transform">
              <Image src={Logo} alt="Aletheia Logo" height={70} width={70} className="drop-shadow-sm rounded-full" />
            </a>
            <MenuIcon className="h-6 w-6 md:hidden text-text-white cursor-pointer hover:text-primary-green transition-colors" />
            <nav className="hidden md:flex gap-8 text-text-light items-center">
              <a href="/" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">Home</a>
              <a href="/about" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">About</a>
              <a href="/products" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">Products</a>
              <a href="/research" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">Research</a>
              <a href="/services" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">Services</a>
              <a href="/contact" className="hover:text-primary-green hover:scale-105 transition-all duration-200 font-medium">Contact</a>
              <a href="/products/sabiyarn">
                <button className="btn btn-primary text-sm px-5 py-2.5">
                  Try Latest Model
                </button>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
