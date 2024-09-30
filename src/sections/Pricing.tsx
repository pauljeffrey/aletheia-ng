"use client";
import React from 'react';

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing: React.FC = () => {
  return (
    <div className="pricing-container">
      {pricingTiers.map((tier, index) => (
        <div key={`tier-${index}`} className={`pricing-tier ${tier.popular ? 'popular' : ''} ${tier.inverse ? 'inverse' : ''}`}>
          <h3>{tier.title}</h3>
          <p className="price">${tier.monthlyPrice}/month</p>
          <ul>
            {tier.features.map((feature, featureIndex) => (
              <li key={`feature-${index}-${featureIndex}`}>{feature}</li>
            ))}
          </ul>
          <button>{tier.buttonText}</button>
        </div>
      ))}
    </div>
  );
};
