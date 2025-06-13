import { useEffect, useRef } from 'react';

export const usePropDebugger = (props: Record<string, any>) => {
  const prevProps = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (prevProps.current[key] !== value) {
        acc[key] = { from: prevProps.current[key], to: value };
      }
      return acc;
    }, {} as Record<string, { from: any, to: any }>);

    if (Object.keys(changedProps).length > 0) {
      console.log('[PerfKit] Prop changes causing re-render:', changedProps);
    }

    prevProps.current = props;
  });
};
