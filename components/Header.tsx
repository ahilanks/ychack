import Link from "next/link";
import { Shield, LayoutDashboard, Trophy } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Shield className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">NotATrial</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
