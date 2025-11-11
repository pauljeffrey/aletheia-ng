"use client";

import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, DollarSign, Truck, Shield, TrendingUp } from "lucide-react";

export default function OttobizPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-dark pt-20 pb-32">
        <div className="container">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Ottobiz
            </h1>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              AI-enhanced market platform that automates key aspects of the sales cycle, from advertising to payment verification and logistics.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: ShoppingCart,
                title: "Sales Automation",
                description: "Streamline your sales process with intelligent automation that handles product inquiries, order processing, and customer interactions.",
                gradient: "from-primary-green to-primary-blue",
              },
              {
                icon: DollarSign,
                title: "Payment Verification",
                description: "Automated payment verification ensures secure and instant transaction processing, reducing fraud and improving customer trust.",
                gradient: "from-primary-blue to-cyan",
              },
              {
                icon: Truck,
                title: "Logistics Management",
                description: "End-to-end logistics automation from order fulfillment to delivery tracking, optimizing supply chain operations.",
                gradient: "from-cyan to-primary-green",
              },
              {
                icon: Shield,
                title: "Security & Trust",
                description: "Built-in security features protect both buyers and sellers, ensuring safe transactions and data protection.",
                gradient: "from-primary-green to-primary-blue",
              },
              {
                icon: TrendingUp,
                title: "AI-Powered Insights",
                description: "Leverage data-driven insights to understand market trends, customer behavior, and optimize your business strategy.",
                gradient: "from-primary-blue to-cyan",
              },
              {
                icon: Zap,
                title: "Boost Efficiency",
                description: "Reduce manual work, improve response times, and increase revenue through intelligent automation and data insights.",
                gradient: "from-cyan to-primary-green",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <div className="relative h-full bg-gradient-card border border-primary-green/30 rounded-3xl p-8 hover:border-primary-green/60 transition-all duration-300 hover:shadow-glow-lg overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-3xl`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-glow`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-text-white mb-4 group-hover:text-primary-green transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Partnership Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-card border border-primary-green/30 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Built in Partnership with Datached
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Ottobiz is being developed in collaboration with Datached, combining cutting-edge AI technology with market expertise to create a transformative e-commerce platform.
            </p>
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-full bg-primary-blue/10 border border-primary-blue/30 text-primary-blue">
              Coming Soon - Stay tuned for updates!
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

