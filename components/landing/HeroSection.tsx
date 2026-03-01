"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center space-y-3 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-neutral-400">
        Oh shiiii*
      </h1>
      <p className="text-base md:text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed">
        You forgot to cancel your free trial. Again. It just hit your
        card. <span className="text-neutral-300 font-medium">NotATrial</span> signs
        up for your free trials, tracks them, and cancels before they charge. You
        do nothing.
      </p>
    </div>
  );
}
