import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/synergy.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg"


export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block md:max-w-md lg:max-w-3xl">We envision a future where cutting-edge artificial intelligence and engineering transforms lives, empowers businesses, and drives sustainable development.</p>
        <div className="inline-flex gap-1 items-center">
          <p>Learn more</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <a href="/Aletheia.png"><Image src={Logo} alt="Saas Logo" height={80} width={80} /></a>
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/">Home</a>
              <a href="about">About</a>
              <a href="research">Research</a>
              <a href="services">Services</a>
              <a href="contact">Contact</a>
              <a href="product"><button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">Try latest model</button></a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
