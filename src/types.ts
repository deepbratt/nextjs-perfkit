export type LogType = "render" | "memory" | "network" | "custom";

export interface PerfLogEntry {
  type: LogType;
  label: string;
  duration?: number;
  timestamp: string;
  meta?: Record<string, any>;
}
export interface NetworkLogEntry extends PerfLogEntry {
  type: "network";
  url: string;
  method: string;
  status: number;
  duration: number;
}

export interface MemoryLogEntry extends PerfLogEntry {
  type: "memory";
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export interface RenderLogEntry extends PerfLogEntry {
  type: "render";
  component: string;
  duration: number;
}

export interface CustomLogEntry extends PerfLogEntry {
  type: "custom";
  data?: Record<string, any>;
}

export type AnyPerfLogEntry =
  | NetworkLogEntry
  | MemoryLogEntry
  | RenderLogEntry
  | CustomLogEntry;

export interface PerfLogger {
  log(entry: PerfLogEntry): void;
  getLogs(type?: LogType): PerfLogEntry[];
  clear(): void;
}
