"use client";

import { Plus } from "lucide-react";

export default function NewTrialModal() {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
      <Plus className="h-4 w-4" />
      Add Trial
    </button>
  );
}
