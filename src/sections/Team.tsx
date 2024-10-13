"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExpandableCardDemo } from "@/components/ui/expandable-card";

export const Team = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title mt-5">
          Meet Our People
          </h2>
          <p className="section-description mt-5">
          Our cadre of experts, with their rich experience in top healthcare institutions and diverse global backgrounds, 
          spearheads innovation and drives change by defying conventional wisdom and envisioning a new healthcare epoch.
          </p>
        </div>
        <div className="relative">
          <ExpandableCardDemo />
        </div>
      </div>
    </section>
  );
};
