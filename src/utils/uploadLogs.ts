type LogType = "render" | "memory" | "network" | "custom";

interface PerfLogEntry {
  type: LogType;
  label: string;
  duration?: number;
  timestamp: string;
  meta?: Record<string, any>;
}

const logs: PerfLogEntry[] = [];

/**
 * Adds a new performance log entry to the internal log store
 */
export const addLog = (
  type: LogType,
  label: string,
  duration?: number,
  meta?: Record<string, any>
) => {
  logs.push({
    type,
    label,
    duration,
    timestamp: new Date().toISOString(),
    meta,
  });
};

/**
 * Returns all logs
 */
export const getLogs = (): PerfLogEntry[] => {
  return [...logs];
};

/**
 * Clears all stored logs
 */
export const clearLogs = () => {
  logs.length = 0;
};

/**
 * Downloads logs as a JSON file
 */
export const downloadLogs = () => {
  const blob = new Blob([JSON.stringify(logs, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `perfkit-logs-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
