"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, AlertTriangle } from "lucide-react";

const steps = [
  "Navigate to account settings…",
  "Searching for cancel option…",
  "Hidden behind 3 retention screens…",
  "Cancellation complete!",
];

export default function WellsFargoCard() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || step >= steps.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [started, step]);

  return (
    <div className="relative z-10 w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/wflogo.png"
            alt="Wells Fargo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <div>
            <p className="text-sm font-medium text-neutral-200">
              Wells Fargo Premium
            </p>
            <p className="text-xs text-neutral-500">Free trial — 2 days left</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 text-xs text-yellow-400">
          <AlertTriangle className="h-3 w-3" />
          Expiring
        </span>
      </div>

      {started && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Auto-canceling…</span>
            <span>
              {step + 1}/{steps.length}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-700"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400">{steps[step]}</p>
          {step === steps.length - 1 && (
            <div className="flex items-center gap-2 text-xs text-green-400 mt-1">
              <X className="h-3 w-3" />
              Trial canceled — you won&apos;t be charged
            </div>
          )}
        </div>
      )}
    </div>
  );
}
