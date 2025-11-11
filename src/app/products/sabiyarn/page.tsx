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
      <div className="min-h-screen bg-bg-dark pt-8 pb-8">
        <div className="container py-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              SabiYarn Models
            </h1>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Experience the power of our AI models. Choose from pretrained and finetuned models or interact with our newer, more capable models.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-bg-card backdrop-blur-sm rounded-xl p-1 shadow-lg border border-primary-green/30">
              <button
                onClick={() => setActiveTab("pretrained")}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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

          {/* Tab Content - Much bigger chat window */}
          <div className="bg-gradient-card backdrop-blur-sm rounded-2xl shadow-xl border border-primary-green/30 overflow-hidden" style={{ height: "calc(100vh - 200px)", minHeight: "800px" }}>
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

