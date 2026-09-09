"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

/** Boots analytics after hydration. Renders nothing. */
export function Analytics() {
  useEffect(() => {
    void initAnalytics();
  }, []);

  return null;
}
