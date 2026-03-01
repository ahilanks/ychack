"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TrialCard from "@/components/TrialCard";
import NewTrialModal from "@/components/NewTrialModal";
import { Shield } from "lucide-react";

export default function Dashboard() {
  const trials = useQuery(api.trials.list);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeCount = trials?.filter((t: any) => t.status === "active").length ?? 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canceledCount = trials?.filter((t: any) => t.status === "canceled").length ?? 0;
  const expiringCount =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trials?.filter((t: any) => {
      if (t.status !== "active" || !t.cancelBy) return false;
      const daysLeft = (t.cancelBy - Date.now()) / (1000 * 60 * 60 * 24);
      return daysLeft <= 3;
    }).length ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your free trials in one place
          </p>
        </div>
        <NewTrialModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Active Trials</p>
          <p className="text-2xl font-bold text-green-400">{activeCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Expiring Soon</p>
          <p className="text-2xl font-bold text-yellow-400">{expiringCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Canceled</p>
          <p className="text-2xl font-bold text-gray-400">{canceledCount}</p>
        </div>
      </div>

      {/* Trial Cards */}
      {trials === undefined ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : trials.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <p className="text-lg font-medium">No trials yet</p>
            <p className="text-muted-foreground text-sm mt-1">
              Click &ldquo;Add Trial&rdquo; to start tracking a free trial
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {trials.map((trial: any) => (
            <TrialCard key={trial._id} trial={trial} />
          ))}
        </div>
      )}
    </div>
  );
}
