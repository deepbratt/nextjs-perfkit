export const interceptFetch = () => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const start = performance.now();
    const response = await originalFetch(...args);
    const end = performance.now();
    const duration = end - start;
    console.log(`[PerfKit] Fetch to ${args[0]}: ${duration.toFixed(2)}ms`);
    return response;
  };
};
