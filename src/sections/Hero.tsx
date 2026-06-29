"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-bg-dark bg-gradient-hero">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center px-1">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tag mb-6 sm:mb-8 text-[10px] sm:text-xs"
          >
            Research-first AI · Global impact
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[2rem] leading-[1.12] sm:text-4xl md:text-6xl lg:text-7xl text-text-white tracking-tight mb-5 sm:mb-6"
          >
            Innovating Today
            <span className="block text-primary-green italic mt-1">for a Smarter Tomorrow</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-text-medium max-w-2xl mx-auto leading-relaxed mb-4 px-1"
          >
            Rooted in innovation and inclusivity, we bridge the gap between technology and humanity — creating AI solutions tailored to diverse cultural, linguistic, business, and industrial landscapes.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-light max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 px-1"
          >
            A research-first approach to hard problems.{" "}
            <span className="text-primary-green">AI that speaks every language.</span>
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-none mx-auto"
          >
            <Link href="/products/sabiyarn" className="btn btn-primary px-6 py-3 text-sm sm:text-base w-full sm:w-auto">
              Explore SabiYarn-125M
              <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
            </Link>
            <Link href="/jeffreyotoibhi?tab=portfolio" className="btn btn-text px-6 py-3 text-sm sm:text-base w-full sm:w-auto">
              View our work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-border-subtle"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { value: "7+", label: "Indigenous languages" },
              { value: "ACL '25", label: "Published research" },
              { value: "48%", label: "Benchmark lift vs GPT-4" },
              { value: "4+", label: "Shipped products" },
            ].map((item) => (
              <div key={item.label} className="text-center md:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-display text-text-white">{item.value}</p>
                <p className="text-[10px] sm:text-xs text-text-medium mt-1 uppercase tracking-wider leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
