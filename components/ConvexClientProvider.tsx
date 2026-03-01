"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convex) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-neutral-500 text-sm">
        <p>
          Set{" "}
          <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs">
            NEXT_PUBLIC_CONVEX_URL
          </code>{" "}
          to connect to Convex.
        </p>
      </div>
    );
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
