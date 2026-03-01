"use client";

import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface Trial {
  _id: string;
  name: string;
  status: "active" | "canceled";
  cancelBy?: number;
  startDate?: number;
}

export default function TrialCard({ trial }: { trial: Trial }) {
  const daysLeft = trial.cancelBy
    ? Math.ceil((trial.cancelBy - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const isExpiring = daysLeft !== null && daysLeft <= 3 && trial.status === "active";

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{trial.name}</h3>
        {trial.status === "canceled" ? (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <CheckCircle className="h-3 w-3" />
            Canceled
          </span>
        ) : isExpiring ? (
          <span className="flex items-center gap-1 text-xs text-yellow-400">
            <AlertTriangle className="h-3 w-3" />
            Expiring
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-green-400">
            <Clock className="h-3 w-3" />
            Active
          </span>
        )}
      </div>
      {daysLeft !== null && trial.status === "active" && (
        <p className="text-sm text-muted-foreground">
          {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left` : "Expires today"}
        </p>
      )}
    </div>
  );
}
