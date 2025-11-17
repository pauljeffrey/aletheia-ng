"use client";

import { useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { PretrainedModelsTab } from "@/components/products/PretrainedModelsTab";
import { CapableModelsTab } from "@/components/products/CapableModelsTab";

export default function SabiYarnPage() {
  const [activeTab, setActiveTab] = useState<"pretrained" | "capable">("pretrained");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-dark pt-6 pb-10">
        <div className="container px-4 lg:px-6">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text">
              SabiYarn Models
            </h1>
            <p className="text-base md:text-lg text-text-light max-w-3xl mx-auto">
              Experience the power of our AI models. Choose from pretrained and finetuned models or interact with our newer, more capable models.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-wrap bg-bg-card backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-primary-green/30 gap-2">
              <button
                onClick={() => setActiveTab("pretrained")}
                className={`px-5 md:px-8 py-2.5 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ${
                  activeTab === "pretrained"
                    ? "bg-gradient-hover text-white shadow-glow scale-105"
                    : "text-text-light hover:text-primary-green hover:bg-bg-dark-secondary"
                }`}
              >
                Pretrained & Finetuned Models
              </button>
              <button
                onClick={() => setActiveTab("capable")}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "capable"
                    ? "bg-gradient-hover text-white shadow-glow scale-105"
                    : "text-text-light hover:text-primary-green hover:bg-bg-dark-secondary"
                }`}
              >
                Newer, More Capable Models
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div
            className="bg-gradient-card backdrop-blur-sm rounded-2xl shadow-xl border border-primary-green/30 overflow-hidden"
          >
            {activeTab === "pretrained" ? (
              <PretrainedModelsTab />
            ) : (
              <CapableModelsTab />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

