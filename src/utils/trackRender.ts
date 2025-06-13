export const startRenderTimer = (label: string) => {
  performance.mark(`${label}-start`);
};

export const endRenderTimer = (label: string) => {
  const start = `${label}-start`;
  const end = `${label}-end`;
  performance.mark(end);
  performance.measure(label, start, end);
  const [measure] = performance.getEntriesByName(label);
  console.log(
    `[PerfKit] ${label} render time:`,
    measure?.duration.toFixed(2),
    "ms"
  );
};
