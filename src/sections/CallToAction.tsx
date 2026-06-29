"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const CallToAction = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-bg-dark-secondary py-16 sm:py-24 md:py-32 overflow-x-clip border-t border-border-subtle">
      <div className="container">
        <SectionHeader
          title="Work with us today"
          description="We're building meaningful impact through AI — whether you're an investor, a business integrating AI, an organization solving hard problems, or a team seeking expert consulting, Aletheia Research Labs is ready to collaborate."
          className="mb-10"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
        >
          <Link href="/contact" className="btn btn-primary">
            Get started
          </Link>
          <Link href="/contact?interest=Consulting" className="btn btn-secondary">
            Consult with us
          </Link>
          <Link href="/about" className="btn btn-text group">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
