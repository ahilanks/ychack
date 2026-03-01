"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const notifications = [
  {
    icon: AlertTriangle,
    text: "Adobe trial expires in 2 days",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: CheckCircle,
    text: "Hulu trial canceled successfully",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    icon: Clock,
    text: "Spotify trial — 5 days remaining",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
];

export default function NotificationStack() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers = notifications.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, 800 + i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 w-80">
      {notifications.map((n, i) => {
        const Icon = n.icon;
        return (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-500 ${n.bg} ${
              visible.includes(i)
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${n.color}`} />
            <span className="text-neutral-200">{n.text}</span>
          </div>
        );
      })}
    </div>
  );
}
