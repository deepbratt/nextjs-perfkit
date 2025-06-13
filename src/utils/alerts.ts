type AlertType = "memory" | "network";
type AlertCallback = (
  message: string,
  type: AlertType,
  meta?: Record<string, any>
) => void;

let memoryThresholdMB = 100; // Default: 100 MB
let repeatedNetworkThreshold = 5; // Same URL fetched X times within Y seconds
let alertHandler: AlertCallback | null = null;

const networkCallTimestamps: Record<string, number[]> = {};

/**
 * Registers a callback to be called when an alert condition is triggered.
 */
export const registerAlertHandler = (callback: AlertCallback) => {
  alertHandler = callback;
};

/**
 * Sets the memory threshold in MB
 */
export const setMemoryThreshold = (mb: number) => {
  memoryThresholdMB = mb;
};

/**
 * Sets the number of repeated calls allowed for the same URL before triggering a network alert
 */
export const setRepeatedNetworkThreshold = (count: number) => {
  repeatedNetworkThreshold = count;
};

/**
 * Tracks memory and alerts if threshold is exceeded
 */
export const checkMemoryUsage = () => {
  if ((performance as any).memory) {
    const memory = (performance as any).memory;
    const usedMB = memory.usedJSHeapSize / 1048576;

    if (usedMB > memoryThresholdMB && alertHandler) {
      alertHandler(
        `[PerfKit] Memory usage exceeded: ${usedMB.toFixed(2)} MB`,
        "memory",
        { usedMB }
      );
    }
  }
};

/**
 * Tracks network requests and triggers alert if a URL is hit repeatedly in a short time.
 */
export const trackNetworkRequest = (url: string) => {
  const now = Date.now();
  const windowMs = 10000; // 10 seconds

  if (!networkCallTimestamps[url]) {
    networkCallTimestamps[url] = [];
  }

  // Keep only timestamps within window
  networkCallTimestamps[url] = networkCallTimestamps[url].filter(
    (t) => now - t < windowMs
  );

  networkCallTimestamps[url].push(now);

  if (
    networkCallTimestamps[url].length > repeatedNetworkThreshold &&
    alertHandler
  ) {
    alertHandler(
      `[PerfKit] Repeated network call: ${url} (${networkCallTimestamps[url].length} times in 10s)`,
      "network",
      { url, count: networkCallTimestamps[url].length }
    );
  }
};
