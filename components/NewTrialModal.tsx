"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, X } from "lucide-react";

export default function NewTrialModal() {
  const [open, setOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [trialDays, setTrialDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const createTrial = useMutation(api.trials.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Auto-generate URL from service name if not provided
    let url = serviceUrl.trim();
    if (!url) {
      const slug = serviceName.toLowerCase().replace(/[^a-z0-9]/g, "");
      url = `https://www.${slug}.com`;
    } else if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    try {
      await createTrial({
        serviceName,
        serviceUrl: url,
        userEmail,
        trialDays,
      });

      setServiceName("");
      setServiceUrl("");
      setUserEmail("");
      setTrialDays(7);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Trial
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => setOpen(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-lg font-semibold">Add Free Trial</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Service Name
              </label>
              <input
                type="text"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g., Netflix, Spotify, Adobe CC"
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Service URL{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={serviceUrl}
                onChange={(e) => setServiceUrl(e.target.value)}
                placeholder="Auto-detected from name"
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Your Email (for notifications)
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Trial Length (days)
              </label>
              <input
                type="number"
                required
                min={1}
                max={365}
                value={trialDays}
                onChange={(e) => setTrialDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Trial"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
