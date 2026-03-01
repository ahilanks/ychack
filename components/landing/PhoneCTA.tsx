"use client";

import { Phone } from "lucide-react";

export default function PhoneCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <a
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        Get Started Free
      </a>
      <a
        href="tel:+18005551234"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 hover:border-neutral-500 transition-colors"
      >
        <Phone className="h-4 w-4" />
        Talk to Us
      </a>
    </div>
  );
}
