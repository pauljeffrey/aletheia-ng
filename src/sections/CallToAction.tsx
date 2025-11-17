"use client";
import { ArrowRight } from "@/components/icons/ArrowRight";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className="bg-bg-dark py-32 overflow-x-clip relative"
    >
      <div className="absolute inset-0 bg-gradient-neon pointer-events-none"></div>
      <div className="container relative z-10">
        <div className="section-heading relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Work with us today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-description mt-6 text-text-light"
          >
          We are on a mission to create meaningful impact through AI, and we're looking for visionary partners to join us on this journey. Whether you are an investor, business aiming to integrate AI into your workflow or an organization seeking to solve complex challenges, Aletheia AI is here to help.
          Let's build the future together.
          </motion.p>
          <motion.div
            className="absolute -left-[300px] -top-[100px] hidden lg:block"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-64 h-64 bg-primary-blue/20 rounded-full blur-3xl"></div>
          </motion.div>
          <motion.div
            className="absolute -right-[300px] -top-[50px] hidden lg:block"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-80 h-80 bg-primary-green/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
        >
          <button className="btn btn-primary group">
            Get started
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.span>
          </button>
          <button className="btn btn-text text-primary-green hover:text-cyan group">
            <span>Learn more</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
