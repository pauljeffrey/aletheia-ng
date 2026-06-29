"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { Sparkles, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-dark pt-20 pb-32">
        <div className="container max-w-4xl">
          <SectionHeader
            title="Our Products"
            description="Explore our innovative AI solutions designed to transform businesses and empower communities."
            className="mb-14"
          />

          <Link href="/products/sabiyarn" className="group block">
            <article className="relative bg-gradient-card border border-primary-green/30 rounded-3xl p-8 md:p-10 hover:border-primary-green/60 transition-all duration-300 hover:shadow-glow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 to-primary-blue/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-hover mb-5 shadow-glow">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-text-white mb-3 group-hover:text-primary-green transition-colors">
                    SabiYarn
                  </h2>
                  <p className="text-text-light leading-relaxed mb-6">
                    Nigeria&apos;s first foundational language model supporting seven indigenous languages. Experience pretrained, finetuned, and capable models with live chat interfaces.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Multilingual", "7 Nigerian Languages", "Pretrained & Finetuned", "Chat Interface"].map((f) => (
                      <span key={f} className="px-3 py-1 text-sm rounded-full bg-primary-green/10 text-primary-green border border-primary-green/30">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-primary-green font-semibold group-hover:text-cyan transition-colors">
                    Try SabiYarn <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <Image
                  src="/sabiyarn_ai.png"
                  alt="SabiYarn"
                  width={280}
                  height={280}
                  className="rounded-2xl border border-primary-green/20 w-full md:w-64 h-auto object-cover shrink-0"
                />
              </div>
            </article>
          </Link>

          <p className="mt-12 text-center text-text-medium text-sm">
            More products launching soon. See the{" "}
            <Link href="/jeffreyotoibhi?tab=portfolio" className="text-primary-green hover:text-cyan">
              founder portfolio
            </Link>{" "}
            for in-progress work including Ottobiz and STUD.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
