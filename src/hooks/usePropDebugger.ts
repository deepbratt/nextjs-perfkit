import { useEffect } from "react";

export const usePropDebugger = (props: Record<string, any>) => {
  useEffect(() => {
    console.log("[PerfKit] Prop change:", props);
  }, [props]);
};
