import { useEffect, useRef } from "react";
import { addLog } from "../utils/uploadLogs";

/**
 * usePropDebugger
 * Logs prop changes between renders for debugging unnecessary re-renders.
 *
 * @param props - The props object to watch
 * @param label - Optional label for easier identification in logs
 *
 * Example:
 *   usePropDebugger(props, "MyComponent");
 */
export const usePropDebugger = (
  props: Record<string, any>,
  label: string = "Component"
) => {
  const prevProps = useRef<Record<string, any> | null>(null);

  useEffect(() => {
    if (prevProps.current) {
      const changedProps: Record<string, { prev: any; next: any }> = {};
      const allKeys = new Set([
        ...Object.keys(prevProps.current),
        ...Object.keys(props),
      ]);
      allKeys.forEach((key) => {
        if (prevProps.current![key] !== props[key]) {
          changedProps[key] = {
            prev: prevProps.current![key],
            next: props[key],
          };
        }
      });
      if (Object.keys(changedProps).length > 0) {
        console.log(`[PerfKit] [${label}] Prop changes:`, changedProps);
        addLog("custom", `${label} prop change`, undefined, changedProps);
      }
    } else {
      // Initial mount
      console.log(`[PerfKit] [${label}] Initial props:`, props);
      addLog("custom", `${label} initial props`, undefined, props);
    }
    prevProps.current = props;
  }, [props, label]);
};
