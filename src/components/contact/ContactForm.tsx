"use client";

import { COMPANY_EMAIL } from "@/lib/social";
import { FormEvent } from "react";

export function ContactForm() {
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
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-primary-green/30 text-text-white placeholder:text-text-medium focus:outline-none focus:border-primary-green transition-colors"
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
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-primary-green/30 text-text-white placeholder:text-text-medium focus:outline-none focus:border-primary-green transition-colors"
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
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-primary-green/30 text-text-white focus:outline-none focus:border-primary-green transition-colors"
        >
          <option value="Partnership">Partnership</option>
          <option value="Product demo">Product demo</option>
          <option value="Research collaboration">Research collaboration</option>
          <option value="Consulting">Consulting</option>
          <option value="General inquiry">General inquiry</option>
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
          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-primary-green/30 text-text-white placeholder:text-text-medium focus:outline-none focus:border-primary-green transition-colors resize-y"
          placeholder="Tell us about your project or question..."
        />
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Send message
      </button>
    </form>
  );
}
