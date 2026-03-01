"use client";

import LeaderboardTable from "@/components/LeaderboardTable";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold">Cancellation Leaderboard</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          Services ranked by how hard they make it to cancel. Higher score =
          harder to cancel.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <LeaderboardTable />
      </div>

      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <h2 className="font-semibold">How Difficulty is Scored (1-10)</h2>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>Base score from number of steps/clicks to cancel</li>
          <li>+2 if cancel is not on main settings page</li>
          <li>+2 if retention offer or dark pattern detected</li>
          <li>+3 if phone call required</li>
          <li>+1 if requires chat with support</li>
          <li>+1 if multi-page flow</li>
        </ul>
      </div>
    </div>
  );
}
