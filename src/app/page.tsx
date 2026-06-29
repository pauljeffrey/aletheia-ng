import { CallToAction } from "@/sections/CallToAction";
import { Features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Highlights } from "@/sections/Highlights";
import { Product } from "@/sections/Product";
import { ProofBar } from "@/sections/ProofBar";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProofBar />
      <Features />
      <Product />
      <Highlights />
      <CallToAction />
      <Footer />
    </>
  );
}
