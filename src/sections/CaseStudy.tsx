"use client";
import React from "react";
import { WobbleCardDemo } from "@/components/Card";


export const CaseStudy: React.FC = () => {
  return (
    <section className="bg-white pt-10">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Featured Insights</div>
          </div>
          <h2 className="section-title mt-5">Our Case Studies</h2>
        </div>
        <div className="flex justify-center gap-6 mt-10">
            <WobbleCardDemo />
        </div>
      </div>
    </section>
  );
};
