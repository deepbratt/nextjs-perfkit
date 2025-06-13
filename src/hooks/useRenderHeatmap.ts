import { useEffect } from "react";

export const useRenderHeatmap = (label: string) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;
      console.log(`[PerfKit] ${label} render: ${duration.toFixed(2)}ms`);
    };
  }, []);
};
