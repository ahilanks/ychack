"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertTriangle, ExternalLink } from "lucide-react";

function DifficultyBar({ score }: { score: number }) {
  let color = "bg-green-500";
  if (score >= 7) color = "bg-red-500";
  else if (score >= 4) color = "bg-yellow-500";

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-sm font-bold">{score}</span>
    </div>
  );
}

function TacticBadge({ tactic }: { tactic: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-destructive/10 text-destructive border border-destructive/20">
      <AlertTriangle className="h-3 w-3" />
      {tactic}
    </span>
  );
}

export default function LeaderboardTable() {
  const entries = useQuery(api.leaderboard.list);

  if (entries === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No data yet</p>
        <p className="text-sm mt-1">
          Cancel some trials to see services ranked by difficulty.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Rank
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Service
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Difficulty
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Attempts
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Dark Patterns
            </th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {entries.map((entry: any, index: number) => (
            <tr
              key={entry._id}
              className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <td className="py-3 px-4">
                <span className="text-lg font-bold text-muted-foreground">
                  #{index + 1}
                </span>
              </td>
              <td className="py-3 px-4">
                <div>
                  <span className="font-medium">{entry.serviceName}</span>
                  <a
                    href={entry.serviceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1.5 inline-flex text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </td>
              <td className="py-3 px-4">
                <DifficultyBar score={entry.avgDifficulty} />
              </td>
              <td className="py-3 px-4 text-sm">{entry.totalAttempts}</td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {entry.commonTactics.map((tactic: string) => (
                    <TacticBadge key={tactic} tactic={tactic} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
