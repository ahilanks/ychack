"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Notification {
  app: string;
  logo: string;
  time: string;
  message: string;
  position: string;
  behind: boolean;
  bright?: boolean;
  logoSize?: number;
  logoZoom?: boolean;
}

const notifications: Notification[] = [
  {
    app: "Chase",
    logo: "/assets/chase.jpg",
    time: "2m ago",
    message: "Purchase of $15.99 at Netflix.com",
    position: "top-[6%] right-[3%] rotate-3",
    behind: false,
  },
  {
    app: "Bank of America",
    logo: "/assets/bofalogo.png",
    time: "5m ago",
    message: "Debit card charge: Spotify $10.99",
    position: "bottom-[28%] left-[6%] rotate-2",
    behind: true,
  },
  {
    app: "TD Bank",
    logo: "/assets/td.jpg",
    time: "12m ago",
    message: "Alert: $54.99 charge from Adobe Creative Cloud",
    position: "top-[18%] left-[3%] -rotate-3",
    behind: false,
    logoSize: 36,
    logoZoom: true,
  },
  {
    app: "Capital One",
    logo: "/assets/caponelogo.jpg",
    time: "18m ago",
    message: "Transaction alert: $6.99 at Paramount+",
    position: "bottom-[20%] right-[5%] rotate-1",
    behind: false,
  },
];

export default function NotificationStack() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {notifications.map((n, i) => (
        <div
          key={i}
          className={`
            absolute ${n.position}
            ${n.behind ? "z-0" : "z-0"}
            w-72 sm:w-80
            backdrop-blur-md bg-white/[0.06] border border-white/[0.08] rounded-2xl
            p-3.5 flex items-start gap-3
            transition-all duration-1000 ease-out
            pointer-events-none
            ${
              visible
                ? `${n.bright ? "opacity-90" : n.behind ? "opacity-[0.3]" : "opacity-[0.55]"} translate-y-0`
                : "opacity-0 -translate-y-6"
            }
          `}
        >
          <div className="w-9 h-9 rounded-xl shrink-0 overflow-hidden relative">
            <Image
              src={n.logo}
              alt={n.app}
              width={n.logoSize ?? 36}
              height={n.logoSize ?? 36}
              className={`object-cover ${n.logoZoom ? "scale-[1.3]" : ""}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white/60">
                {n.app}
              </span>
              <span className="text-xs text-white/30">{n.time}</span>
            </div>
            <p className="text-xs text-white/40 mt-0.5">{n.message}</p>
          </div>
        </div>
      ))}
    </>
  );
}
