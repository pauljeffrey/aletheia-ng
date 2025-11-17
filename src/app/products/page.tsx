"use client";

import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "sabiyarn",
    name: "SabiYarn",
    description: "Nigeria's first foundational language model supporting seven indigenous languages. Experience the power of multilingual AI with pretrained, finetuned, and capable models.",
    icon: Sparkles,
    gradient: "from-primary-green to-primary-blue",
    link: "/products/sabiyarn",
    features: ["Multilingual Support", "7 Nigerian Languages", "Pretrained & Finetuned Models", "Chat Interface"],
  },
  {
    id: "ottobiz",
    name: "Ottobiz",
    description: "AI-enhanced market platform that automates key aspects of the sales cycle, from advertising to payment verification and logistics. Built in partnership with Datached.",
    icon: Zap,
    gradient: "from-primary-blue to-cyan",
    link: "/products/ottobiz",
    features: ["Sales Automation", "Payment Verification", "Logistics Management", "AI-Powered Insights"],
  },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-dark pt-20 pb-32">
        <div className="container">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Our Products
            </h1>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              Explore our innovative AI solutions designed to transform businesses and empower communities.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Link href={product.link}>
                    <div className="relative h-full bg-gradient-card border border-primary-green/30 rounded-3xl p-8 hover:border-primary-green/60 transition-all duration-300 hover:shadow-glow-lg overflow-hidden">
                      {/* Background Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-3xl`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${product.gradient} mb-6 shadow-glow`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-text-white mb-4 group-hover:text-primary-green transition-colors">
                          {product.name}
                        </h2>

                        {/* Description */}
                        <p className="text-text-light mb-6 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-sm rounded-full bg-primary-green/10 text-primary-green border border-primary-green/30"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center text-primary-green group-hover:text-cyan transition-colors font-semibold">
                          <span>Learn More</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>

                      {/* Hover Border Glow */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl`}></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-full bg-primary-blue/10 border border-primary-blue/30 text-primary-blue">
              More products coming soon...
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

