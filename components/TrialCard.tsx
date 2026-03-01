"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Trash2,
  Play,
  Ban,
  ChevronDown,
  ChevronUp,
  Square,
} from "lucide-react";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || "http://localhost:8000";

const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  signing_up: {
    label: "Signing Up",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
  },
  active: {
    label: "Active",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
  },
  canceling: {
    label: "Canceling",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
  },
  canceled: {
    label: "Canceled",
    color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    icon: <Ban className="h-3.5 w-3.5" />,
  },
  failed: {
    label: "Failed",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

function DifficultyBadge({ score }: { score: number }) {
  let color = "text-green-400";
  if (score >= 7) color = "text-red-400";
  else if (score >= 4) color = "text-yellow-400";

  return <span className={`font-bold ${color}`}>{score}/10</span>;
}

export default function TrialCard({ trial }: { trial: Doc<"trials"> }) {
  const [loading, setLoading] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const removeTrial = useMutation(api.trials.remove);
  const updateStatus = useMutation(api.trials.updateStatus);
  const upsertLeaderboard = useMutation(api.leaderboard.upsert);

  const status = statusConfig[trial.status] || statusConfig.pending;

  const daysLeft = trial.cancelBy
    ? Math.max(
        0,
        Math.ceil((trial.cancelBy - Date.now()) / (1000 * 60 * 60 * 24))
      )
    : null;

  const handleStop = async () => {
    try {
      await fetch(`${WORKER_URL}/stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trial_id: trial._id }),
      });
      await updateStatus({
        id: trial._id,
        status: "failed",
        agentLog: (trial.agentLog || "") + "\n\nStopped by user.",
      });
    } catch {
      // Best effort
    }
  };

  const handleStartSignup = async () => {
    setLoading(true);
    try {
      await updateStatus({ id: trial._id, status: "signing_up" });

      const response = await fetch(`${WORKER_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trial_id: trial._id,
          service_name: trial.serviceName,
          service_url: trial.serviceUrl,
          user_email: trial.userEmail,
          trial_days: trial.trialDays,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Worker error: ${err}`);
      }

      const result = await response.json();

      if (result.success) {
        const now = Date.now();
        await updateStatus({
          id: trial._id,
          status: "active",
          agentEmail: result.agent_email,
          signupDate: now,
          cancelBy: now + trial.trialDays * 24 * 60 * 60 * 1000,
          agentLog: result.log,
          cardLastFour: result.card_last_four || undefined,
          cardToken: result.card_token || undefined,
        });
      } else {
        await updateStatus({
          id: trial._id,
          status: "failed",
          agentEmail: result.agent_email || undefined,
          agentLog: result.log,
          cardLastFour: result.card_last_four || undefined,
          cardToken: result.card_token || undefined,
        });
      }
    } catch (error) {
      await updateStatus({
        id: trial._id,
        status: "failed",
        agentLog: `Signup failed: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTrial = async () => {
    setLoading(true);
    try {
      await updateStatus({ id: trial._id, status: "canceling" });

      const response = await fetch(`${WORKER_URL}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trial_id: trial._id,
          service_name: trial.serviceName,
          service_url: trial.serviceUrl,
          agent_email: trial.agentEmail,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Worker error: ${err}`);
      }

      const result = await response.json();

      await updateStatus({
        id: trial._id,
        status: "canceled",
        canceledDate: Date.now(),
        difficultyScore: result.difficulty_score,
        cancellationSteps: result.steps_taken,
        cancellationNotes: result.notes,
        agentLog:
          (trial.agentLog || "") +
          "\n\n--- Cancellation ---\n" +
          result.log,
      });

      await upsertLeaderboard({
        serviceName: trial.serviceName,
        serviceUrl: trial.serviceUrl,
        difficultyScore: result.difficulty_score,
        tactics: result.tactics || [],
      });
    } catch (error) {
      await updateStatus({
        id: trial._id,
        status: "failed",
        agentLog:
          (trial.agentLog || "") + `\n\nCancellation failed: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{trial.serviceName}</h3>
          <a
            href={trial.serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary truncate block max-w-[250px]"
          >
            {trial.serviceUrl}
          </a>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-muted-foreground">Trial Length</span>
          <p className="font-medium">{trial.trialDays} days</p>
        </div>
        {daysLeft !== null && trial.status === "active" && (
          <div>
            <span className="text-muted-foreground">Days Left</span>
            <p className="font-medium">
              {daysLeft <= 2 ? (
                <span className="text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {daysLeft} days
                </span>
              ) : (
                `${daysLeft} days`
              )}
            </p>
          </div>
        )}
        {trial.difficultyScore !== undefined && (
          <div>
            <span className="text-muted-foreground">Difficulty</span>
            <p>
              <DifficultyBadge score={trial.difficultyScore} />
            </p>
          </div>
        )}
        {trial.cancellationSteps !== undefined && (
          <div>
            <span className="text-muted-foreground">Steps to Cancel</span>
            <p className="font-medium">{trial.cancellationSteps}</p>
          </div>
        )}
        {trial.cardLastFour && (
          <div>
            <span className="text-muted-foreground">Virtual Card</span>
            <p className="font-medium font-mono">****{trial.cardLastFour}</p>
          </div>
        )}
      </div>

      {trial.cancellationNotes && (
        <div className="text-sm">
          <span className="text-muted-foreground">Notes</span>
          <p className="text-foreground/80 mt-1">{trial.cancellationNotes}</p>
        </div>
      )}

      {/* Agent Log */}
      {trial.agentLog && (
        <div className="text-sm">
          <button
            onClick={() => setShowLog(!showLog)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showLog ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            Agent Log
          </button>
          {showLog && (
            <pre className="mt-2 p-3 rounded-md bg-background border border-border text-xs text-muted-foreground overflow-auto max-h-64 whitespace-pre-wrap">
              {trial.agentLog}
            </pre>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-2 border-t border-border">
        {trial.status === "pending" && (
          <button
            onClick={handleStartSignup}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {loading ? "Signing Up..." : "Start Signup"}
          </button>
        )}
        {trial.status === "active" && (
          <button
            onClick={handleCancelTrial}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Ban className="h-3.5 w-3.5" />
            )}
            {loading ? "Canceling..." : "Cancel Trial"}
          </button>
        )}
        {(trial.status === "signing_up" || trial.status === "canceling") && (
          <>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Agent working...
            </span>
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <Square className="h-3.5 w-3.5" />
              Stop
            </button>
          </>
        )}
        <button
          onClick={() => removeTrial({ id: trial._id })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-destructive transition-colors ml-auto"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
