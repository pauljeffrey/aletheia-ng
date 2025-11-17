"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ExpandableCardDemo } from "@/components/ui/expandable-card";

export const Product = () => {
  const sectionRef = useRef(null);
  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  return (
    <section
      ref={sectionRef}
      className="bg-bg-dark py-32 overflow-x-clip relative"
    >
      <div className="absolute inset-0 bg-gradient-neon pointer-events-none"></div>
      <div className="container relative z-10">
        <div className="section-heading">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title mt-5"
          >
            Our Products/Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-description mt-6"
          >
          Our cadre of experts, with their rich experience in top healthcare institutions and diverse global backgrounds, 
          spearheads innovation and drives change by defying conventional wisdom and envisioning a new healthcare epoch.
          </motion.p>
        </div>
        <div className="relative mt-16">
          <ExpandableCardDemo />
        </div>
      </div>
    </section>
  );
};
