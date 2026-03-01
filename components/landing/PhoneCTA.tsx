"use client";

import { useEffect, useState } from "react";

export default function PhoneCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center space-y-2 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-neutral-500 text-xs">
        email us the service you want a free trial for and we&apos;ll send you login info
      </p>
      <a
        href="mailto:notatrial@agentmail.to"
        className="block text-2xl md:text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
      >
        notatrial@agentmail.to
      </a>
    </div>
  );
}
