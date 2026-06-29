"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-bg-card border border-border-subtle min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-xl lg:text-2xl font-medium text-text-white">
            STUD
          </h2>
          <p className="mt-4 text-left text-base/6 text-text-medium">
            Gamified medical education — master medicine through clinical adventures built for the next generation of clinicians.
          </p>
        </div>
        <Image
          src="/stud.png"
          width={280}
          height={280}
          alt="STUD logo"
          className="absolute -right-4 lg:-right-[30%] -bottom-6 object-contain opacity-90 max-h-[75%] w-auto"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-bg-card border border-border-subtle">
        <h2 className="max-w-xs text-left text-xl lg:text-2xl font-medium text-text-white">
          SabiYarn-125M
        </h2>
        <p className="mt-4 text-left text-base/6 text-text-medium">
          Nigeria&apos;s first decoder-only foundational language model — seven indigenous languages, production-ready NLP.
        </p>
        <Image
          src="/sabiyarn_ai.png"
          width={200}
          height={200}
          alt=""
          className="absolute -right-2 -bottom-4 opacity-20 object-contain"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-bg-card border border-border-subtle min-h-[280px]">
        <div className="max-w-2xl">
          <h2 className="text-left text-balance text-xl lg:text-2xl font-medium text-text-white">
            Agentic &amp; Multilingual Systems
          </h2>
          <p className="mt-4 text-left text-base/6 text-text-medium">
            From West African MT with RLHF to agentic commerce and clinical AI — Aletheia ships research-backed products, not slides.
          </p>
          <a href="/jeffreyotoibhi?tab=portfolio" className="inline-block mt-4 text-primary-green hover:text-accent-green text-sm font-medium">
            View founder portfolio →
          </a>
        </div>
      </WobbleCard>
    </div>
  );
}
