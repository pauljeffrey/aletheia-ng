"use client";

import Link from "next/link";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { ExpandableCardDemo } from "@/components/ui/expandable-card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const Product = () => {
  const sectionRef = useRef(null);
  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="bg-bg-dark py-16 sm:py-24 md:py-32 overflow-x-clip border-t border-border-subtle">
      <div className="container">
        <SectionHeader
          title="Our Products"
          description="From SabiYarn's multilingual foundation models to agentic platforms and healthcare innovations — explore what we've built and shipped."
          className="mb-4"
        />
        <p className="text-center text-sm text-text-medium mb-12">
          <Link href="/products" className="text-primary-green hover:text-accent-green transition-colors">
            View all products →
          </Link>
        </p>
        <ExpandableCardDemo />
      </div>
    </section>
  );
};
