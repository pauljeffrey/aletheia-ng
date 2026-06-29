"use client";

import { COMPANY_EMAIL } from "@/lib/social";
import { FormEvent } from "react";

const INTEREST_OPTIONS = [
  "Partnership",
  "Product demo",
  "Research collaboration",
  "Consulting",
  "General inquiry",
] as const;

type Interest = (typeof INTEREST_OPTIONS)[number];

interface ContactFormProps {
  defaultInterest?: string;
}

export function ContactForm({ defaultInterest }: ContactFormProps) {
  const initialInterest = INTEREST_OPTIONS.includes(defaultInterest as Interest)
    ? (defaultInterest as Interest)
    : "General inquiry";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const interest = String(data.get("interest") ?? "General inquiry");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Aletheia inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
    );

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4 text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-light mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-white placeholder:text-text-medium focus:outline-none focus:border-border transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-light mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-white placeholder:text-text-medium focus:outline-none focus:border-border transition-colors"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-text-light mb-1.5">
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue={initialInterest}
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-white focus:outline-none focus:border-border transition-colors"
        >
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-light mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-white placeholder:text-text-medium focus:outline-none focus:border-border transition-colors resize-y"
          placeholder="Tell us about your project or question..."
        />
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Send message
      </button>
      <p className="text-xs text-text-medium leading-relaxed">
        Submitting opens your email app with a pre-filled message to{" "}
        <span className="text-text-light">{COMPANY_EMAIL}</span>. You&apos;ll need to press send
        in your mail app — nothing is sent automatically from this site.
      </p>
    </form>
  );
}
