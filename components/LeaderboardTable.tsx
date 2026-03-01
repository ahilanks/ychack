"use client";

import Image from "next/image";

const leaderboard = [
  {
    rank: 1,
    name: "Wells Fargo",
    logo: "/wflogo.png",
    difficulty: 9.2,
    reason: "Phone call required, 3 retention screens",
  },
  {
    rank: 2,
    name: "Bank of America",
    logo: "/bofalogo.png",
    difficulty: 8.7,
    reason: "Multi-page flow, hidden cancel link",
  },
  {
    rank: 3,
    name: "Chase",
    logo: "/chase.jpg",
    difficulty: 7.5,
    reason: "Support chat required, retention offer",
  },
  {
    rank: 4,
    name: "Capital One",
    logo: "/caponelogo.jpg",
    difficulty: 6.3,
    reason: "Cancel buried in sub-settings",
  },
  {
    rank: 5,
    name: "TD Bank",
    logo: "/td.jpg",
    difficulty: 5.8,
    reason: "Multi-step with dark patterns",
  },
];

export default function LeaderboardTable() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-muted-foreground">
          <th className="px-4 py-3 font-medium">#</th>
          <th className="px-4 py-3 font-medium">Service</th>
          <th className="px-4 py-3 font-medium">Difficulty</th>
          <th className="px-4 py-3 font-medium hidden sm:table-cell">Why</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((entry) => (
          <tr
            key={entry.rank}
            className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
          >
            <td className="px-4 py-3 font-mono text-muted-foreground">
              {entry.rank}
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Image
                  src={entry.logo}
                  alt={entry.name}
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="font-medium">{entry.name}</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <span
                className={`font-bold ${
                  entry.difficulty >= 8
                    ? "text-red-400"
                    : entry.difficulty >= 6
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {entry.difficulty}
              </span>
              <span className="text-muted-foreground">/10</span>
            </td>
            <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
              {entry.reason}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
