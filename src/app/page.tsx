import { CallToAction } from "@/sections/CallToAction";
import { Features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Product } from "@/sections/Product";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Product />
      <CallToAction />
      <Footer />
    </>
);
}
