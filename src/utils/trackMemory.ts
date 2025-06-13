export const trackMemory = () => {
  if ((performance as any).memory) {
    const mem = (performance as any).memory;
    console.log('[PerfKit] JS Heap Size:', {
      usedMB: (mem.usedJSHeapSize / 1048576).toFixed(2),
      totalMB: (mem.totalJSHeapSize / 1048576).toFixed(2),
      limitMB: (mem.jsHeapSizeLimit / 1048576).toFixed(2),
    });
    if (mem.usedJSHeapSize > 100 * 1048576) {
      alert('[PerfKit] High memory usage detected!');
    }
  }
};
