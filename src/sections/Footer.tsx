import Image from "next/image";
import logo from "@/assets/synergy.png";

export const Footer = () => {
  return (
    <footer className="bg-white text-[#00008B] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:absolute">
        <a href="/"><Image src={logo} height={80} alt="Synergy logo" className="relative" /></a>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="about">About</a>
          <a href="research">Research</a>
          <a href="services">Services</a>
          <a href="contact">Contact</a>
        </nav>
        {/* <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialLinkedIn />
          <SocialPin />
          <SocialYoutube />
        </div> */}
        <p className="mt-6">
          &copy; 2025 Aletheia Research Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
