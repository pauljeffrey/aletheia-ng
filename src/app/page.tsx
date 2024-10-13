import { CallToAction } from "@/sections/CallToAction";
import { CaseStudy } from "@/sections/CaseStudy";
import { Features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Team } from "@/sections/Team";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Team />
      <CaseStudy />
      <CallToAction />
      <Footer />
    </>
);
}
