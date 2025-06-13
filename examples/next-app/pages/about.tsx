"use client";

import { useRenderHeatmap } from "@perfkit/devtools";
import { usePropDebugger } from "@perfkit/devtools";

export default function About() {
  useRenderHeatmap("AboutPage");
  usePropDebugger({ title: "About PerfKit" });

  return (
    <section data-perf-label="AboutPage">
      <h2>About This Tool</h2>
      <p>PerfKit is a frontend performance tracker for Next.js.</p>
    </section>
  );
}
