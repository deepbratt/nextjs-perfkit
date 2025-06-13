import { useEffect, useRef } from "react";
import { addLog } from "../utils/uploadLogs";

/**
 * Custom hook to track JS heap memory usage in the browser.
 * Uses `performance.memory` (Chrome only) and logs at a fixed interval.
 */
export const useMemoryTracker = (intervalMs: number = 5000) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!(performance as any).memory) {
      console.warn(
        "[PerfKit] Memory tracking is not supported in this browser."
      );
      return;
    }

    const trackMemory = () => {
      const memory = (performance as any).memory;
      const used = (memory.usedJSHeapSize / 1048576).toFixed(2); // MB
      const total = (memory.totalJSHeapSize / 1048576).toFixed(2);
      const limit = (memory.jsHeapSizeLimit / 1048576).toFixed(2);

      console.log(
        `[PerfKit] Memory usage: ${used} MB / ${total} MB (limit: ${limit} MB)`
      );

      addLog("memory", "HeapUsage", parseFloat(used), {
        totalMB: parseFloat(total),
        limitMB: parseFloat(limit),
      });
    };

    intervalRef.current = setInterval(trackMemory, intervalMs);
    trackMemory(); // run immediately once

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs]);
};
