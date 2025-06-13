import { useEffect } from "react";

export const useRenderHeatmap = (label: string) => {
  const startMark = `${label}-start`;
  const endMark = `${label}-end`;

  performance.mark(startMark);

  useEffect(() => {
    performance.mark(endMark);
    performance.measure(label, startMark, endMark);
    const [measure] = performance.getEntriesByName(label);
    if (measure.duration > 16) {
      console.warn(
        `[PerfKit] ${label} took ${measure.duration.toFixed(2)}ms to render.`
      );
      const elem = document.querySelector(
        `[data-perf-label="${label}"]`
      ) as HTMLElement;
      if (elem) {
        elem.style.outline = "2px solid red";
        elem.title = `Render Time: ${measure.duration.toFixed(2)}ms`;
      }
    }
    return () => {
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(label);
    };
  }, []);
};
