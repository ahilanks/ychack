"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield, Trophy } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TrialGuard</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
              pathname === "/leaderboard"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
