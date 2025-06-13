export const trackMemoryUsage = () => {
  if ((performance as any).memory) {
    const memory = (performance as any).memory;
    const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
    console.log(`[PerfKit] JS Heap: ${usedMB} MB`);
  }
};
