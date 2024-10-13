"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import diabetesImage  from "@/assets/diabetes.jpg"
import sleepImage from "@/assets/sleep.jpg"

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Nutritional Intervention for Type 2 Diabetes Prevention in At-Risk Adults
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          An 18-month randomized controlled trial investigating the effectiveness of a plant-based diet 
          and nutrition education program in preventing the onset of type 2 diabetes in individuals with prediabetes.
          </p>
        </div>
        <Image
          src={diabetesImage}
          width={500}
          height={500}
          alt="diabetes image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-green-900">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        The Impact of Mindfulness Meditation on Chronic Pain Management
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        A 12-week study examining how daily mindfulness meditation practices affect pain perception 
        and quality of life in patients with chronic lower back pain.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[300px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Sleep Hygiene Education and Its Effects on 
          Adolescent Academic Performance
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Evaluating the impact of a comprehensive sleep hygiene education program on 
          sleep quality, duration, and academic performance in high school students.
          </p>
        </div>
        <Image
          src={sleepImage}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
