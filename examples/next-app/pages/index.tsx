"use client";

import { useEffect } from "react";
import { useRenderHeatmap } from "@perfkit/devtools";
import { useMemoryTracker } from "@perfkit/devtools";
import { usePropDebugger } from "@perfkit/devtools";
import {
  registerAlertHandler,
  checkMemoryUsage,
  trackNetworkRequest,
} from "@perfkit/devtools";
import { downloadLogs } from "@perfkit/devtools";

export default function Home() {
  useRenderHeatmap("HomePage");
  useMemoryTracker(3000); // check every 3 seconds
  usePropDebugger({ exampleProp: "Hello" });

  useEffect(() => {
    registerAlertHandler((msg, type, meta) => {
      console.warn(`[ALERT - ${type}]`, msg, meta);
    });

    const interval = setInterval(() => {
      checkMemoryUsage();
    }, 5000);

    trackNetworkRequest("/api/example");

    return () => clearInterval(interval);
  }, []);

  return (
    <main data-perf-label="HomePage">
      <h1>🚀 Welcome to PerfKit</h1>
      <p>This page demonstrates memory, render, and network tracking.</p>
      <button onClick={downloadLogs}>📥 Download Logs</button>
    </main>
  );
}
