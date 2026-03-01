"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WellsFargoCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        relative z-10 w-72 sm:w-80 rotate-1
        backdrop-blur-md bg-white/[0.1] border border-white/[0.12] rounded-2xl
        p-3.5 flex items-start gap-3
        transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
      `}
    >
      <div className="w-9 h-9 rounded-xl shrink-0 overflow-hidden">
        <Image
          src="/assets/wflogo.png"
          alt="Wells Fargo"
          width={36}
          height={36}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white/90">
            Wells Fargo
          </span>
          <span className="text-xs text-white/50">now</span>
        </div>
        <p className="text-xs text-white/70 mt-0.5">
          You have been charged $9.99 for Hulu.
        </p>
      </div>
    </div>
  );
}
