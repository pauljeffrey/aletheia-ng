"use client";

import { ArrowRight as ArrowIcon } from "@/components/icons/ArrowRight";
import { motion } from "framer-motion";
import { Sparkles, Zap, Brain, Code2, Settings, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-20 pb-32 md:pt-24 md:pb-40 bg-gradient-hero overflow-hidden relative min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 165, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 184, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-green/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan/25 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 backdrop-blur-sm border border-primary-green/30 mb-6 hover:scale-105 transition-transform hover:shadow-glow max-w-4xl mx-auto"
          >
            <Sparkles className="w-4 h-4 text-primary-green animate-pulse flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-text-white text-center">
              AI Models • Data Analytics • Robotics • AI Software Development • AI Strategy • AI Governance
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Innovating Today</span>
            <br />
            <span className="text-text-white">for a Smarter Tomorrow</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-light mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Rooted in innovation and inclusivity, we aim to bridge the gap between technology and humanity by creating AI solutions tailored to diverse cultural, linguistic, business and industrial landscapes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a href="/products/sabiyarn" className="group">
              <button className="btn btn-primary group-hover:shadow-glow-lg">
                Try Latest Model
                <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </a>
            <a href="/research" className="group">
              <button className="btn btn-text text-primary-green hover:text-cyan">
                <span>Learn More</span>
                <ArrowIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mt-16"
          >
            {[
              { icon: Brain, label: "AI Models", color: "text-primary-green" },
              { icon: Code2, label: "Data Analytics", color: "text-primary-blue" },
              { icon: Zap, label: "Robotics", color: "text-cyan" },
              { icon: Code2, label: "AI Powered Software Development", color: "text-primary-green" },
              { icon: Settings, label: "AI Strategy", color: "text-primary-blue" },
              { icon: Shield, label: "AI Governance", color: "text-cyan" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-card backdrop-blur-sm border border-primary-green/30 flex items-center justify-center group-hover:shadow-glow group-hover:border-primary-green/60 transition-all duration-300">
                  <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-text-light group-hover:text-text-white transition-colors text-center max-w-[120px]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
