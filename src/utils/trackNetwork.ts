export const interceptNetwork = () => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const start = performance.now();
    const response = await originalFetch(...args);
    const duration = performance.now() - start;
    console.log(
      "[PerfKit] Fetch:",
      args[0],
      "Duration:",
      duration.toFixed(2),
      "ms"
    );
    return response;
  };
};
